"use client";
import { Share2, FileText } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";
import Link from "next/link";

const visit = {
  doctor: "Dr. Priya Menon",
  specialty: "Endocrinologist",
  date: "Apr 3, 2025",
  hospital: "AIIMS New Delhi",
  complaints: ["Fatigue", "Weight gain", "Cold intolerance", "Hair loss"],
  diagnosis: "Primary Hypothyroidism (E03.9) — TSH significantly elevated at 7.8 mIU/L with low Free T4. Consistent with autoimmune thyroiditis pattern.",
  prescriptions: ["Levothyroxine 50 mcg — Once daily, empty stomach, morning", "Calcium supplement — 2 hours after Levothyroxine"],
  tests: ["Repeat TSH, Free T4 in 6 weeks", "Anti-TPO antibody titre", "Vitamin D level"],
  followup: "May 15, 2025",
  notes: "Avoid calcium, iron within 4h of Levothyroxine. Soy products may reduce absorption. Patient counselled on lifestyle modifications.",
  linkedReports: [{ name: "Thyroid Panel — Apr 5, 2025", color: "#EF4444" }],
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-[22px] mb-5">
      <SectionLabel>{title}</SectionLabel>
      <div className="card">{children}</div>
    </div>
  );
}

export default function VisitDetailPage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title={visit.doctor} subtitle={`${visit.specialty} · ${visit.date}`}
        action={
          <button className="w-8 h-8 rounded-[8px] flex items-center justify-center"
            style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
            <Share2 size={13} color="#888" strokeWidth={1.5} />
          </button>
        }
      />

      {/* Visit meta */}
      <div className="mx-[22px] mb-5 card">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "HOSPITAL", value: visit.hospital },
            { label: "DATE", value: visit.date },
            { label: "FOLLOW-UP", value: visit.followup },
            { label: "SPECIALTY", value: visit.specialty },
          ].map((i) => (
            <div key={i.label}>
              <p className="section-label" style={{ fontSize: 8 }}>{i.label}</p>
              <p className="text-[12px] font-600 text-white mt-0.5">{i.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Complaints */}
      <Section title="COMPLAINTS">
        <div className="flex flex-wrap gap-2">
          {visit.complaints.map((c) => (
            <span key={c} className="pill text-[#888]">{c}</span>
          ))}
        </div>
      </Section>

      {/* Diagnosis */}
      <Section title="DIAGNOSIS">
        <p className="text-[12px] text-[#888] leading-relaxed">{visit.diagnosis}</p>
      </Section>

      {/* Prescriptions */}
      <Section title="PRESCRIPTIONS">
        <div className="space-y-2">
          {visit.prescriptions.map((p, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#9A7EC0] mt-1.5 flex-shrink-0" />
              <p className="text-[12px] text-[#888]">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tests */}
      <Section title="TESTS ORDERED">
        <div className="space-y-2">
          {visit.tests.map((t, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A847] mt-1.5 flex-shrink-0" />
              <p className="text-[12px] text-[#888]">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Notes */}
      <Section title="NOTES">
        <p className="text-[12px] text-[#888] leading-relaxed">{visit.notes}</p>
      </Section>

      {/* Linked reports */}
      <div className="px-[22px] mb-5">
        <SectionLabel>LINKED LAB REPORTS</SectionLabel>
        {visit.linkedReports.map((r) => (
          <Link key={r.name} href="/reports">
            <div className="card flex items-center gap-3 py-3 px-4">
              <FileText size={15} strokeWidth={1.5} style={{ color: r.color }} />
              <p className="text-[12px] font-600 text-white flex-1">{r.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Share */}
      <div className="px-[22px] mb-5">
        <button className="w-full py-3 rounded-[10px] text-[13px] font-600 flex items-center justify-center gap-2"
          style={{ background: "#0A0908", border: "0.5px solid #1A1710", color: "#888" }}>
          <Share2 size={14} strokeWidth={1.5} />
          Share with Another Doctor
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
