"use client";
import { useState } from "react";
import { ChevronRight, Check } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";

const symptoms = ["Fatigue", "Weight gain", "Cold intolerance", "Hair loss", "Constipation", "Dry skin", "Muscle aches", "Brain fog", "Depression", "Slow heartbeat"];

type Step = 1|2|3|4|5|6|7|8;

export default function LogVisitPage() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState({
    doctor: "", specialty: "", date: "", hospital: "",
    complaints: [] as string[], customComplaint: "",
    diagnosis: "", prescription: "", tests: "", followup: "", notes: "",
  });

  const progress = (step / 8) * 100;

  const next = () => setStep((s) => Math.min(8, s + 1) as Step);
  const prev = () => setStep((s) => Math.max(1, s - 1) as Step);

  const inputCls = "w-full px-3.5 py-2.5 rounded-[10px] text-[13px] text-white outline-none placeholder-[#333]";
  const inputStyle = { background: "#0D0B08", border: "0.5px solid #1A1710" };

  const steps = [
    { label: "SELECT DOCTOR", content: (
      <>
        <input className={inputCls} style={inputStyle} placeholder="Doctor name"
          value={data.doctor} onChange={(e) => setData((d) => ({ ...d, doctor: e.target.value }))} />
        <input className={inputCls + " mt-3"} style={inputStyle} placeholder="Specialty"
          value={data.specialty} onChange={(e) => setData((d) => ({ ...d, specialty: e.target.value }))} />
        <input className={inputCls + " mt-3"} style={inputStyle} placeholder="Hospital / Clinic"
          value={data.hospital} onChange={(e) => setData((d) => ({ ...d, hospital: e.target.value }))} />
      </>
    )},
    { label: "DATE OF VISIT", content: (
      <input type="date" className={inputCls} style={inputStyle}
        value={data.date} onChange={(e) => setData((d) => ({ ...d, date: e.target.value }))} />
    )},
    { label: "COMPLAINTS / SYMPTOMS", content: (
      <>
        <div className="flex flex-wrap gap-2 mb-3">
          {symptoms.map((s) => {
            const sel = data.complaints.includes(s);
            return (
              <button key={s} onClick={() => setData((d) => ({
                ...d, complaints: sel ? d.complaints.filter((c) => c !== s) : [...d.complaints, s]
              }))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[11px] font-600 transition-all"
                style={{
                  background: sel ? "rgba(212,168,71,0.12)" : "#0A0908",
                  color: sel ? "#D4A847" : "#555",
                  border: sel ? "0.5px solid rgba(212,168,71,0.3)" : "0.5px solid #1A1710",
                }}>
                {sel && <Check size={9} strokeWidth={2} />} {s}
              </button>
            );
          })}
        </div>
        <input className={inputCls} style={inputStyle} placeholder="Add custom symptom..."
          value={data.customComplaint} onChange={(e) => setData((d) => ({ ...d, customComplaint: e.target.value }))} />
      </>
    )},
    { label: "DIAGNOSIS", content: (
      <textarea className={inputCls + " resize-none"} style={inputStyle} rows={4}
        placeholder="Doctor's diagnosis..."
        value={data.diagnosis} onChange={(e) => setData((d) => ({ ...d, diagnosis: e.target.value }))} />
    )},
    { label: "PRESCRIPTIONS", content: (
      <textarea className={inputCls + " resize-none"} style={inputStyle} rows={4}
        placeholder="Medications prescribed..."
        value={data.prescription} onChange={(e) => setData((d) => ({ ...d, prescription: e.target.value }))} />
    )},
    { label: "TESTS ORDERED", content: (
      <textarea className={inputCls + " resize-none"} style={inputStyle} rows={4}
        placeholder="Lab tests, imaging ordered..."
        value={data.tests} onChange={(e) => setData((d) => ({ ...d, tests: e.target.value }))} />
    )},
    { label: "FOLLOW-UP DATE", content: (
      <input type="date" className={inputCls} style={inputStyle}
        value={data.followup} onChange={(e) => setData((d) => ({ ...d, followup: e.target.value }))} />
    )},
    { label: "NOTES / ADVICE", content: (
      <textarea className={inputCls + " resize-none"} style={inputStyle} rows={5}
        placeholder="Doctor's advice, lifestyle notes..."
        value={data.notes} onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))} />
    )},
  ];

  const current = steps[step - 1];

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Log Visit" subtitle={`Step ${step} of 8 — ${current.label}`} />

      {/* Progress */}
      <div className="px-[22px] mb-6">
        <div className="h-1 rounded-full bg-[#111] overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "#D4A847" }} />
        </div>
        <div className="flex justify-between mt-2">
          {[1,2,3,4,5,6,7,8].map((n) => (
            <div key={n} className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-700"
              style={{
                background: n < step ? "#D4A847" : n === step ? "rgba(212,168,71,0.2)" : "#0A0908",
                border: n === step ? "1px solid #D4A847" : n < step ? "none" : "0.5px solid #1A1710",
                color: n < step ? "#000" : n === step ? "#D4A847" : "#333",
              }}>
              {n < step ? <Check size={8} strokeWidth={3} /> : n}
            </div>
          ))}
        </div>
      </div>

      <div className="px-[22px] mb-6">
        <p className="section-label mb-3">{current.label}</p>
        {current.content}
      </div>

      <div className="px-[22px] flex gap-3">
        {step > 1 && (
          <button onClick={prev}
            className="flex-1 py-3 rounded-[10px] text-[13px] font-600 text-[#888]"
            style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
            ← Back
          </button>
        )}
        <button onClick={next}
          className="flex-1 py-3 rounded-[10px] text-[13px] font-700 text-black"
          style={{ background: "#D4A847" }}>
          {step === 8 ? "Save Visit" : "Next →"}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
