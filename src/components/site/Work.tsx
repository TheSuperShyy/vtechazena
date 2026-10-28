/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import SwashWord from "./SwashWord";
import { SWASH } from "./swashGlyphs";
import photos from "../../data/photos.json";

// The slide list lives in src/data/photos.json (display order; edited by the photo uploader app).
// The client's full carousel set (New-client revision/carousel-image) converted
// into /public/work/carousel/. "carousel-main" (the carved שויתי ה׳ panel) opens;
// the rest follow in shot order, odd-named exports last. Duplicates were dropped:
// exact copies of the hero/story/tier-card photos (IMG_2589, IMG_4871, IMG_5779,
// c023efcb-…) and IMG_5514 (angled take of IMG_5515). Same-artwork dupes also
// removed: IMG_5678/IMG_5679 (both the שויתי ה׳ panel = carousel-main), IMG_5999
// (distant room shot of IMG_5997), IMG_4393 (angled IMG_4392), IMG_3803 (angled
// IMG_3799), IMG_4783 (twin of IMG_4779). Second angle-dedupe pass removed 10 more
// extra-angle shots of the same physical piece: IMG_3842/IMG_3848 (angles of
// IMG_3831), IMG_4102 (of IMG_4101), IMG_4152 (of IMG_4151), IMG_4273 (of IMG_4271),
// IMG_4639 (of IMG_4638), IMG_6075 (angled gold, twin of removed IMG_6076),
// IMG_5703 (of IMG_5698), IMG_3091 (of IMG_2508), 49df1dc3-… (angle of 1000424512).
const SLIDES: string[] = photos.carousel;

export default function Work() {
  const [active, setActive] = useState(0);
  const [w, setW] = useState(300);
  const stageRef = useRef<HTMLDivElement>(null);
  const sx = useRef(0);
  const n = SLIDES.length;

  useEffect(() => {
    const measure = () => {
      const el = stageRef.current?.querySelector(".cslide") as HTMLElement | null;
      if (el) setW(el.offsetWidth || 300);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const go = (d: number) => setActive((a) => (a + d + n) % n);

  // Shortest wrap-around distance from the active slide.
  const rel = (i: number) => {
    let off = i - active;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    return off;
  };

  const slideStyle = (i: number): React.CSSProperties => {
    const off = rel(i);
    const abs = Math.abs(off);
    return {
      // RTL coverflow: previous slides (off<0) fan to the right, next slides
      // (off>0) fan to the left — matching Hebrew reading order.
      transform: `translateX(${-off * (w * 0.56)}px) translateZ(${-abs * 180}px) rotateY(${off * 28}deg) scale(${Math.max(0.72, 1 - abs * 0.14)})`,
      zIndex: 100 - abs,
      opacity: abs > 2 ? 0 : 1,
      pointerEvents: abs > 2 ? "none" : "auto",
    };
  };

  return (
    <section className="section section--work" id="work">
      <div className="section__head reveal">
        <span className="eyebrow">עבודות</span>
        <h2 className="section__title">מבחר <SwashWord glyphs={SWASH.mehayetzirot} label="מהיצירות" /> שלנו</h2>
      </div>

      <div className="carousel">
        <button className="carousel__nav carousel__prev" aria-label="הקודם" onClick={() => go(-1)}>
          ›
        </button>
        <div
          className="carousel__stage"
          ref={stageRef}
          onTouchStart={(e) => (sx.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - sx.current;
            if (Math.abs(dx) > 40) go(dx > 0 ? 1 : -1);
          }}
        >
          {SLIDES.map((s, i) => (
            <figure
              key={s}
              className="cslide"
              style={slideStyle(i)}
              onClick={() => i !== active && setActive(i)}
            >
              {/* With ~106 slides, only give nearby slides a src — all of them sit
                  stacked "in viewport", so loading=lazy alone would fetch the lot. */}
              {Math.abs(rel(i)) <= 4 && (
                <img loading="lazy" src={`/work/carousel/${s}`} alt="" />
              )}
            </figure>
          ))}
        </div>
        <button className="carousel__nav carousel__next" aria-label="הבא" onClick={() => go(1)}>
          ‹
        </button>
      </div>
    </section>
  );
}
