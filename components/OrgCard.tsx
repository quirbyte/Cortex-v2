"use client";

import { getOrgPalette } from "@/DesignComponents/ColorRandomizer";
import { formatDate } from "@/helpers/date";
import { Trash, Calendar, Building2, SquareArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export type OrganizationCardType = { 
  id: string; 
  name: string; 
  slug: string; 
  role: string; 
  createdAt: string; 
}

export default function OrgCard({ id, name, slug, role, createdAt }: OrganizationCardType) {
  const router = useRouter();
  const formattedDate = formatDate({ date: createdAt, option: 1 });
  const palette = getOrgPalette(id);

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
      console.log("Unable to delete organization");
    }
  };

  const handleOrgEntry = async () => {
    try {
      router.push(`/dashboard/${slug}?tab=orgs&pane=overview`);
    } catch {
      console.log("Unable to access Org page");
    }
  };

  return (
    <div 
      className={`group relative flex flex-col justify-between h-56 w-full rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md overflow-hidden font-manrope ${palette.bg} ${palette.border}`}
    >
      {/* Absolute Decorative Accent Background Blobs */}
      <div className={`absolute -right-6 -bottom-6 w-32 h-32 ${palette.accentBlob} rounded-full transition-all duration-500 group-hover:scale-110 z-0`} />
      <div className={`absolute -top-6 -left-6 w-25 h-25 ${palette.accentBlob} rounded-full transition-all duration-500 group-hover:scale-110 z-0`} />

      {/* Top Section Layout */}
      <div className="flex items-start justify-between w-full z-10">
        <div className={`p-3 ${palette.iconBg} rounded-xl transition-colors duration-300`}>
          <Building2 size={22} strokeWidth={2} />
        </div>

        {role === "ADMIN" && (
          <button 
            onClick={handleOrgDelete}
            className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 border border-transparent hover:border-red-100 dark:hover:border-red-900/30 transition-all duration-200"
            aria-label="Delete organization"
          >
            <Trash size={18} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Bottom Section Content */}
      <div className="z-10 mt-auto w-full">
        <div className="flex items-end justify-between w-full">
          <div>
            <h3 className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
              {name}
            </h3>
            <p className="text-[10px] tracking-wider font-bold text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
              {role}
            </p>
          </div>

          <button 
            onClick={handleOrgEntry}
            className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-all duration-200 active:scale-95 ${palette.btn}`}
            aria-label="Enter organization"
          >
            <SquareArrowRightIcon size={20} />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <Calendar size={13} />
          <span className="text-xs font-medium font-mono">Created {formattedDate}</span>
        </div>
      </div>
    </div>
  );
}