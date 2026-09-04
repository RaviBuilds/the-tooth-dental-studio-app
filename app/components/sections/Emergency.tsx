/* ==================================================================
   SECTION 07 — WHEN YOU NEED A DENTIST NOW  ("THE RESPONSE")
   ------------------------------------------------------------------
   Chapters 01–06 built the trust (who / why believe / what treatments
   / how they understand / who treats / where). This chapter converts
   that trust into immediate confidence and action: "If serious pain
   hits me at the wrong hour, I know where I can reach someone."

   Editorial metaphor — THE RESPONSE: a fine gold signal line travels
   the composition through four nodes (TIME → NEED → CALL → CARE) and
   hands the eye to the section's single strongest action, the
   CALL FOR URGENT CARE phone response. Not a dashboard, not a card
   grid — one authored print composition on warm ivory (the breathing
   point after the dark Studio chapter).

   Content sources (nothing invented):
   - Eyebrow / H2 / main copy / supporting copy / CTA: verbatim
     .agent/CANONICAL.md SECTION 07 (EMERGENCY CARE).
   - Urgent-concern sequence: the four concerns named in CANONICAL
     SECTION 09 "Emergency Dental Care", presented as one flowing
     editorial annotation line, never as cards.
   - Quote + attribution: verbatim CANONICAL SECTION 11, "When pain
     happens at the wrong hour" (Hamza Mohammed). Not rewritten.
   - Phone: 099663 40056 (CANONICAL contact; tel:+919966340056).

   24/7 CONTENT SAFETY (CANONICAL §7 Section 07 note + §12):
   The canonical large statement "24/7 EMERGENCY DENTAL CARE" carries
   the verification note: "This wording should be verified against the
   clinic's current operational policy before the production website
   goes live." It is therefore NOT rendered as a fact in this build.
   EMERGENCY_24_7_VERIFIED below is the single switch: once the clinic
   confirms its policy, flip it and the approved statement renders
   under the 12 AM timestamp. Until then the verified 12 AM review
   excerpt carries the section's emotional proof on its own.

   Background: warm ivory print ground (ruled baselines, gold
   registration crosses, corner trim marks) under the section's ghost
   identity word NOW — unique across the site (REPUTATION / CARE /
   SEE / DOCTOR / CLINIC are taken), cropped off the right edge.

   Behaviour:
   - Reveal gating: .emergency[data-emergency-ready] is set from JS
     so all content stays fully visible without JavaScript (the
     Hero→Studio pattern). Masked title lines are observed on their
     MASK element, not the masked inner line — the hidden inner sits
     outside the mask's clip box and IntersectionObserver clips
     targets by ancestor overflow (Proof.tsx finding).
   - Ambient life: one calm signal system only — a gold dot travelling
     the response line and a restrained ring on the CALL node — gated
     to run while the section is on screen (data-emergency-active)
     and fully disabled under prefers-reduced-motion.
   - All motion is transform/opacity/clip-path (the traveller animates
     `left` in % on a single 7px element — negligible cost).
   ================================================================== */

"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/* Content-safety switch — see the 24/7 note in the header above.
   Flip to true ONLY after the clinic verifies its operating policy. */
const EMERGENCY_24_7_VERIFIED = false;

const PHONE_DISPLAY = "099663 40056";
const PHONE_TEL = "tel:+919966340056";
const PHONE_ARIA = "Call for urgent care — 099663 40056";

/* The four urgent concerns named in CANONICAL SECTION 09. */
const CONCERNS = [
  "SUDDEN PAIN",
  "DAMAGED TOOTH",
  "WISDOM-TOOTH PROBLEM",
  "URGENT CONCERN",
];

/* The response path: editorial nodes on the gold signal line.
   x = horizontal position within the signal strip; d = reveal delay
   tuned so each node lights as the drawn line reaches it. */
const NODES: { label: string; x: string; d: string; call?: boolean }[] = [
  { label: "TIME", x: "5%", d: "0.95s" },
  { label: "NEED", x: "32%", d: "1.15s" },
  { label: "CALL", x: "63%", d: "1.35s", call: true },
  { label: "CARE", x: "90%", d: "1.55s" },
];

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

