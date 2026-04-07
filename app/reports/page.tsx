"use client";
import { useState } from "react";
import { ArrowLeft, Camera, Upload, FileText, CheckCircle2, AlertCircle, ChevronRight, Zap, X } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/app/components/BottomNav";
import StatusBar from "@/app/components/StatusBar";

type Stage = "upload" | "scanning" | "results";

const detectedParams = [
  { name: "Hemoglobin", value: "14.2", unit: "g/dL", status: "normal", confidence: 99 },
  { name: "WBC", value: "6800", unit: "cells/μL", status: "normal", confidence: 98 },
  { name: "Platelets", value: "218", unit: "× 10³/μL", status: "normal", confidence: 97 },
  { name: "ESR", value: "22", unit: "mm/hr", status: "borderline", confidence: 96 },
  { name: "MCV", value: "88", unit: "fL", status: "normal", confidence: 99 },
  { name: "MCH", value: "29.4", unit: "pg", status: "normal", confidence: 98 },
  { name: "MCHC", value: "33.2", unit: "g/dL", status: "normal", confidence: 97 },
];

const anomalies = [
  { text: "ESR slightly elevated (22 vs ref 0–20 mm/hr)", severity: "warning" },
];

const recentReports = [
  { name: "CBC Report", date: "Mar 15, 2025", category: "Hematology", params: 12, color: "#00D4B4" },
  { name: "Thyroid Panel", date: "Feb 28, 2025", category: "Hormones", params: 4, color: "#EF4444" },
  { name: "Lipid Profile", date: "Jan 10, 2025", category: "Biochemistry", params: 6, color: "#F59E0B" },
];

