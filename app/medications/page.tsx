"use client";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Circle, Clock, Flame, TrendingUp, ChevronRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/app/components/BottomNav";
import StatusBar from "@/app/components/StatusBar";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

const timeSlots = [
  {
    time: "Morning",
    icon: "🌅",
    meds: [
      { id: 1, name: "Levothyroxine", dose: "50 mcg", taken: false, color: "#7C3AED", source: "Doctor", projectionKey: "tsh" },
      { id: 2, name: "Vitamin D3", dose: "2000 IU", taken: true, color: "#F59E0B", source: "AI", projectionKey: "vitd" },
      { id: 3, name: "Omega-3", dose: "1000 mg", taken: true, color: "#3B82F6", source: "Doctor", projectionKey: null },
    ],
  },
  {
    time: "Afternoon",
    icon: "☀️",
    meds: [
      { id: 4, name: "Omega-3", dose: "1000 mg", taken: false, color: "#3B82F6", source: "Doctor", projectionKey: null },
    ],
  },
  {
    time: "Night",
    icon: "🌙",
    meds: [
      { id: 5, name: "Calcium + Vit K2", dose: "500 mg", taken: false, color: "#10B981", source: "AI", projectionKey: null },
    ],
  },
];

const projections: Record<string, { label: string; color: string; unit: string; current: number; target: number; refLine: number; data: Array<{ week: string; value: number }> }> = {
  vitd: {
    label: "Vitamin D",
    color: "#F59E0B",
    unit: "ng/mL",
    current: 18.4,
    target: 45,
    refLine: 30,
    data: [
      { week: "Now", value: 18.4 },
      { week: "W2", value: 22 },
      { week: "W3", value: 27 },
      { week: "W4", value: 32 },
      { week: "W5", value: 37 },
      { week: "W6", value: 41 },
      { week: "W7", value: 45 },
    ],
  },
  tsh: {
    label: "TSH Level",
    color: "#7C3AED",
    unit: "mIU/L",
    current: 7.8,
    target: 2.5,
    refLine: 4.0,
    data: [
      { week: "Now", value: 7.8 },
      { week: "W3", value: 6.5 },
      { week: "W6", value: 5.0 },
      { week: "W9", value: 3.5 },
      { week: "W12", value: 2.5 },
    ],
  },
};

const allMeds = timeSlots.flatMap((s) => s.meds);
const adherenceWeeks = [
  { day: "Mon", pct: 100 },
  { day: "Tue", pct: 80 },
  { day: "Wed", pct: 100 },
  { day: "Thu", pct: 60 },
  { day: "Fri", pct: 100 },
  { day: "Sat", pct: 80 },
  { day: "Sun", pct: 100 },
];

