/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import SwashWord from "./SwashWord";
import { SWASH } from "./swashGlyphs";

// The client's full carousel set (New-client revision/carousel-image) converted
// into /public/work/carousel/. "carousel-main" (the carved שויתי ה׳ panel) opens;
// the rest follow in shot order, odd-named exports last. Duplicates were dropped:
// exact copies of the hero/story/tier-card photos (IMG_2589, IMG_4871, IMG_5779,
// c023efcb-…) and IMG_5514 (angled take of IMG_5515).
const SLIDES = [
  "carousel-main",
  "IMG_2423", "IMG_2508", "IMG_2539", "IMG_2603", "IMG_2764",
  "IMG_2844", "IMG_2859", "IMG_2944", "IMG_3091", "IMG_3125", "IMG_3155",
  "IMG_3345", "IMG_3357", "IMG_3363", "IMG_3375", "IMG_3407", "IMG_3460",
  "IMG_3464", "IMG_3507", "IMG_3529", "IMG_3550", "IMG_3574", "IMG_3576",
  "IMG_3591", "IMG_3618", "IMG_3691", "IMG_3787", "IMG_3799", "IMG_3803",
  "IMG_3821", "IMG_3831", "IMG_3842", "IMG_3848", "IMG_3860", "IMG_3876",
  "IMG_3918", "IMG_3955", "IMG_3966", "IMG_4025", "IMG_4027", "IMG_4048",
  "IMG_4101", "IMG_4102", "IMG_4151", "IMG_4152", "IMG_4200", "IMG_4231",
  "IMG_4271", "IMG_4273", "IMG_4329", "IMG_4361", "IMG_4362", "IMG_4392",
  "IMG_4393", "IMG_4406", "IMG_4408", "IMG_4426", "IMG_4476", "IMG_4481",
  "IMG_4482", "IMG_4538", "IMG_4587", "IMG_4622", "IMG_4638", "IMG_4639",
  "IMG_4757", "IMG_4779", "IMG_4783", "IMG_4797", "IMG_4825", "IMG_4860",
  "IMG_4870", "IMG_4948", "IMG_5007", "IMG_5085", "IMG_5111",
  "IMG_5179", "IMG_5182", "IMG_5214", "IMG_5238", "IMG_5515",
  "IMG_5547", "IMG_5548", "IMG_5606", "IMG_5636", "IMG_5678", "IMG_5679",
  "IMG_5698", "IMG_5699", "IMG_5703", "IMG_5997", "IMG_5999",
  "IMG_6020", "IMG_6041", "IMG_6075", "IMG_6076", "IMG_6104", "IMG_6160",
  "1000424512", "49df1dc3-18f7-4ccd-bece-04c87d02d717",
];

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
                <img loading="lazy" src={`/work/carousel/${s}.jpg`} alt="" />
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
