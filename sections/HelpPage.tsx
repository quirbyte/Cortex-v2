import { formatDate } from "@/helpers/date";
import { HelpCircle, BookOpen, MessageSquare, ExternalLink, ArrowRight } from "lucide-react";

export default function HelpPage() {
    const currDate = new Date().toISOString();
    const formattedDate = formatDate({ date: currDate, option: 2 });

    const faqs = [
        {
            question: "How do I create an organization within Cortex?",
            answer: "Navigate to the Organizations tab using the left sidebar menu layout options. Click on the 'Create New Organization' command deck button to register your cluster container metadata."
        },
        {
            question: "Can I manage concurrent event ticket pipelines?",
            answer: "Yes, under the Bookings and Events console modules you can track state mutations, real-time ticket inventory allocations, and transaction logs across multiple active venues."
        },
        {
            question: "What image formats are supported for profile avatars?",
            answer: "The user settings popup accepts JPEG, PNG, JPG, and WEBP formats under a strict file limit configuration threshold of 2MB per upload stream."
        }
    ];

    const supportChannels = [
        {
            icon: <BookOpen size={18} className="text-amber-500" />,
            title: "Documentation Center",
            desc: "Explore full technical deep-dives on managing platform layouts and multitenant configuration bindings.",
            actionText: "Read docs"
        },
        {
            icon: <MessageSquare size={18} className="text-amber-500" />,
            title: "Live Chat Channel Support",
            desc: "Get in touch with an operations technician directly to assist with workspace environment access issues.",
            actionText: "Open ticket"
        }
    ];

    return (
        <div className="w-full pt-5 p-4 text-manrope bg-zinc-50/50 min-h-screen overflow-y-auto">
            <header className="flex items-center justify-end w-full border-b border-black/5 pb-4">
                <div className="flex flex-col items-end w-full">
                    <h1 className="text-xl tracking-tight font-black text-black">Help</h1>
                    <p className="text-xs text-amber-600 font-mono mt-0.5">{formattedDate}</p>
                </div>
            </header>
            
            <div className="max-w-4xl mx-auto mt-8 flex flex-col gap-10 select-none">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {supportChannels.map((channel, i) => (
                        <div
                            key={i}
                            className="p-5 bg-white border border-black/5 rounded-2xl shadow-xs hover:shadow-sm transition-all flex flex-col justify-between items-start gap-4 group"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="p-2.5 bg-zinc-50 rounded-xl border border-black/3 w-fit">
                                    {channel.icon}
                                </div>
                                <h3 className="text-sm font-bold text-black mt-1">{channel.title}</h3>
                                <p className="text-xs text-black/50 leading-relaxed">{channel.desc}</p>
                            </div>

                            <button className="text-xs font-bold text-black bg-zinc-50 hover:bg-black hover:text-white border border-black/5 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 self-end md:self-start">
                                {channel.actionText}
                                <ArrowRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-black/5 pb-2">
                        <HelpCircle size={15} className="text-black/40" />
                        <h2 className="text-xs font-black uppercase tracking-widest text-black/40">Frequently Asked Questions</h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="p-5 bg-white border border-black/5 rounded-2xl flex flex-col gap-1.5"
                            >
                                <h4 className="text-sm font-bold text-black flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                                    {faq.question}
                                </h4>
                                <p className="text-xs text-black/50 leading-relaxed pl-3.5">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="border-t border-black/5 pt-6 text-center">
                    <p className="text-[11px] text-black/40">
                        Cortex Cloud Platform Operations Console • All pipelines operating normally
                    </p>
                </footer>

            </div>
        </div>
    );
}