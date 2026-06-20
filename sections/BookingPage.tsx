import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import BookingCard from "@/components/BookingCard";
import { formatDate } from "@/helpers/date";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";

export type userBookingsType = {
    id: string;
    count: number;
    event: {
        name: string;
        image: string | null;
        venue: string;
        startsAt: Date;
        price: number;
    };
}

export default async function BookingsPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return <div>User uauthorized</div>;
    }
    const userId = (session.user as any).id;
    const currDate = new Date().toISOString();
    const formattedDate = formatDate({ date: currDate, option: 2 });

    const userBookings: userBookingsType[] = await prisma.booking.findMany({
        where: {
            bookerId: userId
        },
        select: {
            id: true,
            count: true,
            event: {
                select: {
                    name: true,
                    venue: true,
                    startsAt: true,
                    price: true,
                    image: true
                }
            }
        }
    });

    return (
        <div className="min-h-screen w-full pt-5 p-4 font-manrope bg-zinc-50/50 dark:bg-zinc-950">
            <header className="flex items-center justify-between w-full border-b border-black/5 pb-4 dark:border-zinc-800">
                <div className="flex flex-col items-start md:items-end w-full">
                    <h1 className="text-xl tracking-tight font-black text-black dark:text-white">My Bookings</h1>
                    <p className="text-xs text-amber-600 dark:text-blue-500 font-mono mt-0.5">{formattedDate}</p>
                </div>
            </header>

            <div className="w-full mt-5 flex items-center justify-between gap-4">
                <div className="bg-black text-white dark:bg-white dark:text-black text-xs font-medium px-4 py-1.5 rounded-lg select-none shadow-xs shrink-0">
                    All Bookings <span className="font-mono ml-1 text-zinc-400 font-bold">{userBookings.length}</span>
                </div>
                <a
                    href="/dashboard?tab=events"
                    className="flex items-center gap-1 text-xs font-bold text-zinc-900 hover:text-black bg-white hover:bg-zinc-100 border border-zinc-200/80 px-3 py-1.5 rounded-lg transition-all dark:bg-black dark:border-zinc-800 dark:hover:bg-black dark:text-white dark:hover:text-zinc-200"
                >
                    <Plus size={14} />
                    <span>Find Events</span>
                </a>
            </div>
            <main className="w-full mt-5 flex flex-col gap-3">
                {userBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </main>
        </div>
    );
}