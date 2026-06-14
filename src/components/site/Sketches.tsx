"use client";
/* eslint-disable @next/next/no-img-element */
// "Behind the scenes" section with two CTAs: sketches (opens a modal window of
// the sketch gallery) and the workshop (redirects to the /workshop page).
import { useState, useEffect } from "react";
import Link from "next/link";

const COUNT = 13;
const SKETCHES = Array.from({ length: COUNT }, (_, i) => `/sketch/sketch-${i + 1}.png`);

export default function Sketches() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="section sketches" id="sketches">
      <div className="sketches__inner">
        <span className="services-eyebrow">מאחורי הקלעים</span>
        <h2 className="sketches__title">כך נולדת כל יצירה</h2>
        <p className="sketches__lead">
          מהסקיצה הראשונה ועד העבודה בסדנה — הציצו אל התהליך שמאחורי כל יצירה.
        </p>
        <div className="sketches__actions">
          <button
            type="button"
            className="btn btn--dark"
            onClick={() => setOpen(true)}
          >
            לצפייה בסקיצות
          </button>
          <Link href="/workshop" className="btn btn--outline">
            הסדנה שלנו ←
          </Link>
        </div>
      </div>

      {open && (
        <div
          className="sketch-modal"
          role="dialog"
          aria-modal="true"
          aria-label="גלריית סקיצות"
          onClick={() => setOpen(false)}
        >
          <div className="sketch-modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="sketch-modal__bar">
              <span className="sketch-modal__title">סקיצות ותכנון</span>
              <button
                type="button"
                className="sketch-modal__close"
                aria-label="סגירה"
                onClick={() => setOpen(false)}
              >
                <svg className="g-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="sketch-modal__grid">
              {SKETCHES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`סקיצה ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
