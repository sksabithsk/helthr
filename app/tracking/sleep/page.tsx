"use client";
import { useState } from "react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";
import MiniChart from "../../components/MiniChart";

const qualities = [
  { key: "deep", label: "Deep", emoji: "😴", color: "#9A7EC0" },
  { key: "moderate", label: "Moderate", emoji: "🙂", color: "#D4A847" },
  { key: "light", label: "Light", emoji: "😐", color: "#F59E0B" },
  { key: "poor", label: "Poor", emoji: "😞", color: "#EF4444" },
];

const weekData = [
  { label: "Mon", value: 7.5 }, { label: "Tue", value: 6.0 }, { label: "Wed", value: 8.0 },
  { label: "Thu", value: 5.5 }, { label: "Fri", value: 7.0 }, { label: "Sat", value: 8.5 }, { label: "Sun", value: 6.5 },
];

export default function SleepPage() {
  const [hours, setHours] = useState(6.5);
  const [quality, setQuality] = useState("moderate");

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Sleep Logger" subtitle="Track rest quality" />

      {/* Hours display */}
      <div className="flex flex-col items-center py-6">
        <span className="text-[64px]">🌙</span>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="mono text-[42px] font-700 text-white">{hours}</span>
          <span className="text-[16px] text-[#444]">hours</span>
        </div>
        <p className="text-[11px] text-[#555] mt-1">
          {hours >= 7.5 ? "Great sleep!" : hours >= 6 ? "Below recommended" : "Insufficient sleep"}
        </p>

        {/* Slider */}
        <div className="w-full px-[22px] mt-6">
          <input type="range" min="0" max="12" step="0.5"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="w-full h-1 rounded-full outline-none cursor-pointer appearance-none"
            style={{ background: `linear-gradient(to right, #9A7EC0 ${(hours/12)*100}%, #111 ${(hours/12)*100}%)` }}
          />
          <div className="flex justify-between mt-2">
            <span className="mono text-[9px] text-[#333]">0h</span>
            <span className="mono text-[9px] text-[#333]">6h</span>
            <span className="mono text-[9px] text-[#333]">12h</span>
          </div>
        </div>
      </div>

      {/* Quality */}
      <div className="px-[22px] mb-5">
        <SectionLabel>SLEEP QUALITY</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {qualities.map((q) => (
            <button key={q.key}
              onClick={() => setQuality(q.key)}
              className="card flex flex-col items-center gap-2 py-3 transition-all"
              style={{
                border: quality === q.key ? `1px solid ${q.color}50` : "0.5px solid #1A1710",
                background: quality === q.key ? `${q.color}10` : "#0A0908",
              }}>
              <span className="text-2xl">{q.emoji}</span>
              <span className="text-[9px] font-600" style={{ color: quality === q.key ? q.color : "#555" }}>
                {q.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly chart */}
      <div className="px-[22px] mb-5">
        <SectionLabel>WEEKLY TREND</SectionLabel>
        <div className="card">
          <MiniChart data={weekData} color="#9A7EC0" height={100} refLine={7.5} />
          <p className="text-[10px] text-[#333] mt-1 text-center">Recommended: 7.5h — dashed line</p>
        </div>
      </div>

      <div className="px-[22px]">
        <button className="w-full py-3.5 rounded-[10px] text-[14px] font-700 text-black"
          style={{ background: "#9A7EC0" }}>
          Save Sleep Log
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
