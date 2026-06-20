"use client";
import { formatDate } from "@/helpers/date";
import { ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ImagePopup from "./ImageSettingsPopup";
import { useTheme } from "next-themes";

export type UserSettingsType = {
    id: string;
    name: string;
    image: string | null;
}

export default function SettingPageClient({ user }: { user: UserSettingsType }) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user.name);
    const [isNamePopup, setIsNamePopup] = useState(false);
    const [isImagePopup, setIsImagePopup] = useState(false);
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    // Guard state for Hydration Safety
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle Date formatting safely only after component mounts on the client
    const formattedDate = mounted
        ? formatDate({ date: new Date().toISOString(), option: 2 })
        : "";

    // Safely evaluate theme context condition
    const isDark = mounted && theme === "dark";

    const handleNameChange = async () => {
        if (name === user.name) {
            setIsNamePopup(false);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/user`, {
                method: "PUT",
                body: JSON.stringify({
                    name,
                    userId: user.id
                })
            });
            if (res.ok) {
                router.refresh();
                setIsNamePopup(false);
            } else {
                alert("Cannot update Name now! Try again later")
            }
        } catch (err: any) {
            alert(err);
        } finally {
            setLoading(false);
        }
    }

    return <>
        <div className="w-full pt-5 p-4 text-manrope bg-zinc-50/50 dark:bg-zinc-950">
            <header className="flex items-center justify-end w-full border-b border-black/5 pb-4 dark:border-zinc-800">
                <div className="flex flex-col items-end w-full">
                    <h1 className="text-xl tracking-tight font-black text-black dark:text-white">Settings</h1>
                    <p className="text-xs text-amber-600 dark:text-blue-500 font-mono mt-0.5 min-h-4">{formattedDate}</p>
                </div>
            </header>
            <div className="mt-5 flex flex-col gap-2">
                <p className="text-zinc-500 font-bold uppercase text-[10px] md:text-xs tracking-wider">User Settings</p>
                <div className="flex flex-col gap-3">
                    <div className="w-full bg-white dark:bg-zinc-950 dark:border-zinc-800 border border-zinc-200 p-3 hover:shadow-sm rounded-xl flex justify-between items-center">
                        <div className="flex flex-col gap-0">
                            <p className="font-semibold text-sm md:text-lg tracking-tight text-black dark:text-white">Name Settings</p>
                            <p className="font-light text-[10px] md:text-sm text-zinc-500">Update your name according to your preference</p>
                        </div>
                        <button onClick={() => setIsNamePopup(true)} className="h-10 w-10 rounded-full flex justify-center items-center hover:shadow-sm active:scale-95 dark:hover:bg-zinc-800">
                            <ArrowRight color="grey" size={20} />
                        </button>
                    </div>
                    <div className="w-full bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 p-3 hover:shadow-sm rounded-xl flex justify-between items-center">
                        <div className="flex flex-col gap-0">
                            <p className="font-semibold text-sm md:text-lg tracking-tight text-black dark:text-white">Profile Picture Settings</p>
                            <p className="font-light text-[10px] md:text-sm text-zinc-500">Update your pic according to your preference</p>
                        </div>
                        <button onClick={() => setIsImagePopup(true)} className="h-10 w-10 rounded-full flex justify-center items-center hover:shadow-sm active:scale-95 dark:hover:bg-zinc-800">
                            <ArrowRight color="grey" size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
                <p className="text-zinc-500 font-bold uppercase text-[10px] md:text-xs tracking-wider">System Settings</p>
                <div className="flex flex-col gap-3">
                    <div className="w-full bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 p-3 hover:shadow-sm rounded-xl flex justify-between items-center">
                        <div className="flex flex-col gap-0">
                            <p className="font-semibold text-sm md:text-lg tracking-tight text-black dark:text-white">Mode Settings</p>
                            <p className="font-light text-[10px] md:text-sm text-zinc-500">Select mode according to your preference</p>
                        </div>
                        <button
                            onClick={theme === "light" ? () => setTheme("dark") : () => setTheme("light")}
                            className={`relative h-6 w-12 rounded-full flex items-center p-0.5 transition-colors duration-300 ${isDark ? 'bg-zinc-200' : 'bg-zinc-500'}`}
                        >
                            <div className={`h-5 w-5 rounded-full transition-all duration-300 transform ${isDark ? 'translate-x-6 bg-black' : 'translate-x-0 bg-white'}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {
            isNamePopup && <div className="fixed inset-0 backdrop-blur-md bg-zinc-950/40 flex w-full justify-center items-center">
                <div className="w-80 h-50 bg-white dark:bg-zinc-950 dark:border-zinc-800 border border-white rounded-xl relative p-3">
                    <button
                        disabled={loading}
                        onClick={() => {
                            setIsNamePopup(false);
                            setName(user.name);
                        }}
                        className="absolute top-4 right-4 h-8 w-8 flex rounded-xl border border-zinc-100 hover:bg-zinc-50 justify-center items-center text-zinc-500 hover:text-black transition-all disabled:opacity-50 dark:border-zinc-800"
                    >
                        <X size={15} />
                    </button>
                    <div className="text-center w-full flex flex-col gap-0">
                        <p className="font-semibold text-md">Name Settings</p>
                        <p className="font-light text-xs text-zinc-500">Modify your name</p>
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                        <label className="font-medium ml-1">Name:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="p-2 px-3 bg-zinc-100 w-full rounded-xl dark:bg-zinc-800 focus:outline-none text-sm" />
                    </div>
                    <div className="mt-5 w-full flex justify-between">
                        <button onClick={() => setName(user.name)} className="p-2 text-black dark:text-white text-sm font-semibold rounded-lg active:scale-95">Discard Changes</button>
                        <button disabled={loading} onClick={handleNameChange} className="p-2 bg-black text-white dark:bg-white dark:text-black text-sm font-semibold rounded-lg active:scale-95 disabled:opacity-50">Confirm Changes</button>
                    </div>
                </div>
            </div>
        } {
            isImagePopup && <ImagePopup loading={loading} setLoading={setLoading} setIsImagePopup={setIsImagePopup} user={user} />
        }
    </>
}