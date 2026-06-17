import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ msg: "Unauthenticated" }, { status: 403 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        { msg: "Missing required fields" },
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

      if (targetEvent.sold >= targetEvent.capacity) {
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
          count: 1,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      await tx.event.update({
        where: { id: eventId },
        data: {
          sold: {
            increment: 1,
          },
        },
      });

      return booking;
    });

    return NextResponse.json({
      msg: "Event Booked successfully",
      count: result.count,
    });
  } catch (error: any) {
    console.error("Booking error:", error);

    if (error.message === "NOT_FOUND") {
      return NextResponse.json(
        { msg: "Target event does not exist" },
        { status: 404 },
      );
    }
    if (error.message === "CAPACITY_EXCEEDED") {
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

    const userId = (session.user as any).id;
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
  } catch (error: any) {
    console.error("Booking error:", error);

    if (error.message === "NOT_FOUND") {
      return NextResponse.json(
        { msg: "Target event does not exist" },
        { status: 404 },
      );
    }

    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
