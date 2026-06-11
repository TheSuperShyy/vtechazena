/* eslint-disable @next/next/no-img-element */
// Company story / "our story" (היסטוריית החברה) — editorial split: a relief
// photo beside the narrative, with the prayer the brand is named after pulled
// out as a gold quote. Text reveals via WhisperReveal like the other sections.
export default function Story() {
  return (
    <section className="section story" id="story">
      <div className="story__grid">
        <div className="story__text">
          <span className="services-eyebrow">הסיפור שלנו</span>
          <h2 className="story__title">סיפורה של ותחזינה</h2>

          <p className="story__lead">
            “ותחזינה” נולדה מתוך מפגש בין אמנות, זיכרון וגעגוע. השם שלנו שואב
            השראה מן התפילה העתיקה:
          </p>
          <p className="story__quote">ותחזינה עינינו בשובך לציון ברחמים</p>

          <div className="story__body">
            <p>
              תפילה עם מבט קדימה, המבטאת את הכמיהה המתמדת לבניין ירושלים והמקדש.
            </p>
            <p>
              המסע שלנו החל מתוך רצון להפוך קירות דוממים למרחבים של משמעות. כל
              יצירה נולדת מתוך חציבה, גילוי ויצירה מחדש — בתהליך שבו שכבות האבן
              והקיר מספרות סיפור של עבר, הווה ועתיד.
            </p>
            <p>
              בהשראת מורשת ישראל, זכר המקדש ודברי חז״ל, נוצרות עבודות המחברות בין
              אסתטיקה מוקפדת לבין עומק רוחני.
            </p>
            <p>
              במרכז העשייה של “ותחזינה” עומדת האמונה שאמנות יכולה להיות יותר
              מקישוט; היא יכולה להיות עדות, זיכרון וחיבור. כל פרויקט מותאם למקומו
              ולסיפורו, מתוך שאיפה להותיר חותם של יופי, משמעות והשראה לדורות.
            </p>
          </div>

          <p className="story__close">
            “ותחזינה” אינה רק יצירה בקיר — היא מבט אל מה שהיה, חיבור למה שקיים,
            ותקווה לבניין בקרוב ממש.
          </p>
        </div>

        <figure className="story__media">
          <img
            src="/work/IMG_4329.jpg"
            alt="ציור קיר חצוב — „אם אשכחך ירושלים”"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
