"use client";
/* eslint-disable @next/next/no-img-element */
// FeatureShowcase-style tiers section: left = title + stat chips + a collapsible
// accordion of the three series + WhatsApp CTA; right = a tabbed image panel that
// auto-plays a slideshow of the selected series' photos.
// - Accordion is collapsible (click an open row to close it). Closing it leaves
//   the image on the last-selected series (image is driven by `activeTier`, not
//   the open row).
// - Tabs switch the series; the panel cross-fades through that series' images.
import { useEffect, useState } from "react";
import { WA } from "./Hero";

type Tier = {
  value: string;
  label: string; // short tab label
  badge?: string;
  tag: string; // size · price
  title: string; // accordion title
  intro: string;
  bullets: string[];
  dir: string; // under /public
  images: string[];
  alt: string;
};

const TIERS: Tier[] = [
  {
    value: "yesod",
    label: "יסוד",
    tag: "50×50 ס”מ · 1,800–2,500 ₪",
    title: "סדרת יסוד",
    intro:
      "יצירה אלגנטית ומוקפדת המשלבת מוטיבים מעולם המקדש וירושלים, או כיתוב אומנותי בעל משמעות אישית, על גבי רקע “אמה על אמה” חצוב בקיר. הדגם מעניק נוכחות מכובדת וייחודית תוך שמירה על עיצוב נקי ומאוזן.",
    bullets: [],
    dir: "tiers/base",
    images: ["1.png", "2.png", "3.png", "4.png", "7.png"],
    alt: "סדרת יסוד — ציור קיר",
  },
  {
    value: "hadar",
    label: "הדר",
    tag: "עד 100×100 ס”מ · 3,000–5,500 ₪",
    title: "סדרת הדר",
    intro:
      "יצירות מרשימות ומוקפדות המאפשרות שילוב עשיר יותר של אלמנטים עיצוביים וירידה לפרטים ברמת גימור גבוהה.",
    bullets: [
      "שילוב הרמוני של כיתוב, מסגרת ודוגמאות נוי, בהתאמה אישית לבחירת הלקוח.",
      "עיצובים מורכבים ועשירים בפרטים, הכוללים אלמנטים עדינים ועבודת חציבה מדויקת.",
      "כיתובים אמנותיים בסגנון קליגרפי, בעלי נוכחות ייחודית ואופי אישי.",
      "אפשרות לשילוב מוטיבים מעולם המקדש, ירושלים, סמלים יהודיים ועיטורים מסורתיים.",
    ],
    dir: "tiers/advance",
    images: ["a-1.png", "a-2.png", "a-3.png"],
    alt: "סדרת הדר — ציור קיר",
  },
  {
    value: "tiferet",
    label: "תפארת",
    badge: "פרימיום",
    tag: "מעל 100 ס”מ · 7,000 ₪ ומעלה",
    title: "סדרת תפארת",
    intro:
      "סדרת הדגל של “ותחזינה” — יצירות מרשימות בקנה מידה גדול, המיועדות להפוך לקיר מרכזי בעל נוכחות יוצאת דופן ומשמעות עמוקה.",
    bullets: [
      "עיצובים מפוארים ועשירים בפרטים, המשלבים אומנות חציבה ברמת גימור גבוהה במיוחד.",
      "תכנון ועיצוב בהתאמה אישית מלאה, בהתאם לחזון, לסגנון ולצרכים הייחודיים של הלקוח.",
      "שילוב חופשי של כיתובים, סמלים, מוטיבים מעולם המקדש, פורטרטים, נופי ירושלים ואלמנטים אמנותיים מורכבים.",
      "הדמיות ותהליך תכנון מקדים לאישור הלקוח לפני תחילת הביצוע.",
      "ליווי אישי לאורך כל שלבי היצירה, משלב הרעיון ועד לחשיפת היצירה המוגמרת.",
    ],
    dir: "tiers/premium",
    images: ["p1.png", "p2.png", "p3.png", "p4.png", "p5.png"],
    alt: "סדרת תפארת — ציור קיר",
  },
];

const STATS = ["3 סדרות", "התאמה אישית מלאה", "בכל גודל וסגנון"];
const SLIDE_MS = 3200;

