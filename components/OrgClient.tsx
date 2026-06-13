"use client";
import { Plus, Calendar, Sparkles, X } from "lucide-react";
import { useState } from "react";
import OrgCard from "./OrgCard";
import { OrganizationType } from "@/sections/OrgPage";
import { useRouter } from "next/navigation";
import { formatDate } from "@/helpers/date";

export default function OrgClient({ userOrgs }: { userOrgs: OrganizationType[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [orgName, setOrgName] = useState("");
    const [slug, setSlug] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    const currDate = new Date().toISOString();
    const formattedDate = formatDate({ date: currDate, option: 2 });

    const handleDiscard = (e: React.FormEvent) => {
        e.preventDefault();
        setOrgName("");
        setSlug("");
        setError(false);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`/api/orgs`, {
                method: "POST",
                body: JSON.stringify({
                    name: orgName,
                    slug
                })
            });
            if (res.ok) {
                handleDiscard(e);
                router.refresh();
                setIsFormOpen(false);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return <>
        <div className="w-full min-h-screen p-4 pt-5 font-manrope relative">
            <header className="flex items-end justify-end w-full border-b border-black/5 pb-4">
                <div className="flex flex-col items-end w-full md:w-auto">
                    <h1 className="text-xl tracking-tight font-black text-black">Organizations</h1>
                    <p className="text-xs text-amber-600 font-mono mt-0.5">{formattedDate}</p>
                </div>
            </header>
            <h1 className="text-left text-3xl tracking-tighter font-bold py-2">My Organizations</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full py-2 gap-3">
                <div className="group relative flex flex-col justify-between h-56 w-full rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-zinc-300 overflow-hidden font-manrope">
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-zinc-50 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:bg-zinc-100 z-0" />
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-zinc-50 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:bg-zinc-100 z-0" />

                    <div className="flex items-center justify-between w-full z-10">
                        <div className="flex items-center gap-2 text-zinc-400 group-hover:text-zinc-900 transition-colors">
                            <Sparkles size={16} className="animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider">New Workspace</span>
                        </div>
                    </div>

                    <div className="z-10 mt-auto w-full">
                        <div className="flex items-end justify-between w-full">
                            <div>
                                <h3 className="font-black text-2xl tracking-tighter text-zinc-800 group-hover:text-black transition-colors">
                                    Create Organization
                                </h3>
                                <p className="text-xs text-zinc-400 font-medium mt-0.5">
                                    Set up a brand new tenant
                                </p>
                            </div>

                            <button onClick={() => setIsFormOpen(true)}
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm transition-all duration-200 hover:bg-zinc-700 active:scale-95 group-hover:rotate-90 origin-center"
                                aria-label="Create organization"
                            >
                                <Plus size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="flex items-center gap-1.5 text-zinc-400 mt-4 pt-3 border-t border-zinc-100">
                            <Calendar size={13} />
                            <span className="text-xs font-medium font-mono">Action Slot</span>
                        </div>
                    </div>
                </div>
                {
                    userOrgs.map((org) => (
                        <OrgCard id={org.id} key={org.id} name={org.name} slug={org.slug} role={org.role} createdAt={org.createdAt} />
                    ))
                }
            </div>
        </div>
        {
            isFormOpen && <div className="fixed flex inset-0 justify-center items-center z-999 backdrop-blur-xl">
                <div className="relative w-90 h-70 bg-zinc-100 border border-zinc-100 rounded-2xl p-4">
                    <button
                        onClick={() => setIsFormOpen(false)}
                        className="absolute right-4 top-4 p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-white rounded-lg transition-colors"
                    >
                        <X size={16} />
                    </button>
                    <h1 className="font-bold tracking-tight text-xl text-center">Create Organization</h1>
                    <p className="text-xs text-zinc-400 text-center">Fill in the organization details</p>
                    <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm tracking-tight font-medium ml-2">Name:</label>
                            <input value={orgName} onChange={(e) => setOrgName(e.target.value)} type="text" placeholder="abc-rock-band" className="w-full bg-white py-2 px-4 rounded-3xl focus:outline-0 text-sm tracking-wide" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm tracking-tight font-medium ml-2">Slug:</label>
                            <div className="flex flex-col">
                                <input value={slug} onChange={(e) => setSlug(e.target.value)} type="text" placeholder="golden-jubilee" className="w-full bg-white py-2 px-4 rounded-3xl focus:outline-0 text-sm tracking-wide" />
                                {error && <p className="text-[10px] text-red-500 ml-4">Invalid slug</p>}
                            </div>
                        </div>
                        <div className="w-full gap-7 flex justify-between mt-2">
                            <button onClick={handleDiscard} className="text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/50 text-xs font-bold p-2.5 px-4 rounded-2xl transition-all active:scale-95">Discard changes</button>
                            <button disabled={loading} type="submit" className="bg-black text-white text-xs font-semibold p-2 px-4 rounded-2xl active:scale-95 hover:bg-zinc-800 disabled:bg-zinc-800">Confirm Creation</button>
                        </div>
                    </form>
                </div>
            </div>
        }
    </>
}