"use client";
import { useState } from "react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";

const moods = [
  { key: "great", emoji: "😁", label: "Great", color: "#4D8B3B" },
  { key: "good", emoji: "🙂", label: "Good", color: "#D4A847" },
  { key: "okay", emoji: "😐", label: "Okay", color: "#888" },
  { key: "low", emoji: "😔", label: "Low", color: "#F59E0B" },
  { key: "bad", emoji: "😞", label: "Bad", color: "#EF4444" },
];

const weekCalendar = [
  { day: "M", emoji: "🙂", color: "#D4A847" }, { day: "T", emoji: "😁", color: "#4D8B3B" },
  { day: "W", emoji: "😐", color: "#888" }, { day: "T", emoji: "🙂", color: "#D4A847" },
  { day: "F", emoji: "😔", color: "#F59E0B" }, { day: "S", emoji: "🙂", color: "#D4A847" },
  { day: "S", emoji: "🙂", color: "#D4A847" },
];

export default function MoodPage() {
  const [selected, setSelected] = useState("good");
  const [note, setNote] = useState("");

  const selectedMood = moods.find((m) => m.key === selected)!;

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Mood Logger" subtitle="How are you feeling today?" />

      {/* Mood selector */}
      <div className="flex flex-col items-center py-8">
        <span className="text-[72px] transition-all duration-200">{selectedMood.emoji}</span>
        <p className="text-[18px] font-700 mt-2" style={{ color: selectedMood.color }}>{selectedMood.label}</p>
      </div>

      <div className="px-[22px] mb-5 flex justify-center gap-4">
        {moods.map((m) => (
          <button key={m.key}
            onClick={() => setSelected(m.key)}
            className="flex flex-col items-center gap-1.5 transition-all"
            style={{ opacity: selected === m.key ? 1 : 0.35, transform: selected === m.key ? "scale(1.15)" : "scale(1)" }}>
            <span className="text-[32px]">{m.emoji}</span>
            <span className="text-[9px] font-600" style={{ color: m.color }}>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Note */}
      <div className="px-[22px] mb-5">
        <SectionLabel>ADD NOTE (OPTIONAL)</SectionLabel>
        <textarea
          className="w-full px-3.5 py-2.5 rounded-[10px] text-[13px] text-white outline-none resize-none placeholder-[#333]"
          style={{ background: "#0D0B08", border: "0.5px solid #1A1710" }}
          placeholder="What's affecting your mood today?"
          rows={3}
          value={note} onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {/* Week calendar */}
      <div className="px-[22px] mb-5">
        <SectionLabel>THIS WEEK</SectionLabel>
        <div className="card">
          <div className="flex justify-between">
            {weekCalendar.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[22px]">{d.emoji}</span>
                <span className="text-[9px] font-600 text-[#444]">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-[22px]">
        <button className="w-full py-3.5 rounded-[10px] text-[14px] font-700 text-black"
          style={{ background: selectedMood.color }}>
          Log Mood
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
