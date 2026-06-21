import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import HomePageClient from "@/components/HomePageClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export type event = {
    id: string;
    name: string;
    desc: string | null;
    image: string | null;
    capacity: number;
    sold: number;
}

export type userBooking = {
    id: string;
    event: {
        startsAt: Date;
    };
}

export default async function HomePage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/signin");
    }
    const userId = (session.user as any).id;
    const [topEvents, userBookings] = await Promise.all([getGlobalTopEvents(), getUserBookings(userId)]);
    return <HomePageClient topEvents={topEvents} userBookings={userBookings} />
}

async function getGlobalTopEvents() {
    const events: event[] = await prisma.event.findMany({
        where: {
            capacity: { gt: 0 },
        },
        select: {
            name: true,
            desc: true,
            id: true,
            sold: true,
            capacity: true,
            image: true
        }
    });

    return events.sort((a, b) => (b.sold / b.capacity) - (a.sold / a.capacity)).slice(0, 5);
}

async function getUserBookings(id: string) {
    return await prisma.booking.findMany({
        where: {
            bookerId: id
        },
        select: {
            id: true,
            event: {
                select: {
                    startsAt: true
                }
            }
        }
    })
}