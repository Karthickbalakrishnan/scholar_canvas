import { useState } from "react";
import Toggle from "./Toggle.jsx";
import Sparkline from "./Sparkline.jsx";
import { RESEARCH_TREE } from "../data/mockData.js";

function Card({ title, children }) {
  return (
    <div className="bg-[color:var(--color-card)] rounded-2xl border border-[color:var(--color-hairline)] shadow-[var(--shadow-apple-lux)] p-4">
      <h3 className="text-[10.5px] font-semibold tracking-[0.1em] text-[color:var(--color-ink-faint)] mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function TimelineMatrix({ yearRange, setYearRange }) {
  const MIN = 2023;
  const MAX = 2026;
  const [lo, hi] = yearRange;

  const handleLo = (v) => {
    const val = Math.min(Number(v), hi);
    setYearRange([val, hi]);
  };
  const handleHi = (v) => {
    const val = Math.max(Number(v), lo);
    setYearRange([lo, val]);
  };

  const loPct = ((lo - MIN) / (MAX - MIN)) * 100;
  const hiPct = ((hi - MIN) / (MAX - MIN)) * 100;

  return (
    <Card title="TIMELINE MATRIX">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-semibold text-[color:var(--color-ink)]">{lo}</span>
        <span className="text-[13px] font-semibold text-[color:var(--color-ink)]">{hi}</span>
      </div>
      <div className="relative h-5">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 rounded-full bg-black/[0.06]" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-[color:var(--color-accent)]"
          style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }}
        />
        <input
          type="range"
          className="apple-range"
          min={MIN}
          max={MAX}
          step={1}
          value={lo}
          onChange={(e) => handleLo(e.target.value)}
        />
        <input
          type="range"
          className="apple-range"
          min={MIN}
          max={MAX}
          step={1}
          value={hi}
          onChange={(e) => handleHi(e.target.value)}
        />
      </div>
      <div className="flex justify-between mt-2 text-[10.5px] text-[color:var(--color-ink-faint)]">
        <span>{MIN}</span>
        <span>{MAX}</span>
      </div>
    </Card>
  );
}

const REGION_OPTIONS = ["World", "US", "Asia", "Europe", "Global Top 10", "Global Top 50"];

function RegionsCard({ region, setRegion }) {
  return (
    <Card title="INSTITUTIONAL REGIONS">
      <div className="flex flex-col gap-2.5">
        {REGION_OPTIONS.map((opt) => (
          <div key={opt} className="flex items-center justify-between">
            <span className="text-[13px] text-[color:var(--color-ink)]">{opt}</span>
            <Toggle
              on={region === opt}
              onClick={() => setRegion(opt)}
              ariaLabel={`Filter region ${opt}`}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

function TreeRow({ node, depth, expanded, toggleExpand, selected, toggleSelect }) {
  const hasChildren = !!node.children?.length;
  const isExpanded = expanded.has(node.key);
  const isSelected = selected.has(node.key);

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-1.5 rounded-lg px-1.5 -mx-1.5 cursor-pointer transition ${
          isSelected ? "bg-[color:var(--color-accent-soft)]" : "hover:bg-black/[0.03]"
        }`}
        style={{ paddingLeft: `${depth * 14 + 6}px` }}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(node.key);
            }}
            className="w-4 h-4 flex items-center justify-center shrink-0 text-[color:var(--color-ink-faint)]"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}
        <span
          onClick={() => toggleSelect(node.key)}
          className={`flex-1 text-[13px] ${isSelected ? "text-[color:var(--color-accent)] font-medium" : "text-[color:var(--color-ink)]"} ${depth === 0 ? "font-semibold" : ""}`}
        >
          {node.label}
        </span>
        {node.trend && <Sparkline data={node.trend} width={46} height={16} />}
      </div>
      {hasChildren && isExpanded && (
        <div className="animate-slideDown">
          {node.children.map((child) => (
            <TreeRow
              key={child.key}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              toggleExpand={toggleExpand}
              selected={selected}
              toggleSelect={toggleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ResearchAreasTree({ selectedAreas, toggleArea }) {
  const [expanded, setExpanded] = useState(new Set(["ai", "theory"]));

  const toggleExpand = (key) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <Card title="RESEARCH AREAS">
      <TreeRow
        node={RESEARCH_TREE}
        depth={0}
        expanded={expanded}
        toggleExpand={toggleExpand}
        selected={selectedAreas}
        toggleSelect={toggleArea}
      />
    </Card>
  );
}

function FacultyRankCard({ rankFilters, toggleRank }) {
  return (
    <Card title="FACULTY RANK">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[color:var(--color-ink)] flex items-center gap-1.5">
            <span className="text-amber-500">☆</span> Emerging Stars
          </span>
          <Toggle on={rankFilters.has("emerging")} onClick={() => toggleRank("emerging")} ariaLabel="Toggle emerging stars" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[color:var(--color-ink)] flex items-center gap-1.5">
            <span className="text-amber-500">☆</span> Established Laureates
          </span>
          <Toggle on={rankFilters.has("established")} onClick={() => toggleRank("established")} ariaLabel="Toggle established laureates" />
        </div>
      </div>
    </Card>
  );
}

const ARTIFACT_OPTIONS = [
  { key: "hasCode", label: "Has Verified Code" },
  { key: "hasDataset", label: "Open Dataset" },
  { key: "hasVideo", label: "Video Presentation" },
];

function ArtifactIntegrityCard({ artifactFilters, toggleArtifact }) {
  return (
    <Card title="ARTIFACT INTEGRITY">
      <div className="flex flex-col gap-2.5">
        {ARTIFACT_OPTIONS.map((opt) => (
          <div key={opt.key} className="flex items-center justify-between">
            <span className="text-[13px] text-[color:var(--color-ink)]">{opt.label}</span>
            <Toggle
              on={artifactFilters.has(opt.key)}
              onClick={() => toggleArtifact(opt.key)}
              ariaLabel={`Toggle ${opt.label}`}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Sidebar(props) {
  return (
    <aside className="w-full lg:w-[272px] shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-4">
      <TimelineMatrix yearRange={props.yearRange} setYearRange={props.setYearRange} />
      <RegionsCard region={props.region} setRegion={props.setRegion} />
      <ResearchAreasTree selectedAreas={props.selectedAreas} toggleArea={props.toggleArea} />
      <FacultyRankCard rankFilters={props.rankFilters} toggleRank={props.toggleRank} />
      <ArtifactIntegrityCard artifactFilters={props.artifactFilters} toggleArtifact={props.toggleArtifact} />
    </aside>
  );
}
