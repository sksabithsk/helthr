"use client";
import { ArrowLeft, Bell, Heart, ChevronRight, Baby, Calendar, FileText, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/app/components/BottomNav";
import StatusBar from "@/app/components/StatusBar";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import MiniSparkline from "@/app/components/MiniSparkline";

const currentWeek = 22;
const totalWeeks = 40;

const markers = [
  { label: "HCG", value: "62,000", unit: "mIU/mL", status: "normal", color: "#00D4B4", data: [580, 12000, 28000, 45000, 62000] },
  { label: "Hemoglobin", value: "11.2", unit: "g/dL", status: "borderline", color: "#F59E0B", data: [12.4, 12.0, 11.8, 11.4, 11.2] },
  { label: "Blood Pressure", value: "112/74", unit: "mmHg", status: "normal", color: "#10B981", data: [115, 112, 114, 111, 112] },
  { label: "Weight", value: "67.4", unit: "kg", status: "normal", color: "#7C3AED", data: [62, 63.5, 65, 66.5, 67.4] },
];

const milestones = [
  { week: 8, label: "Heartbeat detected", done: true },
  { week: 12, label: "NT Scan — Normal", done: true },
  { week: 16, label: "Anomaly scan", done: true },
  { week: 20, label: "Anatomy scan — Done", done: true },
  { week: 24, label: "GTT (Glucose Test)", done: false, upcoming: true },
  { week: 28, label: "3rd Trimester begins", done: false },
  { week: 36, label: "GBS screening", done: false },
  { week: 40, label: "Due Date", done: false },
];

const reminders = [
  { label: "GTT Blood Test", date: "Apr 14, 2025", color: "#F59E0B", icon: "🩸" },
  { label: "Anomaly Scan", date: "Apr 22, 2025", color: "#00D4B4", icon: "🔬" },
  { label: "OB-GYN Consult", date: "Apr 28, 2025", color: "#7C3AED", icon: "👩‍⚕️" },
];

const weightData = [
  { week: "W4", value: 62 },
  { week: "W8", value: 63.2 },
  { week: "W12", value: 64.1 },
  { week: "W16", value: 65.4 },
  { week: "W20", value: 66.8 },
  { week: "W22", value: 67.4 },
];

const doctorNotes = [
  { date: "Mar 28", note: "Hemoglobin trending low. Starting iron supplementation 100mg OD.", doctor: "Dr. Ananya Shah" },
  { date: "Mar 10", note: "Anatomy scan normal. All fetal parameters on track. Next GTT at W24.", doctor: "Dr. Ananya Shah" },
];

const statusConfig = {
  normal: { color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  borderline: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  critical: { color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
};

export default function PregnancyPage() {
  const router = useRouter();
  const progressPct = (currentWeek / totalWeeks) * 100;
  const trimester = currentWeek <= 12 ? 1 : currentWeek <= 27 ? 2 : 3;

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
          <h1 className="text-[20px] font-bold text-white">Pregnancy Tracker</h1>
          <p className="text-[12px] text-white/40">Trimester {trimester} · Week {currentWeek}</p>
        </div>
        <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
          <Bell size={16} className="text-white/70" />
          <div className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#F59E0B]" />
        </button>
      </div>

      {/* Week progress hero */}
      <div className="mx-5 mb-5 rounded-2xl p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A1525, #1A1D25)", border: "1px solid rgba(236,72,153,0.3)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(circle at 90% 30%, #EC4899, transparent 60%)" }} />
        <div className="relative flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
              <circle cx="40" cy="40" r="32" fill="none"
                stroke="url(#pregGrad)" strokeWidth="7"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - progressPct / 100)}`}
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 8px rgba(236,72,153,0.6))" }} />
              <defs>
                <linearGradient id="pregGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Baby size={20} className="text-[#EC4899]" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-white/40 uppercase tracking-wider">Week</p>
            <div className="flex items-baseline gap-1">
              <span className="text-[42px] font-black text-white leading-none">{currentWeek}</span>
              <span className="text-[16px] text-white/40">/ 40</span>
            </div>
            <p className="text-[12px] text-[#EC4899] font-semibold mt-0.5">{40 - currentWeek} weeks to due date</p>
          </div>
        </div>
        <div className="relative mt-3">
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full"
              style={{
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #EC4899, #7C3AED)",
                boxShadow: "0 0 8px rgba(236,72,153,0.5)",
              }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-white/30">1st Trimester</span>
            <span className="text-[9px] text-[#EC4899] font-semibold">2nd Trimester</span>
            <span className="text-[9px] text-white/30">3rd Trimester</span>
          </div>
        </div>
        {/* Baby development note */}
        <div className="relative mt-3 rounded-xl px-3 py-2 flex items-center gap-2"
          style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)" }}>
          <span className="text-[18px]">🍌</span>
          <div>
            <p className="text-[11px] font-bold text-white">Baby is the size of a banana</p>
            <p className="text-[10px] text-white/40">~27 cm · ~430 g · Senses developing</p>
          </div>
        </div>
      </div>

      {/* Health markers */}
      <div className="px-5 mb-5">
        <h2 className="text-[15px] font-bold text-white mb-3">Health Markers</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {markers.map((m) => {
            const sc = statusConfig[m.status as keyof typeof statusConfig];
            return (
              <div key={m.label}
                className="rounded-2xl p-3"
                style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}>
                <MiniSparkline data={m.data} color={m.color} width={100} height={32} />
                <p className="text-[18px] font-black mt-2" style={{ color: m.color }}>{m.value}</p>
                <p className="text-[9px] text-white/40">{m.unit}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[11px] font-semibold text-white">{m.label}</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: sc.bg, color: sc.color }}>
                    {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weight trend */}
      <div className="px-5 mb-5">
        <h2 className="text-[15px] font-bold text-white mb-3">Weight Trend</h2>
        <div className="rounded-2xl p-4" style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EC4899" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} domain={[60, 72]} />
                <Tooltip
                  contentStyle={{ background: "#1A1D25", border: "1px solid rgba(236,72,153,0.3)", borderRadius: 8, fontSize: 10 }}
                  labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                  itemStyle={{ color: "#EC4899" }}
                />
                <Area type="monotone" dataKey="value" stroke="#EC4899" strokeWidth={2}
                  fill="url(#weightGrad)"
                  dot={{ fill: "#EC4899", r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#EC4899", stroke: "#111318", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-white/30 text-center mt-1">Ideal gain: 0.5 kg/week in 2nd trimester</p>
        </div>
      </div>

      {/* Milestones */}
      <div className="px-5 mb-5">
        <h2 className="text-[15px] font-bold text-white mb-3">Milestones</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/5" />
          <div className="space-y-3">
            {milestones.map((m) => (
              <div key={m.week} className="flex items-center gap-3 pl-1">
                <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold
                  ${m.done ? "bg-[#10B981] text-white" : m.upcoming ? "bg-[#F59E0B] text-white" : "bg-white/5 text-white/30"}`}
                  style={m.upcoming ? { boxShadow: "0 0 10px rgba(245,158,11,0.5)" } : {}}>
                  {m.done ? "✓" : m.week}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <p className={`text-[12px] font-semibold ${m.done ? "text-white/70" : m.upcoming ? "text-[#F59E0B]" : "text-white/30"}`}>
                    {m.label}
                  </p>
                  <span className="text-[10px] text-white/30">W{m.week}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming reminders */}
      <div className="px-5 mb-5">
        <h2 className="text-[15px] font-bold text-white mb-3">Upcoming Tests</h2>
        <div className="space-y-2.5">
          {reminders.map((r) => (
            <div key={r.label}
              className="rounded-xl px-3.5 py-3 flex items-center gap-3"
              style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-xl">{r.icon}</span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-white">{r.label}</p>
                <p className="text-[11px] text-white/40 mt-0.5 flex items-center gap-1">
                  <Calendar size={10} /> {r.date}
                </p>
              </div>
              <Bell size={14} style={{ color: r.color }} />
            </div>
          ))}
        </div>
      </div>

      {/* Doctor notes */}
      <div className="px-5 mb-5">
        <h2 className="text-[15px] font-bold text-white mb-3">Doctor Notes</h2>
        <div className="space-y-2.5">
          {doctorNotes.map((n, i) => (
            <div key={i}
              className="rounded-2xl p-4"
              style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope size={13} className="text-[#7C3AED]" />
                <p className="text-[11px] font-bold text-[#7C3AED]">{n.doctor}</p>
                <p className="text-[10px] text-white/30 ml-auto">{n.date}</p>
              </div>
              <p className="text-[12px] text-white/70 leading-relaxed">{n.note}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
