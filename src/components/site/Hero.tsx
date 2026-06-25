/* eslint-disable @next/next/no-img-element */
const WA =
  "https://wa.me/972500000000?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A4%D7%A8%D7%98%D7%99%D7%9D";

export default function Hero() {
  return (
    <section className="hero" id="top" data-dark>
      <div className="hero__media">
        {/* Swap this <img> for a <video autoPlay muted loop playsInline> when you have a clip */}
        <img src="/work/IMG_5547.jpg" alt="" />
        <span className="hero__scrim"></span>
      </div>
      {/* Swashes on the END letters only: ss02 top loop on the first (ו), ss05 bottom
          swirl on the last (ה); the middle letters stay plain. */}
      <h1 className="hero__display"><span className="hero__swash">ו</span>תחזינ<span className="hero__swash-end">ה</span></h1>
      <div className="hero__center">
        <p className="hero__kicker">ותחזינה · סטודיו לאמנות קיר · ישראל</p>
        <p className="hero__line">
          קירות הבית חוצבים זיכרון.
          <br />
          יצירות בעיצוב ייחודי, המשלבות זכר לחורבן, אמנות מוקפדת וכיסופים לבניין המקדש.
        </p>
      </div>
      <span className="hero__hello">שלום</span>
      <a href="#intro" className="hero__scroll" aria-label="גלול למטה">
        <span>↓</span>
      </a>
    </section>
  );
}

export { WA };
