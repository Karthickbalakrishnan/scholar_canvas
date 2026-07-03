import TldrTooltip from "./TldrTooltip.jsx";

export default function PaperRow({ paper, onAction }) {
  return (
    <div className="flex items-start gap-2.5 py-2.5 px-3 rounded-xl hover:bg-black/[0.02] transition group">
      <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent)] mt-1.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <TldrTooltip tldr={paper.tldr}>
            <span className="text-[13px] font-medium text-[color:var(--color-ink)] cursor-default">
              {paper.title}
            </span>
          </TldrTooltip>
          <span className="text-[11.5px] font-semibold text-[color:var(--color-ink-soft)]">
            [{paper.venue}]
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          {paper.hasCode && (
            <span className="text-[9.5px] font-semibold tracking-wide bg-[color:var(--color-mint-soft)] text-[color:var(--color-mint)] rounded-full px-2 py-[3px]">
              HAS VERIFIED CODE
            </span>
          )}
          {paper.hasDataset && (
            <span className="text-[9.5px] font-semibold tracking-wide bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)] rounded-full px-2 py-[3px]">
              OPEN DATASET
            </span>
          )}
          {paper.hasVideo && (
            <span className="text-[9.5px] font-semibold tracking-wide bg-violet-50 text-violet-700 rounded-full px-2 py-[3px]">
              VIDEO PRESENTATION
            </span>
          )}
        </div>
      </div>
      <div className="hidden group-hover:flex items-center gap-1 shrink-0 pt-0.5">
        <button
          onClick={() => onAction(`Citation for "${paper.title.slice(0, 32)}…" exported`)}
          className="text-[10.5px] font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)] px-2 py-1 rounded-md hover:bg-black/5"
        >
          Cite
        </button>
        {paper.hasDataset && (
          <button
            onClick={() => onAction("Dataset download started")}
            className="text-[10.5px] font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)] px-2 py-1 rounded-md hover:bg-black/5"
          >
            Dataset
          </button>
        )}
        <a
          href={paper.url}
          target="_blank"
          rel="noreferrer"
          onClick={() => onAction("Opening publication in a new tab")}
          className="text-[10.5px] font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)] px-2 py-1 rounded-md hover:bg-black/5"
        >
          View ↗
        </a>
      </div>
    </div>
  );
}
