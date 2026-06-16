/* eslint-disable @next/next/no-img-element */
// Company story / "our story" — the founder's first-person story (Achituv Sasson
// Maman), with the prayer the brand is named after pulled out as a gold quote.
// Text reveals via WhisperReveal like the other sections.
export default function Story() {
  return (
    <section className="section story" id="story">
      <div className="story__grid">
        <div className="story__text">
          <span className="services-eyebrow">אודות</span>
          <h2 className="story__title">הסיפור שלנו</h2>

          <p className="story__lead">
            שמי אחיטוב ששון ממן, מייסד ובעלים של “ותחזינה”. מאז שאני זוכר את
            עצמי, שני עולמות ליוו אותי והיוו חלק מרכזי בחיי: עולם האמנות והכמיהה
            לבית המקדש.
          </p>

          <div className="story__body">
            <p>
              היצירה, העיצוב והעבודה בידיים היו עבורי דרך לבטא רעיונות, רגשות
              וחלומות, ובמקביל ליווה אותי תמיד הגעגוע לירושלים הבנויה.
            </p>
            <p>
              במהלך המלחמה נחשפתי לעדויות של חיילים שסיפרו על תמונות וסמלים של
              אל-אקצא שנתלו בבתי האויב. העדויות הללו עוררו בי מחשבה עמוקה: בזמן
              שהאויבים שלנו דואגים להנציח את שאיפותיהם ואת חזונם על קירות בתיהם,
              האם אנו נותנים מקום מספק לכיסופינו לבית המקדש?
            </p>
            <p>
              מתוך החיבור בין אהבתי לאמנות לבין הרצון לתת ביטוי מוחשי לגעגוע
              למקדש, הוקמה “ותחזינה”. מטרת המיזם היא להפוך את הכיסופים העתיקים
              ליצירה חיה ונוכחת, ולהכניס אל הבית היהודי זיכרון שאינו ניתן להסרה,
              שיסמל תקווה וחיבור עמוק לירושלים ולבניין בית המקדש.
            </p>
          </div>

          <p className="story__quote">ותחזינה עינינו בשובך לציון ברחמים</p>

          <p className="story__close">
            מתוך תפילה לימים של שלום, אחדות ובשורות טובות, ומתוך תקווה לבניין
            המקדש בקרוב ממש.
          </p>
        </div>

        <figure className="story__media">
          <img
            src="/work/IMG_4329.jpg"
            alt="ציור קיר חצוב: „אם אשכחך ירושלים”"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
