import { NextResponse } from "next/server";
import axios from "axios";
import { modelPrompts, textSchema } from "@/schemas/textSchema";

export async function POST(request: Request) {
    try {
        const { prompt, model, type } = await request.json();


        const validate = textSchema.safeParse({ prompt , model, type })
        if (!validate.success) {
            const errorMessages = validate.error.issues.map(issue => issue.message).join(", ");
            return NextResponse.json({
                success: false,
                message: errorMessages,
            }, { status: 400 });
        }

        const response = await axios.post<AITextResponse>(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
            {
                "messages": [
                    { "role": "system", "content": `${modelPrompts[type]}` },
                    { "role": "user", "content": prompt }
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
