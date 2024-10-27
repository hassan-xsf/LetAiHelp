import { NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("audio");
    const source_lang = formData.get("source_lang");

    if (!(file instanceof Blob)) {
      return NextResponse.json(
        {
          success: false,
          message: "No image file uploaded",
        },
        { status: 400 },
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const eightBit = Array.from(uint8Array);

    if (eightBit.length > 200000) {
      return NextResponse.json(
        {
          success: false,
          message: "The audio size was too big to be processed..",
        },
        { status: 400 },
      );
    }
    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        credits: {
          decrement: Credits.Chat,
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
    const response = await axios.post<CaptionResponse>(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/openai/whisper`,
      { audio: eightBit, source_lang: source_lang || "en" },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    return NextResponse.json(
      {
        data: response.data.result,
        success: true,
        message: "Caption generated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: error,
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
