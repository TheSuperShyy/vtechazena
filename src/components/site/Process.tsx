/* eslint-disable @next/next/no-img-element */
import { WA } from "./Hero";
import SwashWord from "./SwashWord";
import { SWASH } from "./swashGlyphs";

const TIERS = [
  {
    tag: "מסלול",
    title: "יסוד",
    glyphs: SWASH.yesod,
    price: "₪1,800–2,500",
    desc: "מסלול בסיסי הכולל עיצובים מדויקים ונקיים. מתאים למי שמבקש לשלב נוכחות של זיכרון ירושלים בצורה עדינה.",
    meta: "עיצוב בהתאמה אישית · יצירה בגודל 50×50 · רמת פירוט סטנדרטית · חללים קטנים עד בינוניים",
    img: "IMG_4048",
  },
  {
    tag: "מסלול",
    title: "הדר",
    glyphs: SWASH.hadar,
    price: "₪3,500–6,500",
    desc: "מסלול ביניים עם עיצובים מורכבים יותר ורמת פירוט גבוהה יותר. מאפשר שילוב של אלמנטים נוספים והעמקת השפה העיצובית.",
    meta: "התאמה אישית מורחבת · יצירה בגודל עד 100×100 · שילוב אלמנטים, מסגרות וכיתוב",
    img: "IMG_3621",
  },
  {
    tag: "מסלול",
    title: "תפארת",
    glyphs: SWASH.tiferet,
    price: "₪7,000+",
    desc: "מסלול פרימיום הכולל עיצובים מורכבים ומוקפדים במיוחד. מתאים לפרויקטים גדולים וללקוחות שמבקשים יצירה מרכזית ובעלת נוכחות משמעותית.",
    meta: "עיצוב מלא ומעמיק · יצירות בכל גודל לבחירתכם · רמת פירוט גבוהה",
    img: "IMG_4200",
  },
];

export default function Process() {
  return (
    <section className="section section--services" id="process" data-dark>
      <div className="section__head reveal">
        <span className="services-eyebrow">מה אנחנו עושים</span>
        <h2 className="services-title"><SwashWord glyphs={SWASH.hamaslulim} label="המסלולים שלנו" /></h2>
        <p className="services-lead">
          שלושה מסלולים ברמות שונות של עיצוב. כל מסלול מאפשר התאמה אישית לפי גודל
          החלל, הסגנון והתקציב.
        </p>
        <div className="services-dot" />
      </div>
      <div className="tiers">
        {TIERS.map((t) => (
          <article className="tier-card" key={t.title}>
            <img className="tier-card__bg" src={`/work/${t.img}.jpg`} alt="" loading="lazy" />
            <div className="tier-card__panel">
              <span className="tier-card__tag">{t.tag}</span>
              <h3 className="tier-card__title"><SwashWord glyphs={t.glyphs} label={t.title} /></h3>
              <span className="tier-card__price" dir="ltr">{t.price}</span>
              <p className="tier-card__desc">{t.desc}</p>
              <span className="tier-card__meta">{t.meta}</span>
              <a className="btn btn--dark" href={WA}>
                לפרטים בוואטסאפ
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="services-note">
        המחירים בשקלים. המחיר הסופי נקבע לפי גודל הקיר, מיקום ומורכבות העיצוב.
      </p>
    </section>
  );
}
