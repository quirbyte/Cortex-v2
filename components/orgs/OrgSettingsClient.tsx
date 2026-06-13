"use client";
import { orgType } from "../OrgSettings"
import { formatDate } from "@/helpers/date";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface OrgSettingsClientProps {
    org: orgType;
    overviewSlot: React.ReactNode;
    membersSlot: React.ReactNode;
    eventsSlot: React.ReactNode;
    settingsSlot: React.ReactNode;
}

export default function OrgSettingsClient({ 
    org,
    overviewSlot,
    membersSlot,
    eventsSlot,
    settingsSlot 
}: OrgSettingsClientProps) {
    const searchParams = useSearchParams();
    const pane = searchParams.get("pane") || "overview";

    return (
        <div className="w-full h-full p-2 md:p-4 pt-5">
            <header className="flex items-end justify-between w-full border-b border-black/5 pb-4">
                <div className="hidden md:block">
                    <p className="text-zinc-400 text-xs font-semibold tracking-wider">
                        /dashboard/<span className="font-bold text-blue-600">{org.slug}</span>
                    </p>
                    <p className="text-xl font-bold tracking-tight text-black">{org.role}</p>
                </div>
                <div className="flex flex-col items-end w-full md:w-auto">
                    <h1 className="text-xl tracking-tight font-black text-black">{org.name}</h1>
                    <p className="text-xs text-amber-600 font-mono font-bold mt-0.5 md:block hidden">
                        Created At : {formatDate({ date: org.createdAt, option: 1 })}
                    </p>
                    <p className="text-xs text-amber-600 font-mono font-bold mt-0.5 md:hidden">
                        Role : {org.role}
                    </p>
                </div>
            </header>

            <div className="w-full transition-all duration-450 flex justify-around items-center pt-2 font-semibold tracking-wide uppercase cursor-default border-b border-black/5 pb-2 text-xs md:text-lg">
                <Link href={`/dashboard/${org.slug}?tab=orgs&pane=overview`} className={pane === "overview" ? `bg-black text-white px-4 p-1 rounded-full` : ""}>Overview</Link>
                <Link href={`/dashboard/${org.slug}?tab=orgs&pane=members`} className={pane === "members" ? `bg-black text-white px-4 p-1 rounded-full` : ""}>Members</Link>
                <Link href={`/dashboard/${org.slug}?tab=orgs&pane=orgEvents`} className={pane === "orgEvents" ? `bg-black text-white px-4 p-1 rounded-full` : ""}>Events</Link>
                <Link href={`/dashboard/${org.slug}?tab=orgs&pane=orgSettings`} className={pane === "orgSettings" ? `bg-black text-white px-4 p-1 rounded-full` : ""}>Settings</Link>
            </div>

            <main className="w-full pt-2">
                {pane === "overview" && <div key="overview" className="animate-in fade-in duration-200 p-2">{overviewSlot}</div>}
                {pane === "members" && <div key="members" className="animate-in fade-in duration-200 p-2">{membersSlot}</div>}
                {pane === "orgEvents" && <div key="events" className="animate-in fade-in duration-200 p-2">{eventsSlot}</div>}
                {pane === "orgSettings" && <div key="settings" className="animate-in fade-in duration-200 p-2">{settingsSlot}</div>}
            </main>
        </div>
    );
}