export default function TierFeature() {
  const [activeTier, setActiveTier] = useState(TIERS[0].value); // drives the image
  const [openItem, setOpenItem] = useState<string | null>(TIERS[0].value); // open row
  const [slide, setSlide] = useState(0);

  const current = TIERS.find((t) => t.value === activeTier) ?? TIERS[0];

  // Auto-play slideshow for the active series; reset to first photo on switch.
  useEffect(() => {
    setSlide(0);
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const imgs = TIERS.find((t) => t.value === activeTier)?.images ?? [];
    if (imgs.length <= 1) return;
    const id = window.setInterval(
      () => setSlide((s) => (s + 1) % imgs.length),
      SLIDE_MS
    );
    return () => window.clearInterval(id);
  }, [activeTier]);

  // Pick a series (tab): show its images + open its description.
  const selectTier = (v: string) => {
    setActiveTier(v);
    setOpenItem(v);
  };
  // Accordion row: collapsible. Closing leaves the image on the last selection.
  const toggleItem = (v: string) => {
    if (openItem === v) {
      setOpenItem(null);
    } else {
      setOpenItem(v);
      setActiveTier(v);
    }
  };

  return (
    <section className="section tier-feature" id="series">
      <div className="tier-feature__grid">
        {/* Left — copy + collapsible accordion + CTA */}
        <div className="tier-feature__left">
          <span className="services-eyebrow">הסדרות שלנו</span>
          <h2 className="tier-feature__title">שלוש סדרות, נוכחות אחת</h2>
          <p className="tier-feature__desc">
            שלוש רמות של עומק ופירוט — בחרו את הסדרה שמתאימה לחלל, לסגנון
            ולתקציב שלכם.
          </p>

          <div className="tier-feature__stats">
            {STATS.map((s) => (
              <span className="tier-feature__chip" key={s}>
                {s}
              </span>
            ))}
          </div>

          <div className="tier-feature__acc">
            {TIERS.map((t) => {
              const open = openItem === t.value;
              return (
                <div className={`tf-item${open ? " open" : ""}`} key={t.value}>
                  <button
                    type="button"
                    className="tf-item__head"
                    aria-expanded={open}
                    onClick={() => toggleItem(t.value)}
                  >
                    <span className="tf-item__title">
                      {t.title}
                      {t.badge ? (
                        <span className="tier-row__badge">{t.badge}</span>
                      ) : null}
                    </span>
                    <span className="tf-item__price" dir="ltr">
                      {t.tag}
                    </span>
                    <svg
                      className="tf-item__chev"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className="tf-item__panel">
                    <div className="tf-item__panelInner">
                      <p className="tf-item__intro">{t.intro}</p>
                      {t.bullets.length > 0 && (
                        <ul className="tier-row__list">
                          {t.bullets.map((b, bi) => (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <a className="btn btn--dark tier-feature__cta" href={WA}>
            לפרטים בוואטסאפ
          </a>
        </div>

        {/* Right — tabbed image panel (auto-play slideshow per series) */}
        <div className="tier-feature__right">
          <div className="tier-feature__card">
            {TIERS.map((t) =>
              t.images.map((img, idx) => (
                <img
                  key={t.value + img}
                  src={`/${t.dir}/${img}`}
                  alt={t.alt}
                  className={`tier-feature__media${
                    t.value === activeTier && idx === slide ? " active" : ""
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              ))
            )}

            {/* Slideshow dots (current series) */}
            {current.images.length > 1 && (
              <div className="tier-feature__dots">
                {current.images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    className={`tier-feature__dot${
                      idx === slide ? " active" : ""
                    }`}
                    aria-label={`תמונה ${idx + 1}`}
                    onClick={() => setSlide(idx)}
                  />
                ))}
              </div>
            )}

            {/* Series tabs */}
            <div className="tier-feature__tabs">
              <div className="tier-feature__tablist" role="tablist">
                {TIERS.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    role="tab"
                    aria-selected={t.value === activeTier}
                    className={`tier-feature__tab${
                      t.value === activeTier ? " active" : ""
                    }`}
                    onClick={() => selectTier(t.value)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
