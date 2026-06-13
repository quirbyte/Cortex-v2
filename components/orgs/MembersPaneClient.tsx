"use client";
import { Users, ShieldCheck, UserPlus, Heart, Sliders, X } from "lucide-react";
import MemberCard from "./MemberCard";
import { orgType } from "../OrgSettings";
import { MemberType } from "./MembersPane";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MembersPaneClient({
    org,
    userId,
    admins,
    moderators,
    volunteers
}: { org: orgType, admins: MemberType[], moderators: MemberType[], volunteers: MemberType[], userId: string }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("VOLUNTEER");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleDiscard = (e: React.FormEvent) => {
        e.preventDefault();
        setEmail("");
        setRole("VOLUNTEER");
        setError(false);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`/api/orgs/members`, {
                method: "POST",
                body: JSON.stringify({
                    role,
                    email,
                    orgId: org.id
                })
            });
            if (res.ok) {
                handleDiscard(e);
                router.refresh();
                setIsFormOpen(false);
            }
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="w-full space-y-8 font-manrope animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-1 md:pb-3 border-b border-black/5">
                    <div className="space-y-0.5">
                        <h2 className="text-base sm:text-lg font-bold tracking-tight text-black flex items-center gap-2">
                            <Users size={16} className="text-zinc-400 sm:w-4.5 sm:h-4.5" />
                            Member Management
                        </h2>
                        <p className="text-[10px] sm:text-xs text-zinc-400 font-medium leading-relaxed">
                            Role-isolated roster segments running under workspace context <span className="font-mono text-zinc-600 font-bold">/{org.slug}</span>
                        </p>
                    </div>
                    <button onClick={() => setIsFormOpen(true)} className="inline-flex items-center justify-center gap-1.5 bg-black text-white text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-lg sm:rounded-xl hover:bg-zinc-800 transition active:scale-95 shadow-sm self-start sm:self-center shrink-0">
                        <UserPlus size={13} strokeWidth={2.5} className="sm:w-3.5 sm:h-3.5" />
                        Invite Member
                    </button>
                </div>
                <div className="space-y-6">
                    {admins.length > 0 && (
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2 px-1">
                                <ShieldCheck size={14} className="text-zinc-500" />
                                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-zinc-400">
                                    Administrators ({admins.length})
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 gap-2 w-full">
                                {admins.map(member => <MemberCard key={member.id} member={member} owner={userId} orgId={org.id} />)}
                            </div>
                        </div>
                    )}
                    {moderators.length > 0 && (
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2 px-1">
                                <Sliders size={14} className="text-zinc-500" />
                                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-zinc-400">
                                    Moderators ({moderators.length})
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 gap-2 w-full">
                                {moderators.map(member => <MemberCard key={member.id} member={member} owner={userId} orgId={org.id} />)}
                            </div>
                        </div>
                    )}
                    {volunteers.length > 0 && (
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2 px-1">
                                <Heart size={14} className="text-zinc-500" />
                                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-zinc-400">
                                    Volunteers ({volunteers.length})
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 gap-2 w-full">
                                {volunteers.map(member => <MemberCard key={member.id} member={member} owner={userId} orgId={org.id} />)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {
                isFormOpen && <div className="fixed flex inset-0 justify-center items-center z-999 backdrop-blur-xl">
                    <div className="relative w-90 h-63 bg-zinc-100 border border-zinc-100 rounded-2xl p-4">
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute right-4 top-4 p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-white rounded-lg transition-colors"
                        >
                            <X size={16} />
                        </button>
                        <h1 className="font-bold tracking-tight text-xl text-center">Add Member</h1>
                        <p className="text-xs text-zinc-400 text-center">Fill in member details</p>
                        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
                            <div className="flex border border-zinc-200 rounded-md p-2 cursor-default uppercase text-xs tracking-wider font-semibold">
                                <span onClick={() => setRole("ADMIN")} className={`w-[33%] p-1 text-center ${role === "ADMIN" ? `bg-black text-white rounded-md` : ``}`}>Admin</span>
                                <span onClick={() => setRole("MODERATOR")} className={`w-[33%] p-1 text-center ${role === "MODERATOR" ? `bg-black text-white rounded-md` : ``}`}>Moderator</span>
                                <span onClick={() => setRole("VOLUNTEER")} className={`w-[33%] p-1 text-center ${role === "VOLUNTEER" ? `bg-black text-white rounded-md` : ``}`}>Volunteer</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm tracking-tight font-medium ml-2">Email:</label>
                                <div className="flex flex-col">
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="golden-jubilee" className="w-full bg-white py-2 px-4 rounded-3xl focus:outline-0 text-sm tracking-wide" />
                                    {error && <p className="text-[10px] text-red-500 ml-4">Invalid email</p>}
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
    )
}