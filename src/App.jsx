import { useMemo, useState, useCallback } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TrendRadar from "./components/TrendRadar.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import LineageModal from "./components/LineageModal.jsx";
import ToastStack from "./components/ToastStack.jsx";
import { INSTITUTIONS, RESEARCH_TREE } from "./data/mockData.js";

const AREA_LABEL_TO_KEY = { Systems: "systems", Theory: "theory", Interdisciplinary: "interdisciplinary" };

function labelForKey(key) {
  if (key === RESEARCH_TREE.key) return RESEARCH_TREE.label;
  for (const child of RESEARCH_TREE.children) {
    if (child.key === key) return child.label;
    for (const grand of child.children || []) {
      if (grand.key === key) return grand.label;
    }
  }
  return key;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [searchChips, setSearchChips] = useState([]);
  const [yearRange, setYearRange] = useState([2023, 2026]);
  const [region, setRegion] = useState("World");
  const [selectedAreas, setSelectedAreas] = useState(new Set());
  const [rankFilters, setRankFilters] = useState(new Set(["emerging", "established"]));
  const [artifactFilters, setArtifactFilters] = useState(new Set());
  const [lineageFaculty, setLineageFaculty] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const pushToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const toggleArea = (key) => {
    setSelectedAreas((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleRank = (key) => {
    setRankFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleArtifact = (key) => {
    setArtifactFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleQueryKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      setSearchChips((prev) => Array.from(new Set([...prev, query.trim()])));
      setQuery("");
    }
  };

  const chips = useMemo(
    () => [...Array.from(selectedAreas).map(labelForKey), ...searchChips],
    [selectedAreas, searchChips]
  );

  const removeChip = (chip) => {
    const areaEntry = Array.from(selectedAreas).find((k) => labelForKey(k) === chip);
    if (areaEntry) {
      toggleArea(areaEntry);
      return;
    }
    setSearchChips((prev) => prev.filter((c) => c !== chip));
  };

  const searchTerms = useMemo(() => {
    const terms = [...searchChips];
    if (query.trim()) terms.push(query.trim());
    return terms.map((t) => t.toLowerCase());
  }, [searchChips, query]);

  const rows = useMemo(() => {
    const [lo, hi] = yearRange;

    const matchesRegion = (inst) => {
      if (region === "World") return true;
      if (region === "Global Top 10" || region === "Global Top 50") return inst.rankTier === region;
      return inst.region === region;
    };

    const matchesArea = (paper) => {
      if (selectedAreas.size === 0) return true;
      if (selectedAreas.has("ai")) return true;
      const areaKey = AREA_LABEL_TO_KEY[paper.area];
      if (areaKey && selectedAreas.has(areaKey)) return true;
      if (paper.subarea && selectedAreas.has(paper.subarea)) return true;
      return false;
    };

    const matchesArtifacts = (paper) => {
      for (const flag of artifactFilters) {
        if (!paper[flag]) return false;
      }
      return true;
    };

    const matchesSearch = (paper, faculty, institution) => {
      if (searchTerms.length === 0) return true;
      const haystack = `${paper.title} ${paper.venue} ${faculty.name} ${institution.name} ${paper.area} ${paper.subarea || ""}`.toLowerCase();
      return searchTerms.every((term) => haystack.includes(term));
    };

    const built = INSTITUTIONS.filter(matchesRegion)
      .map((institution) => {
        const facultyEntries = institution.faculty
          .filter((f) => rankFilters.has(f.tier))
          .map((faculty) => {
            const matchedPapers = faculty.papers.filter(
              (p) =>
                p.year >= lo &&
                p.year <= hi &&
                matchesArea(p) &&
                matchesArtifacts(p) &&
                matchesSearch(p, faculty, institution)
            );
            return { faculty, matchedPapers };
          })
          .filter((fe) => fe.matchedPapers.length > 0);

        const totalMatchedPapers = facultyEntries.reduce((sum, fe) => sum + fe.matchedPapers.length, 0);
        return { institution, facultyEntries, totalMatchedPapers };
      })
      .filter((entry) => entry.facultyEntries.length > 0);

    built.sort((a, b) => b.totalMatchedPapers - a.totalMatchedPapers);
    return built;
  }, [yearRange, region, selectedAreas, rankFilters, artifactFilters, searchTerms]);

  return (
    <div className="min-h-screen bg-[color:var(--color-canvas)]">
      <Header
        query={query}
        setQuery={setQuery}
        chips={chips}
        removeChip={removeChip}
        onQueryKeyDown={handleQueryKeyDown}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6 items-start">
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="lg:hidden w-full flex items-center justify-between bg-[color:var(--color-card)] rounded-2xl border border-[color:var(--color-hairline)] shadow-[var(--shadow-apple-lux)] px-4 py-3 text-[13px] font-medium text-[color:var(--color-ink)]"
        >
          Filters
          <span className={`text-[color:var(--color-ink-faint)] transition-transform ${filtersOpen ? "rotate-180" : ""}`}>⌄</span>
        </button>

        <div className={`${filtersOpen ? "block" : "hidden"} lg:block w-full lg:w-auto`}>
          <Sidebar
            yearRange={yearRange}
            setYearRange={setYearRange}
            region={region}
            setRegion={setRegion}
            selectedAreas={selectedAreas}
            toggleArea={toggleArea}
            rankFilters={rankFilters}
            toggleRank={toggleRank}
            artifactFilters={artifactFilters}
            toggleArtifact={toggleArtifact}
          />
        </div>

        <main className="flex-1 min-w-0 w-full flex flex-col gap-4">
          <div className="flex items-start gap-4 flex-wrap xl:flex-nowrap">
            <div className="flex-1 min-w-[260px] bg-[color:var(--color-card)] rounded-2xl border border-[color:var(--color-hairline)] shadow-[var(--shadow-apple-lux)] px-5 py-4 flex items-center">
              <p className="text-[13.5px] text-[color:var(--color-ink)]">
                Displaying <span className="font-semibold">{rows.length}</span> active institutions. Sorted by{" "}
                <span className="font-semibold">Publication Volume</span>.
              </p>
            </div>
            <TrendRadar />
          </div>

          <Leaderboard rows={rows} onOpenLineage={setLineageFaculty} onAction={pushToast} />
        </main>
      </div>

      <LineageModal faculty={lineageFaculty} onClose={() => setLineageFaculty(null)} />
      <ToastStack toasts={toasts} />
    </div>
  );
}
