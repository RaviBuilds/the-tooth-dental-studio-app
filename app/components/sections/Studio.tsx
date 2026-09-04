/* ==================================================================
   SECTION 06 — INSIDE THE STUDIO  ("Walk Into the Clinic")
   ------------------------------------------------------------------
   The hero established WHO, Proof answered "why believe", the Atlas
   answered "what treatments exist", Diagnosis answered "how the
   clinic understands what I need", and the Doctor chapter answered
   "who will treat me". This chapter lets the actual physical clinic
   prove itself in ONE compact editorial spread - not a gallery:
   "IS THIS A REAL, CLEAN, MODERN PLACE I'D WALK INTO?"

   Composition (THE WALK - every asset inspected, one role each):
   Row 1  head copy + THE SPACE: the front-desk/reception photo as
          the dominant portrait plate (its true 4/5 orientation).
   Row 2  THE WALKTHROUGH: both real clinic-tour clips as CHAPTER
          ONE / CHAPTER TWO of one corridor, joined by a shared gold
          registration line. THE CHAIR (room 02 - chair as
          protagonist, monitor arm, tooth clock) sits between the
          chapters as the room the walk passes through; THE DETAILS
          (room 04 - the tightest close framing) rides low beside
          chapter two.
   Row 3  THE CARE: compact close on the approved signature phrase,
          with room 01 (the only landscape frame) as a small wide
          plate. Rooms 03 and 05 are deliberately unused - fewer
          assets at stronger scale (see .agent/CANONICAL.md).

   Content sources (nothing invented):
   - Eyebrow / H2 / paragraph / supporting copy: verbatim
     .agent/CANONICAL.md SECTION 05 (INSIDE THE STUDIO).
   - Chapter labels THE SPACE / THE CHAIR / THE DETAILS: canonical.
     Tour captions stay tour-neutral: the two clips were not
     frame-verified, so nothing specific about their contents is
     claimed. ("THE TEAM" is canonical but no team asset exists - no
     invented imagery.)

   Behaviour:
   - Reveal gating: .studio[data-studio-ready] is set from JS so all
     content stays fully visible without JavaScript (Atlas/Diagnosis/
     Doctor pattern); the corridor's gold line uses the same gate.
   - Ghost identity word: CLINIC (unique across the site - see
     Proof=REPUTATION, Atlas=CARE, Diagnosis=SEE, Doctor=DOCTOR).
   - Videos: muted, inline, preload="none", IntersectionObserver-
     gated playback; pause off-screen / on hidden tabs; accessible
     play/pause control; reduced-motion loads a still frame only.
   - All motion is transform/opacity/clip-path only. Reduced motion:
     calm, everything readable, no parallax/drift.
   ================================================================== */

"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";

const CLINIC_BASE = "/images/clinic images/tooth-dental-studio";
const VIDEO_BASE =
  "/videos/clinic video/tooth-dental-studio-clinic-tour-tolichowki-hyderabad";

const SPACE_SRC = `${CLINIC_BASE}-tolichowki-hyderabad.webp`;
const CHAIR_SRC = `${CLINIC_BASE}-treatment-room-tolichowki-hyderabad-02.webp`;
const DETAIL_SRC = `${CLINIC_BASE}-treatment-room-tolichowki-hyderabad-04.webp`;
const WIDE_SRC = `${CLINIC_BASE}-treatment-room-tolichowki-hyderabad-01.jpg`;

/* Two real clinic-tour clips, portrait/reel format - one walkthrough
   in two chapters. Captions stay tour-neutral (the clips were not
   frame-verified; nothing specific about their contents is claimed).
   Both are lazily sourced (no eager network cost) and gated by
   IntersectionObserver in the effect below. */
const TOUR_CHAPTERS = [
  {
    key: "01",
    src: `${VIDEO_BASE}-01.mp4`,
    label: "CHAPTER ONE",
    caption: "Filmed inside the studio — chapter one of the tour.",
  },
  {
    key: "02",
    src: `${VIDEO_BASE}-02.mp4`,
    label: "CHAPTER TWO",
    caption: "Filmed inside the studio — chapter two of the tour.",
  },
];

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

const PlayIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M7 4.5v15l13-7.5-13-7.5z" />
  </svg>
);
const PauseIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </svg>
);

/* One tour chapter: lazy-sourced portrait video in the studio's
   filmed-object frame, with its own play state and in-view gating. */
