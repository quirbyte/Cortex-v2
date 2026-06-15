import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { eventObject } from "@/helpers/types";
import cloudinary from "@/app/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawData = {
      name: formData.get("name"),
      desc: formData.get("desc"),
      venue: formData.get("venue"),
      startsAt: formData.get("startsAt"),
      price: Number(formData.get("price") || 0),
      capacity: Number(formData.get("capacity") || 0),
      orgId: formData.get("orgId"),
      tags: formData.get("tags")
        ? JSON.parse(formData.get("tags") as string)
        : [],
      imageFile: formData.get("imageFile"),
    };
    const validation = eventObject.safeParse(rawData);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 },
      );
    }
    const {
      name,
      desc,
      venue,
      startsAt,
      price,
      capacity,
      tags,
      orgId,
      imageFile,
    } = validation.data;

    let uploadedImageUrl = "";

    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "organization_events",
                resource_type: "image",
              },
              (error, result) => {
                if (error || !result) {
                  return reject(
                    error || new Error("Cloudinary pipeline error"),
                  );
                }
                resolve(result);
              },
            )
            .end(buffer);
        },
      );

      uploadedImageUrl = uploadResult.secure_url;
    }

    await prisma.event.create({
      data: {
        name,
        desc,
        venue,
        startsAt: new Date(startsAt),
        price,
        capacity,
        tags,
        orgId,
        image: uploadedImageUrl,
      },
    });

    return NextResponse.json({
      msg: "Created Event successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing event ID" },
        { status: 400 },
      );
    }
    await prisma.event.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      msg: "Event deleted successfully",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
