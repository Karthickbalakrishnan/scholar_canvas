import { useState } from "react";

export default function Header({ query, setQuery, chips, removeChip, onQueryKeyDown }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/85 border-b border-[color:var(--color-hairline)]">
      <div style={{ justifyContent: "space-between" }} className="mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-6 flex-wrap md:flex-nowrap">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[color:var(--color-ink)] text-white flex items-center justify-center text-base">
            ⚡
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight text-[color:var(--color-ink)]">
              ScholarCanvas
            </div>
            <div className="hidden sm:block text-[10px] font-medium tracking-[0.12em] text-[color:var(--color-ink-faint)]">
              IEEE · ACM RESEARCH ENGINE
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="order-3 md:order-none w-full md:flex-1 md:max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap w-full rounded-xl border border-[color:var(--color-hairline)] bg-[#fafafa] px-3.5 py-2 shadow-[var(--shadow-apple-lux)] focus-within:ring-2 focus-within:ring-[color:var(--color-accent)]/30 focus-within:border-[color:var(--color-accent)]/40 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[color:var(--color-ink-faint)]">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {chips.map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-1 text-[12px] font-medium bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)] rounded-md pl-2 pr-1 py-1"
              >
                {chip}
                <button
                  onClick={() => removeChip(chip)}
                  className="w-4 h-4 rounded-sm hover:bg-[color:var(--color-accent)]/15 flex items-center justify-center text-[13px] leading-none"
                  aria-label={`Remove ${chip} filter`}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onQueryKeyDown}
              placeholder="Search papers, faculty, concepts…"
              className="flex-1 min-w-[120px] bg-transparent outline-none text-[13.5px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-faint)] py-0.5"
            />
          </div>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-4 shrink-0 ml-auto md:ml-0">
          <button
            className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/5 transition"
            aria-label="Notifications"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" className="text-[color:var(--color-ink-soft)]">
              <path d="M12 2a6 6 0 00-6 6v3.6c0 .7-.28 1.37-.78 1.87L4 15h16l-1.22-1.53a2.65 2.65 0 01-.78-1.87V8a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M9.5 18a2.5 2.5 0 005 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-1.5"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-rose-400 flex items-center justify-center text-[11px] font-semibold text-white">
                KM
              </div>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className={`text-[color:var(--color-ink-faint)] transition-transform ${profileOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-[color:var(--color-hairline)] shadow-[var(--shadow-apple-card)] py-1.5 animate-fadeIn">
                {["Saved searches", "Export history", "Account settings", "Sign out"].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-3.5 py-2 text-[13px] text-[color:var(--color-ink)] hover:bg-black/[0.03]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
