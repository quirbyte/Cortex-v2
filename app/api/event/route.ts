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

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    let parsedTags: string[] = [];
    const tagsRaw = formData.get("tags");
    if (tagsRaw) {
      try {
        parsedTags = JSON.parse(tagsRaw as string);
      } catch {
        parsedTags = [];
      }
    } else {
      parsedTags = existingEvent.tags || [];
    }

    const rawImageFile = formData.get("imageFile");
    
    if (rawImageFile && typeof rawImageFile !== "string" && "size" in rawImageFile) {
      if (rawImageFile.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Image size exceeds the 2MB limit" },
          { status: 413 }
        );
      }
    }

    const hasValidNewImage = rawImageFile && 
                             typeof rawImageFile !== "string" && 
                             "size" in rawImageFile && 
                             rawImageFile.size > 0;

    const rawData = {
      name: formData.get("name") || existingEvent.name,
      desc: formData.get("desc") ?? existingEvent.desc,
      venue: formData.get("venue") || existingEvent.venue,
      startsAt: formData.get("startsAt") || existingEvent.startsAt.toISOString(),
      price: formData.has("price") ? Number(formData.get("price")) : existingEvent.price,
      capacity: formData.has("capacity") ? Number(formData.get("capacity")) : existingEvent.capacity,
      orgId: formData.get("orgId") || existingEvent.orgId,
      tags: parsedTags,
      imageFile: hasValidNewImage ? rawImageFile : undefined,
    };

    const validation = eventObject.safeParse(rawData);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 },
      );
    }

    const { name, desc, venue, startsAt, price, capacity, tags, imageFile } = validation.data;

    let finalImageUrl = existingEvent.image;

    if (imageFile) {
      if (existingEvent.image) {
        try {
          const urlParts = existingEvent.image.split("/");
          const filename = urlParts.pop();
          const folder = urlParts.pop();
          if (filename && folder) {
            const publicId = `${folder}/${filename.split(".")[0]}`;
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (err) {
          console.error("Cloudinary asset cleanup failed:", err);
        }
      }

      const arrayBuffer = await (imageFile as Blob).arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "organization_events", resource_type: "image" },
              (error, result) => {
                if (error || !result) return reject(error || new Error("Cloudinary error"));
                resolve(result);
              },
            )
            .end(buffer);
        },
      );

      finalImageUrl = uploadResult.secure_url;
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        name,
        desc,
        venue,
        startsAt: new Date(startsAt),
        price,
        capacity,
        tags,
        image: finalImageUrl,
      },
    });

    return NextResponse.json({
      msg: "Updated Event successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Event update crash:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
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
