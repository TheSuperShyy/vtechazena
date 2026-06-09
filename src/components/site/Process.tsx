/* eslint-disable @next/next/no-img-element */
import { WA } from "./Hero";

const TIERS = [
  {
    tag: "מסלול",
    title: "בסיסי",
    desc: "ציור קיר נקי ומוקפד — דימוי מרכזי או נושא פשוט, ללא כיתוב מורכב. בחירה מצוינת לחלל אחד שרוצים לרענן.",
    meta: "קיר אחד · עיצוב נקי · ביצוע מהיר",
    img: "IMG_4048",
  },
  {
    tag: "מסלול",
    title: "מתקדם",
    desc: "עיצוב מותאם אישית עם רמת פירוט גבוהה, שילובי צבע עשירים וגימור מוקפד — היצירה שמושכת את העין בכל חלל.",
    meta: "עיצוב מותאם · פירוט גבוה · גימור פרימיום",
    img: "IMG_3621",
  },
  {
    tag: "מסלול",
    title: "פרימיום",
    desc: "יצירה גדולה ומורכבת בהזמנה אישית — קיר שלם, כיתוב אמנותי וקונספט ייחודי שמתוכנן במיוחד סביבכם.",
    meta: "קיר שלם · קונספט ייחודי · כיתוב אמנותי",
    img: "IMG_4200",
  },
];

export default function Process() {
  return (
    <section className="section section--services" id="process">
      <div className="section__head reveal">
        <span className="services-eyebrow">מה אנחנו עושים</span>
        <h2 className="services-title">השירותים שלנו</h2>
        <p className="services-lead">
          פתרונות אמנותיים מקצה לקצה — מקיר אחד שמרענן חלל ועד יצירה גדולה
          בהזמנה אישית שמספרת סיפור.
        </p>
        <div className="services-dot" />
      </div>
      <div className="tiers">
        {TIERS.map((t) => (
          <article className="tier-card" key={t.title}>
            <img className="tier-card__bg" src={`/work/${t.img}.jpg`} alt="" loading="lazy" />
            <div className="tier-card__panel">
              <span className="tier-card__tag">{t.tag}</span>
              <h3 className="tier-card__title">{t.title}</h3>
              <p className="tier-card__desc">{t.desc}</p>
              <span className="tier-card__meta">{t.meta}</span>
              <a className="btn btn--dark" href={WA}>
                לפרטים בוואטסאפ
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
