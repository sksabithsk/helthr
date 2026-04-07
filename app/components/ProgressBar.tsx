"use client";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number;       // 0–100
  total?: number;
  color?: string;
  multicolor?: boolean;
  showMarker?: boolean;
  label?: string;
  className?: string;
}

export default function ProgressBar({
  value,
  total,
  color = "#D4A847",
  multicolor = false,
  showMarker = true,
  label,
  className = "",
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const pct = total ? (value / total) * 100 : value;

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 150);
    return () => clearTimeout(t);
  }, [pct]);

  const markerColor = pct >= 75 ? "#4D8B3B" : pct >= 45 ? "#D4A847" : "#EF4444";

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="section-label">{label}</span>
          {total && (
            <span className="mono text-[10px] text-[#555]">{value}/{total}</span>
          )}
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${width}%`,
            background: multicolor
              ? "linear-gradient(to right, #4D8B3B 0%, #4D8B3B 55%, #F59E0B 55%, #F59E0B 80%, #EF4444 80%)"
              : color,
            transition: "width 800ms ease-out",
          }}
        >
          {showMarker && (
            <div
              className="progress-marker"
              style={{
                boxShadow: `0 0 6px 1px ${multicolor ? markerColor : color}`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
