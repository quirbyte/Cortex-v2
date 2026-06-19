"use client";
import { formatDate } from "@/helpers/date";
import { ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImagePopup from "./ImageSettingsPopup";

export type UserSettingsType = {
    id: string;
    name: string;
    image: string | null;
    mode: string;
}

export default function SettingPageClient({ user }: { user: UserSettingsType }) {
    const currDate = new Date().toISOString();
    const formattedDate = formatDate({ date: currDate, option: 2 });
    const [loading, setLoading] = useState(false);
    const [mode, toggleMode] = useState(user.mode);
    const [name, setName] = useState(user.name);
    const [isNamePopup, setIsNamePopup] = useState(false);
    const [isImagePopup, setIsImagePopup] = useState(false);
    const router = useRouter();

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
        <div className="w-full pt-5 p-4 text-manrope bg-zinc-50/50">
            <header className="flex items-center justify-end w-full border-b border-black/5 pb-4">
                <div className="flex flex-col items-end w-full">
                    <h1 className="text-xl tracking-tight font-black text-black">Settings</h1>
                    <p className="text-xs text-amber-600 font-mono mt-0.5">{formattedDate}</p>
                </div>
            </header>
            <div className="mt-5 flex flex-col gap-2">
                <p className="text-zinc-500 font-bold uppercase text-[10px] md:text-xs tracking-wider">User Settings</p>
                <div className="flex flex-col gap-3">
                    <div className="w-full bg-white border border-zinc-200 p-3 hover:shadow-sm rounded-xl flex justify-between items-center">
                        <div className="flex flex-col gap-0">
                            <p className="font-semibold text-sm md:text-lg tracking-tight">Name Settings</p>
                            <p className="font-light text-[10px] md:text-sm text-zinc-500">Update your name according to your preference</p>
                        </div>
                        <button onClick={() => setIsNamePopup(true)} className="h-10 w-10 rounded-full flex justify-center items-center hover:shadow-sm active:scale-95">
                            <ArrowRight color="grey" size={20} />
                        </button>
                    </div>
                    <div className="w-full bg-white border border-zinc-200 p-3 hover:shadow-sm rounded-xl flex justify-between items-center">
                        <div className="flex flex-col gap-0">
                            <p className="font-semibold text-sm md:text-lg tracking-tight">Profile Picture Settings</p>
                            <p className="font-light text-[10px] md:text-sm text-zinc-500">Update your pic according to your preference</p>
                        </div>
                        <button onClick={() => setIsImagePopup(true)} className="h-10 w-10 rounded-full flex justify-center items-center hover:shadow-sm active:scale-95">
                            <ArrowRight color="grey" size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
                <p className="text-zinc-500 font-bold uppercase text-[10px] md:text-xs tracking-wider">System Settings</p>
                <div className="flex flex-col gap-3">
                    <div className="w-full bg-white border border-zinc-200 p-3 hover:shadow-sm rounded-xl flex justify-between items-center">
                        <div className="flex flex-col gap-0">
                            <p className="font-semibold text-sm md:text-lg tracking-tight">Mode Settings</p>
                            <p className="font-light text-[10px] md:text-sm text-zinc-500">Select mode according to your preference</p>
                        </div>
                        <button
                            onClick={mode === "light" ? () => toggleMode("dark") : () => toggleMode("light")}
                            className={`relative h-6 w-12 rounded-full flex items-center p-0.5 transition-colors duration-300 ${mode === "dark" ? 'bg-zinc-200' : 'bg-zinc-500'}`}
                        >
                            <div className={`h-5 w-5 rounded-full transition-all duration-300 transform ${mode === "dark" ? 'translate-x-6 bg-black' : 'translate-x-0 bg-white'}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {
            isNamePopup && <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex w-full justify-center items-center">
                <div className="w-80 h-50 bg-white rounded-xl relative p-3">
                    <button disabled={loading} onClick={() => setIsNamePopup(false)} className="absolute top-2 right-2 h-8 w-8 flex rounded-full hover:shadow-2xs justify-center items-center disabled:opacity-50">
                        <X color="black" size={16} />
                    </button>
                    <div className="text-center w-full flex flex-col gap-0">
                        <p className="font-semibold text-md">Name Settings</p>
                        <p className="font-light text-xs text-zinc-500">Modify your name</p>
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                        <label className="font-medium ml-1">Name:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="p-2 px-3 bg-zinc-100 w-full rounded-xl" />
                    </div>
                    <div className="mt-5 w-full flex justify-between">
                        <button onClick={() => setName(user.name)} className="p-2 text-black text-sm font-semibold rounded-lg active:scale-95">Discard Changes</button>
                        <button disabled={loading} onClick={handleNameChange} className="p-2 bg-black text-white text-sm font-semibold rounded-lg active:scale-95 disabled:opacity-50">Confirm Changes</button>
                    </div>
                </div>
            </div>
        } {
            isImagePopup && <ImagePopup loading={loading} setLoading={setLoading} setIsImagePopup={setIsImagePopup} user={user} />
        }
    </>
}