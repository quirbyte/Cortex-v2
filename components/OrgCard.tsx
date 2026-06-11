"use client";
import { Trash, Calendar, Building2, SquareArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export type OrganizationCardType = { id: string; name: string; slug: string; role: string; createdAt: string; }

export default function OrgCard({ id, name, slug, role, createdAt }: OrganizationCardType) {
    const router = useRouter();

    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    const handleOrgDelete = async () => {
        try {
            const res = await fetch(`/api/orgs`, {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                router.refresh();
            }
        } catch {
            console.log("Unable to delete event")
        }
    }

    return (
        <div className="group relative flex flex-col justify-between h-56 w-full rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-zinc-300 overflow-hidden font-manrope">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-zinc-50 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-100 z-0" />
            <div className="absolute -top-6 -left-6 w-25 h-25 bg-zinc-50 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-100 z-0" />

            <div className="flex items-start justify-between w-full z-10">
                <div className="p-3 bg-zinc-100 rounded-xl text-zinc-700">
                    <Building2 size={22} strokeWidth={2} />
                </div>

                <button onClick={handleOrgDelete}
                    className="p-2 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-200"
                    aria-label="Delete organization"
                >
                    <Trash size={18} strokeWidth={2} />
                </button>
            </div>

            <div className="z-10 mt-auto w-full">
                <div className="flex items-end justify-between w-full">
                    <div>
                        <h3 className="font-bold text-xl tracking-tight text-zinc-900 group-hover:text-zinc-950 transition-colors">
                            {name}
                        </h3>
                        <p className="text-xs tracking-wider font-semibold text-zinc-500 uppercase mt-0.5">{role}</p>
                    </div>

                    <button
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm transition-all duration-200 hover:bg-zinc-600 active:scale-95"
                        aria-label="Enter organization"
                    >
                        <SquareArrowRightIcon size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-400 mt-4 pt-3 border-t border-zinc-100">
                    <Calendar size={13} />
                    <span className="text-xs font-medium font-mono">Created {formattedDate}</span>
                </div>
            </div>
        </div>
    );
}