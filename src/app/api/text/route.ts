import { NextResponse } from "next/server";
import axios from "axios";
import { textSchema } from "@/schemas/textSchema";

export async function POST(request: Request) {
    try {
        const { prompt, model, type } = await request.json();

        const validate = textSchema.safeParse({ model })
        if (!validate.success) {
            const errorMessages = validate.error.issues.map(issue => issue.message).join(", ");
            return NextResponse.json({
                success: false,
                message: errorMessages,
            }, { status: 400 });
        }

        const response = await axios.post<CaptionResponse>(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
            {
                "messages": [
                    { "role": "system", "content": "You are a senior web developer focused on frontend and your name is Mark" },
                    { "role": "user", "content": "Who are you?" }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        return NextResponse.json({
            data: response.data.result,
            success: true,
            message: "Text generated successfully",
        }, { status: 200 });


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data: error,
            success: false,
            message: "Internal Server Error",
        }, { status: 500 });
    }
}
