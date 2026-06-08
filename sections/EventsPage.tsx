import EventCard from "@/components/EventCard";
import { Search } from "lucide-react";

export default function EventPage() {
    return (
        <div className="min-h-screen w-full bg-zinc-50 font-manrope text-zinc-900 antialiased selection:bg-zinc-950 selection:text-white">
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <header className="flex justify-end w-full border-b-2 border-zinc-900 pb-2 mb-6">
                    <p className="uppercase italic font-black text-3xl tracking-tight text-zinc-950">
                        Explore Events
                    </p>
                </header>

                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 my-4">
                    <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                        <button className="bg-zinc-950 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-xs">
                            All Drops
                        </button>
                        <button className="bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-600 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all">
                            Concerts
                        </button>
                        <button className="bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-600 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all">
                            Sports
                        </button>
                        <button className="bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-600 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all">
                            Business
                        </button>
                    </div>

                    <div className="relative w-full sm:w-auto shrink-0">
                        <input 
                            type="text" 
                            className="w-full sm:w-72 bg-zinc-200/70 hover:bg-zinc-200 focus:bg-white py-2 pl-4 pr-10 rounded-xl focus:outline-hidden border border-transparent focus:border-zinc-900 font-medium text-xs transition-all duration-200 placeholder:text-zinc-500 text-zinc-900" 
                            placeholder="Search for active events..." 
                        />
                        <div className="absolute right-3 top-2.5 pointer-events-none">
                            <Search className="h-4 w-4 text-zinc-500" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                </div>
            </div>
        </div>
    );
}