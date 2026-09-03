/* ==================================================================
   SECTION 05 — THE DENTIST BEHIND THE CARE  ("The Practitioner's Portrait")
   ------------------------------------------------------------------
   The hero established WHO; Proof answered "why believe"; the Atlas
   answered "what treatments exist"; the Diagnosis answered "how the
   clinic understands what I need". This chapter answers the next
   question: "WHO WILL TREAT ME, AND WHY DO PATIENTS TRUST HIM?" -
   as an editorial profile spread, not a second doctor hero, not a
   doctor-directory card, not another review system. Its own identity:
   a transparent portrait CUT-OUT (photo 02's native alpha, mounted on the ivory like a print), a numbered approach index and
    verified patient sentiment as margin annotations beside two real
   patient moments (deliberately distinct from the Hero's cover,
   Proof's bridge, the Atlas's dark index and Diagnosis's journal
   plates).

   Content sources (nothing invented):
   - Eyebrow / H2 / designation / main copy / secondary-copy themes /
     personal statement: verbatim .agent/CANONICAL.md #7 SECTION 04
     (THE DOCTOR) and #19 (doctor entity).
   - Approach headlines (LISTEN / EXPLAIN / FOLLOW UP): canonical
     Section 06 care-method steps - verbatim. TREAT is omitted here:
     Section 03 already shows the treatment itself (the Atlas).
   - "What patients remember" glosses: fragments of the canonical
     secondary copy only. CALM / CLEAR / PERSONAL interpret the
     review evidence; they do not repeat or re-rank it.
   - Credentials: General Dentist · BDS · 9 years experience ·
     consults in English / Hindi / Telugu (clinic-verified facts).
     No specialist status, certifications, awards or pricing are
     claimed (CANONICAL #19 / #12).
   - Kid annotation: verified Google review excerpt, exact words -
     "He was kind and patient with kids." (Sridevi Reddy Aellala,
     the verified corpus used by the locked Hero). Never paraphrased.
   - The work strip: CASE 01 / CASE 02 labels only - the treatment
     identity of the before/after records is UNVERIFIED, so no
     treatment names or outcome claims are made (CANONICAL #14).
     Supporting note is the canonical Section 08 line verbatim.

   Imagery:
   - Doctor photo 02 (native transparent background) - mounted as a
      cut-out print; visually subordinate to the Hero portrait (01).
    - Happy Patient 01 + 03 only - the two photographs in which
     Dr. Imran's presence is confirmable. 02/04 excluded (clinician
     identity not confirmable behind masks/PPE).
   - Before/after 01 + 02 only - already-combined stacked records;
     03 excluded (baked-in text). No comparison interaction.

   Behaviour:
   - Reveal gating: .doctor[data-doctor-ready] is set from JS so all
     content stays fully visible without JavaScript.
   - The approach index (LISTEN / EXPLAIN / FOLLOW UP) reads as one
     row of three numbered movements from tablet up; stacked index
     rows on mobile.
   - "What patients remember" is a separate quiet annotation (no
     counters, no rules - deliberately unlike the numbered approach
     index) and sits under the portrait on desktop.
   - Mobile: vertical human narrative; patient moments become a
     horizontal snap rail (internal scroll only); from tablet up
     they form one staggered 4-up band; the case strip is a rail.
     No horizontal page overflow.
   - All motion is transform/opacity/clip-path only.
     Reduced motion: calm, everything readable.
   ================================================================== */

"use client";

import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";

const PORTRAIT_SRC =
  "/images/Dr photo/dr-mohammed-imran-ali-tooth-dental-studio-hyderabad-02.png";

const HAPPY_BASE =
  "/images/Happy Patient/dr-mohammed-imran-ali-happy-patient-tooth-dental-studio-hyderabad";

const CASE_BASE =
  "/images/before-after/tooth-dental-studio-before-after-treatment-tolichowki-hyderabad";

/* Canonical care-method steps (CANONICAL #7 Section 06), headlines
   verbatim. The doctor's approach in three movements. */
const APPROACH = [
  { word: "LISTEN", gloss: "Start with the problem, not the procedure." },
  { word: "EXPLAIN", gloss: "Know what we\u2019re doing \u2014 and why." },
  { word: "FOLLOW UP", gloss: "Care shouldn\u2019t end at the dental chair." },
];

