"use client";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Circle, ChevronRight, UserCircle, Pill, Dumbbell, Salad, Clock, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart
} from "recharts";
import BottomNav from "@/app/components/BottomNav";
import StatusBar from "@/app/components/StatusBar";

const projections = [
  {
    label: "Vitamin D Level",
    current: 18.4,
    target: 45,
    unit: "ng/mL",
    weeks: 7,
    color: "#F59E0B",
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
    forecast: [
      { week: "Now", value: null, forecast: 18.4 },
      { week: "W2", value: null, forecast: 22 },
      { week: "W3", value: null, forecast: 27 },
      { week: "W4", value: null, forecast: 32 },
      { week: "W5", value: null, forecast: 37 },
      { week: "W6", value: null, forecast: 41 },
      { week: "W7", value: null, forecast: 45 },
    ],
  },
  {
    label: "TSH Level",
    current: 7.8,
    target: 2.5,
    unit: "mIU/L",
    weeks: 12,
    color: "#7C3AED",
    refLine: 4.0,
    data: [
      { week: "Now", value: 7.8 },
      { week: "W3", value: 6.5 },
      { week: "W6", value: 5.0 },
      { week: "W9", value: 3.5 },
      { week: "W12", value: 2.5 },
    ],
    forecast: [],
  },
];

const tasks = [
  {
    id: 1,
    type: "medication",
    icon: Pill,
    color: "#F59E0B",
    label: "Vitamin D3 — 2000 IU",
    detail: "Once daily, after breakfast",
    urgency: "high",
    completed: true,
    streak: 5,
    source: "AI",
  },
  {
    id: 2,
    type: "consult",
    icon: UserCircle,
    color: "#7C3AED",
    label: "Dr. Priya Menon",
    detail: "Endocrinologist · Book appointment",
    urgency: "urgent",
    completed: false,
    streak: 0,
    source: "AI",
  },
  {
    id: 3,
    type: "exercise",
    icon: Dumbbell,
    color: "#10B981",
    label: "30 min Brisk Walk",
    detail: "Daily · Morning preferred",
    urgency: "medium",
    completed: true,
    streak: 12,
    source: "Doctor",
  },
  {
    id: 4,
    type: "diet",
    icon: Salad,
    color: "#00D4B4",
    label: "Reduce Saturated Fat",
    detail: "Avoid red meat, fried foods",
    urgency: "medium",
    completed: false,
    streak: 0,
    source: "AI",
  },
  {
    id: 5,
    type: "medication",
    icon: Pill,
    color: "#3B82F6",
    label: "Omega-3 — 1000 mg",
    detail: "Twice daily, with meals",
    urgency: "medium",
    completed: false,
    streak: 0,
    source: "Doctor",
  },
];

const urgencyConfig = {
  urgent: { color: "#EF4444", bg: "rgba(239,68,68,0.12)", label: "URGENT" },
  high: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)", label: "HIGH" },
  medium: { color: "#10B981", bg: "rgba(16,185,129,0.12)", label: "MEDIUM" },
};

