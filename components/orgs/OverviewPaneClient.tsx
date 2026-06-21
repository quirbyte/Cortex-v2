"use client";

import { CalendarDays, Ticket, IndianRupeeIcon, Users, TrendingUp, PieChart } from "lucide-react";
import { motion } from "framer-motion";
import { OrgEventType } from "./OverviewPane";
import { getOrgPalette, PALETTES } from "@/DesignComponents/ColorRandomizer";

const PALETTE_HEX_MAP = [
    "#3b82f6",
    "#10b981",
    "#a855f7",
    "#f59e0b",
    "#f43f5e",
    "#06b6d4",
];

export default function OverviewPaneClient({ events = [] }: { events: OrgEventType[] }) {
    let totalSold = 0;
    let totalRevenue = 0;
    let attendanceCount = 0;

    const currentYear = new Date().getFullYear();
    const monthlySalesVolume = new Array(12).fill(0);

    for (const event of events) {
        totalSold += event.sold;
        totalRevenue += (event.sold * event.price);

        for (const booking of event.bookings) {
            if (booking.verified === true) attendanceCount++;
            if (booking.createdAt) {
                const date = new Date(booking.createdAt);
                if (date.getFullYear() === currentYear) {
                    const monthIndex = date.getMonth();
                    monthlySalesVolume[monthIndex] += booking.count;
                }
            }
        }
    }

    const maxSalesInAYear = Math.max(...monthlySalesVolume, 1);

    const PIE_DATA = events
        .filter(event => event.sold > 0)
        .map((event) => {
            let hash = 0;
            const stringId = event.name || "";
            for (let i = 0; i < stringId.length; i++) {
                hash = stringId.charCodeAt(i) + ((hash << 5) - hash);
            }
            const paletteIdx = Math.abs(hash) % PALETTES.length;
            const percentage = totalSold > 0 ? Math.round((event.sold / totalSold) * 100) : 0;

            return {
                name: event.name,
                rawSold: event.sold,
                sharePercentage: percentage,
                hexColor: PALETTE_HEX_MAP[paletteIdx],
                tailwindBgClass: getOrgPalette(stringId).iconBg
            };
        })
        .sort((a, b) => b.rawSold - a.rawSold);

    const attendancePercent = totalSold > 0 ? Math.round((attendanceCount / totalSold) * 100) : 0;

    const STATS = [
        { title: "Total Events Created", value: events.length, sub: "All time active events", icon: CalendarDays, color: "text-blue-500 bg-blue-500/10" },
        { title: "Total Tickets Sold", value: totalSold.toLocaleString(), sub: "Distributed volume", icon: Ticket, color: "text-emerald-500 bg-emerald-500/10" },
        { title: "Total Revenue Generated", value: `₹${totalRevenue.toLocaleString()}`, sub: "Gross event intake", icon: IndianRupeeIcon, color: "text-amber-500 bg-amber-500/10" },
        { title: "Attendance Rate", value: `${attendancePercent}%`, sub: "Verified check-ins", icon: Users, color: "text-purple-500 bg-purple-500/10" },
    ];

    const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let currentAngleAccumulator = 0;
    const conicGradientString = PIE_DATA.length > 0
        ? PIE_DATA.map((item) => {
            const startAngle = currentAngleAccumulator;
            currentAngleAccumulator += item.sharePercentage;
            return `${item.hexColor} ${startAngle}% ${currentAngleAccumulator}%`;
        }).join(", ")
        : "#71717a 0% 100%";

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {STATS.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="bg-white dark:bg-zinc-900/50 border border-black/5 dark:border-zinc-800 p-5 rounded-2xl flex flex-col justify-between shadow-xs relative overflow-hidden group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                        >
                            <div className="flex items-start justify-between w-full">
                                <div className="space-y-1">
                                    <p className="text-zinc-400 dark:text-zinc-500 text-xs font-medium tracking-tight">
                                        {stat.title}
                                    </p>
                                    <h3 className="text-2xl font-black text-black dark:text-white tracking-tight">
                                        {stat.value}
                                    </h3>
                                </div>
                                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                                    <Icon size={18} strokeWidth={2.5} />
                                </div>
                            </div>
                            <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-600 tracking-wide uppercase mt-4">
                                {stat.sub}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="lg:col-span-2 bg-white dark:bg-zinc-900/50 border border-black/5 dark:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between shadow-xs min-h-80"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={16} className="text-amber-500" />
                            <h4 className="text-sm font-bold text-black dark:text-white">Ticket Sales Performance</h4>
                        </div>
                        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 font-mono font-bold px-2 py-1 rounded text-zinc-500 dark:text-zinc-400">
                            {currentYear}
                        </span>
                    </div>

                    <div className="flex-1 flex items-end justify-between gap-1 sm:gap-2 px-2 pt-4 h-36">
                        {monthlySalesVolume.map((salesCount, idx) => (
                            <div key={idx} className="w-full flex flex-col items-center gap-2 group/bar">
                                <div className="w-full bg-zinc-50 dark:bg-zinc-900/40 h-32 rounded-lg flex items-end overflow-hidden relative">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(salesCount / maxSalesInAYear) * 100}%` }}
                                        transition={{ duration: 0.8, delay: idx * 0.03, ease: "easeOut" }}
                                        className="w-full bg-zinc-950 dark:bg-zinc-100 group-hover/bar:bg-amber-400 dark:group-hover/bar:bg-blue-500 transition-colors duration-150 rounded-t-md"
                                        title={`${salesCount.toLocaleString()} tickets`}
                                    />
                                </div>
                                <span className="text-[9px] font-bold font-mono text-zinc-400 group-hover/bar:text-black dark:group-hover/bar:text-white transition-colors">
                                    {MONTH_LABELS[idx]}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="bg-white dark:bg-zinc-900/50 border border-black/5 dark:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between shadow-xs min-h-80"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <PieChart size={16} className="text-blue-500" />
                            <h4 className="text-sm font-bold text-black dark:text-white">Ticket Share by Event</h4>
                        </div>

                        <div className="flex items-center justify-center my-4">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, rotate: -30 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-xs"
                                style={{
                                    background: `conic-gradient(${conicGradientString})`
                                }}
                            >
                                <div className="absolute w-[68%] h-[68%] bg-white dark:bg-[#0c0c0e] rounded-full flex flex-col items-center justify-center">
                                    <span className="text-[10px] font-bold tracking-tight text-zinc-400 uppercase">Total</span>
                                    <span className="text-sm font-black text-black dark:text-white leading-tight">
                                        {totalSold >= 1000 ? `${(totalSold / 1000).toFixed(1)}k` : totalSold}
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="space-y-2 mt-4 max-h-35 overflow-y-auto pr-1">
                            {PIE_DATA.length === 0 ? (
                                <div className="text-xs font-medium text-zinc-400 text-center py-4">
                                    No tickets sold yet
                                </div>
                            ) : (
                                PIE_DATA.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between text-xs font-semibold">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                                style={{ backgroundColor: item.hexColor }}
                                            />
                                            <span className="text-zinc-500 dark:text-zinc-400 truncate max-w-35">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="text-black dark:text-white font-mono">
                                            {item.sharePercentage}%
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="pt-3 border-t border-black/5 dark:border-zinc-800 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                        Based on active distributed tickets across all event variants.
                    </div>
                </motion.div>
            </div>
        </>
    );
}