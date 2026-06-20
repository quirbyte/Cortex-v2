"use client";
import { orgType } from "../OrgSettings";
import { formatDate } from "@/helpers/date";
import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";

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
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const pane = searchParams.get("pane") || "overview";

    const handlePaneChange = (targetPane: string) => {
        startTransition(() => {
            router.push(`/dashboard/${org.slug}?tab=orgs&pane=${targetPane}`);
        });
    };

    const tabClass = (active: boolean) =>
        `px-4 p-1 rounded-full transition-colors duration-150 cursor-pointer ${active
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "text-zinc-500 hover:text-black dark:hover:text-white"
        }`;

    return (
        <div className="w-full h-full p-2 md:p-4 pt-5 dark:text-zinc-100">
            <header className="flex items-end justify-between w-full border-b border-black/5 dark:border-zinc-800 pb-4">
                <div className="hidden md:block">
                    <p className="text-zinc-400 text-xs font-semibold tracking-wider">
                        /dashboard/<span className="font-bold text-blue-600 dark:text-blue-400">{org.slug}</span>
                    </p>
                    <p className="text-xl font-bold tracking-tight text-black dark:text-white">{org.role}</p>
                </div>
                <div className="flex flex-col items-end w-full md:w-auto">
                    <h1 className="text-xl tracking-tight font-black text-black dark:text-white">{org.name}</h1>
                    <p className="text-xs text-amber-600 font-mono font-bold mt-0.5 md:block hidden">
                        Created At : {formatDate({ date: org.createdAt, option: 1 })}
                    </p>
                    <p className="text-xs text-amber-600 font-mono font-bold mt-0.5 md:hidden">
                        Role : {org.role}
                    </p>
                </div>
            </header>

            <div className="w-full flex justify-around items-center pt-2 font-semibold tracking-wide uppercase border-b border-black/5 dark:border-zinc-800 pb-2 text-xs md:text-sm">
                <button onClick={() => handlePaneChange("overview")} className={tabClass(pane === "overview")}>Overview</button>
                <button onClick={() => handlePaneChange("members")} className={tabClass(pane === "members")}>Members</button>
                <button onClick={() => handlePaneChange("orgEvents")} className={tabClass(pane === "orgEvents")}>Events</button>
                <button onClick={() => handlePaneChange("orgSettings")} className={tabClass(pane === "orgSettings")}>Settings</button>
            </div>

            <main className="w-full pt-2 min-h-75 relative">
                {isPending ? (
                    <div className="flex h-64 w-full items-center justify-center text-xs font-mono text-zinc-400">
                        Loading layout matrices...
                    </div>
                ) : (
                    <>
                        {pane === "overview" && <div key="overview" className="animate-in fade-in duration-200 p-2">{overviewSlot}</div>}
                        {pane === "members" && <div key="members" className="animate-in fade-in duration-200 p-2">{membersSlot}</div>}
                        {pane === "orgEvents" && <div key="events" className="animate-in fade-in duration-200 p-2">{eventsSlot}</div>}
                        {pane === "orgSettings" && <div key="settings" className="animate-in fade-in duration-200 p-2">{settingsSlot}</div>}
                    </>
                )}
            </main>
        </div>
    );
}