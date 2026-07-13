"use client";

type View = "dome" | "reel";

export default function ViewToggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  return (
    <div className="view-toggle" role="radiogroup" aria-label="Gallery view">
      <span className={`view-toggle__indicator${view === "reel" ? " is-reel" : ""}`} aria-hidden />
      <button
        type="button"
        role="radio"
        aria-checked={view === "dome"}
        className={`view-toggle__btn${view === "dome" ? " is-active" : ""}`}
        onClick={() => onChange("dome")}
      >
        Dome
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={view === "reel"}
        className={`view-toggle__btn${view === "reel" ? " is-active" : ""}`}
        onClick={() => onChange("reel")}
      >
        Reel
      </button>
    </div>
  );
}
