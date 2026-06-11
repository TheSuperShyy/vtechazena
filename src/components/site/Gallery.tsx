"use client";
/* eslint-disable @next/next/no-img-element */
// Filterable gallery + lightbox (after the 21st.dev GalleryGridBlock the client
// shared). Category filter = the three series; clicking a tile opens a lightbox
// with prev/next + keyboard nav, and the caption keeps the series' price and a
// WhatsApp link. Built natively (no framer-motion; inline SVG icons), RTL.
import { useState, useEffect, useCallback } from "react";
import type { KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WA } from "./Hero";

const SERIES = [
  { key: "יסוד", price: "1,800–2,500 ₪", dir: "tiers/base", images: ["1.png", "2.png", "3.png", "4.png", "7.png"] },
  { key: "הדר", price: "3,000–5,500 ₪", dir: "tiers/advance", images: ["a-1.png", "a-2.png", "a-3.png"] },
  { key: "תפארת", price: "7,000 ₪ ומעלה", dir: "tiers/premium", images: ["p1.png", "p2.png", "p3.png", "p4.png", "p5.png"] },
];

type Item = { id: string; url: string; cat: string; price: string };
const ITEMS: Item[] = SERIES.flatMap((s) =>
  s.images.map((img) => ({ id: `${s.dir}/${img}`, url: `/${s.dir}/${img}`, cat: s.key, price: s.price }))
);
const CATEGORIES = ["הכול", ...SERIES.map((s) => s.key)];

const ZoomIcon = () => (
  <svg className="g-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
  </svg>
);
const XIcon = () => (
  <svg className="g-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const ChevR = () => (
  <svg className="g-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
);
const ChevL = () => (
  <svg className="g-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
);

export default function Gallery() {
  const [filter, setFilter] = useState("הכול");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === "הכול" ? ITEMS : ITEMS.filter((it) => it.cat === filter);
  const selectedItem = ITEMS.find((it) => it.id === selected) ?? null;

  const step = useCallback(
    (dir: number) =>
      setSelected((cur) => {
        if (cur === null) return cur;
        const idx = filtered.findIndex((it) => it.id === cur);
        if (idx === -1) return filtered[0]?.id ?? null;
        return filtered[(idx + dir + filtered.length) % filtered.length].id;
      }),
    [filtered]
  );

  // Lightbox keyboard nav (RTL: Right = previous, Left = next).
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, step]);

  const onTileKey = (e: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(id);
    }
  };

  return (
    <section className="section gallery" id="series" aria-labelledby="gallery-heading">
      <div className="gallery__head">
        <span className="services-eyebrow">גלריה</span>
        <h2 id="gallery-heading" className="gallery__title">העבודות שלנו</h2>
        <p className="gallery__lead">עיינו בעבודות לפי סדרה — לחצו על תמונה להגדלה.</p>
      </div>

      <div className="gallery__filters" role="group" aria-label="קטגוריות">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`gallery__filter${filter === c ? " active" : ""}`}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="gallery__grid" role="list">
        <AnimatePresence mode="popLayout">
          {filtered.map((it, i) => (
            <motion.div
              key={it.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              role="listitem"
            >
              <button
                className="gtile"
                onClick={() => setSelected(it.id)}
                onKeyDown={(e) => onTileKey(e, it.id)}
                aria-label={`הגדלת תמונה — סדרת ${it.cat}`}
              >
                <img className="gtile__img" src={it.url} alt={`סדרת ${it.cat}`} loading="lazy" decoding="async" />
                <span className="gtile__overlay" aria-hidden="true">
                  <ZoomIcon />
                  <span className="gtile__badge">סדרת {it.cat}</span>
                </span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {selectedItem && (
        <div className="glightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <button className="glightbox__close" aria-label="סגירה" onClick={() => setSelected(null)}>
            <XIcon />
          </button>
          <button
            className="glightbox__nav glightbox__nav--prev"
            aria-label="הקודם"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <ChevL />
          </button>
          <button
            className="glightbox__nav glightbox__nav--next"
            aria-label="הבא"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <ChevR />
          </button>
          <figure className="glightbox__inner" onClick={(e) => e.stopPropagation()}>
            <img className="glightbox__img" src={selectedItem.url} alt={`סדרת ${selectedItem.cat}`} />
            <figcaption className="glightbox__cap">
              <span className="glightbox__series">סדרת {selectedItem.cat}</span>
              <span className="glightbox__price" dir="ltr">
                {selectedItem.price}
              </span>
              <a className="glightbox__cta" href={WA} onClick={(e) => e.stopPropagation()}>
                לפרטים בוואטסאפ ←
              </a>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
