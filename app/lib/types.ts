export type Status = "normal" | "borderline" | "critical";
export type Severity = "low" | "medium" | "high" | "critical";

export const STATUS_COLOR: Record<Status, string> = {
  normal: "#4D8B3B",
  borderline: "#F59E0B",
  critical: "#EF4444",
};

export const STATUS_LABEL: Record<Status, string> = {
  normal: "Normal",
  borderline: "Borderline",
  critical: "Critical",
};

export const CATEGORY_COLOR: Record<string, string> = {
  lab: "#D4A847",
  visit: "#5A8AC0",
  medicine: "#9A7EC0",
  vaccine: "#4D8B3B",
  note: "#888888",
  alert: "#EF4444",
};
