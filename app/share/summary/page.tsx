"use client";
import { useState } from "react";
import { Download, Share2 } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";

const sections = [
  { key: "demo", label: "Demographics & Blood Group", enabled: true },
  { key: "allergy", label: "Allergies", enabled: true },
  { key: "conditions", label: "Chronic Conditions", enabled: true },
  { key: "meds", label: "Current Medications", enabled: true },
  { key: "labs", label: "Lab Reports (last 6 months)", enabled: true },
  { key: "vaccines", label: "Vaccination History", enabled: false },
  { key: "visits", label: "Doctor Visits", enabled: false },
  { key: "emergency", label: "Emergency Contacts", enabled: true },
];

export default function SummaryPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.key, s.enabled]))
  );

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Health Summary" subtitle="Shareable health passport" />

      {/* Toggle sections */}
      <div className="px-[22px] mb-5">
        <SectionLabel>SELECT SECTIONS</SectionLabel>
        <div className="card py-0 px-[18px]">
          {sections.map((s, i) => (
            <div key={s.key}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: i < sections.length - 1 ? "0.5px solid #111" : "none" }}>
              <p className="text-[12px] font-600 text-white">{s.label}</p>
              <button
                onClick={() => setEnabled((p) => ({ ...p, [s.key]: !p[s.key] }))}
                className="relative w-9 h-5 rounded-full transition-all"
                style={{ background: enabled[s.key] ? "#D4A847" : "#1A1710" }}>
                <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200"
                  style={{ left: enabled[s.key] ? "calc(100% - 18px)" : "2px" }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="px-[22px] mb-5">
        <SectionLabel>PREVIEW</SectionLabel>
        <div className="card space-y-4">
          {enabled.demo && (
            <div>
              <p className="section-label mb-2">PATIENT</p>
              <div className="grid grid-cols-3 gap-2">
                {[{ l: "NAME", v: "Arjun Sharma" }, { l: "AGE", v: "38y · Male" }, { l: "BLOOD", v: "B+" }].map((i) => (
                  <div key={i.l}>
                    <p className="section-label" style={{ fontSize: 8 }}>{i.l}</p>
                    <p className="text-[11px] font-600 text-white mt-0.5">{i.v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {enabled.allergy && (
            <div style={{ borderTop: "0.5px solid #111", paddingTop: 12 }}>
              <p className="section-label mb-2">ALLERGIES</p>
              <div className="flex gap-1.5 flex-wrap">
                {["Penicillin", "Sulfonamides"].map((a) => (
                  <span key={a} className="pill text-[#EF4444]" style={{ borderColor: "rgba(239,68,68,0.2)" }}>{a}</span>
                ))}
              </div>
            </div>
          )}
          {enabled.conditions && (
            <div style={{ borderTop: "0.5px solid #111", paddingTop: 12 }}>
              <p className="section-label mb-2">CONDITIONS</p>
              <p className="text-[11px] text-[#888]">Hypothyroidism · Dyslipidemia · Pre-hypertension</p>
            </div>
          )}
          {enabled.meds && (
            <div style={{ borderTop: "0.5px solid #111", paddingTop: 12 }}>
              <p className="section-label mb-2">MEDICATIONS</p>
              <p className="text-[11px] text-[#888]">Levothyroxine 50 mcg · Vitamin D3 2000 IU · Omega-3 1000 mg</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-[22px] space-y-3">
        <button className="w-full py-3.5 rounded-[10px] text-[14px] font-700 text-black flex items-center justify-center gap-2"
          style={{ background: "#D4A847" }}>
          <Download size={15} strokeWidth={2} /> Download PDF
        </button>
        <button className="w-full py-3 rounded-[10px] text-[13px] font-600 flex items-center justify-center gap-2"
          style={{ background: "#0A0908", border: "0.5px solid #1A1710", color: "#888" }}>
          <Share2 size={14} strokeWidth={1.5} /> Share Link
        </button>
        <button className="w-full py-3 rounded-[10px] text-[13px] font-600 flex items-center justify-center gap-2"
          style={{ background: "#25D366", color: "white" }}>
          Share via WhatsApp
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
