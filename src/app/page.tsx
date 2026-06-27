"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  MapPin,
  BarChart3,
  Presentation,
  Menu,
  X,
  Sun,
  ChevronRight,
} from "lucide-react";

// Dynamic imports to avoid SSR window crash with Leaflet and Recharts
const TouristView = dynamic(() => import("@/components/TouristView"), { ssr: false });
const ManagerView = dynamic(() => import("@/components/ManagerView"), { ssr: false });

type ViewMode = "turista" | "gestao";

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
];

export default function Home() {
  const [view, setView] = useState<ViewMode>("turista");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060913] text-white flex flex-col lg:flex-row">
      {/* Sidebar — Desktop Layout */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#04060c] border-r border-white/[0.06] p-5 fixed h-screen z-30 justify-between">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Sun className="w-6 h-6 text-amber-400" />
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">
                DUNAS<span className="text-amber-400">TECH</span>
              </h1>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                Observatório Potiguar
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
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
                  <span className={`text-xs font-bold block ${view === item.id ? "text-amber-400" : ""}`}>
                    {item.label}
                  </span>
                  <span className="text-[9px] text-slate-500">{item.sublabel}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer with Pitch Link */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          <Link
            href="/pitch"
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-amber-500/10 to-orange-500/5 hover:from-amber-500/20 border border-amber-500/20 hover:border-amber-500/35 rounded-xl transition-all text-left text-xs font-semibold text-amber-400 group"
          >
            <span className="flex items-center gap-2">
              <Presentation className="w-4 h-4" />
              Ver Pitch do MVP
            </span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <div className="text-[10px] text-slate-600 text-center space-y-0.5">
            <p>Hackathon do Sol 2026</p>
            <p className="text-slate-700 font-medium">Eixo 3 — Observatório Vivo</p>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#04060c]/90 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-extrabold tracking-tight">
            DUNAS<span className="text-amber-400">TECH</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/pitch"
            className="text-[10px] px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg font-bold"
          >
            Pitch
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Retract Menu */}
      {sidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 bottom-0 w-64 bg-[#04060c] border-r border-white/[0.06] p-5 z-50 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-extrabold text-white">DUNASTECH</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left ${
                      view === item.id
                        ? "bg-amber-500/15 text-amber-400 font-bold"
                        : "text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <Link
                href="/pitch"
                onClick={() => setSidebarOpen(false)}
                className="w-full flex items-center justify-between px-3 py-2 bg-amber-500/10 text-amber-400 text-xs rounded-xl font-bold border border-amber-500/20"
              >
                <span>Ver Pitch</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
              <p className="text-[9px] text-slate-600 text-center">Hackathon do Sol 2026</p>
            </div>
          </aside>
        </>
      )}

      {/* Main Responsive Fluid Workspace */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {view === "turista" && <TouristView />}
          {view === "gestao" && <ManagerView />}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#04060c]/90 backdrop-blur-xl border-t border-white/[0.06] z-30">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all ${
                view === item.id ? "text-amber-400" : "text-slate-500"
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
