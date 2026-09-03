"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";

/* ==================================================================
   SECTION 04 — DIAGNOSIS & PRECISION  ("The Clinical Study")
   ------------------------------------------------------------------
   The hero established WHO; Proof answered "why believe"; the Atlas
   answered "what treatments exist". This chapter answers the next
   question: "HOW DOES THE CLINIC UNDERSTAND WHAT I NEED?" - as an
   editorial clinical study on warm ivory, not a technology showcase,
   not a fake diagnostic UI, not an X-ray gallery without a story.
   Its own identity: radiographic plates mounted like journal plates
   on paper, a vertical process spine and documentary case indexing
   (deliberately distinct from the Hero's cover, Proof's bridge and
   the Atlas's dark typographic index).

   Content sources (nothing invented):
   - Eyebrow / H2 / paragraph / closing line / process
     (EXAMINE -> UNDERSTAND -> PLAN -> TREAT): verbatim
     .agent/CANONICAL.md #7 SECTION 10 - DIAGNOSIS & PRECISION.
   - Stage glosses are distillations of the canonical paragraph only.
   - Plate labels come exclusively from the canonical X-ray label
     table; no diagnosis, severity, tooth number, prognosis or
     treatment necessity is ever asserted (CANONICAL #16).

   Imagery - the clinic's three real X-rays only, shown in full
   (no CSS detail crops of radiograph regions; the lightbox is where
   genuine detail reading happens):
   - 02  panoramic        -> PLATE 01 · DENTAL X-RAY · CLINICAL IMAGING
   - 03  wisdom teeth     -> CASE FILE 01 · WISDOM TEETH RCT · CLINICAL CASE
   - 01  file retrieval   -> CASE FILE 02 · FILE RETRIEVAL · CLINICAL CASE
   The panoramic plate is presented with a cover fit that trims only
   the film's own black mount so the radiograph band reads clearly;
   the complete film remains available in the lightbox.

   Behaviour:
   - Desktop: dominant film plate left, process spine right (sticky).
     Scroll progress through the study advances the spine through
     EXAMINE -> UNDERSTAND -> PLAN -> TREAT and fills the tick ruler.
   - Tablet: full-width film with a horizontal four-stage strip.
   - Clinical archive: the two case records sit beneath the study as
     compact, clearly subordinate evidence (offset pair >=768px,
     horizontal swipe rail with snap points below 768px).
   - Mobile: a vertical clinical narrative; compact, capped heights.
   - Plates open a single-plate lightbox (native <dialog>, no
     dependencies) for real detail reading.
   - Reveal gating: .diagnosis[data-diagnosis-ready] is set from JS,
     so all content stays fully visible without JavaScript.
   - All motion is transform/opacity/clip-path only.
     Reduced motion: calm, everything readable.
   ================================================================== */

const XRAY_BASE =
  "/images/x-ray/tooth-dental-studio-treatment-xray-tolichowki-hyderabad";

type Plate = {
  src: string;
  w: number;
  h: number;
  index: string;
  title: string;
  qualifier: string;
  alt: string;
};

/* Labels and order follow the canonical X-ray presentation table.
   Alts describe what the record IS (image type + baked-in clinical
   title), never a clinical interpretation. */
const PLATES: Record<"imaging" | "wisdom" | "retrieval", Plate> = {
  imaging: {
    src: `${XRAY_BASE}-02.jpg`,
    w: 1440,
    h: 1800,
    index: "PLATE 01",
    title: "DENTAL X-RAY",
    qualifier: "CLINICAL IMAGING",
    alt: "Dental X-ray (orthopantomogram) used for clinical examination and treatment planning at The Tooth Dental Studio, Tolichowki, Hyderabad",
  },
  wisdom: {
    src: `${XRAY_BASE}-03.jpg`,
    w: 1080,
    h: 1620,
    index: "CASE FILE 01",
    title: "WISDOM TEETH RCT",
    qualifier: "CLINICAL CASE",
    alt: "Dental X-ray case record titled Wisdom Teeth RCT, Dr. Imran Ali, combining a panoramic view with close-up radiographs, from The Tooth Dental Studio, Hyderabad",
  },
  retrieval: {
    src: `${XRAY_BASE}-01.jpg`,
    w: 1080,
    h: 1080,
    index: "CASE FILE 02",
    title: "FILE RETRIEVAL",
    qualifier: "CLINICAL CASE",
    alt: "Dental X-ray case record titled File Retrieval, combining radiographs with a clinical photograph, from The Tooth Dental Studio, Hyderabad",
  },
};

/* Canonical process (CANONICAL #7 SECTION 10). Glosses are
   distillations of the approved paragraph - no new claims. */
const STAGES = [
  { word: "EXAMINE", gloss: "Not everything shows at the surface." },
  { word: "UNDERSTAND", gloss: "Examination and imaging show what is happening." },
  { word: "PLAN", gloss: "Understanding shapes appropriate treatment." },
  { word: "TREAT", gloss: "Treatment follows understanding." },
];

const delay = (v: string) => ({ "--d": v }) as CSSProperties;

