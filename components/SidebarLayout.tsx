"use client";
import { CircleChevronLeft, CircleChevronRight, X, Menu, LayoutDashboard, Layout, Theater, Building2, Tickets, Settings, Headset } from "lucide-react";
import { useState } from "react";

type optionTypes = "home" | "events" | "orgs" | "bookings" | "settings" | "help";

export default function SidebarLayout({ children }: { children: React.ReactElement }) {
  const [isOpen, setIsOpen] = useState(true);
  const [option, setOption] = useState<optionTypes>("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return <div className="flex h-screen">
    <aside
      className={`relative shrink-0 border-r border-zinc-200/50 ${isOpen ? "w-64" : "w-16"
        } transition-all duration-300 hidden md:flex flex-col bg-white/80 font-manrope`}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 rounded-full bg-zinc-100 shadow-md cursor-pointer p-1"
      >
        {isOpen ? (
          <CircleChevronLeft size={20} color="#FFD230" />
        ) : (
          <CircleChevronRight size={20} color="#FFD230" />
        )}
      </div>

      <div className="flex items-center px-4 py-5 bg-amber-400/50">
        <img src="/logo.svg" className="h-8 w-8" alt="Logo" />
        {isOpen && (
          <span className="font-bold text-lg text-zinc-900 tracking-wide">
            Cortex
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 cursor-default">
        {isOpen ? <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-3 mb-2">Navigation</div> : <div></div>}
        <div onClick={() => setOption("home")}
          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg ${option === "home" ? "bg-amber-400/10 text-amber-600  hover:bg-amber-400/20" : "text-zinc-600 hover:bg-zinc-100"}  font-medium text-sm transition-colors`}
        >
          {option === "home" && isOpen && <div className="absolute left-3 w-1.5 h-1.5 rounded-full bg-amber-500" />}
          {isOpen && <div className="w-1.5 h-1.5 rounded-full bg-transparent" />}
          <LayoutDashboard size={16} />
          {isOpen && "Home"}
        </div>
        <div onClick={() => setOption("events")}
          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg ${option === "events" ? "bg-amber-400/10 text-amber-600  hover:bg-amber-400/20" : "text-zinc-600 hover:bg-zinc-100"}  font-medium text-sm transition-colors`}
        >
          {option === "events" && isOpen && <div className="absolute left-3 w-1.5 h-1.5 rounded-full bg-amber-500" />}
          {isOpen && <div className="w-1.5 h-1.5 rounded-full bg-transparent" />}
          <Theater size={16} />
          {isOpen && "Events"}
        </div>
        <div onClick={() => setOption("orgs")}
          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg ${option === "orgs" ? "bg-amber-400/10 text-amber-600  hover:bg-amber-400/20" : "text-zinc-600 hover:bg-zinc-100"}  font-medium text-sm transition-colors`}
        >
          {option === "orgs" && isOpen && <div className="absolute left-3 w-1.5 h-1.5 rounded-full bg-amber-500" />}
          {isOpen && <div className="w-1.5 h-1.5 rounded-full bg-transparent" />}
          <Building2 size={16} />
          {isOpen && "Organizations"}
        </div>
        <div onClick={() => setOption("bookings")}
          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg ${option === "bookings" ? "bg-amber-400/10 text-amber-600  hover:bg-amber-400/20" : "text-zinc-600 hover:bg-zinc-100"}  font-medium text-sm transition-colors`}
        >
          {option === "bookings" && isOpen && <div className="absolute left-3 w-1.5 h-1.5 rounded-full bg-amber-500" />}
          {isOpen && <div className="w-1.5 h-1.5 rounded-full bg-transparent" />}
          <Tickets size={16} />
          {isOpen && "Bookings"}
        </div>
        <div onClick={() => setOption("settings")}
          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg ${option === "settings" ? "bg-amber-400/10 text-amber-600  hover:bg-amber-400/20" : "text-zinc-600 hover:bg-zinc-100"}  font-medium text-sm transition-colors`}
        >
          {option === "settings" && isOpen && <div className="absolute left-3 w-1.5 h-1.5 rounded-full bg-amber-500" />}
          {isOpen && <div className="w-1.5 h-1.5 rounded-full bg-transparent" />}
          <Settings size={16} />
          {isOpen && "Settings"}
        </div>
        <div onClick={() => setOption("help")}
          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg ${option === "help" ? "bg-amber-400/10 text-amber-600  hover:bg-amber-400/20" : "text-zinc-600 hover:bg-zinc-100"}  font-medium text-sm transition-colors`}
        >
          {option === "help" && isOpen && <div className="absolute left-3 w-1.5 h-1.5 rounded-full bg-amber-500" />}
          {isOpen && <div className="w-1.5 h-1.5 rounded-full bg-transparent" />}
          <Headset size={16} />
          {isOpen && "Help"}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-zinc-200 text-xs text-zinc-400">
        v1.0.0 {isOpen && "• Production"}
      </div>
    </aside>


    <div className="md:hidden font-manrope">
      <div className="fixed top-0 left-0 w-full h-16 px-6 bg-zinc-50 backdrop-blur-md flex items-center justify-between z-40 border-b border-zinc-200/50">
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
          <div onClick={() => setOption("home")} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl ${option === "home" ? "bg-amber-400/10 text-amber-600 " : "text-zinc-600 hover:bg-zinc-100"} font-medium text-sm transition-colors`}>
            <div className={`w-1.5 h-1.5 rounded-full ${option === "home" ? "bg-amber-500" : "bg-transparent group-hover:bg-zinc-400"}`} />
            <LayoutDashboard size={16} />
            Home
          </div>
          <div onClick={() => setOption("events")} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl ${option === "events" ? "bg-amber-400/10 text-amber-600 " : "text-zinc-600 hover:bg-zinc-100"} font-medium text-sm transition-colors`}>
            <div className={`w-1.5 h-1.5 rounded-full ${option === "events" ? "bg-amber-500" : "bg-transparent group-hover:bg-zinc-400"}`} />
            <Theater size={16} />
            Events
          </div>
          <div onClick={() => setOption("orgs")} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl ${option === "orgs" ? "bg-amber-400/10 text-amber-600 " : "text-zinc-600 hover:bg-zinc-100"} font-medium text-sm transition-colors`}>
            <div className={`w-1.5 h-1.5 rounded-full ${option === "orgs" ? "bg-amber-500" : "bg-transparent group-hover:bg-zinc-400"}`} />
            <Building2 size={16} />
            Organizations
          </div>
          <div onClick={() => setOption("bookings")} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl ${option === "bookings" ? "bg-amber-400/10 text-amber-600 " : "text-zinc-600 hover:bg-zinc-100"} font-medium text-sm transition-colors`}>
            <div className={`w-1.5 h-1.5 rounded-full ${option === "bookings" ? "bg-amber-500" : "bg-transparent group-hover:bg-zinc-400"}`} />
            <Tickets size={16} />
            Bookings
          </div>
          <div onClick={() => setOption("settings")} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl ${option === "settings" ? "bg-amber-400/10 text-amber-600 " : "text-zinc-600 hover:bg-zinc-100"} font-medium text-sm transition-colors`}>
            <div className={`w-1.5 h-1.5 rounded-full ${option === "settings" ? "bg-amber-500" : "bg-transparent group-hover:bg-zinc-400"}`} />
            <Settings size={16} />
            Settings
          </div>
          <div onClick={() => setOption("help")} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl ${option === "help" ? "bg-amber-400/10 text-amber-600 " : "text-zinc-600 hover:bg-zinc-100"} font-medium text-sm transition-colors`}>
            <div className={`w-1.5 h-1.5 rounded-full ${option === "help" ? "bg-amber-500" : "bg-transparent group-hover:bg-zinc-400"}`} />
            <Headset size={16} />
            Help
          </div>
        </div>
        <div className="pt-4 border-t border-zinc-200 text-xs text-zinc-400">
          v1.0.0 • Production
        </div>
      </aside>
    </div>

    <main className="flex-1 p-4 pt-20 md:pt-4 overflow-y-auto h-full">{children}</main>
  </div>
}