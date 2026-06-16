import { prisma } from "@/app/lib/prisma";
import EventCard from "@/components/EventCard";
import { formatDate } from "@/helpers/date";
import { Search } from "lucide-react";

export type EventType = {
    name: string;
    desc: string | null;
    venue: string;
    image: string | null;
    id: string;
    tags: string[] | [];
    startsAt: Date;
    price: number;
    capacity: number;
    sold: number;
    createdBy: { name: string; };
}

export default async function EventsPage() {
    const currDate = new Date().toISOString();
    const formattedDate = formatDate({ date: currDate, option: 2 });

    const events: EventType[] = await prisma.event.findMany({
        select: {
            name: true,
            desc: true,
            sold: true,
            capacity: true,
            price: true,
            startsAt: true,
            venue: true,
            image: true,
            id: true,
            tags: true,
            createdBy: {
                select: {
                    name: true
                }
            }
        }
    }) || [];

    return (
        <div className="min-h-screen w-full pt-5 p-4 font-manrope bg-zinc-50/50">
            <header className="flex items-center justify-between w-full border-b border-black/5 pb-4">
                <div className="flex flex-col items-start md:items-end w-full">
                    <h1 className="text-xl tracking-tight font-black text-black">Explore Events</h1>
                    <p className="text-xs text-amber-600 font-mono mt-0.5">{formattedDate}</p>
                </div>
            </header>

            <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between py-4">
                <div className="text-xs flex gap-3 overflow-hidden md:text-sm">
                    <p className="bg-black px-3 py-1.5 font-semibold rounded-md text-white w-max text-center border border-black">All events</p>
                    <p className="bg-white px-3 py-1.5 font-semibold rounded-md text-black w-max text-center border border-zinc-200">Concerts</p>
                    <p className="bg-white px-3 py-1.5 font-semibold rounded-md text-black w-max text-center border border-zinc-200">Conferences</p>
                </div>

                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="py-2 pl-4 pr-10 rounded-2xl bg-zinc-100 w-full text-zinc-700 focus:outline-green-200 text-xs md:text-sm"
                    />
                    <div className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 flex justify-center items-center rounded-full cursor-default">
                        <Search color="#22C55E" size={16} />
                    </div>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
                {
                    events.map((event)=> (
                        <EventCard key={event.id} event={event} />
                    ))
                }
            </div>
        </div>
    );
}