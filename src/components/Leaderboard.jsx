import { useState } from "react";
import { avatarClasses, initialsOf } from "../utils/helpers.js";
import PaperRow from "./PaperRow.jsx";

function ChevronDown({ open }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className={`transition-transform text-[color:var(--color-ink-faint)] ${open ? "rotate-180" : ""}`}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FacultyCard({ entry, active, onClick }) {
  const { faculty, matchedPapers } = entry;
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl border p-3 transition flex items-center gap-3 ${
        active
          ? "border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent-soft)]"
          : "border-[color:var(--color-hairline)] bg-white hover:border-black/15"
      }`}
    >
      <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-semibold ${avatarClasses(faculty.avatarSeed)}`}>
        {initialsOf(faculty.name)}
      </div>
      <div className="min-w-0">
        <div className="text-[12.5px] font-medium text-[color:var(--color-ink)] truncate flex items-center gap-1">
          {faculty.name}
          {faculty.tier === "established" && <span className="text-amber-500 text-[10px]">☆</span>}
        </div>
        <div className="text-[11px] text-[color:var(--color-ink-faint)]">{matchedPapers.length} Papers matched</div>
      </div>
    </button>
  );
}

function FacultyDetailsPanel({ entry, onOpenLineage, onAction }) {
  const { faculty, matchedPapers } = entry;
  return (
    <div className="animate-slideDown mt-3 rounded-2xl border border-[color:var(--color-hairline)] bg-[#fbfbfc] p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[13px] font-semibold ${avatarClasses(faculty.avatarSeed)}`}>
            {initialsOf(faculty.name)}
          </div>
          <div>
            <div className="text-[13.5px] font-semibold text-[color:var(--color-ink)]">{faculty.name}</div>
            <div className="text-[11px] text-[color:var(--color-ink-faint)]">
              {matchedPapers.length} Papers matched · {faculty.tier === "established" ? "Established Laureate" : "Emerging Star"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenLineage(faculty)}
            className="text-[11.5px] font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)] flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-black/5"
          >
            🌳 Lineage Tree
          </button>
          <button
            onClick={() => onAction("Faculty profile exported")}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[color:var(--color-ink-faint)] hover:bg-black/5"
            aria-label="Export"
          >
            ⇩
          </button>
        </div>
      </div>
      <div className="divide-y divide-[color:var(--color-hairline)]">
        {matchedPapers.map((paper) => (
          <PaperRow key={paper.id} paper={paper} onAction={onAction} />
        ))}
        {matchedPapers.length === 0 && (
          <p className="text-[12px] text-[color:var(--color-ink-faint)] py-3 px-1">No papers match the current filters.</p>
        )}
      </div>
    </div>
  );
}

function InstitutionRow({ rank, entry, onOpenLineage, onAction }) {
  const [open, setOpen] = useState(false);
  const [activeFacultyId, setActiveFacultyId] = useState(null);
  const { institution, facultyEntries, totalMatchedPapers } = entry;

  const activeFacultyEntry = facultyEntries.find((f) => f.faculty.id === activeFacultyId);

  return (
    <div className="border-b border-[color:var(--color-hairline)] last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 py-3.5 px-2 hover:bg-black/[0.015] transition text-left"
      >
        <span className="text-[12px] font-semibold text-[color:var(--color-ink-faint)] w-8">#{rank}</span>
        <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white text-[12px] font-bold ${institution.color}`}>
          {institution.initial}
        </div>
        <span className="flex-1 min-w-0 text-[13.5px] font-medium text-[color:var(--color-ink)] truncate">{institution.name}</span>
        <span className="text-[11.5px] sm:text-[12px] text-[color:var(--color-ink-soft)] tabular-nums shrink-0 whitespace-nowrap">
          {totalMatchedPapers} Papers | {facultyEntries.length} Faculty
        </span>
        <ChevronDown open={open} />
      </button>

      {open && (
        <div className="px-2 pb-4 animate-slideDown">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {facultyEntries.map((fe) => (
              <FacultyCard
                key={fe.faculty.id}
                entry={fe}
                active={fe.faculty.id === activeFacultyId}
                onClick={() => setActiveFacultyId((cur) => (cur === fe.faculty.id ? null : fe.faculty.id))}
              />
            ))}
          </div>
          {activeFacultyEntry && (
            <FacultyDetailsPanel entry={activeFacultyEntry} onOpenLineage={onOpenLineage} onAction={onAction} />
          )}
        </div>
      )}
    </div>
  );
}

export default function Leaderboard({ rows, onOpenLineage, onAction }) {
  return (
    <div className="bg-[color:var(--color-card)] rounded-2xl border border-[color:var(--color-hairline)] shadow-[var(--shadow-apple-card)]">
      <div className="flex items-center gap-4 px-4 py-3 border-b border-[color:var(--color-hairline)] text-[10.5px] font-semibold tracking-[0.08em] text-[color:var(--color-ink-faint)]">
        <span className="w-8">RANK #</span>
        <span className="w-8" />
        <span className="flex-1">UNIVERSITY</span>
        <span className="hidden sm:inline">MATCHED AUTHORS</span>
        <span className="w-4" />
      </div>
      <div>
        {rows.map((entry, i) => (
          <InstitutionRow
            key={entry.institution.id}
            rank={i + 1}
            entry={entry}
            onOpenLineage={onOpenLineage}
            onAction={onAction}
          />
        ))}
        {rows.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-[13.5px] text-[color:var(--color-ink-soft)]">No institutions match the current filters.</p>
            <p className="text-[12px] text-[color:var(--color-ink-faint)] mt-1">Try widening the timeline range or clearing a filter chip.</p>
          </div>
        )}
      </div>
    </div>
  );
}
