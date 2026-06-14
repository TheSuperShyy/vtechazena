/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Header from "@/components/site/Header";

export const metadata = {
  title: "הסדנה שלנו — ותחזנה",
  description: "הצצה אל הסדנה והתהליך של ותחזנה — מהאבן ועד היצירה.",
};

// Web-compatible workshop photos (HEIC originals were skipped — convert to JPG to add).
const IMAGES = [
  "/workshop/workshop-1.jpg",
  "/workshop/workshop-2.jpg",
  "/workshop/workshop-3.jpg",
  "/workshop/workshop-4.jpg",
  "/workshop/workshop-5.jpg",
  "/workshop/workshop-6.png",
];

export default function WorkshopPage() {
  return (
    <>
      <Header />
      <main className="workshop-page">
        <Link href="/" className="workshop-page__back">
          ← חזרה לאתר
        </Link>

        <div className="workshop-page__head">
          <span className="services-eyebrow">הסדנה שלנו</span>
          <h1 className="workshop-page__title">מאחורי הקלעים</h1>
          <p className="workshop-page__lead">
            הצצה אל הסדנה והתהליך — מהאבן הגולמית ועד היצירה המוגמרת.
          </p>
        </div>

        <div className="workshop-page__grid" data-dark>
          {IMAGES.map((src, i) => (
            <figure className="workshop-page__item" key={src}>
              <img src={src} alt={`הסדנה — תמונה ${i + 1}`} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </main>
    </>
  );
}
