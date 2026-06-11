import { WA } from "./Hero";

export default function Contact() {
  return (
    <>
      <section className="section section--cta" id="contact">
        <h2 className="cta__title reveal">מוכנים להפוך קיר ליצירה?</h2>
        <p className="cta__sub reveal">
          ספרו לנו על הפרויקט שלכם — ונחזור אליכם עם כל הפרטים.
        </p>
        <a href={WA} className="btn btn--lg reveal">
          התחילו בוואטסאפ
        </a>
      </section>

      <footer className="footer">
        <span className="footer__logo">ותחזנה</span>
        <div className="footer__links">
          <a href="#">Instagram</a>
          <a href="https://wa.me/972500000000">WhatsApp</a>
        </div>
        <span className="footer__copy">© ותחזנה — כל הזכויות שמורות</span>
      </footer>
    </>
  );
}
