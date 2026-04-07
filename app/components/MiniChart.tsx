"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";

interface MiniChartProps {
  data: Array<{ label: string; value: number }>;
  color?: string;
  height?: number;
  refLine?: number;
  showGrid?: boolean;
}

const CustomTooltip = ({ active, payload, label, color }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[8px] px-2.5 py-1.5"
      style={{ background: "#0A0908", border: `0.5px solid ${color}40`, fontSize: 10 }}>
      <p className="mono font-700" style={{ color }}>{payload[0].value}</p>
      <p className="text-[#555] mt-0.5">{label}</p>
    </div>
  );
};

export default function MiniChart({ data, color = "#D4A847", height = 100, refLine, showGrid = true }: MiniChartProps) {
  const gradId = `grad-${color.replace("#", "")}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2}/>
            <stop offset="100%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        {showGrid && <CartesianGrid strokeDasharray="2 2" stroke="#111" vertical={false}/>}
        <XAxis dataKey="label" tick={{ fill: "#444", fontSize: 9 }} axisLine={false} tickLine={false}/>
        <YAxis tick={{ fill: "#444", fontSize: 9 }} axisLine={false} tickLine={false}/>
        <Tooltip content={<CustomTooltip color={color}/>}/>
        {refLine && <ReferenceLine y={refLine} stroke={`${color}50`} strokeDasharray="3 3"/>}
        <Area type="monotone" dataKey="value"
          stroke={color} strokeWidth={1.5}
          fill={`url(#${gradId})`}
          dot={false}
          activeDot={{ r: 4, fill: color, stroke: "#000", strokeWidth: 1.5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
