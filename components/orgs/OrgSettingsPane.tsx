"use client";
import { ArrowRight, Settings2, X } from "lucide-react";
import { orgType } from "../OrgSettings";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrgSettingsPane({ org, userId }: { org: orgType; userId: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isEditName, setIsEditName] = useState(false);
    const [isEditSlug, setIsEditSlug] = useState(false);
    const [orgName, setOrgName] = useState(org.name);
    const [nameError, setNameError] = useState(false);
    const [orgSlug, setOrgSlug] = useState(org.slug);
    const [slugError, setSlugError] = useState(false);
    const [isExitDialog, setIsExitDialog] = useState(false);

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

    const handleLeaveOrg = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/orgs/members`, {
                method: "PATCH",
                body: JSON.stringify({
                    orgId: org.id,
                    id: userId
                })
            });
            if (res.ok) {
                alert("Left Organization successfully");
                router.push(`/dashboard?tab=orgs`);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return <>
        <div className="w-full flex flex-col gap-3 font-manrope">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-1 md:pb-3 border-b border-black/5">
                <div className="space-y-0.5">
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-black dark:text-white flex items-center gap-2">
                        <Settings2 size={16} className="text-zinc-400 sm:w-4.5 sm:h-4.5" />
                        Organization Settings
                    </h2>
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-medium leading-relaxed">
                        Modify organization name and slug under <span className="font-mono text-zinc-600 dark:text-blue-500 font-bold">/{org.slug}</span>
                    </p>
                </div>
            </div>
            {org.role === "ADMIN" && <div className="w-full p-3 md:p-4 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center rounded-lg hover:shadow-sm hover:border-white dark:hover:border-zinc-900">
                <div>
                    <p className="font-semibold text-sm md:text-[16px]">Name settings</p>
                    <p className="font-medium text-xs md:text-sm text-zinc-400">Change organization name</p>
                </div>
                <button onClick={() => setIsEditName(true)} className="h-10 w-10 rounded-full flex justify-center items-center hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95">
                    <ArrowRight size={20} color="grey" />
                </button>
            </div>
            }
            {org.role === "ADMIN" && <div className="w-full p-3 md:p-4 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center rounded-lg hover:shadow-sm hover:border-white dark:hover:border-zinc-900">
                <div>
                    <p className="font-semibold text-sm md:text-[16px]">Slug settings</p>
                    <p className="font-medium text-xs md:text-sm text-zinc-400">Change organization slug</p>
                </div>
                <button onClick={() => setIsEditSlug(true)} className="h-10 w-10 rounded-full flex justify-center items-center hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95">
                    <ArrowRight size={20} color="grey" />
                </button>
            </div>}
            <div className="w-full p-3 md:p-4 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center rounded-lg hover:shadow-sm hover:border-white dark:hover:border-zinc-900">
                <div>
                    <p className="font-semibold text-sm md:text-[16px]">Exit Organization</p>
                </div>
                <button onClick={() => setIsExitDialog(true)} className="h-10 w-10 rounded-full flex justify-center items-center hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95">
                    <ArrowRight size={20} color="grey" />
                </button>
            </div>
        </div>
        {
            isEditName && <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center bg-zinc-950/40">
                <div className="relative w-90 h-60 rounded-lg bg-white dark:bg-zinc-950 dark:border-zinc-800 border border-zinc-300 p-4">
                    <button
                    disabled={loading}
                    onClick={() => setIsEditName(false)}
                    className="absolute top-4 right-4 h-8 w-8 flex rounded-xl border border-zinc-100 hover:bg-zinc-50 justify-center items-center text-zinc-500 hover:text-black transition-all disabled:opacity-50 dark:border-zinc-800"
                >
                    <X size={15} />
                </button>
                    <div className="mt-2 flex flex-col gap-0 text-center">
                        <p className="font-semibold text-sm md:text-[16px]">Edit Organization Name</p>
                        <p className="text-xs md:text-sm text-zinc-500">Modify Organization name</p>
                    </div>
                    <div className="mt-5">
                        <label className="font-medium text-sm">Organization Name:</label>
                        <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} id="" className="w-full p-3 bg-zinc-100 border-zinc-200 rounded-xl text-sm dark:bg-zinc-800 " />
                        {nameError && <p className="text-[8px] text-red-500 ml-3">Invalid name</p>}
                    </div>
                    <div className="mt-5 w-full flex justify-between">
                        <button disabled={loading} onClick={() => setOrgName(org.name)} className="text-sm font-semibold text-zinc-500 p-2 hover:text-black dark:hover:text-white disabled:opacity-50">Discard Changes</button>
                        <button onClick={handleSubmitName} disabled={loading} className="bg-black text-white font-semibold text-sm p-2 rounded-lg disabled:opacity-50 dark:bg-white dark:text-black">Confirm Changes</button>
                    </div>
                </div>
            </div>
        }
        {
            isEditSlug && <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center bg-zinc-950/40">
                <div className="relative w-90 h-60 rounded-lg bg-white dark:bg-zinc-950 dark:border-zinc-800 border border-zinc-300 p-4">
                    <button
                    disabled={loading}
                    onClick={() => setIsEditSlug(false)}
                    className="absolute top-4 right-4 h-8 w-8 flex rounded-xl border border-zinc-100 hover:bg-zinc-50 justify-center items-center text-zinc-500 hover:text-black transition-all disabled:opacity-50 dark:border-zinc-800"
                >
                    <X size={15} />
                </button>
                    <div className="mt-2 flex flex-col gap-0 text-center">
                        <p className="font-semibold text-sm md:text-[16px]">Edit Organization Slug</p>
                        <p className="text-xs md:text-sm text-zinc-500">Modify Organization slug</p>
                    </div>
                    <div className="mt-5">
                        <label className="font-medium text-sm">Organization Slug:</label>
                        <input type="text" value={orgSlug} onChange={(e) => setOrgSlug(e.target.value)} id="" className="w-full p-3 bg-zinc-100 border-zinc-200 rounded-xl text-sm dark:bg-zinc-800" />
                        {slugError && <p className="text-[8px] text-red-500 ml-3">Invalid slug</p>}
                    </div>
                    <div className="mt-5 w-full flex justify-between">
                        <button disabled={loading} onClick={() => setOrgSlug(org.slug)} className="text-sm font-semibold text-zinc-500 p-2 hover:text-black dark:hover:text-white disabled:opacity-50">Discard Changes</button>
                        <button onClick={handleSubmitSlug} disabled={loading} className="bg-black text-white font-semibold text-sm p-2 rounded-lg disabled:opacity-50 dark:bg-white dark:text-black">Confirm Changes</button>
                    </div>
                </div>
            </div>
        }{isExitDialog && (
            <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center bg-zinc-950/40">
                <div className="relative w-90 max-w-sm rounded-xl bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 p-6 shadow-xl flex flex-col justify-between">
                   <button
                    disabled={loading}
                    onClick={() => setIsExitDialog(false)}
                    className="absolute top-4 right-4 h-8 w-8 flex rounded-xl border border-zinc-100 hover:bg-zinc-50 justify-center items-center text-zinc-500 hover:text-black transition-all disabled:opacity-50 dark:border-zinc-800"
                >
                    <X size={15} />
                </button>
                    <div className="mt-4 flex flex-col gap-1 text-center items-center justify-center">
                        <p className="font-bold text-base text-zinc-900 dark:text-white">Are you sure?</p>
                        <p className="text-sm text-zinc-500">Press 'Confirm' to exit group</p>
                    </div>
                    <div className="mt-6 w-full flex items-center justify-end gap-2">
                        <button
                            disabled={loading}
                            onClick={() => setIsExitDialog(false)}
                            className="text-sm font-semibold text-zinc-500 px-4 py-2 rounded-lg hover:bg-zinc-50 hover:text-zinc-800 disabled:opacity-50 transition dark:hover:bg-zinc-950 dark:hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLeaveOrg}
                            disabled={loading}
                            className="bg-black hover:bg-zinc-800 text-white font-semibold text-sm px-4 py-2 rounded-lg disabled:opacity-50 transition dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
}