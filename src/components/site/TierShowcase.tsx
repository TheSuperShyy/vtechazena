/* eslint-disable @next/next/no-img-element */
import { WA } from "./Hero";

type Series = {
  tag: string;
  name: string;
  badge?: string;
  intro: string;
  bullets: string[];
  outro?: string;
  dir: string; // under /public
  hero: string;
  thumbs: string[];
};

// Detailed breakdown of the three series, shown after the sticky tier cards.
// Images live in /public/tiers/{base,advance,premium}. Copy from the client.
const SERIES: Series[] = [
  {
    tag: "50×50 ס”מ · 1,800–2,500 ₪",
    name: "סדרת יסוד",
    intro:
      "יצירה אלגנטית ומוקפדת המשלבת מוטיבים מעולם המקדש וירושלים, או כיתוב אומנותי בעל משמעות אישית, על גבי רקע “אמה על אמה” חצוב בקיר. הדגם מעניק נוכחות מכובדת וייחודית תוך שמירה על עיצוב נקי ומאוזן.",
    bullets: [],
    dir: "tiers/base",
    hero: "1.png",
    thumbs: ["2.png", "3.png", "4.png"],
  },
  {
    tag: "עד 100×100 ס”מ · 3,000–5,500 ₪",
    name: "סדרת הדר",
    intro:
      "יצירות מרשימות ומוקפדות המאפשרות שילוב עשיר יותר של אלמנטים עיצוביים וירידה לפרטים ברמת גימור גבוהה.",
    bullets: [
      "שילוב הרמוני של כיתוב, מסגרת ודוגמאות נוי, בהתאמה אישית לבחירת הלקוח.",
      "עיצובים מורכבים ועשירים בפרטים, הכוללים אלמנטים עדינים ועבודת חציבה מדויקת.",
      "כיתובים אמנותיים בסגנון קליגרפי, בעלי נוכחות ייחודית ואופי אישי.",
      "אפשרות לשילוב מוטיבים מעולם המקדש, ירושלים, סמלים יהודיים ועיטורים מסורתיים.",
    ],
    outro:
      "סדרה זו מעניקה איזון מושלם בין נוכחות מרשימה, רמת פירוט גבוהה והתאמה אישית, ליצירה בעלת אופי ייחודי ומשמעות.",
    dir: "tiers/advance",
    hero: "a-1.png",
    thumbs: ["a-2.png", "a-3.png"],
  },
  {
    tag: "מעל 100 ס”מ · 7,000 ₪ ומעלה",
    name: "סדרת תפארת",
    badge: "פרימיום",
    intro:
      "סדרת הדגל של “ותחזינה” — יצירות מרשימות בקנה מידה גדול, המיועדות להפוך לקיר מרכזי בעל נוכחות יוצאת דופן ומשמעות עמוקה.",
    bullets: [
      "עיצובים מפוארים ועשירים בפרטים, המשלבים אומנות חציבה ברמת גימור גבוהה במיוחד.",
      "תכנון ועיצוב בהתאמה אישית מלאה, בהתאם לחזון, לסגנון ולצרכים הייחודיים של הלקוח.",
      "שילוב חופשי של כיתובים, סמלים, מוטיבים מעולם המקדש, פורטרטים, נופי ירושלים ואלמנטים אמנותיים מורכבים.",
      "הדמיות ותהליך תכנון מקדים לאישור הלקוח לפני תחילת הביצוע.",
      "ליווי אישי לאורך כל שלבי היצירה, משלב הרעיון ועד לחשיפת היצירה המוגמרת.",
    ],
    outro:
      "סדרת תפארת מיועדת למבקשים יצירה חד-פעמית בעלת נוכחות יוצאת דופן, המשלבת אומנות, מורשת ומשמעות אישית לכדי יצירה מרגשת ובלתי נשכחת.",
    dir: "tiers/premium",
    hero: "p1.png",
    thumbs: ["p2.png", "p3.png", "p4.png"],
  },
];

export default function TierShowcase() {
  return (
    <section className="section tier-showcase" id="series">
      <div className="tier-showcase__head">
        <span className="services-eyebrow">הסדרות שלנו</span>
        <h2 className="tier-showcase__title">שלוש סדרות, נוכחות אחת</h2>
        <p className="tier-showcase__lead">
          שלוש רמות של עומק ופירוט — בחרו את הסדרה שמתאימה לחלל, לסגנון ולתקציב
          שלכם.
        </p>
      </div>

      {SERIES.map((s, i) => (
        <article
          className={`tier-row${i % 2 === 1 ? " tier-row--flip" : ""}`}
          key={s.name}
        >
          <div className="tier-row__media">
            <img
              className="tier-row__img tier-row__img--hero"
              src={`/${s.dir}/${s.hero}`}
              alt={s.name}
              loading="lazy"
              decoding="async"
            />
            <div className="tier-row__thumbs">
              {s.thumbs.map((t) => (
                <img
                  className="tier-row__img"
                  src={`/${s.dir}/${t}`}
                  alt=""
                  key={t}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>

          <div className="tier-row__body">
            <span className="tier-row__tag" dir="ltr">
              {s.tag}
            </span>
            <h3 className="tier-row__name">
              {s.name}
              {s.badge ? (
                <span className="tier-row__badge">{s.badge}</span>
              ) : null}
            </h3>
            <p className="tier-row__intro">{s.intro}</p>
            {s.bullets.length > 0 && (
              <ul className="tier-row__list">
                {s.bullets.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            )}
            {s.outro ? <p className="tier-row__outro">{s.outro}</p> : null}
            <a className="btn btn--dark tier-row__cta" href={WA}>
              לפרטים בוואטסאפ
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
