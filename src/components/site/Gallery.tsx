"use client";
/* eslint-disable @next/next/no-img-element */
// Filterable gallery + lightbox (after the 21st.dev GalleryGridBlock the client
// shared). Category filter = the three series; clicking a tile opens a lightbox
// with prev/next + keyboard nav, and the caption keeps the series' price and a
// WhatsApp link. The grid caps at MAX_PREVIEW tiles; if the current view holds
// more, a blurred "view all" tile (the next image, blurred, with a CTA) opens a
// modal popup — a blurred backdrop over a scrollable grid of the full set;
// clicking outside closes it. Built with framer-motion; inline SVG icons, RTL.
import { useState, useEffect, useCallback } from "react";
import type { KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WA } from "./Hero";
import SwashWord from "./SwashWord";
import { SWASH } from "./swashGlyphs";

// Each tier's full photo set (converted from the client's HEIC archives to
// web-optimized JPGs, named <tier>-01.jpg …). First MAX_PREVIEW show as tiles;
// the rest live in the "view all" popup. Reorder a tier's array to change which
// images lead its preview.
const seq = (prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `${prefix}-${String(i + 1).padStart(2, "0")}.jpg`);

const SERIES = [
  { key: "יסוד", price: "1,800–2,500 ₪", dir: "tiers/base", images: seq("base", 19) },
  { key: "הדר", price: "3,500–6,500 ₪", dir: "tiers/advance", images: seq("advance", 52) },
  { key: "תפארת", price: "7,000 ₪ ומעלה", dir: "tiers/premium", images: seq("premium", 17) },
];

// Tiles shown in the grid before the blurred "view all" tile takes the last slot.
const MAX_PREVIEW = 5;

type Item = { id: string; url: string; cat: string; price: string };
const ITEMS: Item[] = SERIES.flatMap((s) =>
  s.images.map((img) => ({ id: `${s.dir}/${img}`, url: `/${s.dir}/${img}`, cat: s.key, price: s.price }))
);
const CATEGORIES = ["הכול", ...SERIES.map((s) => s.key)];

// The "הכול" tab is a curated highlight reel, not the full 88 — only the
// strongest, cleanly-shot pieces (straight-on, well-lit, no room clutter),
// ordered so the leading five carry the preview. Each tier keeps its full set.
const BEST_IDS = [
  "tiers/premium/premium-02.jpg",
  "tiers/advance/advance-42.jpg",
  "tiers/base/base-16.jpg",
  "tiers/premium/premium-11.jpg",
  "tiers/advance/advance-09.jpg",
  "tiers/premium/premium-04.jpg",
  "tiers/base/base-02.jpg",
  "tiers/advance/advance-01.jpg",
  "tiers/premium/premium-16.jpg",
  "tiers/base/base-09.jpg",
  "tiers/advance/advance-16.jpg",
  "tiers/premium/premium-08.jpg",
  "tiers/base/base-04.jpg",
  "tiers/advance/advance-28.jpg",
  "tiers/base/base-19.jpg",
  "tiers/advance/advance-15.jpg",
];
const ITEM_BY_ID = new Map(ITEMS.map((it) => [it.id, it]));
const BEST: Item[] = BEST_IDS.map((id) => ITEM_BY_ID.get(id)).filter((it): it is Item => Boolean(it));

