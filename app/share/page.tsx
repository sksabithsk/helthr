"use client";
import { useState } from "react";
import { ChevronRight, Link as LinkIcon, Clock } from "lucide-react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BackHeader from "../components/BackHeader";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

const sections = [
  { key: "summary", label: "Health Summary", sub: "Score, overview" },
  { key: "labs", label: "Lab Reports", sub: "All reports + values" },
  { key: "meds", label: "Medications", sub: "Current prescriptions" },
  { key: "visits", label: "Doctor Visits", sub: "Visit history" },
  { key: "vaccines", label: "Vaccination", sub: "Immunization records" },
];

const durations = [
  { key: "24h", label: "24 hours" },
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "custom", label: "Custom" },
];

export default function SharePage() {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.key, true]))
  );
  const [duration, setDuration] = useState("7d");
  const [generated, setGenerated] = useState(false);
  const [member, setMember] = useState("Arjun Sharma");

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Share Health Records" subtitle="WhatsApp Doctor Bridge" />

      {/* Member select */}
      <div className="px-[22px] mb-5">
        <SectionLabel>PATIENT</SectionLabel>
        <div className="card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-[#D4A847]/10 text-[14px] font-700 text-[#D4A847]">A</div>
            <div>
              <p className="text-[13px] font-600 text-white">{member}</p>
              <p className="text-[10px] text-[#444]">38y · B+ · Member since 2024</p>
            </div>
          </div>
          <ChevronRight size={13} color="#333" strokeWidth={1.5} />
        </div>
      </div>

      {/* Sections toggle */}
      <div className="px-[22px] mb-5">
        <SectionLabel>SELECT SECTIONS</SectionLabel>
        <div className="card py-0 px-[18px]">
          {sections.map((s, i) => (
            <div key={s.key}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: i < sections.length - 1 ? "0.5px solid #111" : "none" }}>
              <div>
                <p className="text-[13px] font-600 text-white">{s.label}</p>
                <p className="text-[10px] text-[#444] mt-0.5">{s.sub}</p>
              </div>
              <button
                onClick={() => setSelected((p) => ({ ...p, [s.key]: !p[s.key] }))}
                className="relative w-10 h-6 rounded-full transition-all"
                style={{ background: selected[s.key] ? "#D4A847" : "#1A1710" }}>
                <div className="absolute top-0.5 transition-all duration-200 w-5 h-5 rounded-full bg-white shadow"
                  style={{ left: selected[s.key] ? "calc(100% - 22px)" : "2px" }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="px-[22px] mb-5">
        <SectionLabel>ACCESS DURATION</SectionLabel>
        <div className="flex gap-2">
          {durations.map((d) => (
            <button key={d.key}
              onClick={() => setDuration(d.key)}
              className="flex-1 py-2 rounded-[8px] text-[11px] font-600 transition-all"
              style={{
                background: duration === d.key ? "#D4A847" : "#0A0908",
                color: duration === d.key ? "#000" : "#555",
                border: duration === d.key ? "none" : "0.5px solid #1A1710",
              }}>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {generated && (
        <div className="mx-[22px] mb-5 card" style={{ borderLeft: "2px solid #4D8B3B" }}>
          <p className="section-label mb-2">SHARE LINK GENERATED</p>
          <div className="flex items-center gap-2 p-3 rounded-[8px]"
            style={{ background: "#0D0B08", border: "0.5px solid #1A1710" }}>
            <LinkIcon size={13} color="#4D8B3B" strokeWidth={1.5} />
            <p className="mono text-[10px] text-[#4D8B3B] flex-1 truncate">helthr.app/share/a1b2c3d4</p>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <Clock size={11} color="#555" strokeWidth={1.5} />
            <p className="text-[10px] text-[#555]">Expires in {duration === "24h" ? "24 hours" : duration === "7d" ? "7 days" : "30 days"}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-[22px] space-y-3">
        <button
          className="w-full py-3.5 rounded-[10px] text-[14px] font-700 text-black flex items-center justify-center gap-2"
          style={{ background: "#25D366" }}
          onClick={() => setGenerated(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Share via WhatsApp
        </button>
        <button onClick={() => setGenerated(true)}
          className="w-full py-3 rounded-[10px] text-[13px] font-600 flex items-center justify-center gap-2"
          style={{ background: "#0A0908", border: "0.5px solid #1A1710", color: "#888" }}>
          <LinkIcon size={14} strokeWidth={1.5} /> Copy Link
        </button>
        <Link href="/share/active">
          <p className="text-center text-[11px] text-[#D4A847] mt-2">View active shares →</p>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
