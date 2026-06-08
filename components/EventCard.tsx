export default function EventCard() {
    return (
        <div className="bg-white cursor-default border border-zinc-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-zinc-300 group transition-all duration-300 flex flex-col">
            <div className="relative h-40 bg-zinc-900 w-full overflow-hidden flex items-center justify-center">
                <img
                    src="/eventsHeader.jpg"
                    alt="Event backdrop"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap mask-gradient">
                        <span className="text-[9px] font-mono tracking-wider font-bold uppercase bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 inline-block">
                            Sports & Fitness
                        </span>
                        <span className="text-[9px] font-mono tracking-wider font-bold uppercase bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 inline-block">
                            Business
                        </span>
                        <span className="text-[9px] font-mono tracking-wider font-bold uppercase bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 inline-block">
                            Tech
                        </span>
                        <span className="text-[9px] font-mono tracking-wider font-bold uppercase bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 inline-block">
                            Meetup
                        </span>
                    </div>

                    <h4 className="font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors text-base tracking-tight mb-1">
                        Echoes of Autumn Arena Tour
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                        An immersive live acoustic experience featuring global indie artists with state-of-the-art stadium laser orchestration.
                    </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-4">
                    <div className="flex flex-col min-w-0">
                        <span className="truncate text-[10px] font-mono text-zinc-400 leading-none mb-1">MSG, NY</span>
                        <span className="text-zinc-900 font-black text-lg leading-none tracking-tight">
                            ₹560
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 shrink-0">
                        <span className="text-[10px] font-bold text-emerald-600 leading-none">
                            Tickets Available
                        </span>
                        <button className="bg-zinc-950 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs hover:bg-zinc-800 active:scale-[0.98] transition-all whitespace-nowrap">
                            Book Now →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}