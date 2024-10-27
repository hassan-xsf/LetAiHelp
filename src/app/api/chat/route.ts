import { NextResponse } from "next/server";
import axios from "axios";
import { modelPrompts, textSchema } from "@/schemas/textSchema";
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

    const { prompt, model, type } = await request.json();

    const validate = textSchema.safeParse({ prompt, model, type });
    if (!validate.success) {
      const errorMessages = validate.error.issues
        .map((issue) => `${issue.path.join(".")} field is ${issue.message}`)
        .join(", ");

      return NextResponse.json(
        {
          success: false,
          message: errorMessages,
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
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
      {
        max_tokens: 512,
        stream: true,
        messages: [
          { role: "system", content: `${modelPrompts[type]}` },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "stream",
      },
    );

    const stream = new ReadableStream({
      async start(controller) {
        response.data.on("data", (chunk: string) => {
          controller.enqueue(new TextEncoder().encode(chunk.toString()));
        });

        response.data.on("end", () => {
          controller.close();
        });

        response.data.on("error", (err: Error) => {
          console.error("Stream error:", err);
          controller.error(err);
        });
      },
    });

    return new NextResponse(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
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
