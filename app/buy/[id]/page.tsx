"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPlates, formatPrice } from "@/lib/data";
import Footer from "@/components/Footer";

export default function BuyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const plate = allPlates.find((p) => p.id === id);
  const [step, setStep] = useState(0);

  if (!plate) return notFound();

  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const revealTextRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      raf = 0;
      const height = window.innerHeight;

      // 1. Hero Image subtle scale and fade
      if (heroSectionRef.current && heroImageRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        // rect.top is 0 at top, becomes negative as we scroll down
        const scrolled = -rect.top;
        if (scrolled >= 0) {
          const scale = Math.max(0.85, 1 - scrolled / (height * 2));
          const opacity = Math.max(0, 1 - scrolled / height);
          heroImageRef.current.style.transform = `scale(${scale})`;
          heroImageRef.current.style.opacity = String(opacity);
        } else {
          heroImageRef.current.style.transform = `scale(1)`;
          heroImageRef.current.style.opacity = `1`;
        }
      }

      // 2. Text Reveal
      if (revealTextRef.current) {
        const rect = revealTextRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (height * 0.9 - rect.top) / (height * 0.4)));
        const yOffset = (1 - progress) * 80;
        revealTextRef.current.style.transform = `translateY(${yOffset}px)`;
        revealTextRef.current.style.opacity = String(progress);
      }

      // 3. Details Section Reveal
      if (detailsRef.current) {
        const rect = detailsRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (height - rect.top) / (height * 0.3)));
        const yOffset = (1 - progress) * 60;
        detailsRef.current.style.transform = `translateY(${yOffset}px)`;
        detailsRef.current.style.opacity = String(progress);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="buy-page">
      <header className="buy-page__topbar">
        <Link href="/" className="buy-page__back">
          ← Back to archive
        </Link>
        <span className="buy-page__logo">MAGNUM EDITIONS</span>
        <span className="buy-page__cart">Cart (0)</span>
      </header>

      <section ref={heroSectionRef} className="buy-page__hero">
        <img
          ref={heroImageRef}
          src={plate.src}
          alt={plate.alt}
          className="buy-page__hero-img"
          draggable={false}
        />
      </section>

      <section className="buy-page__story">
        <h2 ref={revealTextRef} className="buy-page__reveal-text" style={{ opacity: 0, transform: 'translateY(80px)' }}>
          A moment in time, frozen forever.
          <br />
          <span>{plate.location}, {plate.year}.</span>
        </h2>
      </section>

      <section className="buy-page__details" ref={detailsRef} style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <div className="buy-page__info">
          <h3>{plate.alt}</h3>
          <p className="buy-page__photographer">By {plate.photographer}</p>
          <hr />
          <ul className="buy-page__specs">
            <li><strong>Plate No:</strong> {plate.plateNo}</li>
            <li><strong>Year:</strong> {plate.year}</li>
            <li><strong>Location:</strong> {plate.location}</li>
            <li><strong>Edition:</strong> Limited to {plate.edition} prints</li>
            <li><strong>Format:</strong> 8×10″ archival pigment print</li>
            <li><strong>Authentication:</strong> Certified stamped</li>
          </ul>
        </div>

        <div className="buy-page__checkout">
          <div className="buy-page__price">{formatPrice(plate.id)}</div>
          
          {step === 0 && (
            <div className="buy-page__step fade-in">
              <p className="buy-page__tax">Taxes and shipping calculated at checkout.</p>
              <button className="buy-page__buy-btn" onClick={() => setStep(1)}>Proceed to Checkout</button>
            </div>
          )}

          {step === 1 && (
            <form className="buy-page__form fade-in" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="buy-page__step-indicator">Step 1 of 2: Shipping</div>
              <p className="buy-page__form-title">Shipping Details</p>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="text" placeholder="Shipping Address" required />
              <div className="buy-page__form-row">
                <input type="text" placeholder="City" required />
                <input type="text" placeholder="Postal Code" required />
              </div>
              <input type="text" placeholder="Country" required />
              <button type="submit" className="buy-page__buy-btn buy-page__buy-btn--pay">Next: Payment</button>
            </form>
          )}

          {step === 2 && (
            <form className="buy-page__form fade-in" onSubmit={(e) => { e.preventDefault(); alert('Order placed successfully!'); }}>
              <div className="buy-page__step-indicator">Step 2 of 2: Payment</div>
              <p className="buy-page__form-title">Payment Details</p>
              <input type="text" placeholder="Name on Card" required />
              <input type="text" placeholder="Card Number" required />
              <div className="buy-page__form-row">
                <input type="text" placeholder="MM/YY" required />
                <input type="text" placeholder="CVC" required />
              </div>
              <button type="submit" className="buy-page__buy-btn buy-page__buy-btn--pay">Pay {formatPrice(plate.id)}</button>
              <button type="button" className="buy-page__back-btn" onClick={() => setStep(1)}>← Back to Shipping</button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
