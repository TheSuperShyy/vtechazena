"use client";
/* eslint-disable @next/next/no-img-element */
// Tiers as photo-stack cards, matching the reference: dark, overlapping cards
// with the middle one raised by default (click another to raise it), and framed
// landscape photos peeking from the bottom that fan out on hover. The small
// "לפרטים בוואטסאפ" link opens WhatsApp. Built natively (no framer-motion).
import { useState } from "react";
import { WA } from "./Hero";

type Stack = {
  cat: string; // tier level
  title: string;
  sub: string; // size · price
  dir: string;
  images: string[];
};

const TIERS: Stack[] = [
  {
    cat: "בסיסי",
    title: "סדרת יסוד",
    sub: "50×50 ס”מ · 1,800–2,500 ₪",
    dir: "tiers/base",
    images: ["1.png", "2.png", "3.png"],
  },
  {
    cat: "מתקדם",
    title: "סדרת הדר",
    sub: "עד 100×100 ס”מ · 3,000–5,500 ₪",
    dir: "tiers/advance",
    images: ["a-1.png", "a-2.png", "a-3.png"],
  },
  {
    cat: "פרימיום",
    title: "סדרת תפארת",
    sub: "מעל 100 ס”מ · 7,000 ₪ ומעלה",
    dir: "tiers/premium",
    images: ["p1.png", "p2.png", "p3.png"],
  },
];

export default function TierStack() {
  const [active, setActive] = useState(1); // middle raised by default

  return (
    <section className="section tier-stack" id="series">
      <div className="tier-stack__head">
        <span className="services-eyebrow">הסדרות שלנו</span>
        <h2 className="tier-stack__title">שלוש סדרות, נוכחות אחת</h2>
        <p className="tier-stack__lead">
          בחרו את הסדרה שמתאימה לחלל, לסגנון ולתקציב — ונדבר בוואטסאפ.
        </p>
      </div>

      <div className="tier-stack__row">
        {TIERS.map((t, i) => (
          <article
            key={t.title}
            className={`pcard${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
          >
            <div className="pcard__text">
              <span className="pcard__cat">{t.cat}</span>
              <h3 className="pcard__title">{t.title}</h3>
              <span className="pcard__sub">{t.sub}</span>
              <a
                className="pcard__cta"
                href={WA}
                onClick={(e) => e.stopPropagation()}
              >
                לפרטים בוואטסאפ ←
              </a>
            </div>

            <div className="pcard__stack" aria-hidden="true">
              {t.images.map((img) => (
                <img
                  key={img}
                  src={`/${t.dir}/${img}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
