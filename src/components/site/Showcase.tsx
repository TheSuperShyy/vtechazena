/* eslint-disable @next/next/no-img-element */
// Full-bleed image interlude that sits between the Work carousel and the dark
// Services section. On desktop it rides the sticky "curtain": it rises over the
// pinned Work, then the dark Services rises over it. Swap the src for any photo
// in /public/work.
export default function Showcase() {
  return (
    <section className="showcase" aria-label="היצירה בחלל">
      <img src="/work/IMG_4639.jpg" alt="ציור קיר בהתאמה אישית, מותקן בחלל" loading="lazy" />
      <span className="showcase__scrim" aria-hidden="true" />
    </section>
  );
}
