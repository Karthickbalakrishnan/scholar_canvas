export default function Toggle({ on, onClick, ariaLabel }) {
  return (
    <button
      type="button"
      className="apple-toggle"
      data-on={on ? "true" : "false"}
      onClick={onClick}
      aria-pressed={on}
      aria-label={ariaLabel}
    >
      <span className="knob" />
    </button>
  );
}