function ProjectionCard({ proj }: { proj: typeof projections[0] }) {
  const improving = proj.target > proj.current;
  return (
    <div className="rounded-2xl p-4" style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-between mb-1">
        <p className="text-[13px] font-bold text-white">{proj.label}</p>
        <span className="text-[10px] text-white/40">{proj.weeks}-week plan</span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-center">
          <p className="text-[18px] font-black text-[#EF4444]">{proj.current}</p>
          <p className="text-[9px] text-white/40">{proj.unit} now</p>
        </div>
        <TrendingUp size={16} style={{ color: proj.color }} />
        <div className="text-center">
          <p className="text-[18px] font-black text-[#10B981]">{proj.target}</p>
          <p className="text-[9px] text-white/40">{proj.unit} target</p>
        </div>
      </div>
      <div className="h-[80px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={proj.data} margin={{ top: 5, right: 5, left: -36, bottom: 0 }}>
            <defs>
              <linearGradient id={`pgGrad-${proj.label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={proj.color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={proj.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#1A1D25", border: `1px solid ${proj.color}40`, borderRadius: 8, fontSize: 10 }}
              labelStyle={{ color: "rgba(255,255,255,0.5)" }}
              itemStyle={{ color: proj.color }}
            />
            <ReferenceLine y={proj.refLine} stroke={`${proj.color}60`} strokeDasharray="4 4"
              label={{ value: "Normal", position: "right", fontSize: 8, fill: `${proj.color}80` }} />
            <Area type="monotone" dataKey="value" stroke={proj.color} strokeWidth={2}
              fill={`url(#pgGrad-${proj.label})`} strokeDasharray="5 3"
              dot={{ fill: proj.color, r: 3, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[10px] text-white/30 mt-1 text-center">
        Projected forecast — based on adherence
      </p>
    </div>
  );
}

export default function RecommendationsPage() {
  const router = useRouter();
  const [taskList, setTaskList] = useState(tasks);

  const completedCount = taskList.filter((t) => t.completed).length;

  const toggleTask = (id: number) => {
    setTaskList((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

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
          <h1 className="text-[20px] font-bold text-white">Recommendations</h1>
          <p className="text-[12px] text-white/40">Personalised action plan</p>
        </div>
        <div className="text-right">
          <p className="text-[20px] font-black text-[#10B981]">{completedCount}/{taskList.length}</p>
          <p className="text-[9px] text-white/40">done today</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-5 mb-5">
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${(completedCount / taskList.length) * 100}%`,
              background: "linear-gradient(90deg, #00D4B4, #10B981)",
              boxShadow: "0 0 8px rgba(0,212,180,0.5)",
            }}
          />
        </div>
        <p className="text-[10px] text-white/30 mt-1.5">
          {Math.round((completedCount / taskList.length) * 100)}% complete — keep going!
        </p>
      </div>

      {/* Primary consult card */}
      <div className="mx-5 mb-5 rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1E1528, #1A1D25)", border: "1px solid rgba(124,58,237,0.4)" }}>
        <div className="absolute inset-0 opacity-15"
          style={{ background: "radial-gradient(circle at 90% 50%, #7C3AED, transparent 60%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(124,58,237,0.1))", border: "1px solid rgba(124,58,237,0.4)" }}>
            <UserCircle size={24} color="#7C3AED" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-bold text-white">Consult Doctor</p>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444]">URGENT</span>
            </div>
            <p className="text-[12px] text-white/60 mt-0.5">Dr. Priya Menon · Endocrinologist</p>
            <p className="text-[11px] text-[#7C3AED] font-semibold mt-1">Reason: TSH 7.8 + Thyroid cascade</p>
          </div>
          <ChevronRight size={16} className="text-white/30" />
        </div>
        <div className="relative mt-3 flex items-center gap-3">
          <button className="flex-1 py-2.5 rounded-xl text-[12px] font-bold text-white"
            style={{ background: "#7C3AED", boxShadow: "0 4px 15px rgba(124,58,237,0.4)" }}>
            Book Appointment
          </button>
          <button className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}>
            View Reason
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="px-5 mb-5">
        <h2 className="text-[15px] font-bold text-white mb-3">Action Plan</h2>
        <div className="space-y-2.5">
          {taskList.map((task) => {
            const uc = urgencyConfig[task.urgency as keyof typeof urgencyConfig];
            const Icon = task.icon;
            return (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="w-full text-left rounded-2xl p-3.5 flex items-center gap-3 transition-all"
                style={{
                  background: task.completed ? "rgba(16,185,129,0.06)" : "#1A1D25",
                  border: `1px solid ${task.completed ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${task.color}15`, border: `1px solid ${task.color}25` }}>
                  <Icon size={16} style={{ color: task.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-[13px] font-semibold ${task.completed ? "text-white/40 line-through" : "text-white"}`}>
                      {task.label}
                    </p>
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: uc.bg, color: uc.color }}>
                      {uc.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-[10px] text-white/40">{task.detail}</p>
                    {task.streak > 0 && (
                      <span className="text-[10px] text-[#F59E0B]">🔥 {task.streak}d</span>
                    )}
                  </div>
                  <span className="text-[9px] text-white/25">{task.source === "Doctor" ? "👨‍⚕️ Doctor" : "🤖 AI"}</span>
                </div>
                <div>
                  {task.completed
                    ? <CheckCircle2 size={20} className="text-[#10B981]" />
                    : <Circle size={20} className="text-white/20" />
                  }
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projection graphs */}
      <div className="px-5 mb-5">
        <h2 className="text-[15px] font-bold text-white mb-3">Expected Improvement</h2>
        <div className="space-y-3">
          {projections.map((proj) => (
            <ProjectionCard key={proj.label} proj={proj} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
