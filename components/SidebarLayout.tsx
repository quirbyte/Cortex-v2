"use client";
import { CircleChevronLeft, CircleChevronRight, X, Menu } from "lucide-react";
import { useState } from "react";

export default function SidebarLayout({children}:{children : React.ReactElement}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return <div className="flex h-screen">
    <aside className={`relative shrink-0 border border-r-zinc-300 ${isOpen ? "w-64" : "w-13"} transition-all duration-300 hidden md:flex items-center flex-col p-3 bg-amber-300 font-manrope`}>
      <div onClick={() => setIsOpen(!isOpen)} className="absolute bottom-1/2 -right-2.5 rounded-full bg-zinc-100/95">
        {isOpen ? <CircleChevronLeft size={20} color="#FFD230" /> : <CircleChevronRight size={20} color="#FFD230" />}
      </div>
      <div className="absolute top-2 left-2 w-full">
        <div className="flex items-center gap-1 w-full">
          <img src="/logo.svg" className="h-9 w-9" alt="Logo" />
          {isOpen && <span className="font-bold text-xl text-black tracking-wide">Cortex</span>}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        hi
      </div>
    </aside>

    <div className="md:hidden font-manrope">
      <div className="fixed top-0 left-0 w-full h-16 px-6 bg-white/70 backdrop-blur-md flex items-center justify-between z-40 border-b border-zinc-200/50">
        <div className="flex items-center ">
          <div className="p-1.5">
            <img src="/logo.svg" className="h-6 w-6" alt="Logo" />
          </div>
          <span className="font-bold text-lg text-zinc-900 tracking-tight">Cortex</span>
        </div>

        <div className="h-8 w-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-semibold text-zinc-600">
          CX
        </div>
      </div>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`fixed left-4 z-50 p-2.5 rounded-full bg-zinc-900 text-white shadow-xl border border-zinc-800 cursor-pointer transition-all duration-300 ease-in-out ${isMobileOpen ? "top-5 left-50 rotate-180 bg-amber-400 text-black border-amber-500" : "top-20"
          }`}
        aria-label="Toggle Menu"
      >
        {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      <div
        className={`fixed inset-0 bg-zinc-950/40 z-40 transition-opacity duration-300 ease-in-out ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-zinc-50 p-6 border-r border-zinc-200/80 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center pb-6 border-b border-zinc-200 mb-6 mt-16">
          <div className="p-1.5 rounded-xl">
            <img src="/logo.svg" className="h-5 w-5" alt="Logo" />
          </div>
          <span className="font-bold text-md text-zinc-900 tracking-tight">Cortex</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-3 mb-2">Navigation</div>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-amber-400/10 text-amber-600 font-medium text-sm transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-600 hover:bg-zinc-100 font-medium text-sm transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-zinc-400" />
            Analytics
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-600 hover:bg-zinc-100 font-medium text-sm transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-transparent" />
            Settings
          </a>
        </div>
        <div className="pt-4 border-t border-zinc-200 text-xs text-zinc-400">
          v1.0.0 • Production
        </div>
      </aside>
    </div>

    <main className="flex-1 p-4 pt-20 md:pt-4 overflow-y-auto h-full">{children}</main>
  </div>
}