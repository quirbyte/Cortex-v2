"use client";
import { X, Camera, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function VerifyTab({
    setVerifyTabOpen,
    loading,
    setLoading,
    eventId
}: {
    setVerifyTabOpen: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    eventId: string
}) {
    const [ticketId, setTicketId] = useState("");
    const [cameraStarted, setCameraStarted] = useState(false);
    const [scannerError, setScannerError] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const router = useRouter();
    const scannerId = "popup-qr-scanner-node";

    const autoVerifyScannedTicket = async (scannedId: string) => {
        if (!scannedId.trim()) return;
        try {
            setLoading(true);
            const res = await fetch(`/api/event/verify`, {
                method: "POST",
                body: JSON.stringify({
                    eventId,
                    ticketId: scannedId
                })
            });
            if (res.ok) {
                router.refresh();
                setVerifyTabOpen(false);
            }
        } catch {
            alert("Failed to verify ticket");
        } finally {
            setLoading(false);
        }
    };

    const startScanningStream = async () => {
        setCameraStarted(true);
        setScannerError(null);

        setTimeout(async () => {
            try {
                const scannerInstance = new Html5Qrcode(scannerId);
                scannerRef.current = scannerInstance;

                await scannerInstance.start(
                    { facingMode: "environment" },
                    {
                        fps: 12,
                        qrbox: { width: 200, height: 200 },
                    },
                    (decodedText) => {
                        setTicketId(decodedText);
                        autoVerifyScannedTicket(decodedText);
                    },
                    () => { }
                );
            } catch (err) {
                console.error("Camera mounting resource error:", err);
                setScannerError("Camera inactive, blocked, or missing permissions.");
                setCameraStarted(false);
            }
        }, 100);
    };

    useEffect(() => {
        return () => {
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop()
                    .then(() => scannerRef.current?.clear())
                    .catch((err) => console.error("Scanner tracking termination failure", err));
            }
        };
    }, []);

    const handleTicketVerify = async () => {
        await autoVerifyScannedTicket(ticketId);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/40 dark:bg-black/60 z-50 p-4">
            <div className="w-full max-w-xs relative bg-white dark:bg-zinc-950 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800 shadow-2xl flex flex-col">

                <button
                    disabled={loading}
                    onClick={() => setVerifyTabOpen(false)}
                    className="absolute top-4 right-4 h-8 w-8 flex rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 justify-center items-center text-zinc-500 hover:text-black dark:hover:text-white transition-all disabled:opacity-50"
                >
                    <X size={15} />
                </button>

                <h1 className="font-bold text-center w-full text-black dark:text-white text-xl tracking-tighter flex items-center justify-center gap-1.5">
                    <Camera size={16} className="text-green-500" />
                    Verify Ticket
                </h1>
                <p className="text-[10px] text-zinc-500 w-full text-center mt-1">Permit user ticket to get event benefits</p>

                <div className="w-full aspect-square border-zinc-200 border dark:border-zinc-800 mt-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 overflow-hidden relative flex items-center justify-center group">

                    {cameraStarted ? (
                        <div id={scannerId} className="w-full h-full object-cover" />
                    ) : (
                        <button
                            type="button"
                            onClick={startScanningStream}
                            className="flex flex-col items-center justify-center gap-2 p-6 transition-all rounded-full bg-white dark:bg-zinc-950 text-zinc-400 hover:text-green-500 dark:text-zinc-600 dark:hover:text-green-400 h-16 w-16 border border-zinc-100 dark:border-zinc-800 shadow-xs group-hover:scale-105 active:scale-95"
                        >
                            <Camera size={22} strokeWidth={2.2} />
                        </button>
                    )}

                    {scannerError && (
                        <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center text-center p-4">
                            <span className="text-[11px] font-medium text-red-500 font-mono">{scannerError}</span>
                            <button onClick={startScanningStream} className="text-[10px] font-bold underline text-zinc-400 hover:text-zinc-600 mt-2">Try Again</button>
                        </div>
                    )}

                    {loading && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-2">
                            <RefreshCw size={16} className="animate-spin text-green-400" />
                            <span className="text-[9px] font-mono tracking-widest font-bold uppercase">Verifying Key...</span>
                        </div>
                    )}
                </div>

                <input
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    type="text"
                    className="mt-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-xl w-full px-3 py-3.5 focus:outline-none border border-zinc-200 focus:border-green-400 dark:border-zinc-800/80 text-xs uppercase tracking-widest font-mono"
                    placeholder="Enter Ticket Id here"
                />

                <button
                    disabled={loading}
                    onClick={handleTicketVerify}
                    className="w-full flex justify-center items-center bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold text-xs tracking-wide py-3 mt-2 rounded-xl shadow-sm transition active:scale-95"
                >
                    Check & Confirm
                </button>
            </div>
        </div>
    );
}