export function Emergency() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") return; // stays visible
    section.setAttribute("data-emergency-ready", "true");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    section
      .querySelectorAll(".emergency-reveal")
      .forEach((el) => io.observe(el));
    // Masks are observed, not their clipped inner lines (see header).
    section
      .querySelectorAll(".emergency-line")
      .forEach((el) => io.observe(el));

    /* The ambient signal runs only while the chapter is on screen. */
    const ambient = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            section.setAttribute("data-emergency-active", "true");
          } else {
            section.removeAttribute("data-emergency-active");
          }
        }
      },
      { threshold: 0.15 },
    );
    ambient.observe(section);

    return () => {
      io.disconnect();
      ambient.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="emergency"
      className="emergency"
      aria-labelledby="emergency-title"
    >
      {/* Print field — the chapter's ground identity in the light
          editorial convention (the Doctor/Studio fields, inverted for
          ivory). Marginal geometry only, never drawn over content. */}
      <svg
        className="emergency-field"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        {[150, 330, 510, 690, 830].map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} />
        ))}
        <line x1="70" y1="0" x2="70" y2="900" />
        <line x1="1130" y1="0" x2="1130" y2="900" />
        {(
          [
            [70, 330],
            [1130, 150],
            [70, 690],
            [1130, 830],
          ] as const
        ).map(([x, y]) => (
          <g key={`${x}-${y}`} className="emergency-field-cross">
            <line x1={x - 9} y1={y} x2={x + 9} y2={y} />
            <line x1={x} y1={y - 9} x2={x} y2={y + 9} />
          </g>
        ))}
        {(
          [
            [34, 34],
            [1166, 34],
            [34, 866],
            [1166, 866],
          ] as const
        ).map(([x, y]) => (
          <g key={`trim-${x}-${y}`} className="emergency-field-trim">
            <line x1={x - 14} y1={y} x2={x + 14} y2={y} />
            <line x1={x} y1={y - 14} x2={x} y2={y + 14} />
          </g>
        ))}
      </svg>

      {/* Section ghost identity word — the site-wide convention.
          This chapter: NOW. Cropped off the right edge on purpose. */}
      <div className="emergency-ghost-wrap" aria-hidden="true">
        <span className="emergency-ghost display emergency-reveal emergency-reveal--fade">
          NOW
        </span>
      </div>

      <div className="emergency-shell">
        <div className="emergency-grid">
          {/* ---------- Chapter head ---------- */}
          <header className="emergency-head">
            <p className="emergency-eyebrow eyebrow emergency-reveal">
              <span className="emergency-eyebrow-rule" aria-hidden="true" />
              WHEN PAIN CAN&rsquo;T WAIT
            </p>
            <h2 id="emergency-title" className="emergency-title display">
              <span className="emergency-line">
                <span
                  className="emergency-line-inner"
                  style={delay("0.06s")}
                >
                  Dental problems
                </span>
              </span>
              <span className="emergency-line">
                <span
                  className="emergency-line-inner"
                  style={delay("0.14s")}
                >
                  don&rsquo;t keep office hours.
                </span>
              </span>
            </h2>
          </header>

          {/* ---------- The editorial timestamp: 12 AM ---------- */}
          <div className="emergency-time">
            <p className="emergency-time-meta eyebrow emergency-reveal">
              A PATIENT REVIEW · GOOGLE
            </p>
            <p
              className="emergency-time-num display emergency-reveal"
              style={delay("0.1s")}
              aria-hidden="true"
            >
              12<span className="emergency-time-unit">AM</span>
            </p>
            <span
              className="emergency-time-rule emergency-reveal emergency-reveal--fade"
              style={delay("0.2s")}
              aria-hidden="true"
            />
            {/* Renders only after EMERGENCY_24_7_VERIFIED is flipped —
                see the 24/7 content-safety note in the header above. */}
            {EMERGENCY_24_7_VERIFIED ? (
              <p className="emergency-247 display" style={delay("0.24s")}>
                24/7 EMERGENCY DENTAL CARE
              </p>
            ) : null}
          </div>

          {/* ---------- Main copy ---------- */}
          <div className="emergency-main">
            <p
              className="emergency-main-copy emergency-reveal"
              style={delay("0.12s")}
            >
              Some of the most difficult moments patients describe in their
              reviews happened late at night or early in the morning — when
              severe pain, wisdom-tooth problems or other urgent dental
              concerns could no longer wait.
            </p>
            <p
              className="emergency-support emergency-reveal"
              style={delay("0.2s")}
            >
              Patients have shared experiences of reaching Dr. Imran during
              the night and receiving prompt attention when they needed it
              most.
            </p>
          </div>

          {/* ---------- The verified patient story ---------- */}
          <figure className="emergency-story emergency-reveal" style={delay("0.18s")}>
            <blockquote className="emergency-quote">
              <p className="emergency-quote-text">
                &ldquo;He attended to me at 12&nbsp;AM... and made sure I was
                comfortable throughout the procedure.&rdquo;
              </p>
            </blockquote>
            <cite className="emergency-quote-cite eyebrow">
              — HAMZA MOHAMMED
            </cite>
          </figure>

          {/* ---------- The response line: TIME → NEED → CALL → CARE ---------- */}
          <div
            className="emergency-signal emergency-reveal"
            style={delay("0.3s")}
            aria-hidden="true"
          >
            <span className="emergency-signal-track" />
            <span className="emergency-signal-traveller" />
            {NODES.map((node) => (
              <span
                key={node.label}
                className={`emergency-node${node.call ? " emergency-node--call" : ""}`}
                style={{ left: node.x, "--d": node.d } as CSSProperties}
              >
                <i />
                <b>{node.label}</b>
              </span>
            ))}
          </div>

          {/* ---------- Urgent concerns (one editorial annotation) ---------- */}
          <ul className="emergency-concerns emergency-reveal" style={delay("0.34s")}>
            {CONCERNS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          {/* ---------- The response: phone + CTA ---------- */}
          <div className="emergency-cta emergency-reveal" style={delay("0.3s")}>
            <a
              className="emergency-phone focus-ring"
              href={PHONE_TEL}
              aria-label={PHONE_ARIA}
            >
              <span className="emergency-phone-label eyebrow" aria-hidden="true">
                TEL
              </span>
              <span className="emergency-phone-num">{PHONE_DISPLAY}</span>
            </a>
            <a
              className="emergency-call focus-ring"
              href={PHONE_TEL}
              aria-label={PHONE_ARIA}
            >
              CALL FOR URGENT CARE
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
