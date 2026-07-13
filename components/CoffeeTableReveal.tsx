"use client";

import { useEffect, useRef } from "react";

export default function CoffeeTableReveal() {
  const layerRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let raf = 0;
    let px = 0;
    let py = 0;

    const reveal = () => {
      layer.style.setProperty("--rx", `${px}px`);
      layer.style.setProperty("--ry", `${py}px`);
      layer.classList.add("is-visible");
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (!raf) raf = requestAnimationFrame(() => {
        reveal();
        raf = 0;
      });
      hideTimeout.current = setTimeout(() => {
        layer.classList.remove("is-visible");
      }, 1400);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <div ref={layerRef} className="coffee-reveal" aria-hidden="true">
      
    </div>
  );
}
