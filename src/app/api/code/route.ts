import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

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
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message: "Code is required",
        },
        { status: 400 }
      );
    }
    const redeemCode = await db.redeemCode.findUnique({
      where: { code },
    });
    if (!redeemCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Code",
        },
        { status: 400 }
      );
    }
    const hasRedeemed = await db.redeemedCode.findFirst({
      where: { userId: session.user.id, codeId: redeemCode.id },
    });
    if (hasRedeemed) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already redeemed this code",
        },
        { status: 400 }
      );
    }
    await db.redeemedCode.create({
      data: {
        userId: session.user.id,
        codeId: redeemCode.id,
      },
    });
    await db.user.update({
      where: { id: session.user.id },
      data: {
        credits: { increment: redeemCode.value },
      },
    });
    return NextResponse.json(
      {
        data: { credits: redeemCode.value },
        success: true,
        message: "Code Redeemed Succesfully",
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
