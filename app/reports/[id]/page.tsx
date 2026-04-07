"use client";
import { useParams } from "next/navigation";
import { Upload, ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from "next/link";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";
import ProgressBar from "../../components/ProgressBar";

const reportData: Record<string, {
  name: string; date: string; lab: string; doctor: string;
  sections: Array<{
    title: string;
    params: Array<{ name: string; value: string; unit: string; ref: string; status: "normal"|"borderline"|"critical"; trend: "up"|"down"|"stable"; markerPct: number }>;
  }>;
}> = {
  "thyroid-apr-2025": {
    name: "Thyroid Panel",
    date: "Apr 5, 2025",
    lab: "Dr. Lal PathLabs",
    doctor: "Dr. Priya Menon",
    sections: [
      {
        title: "THYROID FUNCTION",
        params: [
          { name: "TSH", value: "7.8", unit: "mIU/L", ref: "0.4 – 4.0", status: "critical", trend: "up", markerPct: 88 },
          { name: "Free T3", value: "2.9", unit: "pg/mL", ref: "2.3 – 4.2", status: "borderline", trend: "down", markerPct: 45 },
          { name: "Free T4", value: "0.74", unit: "ng/dL", ref: "0.8 – 1.8", status: "borderline", trend: "down", markerPct: 32 },
          { name: "Anti-TPO", value: "12", unit: "IU/mL", ref: "< 34", status: "normal", trend: "stable", markerPct: 55 },
        ],
      },
    ],
  },
  "lipid-mar-2025": {
    name: "Lipid Profile",
    date: "Mar 28, 2025",
    lab: "Thyrocare",
    doctor: "Dr. Arun Kumar",
    sections: [
      {
        title: "LIPID PANEL",
        params: [
          { name: "Total Cholesterol", value: "214", unit: "mg/dL", ref: "< 200", status: "borderline", trend: "up", markerPct: 70 },
          { name: "LDL", value: "142", unit: "mg/dL", ref: "< 100", status: "borderline", trend: "up", markerPct: 75 },
          { name: "HDL", value: "52", unit: "mg/dL", ref: "> 40", status: "normal", trend: "stable", markerPct: 55 },
          { name: "Triglycerides", value: "178", unit: "mg/dL", ref: "< 150", status: "borderline", trend: "up", markerPct: 72 },
          { name: "VLDL", value: "36", unit: "mg/dL", ref: "< 40", status: "normal", trend: "stable", markerPct: 60 },
        ],
      },
    ],
  },
};

const STATUS_COLOR = { normal: "#4D8B3B", borderline: "#F59E0B", critical: "#EF4444" };
const TrendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const r = reportData[id] ?? reportData["lipid-mar-2025"];

  const allParams = r.sections.flatMap((s) => s.params);
  const outRange = allParams.filter((p) => p.status !== "normal").length;

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title={r.name} subtitle={`${r.lab} · ${r.date}`}
        action={
          <button className="w-8 h-8 rounded-[8px] flex items-center justify-center"
            style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
            <Upload size={14} color="#555" strokeWidth={1.5} />
          </button>
        }
      />

      {/* Report meta */}
      <div className="mx-[22px] mb-5 card">
        <div className="grid grid-cols-2 gap-y-3">
          {[
            { label: "LAB", value: r.lab },
            { label: "DATE", value: r.date },
            { label: "DOCTOR", value: r.doctor },
            { label: "STATUS", value: outRange > 0 ? `${outRange} out of range` : "All normal" },
          ].map((item) => (
            <div key={item.label}>
              <p className="section-label" style={{ fontSize: 8 }}>{item.label}</p>
              <p className="text-[12px] font-600 text-white mt-0.5"
                style={{ color: item.label === "STATUS" && outRange > 0 ? "#EF4444" : "white" }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      {r.sections.map((section) => (
        <div key={section.title} className="px-[22px] mb-5">
          <SectionLabel>{section.title}</SectionLabel>
          <div className="card py-0 px-[18px]">
            {section.params.map((p, i) => {
              const color = STATUS_COLOR[p.status];
              const Trend = TrendIcon[p.trend];
              const trendColor = p.trend === "up" && p.status !== "normal" ? "#EF4444"
                : p.trend === "down" && p.status !== "normal" ? "#EF4444" : "#4D8B3B";
              return (
                <Link key={p.name} href={`/reports/marker/${p.name.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="py-3.5 space-y-2"
                    style={{ borderBottom: i < section.params.length - 1 ? "0.5px solid #111" : "none" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-600 text-white">{p.name}</span>
                        <Trend size={11} strokeWidth={2} style={{ color: trendColor }} />
                      </div>
                      <div className="text-right">
                        <span className="mono text-[14px] font-700" style={{ color }}>{p.value}</span>
                        <span className="text-[10px] text-[#444] ml-1">{p.unit}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={p.markerPct} multicolor showMarker color={color} className="flex-1" />
                      <span className="text-[9px] text-[#444] flex-shrink-0">Ref: {p.ref}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <BottomNav />
    </div>
  );
}
