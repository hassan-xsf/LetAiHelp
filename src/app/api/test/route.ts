import { NextResponse } from "next/server";
import axios from "axios";
import { modelPrompts, textSchema } from "@/schemas/textSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@hf/thebloke/zephyr-7b-beta-awq`,
      {
        stream: true,
        messages: [
          { role: "system", content: "You are a helpful assitant" },
          { role: "user", content: "Who are you" },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "stream", // Enables streaming response
      }
    );

    const stream = response.data;
    stream.on("data", (chunk) => {
      const textChunk = chunk.toString();
      console.log(textChunk); // Print each chunk as it arrives
    });

    stream.on("end", () => {
      console.log("Streaming completed.");
    });

    stream.on("error", (error) => {
      console.error("Error in streaming response:", error);
    });

    // const reader = response.body.getReader();
    // const decoder = new TextDecoder("utf-8");
    // let done = false;

    // while (!done) {
    //   const { value, done: streamDone } = await reader.read();
    //   done = streamDone;
    //   if (value) {
    //     const chunk = decoder.decode(value, { stream: true });
    //     console.log(chunk); // Print each chunk as it arrives
    //   }
    // }

    console.log("Streaming completed.");

    return NextResponse.json(
      {
        data: response,
        success: true,
        message: "Text generated successfully",
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
