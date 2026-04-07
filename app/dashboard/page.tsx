"use client";
import Link from "next/link";
import { Bell, ChevronRight, Shield, Zap, TrendingUp, Heart, Droplets, Activity, UserCircle, FlaskConical } from "lucide-react";
import BottomNav from "@/app/components/BottomNav";
import StatusBar from "@/app/components/StatusBar";
import HealthRing from "@/app/components/HealthRing";
import MiniSparkline from "@/app/components/MiniSparkline";

const categories = [
  {
    id: "hematology",
    label: "Hematology",
    sublabel: "CBC · ESR",
    progress: 82,
    color: "#00D4B4",
    glowClass: "ring-glow-teal",
    status: "good",
    icon: <Droplets size={14} />,
  },
  {
    id: "biochemistry",
    label: "Biochemistry",
    sublabel: "Lipid · Glucose",
    progress: 61,
    color: "#F59E0B",
    glowClass: "ring-glow-amber",
    status: "borderline",
    icon: <FlaskConical size={14} />,
  },
  {
    id: "hormones",
    label: "Hormones",
    sublabel: "TSH · T3 · T4",
    progress: 44,
    color: "#EF4444",
    glowClass: "ring-glow-red",
    status: "critical",
    icon: <Zap size={14} />,
  },
  {
    id: "preventive",
    label: "Preventive",
    sublabel: "Vit D · B12",
    progress: 73,
    color: "#10B981",
    glowClass: "ring-glow-green",
    status: "good",
    icon: <Shield size={14} />,
  },
  {
    id: "cardiac",
    label: "Cardiac",
    sublabel: "ECG · Troponin",
    progress: 88,
    color: "#7C3AED",
    glowClass: "ring-glow-purple",
    status: "good",
    icon: <Heart size={14} />,
  },
  {
    id: "metabolic",
    label: "Metabolic",
    sublabel: "HbA1c · Insulin",
    progress: 55,
    color: "#3B82F6",
    glowClass: "ring-glow-blue",
    status: "borderline",
    icon: <Activity size={14} />,
  },
];

const alerts = [
  { label: "TSH Critical", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  { label: "Vit D Low", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  { label: "Lipids OK", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
];

const vitals = [
  { label: "Heart Rate", value: "72", unit: "bpm", data: [68, 74, 71, 76, 72, 70, 72], color: "#EF4444" },
  { label: "Blood Pressure", value: "118/76", unit: "mmHg", data: [120, 118, 122, 116, 119, 118, 118], color: "#7C3AED" },
  { label: "SpO2", value: "98", unit: "%", data: [97, 98, 98, 99, 97, 98, 98], color: "#00D4B4" },
];

export default function Dashboard() {
  return (
    <div className="mobile-container overflow-x-hidden pb-28">
      <StatusBar />

      {/* Header */}
      <div className="px-5 pt-1 pb-4 flex items-center justify-between">
        <div>
          <p className="text-white/50 text-[13px] font-medium">Good Morning</p>
          <h1 className="text-[22px] font-bold text-white tracking-tight leading-tight">
            Arjun Sharma
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] text-[#10B981] font-medium">Last synced 2h ago</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Bell size={16} className="text-white/70" />
            <div className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#EF4444]" />
          </button>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #00D4B4, #7C3AED)" }}
          >
            AS
          </div>
        </div>
      </div>

      {/* Overall Health Score */}
      <div className="mx-5 mb-5 rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A1D25 0%, #0D1520 100%)", border: "1px solid rgba(0,212,180,0.2)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(circle at 80% 50%, #00D4B4, transparent 60%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-white/50 text-[11px] font-medium uppercase tracking-wider">Overall Health Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[42px] font-black text-white leading-none">72</span>
              <span className="text-[20px] font-light text-white/40">/100</span>
            </div>
            <p className="text-[#F59E0B] text-[12px] font-semibold mt-1">Needs Attention</p>
          </div>
          <div className="relative w-20 h-20">
            <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle cx="40" cy="40" r="32" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 32}`} strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.72)}`}
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 8px rgba(0,212,180,0.6))" }} />
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00D4B4" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <TrendingUp size={16} className="text-[#00D4B4]" />
            </div>
          </div>
        </div>
        {/* Alert pills */}
        <div className="flex gap-2 mt-3">
          {alerts.map((a) => (
            <div key={a.label} className="px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-semibold"
              style={{ background: a.bg, color: a.color }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: a.color }} />
              {a.label}
            </div>
          ))}
        </div>
      </div>

      {/* Category Rings */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-bold text-white">Health Categories</h2>
          <span className="text-[11px] text-white/40">Tap to explore</span>
        </div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.id}`}>
              <HealthRing
                size={90}
                strokeWidth={7}
                progress={cat.progress}
                color={cat.color}
                glowClass={cat.glowClass}
                label={cat.label}
                sublabel={cat.sublabel}
                centerIcon={cat.icon}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Live Vitals */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-bold text-white">Live Vitals</h2>
          <span className="text-[11px] text-[#00D4B4]">Connected</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {vitals.map((v) => (
            <div key={v.label}
              className="rounded-2xl p-3"
              style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}>
              <MiniSparkline data={v.data} color={v.color} width={64} height={28} />
              <div className="mt-2">
                <div className="text-[14px] font-black text-white leading-none">{v.value}</div>
                <div className="text-[9px] text-white/40 mt-0.5">{v.unit}</div>
                <div className="text-[9px] font-semibold mt-1" style={{ color: v.color }}>{v.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations CTA */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-bold text-white">Recommendations</h2>
          <Link href="/recommendations" className="text-[11px] text-[#00D4B4]">See all</Link>
        </div>

        {/* Consult Doctor Card */}
        <Link href="/recommendations">
          <div className="rounded-2xl p-4 mb-3 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1A1D25, #1A1525)", border: "1px solid rgba(124,58,237,0.3)" }}>
            <div className="absolute right-0 top-0 bottom-0 w-24 opacity-10"
              style={{ background: "radial-gradient(circle at 80% 50%, #7C3AED, transparent)" }} />
            <div className="flex items-center gap-3 relative">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}>
                <UserCircle size={22} color="#7C3AED" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-bold text-white">Consult Doctor</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444]">URGENT</span>
                </div>
                <p className="text-[11px] text-white/50 mt-0.5">Dr. Priya Menon · Endocrinologist</p>
                <p className="text-[11px] text-[#7C3AED] font-semibold mt-0.5">TSH critically elevated</p>
              </div>
              <ChevronRight size={16} className="text-white/30" />
            </div>
          </div>
        </Link>

        {/* Quick action cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: "Take Vitamin D", detail: "2000 IU daily · 7 weeks", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", icon: "💊" },
            { label: "30 min Walk", detail: "Daily · Reduces BMI", color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)", icon: "🚶" },
          ].map((action) => (
            <Link key={action.label} href="/recommendations">
              <div className="rounded-2xl p-3"
                style={{ background: action.bg, border: `1px solid ${action.border}` }}>
                <span className="text-2xl">{action.icon}</span>
                <p className="text-[12px] font-bold mt-1.5" style={{ color: action.color }}>{action.label}</p>
                <p className="text-[10px] text-white/40 mt-0.5">{action.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
