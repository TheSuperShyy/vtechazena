"use client";
/* eslint-disable @next/next/no-img-element */
// Client feedback as an Embla carousel: seamless auto-scroll (loop) that you can
// also grab and drag (dragFree). Click a screenshot (not a drag) to open it
// full-size in a lightbox. Cropped set from /cropped-feedback.
// Note 1.jpg shows a location map, 2.jpg a payment link, 7/8.jpg the iOS menu —
// included per the owner's choice. `alt` carries the transcribed quote.
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const SHOTS = [
  { src: "/feedback/9.jpg", alt: "המלצת לקוח: אחי היקר, תודה רבה — יצא מדהים" },
  { src: "/feedback/3.jpg", alt: "המלצת לקוח: תודה רבה על העבודה המהממת, מקצועי ודואג לכל פרט — ממליצים בחום" },
  { src: "/feedback/1.jpg", alt: "המלצת לקוח: תודה רבה על העבודה היפה, שנזכה לבניין בית המקדש בקרוב" },
  { src: "/feedback/6.jpg", alt: "המלצת לקוח: כולם עפים על האמנות שלך — המקום הכי יפה בבית" },
  { src: "/feedback/4.jpg", alt: "המלצת לקוח: כולם התלהבו מאוד מהעבודה המדהימה — אין עליך" },
  { src: "/feedback/2.jpg", alt: "המלצת לקוח: אין מילים, פשוט מושלם — תודה רבה ויישר כוח" },
  { src: "/feedback/5.jpg", alt: "המלצת לקוח: כבר היית אצלינו — ואין אחד שנכנס לבית ולא מתפעל" },
  { src: "/feedback/8.jpg", alt: "המלצת לקוח: אנחנו ממש מרוצים ובהלם — התיקון הנכון והראוי לחורבן המקדש" },
  { src: "/feedback/7.jpg", alt: "המלצת לקוח: השקעתי בכל פינה בבית, אבל היצירה שלך הכי יפה" },
];

export default function Testimonials() {
  const [open, setOpen] = useState<string | null>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start", direction: "rtl", containScroll: false },
    prefersReduced
      ? []
      : [AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  // Open the lightbox only on a real click, not at the end of a drag.
  const handleClick = useCallback(
    (src: string) => {
      if (!emblaApi || emblaApi.clickAllowed()) setOpen(src);
    },
    [emblaApi]
  );

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
        <h2 className="testimonials__title">מה הלקוחות אומרים</h2>
        <p className="testimonials__lead">
          הודעות אמיתיות מלקוחות מרוצים — החליקו לצדדים, ולחצו על תמונה להגדלה.
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
                  onClick={() => handleClick(s.src)}
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