function TourChapter({
  chapter,
  reduced,
}: {
  chapter: (typeof TOUR_CHAPTERS)[number];
  reduced: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const userPausedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (!v.src) v.src = chapter.src;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const v = videoRef.current;
    if (!wrap || !v) return;
    let inView = false;

    const onEnded = () => {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    v.addEventListener("ended", onEnded);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          inView = e.isIntersecting;
          if (e.isIntersecting) {
            if (reduced) {
              if (!v.src) v.src = chapter.src; // still first frame only
            } else if (!userPausedRef.current) {
              play();
            }
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) v.pause();
      else if (inView && !userPausedRef.current && !reduced) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      v.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const onToggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      play();
    } else {
      userPausedRef.current = true;
      v.pause();
    }
  };

  return (
    <div ref={wrapRef} className="studio-tour-chapter">
      <div className="studio-tour-frame">
        <span className="studio-tour-mat" aria-hidden="true" />
        <video
          ref={videoRef}
          className={`studio-tour-video${loaded ? " is-live" : ""}`}
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          aria-label={`Video: clinic tour of The Tooth Dental Studio, Tolichowki, Hyderabad — ${chapter.caption}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoadedData={() => setLoaded(true)}
        />
        <div className="studio-tour-rail">
          <span className="studio-tour-label">{chapter.label}</span>
          <button
            type="button"
            className="studio-tour-toggle focus-ring"
            aria-pressed={playing}
            aria-label={
              playing
                ? "Pause the clinic tour video"
                : "Play the clinic tour video"
            }
            onClick={onToggle}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
        <span
          className="studio-tour-tick studio-tour-tick-tl"
          aria-hidden="true"
        />
        <span
          className="studio-tour-tick studio-tour-tick-tr"
          aria-hidden="true"
        />
        <span
          className="studio-tour-tick studio-tour-tick-bl"
          aria-hidden="true"
        />
        <span
          className="studio-tour-tick studio-tour-tick-br"
          aria-hidden="true"
        />
      </div>
      <p className="studio-tour-caption">{chapter.caption}</p>
    </div>
  );
}

export function Studio() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    if (typeof IntersectionObserver === "undefined") return; // stays visible
    section.setAttribute("data-studio-ready", "true");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 0% 0px" },
    );
    section
      .querySelectorAll(".studio-reveal, .studio-corridor-line")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="studio"
      aria-labelledby="studio-title"
    >
      {/* Print field - the chapter's ground identity: ruled baselines,
          gold registration crosses and corner trim marks, in the
          site-wide dark-editorial convention (see Atlas). Marginal
          geometry only, never drawn over the photographs. */}
      <svg
        className="studio-field"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        {[150, 320, 490, 660, 830].map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} />
        ))}
        <line x1="70" y1="0" x2="70" y2="900" />
        <line x1="1130" y1="0" x2="1130" y2="900" />
        {[
          [70, 320],
          [1130, 150],
          [70, 660],
          [1130, 830],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} className="studio-field-cross">
            <line x1={x - 9} y1={y} x2={x + 9} y2={y} />
            <line x1={x} y1={y - 9} x2={x} y2={y + 9} />
          </g>
        ))}
        {[
          [34, 34],
          [1166, 34],
          [34, 866],
          [1166, 866],
        ].map(([x, y]) => (
          <g key={`trim-${x}-${y}`} className="studio-field-trim">
            <line x1={x - 14} y1={y} x2={x + 14} y2={y} />
            <line x1={x} y1={y - 14} x2={x} y2={y + 14} />
          </g>
        ))}
      </svg>

      {/* Section ghost identity word - the site-wide convention
          (REPUTATION / CARE / SEE / DOCTOR). This chapter: CLINIC. */}
      <span className="studio-ghost display" aria-hidden="true">
        CLINIC
      </span>

      <div className="studio-shell">
        {/* ---------- Row 1: chapter head + THE SPACE, one spread ---------- */}
        <div className="studio-open">
          <header className="studio-head">
          <p className="studio-eyebrow eyebrow studio-reveal">
            <span className="studio-eyebrow-rule" aria-hidden="true" />
            INSIDE THE STUDIO
          </p>
          <h2
            id="studio-title"
            className="studio-title display studio-reveal"
            style={delay("0.06s")}
          >
            A space where care happens.
          </h2>
          <p className="studio-intro studio-reveal" style={delay("0.12s")}>
            Step inside The Tooth Dental Studio in Tolichowki and you&rsquo;ll
            find a practical, modern clinical environment built for focused
            dental care.
          </p>
          <p
            className="studio-intro studio-intro--follow studio-reveal"
            style={delay("0.15s")}
          >
            The space is designed to keep the experience clear and comfortable
            &mdash; from the moment you arrive to the time you settle into the
            treatment room.
          </p>
          <p className="studio-note studio-reveal" style={delay("0.18s")}>
            Patients frequently describe the clinic as clean, hygienic, modern
            and well maintained — qualities that matter when you&rsquo;re
            trusting someone with your health.
          </p>
          <p
            className="studio-note studio-note--follow studio-reveal"
            style={delay("0.21s")}
          >
            It is a working dental studio, designed around the simple things
            that make care feel more considered: a well-kept environment, a
            focused clinical setting and a space where patients can feel at
            ease.
          </p>
        </header>

          {/* ---------- THE SPACE: dominant portrait plate, true 4/5 ---------- */}
          <figure
            className="studio-plate studio-plate--space studio-reveal"
            style={delay("0.1s")}
          >
            <span className="studio-plate-frame">
              <Image
                src={SPACE_SRC}
                alt="Reception and waiting area at The Tooth Dental Studio, Tolichowki, Hyderabad, with seating either side of a marble front desk"
                fill
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 400px"
                quality={85}
                loading="lazy"
                decoding="async"
              />
            </span>
            <figcaption className="studio-plate-caption">
              <span>THE SPACE</span>
              <span>RECEPTION · THE TOOTH DENTAL STUDIO</span>
            </figcaption>
          </figure>
        </div>

        {/* ---------- Row 2: THE WALKTHROUGH - one corridor, two chapters.
            THE CHAIR sits between the chapters (the room the walk passes
            through); THE DETAILS rides low beside chapter two. ---------- */}
        <div className="studio-tour">
          <p className="studio-tour-head studio-reveal">
            <span>THE WALKTHROUGH</span>
            <span className="studio-tour-sub">
              One continuous tour, filmed inside the studio.
            </span>
          </p>
          <div
            className="studio-corridor"
            role="group"
            aria-label="A walkthrough of the clinic"
          >
            <span className="studio-corridor-line" aria-hidden="true" />
            <div className="studio-corridor-item studio-corridor-item--chapter">
              <div className="studio-reveal" style={delay("0.08s")}>
                <TourChapter chapter={TOUR_CHAPTERS[0]} reduced={reduced} />
              </div>
            </div>
            <div className="studio-corridor-item studio-corridor-item--chair">
              <figure
                className="studio-plate studio-plate--chair studio-reveal"
                style={delay("0.2s")}
              >
                <span className="studio-plate-frame">
                  <Image
                    src={CHAIR_SRC}
                    alt="A dental treatment chair with monitor arm and overhead light in a treatment room at The Tooth Dental Studio, Tolichowki, Hyderabad"
                    fill
                    sizes="(max-width: 767px) 58vw, (max-width: 1023px) 32vw, 250px"
                    quality={85}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <figcaption className="studio-plate-caption">
                  <span>THE CHAIR</span>
                  <span>TREATMENT ROOM · TOLICHOWKI</span>
                </figcaption>
              </figure>
            </div>
            <div className="studio-corridor-item studio-corridor-item--chapter">
              <div className="studio-reveal" style={delay("0.32s")}>
                <TourChapter chapter={TOUR_CHAPTERS[1]} reduced={reduced} />
              </div>
            </div>
            <div className="studio-corridor-item studio-corridor-item--detail">
              <figure
                className="studio-plate studio-plate--detail studio-reveal"
                style={delay("0.44s")}
              >
                <span className="studio-plate-frame">
                  <Image
                    src={DETAIL_SRC}
                    alt="Close view of a dental chair headrest beside an x-ray arm and laptop in a treatment room at The Tooth Dental Studio, Tolichowki, Hyderabad"
                    fill
                    sizes="(max-width: 767px) 50vw, (max-width: 1023px) 28vw, 220px"
                    quality={85}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <figcaption className="studio-plate-caption">
                  <span>THE DETAILS</span>
                  <span>INSTRUMENTATION · TOLICHOWKI</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* ---------- Row 3: THE CARE - compact close, wide room plate ---------- */}
        <div className="studio-close">
          <div
            className="studio-close-text studio-reveal"
            style={delay("0.08s")}
          >
            <p className="studio-close-label">THE CARE</p>
            <p className="studio-close-line display">
              THE EXPERIENCE IS PART OF THE TREATMENT.
            </p>
            <p className="studio-close-meta">
              THE TOOTH DENTAL STUDIO · TOLICHOWKI, HYDERABAD
            </p>
          </div>
          <figure
            className="studio-plate studio-plate--wide studio-reveal"
            style={delay("0.18s")}
          >
            <span className="studio-plate-frame">
              <Image
                src={WIDE_SRC}
                alt="A wide view of a treatment room with dental chair, monitor and clinical equipment at The Tooth Dental Studio, Tolichowki, Hyderabad"
                fill
                sizes="(max-width: 767px) 78vw, (max-width: 1023px) 36vw, 280px"
                quality={85}
                loading="lazy"
                decoding="async"
              />
            </span>
            <figcaption className="studio-plate-caption">
              <span>TREATMENT ROOM</span>
              <span>TREATMENT BAY · TOLICHOWKI</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
