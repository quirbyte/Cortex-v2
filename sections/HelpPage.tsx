import { formatDate } from "@/helpers/date";

export default function HelpPage() {
    const currDate = new Date().toISOString();
    const formattedDate = formatDate({ date: currDate, option: 2 });

    return <div className="w-full pt-5 p-4 text-manrope bg-zinc-50/50">
        <header className="flex items-center justify-end w-full border-b border-black/5 pb-4">
            <div className="flex flex-col items-end w-full">
                <h1 className="text-xl tracking-tight font-black text-black">Help</h1>
                <p className="text-xs text-amber-600 font-mono mt-0.5">{formattedDate}</p>
            </div>
        </header>
    </div>
}