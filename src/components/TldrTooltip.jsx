import { useRef, useState } from "react";

const LATENCY_MS = 240;

export default function TldrTooltip({ tldr, children }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);

  const handleEnter = () => {
    setVisible(true);
    setLoading(true);
    timerRef.current = setTimeout(() => setLoading(false), LATENCY_MS);
  };

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleLeave = () => {
    setVisible(false);
    clearTimeout(timerRef.current);
  };

  return (
    <span
      className="relative inline"
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
      {visible && (
        <div
          className="absolute z-50 w-64 pointer-events-none animate-fadeIn"
          style={{ left: pos.x + 14, top: pos.y + 14 }}
        >
          <div className="bg-[color:var(--color-ink)] text-white rounded-xl shadow-[var(--shadow-apple-pop)] p-3.5">
            <div className="text-[9.5px] font-semibold tracking-[0.1em] text-white/50 mb-2">
              TL;DR SUMMARY
            </div>
            {loading ? (
              <div className="flex items-center gap-2 py-1.5">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/25 border-t-white animate-spin" />
                <span className="text-[11.5px] text-white/70">Summarizing…</span>
              </div>
            ) : (
              <ul className="space-y-1.5">
                {tldr.map((line, i) => (
                  <li key={i} className="text-[11.5px] leading-snug text-white/90 flex gap-1.5">
                    <span className="text-white/40 shrink-0">–</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </span>
  );
}
