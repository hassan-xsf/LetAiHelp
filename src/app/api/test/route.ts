import { NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        {
          success: false,
          message: "No image file uploaded",
        },
        { status: 400 }
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const eightBit = Array.from(uint8Array);

    if (eightBit.length > 500_000) {
      return NextResponse.json(
        {
          success: false,
          message: "The image size was too big to be processed..",
        },
        { status: 400 }
      );
    }
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/runwayml/stable-diffusion-v1-5-img2img`,
      {
        image: eightBit,
        prompt: "Add 'GO AWAY' text to the image",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );
    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: error,
        success: false,
        message:
          "Internal Server Error, Please try again later, If issue persists please change the image.",
      },
      { status: 500 }
    );
  }
}
