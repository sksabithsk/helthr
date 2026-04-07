"use client";
import { ArrowUpRight } from "lucide-react";
import StatusBar from "../components/StatusBar";
import BackHeader from "../components/BackHeader";
import BottomNav from "../components/BottomNav";
import ScoreRing from "../components/ScoreRing";
import SectionLabel from "../components/SectionLabel";
import MiniChart from "../components/MiniChart";
import ProgressBar from "../components/ProgressBar";

const trendData = [
  { label: "Oct", value: 58 }, { label: "Nov", value: 61 }, { label: "Dec", value: 64 },
  { label: "Jan", value: 68 }, { label: "Feb", value: 70 }, { label: "Mar", value: 72 },
];

const contributors = [
  { name: "Lipid Panel", contribution: +8, status: "borderline" as const, color: "#F59E0B" },
  { name: "CBC", contribution: +18, status: "normal" as const, color: "#4D8B3B" },
  { name: "Thyroid (TSH)", contribution: -12, status: "critical" as const, color: "#EF4444" },
  { name: "Vitamin D", contribution: -9, status: "critical" as const, color: "#EF4444" },
  { name: "HbA1c", contribution: +5, status: "borderline" as const, color: "#F59E0B" },
  { name: "Renal Function", contribution: +14, status: "normal" as const, color: "#4D8B3B" },
];

const tracking = [
  { label: "Medicine adherence", pct: 80, color: "#9A7EC0" },
  { label: "Water intake", pct: 65, color: "#5A8AC0" },
  { label: "Sleep quality", pct: 55, color: "#9A7EC0" },
  { label: "Mood logging", pct: 90, color: "#C07A7A" },
];

const tips = [
  { text: "Take thyroid medication consistently at the same time", impact: "+8 pts", color: "#D4A847" },
  { text: "Start Vitamin D 2000 IU daily for 8 weeks", impact: "+6 pts", color: "#D4A847" },
  { text: "Reduce saturated fat intake to improve lipid panel", impact: "+5 pts", color: "#D4A847" },
];

export default function ScorePage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Helthr Score" subtitle="Arjun Sharma" />

      {/* Large score ring */}
      <div className="flex flex-col items-center py-6"
        style={{ background: "linear-gradient(to bottom, #0A0908, #000)" }}>
        <ScoreRing score={72} size={120} strokeWidth={7} />
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-[4px]"
            style={{ background: "rgba(77,139,59,0.08)", border: "0.5px solid rgba(77,139,59,0.2)" }}>
            <ArrowUpRight size={10} color="#4D8B3B" strokeWidth={2} />
            <span className="mono text-[11px] font-700 text-[#4D8B3B]">+6 this month</span>
          </div>
        </div>
        <div className="flex gap-6 mt-4">
          {[{ label: "CLINICAL", value: "58" }, { label: "ENGAGEMENT", value: "86" }].map((b) => (
            <div key={b.label} className="text-center">
              <p className="mono text-[22px] font-700 text-white">{b.value}</p>
              <p className="section-label mt-0.5">{b.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Score trend */}
      <div className="px-[22px] mt-5 mb-5">
        <SectionLabel>SCORE TREND — 6 MONTHS</SectionLabel>
        <div className="card">
          <MiniChart data={trendData} color="#D4A847" height={110} />
        </div>
      </div>

      {/* Contributors */}
      <div className="px-[22px] mb-5">
        <SectionLabel>SCORE CONTRIBUTORS</SectionLabel>
        <div className="card py-0 px-[18px]">
          {contributors.map((c, i) => (
            <div key={c.name}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: i < contributors.length - 1 ? "0.5px solid #111" : "none" }}>
              <span className="text-[12px] font-500 text-[#888]">{c.name}</span>
              <div className="flex items-center gap-1.5">
                {c.contribution >= 0
                  ? <ArrowUpRight size={10} color="#4D8B3B" strokeWidth={2}/>
                  : <ArrowUpRight size={10} color="#EF4444" strokeWidth={2} style={{ transform: "rotate(90deg)" }}/>
                }
                <span className="mono text-[12px] font-700" style={{ color: c.color }}>
                  {c.contribution >= 0 ? "+" : ""}{c.contribution}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily tracking breakdown */}
      <div className="px-[22px] mb-5">
        <SectionLabel>DAILY TRACKING</SectionLabel>
        <div className="card space-y-4">
          {tracking.map((t) => (
            <ProgressBar key={t.label} label={t.label} value={t.pct} color={t.color} />
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="px-[22px] mb-5">
        <SectionLabel>TIPS TO IMPROVE</SectionLabel>
        <div className="space-y-2">
          {tips.map((tip, i) => (
            <div key={i} className="alert-card flex items-start gap-3"
              style={{ borderLeft: "2px solid #D4A847" }}>
              <p className="text-[12px] text-[#888] flex-1 leading-relaxed">{tip.text}</p>
              <span className="mono text-[11px] font-700 text-[#D4A847] flex-shrink-0">{tip.impact}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