/* Fragments of the canonical Section 04 secondary copy - what the
   reviews consistently highlight, interpreted in three words. */
const REMEMBER = [
  { word: "CALM", gloss: "A calm and friendly manner." },
  { word: "CLEAR", gloss: "Careful explanations before care begins." },
  { word: "PERSONAL", gloss: "Personal attention throughout the dental journey." },
];

/* THE WORK - the complete clinical case library. All EIGHT before/after
   records are presented in one horizontal editorial rail (CANONICAL #14:
   treatment identities UNVERIFIED, so every plate is labelled CASE 0N
   only - no treatment names, no outcome claims, no guarantees). Three
   records carry the clinic's own baked-in labels (03 "COMPOSITE",
   04 "RPD", 05 "Cosmetic Restoration / DR. IMRAN"); they are shown
   unaltered as part of the authentic record - we never add labels,
   never crop clinical content (object-fit: contain on a mat). */
const CASES = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  num: `0${n}`,
  src: `${CASE_BASE}-0${n}.jpg`,
  alt: `Before and after dental case record, Case 0${n}, from The Tooth Dental Studio, Tolichowki, Hyderabad`,
}));

/* PATIENT MOMENTS - all four Happy Patient photographs participate.
   01 and 03 show Dr. Imran with patients (captioned, with the verified
   review quote). 02 and 04 are presented as unattributed studio
   moments: the clinician's identity cannot be confirmed behind
   masks/PPE, so no doctor attribution is claimed in alt or caption. */
const MOMENTS: {
  key: string;
  src: string;
  alt: string;
  quote?: string;
  meta: string;
}[] = [
  {
    key: "a",
    src: `${HAPPY_BASE}-01.webp`,
    alt: "Dr. Mohammed Imran Ali with a young patient giving a thumbs up after treatment at The Tooth Dental Studio, Tolichowki, Hyderabad",
    quote: "He was kind and patient with kids.",
    meta: "AFTER TREATMENT · TOLICHOWKI — SRIDEVI REDDY AELLALA",
  },
  {
    key: "b",
    src: `${HAPPY_BASE}-03.webp`,
    alt: "Dr. Mohammed Imran Ali with a patient in the dental chair after treatment at The Tooth Dental Studio, Tolichowki, Hyderabad",
    meta: "PERSONAL ATTENTION · THE STUDIO, TOLICHOWKI",
  },
  {
    key: "c",
    src: `${HAPPY_BASE}-02.webp`,
    alt: "A patient taking a photo after treatment at The Tooth Dental Studio, Tolichowki, Hyderabad",
    meta: "REAL VISITS · TOLICHOWKI",
  },
  {
    key: "d",
    src: `${HAPPY_BASE}-04.webp`,
    alt: "A patient cared for in the dental chair at The Tooth Dental Studio, Tolichowki, Hyderabad",
    meta: "COMFORT DURING TREATMENT · TOLICHOWKI",
  },
];

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

