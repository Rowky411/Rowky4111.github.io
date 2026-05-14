import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.esm.js";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.esm.js";

gsap.registerPlugin(ScrollTrigger);

/* ─── Utility: split text into span-wrapped lines ─── */
function wrapLines(el) {
  const text = el.innerHTML;
  const lines = text.split(/<br\s*\/?>/i);
  el.innerHTML = lines
    .map(l => `<span class="gsap-line" style="display:block;overflow:hidden;"><span class="gsap-line-inner" style="display:block;">${l}</span></span>`)
    .join("");
  return el.querySelectorAll(".gsap-line-inner");
}

/* ─── 1. HEADER entrance ─── */
function animateHeader() {
  const logo = document.querySelector("header a");
  const navLinks = document.querySelectorAll(".nav-link");
  const sidebar = document.querySelector('[style*="position:fixed;left:16px"]');

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (logo) tl.from(logo, { y: -24, opacity: 0, duration: 0.6 }, 0);
  if (navLinks.length) tl.from(navLinks, { y: -20, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.1);
  if (sidebar) tl.from(sidebar, { x: -30, opacity: 0, duration: 0.7 }, 0.2);
}

/* ─── 2. HERO entrance (home page only) ─── */
function animateHero() {
  const label = document.querySelector(".hero-label");
  const title = document.querySelector(".hero-title");
  const desc = document.querySelector(".hero-desc");
  const btns = document.querySelector(".hero-btns");
  const photo = document.querySelector(".hero-photo");
  const decoRects = document.querySelectorAll(".deco-rect");
  const statusBadge = document.querySelector(".status-badge");

  if (!label) return;

  // Split hero title into line spans
  const lineInners = title ? wrapLines(title) : [];

  const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });

  tl.from(label, { y: 20, opacity: 0, duration: 0.6 })
    .from(lineInners, { y: "100%", duration: 0.7, stagger: 0.12 }, "-=0.3")
    .from(desc, { y: 16, opacity: 0, duration: 0.55 }, "-=0.3")
    .from(btns?.children ?? [], { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
    .from(decoRects, { scale: 0, opacity: 0, transformOrigin: "top left", duration: 0.5, stagger: 0.1 }, "-=0.5")
    .from(photo, { x: 60, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
    .from(statusBadge, { y: 16, opacity: 0, duration: 0.5 }, "-=0.3");
}

/* ─── 3. SECTION HEADINGS — line extends on scroll ─── */
function animateSectionHeadings() {
  document.querySelectorAll(".section-heading").forEach(el => {
    const hash = el.querySelector(".hash");
    const titleEl = el.querySelector(".title");
    const line = el.querySelector(".line");

    gsap.from([hash, titleEl], {
      x: -30, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
    });
    if (line) {
      gsap.from(line, {
        scaleX: 0, transformOrigin: "left center", duration: 0.9, ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    }
  });
}

/* ─── 4. PAGE TITLE (projects / about / contacts) ─── */
function animatePageTitle() {
  const slug = document.querySelector(".page-title .slug");
  const slash = document.querySelector(".page-title .slash");
  const subtitle = document.querySelector(".page-title .subtitle");
  if (!slug) return;

  gsap.from([slash, slug], { y: 24, opacity: 0, duration: 0.65, stagger: 0.06, ease: "power3.out", delay: 0.15 });
  if (subtitle) gsap.from(subtitle, { y: 14, opacity: 0, duration: 0.5, ease: "power3.out", delay: 0.45 });
}

/* ─── 5. PROJECT CARDS — stagger fade-up ─── */
function animateProjectCards() {
  const grids = document.querySelectorAll(".projects-grid, .research-grid");
  grids.forEach(grid => {
    const cards = grid.querySelectorAll(":scope > *");
    gsap.from(cards, {
      y: 50, opacity: 0, duration: 0.65, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: grid, start: "top 82%", toggleActions: "play none none none" },
    });
  });

  // hover lift on project cards
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mouseenter", () => gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" }));
    card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, duration: 0.3, ease: "power2.inOut" }));
  });
}

