import ProgressBar from "./ProgressBar";

interface MarkerRowProps {
  name: string;
  value: string;
  unit: string;
  status: "normal" | "borderline" | "critical";
  markerPct?: number; // where the dot sits on 0–100 bar
}

const STATUS_COLOR = { normal: "#4D8B3B", borderline: "#F59E0B", critical: "#EF4444" };

export default function MarkerRow({ name, value, unit, status, markerPct = 60 }: MarkerRowProps) {
  const color = STATUS_COLOR[status];
  return (
    <div className="space-y-1.5 py-2.5" style={{ borderBottom: "0.5px solid #111" }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-500 text-[#666]">{name}</span>
        <span className="mono text-[12px] font-700" style={{ color }}>
          {value} <span className="text-[10px] font-400 text-[#444]">{unit}</span>
        </span>
      </div>
      <ProgressBar value={markerPct} multicolor showMarker color={color} />
    </div>
  );
}
