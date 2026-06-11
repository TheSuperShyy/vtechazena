/* eslint-disable @next/next/no-img-element */
// Full-bleed image interlude that sits between the Work carousel and the dark
// Services section. It pins (position:sticky) while the Services panel scrolls up
// and stacks over it (sharp top edge). Swap the src for any photo in /public/work.
export default function Showcase() {
  return (
    <section className="showcase" aria-label="היצירה בחלל">
      <img src="/work/IMG_4639.jpg" alt="ציור קיר בהתאמה אישית, מותקן בחלל" loading="lazy" />
      <span className="showcase__scrim" aria-hidden="true" />
    </section>
  );
}
