"use client";
import { CircleChevronLeft, CircleChevronRight, X, Menu, LayoutDashboard, Theater, Building2, Tickets, Settings, Headset } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";
import { optionTypes } from "@/app/dashboard/page";
import { signOut } from "next-auth/react";

export default function SidebarLayout({ option, setOption, children }: { option: string, setOption: Dispatch<SetStateAction<optionTypes>>, children: React.ReactElement }) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: <LayoutDashboard size={16} /> },
    { id: "events", label: "Events", icon: <Theater size={16} /> },
    { id: "orgs", label: "Organizations", icon: <Building2 size={16} /> },
    { id: "bookings", label: "Bookings", icon: <Tickets size={16} /> },
    { id: "settings", label: "Settings", icon: <Settings size={16} /> },
    { id: "help", label: "Help", icon: <Headset size={16} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-white font-manrope text-black antialiased overflow-hidden">
      
      <aside
        className={`relative shrink-0 border-r border-black/10 ${
          isOpen ? "w-64" : "w-18"
        } transition-all duration-300 hidden md:flex flex-col bg-white z-20 h-full`}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-1/2 -right-3.5 transform -translate-y-1/2 rounded-full bg-white border border-black/10 shadow-sm cursor-pointer p-1 z-30 hover:bg-zinc-50 transition-colors"
        >
          {isOpen ? <CircleChevronLeft size={18} className="text-black" /> : <CircleChevronRight size={18} className="text-black" />}
        </div>
        
        <div className="flex items-center px-5 py-6 border-b border-black/10">
          <div className="w-8 h-8 rounded flex items-center justify-center shrink-0">
            <img src="/logo.svg" alt="pic" className="h-full w-full" />
          </div>
          {isOpen && <span className="font-black text-xl tracking-tight text-black ml-3">Cortex</span>}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 select-none">
          {isOpen && (
            <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-3 mb-3">
              Navigation
            </div>
          )}
          {menuItems.map((item) => {
            const isActive = option === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setOption(item.id as optionTypes)}
                style={{
                  backgroundColor: isActive ? '#000000' : 'transparent',
                  color: isActive ? '#ffffff' : 'rgba(0, 0, 0, 0.6)'
                }}
                className={`group relative flex items-center gap-3.5 px-3 py-3 rounded-xl cursor-pointer font-semibold text-sm select-none ${
                  !isActive && "hover:text-black hover:bg-black/5 transition-colors duration-100"
                }`}
              >
                <div 
                  className={`absolute left-0 w-1 h-5 bg-amber-400 rounded-r transition-all duration-150 ease-out ${
                    isActive && isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`} 
                />
                <div 
                  style={{ color: isActive ? '#FFD230' : undefined }}
                  className={`shrink-0 ${!isActive && "text-black/40 group-hover:text-black transition-colors duration-100"}`}
                >
                  {item.icon}
                </div>
                {isOpen && <span>{item.label}</span>}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-black/10 flex flex-col gap-3">
          {isOpen && (
            <div className="flex items-center gap-3 px-2">
              <div className="w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center font-bold text-xs text-black border border-black/5">S</div>
              <div className="truncate">
                <p className="text-xs font-bold text-black leading-none">Soumyadip</p>
                <p className="text-[10px] text-black/40 font-mono mt-0.5">v1.0.0 • Prod</p>
              </div>
            </div>
          )}
          <button
            onClick={async () => {
              setLoading(true);
              try { await signOut({ callbackUrl: "/signin" }); } finally { setLoading(false); }
            }}
            disabled={loading}
            className="w-full py-2.5 px-3 text-xs flex items-center justify-center font-bold text-white bg-black hover:bg-zinc-900 rounded-xl transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {isOpen ? "Log out" : "Exit"}
          </button>
        </div>
      </aside>

      <div className="md:hidden">
        <div className="fixed top-0 left-0 w-full h-16 px-4 bg-white/80 backdrop-blur-md flex items-center justify-between z-40 border-b border-black/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center">
              <img src="/logo.svg" alt="pic" className="h-full w-full" />
            </div>
            <span className="font-black text-lg tracking-tight text-black">Cortex</span>
          </div>
          <div className="w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold text-black border border-black/5">S</div>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`fixed left-4 z-50 p-2.5 rounded-full bg-black text-white shadow-lg cursor-pointer transition-all duration-300 ease-in-out ${
            isMobileOpen ? "top-4 left-52 rotate-180 bg-amber-400 text-black" : "top-20"
          }`}
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ease-in-out ${
            isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileOpen(false)}
        />

        <aside
          className={`fixed top-0 left-0 z-40 w-64 h-full bg-white p-6 border-r border-black/10 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center pb-5 border-b border-black/10 mb-6 mt-16">
            <div className="w-6 h-6 rounded flex items-center justify-center">
              <img src="/logo.svg" alt="pic" className="h-full w-full" />
            </div>
            <span className="font-black text-md tracking-tight text-black ml-2">Cortex</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-3 mb-2">
              Navigation
            </div>
            {menuItems.map((item) => {
              const isActive = option === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setOption(item.id as optionTypes);
                    setIsMobileOpen(false);
                  }}
                  style={{
                    backgroundColor: isActive ? '#000000' : 'transparent',
                    color: isActive ? '#ffffff' : 'rgba(0, 0, 0, 0.6)'
                  }}
                  className={`group relative flex items-center gap-3.5 px-3 py-3 rounded-xl cursor-pointer font-semibold text-sm select-none ${
                    !isActive && "hover:text-black hover:bg-black/4 transition-colors duration-100"
                  }`}
                >
                  <div 
                    style={{ color: isActive ? '#FFD230' : undefined }}
                    className={`shrink-0 ${!isActive && "text-black/40 group-hover:text-black transition-colors duration-100"}`}
                  >
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-black/10 text-[11px] font-mono text-black/40 flex justify-between items-center">
            <p>v1.0.0 • Prod</p>
            <button
              onClick={async () => {
                setLoading(true);
                try { await signOut({ callbackUrl: "/signin" }); } finally { setLoading(false); }
              }}
              disabled={loading}
              className="py-1.5 px-3 text-xs font-bold text-white bg-black hover:bg-zinc-900 rounded-lg transition-all disabled:opacity-50"
            >
              Log out
            </button>
          </div>
        </aside>
      </div>
      <main className="flex-1 pt-12 pb-8 px-4 md:px-0 md:pt-0 overflow-y-auto h-full w-full z-10 bg-white">
        {children}
      </main>

    </div>
  );
}