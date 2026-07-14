"use client";
/* eslint-disable @next/next/no-img-element */
// Client feedback as an Embla carousel: seamless auto-scroll (loop) that you can
// also grab and drag (dragFree). Click a screenshot (not a drag) to open it
// full-size in a lightbox. Set from images/"client feedback", cropped (status bar
// + chat headers with client phone numbers removed) and compressed to c1–c6.
// Some show the iOS long-press menu / payment amounts — included per the owner's
// choice. `alt` carries the transcribed quote.
import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import SwashWord from "./SwashWord";
import { SWASH } from "./swashGlyphs";

const BASE_SHOTS = [
  { src: "/feedback/c6.jpg", alt: "המלצת לקוח: שמענו בעצתך בנוגע להוספת תאורה, הוסיף שלמות לשלמות, תודה רבה" },
  { src: "/feedback/c1.jpg", alt: "המלצת לקוח: חייבים להגיד לך תודה רבה על העבודה היפה והתוצאה המהממת, אהבנו מאוד" },
  { src: "/feedback/c5.jpg", alt: "המלצת לקוח: ראינו את היצירה ולא יכולנו להוריד את החיוך מהפנים, השירות הכי גבוה שיש" },
  { src: "/feedback/c4.jpg", alt: "המלצת לקוח: שלמות אח יקר, אין כמוך, תודה רבה על הכל" },
  { src: "/feedback/c3.jpg", alt: "המלצת לקוח: תקשיב זה פשוט מטורף, במציאות זה כל כך מדויק ומיוחד, תודה ענקית" },
  { src: "/feedback/c2.jpg", alt: "המלצת לקוח: אין לי מילים להודות לך, באת עם לב ענק וחיבור אמיתי, תודה על הלב ועל הנשמה" },
];

// Embla quietly turns `loop` OFF when the slides can't overfill the viewport
// (the auto-scroll then hits a wall and snaps back). The 6 shots are tall and
// narrow (~1.5k px of track), so render the set 3x — enough to loop seamlessly
// even on very wide screens.
const SHOTS = [...BASE_SHOTS, ...BASE_SHOTS, ...BASE_SHOTS];

export default function Testimonials() {
  const [open, setOpen] = useState<string | null>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start", direction: "rtl", containScroll: false },
    prefersReduced
      ? []
      : [AutoScroll({ playOnInit: true, speed: 1, startDelay: 0, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  // Open the lightbox only on a real click, not at the end of a drag — measure the
  // pointer travel between press and release (version-proof; no Embla click API).
  const down = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    down.current = { x: e.clientX, y: e.clientY };
  }, []);
  const handleClick = useCallback((src: string, e: React.MouseEvent) => {
    const d = down.current;
    if (d && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8) return; // dragged
    setOpen(src);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="section testimonials" id="testimonials">
      <div className="testimonials__head">
        <span className="services-eyebrow">לקוחות ממליצים</span>
        <h2 className="testimonials__title"><SwashWord glyphs={SWASH.testimonials} label="מה הלקוחות שלנו אומרים" /></h2>
        <p className="testimonials__lead">
          הודעות אותנטיות מלקוחות מרוצים. החליקו לצדדים, ולחצו על תמונה להגדלה.
        </p>
      </div>

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {SHOTS.map((s, i) => (
              <div className="embla__slide" key={i}>
                <button
                  type="button"
                  className="marquee__btn"
                  onPointerDown={onPointerDown}
                  onClick={(e) => handleClick(s.src, e)}
                  aria-label="הגדלת ההמלצה"
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="glightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button className="glightbox__close" aria-label="סגירה" onClick={() => setOpen(null)}>
            <svg className="g-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            className="glightbox__img"
            src={open}
            alt="המלצת לקוח"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
