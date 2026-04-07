"use client";
import { useState } from "react";
import Link from "next/link";
import { Bell, Settings, ChevronRight, Plus, Droplets, Moon, Smile, ArrowUpRight, ArrowDownRight } from "lucide-react";
import StatusBar from "./components/StatusBar";
import BottomNav from "./components/BottomNav";
import ScoreRing from "./components/ScoreRing";
import ProgressBar from "./components/ProgressBar";
import SectionLabel from "./components/SectionLabel";
import AlertCard from "./components/AlertCard";
import MarkerRow from "./components/MarkerRow";

/* ─── Data ─── */
const members = [
  {
    id: "arjun",
    name: "Arjun Sharma",
    age: 38,
    gender: "M",
    blood: "B+",
    score: 72,
    scoreDelta: +6,
    color: "#D4A847",
    bloodwork: { done: 44, total: 60 },
    tracking: { done: 28, total: 40 },
    markers: 14,
    streak: 5,
    lastCheckup: "Mar 15",
  },
  {
    id: "priya",
    name: "Priya Sharma",
    age: 35,
    gender: "F",
    blood: "O+",
    score: 84,
    scoreDelta: +2,
    color: "#9A7EC0",
    bloodwork: { done: 51, total: 60 },
    tracking: { done: 35, total: 40 },
    markers: 9,
    streak: 12,
    lastCheckup: "Apr 1",
  },
  {
    id: "add",
    name: "",
    age: 0,
    gender: "",
    blood: "",
    score: 0,
    scoreDelta: 0,
    color: "#333",
    bloodwork: { done: 0, total: 60 },
    tracking: { done: 0, total: 40 },
    markers: 0,
    streak: 0,
    lastCheckup: "",
  },
];

const keyMarkers = [
  { name: "Triglycerides", value: "178", unit: "mg/dL", status: "borderline" as const, markerPct: 72 },
  { name: "TSH", value: "7.8", unit: "mIU/L", status: "critical" as const, markerPct: 88 },
  { name: "Vitamin D", value: "18.4", unit: "ng/mL", status: "critical" as const, markerPct: 22 },
];

const alerts = [
  { title: "TSH critically elevated — 7.8 mIU/L", subtitle: "Endocrinologist consult recommended", color: "#EF4444", href: "/reports/thyroid" },
  { title: "Vitamin D deficiency", subtitle: "18.4 ng/mL — start supplementation", color: "#F59E0B", href: "/reports/vitamins" },
  { title: "Lipid profile review due", subtitle: "Last tested 6 months ago", color: "#5A8AC0", href: "/reports" },
];

const medicines = [
  { name: "Levothyroxine", dose: "50 mcg", time: "07:00", taken: false, color: "#9A7EC0" },
  { name: "Vitamin D3", dose: "2000 IU", time: "08:30", taken: true, color: "#D4A847" },
  { name: "Omega-3", dose: "1000 mg", time: "13:00", taken: false, color: "#5A8AC0" },
];

