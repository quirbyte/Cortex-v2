import { ChartColumnIncreasingIcon } from "lucide-react";
import { orgType } from "../OrgSettings";
import OverviewPaneClient from "./OverviewPaneClient";
import { prisma } from "@/app/lib/prisma";

export type OrgEventType = {
    id: string;
    name: string;
    sold: number;
    price: number;
    bookings: {
        createdAt: Date;
        verified: boolean;
        count: number;
    }[]
}

export default async function OverviewPane({ org }: { org: orgType }) {
    const events: OrgEventType[] = await prisma.event.findMany({
        where: {
            orgId: org.id
        },
        select: {
            id: true,
            name: true,
            sold: true,
            price: true,
            bookings: {
                select: {
                    createdAt: true,
                    verified: true,
                    count:true
                }
            }
        }
    }) || [];

    return (
        <div className="w-full space-y-8 font-manrope animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-1 md:pb-3 border-b border-black/5 dark:border-zinc-800">
                <div className="space-y-0.5">
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-black dark:text-white flex items-center gap-2">
                        <ChartColumnIncreasingIcon size={16} className="text-zinc-400 sm:w-4.5 sm:h-4.5" />
                        Organization Statistics
                    </h2>
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-medium leading-relaxed">
                        Visualize the statistics of the organization{" "}
                        <span className="font-mono text-amber-600 font-bold dark:text-blue-500">/{org.slug}</span>
                    </p>
                </div>
            </div>
            <OverviewPaneClient events={events} />
        </div>
    );
}