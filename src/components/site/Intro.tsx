/* eslint-disable @next/next/no-img-element */
export default function Intro() {
  return (
    <section className="intro" id="intro">
      <h2 className="intro__heading reveal">
        <span className="intro__sans">ברוכים הבאים ל</span>
        <span className="intro__script">ותחזינה</span>
      </h2>

      <div className="intro__grid">
        <div className="intro__col">
          <div className="feature reveal">
            <span className="feature__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 3h12l3 6-9 12L3 9z" />
                <path d="M3 9h18M9 3l3 18M15 3l-3 18" />
              </svg>
            </span>
            <div>
              <h3>
                אמנות שמספרת <em>סיפור</em>
              </h3>
              <p>
                אנחנו לא רק חוצבים בקיר, אנחנו מכניסים משמעות, עומק ויופי לחלל
                הבית. כל עבודה נושאת את הכמיהה לבניין המקדש, בהתאמה אישית למקום
                ולסיפור שלכם.
              </p>
            </div>
          </div>

          <div className="feature reveal">
            <span className="feature__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 12.5l2.5 2.5 4.5-5" />
              </svg>
            </span>
            <div>
              <h3>איכות לפני כמות</h3>
              <p>
                כדי לשמור על רמה גבוהה, אנחנו מקבלים מספר מצומצם של פרויקטים בכל
                פעם, וכל לקוח מקבל את מלוא תשומת הלב.
              </p>
            </div>
          </div>

          <div className="feature reveal">
            <span className="feature__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 16l-5 2.6 1-5.5-4-3.9 5.5-.8z" />
              </svg>
            </span>
            <div>
              <h3>
                התאמה אישית <em>מלאה</em>
              </h3>
              <p>
                מהרעיון ועד הגימור, אתם שותפים מלאים בתהליך. גודל, נושא, כיתוב
                וסגנון, הכול נבנה סביבכם.
              </p>
            </div>
          </div>
        </div>

        <div className="intro__media reveal">
          <img loading="lazy" src="/work/IMG_4101.jpg" alt="יצירת קיר חצובה בהשראת ירושלים" />
        </div>
      </div>

      <div className="stats">
        <div className="stat reveal">
          <span className="stat__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
              <circle cx="12" cy="11" r="2.3" />
              <path d="M8.5 16.2a3.5 3.5 0 0 1 7 0" />
            </svg>
          </span>
          <span className="stat__num" dir="ltr">100%</span>
          <span className="stat__label">עבודת יד מקורית</span>
        </div>
        <div className="stat reveal">
          <span className="stat__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 3l1.9 1.4 2.3-.2.9 2.1 2.1.9-.2 2.3L20.7 12l-1.4 1.9.2 2.3-2.1.9-.9 2.1-2.3-.2L12 20.7l-1.9-1.4-2.3.2-.9-2.1-2.1-.9.2-2.3L3.3 12l1.4-1.9-.2-2.3 2.1-.9.9-2.1 2.3.2z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </span>
          <span className="stat__num" dir="ltr">50+</span>
          <span className="stat__label">קירות שציירנו</span>
        </div>
        <div className="stat reveal">
          <span className="stat__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" />
            </svg>
          </span>
          <span className="stat__num" dir="ltr">360°</span>
          <span className="stat__label">ליווי מלא מהרעיון ועד הקיר</span>
        </div>
      </div>
    </section>
  );
}