export function Doctor() {
  const sectionRef = useRef<HTMLElement | null>(null);

  /* Reveal system - the Proof/Atlas/Diagnosis pattern: content stays
     fully visible without JavaScript; with JS, elements reveal on
     arrival. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (typeof IntersectionObserver === "undefined") return; // stays visible
    section.setAttribute("data-doctor-ready", "true");
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
    section.querySelectorAll(".doctor-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ----- The Work rail: a native scroll container (wheel / trackpad /
     touch scroll for free), with mouse-drag, arrow keys, prev/next
     controls and a scroll-synced 01/08 progress readout. Reduced
     motion scrolls without smoothing. ----- */
  const railRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(1);
  const [activeCase, setActiveCase] = useState(1);
  const dragRef = useRef({ down: false, startX: 0, startLeft: 0 });

  const goToCase = (n: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelectorAll<HTMLElement>(".doctor-case")[n - 1];
    if (!card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({
      left: card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const stepCase = (dir: 1 | -1) => {
    goToCase(Math.min(CASES.length, Math.max(1, activeRef.current + dir)));
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const cards = rail.querySelectorAll<HTMLElement>(".doctor-case");
        if (!cards.length) return;
        const center = rail.scrollLeft + rail.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((card, i) => {
          const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        activeRef.current = best + 1;
        setActiveCase(best + 1);
      });
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      rail.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const onRailPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // touch / pen use native scrolling
    const rail = railRef.current;
    if (!rail) return;
    dragRef.current = { down: true, startX: e.clientX, startLeft: rail.scrollLeft };
    rail.setPointerCapture(e.pointerId);
  };
  const onRailPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !dragRef.current.down) return;
    rail.scrollLeft = dragRef.current.startLeft - (e.clientX - dragRef.current.startX);
  };
  const onRailPointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    dragRef.current.down = false;
    if (rail?.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
  };
  const onRailKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      stepCase(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepCase(-1);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="doctor"
      className="doctor"
      aria-labelledby="doctor-title"
    >
      <div className="doctor-shell">
        <div className="doctor-spread">
          {/* ---------- Chapter head: who he is ---------- */}
          <header className="doctor-head">
            <p className="doctor-eyebrow eyebrow doctor-reveal">
              <span className="doctor-eyebrow-rule" aria-hidden="true" />
              THE DENTIST BEHIND THE STUDIO
            </p>
            <h2
              id="doctor-title"
              className="doctor-title display doctor-reveal"
              style={delay("0.06s")}
            >
              Dr. Mohammed
              <br />
              Imran Ali
            </h2>
            <p className="doctor-cred doctor-reveal" style={delay("0.12s")}>
              <span>GENERAL DENTIST · BDS</span>
              <span>9 YEARS EXPERIENCE</span>
            </p>
            <p
              className="doctor-cred doctor-cred--lang doctor-reveal"
              style={delay("0.15s")}
            >
              CONSULTS IN ENGLISH · HINDI · TELUGU
            </p>
            <p className="doctor-intro doctor-reveal" style={delay("0.2s")}>
              Dr. Mohammed Imran Ali approaches dentistry with a simple
              priority: understand the patient, explain the treatment clearly,
              and make the experience as comfortable as possible.
            </p>
          </header>

          {/* ---------- The portrait: a transparent cut-out, mounted like a print ---------- */}<figure className="doctor-portrait doctor-reveal">
            <span className="doctor-portrait-plate">
              <Image
                className="doctor-portrait-img"
                src={PORTRAIT_SRC}
                alt="Dr. Mohammed Imran Ali, general dentist at The Tooth Dental Studio in Tolichowki, Hyderabad"
                width={680} height={383}
                sizes="(max-width: 767px) 82vw, (max-width: 1023px) 44vw, 470px"
                quality={85}
                loading="lazy"
                decoding="async"
              />
            </span>
            <figcaption className="doctor-portrait-caption">
              <span>THE DENTIST · THE TOOTH DENTAL STUDIO</span>
              <span>TOLICHOWKI · HYDERABAD</span>
            </figcaption>
          </figure>

          {/* ---------- His approach: how he works, in three movements ---------- */}
          <div className="doctor-story">
            <div
              className="doctor-approach"
              aria-label="How Dr. Imran works with patients"
            >
              {APPROACH.map((s, i) => (
                <div
                  key={s.word}
                  className="doctor-step doctor-reveal"
                  style={delay(`${(0.08 + i * 0.1).toFixed(2)}s`)}
                >
                  <span className="doctor-step-num" aria-hidden="true">
                    {`0${i + 1}`}
                  </span>
                  <h3 className="doctor-step-word display">{s.word}</h3>
                  <p className="doctor-step-gloss">{s.gloss}</p>
                </div>
              ))}
            </div>
            <blockquote className="doctor-quote doctor-reveal">
              <p>&ldquo;Your dental health is my priority.&rdquo;</p>
              <cite>— Dr. Mohammed Imran Ali</cite>
            </blockquote>
            <p className="doctor-close doctor-reveal" style={delay("0.08s")}>
              <a href="#contact" className="doctor-close-link focus-ring">
                Talk to the dentist <span aria-hidden="true">→</span>
              </a>
            </p>
          </div>

          {/* ---------- What patients remember: a quiet annotation,
             no counters, no rules - deliberately unlike the numbered
             approach index. Sits under the portrait on desktop. ---------- */}
          <div
            className="doctor-remember doctor-reveal"
            aria-label="What patients remember about Dr. Imran"
          >
            <p className="doctor-remember-head">WHAT PATIENTS REMEMBER</p>
            <ul className="doctor-remember-list">
              {REMEMBER.map((r) => (
                <li key={r.word}>
                  <span className="doctor-remember-word">{r.word}</span>
                  <span className="doctor-remember-gloss">{r.gloss}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Patient moments: one staggered 4-up band ---------- */}
          <div className="doctor-moments">
            <div className="doctor-moment-cluster">
              <p className="doctor-moment-head doctor-reveal">
                PATIENT MOMENTS · REAL VISITS AT THE STUDIO
              </p>
              <div className="doctor-moment-row gallery">
                {MOMENTS.map((m, i) => (
                  <figure
                    key={m.key}
                    className={`doctor-moment doctor-moment--${m.key} doctor-reveal`}
                    style={delay(`${(i * 0.08).toFixed(2)}s`)}
                  >
                    <span className="doctor-moment-frame">
                      <Image
                        src={m.src}
                        alt={m.alt}
                        fill
                        sizes="(max-width: 767px) 46vw, 23vw"
                        quality={85}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <figcaption className="doctor-moment-caption">
                      {m.quote ? (
                        <span className="doctor-moment-quote">
                          &ldquo;{m.quote}&rdquo;
                        </span>
                      ) : null}
                      <span className="doctor-moment-meta">{m.meta}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- The work: the complete case archive, one rail ---------- */}
          <div className="doctor-work">
            <p className="doctor-work-head doctor-reveal">
              <span>THE WORK</span>
              <span className="doctor-work-sub">
                Clinical cases from The Tooth Dental Studio.
              </span>
            </p>
            <div
              ref={railRef}
              className="doctor-work-rail gallery focus-ring"
              role="region"
              aria-label="Clinical case records — scroll, drag, or use the arrow keys to browse all eight cases"
              tabIndex={0}
              onKeyDown={onRailKeyDown}
              onPointerDown={onRailPointerDown}
              onPointerMove={onRailPointerMove}
              onPointerUp={onRailPointerEnd}
              onPointerCancel={onRailPointerEnd}
            >
              {CASES.map((c, i) => (
                <figure
                  key={c.num}
                  className="doctor-case doctor-reveal"
                  style={delay(`${(i * 0.06).toFixed(2)}s`)}
                >
                    <span className="doctor-case-frame">
                      <Image
                        src={c.src}
                        alt={c.alt}
                        fill
                        sizes="(max-width: 767px) 62vw, (max-width: 1023px) 30vw, 246px"
                        quality={85}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <figcaption className="doctor-case-caption">
                      <span>{`CASE ${c.num}`}</span>
                      <span>BEFORE / AFTER · CLINICAL CASE</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="doctor-work-foot doctor-reveal">
                <p className="doctor-work-note">
                  Real clinic. Real dentistry. Real patient care.
                </p>
                <div className="doctor-work-controls">
                  <button
                    type="button"
                    className="doctor-work-arrow focus-ring"
                    aria-label="Previous case"
                    disabled={activeCase === 1}
                    onClick={() => stepCase(-1)}
                  >
                    ←
                  </button>
                  <div className="doctor-work-progress">
                    <div
                      className="doctor-work-segments"
                      role="group"
                      aria-label="Go to a specific case"
                    >
                      {CASES.map((c) => (
                        <button
                          key={c.num}
                          type="button"
                          className={`doctor-work-seg focus-ring${
                            activeCase === Number(c.num) ? " is-active" : ""
                          }`}
                          aria-label={`View case ${c.num}`}
                          aria-current={
                            activeCase === Number(c.num) || undefined
                          }
                          onClick={() => goToCase(Number(c.num))}
                        >
                          <span className="doctor-work-seg-bar" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                    <p className="doctor-work-count" aria-live="polite">
                      {`0${activeCase} / 08`}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="doctor-work-arrow focus-ring"
                    aria-label="Next case"
                    disabled={activeCase === CASES.length}
                    onClick={() => stepCase(1)}
                  >
                    →
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}

