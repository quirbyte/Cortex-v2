"use client";
import { EventType } from "@/sections/EventsPage";
import { MapPin, Clock, Users, Tag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventCard({ event }: { event: EventType }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleBookEvent = async () => {
        if (event.sold >= event.capacity) {
            alert("Capacity filled! No more seats left..");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`/api/booking`, {
                method: "POST",
                body: JSON.stringify({
                    eventId: event.id
                })
            });
            if (res.ok) {
                router.refresh();
            }
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="group relative flex flex-col w-full rounded-2xl border border-zinc-200/80 bg-white overflow-hidden transition-all duration-300 hover:shadow-md hover:border-zinc-300">
            <div className="relative w-full aspect-16/7 bg-zinc-100 overflow-hidden border-b border-zinc-100">
                {(event.image) ? <img
                    src={event.image}
                    alt="Event banner preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                /> : <img
                    src="/eventsHeader.jpg"
                    alt="Event banner preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />}
            </div>

            <div className="p-3.5 flex flex-col flex-1 justify-between space-y-3.5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold font-mono uppercase tracking-wider">
                        <span className="text-zinc-500 font-sans normal-case font-semibold hover:underline cursor-pointer">
                            {event.createdBy.name}
                        </span>
                        <div className="flex items-center gap-1 text-amber-600">
                            <Clock size={10} />
                            {
                                new Date(event.startsAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                })
                            }
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h4 className="font-bold text-sm sm:text-base tracking-tight text-zinc-900 line-clamp-1 group-hover:text-black transition-colors">
                            {event.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-zinc-400 font-medium line-clamp-2 leading-relaxed">
                            {event.desc}
                        </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        <Tag size={10} className="text-zinc-400" />
                        {
                            event.tags.map((tag) =>
                                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold font-mono bg-zinc-100 text-zinc-600 border border-zinc-200/30 uppercase tracking-tight">
                                    {tag}
                                </span>
                            )
                        }
                    </div>
                </div>

                <div className="space-y-2.5 border-t border-zinc-100 pt-2.5">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[11px] text-zinc-500 font-medium flex items-center gap-1 truncate">
                            <MapPin size={11} className="text-zinc-400 shrink-0" />
                            {event.venue}
                        </p>
                        <div className="text-right font-mono shrink-0">
                            <span className="text-base font-black text-zinc-900 leading-none tracking-tight">
                                {event.price !== 0 ? `₹${event.price}` : "FREE"}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                        <div className="flex-1 space-y-1.5 min-w-0">
                            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 font-bold">
                                <span className="flex items-center gap-0.5"><Users size={10} /> Slots</span>
                                <span className="text-zinc-600">{event.sold}/{event.capacity}</span>
                            </div>
                            <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-black rounded-full"
                                    style={{ width: `${(event.sold / event.capacity) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="shrink-0">
                            <button disabled={loading} onClick={handleBookEvent} className="bg-zinc-950 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs hover:bg-zinc-800 active:scale-[0.98] transition-all whitespace-nowrap flex items-center gap-1 disabled:opacity-50">
                                Book Now
                                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}