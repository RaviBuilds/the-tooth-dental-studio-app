"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";

/* ==================================================================
   SECTION 03 — DENTAL TREATMENTS IN TOLICHOWKI  ("TREATMENT ATLAS")
   ------------------------------------------------------------------
   The hero established WHO; the Proof section answered "why believe".
   This chapter answers the next question: "What can this clinic
   actually help me with?" - as an editorial medical atlas, not a
   service-card grid. Its own identity: indexing, coordinates,
   drafting lines and editorial annotation (deliberately distinct
   from the Hero's circular cover language and Section 02's
   patient-proof visual system).

   Content sources (nothing invented):
   - Eyebrow / H2 / intro / all ten treatment paragraphs: verbatim
     from .agent/CANONICAL.md.
   - Short supporting lines are distillations of the canonical
     paragraphs only - no new claims.
   - Territory labels (RELIEF / RESTORE / PREVENT / SMILE) are
     wayfinding glosses of the canonical intro ("general, preventive,
     restorative, cosmetic and urgent") - not fabricated categories.

   Imagery - all 22 treatment-action photographs are used (CANONICAL
   #15: treatment identities UNVERIFIED, so no frame ever implies
   "this photo = this treatment"):
   - A curated 6-image plate pool for the atlas stage.
   - "THE WORK IN MOTION" filmstrip: all 22 frames, each carrying a
     cyclic neutral process label (CONSULT / PREPARE / TREAT / REFINE /
     COMPLETE / FOLLOW UP) plus its sequence number only. Decorative
     alt="" with a labelled scroll region; nothing names a treatment.

   Behaviour:
   - Desktop: hover / click / keyboard-focus on an index row selects
     the treatment; the gold indicator and connector animate into
     position; the stage swaps imagery with a masked reveal and the
     detail panel re-keys as ONE connected system (~0.5s, timed per
     territory).
   - Tablet: re-authored stage band above the index.
   - Mobile: a vertical journey - the active row opens an inline
     detail (image + text) directly beneath it. One scene at a time.
   - Filmstrip: native touch swipe on mobile; mouse drag with light
     inertia on desktop; focusable, keyboard-scrollable region.
   - Progressive disclosure: canonical paragraphs sit behind
     "Understand the treatment" toggles.
   - Reveal gating: .atlas[data-atlas-ready] is set from JS, so all
     content stays fully visible without JavaScript.
   - All motion is transform/opacity only. Reduced motion: calm.
   ================================================================== */

const IMG_BASE =
  "/images/Treatment action images/tooth-dental-studio-treatment-tolichowki-hyderabad";

/* Curated plate pool - 6 of the 22 treatment-action photographs for
   the atlas stage. Labels from the canonical neutral set (CANONICAL
   #15) - never treatment-specific. */
const POOL = [
  { src: `${IMG_BASE}-02.webp`, label: "CONSULT" },
  { src: `${IMG_BASE}-04.webp`, label: "PREPARE" },
  { src: `${IMG_BASE}-07.webp`, label: "TREAT" },
  { src: `${IMG_BASE}-13.webp`, label: "REFINE" },
  { src: `${IMG_BASE}-17.webp`, label: "COMPLETE" },
  { src: `${IMG_BASE}-20.webp`, label: "FOLLOW UP" },
];

const PHOTO_ALT =
  "Clinical dental treatment in progress at The Tooth Dental Studio, Tolichowki, Hyderabad";

/* THE WORK IN MOTION - the full 22-frame clinical filmstrip. Frame
   order follows the clinic's own numbering; the process labels cycle
   through the canonical neutral set purely as visual/process language
   (CANONICAL #15) and never assert what a photograph depicts. */
