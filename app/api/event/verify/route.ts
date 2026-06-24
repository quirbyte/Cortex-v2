import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, ticketId } = body;

    if (!eventId || typeof eventId !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing event ID" },
        { status: 400 },
      );
    }

    if (!ticketId || typeof ticketId !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing ticket ID" },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: ticketId,
        eventId: eventId,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Ticket not found for this event" },
        { status: 404 },
      );
    }

    if (booking.verified) {
      return NextResponse.json(
        { error: "Ticket has already been verified!" },
        { status: 400 },
      );
    }

    await prisma.booking.update({
      where: { id: ticketId },
      data: { verified: true },
    });

    return NextResponse.json({
      msg: "Booking verified successfully",
    });
  } catch (error) {
    console.error("Verification processing error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
