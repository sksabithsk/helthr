"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import BottomNav from "@/app/components/BottomNav";
import StatusBar from "@/app/components/StatusBar";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart
} from "recharts";

const categoryData: Record<string, {
  title: string;
  color: string;
  description: string;
  parameters: Array<{
    name: string;
    value: string;
    unit: string;
    status: "normal" | "borderline" | "critical";
    trend: "up" | "down" | "stable";
    refRange: string;
    history: Array<{ month: string; value: number }>;
    refMin: number;
    refMax: number;
  }>;
}> = {
  hormones: {
    title: "Hormones",
    color: "#EF4444",
    description: "Thyroid & Adrenal Panel",
    parameters: [
      {
        name: "TSH",
        value: "7.8",
        unit: "mIU/L",
        status: "critical",
        trend: "up",
        refRange: "0.4 – 4.0",
        refMin: 0.4,
        refMax: 4.0,
        history: [
          { month: "Aug", value: 3.2 },
          { month: "Sep", value: 4.1 },
          { month: "Oct", value: 5.6 },
          { month: "Dec", value: 6.3 },
          { month: "Jan", value: 7.1 },
          { month: "Mar", value: 7.8 },
        ],
      },
      {
        name: "Free T3",
        value: "2.9",
        unit: "pg/mL",
        status: "borderline",
        trend: "down",
        refRange: "2.3 – 4.2",
        refMin: 2.3,
        refMax: 4.2,
        history: [
          { month: "Aug", value: 3.8 },
          { month: "Sep", value: 3.5 },
          { month: "Oct", value: 3.2 },
          { month: "Dec", value: 3.0 },
          { month: "Jan", value: 2.9 },
          { month: "Mar", value: 2.9 },
        ],
      },
      {
        name: "Free T4",
        value: "0.74",
        unit: "ng/dL",
        status: "borderline",
        trend: "down",
        refRange: "0.8 – 1.8",
        refMin: 0.8,
        refMax: 1.8,
        history: [
          { month: "Aug", value: 1.4 },
          { month: "Sep", value: 1.2 },
          { month: "Oct", value: 1.0 },
          { month: "Dec", value: 0.9 },
          { month: "Jan", value: 0.8 },
          { month: "Mar", value: 0.74 },
        ],
      },
      {
        name: "Cortisol",
        value: "18.4",
        unit: "μg/dL",
        status: "normal",
        trend: "stable",
        refRange: "6.2 – 19.4",
        refMin: 6.2,
        refMax: 19.4,
        history: [
          { month: "Aug", value: 15.2 },
          { month: "Sep", value: 16.8 },
          { month: "Oct", value: 17.1 },
          { month: "Dec", value: 18.0 },
          { month: "Jan", value: 17.6 },
          { month: "Mar", value: 18.4 },
        ],
      },
    ],
  },
  hematology: {
    title: "Hematology",
    color: "#00D4B4",
    description: "Complete Blood Count",
    parameters: [
      {
        name: "Hemoglobin",
        value: "14.2",
        unit: "g/dL",
        status: "normal",
        trend: "stable",
        refRange: "13.0 – 17.0",
        refMin: 13.0,
        refMax: 17.0,
        history: [
          { month: "Aug", value: 13.8 },
          { month: "Sep", value: 14.0 },
          { month: "Oct", value: 14.1 },
          { month: "Dec", value: 14.3 },
          { month: "Jan", value: 14.2 },
          { month: "Mar", value: 14.2 },
        ],
      },
      {
        name: "WBC",
        value: "6800",
        unit: "cells/μL",
        status: "normal",
        trend: "stable",
        refRange: "4500 – 11000",
        refMin: 4500,
        refMax: 11000,
        history: [
          { month: "Aug", value: 7200 },
          { month: "Sep", value: 6900 },
          { month: "Oct", value: 6750 },
          { month: "Dec", value: 7100 },
          { month: "Jan", value: 6600 },
          { month: "Mar", value: 6800 },
        ],
      },
      {
        name: "Platelets",
        value: "218",
        unit: "× 10³/μL",
        status: "normal",
        trend: "stable",
        refRange: "150 – 400",
        refMin: 150,
        refMax: 400,
        history: [
          { month: "Aug", value: 240 },
          { month: "Sep", value: 230 },
          { month: "Oct", value: 225 },
          { month: "Dec", value: 220 },
          { month: "Jan", value: 215 },
          { month: "Mar", value: 218 },
        ],
      },
      {
        name: "ESR",
        value: "22",
        unit: "mm/hr",
        status: "borderline",
        trend: "up",
        refRange: "0 – 20",
        refMin: 0,
        refMax: 20,
        history: [
          { month: "Aug", value: 12 },
          { month: "Sep", value: 14 },
          { month: "Oct", value: 16 },
          { month: "Dec", value: 19 },
          { month: "Jan", value: 20 },
          { month: "Mar", value: 22 },
        ],
      },
    ],
  },
  biochemistry: {
    title: "Biochemistry",
    color: "#F59E0B",
    description: "Lipid & Metabolic Panel",
    parameters: [
      {
        name: "LDL",
        value: "142",
        unit: "mg/dL",
        status: "borderline",
        trend: "up",
        refRange: "< 100",
        refMin: 0,
        refMax: 100,
        history: [
          { month: "Aug", value: 118 },
          { month: "Sep", value: 122 },
          { month: "Oct", value: 128 },
          { month: "Dec", value: 135 },
          { month: "Jan", value: 138 },
          { month: "Mar", value: 142 },
        ],
      },
      {
        name: "HDL",
        value: "52",
        unit: "mg/dL",
        status: "normal",
        trend: "stable",
        refRange: "> 40",
        refMin: 40,
        refMax: 80,
        history: [
          { month: "Aug", value: 55 },
          { month: "Sep", value: 54 },
          { month: "Oct", value: 53 },
          { month: "Dec", value: 52 },
          { month: "Jan", value: 51 },
          { month: "Mar", value: 52 },
        ],
      },
      {
        name: "Triglycerides",
        value: "178",
        unit: "mg/dL",
        status: "borderline",
        trend: "up",
        refRange: "< 150",
        refMin: 0,
        refMax: 150,
        history: [
          { month: "Aug", value: 145 },
          { month: "Sep", value: 152 },
          { month: "Oct", value: 158 },
          { month: "Dec", value: 165 },
          { month: "Jan", value: 172 },
          { month: "Mar", value: 178 },
        ],
      },
      {
        name: "Blood Glucose",
        value: "96",
        unit: "mg/dL",
        status: "normal",
        trend: "stable",
        refRange: "70 – 100",
        refMin: 70,
        refMax: 100,
        history: [
          { month: "Aug", value: 94 },
          { month: "Sep", value: 92 },
          { month: "Oct", value: 95 },
          { month: "Dec", value: 98 },
          { month: "Jan", value: 96 },
          { month: "Mar", value: 96 },
        ],
      },
    ],
  },
  preventive: {
    title: "Preventive Health",
    color: "#10B981",
    description: "Vitamins & Minerals",
    parameters: [
      {
        name: "Vitamin D",
        value: "18.4",
        unit: "ng/mL",
        status: "critical",
        trend: "down",
        refRange: "30 – 100",
        refMin: 30,
        refMax: 100,
        history: [
          { month: "Aug", value: 28 },
          { month: "Sep", value: 25 },
          { month: "Oct", value: 23 },
          { month: "Dec", value: 21 },
          { month: "Jan", value: 19 },
          { month: "Mar", value: 18.4 },
        ],
      },
      {
        name: "Vitamin B12",
        value: "312",
        unit: "pg/mL",
        status: "borderline",
        trend: "stable",
        refRange: "200 – 900",
        refMin: 200,
        refMax: 900,
        history: [
          { month: "Aug", value: 380 },
          { month: "Sep", value: 360 },
          { month: "Oct", value: 340 },
          { month: "Dec", value: 325 },
          { month: "Jan", value: 318 },
          { month: "Mar", value: 312 },
        ],
      },
      {
        name: "Iron",
        value: "88",
        unit: "μg/dL",
        status: "normal",
        trend: "stable",
        refRange: "60 – 170",
        refMin: 60,
        refMax: 170,
        history: [
          { month: "Aug", value: 92 },
          { month: "Sep", value: 90 },
          { month: "Oct", value: 89 },
          { month: "Dec", value: 87 },
          { month: "Jan", value: 88 },
          { month: "Mar", value: 88 },
        ],
      },
    ],
  },
  cardiac: {
    title: "Cardiac",
    color: "#7C3AED",
    description: "Heart Health Panel",
    parameters: [
      {
        name: "CK-MB",
        value: "4.2",
        unit: "ng/mL",
        status: "normal",
        trend: "stable",
        refRange: "0 – 6.0",
        refMin: 0,
        refMax: 6.0,
        history: [
          { month: "Aug", value: 3.8 },
          { month: "Sep", value: 4.0 },
          { month: "Oct", value: 4.1 },
          { month: "Dec", value: 4.3 },
          { month: "Jan", value: 4.2 },
          { month: "Mar", value: 4.2 },
        ],
      },
      {
        name: "Troponin I",
        value: "0.02",
        unit: "ng/mL",
        status: "normal",
        trend: "stable",
        refRange: "< 0.04",
        refMin: 0,
        refMax: 0.04,
        history: [
          { month: "Aug", value: 0.01 },
          { month: "Sep", value: 0.02 },
          { month: "Oct", value: 0.01 },
          { month: "Dec", value: 0.02 },
          { month: "Jan", value: 0.02 },
          { month: "Mar", value: 0.02 },
        ],
      },
    ],
  },
  metabolic: {
    title: "Metabolic",
    color: "#3B82F6",
    description: "HbA1c & Insulin Panel",
    parameters: [
      {
        name: "HbA1c",
        value: "5.9",
        unit: "%",
        status: "borderline",
        trend: "up",
        refRange: "< 5.7",
        refMin: 0,
        refMax: 5.7,
        history: [
          { month: "Aug", value: 5.4 },
          { month: "Sep", value: 5.5 },
          { month: "Oct", value: 5.6 },
          { month: "Dec", value: 5.7 },
          { month: "Jan", value: 5.8 },
          { month: "Mar", value: 5.9 },
        ],
      },
      {
        name: "Fasting Insulin",
        value: "14.2",
        unit: "μU/mL",
        status: "borderline",
        trend: "up",
        refRange: "2.6 – 24.9",
        refMin: 2.6,
        refMax: 24.9,
        history: [
          { month: "Aug", value: 10.2 },
          { month: "Sep", value: 11.0 },
          { month: "Oct", value: 11.8 },
          { month: "Dec", value: 12.6 },
          { month: "Jan", value: 13.5 },
          { month: "Mar", value: 14.2 },
        ],
      },
    ],
  },
};