export default function MedicationsPage() {
  const router = useRouter();
  const [takenMap, setTakenMap] = useState<Record<number, boolean>>(
    Object.fromEntries(allMeds.map((m) => [m.id, m.taken]))
  );
  const [expandedProj, setExpandedProj] = useState<string | null>("vitd");

  const totalMeds = allMeds.length;
  const takenCount = Object.values(takenMap).filter(Boolean).length;
  const streak = 5;

  const toggle = (id: number) => setTakenMap((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="mobile-container overflow-x-hidden pb-28">
      <StatusBar />

      {/* Header */}
      <div className="px-5 pt-1 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-white/70" />
        </button>
        <div className="flex-1">
          <h1 className="text-[20px] font-bold text-white">Medications</h1>
          <p className="text-[12px] text-white/40">Today · Mon, Apr 7</p>
        </div>
        <button className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,212,180,0.15)", border: "1px solid rgba(0,212,180,0.3)" }}>
          <Plus size={16} className="text-[#00D4B4]" />
        </button>
      </div>

      {/* Today's summary */}
      <div className="mx-5 mb-5 rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A1D25, #141820)", border: "1px solid rgba(0,212,180,0.2)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(circle at 80% 50%, #00D4B4, transparent 60%)" }} />
        <div className="relative grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[28px] font-black text-[#00D4B4]">{takenCount}</p>
            <p className="text-[9px] text-white/40">Taken</p>
          </div>
          <div>
            <p className="text-[28px] font-black text-white/60">{totalMeds - takenCount}</p>
            <p className="text-[9px] text-white/40">Pending</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1">
              <p className="text-[28px] font-black text-[#F59E0B]">{streak}</p>
              <Flame size={16} className="text-[#F59E0B] mb-1" />
            </div>
            <p className="text-[9px] text-white/40">Day streak</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="relative mt-3">
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full transition-all"
              style={{
                width: `${(takenCount / totalMeds) * 100}%`,
                background: "linear-gradient(90deg, #00D4B4, #10B981)",
                boxShadow: "0 0 8px rgba(0,212,180,0.4)",
              }} />
          </div>
          <p className="text-[10px] text-white/30 mt-1">{takenCount}/{totalMeds} medications taken today</p>
        </div>
      </div>

      {/* Time slots */}
      <div className="px-5 mb-5 space-y-4">
        {timeSlots.map((slot) => (
          <div key={slot.time}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[15px]">{slot.icon}</span>
              <span className="text-[13px] font-bold text-white/80">{slot.time}</span>
              <div className="flex-1 h-px bg-white/5" />
              <Clock size={11} className="text-white/30" />
            </div>
            <div className="space-y-2">
              {slot.meds.map((med) => {
                const taken = takenMap[med.id];
                return (
                  <div key={med.id}>
                    <button
                      onClick={() => toggle(med.id)}
                      className="w-full text-left rounded-2xl p-3.5 flex items-center gap-3 transition-all"
                      style={{
                        background: taken ? "rgba(16,185,129,0.06)" : "#1A1D25",
                        border: `1px solid ${taken ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      {/* Pill icon */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative"
                        style={{ background: `${med.color}15`, border: `1px solid ${med.color}25` }}>
                        <span className="text-[18px]">💊</span>
                        {taken && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center">
                            <span className="text-[8px] text-white font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-[13px] font-semibold ${taken ? "text-white/40 line-through" : "text-white"}`}>
                            {med.name}
                          </p>
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                            style={{ background: taken ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.05)", color: taken ? "#10B981" : "rgba(255,255,255,0.4)" }}>
                            {med.source}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/40 mt-0.5">{med.dose}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {med.projectionKey && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedProj(expandedProj === med.projectionKey ? null : med.projectionKey!); }}
                            className="p-1.5 rounded-lg"
                            style={{ background: `${med.color}15` }}>
                            <TrendingUp size={12} style={{ color: med.color }} />
                          </button>
                        )}
                        {taken ? <CheckCircle2 size={20} className="text-[#10B981]" /> : <Circle size={20} className="text-white/20" />}
                      </div>
                    </button>

                    {/* Inline projection */}
                    {med.projectionKey && expandedProj === med.projectionKey && projections[med.projectionKey] && (
                      <div className="mt-2 rounded-2xl p-4"
                        style={{ background: `${projections[med.projectionKey].color}08`, border: `1px solid ${projections[med.projectionKey].color}25` }}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[12px] font-bold text-white">{projections[med.projectionKey].label} Projection</p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-black" style={{ color: "#EF4444" }}>{projections[med.projectionKey].current}</span>
                            <TrendingUp size={11} style={{ color: projections[med.projectionKey].color }} />
                            <span className="text-[11px] font-black" style={{ color: "#10B981" }}>{projections[med.projectionKey].target}</span>
                            <span className="text-[9px] text-white/30">{projections[med.projectionKey].unit}</span>
                          </div>
                        </div>
                        <div className="h-[80px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={projections[med.projectionKey].data} margin={{ top: 4, right: 4, left: -36, bottom: 0 }}>
                              <defs>
                                <linearGradient id={`medGrad-${med.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={projections[med.projectionKey!].color} stopOpacity={0.3} />
                                  <stop offset="100%" stopColor={projections[med.projectionKey!].color} stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.04)" />
                              <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }} axisLine={false} tickLine={false} />
                              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }} axisLine={false} tickLine={false} />
                              <Tooltip
                                contentStyle={{ background: "#1A1D25", border: `1px solid ${projections[med.projectionKey!].color}40`, borderRadius: 8, fontSize: 10 }}
                                labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                                itemStyle={{ color: projections[med.projectionKey!].color }}
                              />
                              <ReferenceLine y={projections[med.projectionKey!].refLine} stroke={`${projections[med.projectionKey!].color}60`} strokeDasharray="4 4" />
                              <Area type="monotone" dataKey="value" stroke={projections[med.projectionKey!].color} strokeWidth={2}
                                fill={`url(#medGrad-${med.id})`} strokeDasharray="5 3"
                                dot={{ fill: projections[med.projectionKey!].color, r: 3, strokeWidth: 0 }} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="text-[9px] text-white/25 text-center mt-1">Forecast with consistent adherence</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly adherence */}
      <div className="px-5 mb-5">
        <h2 className="text-[15px] font-bold text-white mb-3">Weekly Adherence</h2>
        <div className="rounded-2xl p-4" style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-end justify-between gap-1.5 h-16">
            {adherenceWeeks.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg relative overflow-hidden"
                  style={{ height: `${(d.pct / 100) * 52}px`, background: `${d.pct === 100 ? "#00D4B4" : d.pct >= 80 ? "#10B981" : "#F59E0B"}30` }}>
                  <div className="absolute bottom-0 left-0 right-0 rounded-t-lg transition-all"
                    style={{
                      height: `${(d.pct / 100) * 52}px`,
                      background: d.pct === 100 ? "#00D4B4" : d.pct >= 80 ? "#10B981" : "#F59E0B",
                      boxShadow: d.pct === 100 ? "0 0 6px rgba(0,212,180,0.5)" : "",
                    }} />
                </div>
                <span className="text-[9px] text-white/30">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-[12px] text-white/60">Avg adherence this week</p>
            <p className="text-[16px] font-black text-[#00D4B4]">88%</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
