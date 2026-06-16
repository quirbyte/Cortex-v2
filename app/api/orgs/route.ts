import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { orgObject } from "@/helpers/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        {
          msg: "Unauthenticated",
        },
        { status: 403 },
      );
    }
    const data = await req.json();
    const { success, error } = orgObject.safeParse(data);
    if (!success) {
      return NextResponse.json(
        {
          msg: error,
        },
        { status: 400 },
      );
    }
    const userId = (session.user as any).id;
    await prisma.organization.create({
      data: {
        name: data.name,

        slug: data.slug,
        createdBy: userId,
        Roles: {
          create: {
            userId,
            role: "ADMIN",
          },
        },
      },
    });
    return NextResponse.json({
      msg: "Created organization successfully",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, slug } = await req.json();
    const slugObject = orgObject.pick({ slug: true });
    const isValidated = slugObject.safeParse({ slug });
    if (!isValidated) {
      return NextResponse.json(
        {
          msg: "Invalid event slug",
        },
        {
          status: 413,
        },
      );
    }
    if (!id) {
      return NextResponse.json(
        {
          msg: "Organization Id missing",
        },
        { status: 404 },
      );
    }
    await prisma.organization.update({
      where: {
        id,
      },
      data: {
        slug,
      },
    });
    return NextResponse.json({
      msg: "Updated Organization name successfully",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, name } = await req.json();
    const nameObject = orgObject.pick({ name: true });
    const isValidated = nameObject.safeParse({ name });
    if (!isValidated) {
      return NextResponse.json(
        {
          msg: "Invalid event name",
        },
        {
          status: 413,
        },
      );
    }
    if (!id) {
      return NextResponse.json(
        {
          msg: "Organization Id missing",
        },
        { status: 404 },
      );
    }
    await prisma.organization.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return NextResponse.json({
      msg: "Updated Organization name successfully",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        {
          msg: "Unauthenticated",
        },
        { status: 403 },
      );
    }
    const userId = (session.user as any).id;
    const data = await req.json();
    if (!data.id) {
      return NextResponse.json(
        {
          msg: "Missing event Id",
        },
        {
          status: 400,
        },
      );
    }
    await prisma.organization.delete({
      where: {
        id: data.id,
        createdBy: userId,
      },
    });
    return NextResponse.json({
      msg: "Deleted organization successfully",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