const statusConfig = {
  normal: { color: "#10B981", bg: "rgba(16,185,129,0.12)", label: "Normal" },
  borderline: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)", label: "Borderline" },
  critical: { color: "#EF4444", bg: "rgba(239,68,68,0.12)", label: "Critical" },
};

const CustomTooltip = ({ active, payload, label, color }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-3 py-2 text-xs"
        style={{ background: "#1A1D25", border: `1px solid ${color}40` }}>
        <p style={{ color }} className="font-bold">{payload[0].value}</p>
        <p className="text-white/40">{label}</p>
      </div>
    );
  }
  return null;
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const data = categoryData[id] || categoryData.hormones;

  return (
    <div className="mobile-container overflow-x-hidden pb-28">
      <StatusBar />

      {/* Header */}
      <div className="px-5 pt-1 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-white/70" />
        </button>
        <div className="flex-1">
          <h1 className="text-[20px] font-bold text-white">{data.title}</h1>
          <p className="text-[12px] text-white/40">{data.description}</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold"
          style={{ background: `${data.color}20`, color: data.color, border: `1px solid ${data.color}40` }}
        >
          <Upload size={13} />
          Upload
        </button>
      </div>

      {/* Parameters */}
      <div className="px-5 space-y-4">
        {data.parameters.map((param) => {
          const sc = statusConfig[param.status];
          const TrendIcon = param.trend === "up" ? TrendingUp : param.trend === "down" ? TrendingDown : Minus;
          const trendColor = param.trend === "up"
            ? (param.status === "critical" || param.status === "borderline" ? "#EF4444" : "#10B981")
            : param.trend === "down"
            ? (param.status === "critical" || param.status === "borderline" ? "#EF4444" : "#10B981")
            : "#F59E0B";

          return (
            <div key={param.name}
              className="rounded-2xl p-4"
              style={{ background: "#1A1D25", border: "1px solid rgba(255,255,255,0.06)" }}>
              {/* Param header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-bold text-white">{param.name}</h3>
                    <button>
                      <Info size={13} className="text-white/30" />
                    </button>
                  </div>
                  <p className="text-[11px] text-white/40 mt-0.5">Ref: {param.refRange} {param.unit}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[22px] font-black" style={{ color: sc.color }}>
                      {param.value}
                    </span>
                    <span className="text-[11px] text-white/40">{param.unit}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: sc.bg, color: sc.color }}>
                      {sc.label}
                    </span>
                    <div className="flex items-center gap-0.5" style={{ color: trendColor }}>
                      <TrendIcon size={11} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[110px] -mx-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={param.history} margin={{ top: 5, right: 8, left: -30, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`grad-${param.name}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={data.color} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={data.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 9 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip color={data.color} />} />
                    <ReferenceLine y={param.refMax} stroke={`${sc.color}50`} strokeDasharray="3 3" />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={data.color}
                      strokeWidth={2}
                      fill={`url(#grad-${param.name})`}
                      dot={{ fill: data.color, r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: data.color, stroke: "#111318", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
