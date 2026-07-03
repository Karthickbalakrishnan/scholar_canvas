const SERIES = [
  { key: "keyword", label: "Keyword Growth", color: "#0071e3", data: [12, 18, 24, 34, 44, 58, 66, 74] },
  { key: "hype", label: "Hype", color: "#f59e0b", data: [8, 22, 40, 52, 60, 55, 46, 38] },
  { key: "growth", label: "Growth", color: "#047857", data: [6, 9, 13, 19, 27, 35, 44, 54] },
];

const W = 220;
const H = 92;
const PAD = 6;

function toPath(data) {
  const max = Math.max(...SERIES.flatMap((s) => s.data));
  const stepX = (W - PAD * 2) / (data.length - 1);
  return data
    .map((v, i) => {
      const x = PAD + i * stepX;
      const y = H - PAD - (v / max) * (H - PAD * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function TrendRadar() {
  return (
    <div className="bg-[color:var(--color-card)] rounded-2xl border border-[color:var(--color-hairline)] shadow-[var(--shadow-apple-lux)] p-4 w-full xl:w-[248px] shrink-0">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[11px] font-semibold text-[color:var(--color-ink)]">Hype vs Substance Trend Radar</h3>
      </div>
      <p className="text-[10px] text-[color:var(--color-ink-faint)] mb-2">Keyword growth</p>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={PAD}
            x2={W - PAD}
            y1={H - PAD - f * (H - PAD * 2)}
            y2={H - PAD - f * (H - PAD * 2)}
            stroke="rgba(0,0,0,0.05)"
            strokeWidth="1"
          />
        ))}
        {SERIES.map((s) => (
          <path key={s.key} d={toPath(s.data)} fill="none" stroke={s.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            <span className="text-[10px] text-[color:var(--color-ink-soft)]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
