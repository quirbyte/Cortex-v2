import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { role, orgId, email } = data;

    if (!email || !orgId || !role) {
      return NextResponse.json(
        { msg: "Missing required payload parameters" },
        { status: 400 },
      );
    }

    const newRoleRecord = await prisma.userRole.create({
      data: {
        org: {
          connect: {
            id: orgId,
          },
        },
        role,
        user: {
          connect: {
            email: email,
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        msg: "Member seat successfully added",
        data: newRoleRecord,
      },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { msg: "No registered user account found with that email address" },
        { status: 404 },
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { msg: "This user is already a member of this organization" },
        { status: 409 },
      );
    }

    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, orgId } = data;
    const result = await prisma.userRole.deleteMany({
      where: {
        orgId,
        user: {
          email,
        },
      },
    });
    if (result.count === 0) {
      return NextResponse.json(
        {
          msg: "No registered user account found with that email address in this org",
        },
        { status: 404 },
      );
    }
    return NextResponse.json({
      msg: "Member deleted sucessfully",
    });
  } catch (error: any) {
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
