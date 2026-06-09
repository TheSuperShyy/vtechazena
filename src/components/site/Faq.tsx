const QA = [
  {
    q: "כמה עולה ציור קיר?",
    a: "המחיר נע לפי רמת העבודה (בסיס / מתקדם / פרימיום) ומושפע מגודל הקיר, מורכבות העיצוב וכיתוב. נשמח לתת הצעה אישית בוואטסאפ.",
  },
  {
    q: "כמה זמן לוקח?",
    a: "תלוי בגודל ובמורכבות — מיום עבודה ועד מספר ימים. נעדכן אתכם בלוח זמנים מדויק בהצעה.",
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
  return (
    <section className="section" id="faq">
      <div className="section__head reveal">
        <span className="eyebrow">שאלות נפוצות</span>
        <h2 className="section__title">כל מה שרציתם לדעת</h2>
      </div>
      <div className="faq">
        {QA.map((item) => (
          <details className="reveal" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
