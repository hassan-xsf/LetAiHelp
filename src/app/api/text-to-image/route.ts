import { NextResponse } from "next/server";
import axios from "axios";
import {
  imageFormType,
  imagePrompts,
  imageSchema,
} from "@/schemas/imageSchema";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { Credits } from "@/constants/credits";

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
        .map((issue) => `${issue.path.join(".")} field is ${issue.message}`)
        .join(", ");

      return NextResponse.json(
        {
          success: false,
          message: errorMessages,
        },
        { status: 400 }
      );
    }
    if (model === "@cf/black-forest-labs/flux-1-schnell") {
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
      const updatedUser = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          credits: {
            decrement: Credits.TextToImage,
          },
        },
      });
      /// a hotfix because apparently NextAuth doesn't update the session when we set the value to 0, so we need to manually update it
      /// IssueX#0

      if (updatedUser.credits === 0) {
        await db.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            credits: 1,
          },
        });
      }
      return NextResponse.json(
        {
          data: response.data,
          success: true,
          message: "Image succesfully generated!",
        },
        { status: 200 }
      );
    } else {
      const response = await axios.post(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
        {
          prompt: type === "None" ? text : imagePrompts[type] + " " + text,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );
      const updatedUser = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          credits: {
            decrement: Credits.TextToImage,
          },
        },
      });
      /// a hotfix because apparently NextAuth doesn't update the session when we set the value to 0, so we need to manually update it
      /// IssueX#0

      if (updatedUser.credits === 0) {
        await db.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            credits: 1,
          },
        });
      }
      return new NextResponse(response.data, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
        },
      });
    }
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
