import { NextResponse } from "next/server";
import axios from "axios";
import { translateSchema } from "@/schemas/translateSchema";

export async function POST(request: Request) {
  try {
    const { data } = await request.json();
    const { text, tr_lang, sr_lang } = data;

    const validate = translateSchema.safeParse({ text, tr_lang, sr_lang });
    if (!validate.success) {
      const errorMessages = validate.error.issues
        .map((issue) => issue.message)
        .join(", ");

      return NextResponse.json(
        {
          success: false,
          message: errorMessages,
        },
        { status: 400 }
      );
    }

    const response = await axios.post<TranslationResponse>(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/m2m100-1.2b`,
      {
        text: text,
        source_lang: sr_lang,
        target_lang: tr_lang,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    );

    return NextResponse.json(
      {
        data: response.data,
        success: true,
        message: "Translation retreived successfully",
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
