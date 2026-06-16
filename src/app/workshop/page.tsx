/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Header from "@/components/site/Header";

export const metadata = {
  title: "הסדנה שלנו · ותחזינה",
  description: "הצצה אל הסדנה והתהליך של ותחזינה, מהאבן ועד היצירה.",
};

// All workshop photos. 7–9 were converted from the HEIC originals (decoded with
// heic-convert, re-encoded to JPEG) so the whole set is web-compatible.
const IMAGES = [
  "/workshop/workshop-1.jpg",
  "/workshop/workshop-2.jpg",
  "/workshop/workshop-3.jpg",
  "/workshop/workshop-4.jpg",
  "/workshop/workshop-5.jpg",
  "/workshop/workshop-6.png",
  "/workshop/workshop-7.jpg",
  "/workshop/workshop-8.jpg",
  "/workshop/workshop-9.jpg",
];

export default function WorkshopPage() {
  return (
    <>
      <Header />
      <main className="workshop-page">
        <Link href="/" className="workshop-page__back">
          → חזרה לאתר
        </Link>

        <div className="workshop-page__head">
          <span className="services-eyebrow">מאחורי הקלעים</span>
          <h1 className="workshop-page__title">הסדנה שלנו</h1>
          <p className="workshop-page__lead">
            רוצים להתנסות ביצירה בעצמכם? הזמינו סדנה חווייתית וייחודית מבית ותחזינה,
            המחברת בין עולם היצירה, המסורת והמשמעות.
          </p>
          <p className="workshop-page__body">
            הסדנה מתאימה למשפחות, צוותים, מוסדות חינוכיים, בתי ספר, ארגונים וקבוצות
            פרטיות, המבקשים חוויה ערכית מעמיקה ובעלת תוכן חינוכי. במהלך הסדנה כל
            משתתף חוצב ויוצר עבודה אישית, תוך התנסות מעשית בחומרים ובטכניקה ייחודית,
            בליווי והנחיה מקצועית וצמודה. בסיום הסדנה כל משתתף יוצא עם יצירה
            ממוסגרת, המהווה ביטוי אישי משמעותי ומוכנה לתלייה בבית.
          </p>
        </div>

        <div className="workshop-page__grid" data-dark>
          {IMAGES.map((src, i) => (
            <figure className="workshop-page__item" key={src}>
              <img src={src} alt={`הסדנה · תמונה ${i + 1}`} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </main>
    </>
  );
}
