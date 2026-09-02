"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";

const DOCTOR_SRC =
  "/images/Dr photo/dr-mohammed-imran-ali-tooth-dental-studio-hyderabad-01.png";

/* Verified patient voices - exact excerpts from the approved review corpus.
   Canonical: Spoorthi K. / Sridevi Reddy Aellala / Hamza Mohammed (.agent/CANONICAL.md #11).
   Asma Fatima / Shaik Ali / Syed Afzaal Ahmed: supplied verified Google review excerpts.
   Ellipses mark faithful truncation only - never paraphrased. */
const VOICES = [
  {
    name: "Spoorthi K.",
    excerpt: "I was very nervous initially, but his composure and professionalism...",
  },
  {
    name: "Sridevi Reddy Aellala",
    excerpt: "He was kind and patient with kids.",
  },
  {
    name: "Hamza Mohammed",
    excerpt: "He attended to me at 12 AM... and made sure I was comfortable...",
  },
  {
    name: "Asma Fatima",
    excerpt: "The clinic was clean and modern, and the treatment was comfortable and painless",
  },
  {
    name: "Shaik Ali",
    excerpt: "The entire procedure was completely painless, including the injection...",
  },
  {
    name: "Syed Afzaal Ahmed",
    excerpt: "The best part? The extraction was completely painless! The dentist was skilled, gentle...",
  },
];

const HOLD_MS = 5500; // time each voice stays fully visible
const EXIT_MS = 700; // travel-out duration
const FIRST_IN_MS = 2100; // first voice arrives after the hero establishes

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

