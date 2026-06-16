/* eslint-disable @next/next/no-img-element */
// Homepage workshop teaser — a short pitch that links to the full /workshop page.
// (Replaces the old Sketches section, which was removed per the client revisions.)
import Link from "next/link";

export default function Workshop() {
  return (
    <section className="section sketches" id="workshop">
      <div className="sketches__inner">
        <span className="services-eyebrow">הסדנה שלנו</span>
        <h2 className="sketches__title">רוצים להתנסות ביצירה בעצמכם?</h2>
        <p className="sketches__lead">
          סדנה חווייתית וייחודית מבית ותחזינה, המחברת בין עולם היצירה, המסורת
          והמשמעות. מתאימה למשפחות, צוותים, מוסדות חינוכיים וקבוצות פרטיות.
        </p>
        <div className="sketches__actions">
          <Link href="/workshop" className="btn btn--dark">
            לפרטים על הסדנה ←
          </Link>
        </div>
      </div>
    </section>
  );
}
