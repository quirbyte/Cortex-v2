import { MemberType } from "./MembersPane";
import { formatDate } from "@/helpers/date";
import { ShieldCheck, Mail, UserMinus, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MemberCard({ member, owner, orgId }: { member: MemberType; owner: string; orgId: string }) {
    const router = useRouter();
    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/orgs/members`, {
                method: "DELETE",
                body: JSON.stringify({
                    orgId,
                    email: member.email
                })
            });
            if (res.ok) {
                router.refresh();
            }
        } catch {
            console.log("Unable to delete member");
        }
    }

    return <div className="group relative flex items-center justify-between w-full rounded-xl sm:rounded-2xl border border-zinc-200/80 bg-white p-2.5 sm:p-4 transition-all duration-300 hover:shadow-sm hover:border-zinc-300 overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-zinc-50 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:bg-zinc-100/60 z-0" />
        <div className="flex items-center gap-2 sm:gap-3.5 z-10 min-w-0 flex-1">
            <div className="flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-zinc-100 text-zinc-800 font-black text-xs sm:text-sm border border-zinc-200/50 uppercase font-mono tracking-tight select-none">
                {member.name.substring(0, 2)}
            </div>
            <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <h4 className="font-bold text-xs sm:text-base tracking-tight text-zinc-900 group-hover:text-black transition-colors truncate">
                        {member.name}
                    </h4>
                    {member.role === "ADMIN" && member.creator === owner && (
                        <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 rounded-md sm:rounded-lg text-[8px] sm:text-[10px] font-bold tracking-wider font-mono uppercase border bg-amber-50 text-amber-700 border-amber-200/50">
                            <ShieldCheck size={8} className="sm:w-2.5 sm:h-2.5" />
                            Owner
                        </span>
                    )}
                    {member.role === "ADMIN" && member.creator !== owner && (
                        <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 rounded-md sm:rounded-lg text-[8px] sm:text-[10px] font-bold tracking-wider font-mono uppercase border bg-zinc-900 text-white border-zinc-950">
                            <Shield size={8} className="sm:w-2.5 sm:h-2.5" />
                            Admin
                        </span>
                    )}
                </div>

                <p className="text-[10px] sm:text-xs text-zinc-400 font-medium flex items-center gap-1 truncate">
                    <Mail size={10} className="text-zinc-300 sm:w-3 sm:h-3" />
                    {member.email}
                </p>
            </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-6 z-10 shrink-0">
            <div className="hidden sm:flex flex-col items-end font-mono">
                <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Assigned At</span>
                <span className="text-xs text-amber-600 font-bold mt-0.5">
                    {formatDate({ date: member.joinedAt, option: 1 })}
                </span>
            </div>

            {member.creator === owner ? (
                <button onClick={handleDelete}
                    aria-label="Revoke permissions"
                    className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl text-zinc-400 border border-transparent hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition duration-150 active:scale-95"
                >
                    <UserMinus size={13} className="sm:w-3.5 sm:h-3.5" />
                </button>
            ) : (
                <div className="w-7 h-7 sm:w-9 sm:h-9 hidden sm:block" />
            )}
        </div>
    </div>
}