export function Hero() {
  const stageRef = useRef<HTMLElement | null>(null);
  const pausedRef = useRef(false);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [voiceLeaving, setVoiceLeaving] = useState(false);
  const [voiceDelay, setVoiceDelay] = useState("2.1s");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      stage.style.setProperty("--hero-x", ((event.clientX / window.innerWidth - 0.5) * 2).toFixed(4));
      stage.style.setProperty("--hero-y", ((event.clientY / window.innerHeight - 0.5) * 2).toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const progress = Math.min(window.scrollY / Math.max(stage.offsetHeight, 1), 1);
        stage.style.setProperty("--hero-scroll", progress.toFixed(4));
      });
    };

    if (canHover) window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (canHover) window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Patient Voices rotation - calm, editorial, pausable. */
  useEffect(() => {
    let holdTimer = 0;
    let exitTimer = 0;

    const schedule = (ms: number) => {
      holdTimer = window.setTimeout(tick, ms);
    };

    const tick = () => {
      if (pausedRef.current || document.hidden) {
        schedule(900); // re-check shortly; hold the current voice
        return;
      }
      setVoiceLeaving(true);
      exitTimer = window.setTimeout(() => {
        setVoiceLeaving(false);
        setVoiceIndex((i) => (i + 1) % VOICES.length);
        setVoiceDelay("0.12s");
        schedule(HOLD_MS);
      }, EXIT_MS);
    };

    schedule(HOLD_MS + FIRST_IN_MS);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  const voice = VOICES[voiceIndex];

  return (
    <section
      ref={stageRef}
      id="top"
      className="hero-stage"
      aria-label="The Tooth Dental Studio, Tolichowki, Hyderabad"
    >
      {/* Layer 1 - atmospheric field, precision ticks, architectural hairline */}
      <div className="hero-field" aria-hidden="true">
        <div className="hero-field-bg" />
      </div>

      {/* Layer 2 - organic contour field */}
      <div className="hero-contours" aria-hidden="true">
        <span className="hero-contour hero-contour-a" />
        <span className="hero-contour hero-contour-b" />
        <span className="hero-contour hero-contour-c" />
      </div>

      {/* Floor plane + legibility veil */}
      <div className="hero-floor" aria-hidden="true" />
      <div className="hero-veil" aria-hidden="true" />

      {/* Layers 4-5 - doctor stage: halo, gaze line, portrait, identity */}
      <div className="hero-figure">
        <div className="hero-halo" aria-hidden="true">
          <span className="hero-halo-glow" />
          <span className="hero-halo-ring hero-halo-ring-a" />
          <span className="hero-halo-ring hero-halo-ring-b" />
        </div>
        <span className="hero-gaze" aria-hidden="true">
          <i className="hero-gaze-origin" />
        </span>
        <Image
          src={DOCTOR_SRC}
          alt="Dr. Mohammed Imran Ali, General Dentist at The Tooth Dental Studio in Tolichowki, Hyderabad"
          fill
          preload
          sizes="(max-width: 767px) 86vw, (max-width: 1023px) 62vw, (max-width: 1279px) min(47vw, 94svh), min(42vw, 94svh)"
          className="hero-doctor"
        />
        <div className="hero-figure-label">
          <span className="hero-figure-rule" aria-hidden="true" />
          <p className="hero-figure-name">DR. MOHAMMED IMRAN ALI</p>
          <p className="hero-figure-role">GENERAL DENTIST</p>
        </div>
      </div>

      {/* Layer 6 - editorial content */}
      <div className="hero-copy-wrap">
        <div className="hero-copy">
          <p className="hero-eyebrow-row">
            <span className="hero-eyebrow">
              {"THE TOOTH DENTAL STUDIO \u00B7 TOLICHOWKI \u00B7 HYDERABAD"}
            </span>
          </p>
          <h1 className="hero-headline display">
            <span className="hero-line">
              <span style={delay("1.15s")}>DENTISTRY</span>
            </span>
            <span className="hero-line hero-line-gold">
              <span style={delay("1.28s")}>WITHOUT</span>
            </span>
            <span className="hero-line">
              <span style={delay("1.41s")}>THE FEAR.</span>
            </span>
          </h1>
          <p className="hero-support">Calm care. Clear explanations. A better dental experience.</p>
          <div className="hero-ctas">
            <a href="#contact" className="hero-cta-primary focus-ring">
              <span>Book an Appointment</span>
              <span className="hero-cta-arrow" aria-hidden="true">
                {"\u2197"}
              </span>
            </a>
            <a href="tel:+919966340056" className="hero-cta-secondary focus-ring">
              Call the Clinic
            </a>
</div>
        </div>
      </div>

      {/* Layer 7a - living Patient Voice (enters from outside the scene) */}
      <div className="hero-voice-slot" aria-live="polite">
        <a
          key={voiceIndex}
          href="#stories"
          className={`hero-voice focus-ring${voiceLeaving ? " hero-voice-out" : ""}${
            voiceIndex % 2 === 1 ? " hero-voice-alt" : ""
          }`}
          style={{ "--vd": voiceDelay } as CSSProperties}
          aria-label={`Patient review ${voiceIndex + 1} of ${VOICES.length} - ${voice.name}: ${voice.excerpt} - open patient stories`}
          onPointerEnter={() => {
            pausedRef.current = true;
          }}
          onPointerLeave={() => {
            pausedRef.current = false;
          }}
          onFocus={() => {
            pausedRef.current = true;
          }}
          onBlur={() => {
            pausedRef.current = false;
          }}
        >
          <span className="hero-voice-body"><span className="hero-voice-label">PATIENT VOICE</span>
          <span className="hero-voice-quote">
            {"\u201C"}
            {voice.excerpt}
            {"\u201D"}
          </span>
          <span className="hero-voice-name">{`— ${voice.name}`}</span>
          <span className="hero-voice-meta">
            <span>GOOGLE REVIEW</span>
            <span className="hero-voice-cta">
              READ REVIEW <i aria-hidden="true">{"\u2197"}</i>
            </span>
          </span>
          </span>
        </a>
      </div>

      {/* Layer 7b - persistent reputation anchor */}
      <div
        className="hero-credential"
        role="group"
        aria-label="Rated 5.0 out of 5 stars from 1,147 Google reviews"
      >
        <div className="hero-credential-card">
          <p className="hero-credential-label">PATIENT-RATED DENTAL CARE</p>
          <p className="hero-credential-rating">
            <span className="hero-credential-score">5.0</span>
            <span className="hero-credential-stars" aria-hidden="true">
              {"\u2605\u2605\u2605\u2605\u2605"}
            </span>
          </p>
          <p className="hero-credential-source">1,147 Google Reviews</p>
        </div>
      </div>

      {/* Layer 8 - micro details */}
      <div className="hero-cue" aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <i className="hero-cue-line" />
      </div>
      <p className="hero-edge" aria-hidden="true">
        {"SURYA NAGAR COLONY \u00B7 TOLICHOWKI \u00B7 HYDERABAD"}
      </p>
      <div className="hero-noise" aria-hidden="true" />
    </section>
  );
}