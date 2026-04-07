"use client";
import { useState } from "react";
import { ChevronDown, AlertTriangle } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";

const forms = ["Tablet", "Capsule", "Liquid", "Injection", "Patch", "Drops"];
const freqs = ["Once daily", "Twice daily", "Three times daily", "Every 8 hours", "As needed", "Weekly"];

export default function AddMedicinePage() {
  const [form, setForm] = useState({
    name: "", dose: "", doseUnit: "mg", medForm: "Tablet",
    frequency: "Once daily", times: ["08:00"],
    doctor: "", startDate: "", endDate: "", notes: "",
  });
  const [checked, setChecked] = useState(false);
  const [interaction, setInteraction] = useState(false);

  const handleSave = () => {
    setChecked(true);
    if (form.name.toLowerCase().includes("aspirin")) setInteraction(true);
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="mb-4">
      <p className="section-label mb-2">{label}</p>
      {children}
    </div>
  );

  const inputCls = "w-full px-3.5 py-2.5 rounded-[10px] text-[13px] text-white outline-none"
    + " placeholder-[#333]";
  const inputStyle = { background: "#0D0B08", border: "0.5px solid #1A1710" };

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Add Medicine" subtitle="New prescription or supplement" />

      <div className="px-[22px]">
        <Field label="MEDICINE NAME">
          <input className={inputCls} style={inputStyle}
            placeholder="e.g. Levothyroxine"
            value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </Field>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="section-label mb-2">DOSAGE</p>
            <div className="flex gap-2">
              <input className={inputCls + " flex-1"} style={inputStyle}
                placeholder="50" type="number"
                value={form.dose} onChange={(e) => setForm((f) => ({ ...f, dose: e.target.value }))} />
              <div className="px-3 py-2.5 rounded-[10px] flex items-center gap-1 text-[12px] text-[#888]"
                style={inputStyle}>
                {form.doseUnit}<ChevronDown size={11} strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <div>
            <p className="section-label mb-2">FORM</p>
            <div className="px-3.5 py-2.5 rounded-[10px] flex items-center justify-between text-[13px] text-white"
              style={inputStyle}>
              {form.medForm}<ChevronDown size={12} color="#555" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <Field label="FREQUENCY">
          <div className="flex flex-wrap gap-2">
            {freqs.map((f) => (
              <button key={f}
                onClick={() => setForm((p) => ({ ...p, frequency: f }))}
                className="px-3 py-1.5 rounded-[4px] text-[11px] font-600 transition-all"
                style={{
                  background: form.frequency === f ? "#D4A847" : "#0A0908",
                  color: form.frequency === f ? "#000" : "#555",
                  border: form.frequency === f ? "none" : "0.5px solid #1A1710",
                }}>
                {f}
              </button>
            ))}
          </div>
        </Field>

        <Field label="SCHEDULE TIMES">
          <div className="flex gap-2">
            {form.times.map((t, i) => (
              <input key={i} type="time" className="px-3 py-2 rounded-[8px] text-[13px] text-white mono outline-none"
                style={inputStyle} value={t}
                onChange={(e) => {
                  const ts = [...form.times];
                  ts[i] = e.target.value;
                  setForm((p) => ({ ...p, times: ts }));
                }} />
            ))}
            <button className="px-3 py-2 rounded-[8px] text-[13px] text-[#D4A847]"
              style={inputStyle}
              onClick={() => setForm((p) => ({ ...p, times: [...p.times, "12:00"] }))}>
              + Add
            </button>
          </div>
        </Field>

        <Field label="PRESCRIBING DOCTOR">
          <input className={inputCls} style={inputStyle}
            placeholder="Dr. Name or AI Recommendation"
            value={form.doctor} onChange={(e) => setForm((f) => ({ ...f, doctor: e.target.value }))} />
        </Field>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="section-label mb-2">START DATE</p>
            <input type="date" className={inputCls} style={inputStyle}
              value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
          </div>
          <div>
            <p className="section-label mb-2">END DATE (OPT.)</p>
            <input type="date" className={inputCls} style={inputStyle}
              value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
          </div>
        </div>

        <Field label="NOTES">
          <textarea className={inputCls + " resize-none"} style={inputStyle} rows={3}
            placeholder="Special instructions, allergies, notes..."
            value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
        </Field>

        {/* Interaction warning */}
        {interaction && (
          <div className="mb-4 rounded-[12px] px-4 py-3 flex items-start gap-3"
            style={{ background: "rgba(239,68,68,0.06)", border: "0.5px solid rgba(239,68,68,0.2)" }}>
            <AlertTriangle size={15} color="#EF4444" strokeWidth={1.5} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[12px] font-700 text-[#EF4444]">Drug Interaction Detected</p>
              <p className="text-[11px] text-[#888] mt-0.5">
                Potential interaction with Levothyroxine. Aspirin can alter thyroid hormone binding.
              </p>
              <button className="text-[11px] text-[#5A8AC0] mt-1">View interaction details →</button>
            </div>
          </div>
        )}

        <button className="w-full py-3.5 rounded-[10px] text-[14px] font-700 text-black mb-3"
          style={{ background: "#D4A847" }}
          onClick={handleSave}>
          {checked ? "Confirm & Save" : "Check & Save"}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
