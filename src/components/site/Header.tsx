"use client";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const LINKS = [
  { href: "#work", label: "עבודות" },
  { href: "#process", label: "תהליך" },
  { href: "#faq", label: "שאלות" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > last && y > 140 && !open) setHidden(true);
      else setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const goTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -10 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`hdr${scrolled ? " scrolled" : ""}${hidden ? " hide" : ""}`}>
      <a href="#top" className="hdr__logo" onClick={(e) => goTo(e, "#top")}>
        ותחזנה<span>STUDIO</span>
      </a>
      <nav className={`hdr__nav${open ? " open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => goTo(e, l.href)}>
            {l.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="hdr__cta" onClick={(e) => goTo(e, "#contact")}>
        בואו נדבר
      </a>
      <button
        className="hdr__burger"
        aria-label="תפריט"
        onClick={() => setOpen((o) => !o)}
      >
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
