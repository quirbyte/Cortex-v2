import cloudinary from "@/app/lib/cloudinary";
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
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const imagePayload = formData.get("image");
    if (!id) {
      return NextResponse.json(
        {
          msg: "Insufficient Data",
        },
        { status: 404 },
      );
    }
    let finalImage: string | null | undefined = undefined;
    if (imagePayload === "delete") {
      finalImage = null;
    } else if (imagePayload && typeof imagePayload !== "string") {
      const file = imagePayload as File;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "user_avatars",
            allowed_formats: ["jpg", "webp", "jpeg", "png"],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        uploadStream.end(buffer);
      });
      finalImage = uploadResult.secure_url;
    }

    if (finalImage !== undefined) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          image: finalImage,
        },
      });
    }

    return NextResponse.json({
      msg: "Avatar successfully updated",
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