/* ─── Member Card ─── */
function MemberCard({ m, isActive }: { m: typeof members[0]; isActive: boolean }) {
  if (m.id === "add") {
    return (
      <Link href="/family/add">
        <div
          className="flex-shrink-0 rounded-[22px] flex flex-col items-center justify-center gap-2"
          style={{
            width: 331, height: 420,
            background: "transparent",
            border: "0.5px dashed #2A2520",
            opacity: 0.4,
          }}
        >
          <div className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center">
            <Plus size={18} color="#555" strokeWidth={1.5} />
          </div>
          <span className="text-[12px] text-[#444] font-500">Add member</span>
        </div>
      </Link>
    );
  }

  const deltaPositive = m.scoreDelta >= 0;
  return (
    <div
      className="flex-shrink-0 rounded-[22px] p-[18px] flex flex-col gap-4"
      style={{
        width: 331,
        background: "#0A0908",
        border: `0.5px solid ${isActive ? m.color + "40" : "#1A1710"}`,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[18px] font-700"
            style={{ background: m.color + "15", border: `1.5px solid ${m.color}40`, color: m.color }}
          >
            {m.name.charAt(0)}
          </div>
          <div>
            <p className="text-[16px] font-700 text-white leading-tight">{m.name}</p>
            <p className="text-[11px] text-[#444] mt-0.5">
              {m.age}y · {m.gender} · <span className="mono">{m.blood}</span>
            </p>
          </div>
        </div>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-[4px]"
          style={{
            background: deltaPositive ? "rgba(77,139,59,0.08)" : "rgba(239,68,68,0.08)",
            border: `0.5px solid ${deltaPositive ? "rgba(77,139,59,0.2)" : "rgba(239,68,68,0.2)"}`,
          }}
        >
          {deltaPositive
            ? <ArrowUpRight size={10} color="#4D8B3B" strokeWidth={2} />
            : <ArrowDownRight size={10} color="#EF4444" strokeWidth={2} />}
          <span className="mono text-[10px] font-700"
            style={{ color: deltaPositive ? "#4D8B3B" : "#EF4444" }}>
            {deltaPositive ? "+" : ""}{m.scoreDelta}
          </span>
        </div>
      </div>

      {/* Score ring + stats */}
      <div className="flex items-center justify-between">
        <Link href="/score">
          <ScoreRing score={m.score} size={80} />
        </Link>
        <div className="flex-1 ml-5 space-y-2.5">
          <ProgressBar label="Blood Work" value={m.bloodwork.done} total={m.bloodwork.total} color={m.color} />
          <ProgressBar label="Daily Tracking" value={m.tracking.done} total={m.tracking.total} color={m.color} />
        </div>
      </div>

      {/* Stat pills */}
      <div className="flex gap-2">
        {[
          { label: "MARKERS", value: String(m.markers) },
          { label: "STREAK", value: `${m.streak}d` },
          { label: "CHECKUP", value: m.lastCheckup },
        ].map((s) => (
          <div key={s.label} className="pill flex-1 justify-center flex-col gap-0">
            <span className="mono text-[10px] font-700 text-[#888]">{s.value}</span>
            <span className="section-label mt-0.5" style={{ fontSize: 8 }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Home Page ─── */
export default function HomePage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [medTaken, setMedTaken] = useState<Record<string, boolean>>(
    Object.fromEntries(medicines.map((m) => [m.name, m.taken]))
  );

  const takenCount = Object.values(medTaken).filter(Boolean).length;
  const streak = 5;

  return (
    <div className="pb-24">
      <StatusBar />

      {/* Header */}
      <div className="flex items-start justify-between px-[22px] pt-2 pb-4">
        <div>
          <p className="section-label" style={{ letterSpacing: "2px" }}>GOOD MORNING</p>
          <h1 className="text-[26px] font-700 text-white mt-1 leading-tight" style={{ letterSpacing: "-0.5px" }}>
            {members[activeIdx]?.name.split(" ")[0] ?? ""}
          </h1>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Link href="/notifications">
            <div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center relative"
              style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
              <Bell size={15} color="#555" strokeWidth={1.5} />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
            </div>
          </Link>
          <Link href="/settings">
            <div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center"
              style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
              <Settings size={15} color="#555" strokeWidth={1.5} />
            </div>
          </Link>
        </div>
      </div>

      {/* Profile carousel */}
      <div className="overflow-x-auto pl-[22px] pb-2 flex gap-[10px] no-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
        onScroll={(e) => {
          const x = (e.target as HTMLElement).scrollLeft;
          setActiveIdx(Math.round(x / 341));
        }}>
        {members.map((m, i) => (
          <div key={m.id} style={{ scrollSnapAlign: "start", opacity: i === activeIdx ? 1 : 0.45, transition: "opacity 0.3s" }}>
            <MemberCard m={m} isActive={i === activeIdx} />
          </div>
        ))}
        <div className="flex-shrink-0 w-[22px]" />
      </div>

      {/* Swipe dots */}
      <div className="flex items-center justify-center gap-[4px] mt-3 mb-5">
        {members.map((_, i) => (
          <div key={i} className={i === activeIdx ? "dot-active" : "dot-inactive"} />
        ))}
      </div>

      {/* Key markers */}
      <div className="px-[22px] mb-5">
        <SectionLabel action={<Link href="/reports"><span className="text-[10px] text-[#D4A847]">See all →</span></Link>}>
          KEY MARKERS
        </SectionLabel>
        <div className="card py-0 px-[18px]">
          {keyMarkers.map((m, i) => (
            <Link key={m.name} href={`/reports/marker/${m.name.toLowerCase().replace(/\s/g, "-")}`}>
              <div style={i < keyMarkers.length - 1 ? {} : { borderBottom: "none" }}>
                <MarkerRow {...m} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="px-[22px] mb-5">
        <SectionLabel>ALERTS</SectionLabel>
        {alerts.map((a) => (
          <AlertCard key={a.title} {...a} />
        ))}
      </div>

      {/* Medicines */}
      <div className="px-[22px] mb-5">
        <SectionLabel action={
          <div className="flex items-center gap-3">
            <span className="mono text-[11px] text-[#D4A847]">{streak}d 🔥</span>
            <Link href="/medicines"><span className="text-[10px] text-[#D4A847]">See all →</span></Link>
          </div>
        }>
          TODAY&apos;S MEDICINES
        </SectionLabel>
        <div>
          {medicines.map((med, i) => {
            const taken = medTaken[med.name];
            const pos = i === 0 ? "med-row-first" : i === medicines.length - 1 ? "med-row-last" : "med-row-middle";
            return (
              <button key={med.name}
                className={`w-full flex items-center justify-between px-4 py-3 ${pos}`}
                style={{
                  background: "#0A0908",
                  border: "0.5px solid #1A1710",
                  borderTop: i > 0 ? "none" : "0.5px solid #1A1710",
                }}
                onClick={() => setMedTaken((p) => ({ ...p, [med.name]: !p[med.name] }))}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      border: taken ? "none" : `1.5px solid #333`,
                      background: taken ? "#D4A847" : "transparent",
                    }}>
                    {taken && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className={`text-[13px] font-600 ${taken ? "line-through text-[#333]" : "text-white"}`}>
                    {med.name}
                  </span>
                  <span className="text-[11px] text-[#444]">{med.dose}</span>
                </div>
                <span className="mono text-[11px]" style={{ color: taken ? "#333" : "#D4A847" }}>
                  {med.time}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily log */}
      <div className="px-[22px] mb-5">
        <SectionLabel>DAILY LOG</SectionLabel>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "WATER", value: "6", unit: "glasses", color: "#5A8AC0", icon: <Droplets size={14} strokeWidth={1.5}/>, href: "/tracking/water" },
            { label: "SLEEP", value: "6.5", unit: "hours", color: "#9A7EC0", icon: <Moon size={14} strokeWidth={1.5}/>, href: "/tracking/sleep" },
            { label: "MOOD", value: "Good", unit: "", color: "#C07A7A", icon: <Smile size={14} strokeWidth={1.5}/>, href: "/tracking/mood" },
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <div className="card p-4 flex flex-col gap-2">
                <div style={{ color: item.color }}>{item.icon}</div>
                <div>
                  <p className="mono text-[18px] font-700 text-white leading-none">
                    {item.value}<span className="text-[11px] font-400 text-[#444] ml-0.5">{item.unit}</span>
                  </p>
                  <p className="section-label mt-1" style={{ fontSize: 9 }}>{item.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <div className="px-[22px] mb-5">
        <SectionLabel>AI INSIGHT</SectionLabel>
        <Link href="/ai">
          <div className="card" style={{ borderLeft: "2px solid #D4A847" }}>
            <p className="text-[9px] font-700 tracking-[1.5px] uppercase text-[#D4A847] mb-2">AI INSIGHT</p>
            <p className="text-[12px] text-[#888] leading-relaxed">
              Your <span className="text-white font-600">TSH of 7.8</span> is causing cascade effects on lipid metabolism.
              Treating hypothyroidism could normalize your <span className="text-white font-600">cholesterol</span> without
              statins. Expected normalization by{" "}
              <span className="mono text-[#D4A847]">Jul 2025</span> with treatment.
            </p>
            <p className="text-[10px] text-[#D4A847] mt-3">See all insights →</p>
          </div>
        </Link>
      </div>

      {/* Recent activity */}
      <div className="px-[22px] mb-5">
        <SectionLabel action={<Link href="/timeline"><span className="text-[10px] text-[#D4A847]">View timeline →</span></Link>}>
          RECENT ACTIVITY
        </SectionLabel>
        {[
          { dot: "#D4A847", text: "CBC report uploaded and parsed", date: "Apr 5" },
          { dot: "#5A8AC0", text: "Dr. Priya Menon visit logged", date: "Apr 3" },
          { dot: "#9A7EC0", text: "Levothyroxine added — 50 mcg", date: "Apr 2" },
          { dot: "#4D8B3B", text: "Helthr score improved +6 pts", date: "Mar 30" },
        ].map((ev) => (
          <div key={ev.text} className="flex items-center gap-3 py-2" style={{ borderBottom: "0.5px solid #111" }}>
            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ev.dot }} />
            <span className="text-[12px] text-[#888] flex-1">{ev.text}</span>
            <span className="mono text-[10px] text-[#333]">{ev.date}</span>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="px-[22px] mb-5">
        <SectionLabel>QUICK ACTIONS</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Upload Report", sub: "Scan or import PDF", color: "#D4A847", href: "/reports/upload", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A847" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
            { label: "Log Visit", sub: "Doctor appointment", color: "#5A8AC0", href: "/visits/log", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A8AC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
            { label: "Add Medicine", sub: "Prescription / OTC", color: "#9A7EC0", href: "/medicines/add", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A7EC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
            { label: "Share Records", sub: "WhatsApp / link", color: "#C07A7A", href: "/share", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C07A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
          ].map((a) => (
            <Link key={a.label} href={a.href}>
              <div className="card flex items-start gap-3 py-3.5 px-4">
                <div className="mt-0.5">{a.icon}</div>
                <div>
                  <p className="text-[12px] font-600 text-[#CCC]">{a.label}</p>
                  <p className="text-[9px] text-[#333] mt-0.5">{a.sub}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
