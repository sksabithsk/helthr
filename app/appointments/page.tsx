"use client";
import { useState } from "react";
import { Plus, ChevronRight, Calendar, MapPin, Bell } from "lucide-react";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

const upcoming = [
  { id: 1, doctor: "Dr. Priya Menon", specialty: "Endocrinologist", date: "Apr 10, 2025", time: "11:00 AM", location: "AIIMS OPD Block 4", color: "#5A8AC0" },
  { id: 2, doctor: "Dr. Arun Kumar", specialty: "Cardiologist", date: "Apr 22, 2025", time: "03:30 PM", location: "Apollo Hospital", color: "#EF4444" },
];

const past = [
  { id: 3, doctor: "Dr. Priya Menon", specialty: "Endocrinologist", date: "Apr 3, 2025", time: "11:00 AM", location: "AIIMS OPD", color: "#5A8AC0" },
  { id: 4, doctor: "Dr. Neha Singh", specialty: "General Physician", date: "Feb 8, 2025", time: "10:00 AM", location: "Max Healthcare", color: "#4D8B3B" },
];

function AppointmentCard({ appt, isPast }: { appt: typeof upcoming[0]; isPast?: boolean }) {
  return (
    <div className="card" style={{ opacity: isPast ? 0.55 : 1 }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[14px] font-700 text-white">{appt.doctor}</p>
          <p className="text-[11px] mt-0.5" style={{ color: appt.color }}>{appt.specialty}</p>
        </div>
        {!isPast && (
          <div className="px-2.5 py-1 rounded-[4px] text-[9px] font-700"
            style={{ background: `${appt.color}15`, color: appt.color }}>
            UPCOMING
          </div>
        )}
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Calendar size={11} color="#444" strokeWidth={1.5} />
          <span className="mono text-[11px] text-[#888]">{appt.date} · {appt.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={11} color="#444" strokeWidth={1.5} />
          <span className="text-[11px] text-[#888]">{appt.location}</span>
        </div>
      </div>
      {!isPast && (
        <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: "0.5px solid #111" }}>
          <button className="flex-1 py-2 rounded-[8px] text-[11px] font-600 flex items-center justify-center gap-1.5"
            style={{ background: "#0D0B08", border: "0.5px solid #1A1710", color: "#888" }}>
            <Bell size={11} strokeWidth={1.5} /> Remind
          </button>
          <button className="flex-1 py-2 rounded-[8px] text-[11px] font-600 text-[#EF4444]"
            style={{ background: "rgba(239,68,68,0.06)", border: "0.5px solid rgba(239,68,68,0.15)" }}>
            Cancel
          </button>
          <button className="flex-1 py-2 rounded-[8px] text-[11px] font-600 text-[#D4A847]"
            style={{ background: "rgba(212,168,71,0.08)", border: "0.5px solid rgba(212,168,71,0.2)" }}>
            Reschedule
          </button>
        </div>
      )}
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4">
        <p className="section-label" style={{ letterSpacing: "2px" }}>SCHEDULE</p>
        <h1 className="text-[22px] font-700 text-white mt-1">Appointments</h1>
      </div>

      <div className="px-[22px] mb-5">
        <SectionLabel>UPCOMING</SectionLabel>
        <div className="space-y-3">
          {upcoming.map((a) => <AppointmentCard key={a.id} appt={a} />)}
        </div>
      </div>

      <div className="px-[22px] mb-5">
        <SectionLabel>PAST</SectionLabel>
        <div className="space-y-3">
          {past.map((a) => <AppointmentCard key={a.id} appt={a} isPast />)}
        </div>
      </div>

      <div className="fab"><Plus size={18} color="#000" strokeWidth={2} /></div>
      <BottomNav />
    </div>
  );
}
