"use client";
import { ArrowRight, Settings2, X } from "lucide-react";
import { orgType } from "../OrgSettings";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrgSettingsPane({ org }: { org: orgType }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isEditName, setIsEditName] = useState(false);
    const [isEditSlug, setIsEditSlug] = useState(false);
    const [orgName, setOrgName] = useState(org.name);
    const [nameError, setNameError] = useState(false);
    const [orgSlug, setOrgSlug] = useState(org.slug);
    const [slugError, setSlugError] = useState(false);

    const handleSubmitName = async () => {
        setNameError(false);
        setLoading(true);
        try {
            const res = await fetch(`/api/orgs`, {
                method: "PATCH",
                body: JSON.stringify({
                    id: org.id,
                    name: orgName
                })
            })
            if (res.ok) {
                router.refresh();
                setIsEditName(false);
            } else if (res.status === 413) {
                setNameError(true);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmitSlug = async () => {
        setSlugError(false);
        setLoading(true);
        try {
            const res = await fetch(`/api/orgs`, {
                method: "PUT",
                body: JSON.stringify({
                    id: org.id,
                    slug: orgSlug
                })
            })
            if (res.ok) {
                router.push(`/dashboard/${orgSlug}?tab=orgs&pane=orgSettings`);
                setIsEditSlug(false);
            } else if (res.status === 413) {
                setSlugError(true);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    if (org.role !== "ADMIN") {
        return <div className="w-full h-full flex items-center justify-center font-manrope text-xs md:text-sm">
            You are not allowed to access this page
        </div>
    }

    return <>
        <div className="w-full flex flex-col gap-3 font-manrope">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-1 md:pb-3 border-b border-black/5">
                <div className="space-y-0.5">
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-black flex items-center gap-2">
                        <Settings2 size={16} className="text-zinc-400 sm:w-4.5 sm:h-4.5" />
                        Organization Settings
                    </h2>
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-medium leading-relaxed">
                        Modify organization name and slug under <span className="font-mono text-zinc-600 font-bold">/workspace</span>
                    </p>
                </div>
            </div>
            <div className="w-full p-3 md:p-4 border border-zinc-200 flex justify-between items-center rounded-lg hover:shadow-sm">
                <div>
                    <p className="font-semibold text-sm md:text-[16px]">Name settings</p>
                    <p className="font-medium text-xs md:text-sm text-zinc-400">Change organization name</p>
                </div>
                <button onClick={() => setIsEditName(true)} className="h-10 w-10 rounded-full flex justify-center items-center hover:bg-zinc-100 active:scale-95">
                    <ArrowRight size={20} color="grey" />
                </button>
            </div>
            <div className="w-full p-3 md:p-4 border border-zinc-200 flex justify-between items-center rounded-lg hover:shadow-sm">
                <div>
                    <p className="font-semibold text-sm md:text-[16px]">Slug settings</p>
                    <p className="font-medium text-xs md:text-sm text-zinc-400">Change organization slug</p>
                </div>
                <button onClick={() => setIsEditSlug(true)} className="h-10 w-10 rounded-full flex justify-center items-center hover:bg-zinc-100 active:scale-95">
                    <ArrowRight size={20} color="grey" />
                </button>
            </div>
        </div>
        {
            isEditName && <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center bg-black/30">
                <div className="relative w-90 h-60 rounded-lg bg-white border border-zinc-300 p-4">
                    <button onClick={() => setIsEditName(false)} className="absolute right-3 top-3 h-8 w-8 rounded-full flex justify-center items-center active:scale-95 hover:bg-zinc-200">
                        <X color="black" size={16} />
                    </button>
                    <div className="mt-2 flex flex-col gap-0 text-center">
                        <p className="font-semibold text-sm md:text-[16px]">Edit Organization Name</p>
                        <p className="text-xs md:text-sm text-zinc-500">Modify Organization name</p>
                    </div>
                    <div className="mt-5">
                        <label className="font-medium text-sm">Organization Name:</label>
                        <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} id="" className="w-full p-3 bg-zinc-100 border-zinc-200 rounded-xl text-xs" />
                        {nameError && <p className="text-[8px] text-red-500 ml-3">Invalid name</p>}
                    </div>
                    <div className="mt-5 w-full flex justify-between">
                        <button disabled={loading} onClick={() => setOrgName(org.name)} className="text-sm font-semibold text-zinc-500 p-2 hover:text-black disabled:opacity-50">Discard Changes</button>
                        <button onClick={handleSubmitName} disabled={loading} className="bg-black text-white font-semibold text-sm p-2 rounded-lg disabled:opacity-50">Confirm Changes</button>
                    </div>
                </div>
            </div>
        }
        {
            isEditSlug && <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center bg-black/30">
                <div className="relative w-90 h-60 rounded-lg bg-white border border-zinc-300 p-4">
                    <button onClick={() => setIsEditSlug(false)} className="absolute right-3 top-3 h-8 w-8 rounded-full flex justify-center items-center active:scale-95 hover:bg-zinc-200">
                        <X color="black" size={16} />
                    </button>
                    <div className="mt-2 flex flex-col gap-0 text-center">
                        <p className="font-semibold text-sm md:text-[16px]">Edit Organization Slug</p>
                        <p className="text-xs md:text-sm text-zinc-500">Modify Organization slug</p>
                    </div>
                    <div className="mt-5">
                        <label className="font-medium text-sm">Organization Slug:</label>
                        <input type="text" value={orgSlug} onChange={(e) => setOrgSlug(e.target.value)} id="" className="w-full p-3 bg-zinc-100 border-zinc-200 rounded-xl text-xs" />
                        {slugError && <p className="text-[8px] text-red-500 ml-3">Invalid slug</p>}
                    </div>
                    <div className="mt-5 w-full flex justify-between">
                        <button disabled={loading} onClick={() => setOrgSlug(org.slug)} className="text-sm font-semibold text-zinc-500 p-2 hover:text-black disabled:opacity-50">Discard Changes</button>
                        <button onClick={handleSubmitSlug} disabled={loading} className="bg-black text-white font-semibold text-sm p-2 rounded-lg disabled:opacity-50">Confirm Changes</button>
                    </div>
                </div>
            </div>
        }
    </>
}