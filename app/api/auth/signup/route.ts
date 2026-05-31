import { NextRequest, NextResponse } from "next/server";
import { signupObject } from "@/validation/types";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { success, error } = signupObject.safeParse(body);
    if (!success) {
      return NextResponse.json({
        msg: error,
      });
    }
    const { name, email, password } = body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return NextResponse.json(
        {
          msg: "User already exists",
        },
        {
          status: 401,
        },
      );
    }
    const hashed_pw = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed_pw,
      },
    });
    return NextResponse.json({
      msg: "Signed up successfully!",
    });
  } catch {
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
