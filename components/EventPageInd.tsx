"use client";
import { eventDataType } from "@/app/dashboard/event/[eventId]/page";
import { Calendar, MapPin, Ticket, ShieldCheck, ArrowLeft, Users, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BookingSidebar from "@/components/BookingSidebar";

export default function EventPageInd({ event, userId }: { event: eventDataType; userId: string }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!event) return null;

    const formattedDate = new Date(event.startsAt).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const formattedTime = new Date(event.startsAt).toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).split(",")[1] || new Date(event.startsAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const isSoldOut = event.sold >= event.capacity;

    return (
        <>
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-black dark:hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                        Back to events
                    </Link>
                </div>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

                    <div className="lg:col-span-7 space-y-6">
                        <div className="w-full aspect-video bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs relative">
                            <img
                                src={event.image || "/EventFallback.jpg"}
                                alt={event.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                                {event.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono bg-black/60 dark:bg-zinc-900/80 text-zinc-200 border border-white/10 uppercase tracking-wider backdrop-blur-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                                {event.name}
                            </h1>
                            <div className="h-px w-full bg-zinc-200/60 dark:bg-zinc-800/60 my-2" />
                            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                About The Event
                            </h3>
                            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium whitespace-pre-line">
                                {event.desc || "No description provided for this event."}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-6 p-5 sm:p-6 rounded-3xl border border-zinc-200/80 bg-white dark:bg-zinc-900/20 dark:border-zinc-800/80 shadow-xl dark:shadow-black/40 backdrop-blur-xs space-y-5">

                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                        Admission Ticket
                                    </span>
                                    <div className="pt-1 flex items-baseline gap-1">
                                        <span className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                                            {event.price !== 0 ? `₹${event.price}` : "FREE"}
                                        </span>
                                        {event.price !== 0 && <span className="text-xs text-zinc-400 font-medium">/ person</span>}
                                    </div>
                                </div>
                                <button className="p-2 rounded-xl border border-zinc-100 dark:border-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                    <Share2 size={16} />
                                </button>
                            </div>

                            <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />

                            <div className="space-y-4 text-xs sm:text-sm">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-500 shrink-0">
                                        <Calendar size={16} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-zinc-900 dark:text-zinc-100">Date</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{formattedDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-500 shrink-0">
                                        <Clock size={16} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-zinc-900 dark:text-zinc-100">Time</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{formattedTime}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-500 shrink-0">
                                        <MapPin size={16} />
                                    </div>
                                    <div className="space-y-0.5 min-w-0">
                                        <p className="font-bold text-zinc-900 dark:text-zinc-100">Venue Location</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate">{event.venue}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-zinc-50/60 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/40 space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-zinc-400">
                                    <span className="flex items-center gap-1"><Users size={12} /> Availability Status</span>
                                    <span className="text-zinc-700 dark:text-zinc-300">{event.sold} / {event.capacity} Slots Filled</span>
                                </div>
                                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${isSoldOut ? "bg-red-500" : "bg-black dark:bg-zinc-200"}`}
                                        style={{ width: `${Math.min((event.sold / event.capacity) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                disabled={isSoldOut}
                                onClick={() => setIsSidebarOpen(true)}
                                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide text-white bg-black dark:bg-zinc-50 dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
                            >
                                <Ticket size={16} />
                                {isSoldOut ? "Sold Out" : "Book Now"}
                            </button>

                            <p className="text-[10px] text-center font-medium text-zinc-400 flex items-center justify-center gap-1">
                                <ShieldCheck size={12} className="text-emerald-500" />
                                Secure checkout via automated confirmation.
                            </p>
                        </div>
                    </div>
                </main>
            </div>

            <BookingSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                loading={loading}
                setLoading={setLoading}
                event={event}
            />
        </>
    );
}