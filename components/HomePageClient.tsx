"use client";
import { ChevronLeft, ChevronRight, TicketCheck, TrendingUp, Calendar, Share2Icon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { formatDate } from "@/helpers/date";
import { event, userBooking } from "@/sections/HomePage";
import { useRouter } from "next/navigation";

export default function HomePageClient({ topEvents, userBookings }: { topEvents: event[]; userBookings: userBooking[] }) {
    const today = useMemo(() => new Date(), []);
    const formattedDate = formatDate({ date: today.toISOString(), option: 2 });
    const [current, setCurrent] = useState(0);
    const router = useRouter();

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrent((current - 1 + topEvents.length) % topEvents.length);
    };

    const nextSlide = () => {
        setCurrent((prevCurrent) => (prevCurrent + 1) % topEvents.length);
    };

    useEffect(() => {
        if (topEvents.length === 0) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [topEvents.length]);

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const monthLabel = today.toLocaleString("default", { month: "long", year: "numeric" });
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const bookedDaysMap = useMemo(() => {
        const bookedSet = new Set<number>();
        userBookings.forEach((booking) => {
            if (booking.event?.startsAt) {
                const eventDate = new Date(booking.event.startsAt);
                if (eventDate.getFullYear() === currentYear && eventDate.getMonth() === currentMonth) {
                    bookedSet.add(eventDate.getDate());
                }
            }
        });
        return bookedSet;
    }, [userBookings, currentYear, currentMonth]);

    const handleEventPageRedirect = async (eventId: string) => {
        router.push(`/dashboard/event/${eventId}`);
    }

    return (
        <div className="min-h-screen w-full pt-7 md:pt-5 p-4 font-manrope bg-zinc-50/50 dark:bg-zinc-950">
            <header className="flex items-center justify-between w-full border-b border-black/5 dark:border-zinc-800 pb-4">
                <div className="hidden md:block">
                    <p className="text-zinc-400 dark:text-zinc-600 text-xs font-semibold tracking-wider uppercase">Welcome back,</p>
                    <p className="text-xl font-bold tracking-tight text-black dark:text-zinc-400">Soumyadip</p>
                </div>
                <div className="flex flex-col items-end w-full md:w-auto">
                    <h1 className="text-xl tracking-tight font-black text-black dark:text-white">Dashboard</h1>
                    <p className="text-xs text-amber-600 dark:text-blue-500 font-mono mt-0.5">{formattedDate}</p>
                </div>
            </header>

            {topEvents.length > 0 && (
                <div className="relative mt-3 w-full rounded-2xl bg-black dark:bg-zinc-800 overflow-hidden flex flex-col md:flex-row h-120 md:h-96 shadow-sm group">
                    <div className="relative w-full md:w-3/5 h-1/2 md:h-full shrink-0 overflow-hidden">
                        <img
                            src={topEvents[current].image || "/EventFallback.jpg"}
                            alt={topEvents[current].name}
                            className="h-full w-full object-cover transition-all duration-500 ease-out scale-100"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black md:bg-linear-to-r md:from-transparent md:to-black/80" />
                    </div>

                    <div className="relative flex-1 h-1/2 md:h-full bg-black dark:bg-black/60 p-6 md:p-10 flex flex-col justify-center items-start text-left z-10">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-full mb-3">
                            Featured Event
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white line-clamp-2 transition-all">
                            {topEvents[current].name}
                        </h2>
                        <p className="mt-2.5 text-zinc-400 text-xs md:text-sm tracking-wide leading-relaxed line-clamp-3 md:max-w-[90%]">
                            {topEvents[current].desc}
                        </p>
                        <button onClick={() => handleEventPageRedirect(topEvents[current].id)} className="mt-5 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-bold text-xs md:text-sm tracking-tight transition-all active:scale-[0.98] cursor-pointer shadow-md shadow-amber-400/10">
                            Book Tickets Now
                        </button>
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex justify-center items-center p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg text-white opacity-100 md:opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black transition-all cursor-pointer"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex justify-center items-center p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg text-white opacity-100 md:opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black transition-all cursor-pointer"
                        aria-label="Next Slide"
                    >
                        <ChevronRight size={18} />
                    </button>

                    <div className="absolute right-6 bottom-4 z-20 flex space-x-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                        {topEvents.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === current ? "w-4 bg-amber-400" : "w-1.5 bg-white/40 hover:bg-white/60"}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            <h1 className="text-left text-3xl tracking-tighter font-bold my-7 text-black dark:text-white">Trending</h1>

            <div className="mt-8 flex flex-col lg:flex-row w-full gap-5">
                <div className="w-full lg:w-1/2 h-100 bg-white dark:bg-zinc-950 dark:border-zinc-800 border border-black/10 rounded-2xl flex flex-col p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/5">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={18} className="text-amber-500" />
                            <h2 className="text-sm font-bold tracking-tight text-black dark:text-white">Top Events</h2>
                        </div>
                        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-900 dark:text-white px-2.5 py-1 rounded-md font-bold text-zinc-500 tracking-wide uppercase">Hot Now</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto no-scrollbar">
                        {topEvents.map((event, idx) => (
                            <div
                                key={idx}
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-black/5 flex items-center justify-between p-3.5 rounded-xl font-medium transition-all duration-200 hover:bg-black hover:text-white dark:hover:text-black group/row dark:hover:bg-zinc-50"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-xs font-mono text-black/40 dark:text-white/40 group-hover/row:text-white/40 dark:group-hover/row:text-black/40">0{idx + 1}</span>
                                    <p className="text-xs md:text-sm font-bold truncate text-zinc-800 dark:text-zinc-400 group-hover/row:text-white dark:group-hover/row:text-black">{event.name}</p>
                                </div>

                                <button onClick={() => handleEventPageRedirect(event.id)} className="shrink-0 ml-4 py-1.5 px-3 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold tracking-tight border border-white/10 group-hover/row:bg-amber-400 group-hover/row:text-black transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer">
                                    <TicketCheck size={13} />
                                    <span className="hidden sm:inline">Book Now</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 h-100 bg-white dark:bg-zinc-950 dark:border-zinc-800 border border-black/10 rounded-2xl p-5 flex flex-col shadow-xs">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/5">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-amber-500" />
                            <h2 className="text-sm font-bold tracking-tight text-black dark:text-white">Event Calendar</h2>
                        </div>
                        <span className="text-[10px] bg-black text-white dark:bg-zinc-900 px-2.5 py-1 rounded-md font-mono font-bold tracking-wide uppercase">
                            {monthLabel}
                        </span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                            <span key={day} className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                {day}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 flex-1 text-center items-center">
                        {Array.from({ length: firstDayIndex }).map((_, bIdx) => (
                            <div key={`empty-${bIdx}`} className="h-9" />
                        ))}

                        {Array.from({ length: totalDaysInMonth }).map((_, i) => {
                            const dayNumber = i + 1;
                            const isToday = dayNumber === today.getDate();
                            const isBooked = bookedDaysMap.has(dayNumber);

                            return (
                                <div key={dayNumber} className="relative flex items-center justify-center h-9">
                                    <button
                                        disabled={!isBooked && !isToday}
                                        className={`h-8 w-8 rounded-lg text-xs font-mono font-bold flex flex-col items-center justify-center transition-all duration-150 ${isBooked
                                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black shadow-sm ring-1 ring-black/10 cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-200"
                                            : isToday
                                                ? "bg-amber-400 text-black font-black ring-2 ring-amber-400/20"
                                                : "text-zinc-400 dark:text-zinc-600 cursor-default opacity-40"
                                            }`}
                                    >
                                        <span>{dayNumber}</span>

                                        {isBooked && (
                                            <span className="h-1 w-1 rounded-full bg-amber-400 dark:bg-blue-500 mt-0.5 animate-pulse" />
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-black/5 mt-3 text-[10px] font-bold text-zinc-500">
                        <div className="flex items-center gap-1.5 justify-center bg-zinc-50 dark:bg-zinc-900 dark:text-white py-1.5 rounded-lg border border-black/5">
                            <span className="h-2 w-2 rounded-sm bg-amber-400" />
                            <span>Today</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center bg-zinc-50 dark:bg-zinc-900 dark:text-white py-1.5 rounded-lg border border-black/5">
                            <span className="h-2 w-2 rounded-sm bg-zinc-900 dark:bg-zinc-100" />
                            <span>Booked ({bookedDaysMap.size})</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center bg-zinc-50 dark:bg-zinc-900 dark:text-white py-1.5 rounded-lg border border-black/5">
                            <span className="h-2 w-2 rounded-sm bg-zinc-200/50 dark:bg-zinc-800" />
                            <span>Available</span>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="text-left text-3xl tracking-tighter font-bold mt-7 text-black dark:text-white">Share with people</h1>
            <div className="mt-3 flex gap-4 items-center">
                <div>
                    <img src="/favicon.svg" alt="" className="w-13 h-13 object-cover" />
                </div>
                <div>
                    <p className="font-semibold text-sm md:text-md text-black dark:text-white">Spread the word</p>
                    <p className="font-light text-[10px] text-black dark:text-white">Help us grow</p>
                </div>
                <div className="flex gap-3 items-center ml-7">
                    <img src="/linkedin.svg" alt="" className="h-8 w-8 flex items-center justify-center rounded-full object-contain" />
                    <div className="bg-green-800 h-8 w-8 flex items-center justify-center rounded-full"><Share2Icon size={18} color="white" /></div>
                </div>
            </div>
            <div className="mt-7 text-[10px] text-zinc-500">
                © 2026 Cortex. All rights reserved
            </div>
        </div>
    );
}