function ScanningAnimation() {
  return (
    <div className="flex flex-col items-center py-12">
      <div className="relative w-32 h-40 mb-6">
        {/* Document */}
        <div className="w-32 h-40 rounded-xl border-2 border-[#00D4B4]/30 bg-[#1A1D25] overflow-hidden relative">
          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-0.5 bg-[#00D4B4]"
            style={{
              boxShadow: "0 0 12px rgba(0,212,180,0.8)",
              animation: "scanLine 1.5s ease-in-out infinite",
            }}
          />
          {/* Fake text lines */}
          {[20, 35, 50, 65, 80, 95, 110, 125].map((y, i) => (
            <div key={i}
              className="absolute left-3 right-3 h-1.5 rounded-full"
              style={{
                top: y,
                background: i % 3 === 0 ? "rgba(0,212,180,0.4)" : "rgba(255,255,255,0.08)",
                width: i % 2 === 0 ? "80%" : "60%",
              }}
            />
          ))}
        </div>
        {/* Corner markers */}
        {[["top-0 left-0", "border-t-2 border-l-2"], ["top-0 right-0", "border-t-2 border-r-2"], ["bottom-0 left-0", "border-b-2 border-l-2"], ["bottom-0 right-0", "border-b-2 border-r-2"]].map(([pos, bdr], i) => (
          <div key={i} className={`absolute ${pos} w-4 h-4 ${bdr} border-[#00D4B4]`} />
        ))}
      </div>
      <p className="text-[14px] font-bold text-white">AI Scanning Report</p>
      <p className="text-[12px] text-white/40 mt-1">Extracting parameters...</p>
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#00D4B4]"
            style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
      <style>{`
        @keyframes scanLine {
          0% { top: 0; opacity: 1; }
          50% { top: 140px; opacity: 1; }
          100% { top: 0; opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const statusConfig = {
  normal: { color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  borderline: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  critical: { color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
};

export default function ReportsPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("upload");

  const handleUpload = () => {
    setStage("scanning");
    setTimeout(() => setStage("results"), 2500);
  };

  return (
    <div className="mobile-container overflow-x-hidden pb-28">
      <StatusBar />

      {/* Header */}
      <div className="px-5 pt-1 pb-4 flex items-center gap-3">
        <button
          onClick={() => stage !== "upload" ? setStage("upload") : router.back()}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-white/70" />
        </button>
        <div>
          <h1 className="text-[20px] font-bold text-white">
            {stage === "upload" ? "Upload Report" : stage === "scanning" ? "Scanning…" : "AI Assessment"}
          </h1>
          <p className="text-[12px] text-white/40">
            {stage === "results" ? "Detected 7 parameters" : "Scan or upload lab report"}
          </p>
        </div>
      </div>

      {stage === "upload" && (
        <>
          {/* Upload area */}
          <div className="mx-5 mb-5">
            <button
              onClick={handleUpload}
              className="w-full rounded-2xl p-8 flex flex-col items-center gap-4 transition-all active:scale-[0.98]"
              style={{ background: "rgba(0,212,180,0.05)", border: "2px dashed rgba(0,212,180,0.3)" }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(0,212,180,0.1)", border: "1px solid rgba(0,212,180,0.3)" }}>
                <Upload size={28} className="text-[#00D4B4]" />
              </div>
              <div className="text-center">
                <p className="text-[14px] font-bold text-white">Upload PDF or Image</p>
                <p className="text-[12px] text-white/40 mt-1">Tap to browse or drag & drop</p>
              </div>
            </button>
          </div>

          {/* Camera scan option */}
          <div className="mx-5 mb-6">
            <button
              onClick={handleUpload}
              className="w-full rounded-2xl p-4 flex items-center gap-4"
              style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>
                <Camera size={22} color="#7C3AED" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-bold text-white">Scan with Camera</p>
                <p className="text-[11px] text-white/40 mt-0.5">AI auto-crops & enhances</p>
              </div>
              <ChevronRight size={16} className="text-white/30" />
            </button>
          </div>

          {/* Supported labs */}
          <div className="px-5 mb-5">
            <p className="text-[11px] text-white/30 mb-2 uppercase tracking-wider">Supported Labs</p>
            <div className="flex gap-2 flex-wrap">
              {["Thyrocare", "SRL Diagnostics", "Metropolis", "Dr. Lal PathLabs", "AIIMS"].map((lab) => (
                <span key={lab} className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                  {lab}
                </span>
              ))}
            </div>
          </div>

          {/* Recent reports */}
          <div className="px-5">
            <h2 className="text-[15px] font-bold text-white mb-3">Recent Reports</h2>
            <div className="space-y-2.5">
              {recentReports.map((r) => (
                <div key={r.name}
                  className="rounded-xl p-3.5 flex items-center gap-3"
                  style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${r.color}15` }}>
                    <FileText size={18} style={{ color: r.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-white">{r.name}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{r.date} · {r.params} params</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${r.color}15`, color: r.color }}>
                    {r.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {stage === "scanning" && <ScanningAnimation />}

      {stage === "results" && (
        <>
          {/* Confidence score */}
          <div className="mx-5 mb-5 rounded-2xl p-4 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(0,212,180,0.1), rgba(16,185,129,0.05))", border: "1px solid rgba(0,212,180,0.25)" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-white/40 uppercase tracking-wider">AI Confidence Score</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[40px] font-black text-[#00D4B4] leading-none">94</span>
                  <span className="text-[18px] text-[#00D4B4]/60 font-light">%</span>
                </div>
                <p className="text-[11px] text-white/50 mt-1">CBC — Hematology Panel</p>
              </div>
              <div className="relative">
                <svg width="70" height="70" viewBox="0 0 70 70" className="-rotate-90">
                  <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <circle cx="35" cy="35" r="28" fill="none" stroke="#00D4B4" strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * 0.06}`}
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 6px rgba(0,212,180,0.7))" }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap size={18} className="text-[#00D4B4]" />
                </div>
              </div>
            </div>
          </div>

          {/* Anomalies */}
          {anomalies.map((a, i) => (
            <div key={i} className="mx-5 mb-3 rounded-xl px-3.5 py-3 flex items-center gap-2.5"
              style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}>
              <AlertCircle size={15} className="text-[#F59E0B] shrink-0" />
              <p className="text-[11px] text-[#F59E0B] font-medium">{a.text}</p>
            </div>
          ))}

          {/* Detected params */}
          <div className="px-5 mb-5">
            <h2 className="text-[14px] font-bold text-white mb-3">Detected Parameters</h2>
            <div className="space-y-2">
              {detectedParams.map((p) => {
                const sc = statusConfig[p.status as keyof typeof statusConfig];
                return (
                  <div key={p.name}
                    className="rounded-xl px-3.5 py-3 flex items-center gap-3"
                    style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                    <div className="flex-1">
                      <p className="text-[12px] font-semibold text-white">{p.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="h-1 w-full rounded-full bg-white/5">
                          <div className="h-full rounded-full" style={{ width: `${p.confidence}%`, background: sc.color }} />
                        </div>
                        <span className="text-[9px] text-white/30 shrink-0">{p.confidence}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-bold" style={{ color: sc.color }}>{p.value}</p>
                      <p className="text-[9px] text-white/30">{p.unit}</p>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: sc.bg, color: sc.color }}>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save button */}
          <div className="px-5">
            <button
              className="w-full py-4 rounded-2xl text-[15px] font-bold text-[#111318]"
              style={{ background: "linear-gradient(90deg, #00D4B4, #10B981)", boxShadow: "0 4px 20px rgba(0,212,180,0.4)" }}
            >
              Save to Hematology Profile
            </button>
            <button className="w-full mt-2.5 py-3 rounded-2xl text-[13px] font-semibold text-white/50"
              style={{ background: "rgba(255,255,255,0.04)" }}
              onClick={() => setStage("upload")}>
              Re-upload / Try Again
            </button>
          </div>
        </>
      )}

      <BottomNav />
    </div>
  );
}
