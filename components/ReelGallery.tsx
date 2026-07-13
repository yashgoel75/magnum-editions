"use client";

import * as React from "react";
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import type { Photographer } from "@/lib/data";

function CoverFlowRow({ photographer }: { photographer: Photographer }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startActive: number } | null>(null);
  const plates = photographer.plates;

  const goTo = useCallback(
    (i: number) => setActive(clampIndex(i, plates.length)),
    [plates.length]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startActive: active };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 60) {
      const dir = dx > 0 ? -1 : 1;
      goTo(dragState.current.startActive + dir);
      dragState.current.startX = e.clientX;
      dragState.current.startActive = dragState.current.startActive + dir;
    }
  };
  const onPointerUp = () => {
    dragState.current = null;
  };

  return (
    <section className="reel-row" aria-label={`${photographer.name} — coverflow`}>
      <header className="reel-row__head">
        <h3>{photographer.name}</h3>
        <p>{photographer.note}</p>
        <span className="reel-row__count">{String(plates.length).padStart(2, "0")} plates</span>
      </header>

      <div
        className="reel-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        role="listbox"
        tabIndex={0}
        aria-activedescendant={plates[active]?.id}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") goTo(active + 1);
          if (e.key === "ArrowLeft") goTo(active - 1);
        }}
      >
        <div className="reel-stage">
          {plates.map((plate, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const style: React.CSSProperties = {
              transform: `translateX(${offset * 62}%) translateZ(${-abs * 140}px) rotateY(${clampDeg(-offset * 46)}deg) scale(${isActive ? 1 : 0.78})`,
              zIndex: 50 - abs,
              opacity: abs > 3 ? 0 : 1,
              pointerEvents: abs > 3 ? "none" : "auto",
            };
            return (
              <button
                key={plate.id}
                id={plate.id}
                role="option"
                aria-selected={isActive}
                className={`reel-card${isActive ? " is-active" : ""}`}
                style={style}
                onClick={() => (isActive ? undefined : goTo(i))}
              >
                <img src={plate.src} alt={plate.alt} draggable={false} />
                <span className="reel-card__sheen" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="reel-row__foot">
        <button
          className="reel-nav"
          onClick={() => goTo(active - 1)}
          aria-label="Previous plate"
        >
          ←
        </button>
        <div className="reel-caption">
          <span className="reel-caption__no">{plates[active]?.plateNo}</span>
          <span className="reel-caption__meta">
            {plates[active]?.alt} · {plates[active]?.location}, {plates[active]?.year}
          </span>
          <Link href={`/buy/${plates[active]?.id}`} className="reel-caption__link">
            Learn More <span aria-hidden="true">→</span>
          </Link>
        </div>
        <button className="reel-nav" onClick={() => goTo(active + 1)} aria-label="Next plate">
          →
        </button>
      </div>
    </section>
  );
}

function clampIndex(i: number, len: number) {
  return Math.max(0, Math.min(len - 1, i));
}
function clampDeg(d: number) {
  return Math.max(-70, Math.min(70, d));
}

export default function ReelGallery({ photographers }: { photographers: Photographer[] }) {
  return (
    <div className="reel-gallery">
      {photographers.map((p) => (
        <CoverFlowRow key={p.slug} photographer={p} />
      ))}
    </div>
  );
}
