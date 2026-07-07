/* eslint-disable @next/next/no-img-element */
import SwashWord from "./SwashWord";
import { SWASH } from "./swashGlyphs";

// To change the WhatsApp pre-filled message, edit the Hebrew text below (and the number if needed).
const WA =
  "https://wa.me/972527710712?text=" +
  encodeURIComponent("היי, הגעתי מהאתר ואשמח לשמוע עוד פרטים");

export default function Hero() {
  return (
    <section className="hero" id="top" data-dark>
      <div className="hero__media">
        {/* Swap this <img> for a <video autoPlay muted loop playsInline> when you have a clip */}
        {/* The client's new hero photo is portrait, so it only serves portrait (mobile) screens;
            landscape (desktop) screens keep the original full-bleed shot. On mobile the photo
            renders `contain` (whole panel visible) over this blurred copy as the fill. */}
        <img className="hero__media-blur" src="/work/hero-main.jpg" alt="" aria-hidden="true" />
        <picture>
          <source media="(min-aspect-ratio: 1/1)" srcSet="/work/IMG_5547.jpg" />
          <img src="/work/hero-main.jpg" alt="" />
        </picture>
        <span className="hero__scrim"></span>
      </div>
      {/* The wordmark in Oraita's swash letterforms, per the client's typography PDF. */}
      <h1 className="hero__display"><SwashWord glyphs={SWASH.hero} label="ותחזינה" /></h1>
      <div className="hero__center">
        <p className="hero__kicker">ותחזינה · סטודיו לאמנות חצובה בקיר · ישראל</p>
        <p className="hero__line">
          חוצבים זיכרון־יוצרים מציאות
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
