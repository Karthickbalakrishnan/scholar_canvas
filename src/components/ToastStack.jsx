export default function ToastStack({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2.5 items-end">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-toastIn bg-[color:var(--color-ink)] text-white rounded-xl shadow-[var(--shadow-apple-pop)] px-4 py-3 flex items-center gap-2.5 min-w-[240px] max-w-[320px]"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/90 flex items-center justify-center shrink-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[12.5px] leading-snug">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
