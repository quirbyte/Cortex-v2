import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// 1. Define an interface extending your session user type
interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ msg: "Unauthenticated" }, { status: 403 });
    }

    // Explicitly cast session.user to your interface
    const userId = (session.user as CustomUser).id;
    const body = await req.json();
    const { eventId, quantity } = body;

    if (!eventId) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 },
      );
    }

    if (quantity <= 0) {
      return NextResponse.json(
        { msg: "Must book at least one ticket" },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const targetEvent = await tx.event.findUnique({
        where: { id: eventId },
        select: { sold: true, capacity: true },
      });

      if (!targetEvent) {
        throw new Error("NOT_FOUND");
      }

      if (
        targetEvent.sold >= targetEvent.capacity ||
        targetEvent.sold + quantity > targetEvent.capacity
      ) {
        throw new Error("CAPACITY_EXCEEDED");
      }

      const booking = await tx.booking.upsert({
        where: {
          bookerId_eventId: {
            bookerId: userId,
            eventId,
          },
        },
        create: {
          eventId,
          bookerId: userId,
          count: quantity,
        },
        update: {
          count: {
            increment: quantity,
          },
        },
      });

      await tx.event.update({
        where: { id: eventId },
        data: {
          sold: {
            increment: quantity,
          },
        },
      });

      return booking;
    });

    return NextResponse.json({
      msg: "Event Booked successfully",
      count: result.count,
    });
  } catch (error: unknown) {
    console.error("Booking error:", error);

    // 2. Type-guard unknown errors before reading properties
    const errorMessage = error instanceof Error ? error.message : "";

    if (errorMessage === "NOT_FOUND") {
      return NextResponse.json(
        { msg: "Target event does not exist" },
        { status: 404 },
      );
    }
    if (errorMessage === "CAPACITY_EXCEEDED") {
      return NextResponse.json(
        { msg: "Capacity filled! No more seats left.." },
        { status: 400 },
      );
    }

    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ msg: "Unauthenticated" }, { status: 403 });
    }

    const userId = (session.user as CustomUser).id;
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { msg: "Missing required booking ID" },
        { status: 400 },
      );
    }

    const message = await prisma.$transaction(async (tx) => {
      const targetBooking = await tx.booking.findUnique({
        where: {
          id,
          bookerId: userId,
        },
        select: { id: true, count: true, eventId: true },
      });

      if (!targetBooking) {
        throw new Error("NOT_FOUND");
      }

      if (targetBooking.count <= 1) {
        await tx.booking.delete({
          where: { id: targetBooking.id },
        });
      } else {
        await tx.booking.update({
          where: { id: targetBooking.id },
          data: {
            count: {
              decrement: 1,
            },
          },
        });
      }

      await tx.event.update({
        where: { id: targetBooking.eventId },
        data: {
          sold: {
            decrement: 1,
          },
        },
      });

      return targetBooking.count <= 1
        ? "Booking dropped completely"
        : "Ticket count decremented successfully";
    });

    return NextResponse.json({ msg: message });
  } catch (error: unknown) {
    console.error("Booking error:", error);

    const errorMessage = error instanceof Error ? error.message : "";

    if (errorMessage === "NOT_FOUND") {
      return NextResponse.json(
        { msg: "Booking record does not exist or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}