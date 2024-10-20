import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("image");

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({
                success: false,
                message: "No image file uploaded",
            }, { status: 400 });
        }
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const eightBit = Array.from(uint8Array);

        if (eightBit.length > 200000) {
            return NextResponse.json({
                success: false,
                message: "The image size was too big to be processed..",
            }, { status: 400 });
        }
        const response = await axios.post<ObjectDetectionResponse>(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/facebook/detr-resnet-50`,
            { image: eightBit },
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
            message: "Object detection executed successfully",
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
