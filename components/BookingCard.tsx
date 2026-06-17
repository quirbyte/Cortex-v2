"use client";
import { userBookingsType } from "@/sections/BookingPage";
import { MapPin, Calendar, Ticket, Trash2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TicketCard from "./TicketCard";

export default function BookingCard({ booking }: { booking: userBookingsType }) {
    const [loading, setLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const router = useRouter();

    const handleDeleteBooking = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/booking`, {
                method: "DELETE",
                body: JSON.stringify({
                    id: booking.id
                })
            });
            if (res.ok) {
                router.refresh();
            } else {
                console.log("Unable to delete booking")
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return <>
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-zinc-200/60 bg-white transition-all duration-200 hover:border-zinc-300">
            <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200/40">
                    {booking.event.image ? <img
                        src={booking.event.image}
                        alt="event pic"
                        className="w-full h-full object-cover"
                    /> : <img
                        src="/EventFallback.jpg"
                        alt="Cortex Tech Summit"
                        className="w-full h-full object-cover"
                    />}
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm sm:text-base tracking-tight text-zinc-900 truncate">
                        {booking.event.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-0.5 text-[11px] sm:text-xs text-zinc-400 font-medium">
                        <span className="flex items-center gap-0.5 text-zinc-500 font-semibold shrink-0">
                            <Calendar size={12} className="text-zinc-400" />
                            {
                                new Date(booking.event.startsAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                })
                            }
                        </span>
                        <span className="flex items-center gap-0.5 truncate max-w-35 sm:max-w-none">
                            <MapPin size={12} className="shrink-0" />
                            {booking.event.venue}
                        </span>
                        <span className="flex items-center gap-0.5 font-mono text-zinc-600 font-bold bg-zinc-100 px-1.5 py-0.5 rounded-md text-[10px] border border-zinc-200/30 shrink-0">
                            <Ticket size={11} className="text-zinc-400" /> x{booking.count}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2.5 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                <div className="text-left sm:text-right font-mono shrink-0">
                    <span className="text-sm sm:text-base font-black text-zinc-900 block leading-none">
                        {booking.event.price * booking.count === 0 ? "FREE" : `₹${booking.event.price * booking.count}`}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium block mt-1 sm:mt-0.5 whitespace-nowrap">
                        (₹{booking.event.price}×{booking.count})
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <button onClick={() => setIsPopupOpen(true)} disabled={loading} className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors border border-zinc-100 sm:border-0 disabled:opacity-50">
                        <ExternalLink size={15} />
                    </button>
                    <button onClick={handleDeleteBooking} disabled={loading} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-zinc-100 sm:border-0 disabled:opacity-50">
                        <Trash2 size={15} />
                    </button>
                </div>
            </div>
        </div>
        {
            isPopupOpen && <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center bg-black/40 z-50 p-4 animate-fade-in">
                <TicketCard setIsPopupOpen={setIsPopupOpen} booking={booking} />
            </div>
        }
    </>
}