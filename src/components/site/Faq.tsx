"use client";
import { useState } from "react";

const QA = [
  {
    q: "כמה עולה יצירה שלנו?",
    a: "המחיר נע לפי המסלול: יסוד 1,800 עד 2,500 ₪, הדר 3,500 עד 6,500 ₪, ותפארת החל מ-7,000 ₪. המחיר הסופי מושפע מגודל הקיר ומורכבות העיצוב. נשמח לתת הצעה אישית בוואטסאפ.",
  },
  {
    q: "כמה זמן לוקח?",
    a: "תלוי בגודל ובמורכבות, מיום עבודה ועד מספר ימים. נעדכן אתכם בלוח זמנים מדויק בהצעה.",
  },
  {
    q: "האם אתם מגיעים לכל הארץ?",
    a: "כן. עבור מרחקים חריגים (כמו אילת) ייתכן תוספת נסיעה, שתופיע מראש בהצעה.",
  },
  {
    q: "אפשר לבחור עיצוב משלי?",
    a: "בהחלט. אפשר לשלוח לנו רעיון או תמונת השראה, ונבנה יחד את העיצוב המתאים.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="section__head reveal">
        <span className="eyebrow">שאלות נפוצות</span>
        <h2 className="section__title">כל מה שרציתם לדעת</h2>
      </div>
      <div className="faq">
        {QA.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq__item${isOpen ? " open" : ""}`} key={item.q}>
              <button
                className="faq__q"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </button>
              <div className="faq__a">
                <div className="faq__a-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