export function Diagnosis() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const studyRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [lightbox, setLightbox] = useState<Plate | null>(null);
  /* 0 EXAMINE · 1 UNDERSTAND · 2 PLAN · 3 TREAT - driven by scroll
     progress through the study, not by fake interactivity. */
  const [stage, setStage] = useState(0);

  /* Reveal system - the Proof/Atlas pattern: content stays fully
     visible without JavaScript; with JS, elements reveal on arrival. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (typeof IntersectionObserver === "undefined") return; // stays visible
    section.setAttribute("data-diagnosis-ready", "true");
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
    section.querySelectorAll(".diagnosis-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* One rAF-throttled scroll listener feeds two CSS variables and the
     process stage: --diagnosis-scroll (section drift) and --study-p
     (study progress, fills the tick ruler). Skipped entirely under
     reduced motion. Transform/opacity only. */
  useEffect(() => {
    const section = sectionRef.current;
    const study = studyRef.current;
    if (!section || !study) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Calm: full spine, no scroll listener. Deferred out of the
      // synchronous effect body (no cascading render).
      const r = requestAnimationFrame(() => setStage(STAGES.length - 1));
      return () => cancelAnimationFrame(r);
    }
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const vh = window.innerHeight || 1;
        const r = study.getBoundingClientRect();
        const p = Math.min(Math.max((vh * 0.72 - r.top) / r.height, 0), 1);
        study.style.setProperty("--study-p", p.toFixed(4));
        const s = p <= 0.14 ? 0 : p <= 0.44 ? 1 : p <= 0.74 ? 2 : 3;
        setStage((cur) => (cur === s ? cur : s));
        const rs = section.getBoundingClientRect();
        const ps = Math.min(Math.max((vh - rs.top) / (vh + rs.height), 0), 1);
        section.style.setProperty("--diagnosis-scroll", ps.toFixed(4));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Single-plate lightbox: native <dialog> gives focus trapping and
     Escape handling for free (the Atlas pattern). */
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (lightbox && !d.open) d.showModal();
    if (!lightbox && d.open) d.close();
  }, [lightbox]);

  const imaging = PLATES.imaging;
  const wisdom = PLATES.wisdom;
  const retrieval = PLATES.retrieval;

  return (
    <section
      ref={sectionRef}
      id="diagnosis"
      className="diagnosis"
      aria-labelledby="diagnosis-title"
    >
      {/* Ledger field - the study identity: faint ruled paper, fine
          registration crosses. Marginal geometry only - nothing is
          ever drawn over the radiographs themselves. */}
      <svg
        className="diagnosis-ledger"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        {[150, 400, 650, 900, 1150].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="900" />
        ))}
        <line x1="0" y1="120" x2="1200" y2="120" />
        <line x1="0" y1="780" x2="1200" y2="780" />
        {[
          [150, 120],
          [900, 120],
          [400, 780],
          [1150, 780],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} className="diagnosis-ledger-cross">
            <line x1={x - 9} y1={y} x2={x + 9} y2={y} />
            <line x1={x} y1={y - 9} x2={x} y2={y + 9} />
          </g>
        ))}
      </svg>

      <div className="diagnosis-shell">
        {/* ---------- Chapter head ---------- */}
        <header className="diagnosis-head">
          <span className="diagnosis-ghost display" aria-hidden="true">
            SEE
          </span>
          <p className="diagnosis-eyebrow eyebrow diagnosis-reveal">
            <span className="diagnosis-eyebrow-rule" aria-hidden="true" />
            BEYOND WHAT YOU CAN SEE
          </p>
          <h2
            id="diagnosis-title"
            className="diagnosis-title display diagnosis-reveal"
            style={delay("0.08s")}
          >
            Better treatment begins
            <br />
            with better understanding.
          </h2>
          <p className="diagnosis-intro diagnosis-reveal" style={delay("0.18s")}>
            Some dental problems are not fully visible from the surface. Clinical
            examination and dental imaging can help the dentist understand what is
            happening and plan appropriate treatment.
          </p>
        </header>

        {/* ---------- The study: film plate + process spine ---------- */}
        <div ref={studyRef} className="diagnosis-study" data-stage={stage}>
          <figure className="diagnosis-film diagnosis-reveal">
            <button
              type="button"
              className="diagnosis-plate diagnosis-plate--main focus-ring"
              aria-label="View the dental X-ray enlarged"
              onClick={() => setLightbox(imaging)}
            >
              <span className="diagnosis-plate-mat">
                <Image
                  className="diagnosis-plate-img"
                  src={imaging.src}
                  alt={imaging.alt}
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1279px) 88vw, 760px"
                  quality={85}
                  loading="lazy"
                  decoding="async"
                />
                <span className="diagnosis-ticks" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </span>
            </button>
            <figcaption className="diagnosis-caption">
              <span className="diagnosis-caption-index">
                {imaging.index} · {imaging.title}
              </span>
              <span className="diagnosis-caption-meta">
                {imaging.qualifier} · THE TOOTH DENTAL STUDIO · TOLICHOWKI
              </span>
            </figcaption>
            {/* Tick ruler - fills with study progress (decorative). */}
            <span className="diagnosis-ruler" aria-hidden="true">
              <span className="diagnosis-ruler-fill" />
            </span>
          </figure>

          <aside className="diagnosis-spine" aria-label="How care begins">
            <span className="diagnosis-spine-track" aria-hidden="true">
              <span className="diagnosis-spine-progress" />
            </span>
            <ol className="diagnosis-stages">
              {STAGES.map((s, i) => (
                <li
                  key={s.word}
                  className={`diagnosis-stage${stage >= i ? " is-active" : ""}`}
                  aria-current={stage === i ? "step" : undefined}
                >
                  <span className="diagnosis-stage-node" aria-hidden="true" />
                  <span className="diagnosis-stage-body">
                    <span className="diagnosis-stage-word">{s.word}</span>
                    <span className="diagnosis-stage-gloss">{s.gloss}</span>
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        {/* ---------- Clinical archive - compact supporting records ----------
            Deliberately subordinate to the primary study: small
            exact-format plates, documentary labels, one archival head.
            Mobile: a horizontal evidence rail (internal scroll only). */}
        <div className="diagnosis-archive">
          <p className="diagnosis-archive-head diagnosis-reveal">
            <span>SUPPORTING CLINICAL RECORDS</span>
            <span className="diagnosis-archive-count">
              02 RECORDS · THE TOOTH DENTAL STUDIO
            </span>
          </p>
          <div className="diagnosis-archive-rail">
            <figure className="diagnosis-record diagnosis-record--a diagnosis-reveal">
              <button
                type="button"
                className="diagnosis-plate diagnosis-plate--record focus-ring"
                aria-label="View the Wisdom Teeth RCT case record enlarged"
                onClick={() => setLightbox(wisdom)}
              >
                <span className="diagnosis-plate-mat">
                  <Image
                    className="diagnosis-plate-img"
                    src={wisdom.src}
                    alt={wisdom.alt}
                    fill
                    sizes="(max-width: 767px) 72vw, 320px"
                    quality={85}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="diagnosis-ticks" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </span>
              </button>
              <figcaption className="diagnosis-caption diagnosis-caption--record">
                <span className="diagnosis-caption-index">
                  {wisdom.index} · {wisdom.title}
                </span>
                <span className="diagnosis-caption-meta">{wisdom.qualifier}</span>
              </figcaption>
            </figure>

            <figure
              className="diagnosis-record diagnosis-record--b diagnosis-reveal"
              style={delay("0.1s")}
            >
              <button
                type="button"
                className="diagnosis-plate diagnosis-plate--record focus-ring"
                aria-label="View the File Retrieval case record enlarged"
                onClick={() => setLightbox(retrieval)}
              >
                <span className="diagnosis-plate-mat">
                  <Image
                    className="diagnosis-plate-img"
                    src={retrieval.src}
                    alt={retrieval.alt}
                    fill
                    sizes="(max-width: 767px) 72vw, 268px"
                    quality={85}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="diagnosis-ticks" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </span>
              </button>
              <figcaption className="diagnosis-caption diagnosis-caption--record">
                <span className="diagnosis-caption-index">
                  {retrieval.index} · {retrieval.title}
                </span>
                <span className="diagnosis-caption-meta">{retrieval.qualifier}</span>
              </figcaption>
            </figure>
          </div>

          {/* ---------- Editorial close - occupies the whitespace right of
              the records on desktop (>=1024); full-width row below the
              archive on tablet and mobile ---------- */}
          <div className="diagnosis-end">
            <p className="diagnosis-end-line diagnosis-reveal">
              <span className="diagnosis-end-rule" aria-hidden="true" />
              The clearer the diagnosis, the more informed the treatment
              conversation.
            </p>
            <p
              className="diagnosis-end-action diagnosis-reveal"
              style={delay("0.08s")}
            >
              <a href="#contact" className="diagnosis-end-link focus-ring">
                Talk to the dentist
                <span aria-hidden="true"> →</span>
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Single-plate lightbox - native <dialog>, no dependencies. */}
      <dialog
        ref={dialogRef}
        className="diagnosis-lightbox"
        aria-label="Clinical X-ray record — The Tooth Dental Studio"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        onClose={() => setLightbox(null)}
      >
        <figure>
          {lightbox && (
            <Image
              className="diagnosis-lightbox-img"
              src={lightbox.src}
              alt={lightbox.alt}
              width={lightbox.w}
              height={lightbox.h}
              sizes="92vw"
              quality={85}
              loading="eager"
            />
          )}
          <figcaption>
            <span>
              {lightbox?.index} · {lightbox?.title} · {lightbox?.qualifier}
            </span>
            <span>REAL CLINICAL RECORD · TOLICHOWKI · HYDERABAD</span>
          </figcaption>
        </figure>
        <button
          type="button"
          className="diagnosis-lightbox-close focus-ring"
          aria-label="Close image"
          onClick={() => dialogRef.current?.close()}
        >
          ✕
        </button>
      </dialog>
    </section>
  );
}


