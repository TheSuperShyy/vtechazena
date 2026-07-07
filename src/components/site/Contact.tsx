import Link from "next/link";
import { WA } from "./Hero";
import SwashWord from "./SwashWord";
import { SWASH } from "./swashGlyphs";

export default function Contact() {
  return (
    <>
      <section className="section section--cta" id="contact">
        <h2 className="cta__title reveal">מוכנים להפוך קיר ליצירה?</h2>
        <p className="cta__sub reveal">
          ספרו לנו על הפרויקט שלכם, ונחזור אליכם עם כל הפרטים.
        </p>
        <a href={WA} className="btn btn--lg reveal">
          התחילו בוואטסאפ
        </a>
      </section>

      <footer className="footer">
        <SwashWord glyphs={SWASH.hero} label="ותחזינה" className="footer__logo" />
        <div className="footer__links">
          <Link href="/contact">צרו קשר</Link>
          <a href="#">Instagram</a>
          <a href={WA}>WhatsApp</a>
        </div>
        <span className="footer__copy">© ותחזינה · כל הזכויות שמורות</span>
      </footer>
    </>
  );
}
