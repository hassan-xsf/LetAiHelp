import { NextResponse } from "next/server";
import axios from "axios";
import {
  imageFormType,
  imagePrompts,
  imageSchema,
} from "@/schemas/imageSchema";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in inorder to perform this.",
        },
        { status: 401 }
      );
    }
    const { model, text, type }: imageFormType = await request.json();

    const validate = imageSchema.safeParse({ model, text, type });
    if (!validate.success) {
      const errorMessages = validate.error.issues
        .map((issue) => "Field " + issue.message)
        .join(", ");

      return NextResponse.json(
        {
          success: false,
          message: errorMessages,
        },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
      {
        prompt: type === "None" ? text : imagePrompts[type] + " " + text,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    );
    let data = {};

    if (model === "@cf/black-forest-labs/flux-1-schnell") {
      data = {
        result: response.data.result.image,
      };
    } else {
      data = {
        result: response.data,
      };
    }
    return NextResponse.json(
      {
        data,
        success: true,
        message: "Image succesfully generated!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: error,
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
