import { NextResponse } from "next/server";
import axios from "axios";
import { imageSchema } from "@/schemas/imageSchema";


export async function POST(request: Request) {
    try {
        const { model , text } = await request.json();

        const validate = imageSchema.safeParse({ model , text })
        if (!validate.success) {
            const errorMessages = validate.error.issues.map(issue => "Field " + issue.message).join(", ");

            return NextResponse.json({
                success: false,
                message: errorMessages,
            }, { status: 400 });
        }

        const response = await axios.post<ImageResponse>(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`, {
            prompt: text
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            }
        });
        return NextResponse.json({
            data: response.data.result.image,
            success: true,
            message: "Image succesfully generated!",
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
