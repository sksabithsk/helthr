"use client";
import StatusBar from "../components/StatusBar";
import BackHeader from "../components/BackHeader";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

const emergencyData = {
  name: "Arjun Sharma",
  age: 38,
  blood: "B+",
  allergies: ["Penicillin", "Sulfonamides", "Latex"],
  conditions: ["Primary Hypothyroidism", "Dyslipidemia", "Pre-hypertension"],
  medications: [
    "Levothyroxine 50 mcg — Once daily AM",
    "Vitamin D3 2000 IU — Once daily",
    "Omega-3 1000 mg — Twice daily",
  ],
  contacts: [
    { name: "Priya Sharma (Spouse)", phone: "+91 98765 43210" },
    { name: "Dr. Priya Menon (Endocrinologist)", phone: "+91 11 2658 8700" },
  ],
};

function QRPlaceholder() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[160px] h-[160px] rounded-[12px] flex items-center justify-center"
        style={{ background: "white", padding: 12 }}>
        {/* Fake QR grid */}
        <div className="grid grid-cols-10 gap-0.5 w-full h-full">
          {Array.from({ length: 100 }).map((_, i) => {
            const rand = Math.random() > 0.45;
            const corner = (i < 30 && (i % 10 < 3 || i % 10 > 6)) || (i > 69 && i % 10 < 3);
            return (
              <div key={i} className="aspect-square rounded-[1px]"
                style={{ background: corner || rand ? "#000" : "transparent" }} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function EmergencyPage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Emergency Card" subtitle="Scan QR for instant access" />

      {/* QR */}
      <div className="px-[22px] mb-5">
        <div className="card py-6">
          <QRPlaceholder />
          <p className="text-center text-[10px] text-[#444] mt-3 mono">helthr.app/e/a1b2c3d4</p>
        </div>
      </div>

      {/* Core info */}
      <div className="mx-[22px] mb-5 card" style={{ borderLeft: "2px solid #D4A847" }}>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <p className="text-[20px] font-700 text-white">{emergencyData.name}</p>
            <p className="text-[12px] text-[#888] mt-0.5">{emergencyData.age} years old</p>
          </div>
          <div className="text-right">
            <p className="section-label mb-1">BLOOD GROUP</p>
            <p className="mono text-[28px] font-700 text-[#EF4444]">{emergencyData.blood}</p>
          </div>
        </div>
      </div>

      {/* Allergies — RED */}
      <div className="px-[22px] mb-5">
        <SectionLabel>⚠ ALLERGIES</SectionLabel>
        <div className="card" style={{ borderLeft: "2px solid #EF4444" }}>
          <div className="flex flex-wrap gap-2">
            {emergencyData.allergies.map((a) => (
              <span key={a} className="px-3 py-1.5 rounded-[4px] text-[12px] font-700"
                style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "0.5px solid rgba(239,68,68,0.3)" }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Conditions */}
      <div className="px-[22px] mb-5">
        <SectionLabel>CONDITIONS</SectionLabel>
        <div className="card">
          {emergencyData.conditions.map((c, i) => (
            <div key={c} className="flex items-center gap-2.5 py-2"
              style={{ borderBottom: i < emergencyData.conditions.length - 1 ? "0.5px solid #111" : "none" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] flex-shrink-0" />
              <p className="text-[12px] font-600 text-white">{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Medications */}
      <div className="px-[22px] mb-5">
        <SectionLabel>CURRENT MEDICATIONS</SectionLabel>
        <div className="card">
          {emergencyData.medications.map((m, i) => (
            <div key={m} className="flex items-start gap-2.5 py-2"
              style={{ borderBottom: i < emergencyData.medications.length - 1 ? "0.5px solid #111" : "none" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#9A7EC0] mt-1.5 flex-shrink-0" />
              <p className="text-[12px] text-[#888]">{m}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency contacts */}
      <div className="px-[22px] mb-5">
        <SectionLabel>EMERGENCY CONTACTS</SectionLabel>
        <div className="card py-0 px-[18px]">
          {emergencyData.contacts.map((c, i) => (
            <div key={c.name} className="py-3"
              style={{ borderBottom: i < emergencyData.contacts.length - 1 ? "0.5px solid #111" : "none" }}>
              <p className="text-[12px] font-600 text-white">{c.name}</p>
              <p className="mono text-[13px] text-[#D4A847] mt-0.5">{c.phone}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-[22px] mb-5 flex gap-3">
        <button className="flex-1 py-3 rounded-[10px] text-[13px] font-600 text-black"
          style={{ background: "#D4A847" }}>
          Add to Lock Screen
        </button>
        <button className="flex-1 py-3 rounded-[10px] text-[13px] font-600 text-[#888]"
          style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
          Print View
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
