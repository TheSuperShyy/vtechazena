# Website Revisions — client feedback (from revision.md)

Decoded from the client's RTL `revision.md`. Build checklist. Brand spelling
standardized to **ותחזנה** (matches the logo).

## Phase 1 — copy & headings
- [ ] **Hero** ([Hero.tsx]) — wordmark `V'Techazena` → **ותחזנה**; tagline → "קירות הבית
  חוצבים זיכרון. יצירות אמנות לזכר החורבן, בעיצוב ייחודי ומוקפד, וכיסופים לבניין המקדש."
  (premium font = client-pending ⛔)
- [ ] **Intro** ([Intro.tsx]) — title `ברוכים הבאים אל V'Techazena` → **ל־ותחזנה** (Hebrew);
  "לא רק **מציירים** קיר" → "לא רק **חוצבים** בקיר".
- [ ] **Story** ([Story.tsx]) — H2 `סיפורה של ותחזינה` → **הסיפור שלנו**; spelling ותחזינה → ותחזנה.
- [ ] **Tiers** ([Process.tsx]) — heading `השירותים שלנו` → **המסלולים שלנו**; titles
  בסיסי/מתקדם/פרימיום → **יסוד/הדר/תפארת**; **הדר 3,000–5,500 → 3,500–6,500**; new bullets.
- [ ] **Gallery** ([Gallery.tsx]) — heading `העבודות שלנו` → **העיצובים שלנו**; subtext
  → "עיינו ביצירות לפי הסדרה…"; sync הדר price.
- [ ] **FAQ** ([Faq.tsx]) — answer: new tier names + הדר price.
- [ ] **Workshop** ([workshop/page.tsx]) — full new description copy.

## Phase 2 — structural
- [ ] Remove **Sketches** section entirely; relocate workshop entry → small **Workshop teaser**.
- [ ] Site-wide **background texture** + gold/white text treatment.
- [ ] Remove decorative **graffiti dashes** (em-dashes in headings/copy).

## Phase 3 — new features
- [ ] **Contact page** — all contact methods + social links.
- [ ] **Lead-capture popup** — name / phone / email → leads list (wire to n8n
  `/webhook/crm/upsert` when live).

## Blocked on client ⛔
- Premium **font file** (hero/headings).
- **Achituv's Drive folder** — new gallery models (more works, no duplicates).