/* ─── 6. SKILL BOXES — stagger scale in ─── */
function animateSkills() {
  const grids = document.querySelectorAll(".skills-grid");
  grids.forEach(grid => {
    const boxes = grid.querySelectorAll(".skill-box");
    gsap.from(boxes, {
      scale: 0.88, opacity: 0, duration: 0.5, stagger: 0.07, ease: "back.out(1.4)",
      scrollTrigger: { trigger: grid, start: "top 85%", toggleActions: "play none none none" },
    });
  });
}

/* ─── 7. ABOUT section — text from left, image from right ─── */
function animateAbout() {
  const text = document.querySelector(".about-text, .bio-text");
  const photo = document.querySelector(".about-photo-wrap, .bio-photo-wrap");
  if (!text) return;

  const trigger = text.closest(".about-row, .bio-row") ?? text;

  gsap.from(text, {
    x: -40, opacity: 0, duration: 0.75, ease: "power3.out",
    scrollTrigger: { trigger, start: "top 80%", toggleActions: "play none none none" },
  });
  if (photo) {
    gsap.from(photo, {
      x: 40, opacity: 0, duration: 0.75, ease: "power3.out",
      scrollTrigger: { trigger, start: "top 80%", toggleActions: "play none none none" },
    });
  }
}

/* ─── 8. EXPERIENCE / EDUCATION cards ─── */
function animateListCards() {
  [".exp-list", ".edu-list"].forEach(sel => {
    const list = document.querySelector(sel);
    if (!list) return;
    gsap.from(list.querySelectorAll(":scope > *"), {
      x: -30, opacity: 0, duration: 0.55, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: list, start: "top 85%", toggleActions: "play none none none" },
    });
  });
}

/* ─── 9. QUICK FACTS — pop in ─── */
function animateFacts() {
  const facts = document.querySelectorAll(".fact-tag");
  if (!facts.length) return;
  gsap.from(facts, {
    scale: 0.7, opacity: 0, duration: 0.4, stagger: 0.06, ease: "back.out(1.7)",
    scrollTrigger: { trigger: facts[0].parentElement, start: "top 88%", toggleActions: "play none none none" },
  });
}

/* ─── 10. CONTACT form fields stagger ─── */
function animateContactForm() {
  const fields = document.querySelectorAll(".field-wrap");
  const detailCards = document.querySelectorAll(".detail-card");
  if (!fields.length) return;

  gsap.from(fields, {
    y: 24, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
    scrollTrigger: { trigger: fields[0], start: "top 85%", toggleActions: "play none none none" },
  });
  gsap.from(detailCards, {
    x: 24, opacity: 0, duration: 0.55, stagger: 0.12, ease: "power3.out",
    scrollTrigger: { trigger: detailCards[0], start: "top 85%", toggleActions: "play none none none" },
  });
}

/* ─── 11. FOOTER fade-up ─── */
function animateFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;
  gsap.from(footer, {
    y: 30, opacity: 0, duration: 0.6, ease: "power3.out",
    scrollTrigger: { trigger: footer, start: "top 95%", toggleActions: "play none none none" },
  });
}

/* ─── 12. Velocity-skew on scroll (inspired by GSAP demos) ─── */
function velocitySkew() {
  let lastY = window.scrollY;
  let currentSkew = 0;
  const clamp = gsap.utils.clamp(-6, 6);

  ScrollTrigger.create({
    onUpdate(self) {
      const velocity = self.getVelocity() / 800;
      const skew = clamp(velocity);
      if (Math.abs(skew) > Math.abs(currentSkew)) {
        currentSkew = skew;
        gsap.to(".section-heading .title, .hero-title", {
          skewX: currentSkew * 0.4,
          ease: "power3.out",
          duration: 0.3,
          overwrite: true,
        });
        gsap.to(".section-heading .title, .hero-title", {
          skewX: 0,
          ease: "elastic.out(1, 0.5)",
          duration: 1,
          delay: 0.15,
          overwrite: false,
        });
      }
    },
  });
}

/* ─── INIT ─── */
window.addEventListener("DOMContentLoaded", () => {
  animateHeader();
  animateHero();
  animateSectionHeadings();
  animatePageTitle();
  animateProjectCards();
  animateSkills();
  animateAbout();
  animateListCards();
  animateFacts();
  animateContactForm();
  animateFooter();
  velocitySkew();
});
