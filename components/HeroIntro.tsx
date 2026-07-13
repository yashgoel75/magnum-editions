"use client";

import { useEffect, useRef } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export default function HeroIntro() {
  const introRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);
  const magnumTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const intro = introRef.current;
      if (!intro) return;
      const rect = intro.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;

      if (cueRef.current) {
        cueRef.current.style.opacity = String(1 - clamp01(progress / 0.1));
      }

      if (magnumTextRef.current) {
        // Start very large (scale 15), scale down to 0 as we scroll
        const t = clamp01(progress / 0.6);
        const eased = easeOutCubic(t);
        const currentScale = 0.5 + (1 - eased) * 15;
        
        let currentOpacity = 0;
        if (progress < 0.1) {
          currentOpacity = progress / 0.1;
        } else if (progress < 0.4) {
          currentOpacity = 1;
        } else {
          currentOpacity = 1 - clamp01((progress - 0.4) / 0.25);
        }
        
        magnumTextRef.current.style.transform = `scale(${currentScale})`;
        magnumTextRef.current.style.opacity = String(currentOpacity);
      }

      if (heroRef.current) {
        const t = clamp01((progress - 0.55) / 0.35);
        const eased = easeOutCubic(t);
        heroRef.current.style.opacity = String(eased);
        heroRef.current.style.transform = `translateY(${(1 - eased) * 34}px)`;
      }
      if (topbarRef.current) {
        topbarRef.current.style.opacity = String(clamp01(progress / 0.08));
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={introRef} className="intro">
      <div className="intro__sticky">
        <div ref={topbarRef} className="topbar" style={{ opacity: 0 }}>
          <span className="topbar__mark">MAGNUM EDITIONS</span>
          <nav className="topbar__nav">
            <a href="#catalogue">Catalogue</a>
            <a href="#about">About the archive</a>
          </nav>
        </div>

        <div ref={cueRef} className="intro__cue">
          <span>Scroll</span>
          <span className="intro__cue-line" />
        </div>

        <div className="intro__magnum" aria-hidden="true">
          <div ref={magnumTextRef} className="intro__magnum-text">
            MAGNUM
          </div>
        </div>

        <div ref={heroRef} className="hero__copy hero__copy--intro" style={{ opacity: 0 }}>
          <span className="hero__eyebrow">The Catalogue — Vol. III</span>
          <h1>
            Eighty-five frames,
            <br />
            <em>five witnesses.</em>
          </h1>
          <p>
            Archival pigment prints, editioned by hand. Turn the dome to browse the whole
            collection at once, or drop into the reel to move through each photographer&rsquo;s
            contact sheet, frame by frame.
          </p>
          <a className="hero__cue" href="#catalogue">
            Enter the archive <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </div>
  );
}
