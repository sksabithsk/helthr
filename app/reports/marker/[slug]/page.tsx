"use client";
import { useParams } from "next/navigation";
import StatusBar from "../../../components/StatusBar";
import BackHeader from "../../../components/BackHeader";
import BottomNav from "../../../components/BottomNav";
import SectionLabel from "../../../components/SectionLabel";
import MiniChart from "../../../components/MiniChart";

const markerData: Record<string, {
  name: string; value: string; unit: string; ref: string; status: "normal"|"borderline"|"critical";
  history: Array<{ label: string; value: number }>;
  prescriptions: string[];
  aiNote: string;
  projDate: string;
}> = {
  "tsh": {
    name: "TSH", value: "7.8", unit: "mIU/L", ref: "0.4 – 4.0", status: "critical",
    history: [
      { label: "Aug '24", value: 3.2 }, { label: "Sep '24", value: 4.1 },
      { label: "Oct '24", value: 5.6 }, { label: "Dec '24", value: 6.3 },
      { label: "Jan '25", value: 7.1 }, { label: "Mar '25", value: 7.4 },
      { label: "Apr '25", value: 7.8 },
    ],
    prescriptions: ["Levothyroxine 50 mcg (Apr 2025 — ongoing)"],
    aiNote: "TSH has risen steadily over 8 months. With consistent Levothyroxine therapy, normalization is projected by July 2025. This elevation is also suppressing Free T4 production.",
    projDate: "Jul 2025",
  },
  "triglycerides": {
    name: "Triglycerides", value: "178", unit: "mg/dL", ref: "< 150", status: "borderline",
    history: [
      { label: "Jun '24", value: 138 }, { label: "Sep '24", value: 145 },
      { label: "Dec '24", value: 158 }, { label: "Jan '25", value: 165 },
      { label: "Mar '25", value: 172 }, { label: "Apr '25", value: 178 },
    ],
    prescriptions: ["Omega-3 1000 mg twice daily (Feb 2025 — ongoing)"],
    aiNote: "Triglycerides are trending upward despite Omega-3 supplementation. Treating hypothyroidism (TSH) may also normalize lipid metabolism.",
    projDate: "Aug 2025",
  },
  "vitamin-d": {
    name: "Vitamin D", value: "18.4", unit: "ng/mL", ref: "30 – 100", status: "critical",
    history: [
      { label: "Jun '24", value: 28 }, { label: "Sep '24", value: 25 },
      { label: "Dec '24", value: 22 }, { label: "Jan '25", value: 20 },
      { label: "Mar '25", value: 19 }, { label: "Apr '25", value: 18.4 },
    ],
    prescriptions: ["Vitamin D3 2000 IU (Feb 2025 — ongoing)"],
    aiNote: "Level continues declining despite 2000 IU supplementation. Increasing to 4000 IU and adding sunlight exposure could normalize within 10 weeks.",
    projDate: "Jun 2025",
  },
};

const STATUS_COLOR = { normal: "#4D8B3B", borderline: "#F59E0B", critical: "#EF4444" };

export default function MarkerTrendPage() {
  const { slug } = useParams<{ slug: string }>();
  const m = markerData[slug] ?? markerData["tsh"];
  const color = STATUS_COLOR[m.status];

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title={m.name} subtitle={`${m.value} ${m.unit} · Ref: ${m.ref}`} />

      {/* Current value hero */}
      <div className="px-[22px] mb-5">
        <div className="card" style={{ borderLeft: `2px solid ${color}` }}>
          <div className="flex items-end justify-between">
            <div>
              <p className="section-label mb-1">CURRENT VALUE</p>
              <div className="flex items-baseline gap-1.5">
                <span className="mono text-[38px] font-700 leading-none" style={{ color }}>{m.value}</span>
                <span className="text-[14px] text-[#444]">{m.unit}</span>
              </div>
              <p className="text-[11px] text-[#444] mt-1">Ref range: {m.ref}</p>
            </div>
            <div className="text-right">
              <span className="pill font-700 uppercase" style={{ color, borderColor: `${color}30` }}>{m.status}</span>
              <p className="mono text-[11px] text-[#444] mt-2">
                Normalize by <span style={{ color: "#D4A847" }}>{m.projDate}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trend chart */}
      <div className="px-[22px] mb-5">
        <SectionLabel>HISTORICAL TREND</SectionLabel>
        <div className="card">
          <MiniChart data={m.history} color={color} height={130} refLine={
            m.status === "critical" ? undefined : undefined
          } />
          <p className="text-[10px] text-[#333] mt-2 text-center">
            {m.history.length} readings · {m.history[0].label} to {m.history[m.history.length-1].label}
          </p>
        </div>
      </div>

      {/* AI projection */}
      <div className="px-[22px] mb-5">
        <SectionLabel>AI PROJECTION</SectionLabel>
        <div className="alert-card" style={{ borderLeft: "2px solid #D4A847" }}>
          <p className="text-[9px] font-700 tracking-[1.5px] uppercase text-[#D4A847] mb-2">AI INSIGHT</p>
          <p className="text-[12px] text-[#888] leading-relaxed">{m.aiNote}</p>
          <p className="mono text-[11px] text-[#D4A847] mt-2">Projected normal: {m.projDate}</p>
        </div>
      </div>

      {/* Related prescriptions */}
      <div className="px-[22px] mb-5">
        <SectionLabel>LINKED MEDICATIONS</SectionLabel>
        {m.prescriptions.map((p) => (
          <div key={p} className="card flex items-center gap-3 py-3 px-4">
            <div className="w-2 h-2 rounded-full bg-[#9A7EC0] flex-shrink-0" />
            <p className="text-[12px] text-[#888] flex-1">{p}</p>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
