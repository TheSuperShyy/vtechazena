"use client";
import { useEffect, useLayoutEffect } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// useLayoutEffect on the client (so words are hidden before first paint — no
// flash), useEffect on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// All the copy that should blur-whisper in. Generic h1–h4 / p cover most titles,
// leads and paragraphs; the rest are spans that hold their own text.
const SELECTOR =
  "h1,h2,h3,h4,p,.eyebrow,.services-eyebrow,.stat__label,.tier-card__tag,.tier-card__meta,.footer__logo,.footer__copy";

// Skip the blended hero wordmark (filter would break its mix-blend), the hero
// sub-text (kept fixed, no animation) and decor.
const SKIP = ".hero__display,.hero__hello,.hero__kicker,.hero__line";

const START_BLUR = 12; // px
const DURATION = 0.4; // s per word
const STAGGER = 0.025; // s between words

// Recursively wrap each word in a <span class="whisper-word">, keeping element
// children (<em>, <a>, …) and <br> intact so markup/layout survive.
function whisperize(el: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const elChild = child as HTMLElement;
        // Swash headings must NOT be split into per-word inline-blocks: the split
        // breaks the Oraita glyph run and the edge letters lose their calligraphic
        // tails (client feedback: flourishes cut at word start/end). Animate the
        // whole span as ONE whisper unit instead — verified to render identically
        // to plain text even with the blur filter applied.
        if (elChild.classList.contains("swash-word")) {
          elChild.classList.add("whisper-word");
          words.push(elChild);
          return;
        }
        if (elChild.classList.contains("sr-only")) return; // hidden a11y twin — leave intact
      }
      if (child.nodeType === Node.TEXT_NODE) {
        const txt = child.textContent ?? "";
        if (!txt.trim()) return;
        const frag = document.createDocumentFragment();
        txt.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement("span");
            span.className = "whisper-word";
            span.textContent = part;
            frag.appendChild(span);
            words.push(span);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = (child as HTMLElement).tagName;
        if (tag === "BR" || tag === "SVG") return;
        walk(child);
      }
    });
  };
  walk(el);
  return words;
}

export default function WhisperReveal() {
  // Lenis drives the smooth scroll; ScrollTrigger must hear about every Lenis
  // scroll, or its triggers go stale and some sections never reveal (words stuck
  // at opacity:0). ReactLenis runs its own rAF, so we only forward scroll events.
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    gsap.registerPlugin(ScrollTrigger);
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    ScrollTrigger.refresh();
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const els = (Array.from(document.querySelectorAll(SELECTOR)) as HTMLElement[])
        .filter((el) => !el.closest(".hdr")) // leave the fixed header alone
        .filter((el) => !el.closest(".tier-card")) // cards animate as one unit (below)
        // Services text is NOT whisper-revealed: the section's sticky-stacking slide
        // is its entrance, and the per-word reveal mis-fires once it's a stacked
        // panel over a pinned element (leaving the text stuck at opacity:0). Keep
        // it plainly visible.
        .filter((el) => !el.closest(".section--services"))
        .filter((el) => !el.closest(".tier-feature")) // has its own tabs/accordion; keep text visible
        .filter((el) => !el.closest(".pcard")) // photo-stack card text stays static (hover-animated)
        .filter((el) => !el.closest(".testimonials")) // has its own carousel; keep heading visible
        .filter((el) => !el.closest(".faq")) // FAQ has its own accordion animation
        .filter((el) => !el.closest(".footer")) // footer sits at the page bottom; its trigger can't reach "top 88%", so keep it plainly visible
        .filter((el) => !el.matches(SKIP))
        .filter((el) => !el.dataset.whispered)
        .filter((el) => (el.textContent ?? "").trim().length > 0);

      els.forEach((el) => {
        el.dataset.whispered = "1";
        const words = whisperize(el);
        if (!words.length) return;

        if (reduce) {
          // filter:none (not blur(0)) + will-change:auto so no composited filter
          // layer lingers — a leftover filter region clips the swash flourish ink
          // to the element box in stricter engines (Safari/Firefox). See below.
          gsap.set(words, { opacity: 1, filter: "none", willChange: "auto" });
          return;
        }

        gsap.set(words, { opacity: 0, y: 8, filter: `blur(${START_BLUR}px)` });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION,
          ease: "power2.out",
          stagger: STAGGER,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          // Once revealed, drop the filter + will-change entirely. gsap otherwise
          // leaves filter:blur(0px) on the node, and that dormant filter layer
          // clips a swash-word's calligraphic tails to its (padded) box wherever a
          // browser confines the filter region to the border box — the "flourish
          // cut off" the client sees on desktop even though Chrome renders it full.
          // Chrome A/B proved removing it is pixel-identical, so this is loss-free.
          onComplete: () => gsap.set(words, { filter: "none", willChange: "auto" }),
        });
      });

      // The one standalone image gets a matching slow blur-fade.
      (Array.from(document.querySelectorAll(".intro__media")) as HTMLElement[]).forEach(
        (el) => {
          if (reduce) return;
          gsap.set(el, { opacity: 0, y: 28, filter: "blur(18px)" });
          gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        }
      );

      // Services tier cards: the card rises + fades in, its background image
      // settles from a slow zoom, and the panel content (tag → title → price →
      // desc → meta → button) staggers up — a richer, clearly-felt entrance.
      // Transforms stay on the card / its own children, safe for position:sticky.
      (Array.from(document.querySelectorAll(".tier-card")) as HTMLElement[]).forEach(
        (card) => {
          if (reduce) return;
          const img = card.querySelector(".tier-card__bg") as HTMLElement | null;
          const kids = Array.from(
            card.querySelectorAll(".tier-card__panel > *")
          ) as HTMLElement[];

          gsap.set(card, { opacity: 0, y: 60 });
          gsap.set(kids, { opacity: 0, y: 24 });
          if (img) gsap.set(img, { scale: 1.14 });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 80%", once: true },
          });
          tl.to(card, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0);
          if (img) tl.to(img, { scale: 1, duration: 1.6, ease: "power2.out" }, 0);
          tl.to(
            kids,
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.09 },
            0.25
          );
        }
      );

      // Stat numbers count up from 0, keeping their suffix ("100%", "50+", "360°").
      (Array.from(document.querySelectorAll(".stat__num")) as HTMLElement[]).forEach(
        (el) => {
          const m = (el.textContent ?? "").trim().match(/^(\d+)(.*)$/);
          if (!m) return;
          const target = parseInt(m[1], 10);
          const suffix = m[2] ?? "";
          if (reduce) {
            el.textContent = `${target}${suffix}`;
            return;
          }
          const counter = { val: 0 };
          el.textContent = `0${suffix}`;
          gsap.to(counter, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.val)}${suffix}`;
            },
          });
        }
      );

      ScrollTrigger.refresh();
    });

    // Fonts swapping in and images loading shift the page height after the first
    // refresh, which leaves trigger start positions stale (so a section far down
    // can never cross its trigger and stays hidden). Re-measure once those settle.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 600);
    const t2 = window.setTimeout(refresh, 1600);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
      ctx.revert();
    };
  }, []);

  return null;
}
