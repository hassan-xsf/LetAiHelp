import { NextResponse } from "next/server";
import axios from "axios";
import { modelPrompts, textSchema } from "@/schemas/textSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { paidTextSchema } from "@/schemas/paidModelsSchema";
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

    const { messages, model, max_tokens } = await request.json();

    const validate = paidTextSchema.safeParse({ messages, model, max_tokens });
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
      `https://www.blackbox.ai/api/chat`,
      {
        messages,
        id: "7DyvtMT",
        previewToken: null,
        userId: null,
        codeModelMode: true,
        agentMode: {},
        trendingAgentMode: {},
        isMicMode: false,
        userSystemPrompt: null,
        maxTokens: max_tokens,
        playgroundTopP: 0.9,
        playgroundTemperature: 0.5,
        isChromeExt: false,
        githubToken: null,
        clickedAnswer2: false,
        clickedAnswer3: false,
        clickedForceWebSearch: false,
        visitFromDelta: false,
        mobileClient: false,
        userSelectedModel: model,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return new NextResponse(response.data, { status: 200 });
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
