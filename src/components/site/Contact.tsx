import Link from "next/link";
import { WA } from "./Hero";

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
        <span className="footer__logo">ותחזינה</span>
        <div className="footer__links">
          <Link href="/contact">צרו קשר</Link>
          <a href="#">Instagram</a>
          <a href="https://wa.me/972500000000">WhatsApp</a>
        </div>
        <span className="footer__copy">© ותחזינה · כל הזכויות שמורות</span>
      </footer>
    </>
  );
}
