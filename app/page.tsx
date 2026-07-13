"use client";

import { useState } from "react";
import DomeGallery from "@/components/DomeGallery";
import ReelGallery from "@/components/ReelGallery";
import ViewToggle from "@/components/ViewToggle";
import HeroIntro from "@/components/HeroIntro";
import Footer from "@/components/Footer";
import { allPlates, photographers } from "@/lib/data";

export default function Home() {
  const [view, setView] = useState<"dome" | "reel">("dome");

  return (
    <>
      <HeroIntro />

      <div className="controlbar" id="catalogue">
        <div className="controlbar__meta">
          <span className="controlbar__mark">MAGNUM EDITIONS</span>
          <span className="controlbar__sep" aria-hidden>
            /
          </span>
          <span className="controlbar__count">{allPlates.length} plates</span>
          <span className="controlbar__sep" aria-hidden>
            /
          </span>
          <span className="controlbar__count">{photographers.length} photographers</span>
        </div>
        <ViewToggle view={view} onChange={setView} />
      </div>

      <main className="stage-wrap">
        {view === "dome" ? (
          <div className="dome-wrap">
            <DomeGallery plates={allPlates} />
            <p className="dome-hint">Drag to rotate · click a plate to open it</p>
          </div>
        ) : (
          <ReelGallery photographers={photographers} />
        )}
      </main>

      <Footer />
    </>
  );
}
