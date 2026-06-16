/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";

// Every photo in /public/work (hero-bleed.jpg is the hero image, not a gallery
// piece, so it's excluded). The first nine are the curated openers; the rest
// follow in numeric order.
const SLIDES = [
  "IMG_4860", "IMG_4329", "IMG_4048", "IMG_3534", "IMG_3621",
  "IMG_3691", "IMG_3803", "IMG_4101", "IMG_4200",
  "IMG_3125", "IMG_3410", "IMG_3860", "IMG_4089", "IMG_4102",
  "IMG_4151", "IMG_4152", "IMG_4239", "IMG_4270", "IMG_4326",
  "IMG_4407", "IMG_4426", "IMG_4492", "IMG_4494", "IMG_4497",
  "IMG_4588", "IMG_4639", "IMG_4779", "IMG_5547",
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

  const slideStyle = (i: number): React.CSSProperties => {
    let off = i - active;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
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
        <h2 className="section__title">מבחר מהיצירות שלנו</h2>
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
              <img loading="lazy" src={`/work/${s}.jpg`} alt="" />
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
