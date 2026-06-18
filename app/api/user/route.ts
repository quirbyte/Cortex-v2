import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { name, userId } = await req.json();
    if (!name || !userId) {
      return NextResponse.json(
        {
          msg: "Insufficient Data",
        },
        { status: 404 },
      );
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json({
      msg: "Name updated successfully",
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    let { image, id } = await req.json();
    if (!id) {
      return NextResponse.json(
        {
          msg: "Insufficient Data",
        },
        { status: 404 },
      );
    }

    if (!image) image = null;

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        image,
      },
    });

    return NextResponse.json({
      msg: "Image updated successfully",
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