const ZoomIcon = () => (
  <svg className="g-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
  </svg>
);
const GridIcon = () => (
  <svg className="gtile--all__ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
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
  const [popupOpen, setPopupOpen] = useState(false); // "view all" modal gallery

  const isAll = filter === "הכול";
  const tierItems = ITEMS.filter((it) => it.cat === filter);
  // The grid preview leads with the best-of reel on "הכול"; the "view all" popup,
  // its count, and lightbox navigation span the COMPLETE set (all 88 on "הכול")
  // so nothing is hidden — only the featured order differs.
  const previewItems = isAll ? BEST : tierItems;
  const fullItems = isAll ? ITEMS : tierItems;
  const selectedItem = ITEMS.find((it) => it.id === selected) ?? null;

  // Grid shows up to MAX_PREVIEW; the blurred "view all" tile takes the next slot.
  const preview = previewItems.slice(0, MAX_PREVIEW);
  const hasMore = fullItems.length > MAX_PREVIEW;
  const viewAllImg = previewItems[MAX_PREVIEW] ?? fullItems[MAX_PREVIEW];

  const step = useCallback(
    (dir: number) =>
      setSelected((cur) => {
        if (cur === null) return cur;
        const idx = fullItems.findIndex((it) => it.id === cur);
        if (idx === -1) return fullItems[0]?.id ?? null;
        return fullItems[(idx + dir + fullItems.length) % fullItems.length].id;
      }),
    [fullItems]
  );

  // Lightbox keyboard nav (RTL: Right = previous, Left = next).
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      else if (e.key === "ArrowRight") step(-1); // RTL: Right = previous
      else if (e.key === "ArrowLeft") step(1); //  RTL: Left = next
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, step]);

  // Escape closes the "view all" modal (only when no lightbox sits above it).
  useEffect(() => {
    if (!popupOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && selected === null) setPopupOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [popupOpen, selected]);

  const onTileKey = (e: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(id);
    }
  };

  const Tile = ({ it }: { it: Item }) => (
    <button
      className="gtile"
      onClick={() => setSelected(it.id)}
      onKeyDown={(e) => onTileKey(e, it.id)}
      aria-label={`הגדלת תמונה, סדרת ${it.cat}`}
    >
      <img className="gtile__img" src={it.url} alt={`סדרת ${it.cat}`} loading="lazy" decoding="async" />
      <span className="gtile__overlay" aria-hidden="true">
        <ZoomIcon />
        <span className="gtile__badge">סדרת {it.cat}</span>
      </span>
    </button>
  );

  return (
    <section className="section gallery" id="series" aria-labelledby="gallery-heading">
      <div className="gallery__head">
        <span className="services-eyebrow">גלריה</span>
        <h2 id="gallery-heading" className="gallery__title"><SwashWord glyphs={SWASH.haitzuvim} label="העיצובים שלנו" /></h2>
        <p className="gallery__lead">עיינו ביצירות לפי הסדרה, ולחצו על התמונה להגדלה.</p>
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
          {preview.map((it, i) => (
            <motion.div
              key={it.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              role="listitem"
            >
              <Tile it={it} />
            </motion.div>
          ))}

          {hasMore && (
            <motion.div
              key="view-all"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: preview.length * 0.04 }}
              role="listitem"
            >
              <button
                className="gtile gtile--all"
                onClick={() => setPopupOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPopupOpen(true);
                  }
                }}
                aria-label={`צפייה בכל ${fullItems.length} היצירות`}
              >
                <img className="gtile__img gtile__img--blur" src={viewAllImg.url} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <span className="gtile--all__inner" aria-hidden="true">
                  <GridIcon />
                  <span className="gtile--all__label">צפו בכל היצירות</span>
                  <span className="gtile--all__count">{fullItems.length} תמונות</span>
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* "View all" modal — blurred backdrop, scrollable full grid, click-out closes */}
      {popupOpen && (
        <div
          className="gcol-modal"
          role="dialog"
          aria-modal="true"
          aria-label="גלריית העיצובים"
          onClick={() => setPopupOpen(false)}
        >
          <div className="gcol-modal__panel" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <div className="gcol-modal__head">
              <div className="gcol-modal__titles">
                <span className="gcol-modal__eyebrow">גלריה</span>
                <h3 className="gcol-modal__title">{filter === "הכול" ? "כל היצירות" : `סדרת ${filter}`}</h3>
              </div>
              <span className="gcol-modal__count">{fullItems.length} תמונות</span>
              <button className="gcol-modal__close" onClick={() => setPopupOpen(false)} aria-label="סגירה">
                <XIcon />
              </button>
            </div>
            <div className="gcol-modal__scroll">
              <div className="gcol-modal__grid" role="list">
                {fullItems.map((it) => (
                  <div role="listitem" key={it.id}>
                    <Tile it={it} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Single-image lightbox (sits above the "view all" modal when opened from it) */}
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
            <ChevR />
          </button>
          <button
            className="glightbox__nav glightbox__nav--next"
            aria-label="הבא"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <ChevL />
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