const PROCESS_LABELS = [
  "CONSULT",
  "PREPARE",
  "TREAT",
  "REFINE",
  "COMPLETE",
  "FOLLOW UP",
];
const FILM_EXTENSIONS = [
  "webp", "webp", "png", "webp", "webp", "png", "webp", "webp", "webp",
  "png", "png", "png", "webp", "webp", "png", "png", "webp", "webp",
  "webp", "webp", "png", "png",
];
const FILMSTRIP = FILM_EXTENSIONS.map((ext, i) => ({
  src: `${IMG_BASE}-${String(i + 1).padStart(2, "0")}.${ext}`,
  num: String(i + 1).padStart(2, "0"),
  label: PROCESS_LABELS[i % PROCESS_LABELS.length],
}));

const plate = (poolIndex: number) => String(poolIndex + 1).padStart(2, "0");

type GroupId = "relief" | "restore" | "prevent" | "smile";

type Treatment = {
  id: string;
  num: string;
  name: string;
  group: GroupId;
  short: string;
  body: string;
  img: number;
};

type Group = {
  id: GroupId;
  roman: string;
  name: string;
  gloss: string;
  treatmentIds: string[];
};

const delay = (v: string) => ({ "--d": v }) as CSSProperties;

/* Short supporting lines are distillations of the canonical paragraphs;
   bodies are verbatim CANONICAL.md #7 (Section 09). */
const TREATMENTS: Treatment[] = [  {
    id: "root-canal",
    num: "01",
    name: "Root Canal Treatment",
    group: "relief",
    short:
      "Planned after clinical evaluation — with the procedure and expected steps explained clearly beforehand.",
    body: "Root canal treatment may be recommended when the inside of a tooth becomes infected or seriously damaged. The treatment is planned after clinical evaluation, with the procedure and expected steps explained clearly beforehand.",
    img: 0,
  },
  {
    id: "wisdom-tooth",
    num: "02",
    name: "Wisdom Tooth Removal",
    group: "relief",
    short: "Assessment first — whether removal is appropriate is determined clinically.",
    body: "Problematic wisdom teeth may cause pain, swelling, infection or difficulty maintaining the area. A dental assessment helps determine whether removal is appropriate.",
    img: 1,
  },
  {
    id: "emergency",
    num: "03",
    name: "Emergency Dental Care",
    group: "relief",
    short: "Prompt assessment when something suddenly needs attention.",
    body: "For sudden dental pain, damaged teeth, wisdom-tooth problems and other urgent concerns, prompt dental assessment can help determine the right next step.",
    img: 2,
  },
  {
    id: "fillings",
    num: "04",
    name: "Dental Fillings",
    group: "restore",
    short: "Restoring teeth affected by decay while preserving healthy structure and function.",
    body: "Dental fillings are commonly used to restore teeth affected by decay and help preserve healthy tooth structure and function.",
    img: 3,
  },
  {
    id: "crowns",
    num: "05",
    name: "Dental Crowns",
    group: "restore",
    short: "Protecting and restoring weakened, damaged or heavily restored teeth.",
    body: "Dental crowns can help protect and restore teeth that are weakened, damaged or heavily restored, with the treatment plan tailored to the condition of the tooth.",
    img: 4,
  },
  {
    id: "implants",
    num: "06",
    name: "Dental Implants",
    group: "restore",
    short: "Replacing missing teeth — planned around oral health, bone condition and individual requirements.",
    body: "Dental implants can be used to replace missing teeth and restore everyday function. Treatment planning depends on the patient's oral health, bone condition and individual requirements.",
    img: 5,
  },
  {
    id: "cleaning",
    num: "07",
    name: "Teeth Cleaning & Scaling",
    group: "prevent",
    short: "Removing what daily brushing may not — supporting hygiene and gum health.",
    body: "Professional teeth cleaning and scaling help remove plaque and tartar that regular brushing may not eliminate completely, supporting better oral hygiene and gum health.",
    img: 2,
  },
  {
    id: "childrens",
    num: "08",
    name: "Children's Dentistry",
    group: "prevent",
    short: "Patience and reassurance, so younger patients feel comfortable while receiving care.",
    body: "Children often need a little more patience and reassurance during dental visits. The clinic's patient-focused approach aims to help younger patients feel comfortable while receiving the care they need.",
    img: 5,
  },
  {
    id: "aligners",
    num: "09",
    name: "Aligners & Orthodontic Care",
    group: "smile",
    short: "Alignment planned according to individual needs — for appearance and oral function.",
    body: "Teeth alignment can affect both appearance and oral function. Aligner and orthodontic solutions are planned according to individual alignment needs.",
    img: 3,
  },
  {
    id: "cosmetic",
    num: "10",
    name: "Cosmetic Dentistry",
    group: "smile",
    short: "Appearance, considered alongside natural proportions, function and your overall smile.",
    body: "Cosmetic dental treatments can improve the appearance of teeth while considering natural proportions, function and the patient's overall smile.",
    img: 4,
  },
];
const GROUPS: Group[] = [
  {
    id: "relief",
    roman: "I",
    name: "RELIEF",
    gloss: "URGENT & PROBLEM-FOCUSED CARE",
    treatmentIds: ["root-canal", "wisdom-tooth", "emergency"],
  },
  {
    id: "restore",
    roman: "II",
    name: "RESTORE",
    gloss: "RESTORATIVE CARE",
    treatmentIds: ["fillings", "crowns", "implants"],
  },
  {
    id: "prevent",
    roman: "III",
    name: "PREVENT",
    gloss: "PREVENTIVE & GENERAL CARE",
    treatmentIds: ["cleaning", "childrens"],
  },
  {
    id: "smile",
    roman: "IV",
    name: "SMILE",
    gloss: "COSMETIC & ALIGNMENT CARE",
    treatmentIds: ["aligners", "cosmetic"],
  },
];

