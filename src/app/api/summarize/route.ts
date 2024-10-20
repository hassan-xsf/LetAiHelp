import { NextResponse } from "next/server";
import axios from "axios";
import { summarizeSchema } from "@/schemas/summarizeSchema";


export async function POST(request: Request) {
    try {
        const { input_text, max_length } = await request.json();

        const validate = summarizeSchema.safeParse({ input_text, max_length })
        if (!validate.success) {
            const errorMessages = validate.error.issues.map(issue => "Field " + issue.message).join(", ");

            return NextResponse.json({
                success: false,
                message: errorMessages,
            }, { status: 400 });
        }

        const response = await axios.post<SummarizeResponse>(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/facebook/bart-large-cnn`, {
            input_text,
            max_length: max_length * 2,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            }
        });

        return NextResponse.json({
            data: response.data,
            success: true,
            message: "Text summarized successfully",
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
