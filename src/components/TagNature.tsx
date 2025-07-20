import type { Nature } from "../utils/analyzeNature";

export default function TagNature({ nature }: { nature: Nature }) {
  const color = nature === "Graphique" ? "#facc15" : "#34d399";
  return (
    <span style={{
      background: color,
      color: "#222",
      borderRadius: 12,
      padding: "2px 14px",
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 8,
      display: "inline-block"
    }}>
      {nature}
    </span>
  );
}
