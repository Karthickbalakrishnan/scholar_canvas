import { avatarClasses, initialsOf } from "../utils/helpers.js";

export default function LineageModal({ faculty, onClose }) {
  if (!faculty) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/35 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-[var(--shadow-apple-pop)] w-full max-w-lg p-7 animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.1em] text-[color:var(--color-ink-faint)] mb-1">
              ACADEMIC GENEALOGY
            </div>
            <h2 className="text-[17px] font-semibold text-[color:var(--color-ink)]">Lineage Tree</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[color:var(--color-ink-soft)]"
            aria-label="Close lineage tree"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col items-center gap-1">
          {/* Advisor node */}
          <NodeCard label="Primary Advisor" name={faculty.advisor} tone="soft" />
          <Connector />

          {/* Selected faculty node */}
          <NodeCard label="Selected Faculty" name={faculty.name} tone="accent" />
          <Connector />

          {/* Placements */}
          <div className="w-full">
            <div className="text-[10px] font-semibold tracking-[0.1em] text-[color:var(--color-ink-faint)] text-center mb-2">
              NOTABLE PLACEMENTS
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {faculty.placements.map((p) => (
                <span
                  key={p}
                  className="text-[12px] font-medium bg-[color:var(--color-mint-soft)] text-[color:var(--color-mint)] rounded-full px-3 py-1.5"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Connector() {
  return <div className="w-px h-6 bg-[color:var(--color-hairline)]" />;
}

function NodeCard({ label, name, tone }) {
  const bg = tone === "accent" ? "bg-[color:var(--color-accent-soft)] border-[color:var(--color-accent)]/25" : "bg-[#fafafa] border-[color:var(--color-hairline)]";
  return (
    <div className={`rounded-2xl border ${bg} px-5 py-3 flex items-center gap-3 w-full max-w-xs`}>
      <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-[11px] font-semibold ${avatarClasses(name)}`}>
        {initialsOf(name)}
      </div>
      <div className="min-w-0">
        <div className="text-[9.5px] font-semibold tracking-[0.08em] text-[color:var(--color-ink-faint)]">{label}</div>
        <div className="text-[13px] font-medium text-[color:var(--color-ink)] truncate">{name}</div>
      </div>
    </div>
  );
}
