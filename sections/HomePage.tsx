import { prisma } from "@/app/lib/prisma";
import HomePageClient from "@/components/HomePageClient";

export type event = {
    id: string;
    name: string;
    desc: string | null;
    image: string | null;
    capacity: number;
    sold: number;
}

export default async function HomePage() {
    const topEvents: event[] = await getGlobalTopEvents();
    return <HomePageClient topEvents={topEvents} />
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

    return events
        .sort((a, b) => (b.sold / b.capacity) - (a.sold / a.capacity))
        .slice(0, 5);
}