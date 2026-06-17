"use client";
import { QRCodeSVG } from "qrcode.react";
import { MapPin, Calendar, Ticket, X } from "lucide-react";
import { userBookingsType } from "@/sections/BookingPage";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";

export default function TicketCard({ booking, setIsPopupOpen }: { booking: userBookingsType; setIsPopupOpen: (val: boolean) => void }) {
    const [downloading, setDownloading] = useState(false);
    const ticketRef = useRef<HTMLDivElement>(null);

    const handleDownloadTicket = async () => {
        if (!ticketRef.current) return;
        setDownloading(true);
        try {
            const element = ticketRef.current;
            const dataUrl = await toPng(element, {
                quality: 0.95,
                pixelRatio: 2,
                cacheBust: true,
                filter: (node) => {
                    if (node instanceof HTMLElement) {
                        return node.getAttribute("data-html2canvas-ignore") !== "true";
                    }
                    return true;
                }
            });

            const imgWidth = 80;
            const tempImg = new Image();
            tempImg.src = dataUrl;

            tempImg.onload = () => {
                const imgHeight = (tempImg.height * imgWidth) / tempImg.width;

                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: [imgWidth + 10, imgHeight + 10]
                });

                pdf.addImage(dataUrl, "PNG", 5, 5, imgWidth, imgHeight);
                const safeFileName = booking.event.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                pdf.save(`ticket-${safeFileName}.pdf`);
                setDownloading(false);
            };
        } catch (error) {
            console.error("Error building downloadable ticket card document:", error);
        } finally {
            setDownloading(false);
        }
    }

    return <div ref={ticketRef} className="relative w-80 bg-white rounded-2xl border border-zinc-200 shadow-2xl flex flex-col shrink-0 select-none overflow-hidden animate-scale-up">
        <div className="w-full p-5 relative overflow-hidden min-h-42.5 flex flex-col justify-end shrink-0 pb-6 border-b-2 border-dashed border-white/30 rounded-t-2xl">
            <div className="absolute inset-0 z-0">
                <img
                    src={booking.event.image || "/EventFallback.jpg"}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-zinc-950/75 backdrop-blur-[1.5px]" />
            </div>
            <button
                onClick={() => setIsPopupOpen(false)} disabled={downloading}
                className="absolute right-3 top-3 p-1.5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors z-20 disabled:opacity-50"
            >
                <X size={15} />
            </button>
            <div className="space-y-3 relative z-10">
                <div>
                    <span className="text-[10px] font-black text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-md uppercase tracking-wider font-mono">
                        Verified Pass
                    </span>
                    <h3 className="text-base font-black text-white tracking-tight mt-2.5 leading-tight">
                        {booking.event.name}
                    </h3>
                </div>

                <div className="space-y-1 pt-1 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                        <Calendar size={13} className="text-zinc-300 shrink-0" />
                        <span>
                            {new Date(booking.event.startsAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            })}
                        </span>
                        <span className="text-white/20 font-normal">|</span>
                        <span className="font-mono text-[11px] text-zinc-300">
                            {new Date(booking.event.startsAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            })}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 truncate">
                        <MapPin size={13} className="shrink-0 text-zinc-400" />
                        <span className="truncate">{booking.event.venue}</span>
                    </div>
                </div>
            </div>

            <div className="w-4 h-4 bg-black/40 backdrop-blur-xs rounded-full -left-2 -bottom-2 absolute z-20 border-r border-zinc-800/10 shadow-inner" />
            <div className="w-4 h-4 bg-black/40 backdrop-blur-xs rounded-full -right-2 -bottom-2 absolute z-20 border-l border-zinc-800/10 shadow-inner" />
        </div>

        <div className="w-full p-5 bg-white flex flex-col items-center justify-center gap-4 pt-6 shrink-0">
            <div className="p-3 bg-white border border-zinc-200/80 rounded-xl shadow-xs transition-transform duration-300 hover:scale-[1.02]">
                <QRCodeSVG
                    value={booking.id}
                    size={140}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#09090b"
                    includeMargin={false}
                />
            </div>
            <div className="w-full grid grid-cols-2 gap-2 border border-zinc-100 bg-zinc-50/60 p-2 rounded-xl text-center">
                <div className="border-r border-zinc-200/60">
                    <span className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider block">Quantity</span>
                    <span className="text-xs font-mono font-black text-zinc-800 flex items-center justify-center gap-0.5 mt-0.5">
                        <Ticket size={11} className="text-zinc-400" /> x{booking.count}
                    </span>
                </div>
                <div>
                    <span className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider block">Total Paid</span>
                    <span className="text-xs font-mono font-black text-zinc-900 block mt-0.5">
                        {booking.event.price * booking.count === 0 ? "FREE" : `₹${booking.event.price * booking.count}`}
                    </span>
                </div>
            </div>

            <div className="w-full flex items-center justify-between gap-3 bg-zinc-50 border border-zinc-200/40 p-2 rounded-xl">
                <div className="text-left min-w-0 flex-1 pl-1">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block leading-none">
                        Security Token
                    </span>
                    <span className="text-[10px] font-mono font-bold text-zinc-500 block truncate uppercase mt-1">
                        {booking.id}
                    </span>
                </div>

                <button
                    onClick={handleDownloadTicket}
                    disabled={downloading}
                    className="p-2 bg-white text-zinc-700 hover:text-black border border-zinc-200/80 rounded-lg transition-all shadow-xs shrink-0 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    title="Download Ticket"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                </button>
            </div>
        </div>

    </div>
}