const byId = new Map(TREATMENTS.map((t) => [t.id, t]));

export function Atlas() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const nudgeRef = useRef<((dir: number) => void) | null>(null);
  const dragMovedRef = useRef(0);
  const dialogOpenRef = useRef(false);
  const [lightbox, setLightbox] = useState<(typeof FILMSTRIP)[number] | null>(
    null
  );
  const [activeId, setActiveId] = useState(TREATMENTS[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  /* Treatments whose journey photo has been requested at least once.
     Chromium fetches loading="lazy" images even inside display:none
     subtrees, so mobile-only photos render on first activation only. */
  const [touched, setTouched] = useState<Set<string>>(
    () => new Set([TREATMENTS[0].id])
  );

  const active = byId.get(activeId) ?? TREATMENTS[0];
  const activeGroup = GROUPS.find((g) => g.id === active.group) ?? GROUPS[0];
  const activePlate = plate(active.img);

  const activate = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setExpandedId(null);
    setTouched((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const toggleBody = (id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  /* Reveal system - the Proof pattern: content stays fully visible
     without JavaScript; with JS, elements reveal as they arrive. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (typeof IntersectionObserver === "undefined") return; // stays visible
    section.setAttribute("data-atlas-ready", "true");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 0% 0px" }
    );
    section.querySelectorAll(".atlas-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* One scroll listener feeds --atlas-scroll (section progress 0..1) for
     the drafting field's barely-perceptible drift. Skipped entirely under
     reduced motion. Transform only, rAF-throttled. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const p = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
        section.style.setProperty("--atlas-scroll", p.toFixed(4));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  /* Filmstrip - a continuous, seamless marquee: the 22 plates are
     rendered twice and the track glides via transform, wrapping at half
     its width, so the loop is truly circular. It ALWAYS drifts on its
     own - slower under prefers-reduced-motion (~20px/s vs ~35px/s) -
     pausing on hover, keyboard focus and while the lightbox is open.
     The edge arrows glide one plate per click; dragging coexists with
     the drift; a click (not a drag) opens the single-plate lightbox.
     The viewport is edge-masked so plates fade in and out at both
     borders. */
  useEffect(() => {
    const viewport = railRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let hover = false;
    let focused = false;
    let onScreen = false;
    let tabHidden = document.hidden;
    let offset = 0;
    let trackWidth = 0;
    let frameStep = 0;
    let dragging = false;
    let startX = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let glide: {
      from: number;
      delta: number;
      start: number;
      dur: number;
    } | null = null;
    let frame = 0;
    let last = performance.now();

    const measure = () => {
      const items = track.querySelectorAll<HTMLElement>(".atlas-strip-item");
      if (items.length < 4) return;
      const half = items.length / 2;
      trackWidth = items[half].offsetLeft - items[0].offsetLeft;
      frameStep = trackWidth / half;
    };

    const autoAdvances = () =>
      !hover &&
      !focused &&
      onScreen &&
      !tabHidden &&
      !dialogOpenRef.current;

    /* Autoplay speed: always on, but calmer when the visitor has asked
       the system for reduced motion. */
    let autoSpeed = mq.matches ? 0.02 : 0.035;
    const onMqChange = () => {
      autoSpeed = mq.matches ? 0.02 : 0.035;
    };
    mq.addEventListener("change", onMqChange);

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (!dragging) {
        if (glide) {
          const t = Math.min((now - glide.start) / glide.dur, 1);
          offset = glide.from + glide.delta * (1 - Math.pow(1 - t, 3));
          if (t >= 1) glide = null;
        } else if (velocity !== 0) {
          velocity *= 0.94;
          offset -= velocity * dt;
          if (Math.abs(velocity) < 0.002) velocity = 0;
        } else if (autoAdvances() && trackWidth > 0) {
          offset += autoSpeed * dt; // ~35px/s (~20px/s reduced motion)
        }
      }
      if (trackWidth > 0) {
        const x = ((offset % trackWidth) + trackWidth) % trackWidth;
        track.style.transform = `translate3d(${-x}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      glide = null;
      velocity = 0;
      startX = lastX = e.clientX;
      startOffset = offset;
      lastT = performance.now();
      dragMovedRef.current = 0;
      viewport.classList.add("is-dragging");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - startX;
      velocity = (e.clientX - lastX) / Math.max(now - lastT, 1);
      lastX = e.clientX;
      lastT = now;
      offset = startOffset - dx;
      dragMovedRef.current = Math.max(dragMovedRef.current, Math.abs(dx));
    };
    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove("is-dragging");
    };

    nudgeRef.current = (dir: number) => {
      if (trackWidth === 0) return;
      glide = {
        from: offset,
        delta: dir * frameStep,
        start: performance.now(),
        dur: 450,
      };
    };

    const ro = new ResizeObserver(() => measure());
    ro.observe(track);
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((en) => en.isIntersecting);
      },
      { rootMargin: "10% 0px" }
    );
    io.observe(viewport);
    const onVis = () => {
      tabHidden = document.hidden;
    };
    /* Hover / focus pause covers the whole filmstrip block, including
       the edge overlay arrows, so drifting never fights a click. */
    const hoverZone = viewport.parentElement ?? viewport;
    const onEnter = () => {
      hover = true;
    };
    const onLeave = () => {
      hover = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    hoverZone.addEventListener("pointerenter", onEnter);
    hoverZone.addEventListener("pointerleave", onLeave);
    hoverZone.addEventListener("focusin", onFocusIn);
    hoverZone.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVis);

    measure();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      viewport.removeEventListener("focusin", onFocusIn);
      viewport.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onMqChange);
      nudgeRef.current = null;
    };
  }, []);

  /* Single-plate lightbox: native <dialog> gives focus trapping and
     Escape handling for free; the marquee pauses while it is open. */
  const openLightbox = (f: (typeof FILMSTRIP)[number]) => {
    if (dragMovedRef.current > 6) return; // it was a drag, not a click
    setLightbox(f);
  };

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    dialogOpenRef.current = Boolean(lightbox);
    if (lightbox && !d.open) d.showModal();
    if (!lightbox && d.open) d.close();
  }, [lightbox]);

  return (
    <section
      ref={sectionRef}
      id="treatments"
      className="atlas"
      aria-labelledby="atlas-title"
    >
      {/* Drafting field - the atlas identity: fine rules, coordinate
          lines and registration marks. Deliberately not the Hero's
          circular cover language. */}
      <svg
        className="atlas-draft"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        {[130, 300, 470, 640, 810, 980].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="900" />
        ))}
        <line x1="0" y1="170" x2="1200" y2="170" />
        <line x1="0" y1="640" x2="1200" y2="640" />
        {[
          [130, 170],
          [640, 170],
          [300, 640],
          [980, 640],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} className="atlas-draft-cross">
            <line x1={x - 9} y1={y} x2={x + 9} y2={y} />
            <line x1={x} y1={y - 9} x2={x} y2={y + 9} />
          </g>
        ))}
      </svg>

      <div className="atlas-shell">
        {/* ---------- Chapter head ---------- */}
        <header className="atlas-head">
          <span className="atlas-ghost display" aria-hidden="true">
            CARE
          </span>
          <p className="atlas-eyebrow eyebrow atlas-reveal">
            <span className="atlas-eyebrow-rule" aria-hidden="true" />
            DENTAL TREATMENTS IN TOLICHOWKI
          </p>
          <h2
            id="atlas-title"
            className="atlas-title display atlas-reveal"
            style={delay("0.08s")}
          >
            Comprehensive dental care,
            <br />
            tailored to your needs.
          </h2>
          <p className="atlas-intro atlas-reveal" style={delay("0.18s")}>
            The Tooth Dental Studio provides general, preventive, restorative,
            cosmetic and urgent dental care in Tolichowki, Hyderabad. Treatment
            begins with understanding your dental concern and choosing an
            approach suited to your individual needs.
          </p>
        </header>
        {/* ---------- The atlas: index + plate stage ---------- */}
        <div className="atlas-grid" data-territory={active.group}>
          <div className="atlas-index">
            <p className="atlas-index-head eyebrow atlas-reveal">
              <span>THE MAP OF CARE</span>
              <span className="atlas-index-meta">10 TREATMENTS · 4 TERRITORIES</span>
            </p>

            {GROUPS.map((group, gi) => (
              <div key={group.id} className={`atlas-territory atlas-territory--${group.id}`}>
                <h3
                  className="atlas-territory-name atlas-reveal"
                  style={delay(`${(0.06 * (gi + 1)).toFixed(2)}s`)}
                >
                  <span className="atlas-territory-roman" aria-hidden="true">
                    {group.roman}
                  </span>
                  <span className="atlas-territory-word">{group.name}</span>
                  <span className="atlas-territory-gloss">{group.gloss}</span>
                </h3>
                <ul className="atlas-list">
                  {group.treatmentIds.map((id) => {
                    const t = byId.get(id);
                    if (!t) return null;
                    return (
                      <li
                        key={id}
                        className={`atlas-item${activeId === id ? " is-active" : ""}`}
                      >
                        <button
                          type="button"
                          className="atlas-row focus-ring"
                          aria-pressed={activeId === id}
                          aria-controls="atlas-detail"
                          style={delay(`${(0.1 + Number(t.num) * 0.05).toFixed(2)}s`)}
                          onMouseEnter={() => activate(id)}
                          onFocus={() => activate(id)}
                          onClick={() => activate(id)}
                        >
                          <span className="atlas-row-num">T·{t.num}</span>
                          <span className="atlas-row-name">{t.name}</span>
                          <span className="atlas-row-mark" aria-hidden="true" />
                        </button>

                        {/* Mobile journey detail - opens under the active item */}
                        <div
                          className={`atlas-item-detail${
                            activeId === id ? " is-active" : ""
                          }`}
                        >
                          <div className="atlas-item-clip">
                            <figure className="atlas-item-figure">
                              {touched.has(id) && (
                                <Image
                                  src={POOL[t.img].src}
                                  alt={PHOTO_ALT}
                                  fill
                                  sizes="92vw"
                                  quality={72}
                                  loading="lazy"
                                  decoding="async"
                                />
                              )}
                              <figcaption className="atlas-caption">
                                <span>
                                  PLATE {plate(t.img)} · {POOL[t.img].label}
                                </span>
                                <span>REAL CLINICAL CARE</span>
                              </figcaption>
                            </figure>
                            <p className="atlas-detail-short">{t.short}</p>
                            <button
                              type="button"
                              className={`atlas-toggle focus-ring${
                                expandedId === id ? " is-open" : ""
                              }`}
                              aria-expanded={expandedId === id}
                              aria-controls={`atlas-body-${id}`}
                              onClick={() => toggleBody(id)}
                            >
                              <span>
                                {expandedId === id
                                  ? "Close the treatment"
                                  : "Understand the treatment"}
                              </span>
                              <i className="atlas-toggle-arrow" aria-hidden="true">
                                ↓
                              </i>
                            </button>
                            <div
                              id={`atlas-body-${id}`}
                              className={`atlas-body${expandedId === id ? " is-open" : ""}`}
                            >
                              <div className="atlas-body-clip">
                                <p>{t.body}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          {/* ---------- Plate stage (desktop + tablet) ---------- */}
          <aside
            id="atlas-detail"
            className="atlas-stage"
            aria-label="Selected treatment detail"
          >
            <div className="atlas-frame">
              {POOL.map((p, i) => (
                <Image
                  key={p.src}
                  className={`atlas-photo${active.img === i ? " is-active" : ""}`}
                  src={p.src}
                  alt={PHOTO_ALT}
                  fill
                  sizes="(max-width: 1023px) 46vw, 480px"
                  quality={76}
                  loading="lazy"
                  decoding="async"
                />
              ))}
              <p className="atlas-plate-caption" aria-hidden="true">
                <span>
                  <span className="atlas-swap" key={`p-${activeId}`}>
                    PLATE {activePlate} · {POOL[active.img].label}
                  </span>
                </span>
                <span>REAL CLINICAL CARE · THE TOOTH DENTAL STUDIO · TOLICHOWKI</span>
              </p>
            </div>

            <div className="atlas-detail">
              <span className="atlas-leader" aria-hidden="true" />
              <p className="atlas-detail-territory eyebrow">
                <span className="atlas-swap" key={`g-${activeId}`}>
                  {activeGroup.roman} · {activeGroup.name}
                </span>
              </p>
              <h3 className="atlas-detail-name display">
                <span className="atlas-swap" key={`n-${activeId}`}>
                  {active.name}
                </span>
              </h3>
              <p className="atlas-detail-short">
                <span className="atlas-swap atlas-swap-d1" key={`s-${activeId}`}>
                  {active.short}
                </span>
              </p>
              <button
                type="button"
                className={`atlas-toggle focus-ring${
                  expandedId === activeId ? " is-open" : ""
                }`}
                aria-expanded={expandedId === activeId}
                aria-controls="atlas-body"
                onClick={() => toggleBody(activeId)}
              >
                <span>
                  {expandedId === activeId
                    ? "Close the treatment"
                    : "Understand the treatment"}
                </span>
                <i className="atlas-toggle-arrow" aria-hidden="true">
                  ↓
                </i>
              </button>
              <div
                id="atlas-body"
                className={`atlas-body${expandedId === activeId ? " is-open" : ""}`}
              >
                <div className="atlas-body-clip">
                  <p>{active.body}</p>
                </div>
              </div>
              <p className="atlas-counter" aria-hidden="true">
                <span className="atlas-counter-current">{active.num}</span>
                <span className="atlas-counter-rule" />
                <span>10</span>
              </p>
            </div>
          </aside>
        </div>

        {/* ---------- THE WORK IN MOTION - clinical filmstrip ---------- */}
        <div className="atlas-strip-section">
          <header className="atlas-strip-head">
            <div>
              <h3 className="atlas-strip-title display atlas-reveal">
                THE WORK IN MOTION
              </h3>
              <p className="atlas-strip-sub atlas-reveal" style={delay("0.08s")}>
                Real clinical care, captured inside The Tooth Dental Studio.
              </p>
            </div>
            <div className="atlas-strip-headmeta">
              <p
                className="atlas-strip-meta eyebrow atlas-reveal"
                style={delay("0.14s")}
                aria-hidden="true"
              >
                22 PLATES · TREATMENT IN PROGRESS
              </p>
            </div>
          </header>
          <div className="atlas-strip-wrap atlas-reveal" style={delay("0.18s")}>
            <div
              ref={railRef}
              className="atlas-strip"
              role="region"
              aria-label="The Work in Motion — clinical treatment photographs from The Tooth Dental Studio. Moves slowly and continuously; hover to pause, drag to explore, select a plate to view it larger."
            >
              <div ref={trackRef} className="atlas-strip-track">
                {[...FILMSTRIP, ...FILMSTRIP].map((f, i) => {
                  const hidden = i >= FILMSTRIP.length;
                  return (
                    <figure
                      key={`${f.src}-${i}`}
                      className="atlas-strip-item"
                      aria-hidden={hidden || undefined}
                    >
                      <button
                        type="button"
                        className="atlas-strip-frame focus-ring"
                        tabIndex={hidden ? -1 : 0}
                        aria-label={`View clinical photograph ${f.num} — ${f.label} larger`}
                        onClick={() => openLightbox(f)}
                      >
                        <Image
                          src={f.src}
                          alt=""
                          fill
                          sizes="(max-width: 767px) 80vw, (max-width: 1023px) 45vw, 22vw"
                          quality={70}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </button>
                      <figcaption className="atlas-strip-seq">
                        <span>{f.num}</span>
                        <span> · {f.label}</span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>

            {/* Edge overlay arrows - glide one plate per click; they sit
                inside the fade band and pause the drift while hovered. */}
            <button
              type="button"
              className="atlas-strip-arrow atlas-strip-arrow--edge atlas-strip-arrow--prev focus-ring"
              aria-label="Move the filmstrip backward"
              onClick={(e) => {
                e.stopPropagation();
                nudgeRef.current?.(-1);
              }}
            >
              ←
            </button>
            <button
              type="button"
              className="atlas-strip-arrow atlas-strip-arrow--edge atlas-strip-arrow--next focus-ring"
              aria-label="Move the filmstrip forward"
              onClick={(e) => {
                e.stopPropagation();
                nudgeRef.current?.(1);
              }}
            >
              →
            </button>
          </div>

          {/* Single-plate lightbox - native <dialog>, no dependencies. */}
          <dialog
            ref={dialogRef}
            className="atlas-lightbox"
            aria-label="Clinical treatment photograph — The Tooth Dental Studio"
            onClick={(e) => {
              if (e.target === dialogRef.current) dialogRef.current?.close();
            }}
            onClose={() => setLightbox(null)}
          >
            <figure>
              {lightbox && (
                <Image
                  className="atlas-lightbox-img"
                  src={lightbox.src}
                  alt="Clinical dental treatment in progress at The Tooth Dental Studio, Tolichowki, Hyderabad"
                  width={1600}
                  height={1067}
                  sizes="92vw"
                  quality={85}
                  loading="eager"
                />
              )}
              <figcaption>
                <span>
                  PLATE {lightbox?.num} · {lightbox?.label}
                </span>
                <span>REAL CLINICAL CARE · TOLICHOWKI</span>
              </figcaption>
            </figure>
            <button
              type="button"
              className="atlas-lightbox-close focus-ring"
              aria-label="Close image"
              onClick={() => dialogRef.current?.close()}
            >
              ✕
            </button>
          </dialog>
        </div>

        {/* ---------- Compact editorial close ---------- */}
        <div className="atlas-end">
          <p className="atlas-end-bridge atlas-reveal">
            <span className="atlas-end-rule" aria-hidden="true" />
            10 TREATMENTS · ONE PLACE TO START
          </p>
          <p className="atlas-end-line atlas-reveal" style={delay("0.08s")}>
            Not sure where your concern fits?{" "}
            <a href="#contact" className="atlas-end-link focus-ring">
              Talk to the dentist.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}