/* eslint-disable @next/next/no-img-element */
// Full-bleed dark image interlude (normal flow) placed after the Services
// section — a visual break between the dark tier cards and the light series
// breakdown. Not sticky (unlike Showcase). Swap `src` for any photo in /public.
export default function Interlude({
  src = "/work/IMG_5547.jpg",
  alt = "ציור קיר בהתאמה אישית, מותקן בחלל",
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <section className="interlude" aria-label="גלריה" data-dark>
      <img src={src} alt={alt} loading="lazy" />
      <span className="interlude__scrim" aria-hidden="true" />
    </section>
  );
}
