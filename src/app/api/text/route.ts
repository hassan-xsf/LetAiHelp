import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(request: Request) {
    try {
        const { text , model , type } = await request.json();

        const response = await axios.post<CaptionResponse>(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/openai/whisper`,
            { text: text , model: model || "bart-large-cnn" , type},
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
