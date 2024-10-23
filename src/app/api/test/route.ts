import { NextResponse } from "next/server";
import axios from "axios";

export async function POST() {
  try {
    const response = await axios.post(
      "https://api.cloudflare.com/client/v4/accounts/24a5b47e3e775b62720d1c455d33591b/ai/run/@cf/bytedance/stable-diffusion-xl-lightning",
      {
        prompt: "A beautiful landscape with mountains and a lake",
      },
      {
        headers: {
          Authorization: "Bearer 498F8GFEFEAPZb8VqPHb3XZQR_RKtmIqBtkVsEIH",
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
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
