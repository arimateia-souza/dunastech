"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  BarChart3,
  Presentation,
  Menu,
  X,
  Sun,
} from "lucide-react";

// Dynamic imports to avoid SSR issues with Firebase and Recharts
const TouristView = dynamic(() => import("@/components/TouristView"), { ssr: false });
const ManagerView = dynamic(() => import("@/components/ManagerView"), { ssr: false });
const PitchView = dynamic(() => import("@/components/PitchView"), { ssr: false });

type ViewMode = "turista" | "gestao" | "pitch";

const navItems: { id: ViewMode; label: string; icon: React.ReactNode; sublabel: string }[] = [
  {
    id: "turista",
    label: "Turista",
    sublabel: "B2C / Sensor",
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    id: "gestao",
    label: "Gestão",
    sublabel: "B2G / Dashboard",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    id: "pitch",
    label: "Pitch",
    sublabel: "Monetização",
    icon: <Presentation className="w-4 h-4" />,
  },
];

export default function Home() {
  const [view, setView] = useState<ViewMode>("turista");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060913] text-white flex">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#04060c] border-r border-white/[0.06] p-5 fixed h-screen z-30">
        <SidebarContent view={view} setView={setView} />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#04060c]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-400" />
          <span className="text-base font-extrabold tracking-tight">
            DUNAS<span className="text-amber-400">TECH</span>
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-[#04060c] border-r border-white/[0.06] p-5 z-50">
            <SidebarContent
              view={view}
              setView={(v) => {
                setView(v);
                setSidebarOpen(false);
              }}
            />
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {view === "turista" && <TouristView />}
          {view === "gestao" && <ManagerView />}
          {view === "pitch" && <PitchView />}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#04060c]/95 backdrop-blur-xl border-t border-white/[0.06] z-40">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
                view === item.id
                  ? "text-amber-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function SidebarContent({
  view,
  setView,
}: {
  view: ViewMode;
  setView: (v: ViewMode) => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <Sun className="w-6 h-6 text-amber-400" />
          <h1 className="text-xl font-extrabold tracking-tight">
            DUNAS<span className="text-amber-400">TECH</span>
          </h1>
        </div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold ml-[34px]">
          Inteligência Turística
        </p>
      </div>

      {/* Nav Items */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all text-left ${
              view === item.id
                ? "bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/25 text-amber-400"
                : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-200 border border-transparent"
            }`}
          >
            {item.icon}
            <div>
              <span className={`text-sm font-semibold block ${view === item.id ? "text-amber-400" : ""}`}>
                {item.label}
              </span>
              <span className="text-[10px] text-slate-500">{item.sublabel}</span>
            </div>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <p className="text-[10px] text-slate-600 text-center">
          Hackathon do Sol 2026
        </p>
        <p className="text-[10px] text-slate-700 text-center mt-1">
          Eixo 3 — Observatório Inteligente
        </p>
      </div>
    </>
  );
}
