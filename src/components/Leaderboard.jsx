import { useState } from "react";

export default function Leaderboard({ rows, onOpenLineage, onAction }) {
  // Track expanded institutions
  const [expandedInsts, setExpandedInsts] = useState(new Set());
  // Track expanded faculty members to view their specific papers
  const [expandedFaculty, setExpandedFaculty] = useState(new Set());
  // Interactive state for institutional tracking/bookmarking
  const [bookmarkedInsts, setBookmarkedInsts] = useState(new Set());

  const toggleInst = (id) => {
    setExpandedInsts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFaculty = (facName, e) => {
    e.stopPropagation(); // Prevent bubbling to parent elements
    setExpandedFaculty((prev) => {
      const next = new Set(prev);
      if (next.has(facName)) next.delete(facName);
      else next.add(facName);
      return next;
    });
  };

  const toggleBookmark = (id, name, e) => {
    e.stopPropagation();
    setBookmarkedInsts((prev) => {
      const next = new Set(prev);
      const isBookmarked = next.has(id);
      if (isBookmarked) {
        next.delete(id);
        onAction(`Removed ${name} from your monitored hubs.`);
      } else {
        next.add(id);
        onAction(`Now actively monitoring research updates from ${name}!`);
      }
      return next;
    });
  };

  if (rows.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-[color:var(--color-hairline)] rounded-xl">
        <span className="text-3xl">🔍</span>
        <h3 className="mt-2 text-sm font-semibold text-[color:var(--color-ink)]">No matching nodes found</h3>
        <p className="mt-1 text-xs text-[color:var(--color-ink-faint)]">Try adjusting your timeline or widening regional parameters.</p>
      </div>
    );
  }

  return (
    <div className="w-full select-none">
      {/* Table Header Wrapper */}
      <div className="grid grid-cols-12 gap-4 bg-slate-50 dark:bg-zinc-900 px-6 py-3.5 border-b border-[color:var(--color-hairline)] text-[11px] font-bold uppercase tracking-wider text-[color:var(--color-ink-faint)]">
        <div className="col-span-1 text-center">Rank</div>
        <div className="col-span-6 md:col-span-7">Institution / Knowledge Hub</div>
        <div className="col-span-3 md:col-span-2 text-center">Faculty Pool</div>
        <div className="col-span-2 text-right">Pubs Count</div>
      </div>

      {/* Main Row Renderer */}
      <div className="divide-y divide-[color:var(--color-hairline)]">
        {rows.map((row, index) => {
          const inst = row.institution;
          const isExpanded = expandedInsts.has(inst.id);
          const isBookmarked = bookmarkedInsts.has(inst.id);

          return (
            <div 
              key={inst.id} 
              className={`transition-colors duration-150 ${isExpanded ? "bg-slate-50/40 dark:bg-zinc-900/20" : "hover:bg-slate-50/70 dark:hover:bg-zinc-900/40"}`}
            >
              {/* Parent Row Click Target */}
              <div 
                onClick={() => toggleInst(inst.id)}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer text-[14px]"
              >
                {/* Numeric Metric Badge */}
                <div className="col-span-1 flex justify-center">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold ${
                    index < 3 ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}>
                    {index + 1}
                  </span>
                </div>

                {/* Core Title Details Node */}
                <div className="col-span-6 md:col-span-7 flex items-center gap-3 min-w-0">
                  <button
                    onClick={(e) => toggleBookmark(inst.id, inst.name, e)}
                    className={`text-[16px] transition-transform active:scale-75 ${isBookmarked ? "text-amber-500" : "text-slate-300 dark:text-zinc-600 hover:text-slate-400"}`}
                    title="Toggle active radar monitoring"
                  >
                    {isBookmarked ? "★" : "☆"}
                  </button>
                  <div className="truncate">
                    <p className="font-semibold text-[color:var(--color-ink)] truncate">{inst.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[color:var(--color-ink-faint)]">
                      <span>{inst.region}</span>
                      <span>•</span>
                      <span className="px-1.5 py-0.2 bg-slate-100 dark:bg-zinc-800 rounded text-[10px] uppercase font-medium tracking-wide">
                        {inst.rankTier}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary Aggregation Details */}
                <div className="col-span-3 md:col-span-2 text-center text-slate-500 dark:text-zinc-400 font-medium">
                  {row.facultyEntries.length} Active
                </div>

                {/* Primary Metric KPI with Interactive Chevron Indicator */}
                <div className="col-span-2 flex items-center justify-end gap-3 font-mono font-bold text-[color:var(--color-ink)]">
                  <span>{row.totalMatchedPapers}</span>
                  <span className={`text-[10px] text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </div>
              </div>

              {/* EXPANSION PANEL: The Progressive Disclosure Dossier */}
              {isExpanded && (
                <div className="bg-white dark:bg-zinc-950/40 border-t border-[color:var(--color-hairline)] px-6 py-5 ml-12 mr-6 mb-4 rounded-xl shadow-inner border border-dashed border-slate-200 dark:border-zinc-800 animate-fadeIn">
                  <div className="mb-4 flex items-center justify-between border-b border-slate-100 dark:border-zinc-900 pb-2">
                    <h4 className="text-[12px] uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400">
                      Faculty Roster & Contribution Mapping
                    </h4>
                    <span className="text-[11px] text-[color:var(--color-ink-faint)]">
                      Click any professor to parse individual publications
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {row.facultyEntries.map(({ faculty, matchedPapers }) => {
                      const isFacExpanded = expandedFaculty.has(faculty.name);
                      
                      return (
                        <div 
                          key={faculty.name}
                          className="border border-slate-100 dark:border-zinc-900 rounded-lg overflow-hidden transition-all duration-150 bg-slate-50/20 dark:bg-zinc-900/10"
                        >
                          {/* Faculty Row Interactive Hub */}
                          <div
                            onClick={(e) => toggleFaculty(faculty.name, e)}
                            className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900/60"
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                <span className="font-semibold text-[13px] text-[color:var(--color-ink)]">{faculty.name}</span>
                                <span className={`ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                  faculty.tier === "established" 
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                }`}>
                                  {faculty.tier}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className="text-[12px] text-slate-500 font-medium">
                                {matchedPapers.length} matched output{matchedPapers.length > 1 ? "s" : ""}
                              </span>
                              <div className="flex gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenLineage(faculty);
                                  }}
                                  className="px-2 py-1 bg-white dark:bg-zinc-800 border border-[color:var(--color-hairline)] rounded text-[11px] font-medium text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-700"
                                >
                                  View Genealogy Tree 🧬
                                </button>
                                <span className={`text-[9px] text-slate-400 p-1 self-center transition-transform ${isFacExpanded ? "rotate-180" : ""}`}>
                                  ▼
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* NESTED LEVEL 2 EXPANSION: Research Papers Inventory */}
                          {isFacExpanded && (
                            <div className="bg-white dark:bg-zinc-900/30 border-t border-slate-100 dark:border-zinc-900 px-4 py-3 divide-y divide-slate-100 dark:divide-zinc-900/60">
                              {matchedPapers.map((paper, pIdx) => (
                                <div key={pIdx} className="py-2.5 first:pt-1 last:pb-1 flex flex-col md:flex-row md:items-center justify-between gap-2 text-[12.5px]">
                                  <div className="max-w-3xl">
                                    <p className="font-medium text-[color:var(--color-ink)] leading-snug">{paper.title}</p>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[color:var(--color-ink-faint)]">
                                      <span className="font-bold text-slate-700 dark:text-zinc-300">{paper.venue}</span>
                                      <span>({paper.year})</span>
                                      <span>•</span>
                                      <span className="italic">{paper.area} ({paper.subarea})</span>
                                    </div>
                                  </div>

                                  {/* Open-Source Verification Badges */}
                                  <div className="flex items-center gap-1.5 self-start md:self-center shrink-0">
                                    {paper.code && (
                                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-semibold">
                                        💻 Code Available
                                      </span>
                                    )}
                                    {paper.dataset && (
                                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-semibold">
                                        📊 Dataset Repo
                                      </span>
                                    )}
                                    {!paper.code && !paper.dataset && (
                                      <span className="text-[11px] text-slate-400 italic">Standard Entry</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}