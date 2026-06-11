import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { orgObject } from "@/validation/types";
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
