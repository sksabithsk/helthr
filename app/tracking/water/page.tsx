"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";

const weeklyData = [
  { day: "Mon", glasses: 7 }, { day: "Tue", glasses: 5 }, { day: "Wed", glasses: 8 },
  { day: "Thu", glasses: 6 }, { day: "Fri", glasses: 7 }, { day: "Sat", glasses: 4 }, { day: "Sun", glasses: 6 },
];
const todayLog = [
  { time: "07:12", glasses: 2 }, { time: "09:45", glasses: 1 }, { time: "12:30", glasses: 1 },
  { time: "14:55", glasses: 1 }, { time: "17:20", glasses: 1 },
];
const GOAL = 8;

export default function WaterPage() {
  const [current, setCurrent] = useState(6);
  const pct = Math.min((current / GOAL) * 100, 100);
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Water Intake" subtitle="Daily hydration tracker" />

      {/* Ring */}
      <div className="flex flex-col items-center py-6">
        <div className="relative">
          <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="80" cy="80" r={r} fill="none" stroke="#111" strokeWidth="7" />
            <circle cx="80" cy="80" r={r} fill="none" stroke="#5A8AC0" strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.6s ease-out", filter: "drop-shadow(0 0 8px rgba(90,138,192,0.5))" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl">💧</span>
            <p className="mono text-[28px] font-700 text-white mt-1">{current}</p>
            <p className="text-[10px] text-[#444]">of {GOAL} glasses</p>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-5">
          <button onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
            <Minus size={18} color="#888" strokeWidth={1.5} />
          </button>
          <button onClick={() => setCurrent((c) => Math.min(GOAL + 4, c + 1))}
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "#5A8AC0", boxShadow: "0 4px 15px rgba(90,138,192,0.3)" }}>
            <Plus size={22} color="white" strokeWidth={2} />
          </button>
          <div className="w-12" />
        </div>
        <p className="text-[11px] text-[#555] mt-3">Tap + to add a glass</p>
      </div>

      {/* Today's log */}
      <div className="px-[22px] mb-5">
        <SectionLabel>TODAY&apos;S LOG</SectionLabel>
        <div className="card py-0 px-[18px]">
          {todayLog.map((l, i) => (
            <div key={i} className="flex items-center justify-between py-2.5"
              style={{ borderBottom: i < todayLog.length - 1 ? "0.5px solid #111" : "none" }}>
              <span className="mono text-[12px] text-[#888]">{l.time}</span>
              <div className="flex gap-1">
                {Array.from({ length: l.glasses }).map((_, j) => (
                  <span key={j}>💧</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly bar chart */}
      <div className="px-[22px] mb-5">
        <SectionLabel>THIS WEEK</SectionLabel>
        <div className="card">
          <div className="flex items-end justify-between gap-1 h-20">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-[3px]"
                  style={{
                    height: `${(d.glasses / GOAL) * 72}px`,
                    background: d.day === "Sun" ? "#5A8AC0" : "rgba(90,138,192,0.3)",
                  }} />
                <span className="text-[9px] text-[#444]">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
