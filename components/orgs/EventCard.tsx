"use client";
import { MapPin, Edit2, Trash2, Clock, Users, Tag } from "lucide-react";
import { orgEventType } from "./OrgEventsPane";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventCard({ event, currentRole, id }: { event: orgEventType; currentRole: string; id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleDeleteEvent = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/event`, {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                router.refresh();
            }
        } catch { } finally {
            setLoading(false);
        }
    }

    return <div className="group relative flex flex-col w-full rounded-2xl border border-zinc-200/80 bg-white overflow-hidden transition-all duration-300 hover:shadow-md hover:border-zinc-300">
        <div className="relative w-full aspect-16/7 bg-zinc-100 overflow-hidden border-b border-zinc-100">
            {
                !event.image ? (
                    <img
                        src="/EventFallback.jpg"
                        alt="Event banner preview"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <img
                        src={event.image}
                        alt="Event banner preview"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )
            }
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                {(currentRole === "MODERATOR" || currentRole === "ADMIN") && <button
                    aria-label="Edit event"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 backdrop-blur-md text-zinc-700 border border-white/20 hover:bg-white hover:text-black shadow-sm transition active:scale-95"
                >
                    <Edit2 size={12} />
                </button>}
                {currentRole === "ADMIN" && <button
                    onClick={handleDeleteEvent}
                    aria-label="Delete event"
                    disabled={loading}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 backdrop-blur-md text-zinc-500 border border-white/20 hover:bg-red-50 hover:text-red-600 hover:border-red-100 shadow-sm transition active:scale-95 disabled:opacity-50"
                >
                    <Trash2 size={12} />
                </button>}
            </div>
        </div>
        <div className="p-3.5 flex flex-col flex-1 justify-between space-y-3.5">
            <div className="space-y-2">
                <div className="flex items-center gap-1 text-[9px] font-bold font-mono text-amber-600 uppercase tracking-wider">
                    <Clock size={10} /> {
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
                <div className="space-y-1">
                    <h4 className="font-bold text-sm sm:text-base tracking-tight text-zinc-900 line-clamp-1 group-hover:text-black transition-colors">
                        {event.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-400 font-medium line-clamp-1">
                        {event.desc}
                    </p>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <Tag size={11} />
                    {
                        event.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[9px] font-bold font-mono bg-zinc-100 text-zinc-600 border border-zinc-200/30 uppercase tracking-tight">
                                {tag}
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className="space-y-2 border-t border-zinc-100 pt-2.5">
                <p className="text-[11px] text-zinc-500 font-medium flex items-center gap-1 truncate">
                    <MapPin size={11} className="text-zinc-400 shrink-0" />
                    {event.venue}
                </p>
                <div className="flex items-end justify-between gap-2">
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 font-bold">
                            <span className="flex items-center gap-0.5"><Users size={10} /> Slots</span>
                            <span className="text-zinc-600">{event.sold}/{event.capacity}</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-black rounded-full" style={{ width: `${(event.sold / event.capacity) * 100}%` }} />
                        </div>
                    </div>
                    <div className="text-right shrink-0 font-mono pl-3">
                        <span className="text-xs text-zinc-400 font-bold block leading-none uppercase text-[8px] tracking-wider mb-0.5">Price</span>
                        <span className="text-base sm:text-lg font-black text-black leading-none tracking-tight">
                            ₹{event.price}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}