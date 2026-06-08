import { Dispatch, SetStateAction } from "react";
import { optionTypes } from "@/app/dashboard/page";

export default function HomePage({ setOption }: { setOption: Dispatch<SetStateAction<optionTypes>> }) {
    return (
        <div className="min-h-screen w-full bg-zinc-50 font-manrope text-zinc-900 antialiased selection:bg-zinc-950 selection:text-white">
            <div className="bg-zinc-900 text-zinc-300 text-xs py-2 px-6 text-center tracking-wide font-medium border-b border-zinc-800">
                🔥 Trending: <span className="text-amber-400 font-bold">Next.js Micro-Summit SF</span> tickets are 85% sold out. Book yours now!
            </div>

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

                <header className="flex justify-end w-full border-b-2 border-black mb-3">
                    <p className="uppercase italic font-extrabold text-3xl mr-3 -mt-3">Home</p>
                </header>

                <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-xl shadow-zinc-200/50 group bg-zinc-950 mb-10 border border-zinc-800">
                    <img
                        src="/eventsHeader.jpg"
                        alt="Concert and event crowd background"
                        className="w-full h-full object-cover opacity-50 group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
                    />

                    <div className="absolute inset-0 bg-linear-to-tr from-zinc-950 via-zinc-950/60 to-transparent p-8 md:p-14 flex flex-col justify-end items-start">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/10 text-zinc-300 border border-white/10 backdrop-blur-md mb-2">
                            Featured Experience
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white max-w-xl leading-none mb-4">
                            The intelligence behind every event.
                        </h1>
                        <p className="text-zinc-400 text-sm md:text-base max-w-md mb-6 leading-relaxed">
                            Discover verified live experiences, pick your ideal seating arrays, and complete instant ticket checkouts securely.
                        </p>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button onClick={() => setOption("events")} className="bg-white text-zinc-950 hover:bg-zinc-200 active:scale-98 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all duration-200 w-full sm:w-auto">
                                Explore Live Events
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-xs flex flex-col justify-between group hover:border-zinc-300 transition-colors duration-300">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Live Ticket Drops</h3>
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            </div>
                            <p className="text-lg font-black tracking-tight text-zinc-900 mb-2">High-Demand Queues</p>
                            <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                                Track trending tickets selling out across the platform in real time. Hop into queues instantly.
                            </p>

                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs mb-1 font-medium text-zinc-700">
                                        <span>Next.js Summit SF</span>
                                        <span className="text-red-500 font-bold font-mono">15% Left</span>
                                    </div>
                                    <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-red-500 h-full w-[85%] rounded-full"></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs mb-1 font-medium text-zinc-700">
                                        <span>Echoes of Autumn</span>
                                        <span className="text-amber-500 font-bold font-mono">42% Left</span>
                                    </div>
                                    <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-amber-500 h-full w-[58%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setOption("events")}
                            className="mt-5 text-xs font-bold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 py-2 rounded-xl text-center transition-colors w-full"
                        >
                            Browse Active Queues →
                        </button>
                    </div>

                    <div className="bg-zinc-950 text-zinc-100 p-6 rounded-2xl shadow-xs flex flex-col justify-between border border-zinc-900">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Network Pulse</h3>
                                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">System Normal</span>
                            </div>
                            <p className="text-lg font-black tracking-tight text-white mb-2">Live App Bookings</p>
                            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                                Real-time transaction logs and user check-ins happening across our public event infrastructure.
                            </p>

                            <div className="font-mono text-[11px] space-y-2 bg-zinc-900 p-3 rounded-xl border border-zinc-800/60">
                                <div className="flex items-center gap-2 text-zinc-300">
                                    <span className="text-emerald-400">●</span>
                                    <span className="text-zinc-500">User_382</span> booked Football Cup
                                </div>
                                <div className="flex items-center gap-2 text-zinc-300">
                                    <span className="text-emerald-400">●</span>
                                    <span className="text-zinc-500">User_914</span> scanned Modernity Expo Pass
                                </div>
                                <div className="flex items-center gap-2 text-zinc-300">
                                    <span className="text-emerald-400">●</span>
                                    <span className="text-zinc-500">User_112</span> downloaded Ticket PDF
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                            <span>API Latency: 42ms</span>
                            <span>Secured via Stripe</span>
                        </div>
                    </div>

                    <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors duration-300">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">Total Attendees Managed</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black tracking-tight text-zinc-900">48.2K</span>
                                <span className="text-xs font-bold text-emerald-600 font-mono bg-emerald-50 px-1.5 py-0.5 rounded">+24% Monthly</span>
                            </div>
                            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Aggregated ticket confirmations and corporate seat allocations fulfilled across public and private events.</p>
                        </div>
                        <div className="mt-6 h-10 w-full flex items-end gap-1 pt-2">
                            <div className="bg-zinc-200 h-4 w-full rounded-sm hover:bg-zinc-900 transition-colors"></div>
                            <div className="bg-zinc-200 h-6 w-full rounded-sm hover:bg-zinc-900 transition-colors"></div>
                            <div className="bg-zinc-200 h-5 w-full rounded-sm hover:bg-zinc-900 transition-colors"></div>
                            <div className="bg-zinc-200 h-8 w-full rounded-sm hover:bg-zinc-900 transition-colors"></div>
                            <div className="bg-zinc-900 h-10 w-full rounded-sm"></div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-end mb-6 w-full">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Handpicked Selections</h3>
                        <h2 className="text-2xl font-black tracking-tight text-zinc-900">Top Deployed Events</h2>
                    </div>
                    <button onClick={() => setOption("events")} className="text-xs font-bold text-zinc-600 hover:text-zinc-950 underline underline-offset-4 transition-colors">
                        View All Events
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-zinc-300 group transition-all duration-300 flex flex-col">
                        <div className="relative h-44 bg-zinc-900 w-full overflow-hidden flex items-center justify-center text-zinc-700 text-4xl group-hover:scale-105 transition-transform duration-500">
                            🎤
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[10px] font-mono tracking-wider font-bold uppercase bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">Concerts</span>
                                    <span className="text-xs font-bold text-emerald-600">Tickets Available</span>
                                </div>
                                <h4 className="font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors text-base tracking-tight mb-1">
                                    Echoes of Autumn Arena Tour
                                </h4>
                                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                                    An immersive live acoustic experience featuring global indie artists with state-of-the-art stadium laser orchestration.
                                </p>
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-4 border-t border-zinc-100 font-mono text-[11px] text-zinc-400">
                                <span>Madison Square Garden</span>
                                <span className="text-zinc-900 font-bold">$75 onwards</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-zinc-300 group transition-all duration-300 flex flex-col">
                        <div className="relative h-44 bg-zinc-900 w-full overflow-hidden flex items-center justify-center text-zinc-700 text-4xl group-hover:scale-105 transition-transform duration-500">
                            🏆
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[10px] font-mono tracking-wider font-bold uppercase bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">Sports</span>
                                    <span className="text-xs font-bold text-amber-600">Selling Fast</span>
                                </div>
                                <h4 className="font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors text-base tracking-tight mb-1">
                                    Global Champions Football Cup
                                </h4>
                                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                                    The ultimate championship showdown. Catch the world's highest-ranked clubs matching up for the golden silverware.
                                </p>
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-4 border-t border-zinc-100 font-mono text-[11px] text-zinc-400">
                                <span>Levi's Stadium, CA</span>
                                <span className="text-zinc-900 font-bold">$120 onwards</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-zinc-300 group transition-all duration-300 flex flex-col">
                        <div className="relative h-44 bg-zinc-900 w-full overflow-hidden flex items-center justify-center text-zinc-700 text-4xl group-hover:scale-105 transition-transform duration-500">
                            🖼️
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[10px] font-mono tracking-wider font-bold uppercase bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">Exhibitions</span>
                                    <span className="text-xs font-bold text-zinc-400">Last Few Seats</span>
                                </div>
                                <h4 className="font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors text-base tracking-tight mb-1">
                                    Minimalism & Modernity Expo
                                </h4>
                                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                                    A curated gallery display investigating architectural design paradigms, high-contrast monochrome canvas, and scale.
                                </p>
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-4 border-t border-zinc-100 font-mono text-[11px] text-zinc-400">
                                <span>The Met Modern, NY</span>
                                <span className="text-zinc-900 font-bold">$30 onwards</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl shadow-xs hover:border-zinc-300 transition-all duration-300 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between w-full">
                    <div className="flex gap-4 items-start">
                        <div className="h-12 w-12 shrink-0 rounded-2xl bg-zinc-950 text-white flex items-center justify-center text-lg shadow-md shadow-zinc-900/10">
                            ➕
                        </div>
                        <div>
                            <h3 className="text-lg font-bold tracking-tight text-zinc-900 mb-1">Planning to launch your own event?</h3>
                            <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
                                Connect your business profile to our manager tools to generate seamless custom registration pages, map seating charts, verify entry tickers via QR scanning codes, and check live earnings analytics payout streams.
                            </p>
                        </div>
                    </div>
                    <button className="bg-zinc-950 text-white hover:bg-zinc-800 active:scale-98 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-sm transition-all whitespace-nowrap w-full lg:w-auto">
                        Create Event Listing
                    </button>
                </div>
            </div>
        </div>
    );
}