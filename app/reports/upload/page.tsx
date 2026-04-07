"use client";
import { useState } from "react";
import { Camera, Upload, FileText, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";

type Stage = "pick" | "scan" | "review";

const parsed = [
  { name: "TSH", value: "7.8", unit: "mIU/L", ref: "0.4 – 4.0", status: "critical" as const },
  { name: "Free T3", value: "2.9", unit: "pg/mL", ref: "2.3 – 4.2", status: "borderline" as const },
  { name: "Free T4", value: "0.74", unit: "ng/dL", ref: "0.8 – 1.8", status: "borderline" as const },
  { name: "Anti-TPO", value: "12", unit: "IU/mL", ref: "< 34", status: "normal" as const },
  { name: "Thyroglobulin", value: "18", unit: "ng/mL", ref: "1.4 – 78", status: "normal" as const },
];

const STATUS_COLOR = { normal: "#4D8B3B", borderline: "#F59E0B", critical: "#EF4444" };

function ScanningAnim() {
  return (
    <div className="flex flex-col items-center py-16 px-[22px]">
      <div className="relative w-[180px] h-[230px] rounded-[12px] overflow-hidden mb-6"
        style={{ border: "0.5px solid #1A1710", background: "#0A0908" }}>
        {/* scan line */}
        <div className="absolute left-0 right-0 h-0.5 bg-[#D4A847]"
          style={{ boxShadow: "0 0 10px #D4A847", animation: "scanLine 1.8s ease-in-out infinite" }} />
        {/* fake text lines */}
        {[28, 50, 72, 94, 116, 138, 160, 182].map((y, i) => (
          <div key={i} className="absolute left-4 rounded-full" style={{
            top: y, height: 5, right: i % 2 === 0 ? 16 : 40,
            background: i % 3 === 0 ? "rgba(212,168,71,0.3)" : "#1A1710"
          }} />
        ))}
        {/* corner marks */}
        {[["top-0 left-0", "border-t border-l"], ["top-0 right-0", "border-t border-r"], ["bottom-0 left-0", "border-b border-l"], ["bottom-0 right-0", "border-b border-r"]].map(([pos, cls], i) => (
          <div key={i} className={`absolute ${pos} w-5 h-5 border-[#D4A847] ${cls}`} />
        ))}
      </div>
      <p className="text-[14px] font-600 text-white mb-2">AI Reading Report</p>
      <p className="text-[12px] text-[#555]">Extracting parameters...</p>
      <div className="flex gap-1.5 mt-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4A847]"
            style={{ animation: `bounce 0.9s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
      <style>{`
        @keyframes scanLine { 0%{top:0} 50%{top:220px} 100%{top:0} }
        @keyframes bounce { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(-5px);opacity:1} }
      `}</style>
    </div>
  );
}

export default function UploadPage() {
  const [stage, setStage] = useState<Stage>("pick");

  const goScan = () => {
    setStage("scan");
    setTimeout(() => setStage("review"), 2800);
  };

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader
        title={stage === "pick" ? "Upload Report" : stage === "scan" ? "Scanning…" : "Review Results"}
        subtitle={stage === "review" ? "5 parameters found · 94% confidence" : "Camera or file import"}
        action={stage === "pick" ? (
          <button onClick={goScan} className="text-[11px] font-600 text-[#D4A847]">Demo Scan →</button>
        ) : undefined}
      />

      {stage === "pick" && (
        <div className="px-[22px] space-y-3">
          {/* Camera */}
          <button onClick={goScan} className="w-full card flex items-center gap-4 py-4 px-5">
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center"
              style={{ background: "rgba(212,168,71,0.08)" }}>
              <Camera size={22} strokeWidth={1.5} color="#D4A847" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[14px] font-600 text-white">Scan with Camera</p>
              <p className="text-[11px] text-[#444] mt-0.5">AI auto-crops and enhances</p>
            </div>
            <ChevronRight size={14} color="#333" strokeWidth={1.5} />
          </button>
          {/* Upload */}
          <button onClick={goScan} className="w-full card flex items-center gap-4 py-4 px-5">
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center"
              style={{ background: "rgba(90,138,192,0.08)" }}>
              <Upload size={22} strokeWidth={1.5} color="#5A8AC0" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[14px] font-600 text-white">Upload PDF / Image</p>
              <p className="text-[11px] text-[#444] mt-0.5">Supports PDF, JPG, PNG</p>
            </div>
            <ChevronRight size={14} color="#333" strokeWidth={1.5} />
          </button>
          {/* Drop zone */}
          <div className="rounded-[16px] py-10 flex flex-col items-center gap-3"
            style={{ border: "1px dashed #1A1710", background: "#0A0908" }}>
            <FileText size={28} color="#333" strokeWidth={1} />
            <p className="text-[12px] text-[#444]">Drag & drop PDF here</p>
          </div>
          {/* Supported labs */}
          <div className="mt-2">
            <p className="section-label mb-2">SUPPORTED LABS</p>
            <div className="flex flex-wrap gap-2">
              {["Thyrocare", "SRL Diagnostics", "Metropolis", "Dr. Lal PathLabs", "AIIMS", "Apollo"].map((lab) => (
                <span key={lab} className="pill text-[#555]">{lab}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {stage === "scan" && <ScanningAnim />}

      {stage === "review" && (
        <div className="px-[22px] space-y-4">
          {/* Confidence */}
          <div className="card" style={{ borderLeft: "2px solid #4D8B3B" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="section-label">AI CONFIDENCE</p>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={13} color="#4D8B3B" strokeWidth={2} />
                <span className="mono text-[14px] font-700 text-[#4D8B3B]">94%</span>
              </div>
            </div>
            <p className="text-[12px] text-[#555]">Category auto-detected: <span className="text-white font-600">Thyroid Panel</span></p>
          </div>

          {/* 2 out of range warning */}
          <div className="flex items-start gap-2.5 px-4 py-3 rounded-[10px]"
            style={{ background: "rgba(239,68,68,0.06)", border: "0.5px solid rgba(239,68,68,0.2)" }}>
            <AlertCircle size={14} color="#EF4444" strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-[#EF4444]">3 values out of reference range. Review below before saving.</p>
          </div>

          {/* Parsed parameters */}
          <div>
            <p className="section-label mb-3">DETECTED PARAMETERS</p>
            <div className="card py-0 px-[18px]">
              {parsed.map((p, i) => {
                const color = STATUS_COLOR[p.status];
                return (
                  <div key={p.name} className="flex items-center justify-between py-3"
                    style={{ borderBottom: i < parsed.length - 1 ? "0.5px solid #111" : "none" }}>
                    <div>
                      <p className="text-[12px] font-600 text-white">{p.name}</p>
                      <p className="text-[10px] text-[#444] mt-0.5">Ref: {p.ref} {p.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="mono text-[13px] font-700" style={{ color }}>{p.value}</p>
                      <p className="text-[9px] mt-0.5 font-700 uppercase" style={{ color }}>{p.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Confirm */}
          <button className="w-full py-3.5 rounded-[10px] text-[14px] font-700 text-black"
            style={{ background: "#D4A847" }}>
            Save to Profile
          </button>
          <button className="w-full py-3 text-[12px] text-[#555]">Re-scan / Try Again</button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
