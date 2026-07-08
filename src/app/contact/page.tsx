/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Header from "@/components/site/Header";

export const metadata = {
  title: "צרו קשר · ותחזינה",
  description: "כל הדרכים ליצור קשר עם ותחזינה: וואטסאפ, טלפון, אימייל ורשתות חברתיות.",
};

// client-pending: confirm email + social handles. WhatsApp number is live.
// WA_NUMBER is international format, no '+'.
const WA_NUMBER = "972559283403";
const PHONE = "055-928-3403";
const EMAIL = "hello@vtechazena.co.il";
const INSTAGRAM = "https://instagram.com/";

const WA_LINK =
  "https://wa.me/" +
  WA_NUMBER +
  "?text=" +
  encodeURIComponent("היי, הגעתי מהאתר ואשמח לשמוע עוד פרטים");

const METHODS = [
  { label: "וואטסאפ", value: "שלחו הודעה ונחזור אליכם", href: WA_LINK, cta: "פתיחת צ׳אט ←" },
  { label: "טלפון", value: PHONE, href: `tel:${PHONE.replace(/[^0-9+]/g, "")}`, cta: "חיוג ←" },
  { label: "אימייל", value: EMAIL, href: `mailto:${EMAIL}`, cta: "שליחת מייל ←" },
  { label: "אינסטגרם", value: "@vtechazena", href: INSTAGRAM, cta: "למעקב ←" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="contact-page">
        <Link href="/" className="workshop-page__back">
          → חזרה לאתר
        </Link>

        <div className="contact-page__head">
          <span className="services-eyebrow">צרו קשר</span>
          <h1 className="contact-page__title">נשמח לשמוע מכם</h1>
          <p className="contact-page__lead">
            בכל שאלה, רעיון או בקשה להצעת מחיר, אנחנו כאן. בחרו את הדרך הנוחה לכם.
          </p>
        </div>

        <div className="contact-grid">
          {METHODS.map((m) => (
            <a
              key={m.label}
              className="contact-card"
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-card__label">{m.label}</span>
              <span className="contact-card__value" dir="ltr">
                {m.value}
              </span>
              <span className="contact-card__cta">{m.cta}</span>
            </a>
          ))}
        </div>

        <a className="btn btn--lg contact-page__primary" href={WA_LINK}>
          התחילו בוואטסאפ
        </a>
      </main>
    </>
  );
}
