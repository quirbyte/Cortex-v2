"use client";
import { EventType } from "@/sections/EventsPage";
import { Clock, Loader2, Users, X, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface BookingSidebarProps {
    isOpen: boolean;
    loading: boolean;
    onClose: () => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
    event: EventType
}

export default function BookingSidebar({ isOpen, onClose, loading, setLoading, event }: BookingSidebarProps) {
    const [quantity, setQuantity] = useState(0);
    const router = useRouter();

    const handleBookEvent = async () => {
        if (quantity <= 0) {
            alert("You must book at least one ticket");
            return;
        }
        if (event.sold >= event.capacity || (event.sold + quantity > event.capacity)) {
            alert("Capacity filled! No more seats left..");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`/api/booking`, {
                method: "POST",
                body: JSON.stringify({
                    eventId: event.id,
                    quantity
                })
            });
            if (res.ok) {
                router.refresh();
                onClose();
            }
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div
                onClick={!loading ? onClose : undefined}
                className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            />

            <div
                className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200/80 dark:border-zinc-800 shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="relative pt-16 md:pt-5 p-4 border-b border-zinc-100 dark:border-zinc-800/60 flex flex-col justify-center">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight text-base flex items-center gap-1.5">
                        <Ticket size={16} className="text-green-500" />
                        Booking Details
                    </h3>
                    <p className="text-xs font-medium text-zinc-400 mt-0.5">Specify the details of your booking</p>
                    <button
                        disabled={loading}
                        onClick={onClose}
                        className="absolute top-4 right-4 h-8 w-8 flex rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 justify-center items-center text-zinc-400 hover:text-black dark:hover:text-white transition-all disabled:opacity-50"
                    >
                        <X size={15} />
                    </button>
                </div>

                <div className="p-4 flex-1 overflow-y-auto space-y-4 pb-24 scrollbar-thin">
                    <div className="w-full aspect-16/10 bg-zinc-50 dark:bg-zinc-900 border-zinc-200/60 border dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
                        {event.image ? (
                            <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                        ) : (
                            <img src="/EventFallback.jpg" alt={event.name} className="w-full h-full object-cover" />
                        )}
                    </div>

                    <div className="space-y-1">
                        <h1 className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">{event.name}</h1>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{event.desc}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/50 space-y-3">
                        <div className="flex items-center gap-2 text-amber-600 dark:text-blue-500 font-mono font-bold text-xs">
                            <Clock size={13} strokeWidth={2.5} />
                            <span>
                                {new Date(event.startsAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                })}
                            </span>
                        </div>

                        <div className="space-y-1.5 w-full">
                            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 font-bold">
                                <span className="flex items-center gap-1"><Users size={12} /> Slots Remaining</span>
                                <span className="text-zinc-700 dark:text-zinc-300">{event.sold}/{event.capacity}</span>
                            </div>
                            <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-black dark:bg-zinc-200 rounded-full transition-all duration-300"
                                    style={{ width: `${(event.sold / event.capacity) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            placeholder="Enter number of tickets (min. 1)"
                            className="w-full bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs px-3.5 py-3.5 border border-zinc-200/60 dark:border-zinc-800/80 focus:outline-none focus:border-black dark:focus:border-zinc-600 transition font-medium"
                        />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2.5 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl transition disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleBookEvent}
                        disabled={loading}
                        className="px-4 py-2.5 text-xs font-bold text-white bg-black dark:bg-zinc-100 dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-xl transition flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
                    >
                        {loading && <Loader2 size={13} className="animate-spin" />}
                        Confirm
                    </button>
                </div>
            </div>
        </>
    );
}