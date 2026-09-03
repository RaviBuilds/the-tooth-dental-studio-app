"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/* ==================================================================
   SECTION 02 — THE PROOF BEHIND THE REPUTATION  ("The Bridge")
   ------------------------------------------------------------------
   Narrative: the hero established WHO. This section answers
   "why should I believe this?" with visible proof:

     REAL TREATMENT VIDEO  ->  how care looks
     PATIENT VOICES        ->  how care feels
     5.0 / 1,147           ->  what it earned
     CULTURE SIGNALS       ->  the culture behind the reviews

   Content sources (nothing invented):
   - Copy: .agent/CANONICAL.md #2, #5, #6, #7 (Sections 02/03).
   - Reviews: the verified corpus used by the locked hero —
     exact excerpts, never paraphrased (see Hero.tsx note).
   - Video: the real portrait treatment video; treated as a
     deliberate portrait object (see .agent/asset-guidelines.md).

   Behaviour:
   - Video is the primary visual anchor and crosses the hero's
     dark end tone into the warm ivory proof zone (the Bridge).
   - Voice stage auto-advances ONLY while the video is actually
     playing — video holds, voice holds. Manual selection pauses
     auto-advance; clicking the active voice resumes it.
   - Video src is assigned on first approach (lazy); playback is
     muted, inline; it always starts at — and loops back to — a safe
     timestamp (the raw footage's first seconds show another clinic's
     signage and must never render); pauses off-screen and on hidden tabs.
   - Reveal gating: .proof[data-proof-ready] is set from JS so all
     content stays visible without JavaScript.
   ================================================================== */

const VIDEO_SRC =
  "/videos/dr-mohammed-imran-ali-dental-treatment-tooth-dental-studio-hyderabad.mp4";

/* Real frame from the treatment video itself (t≈7s: the studio interior,
   treatment light on, Dr. Imran's name badge visible). Shown by the video
   element's poster slot until the lazy-assigned source paints its first
   frame, so the pre-load state is authentic footage, never a black slab.
   720w JPEG ≈ 80 KB, below the fold: no LCP impact. */
const VIDEO_POSTER =
  "/videos/dr-mohammed-imran-ali-dental-treatment-tooth-dental-studio-hyderabad-poster.jpg";

const HOLD_MS = 7000; // voice holds while the video plays

const G_STAR_PATH =
  "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
const G_AVATAR_COLORS = ["#1a73e8", "#0b8043", "#c5221f", "#b06000", "#7b1fa2"];

const VOICES = [
  {
    name: "Spoorthi K.",
    excerpt:
      "I was very nervous initially, but his composure and professionalism made the entire experience feel smooth and comfortable.",
  },
  {
    name: "Hamza Mohammed",
    excerpt:
      "He attended to me at 12 AM... and made sure I was comfortable throughout the procedure.",
  },
  {
    name: "Asma Fatima",
    excerpt:
      "The clinic was clean and modern, and the treatment was comfortable and painless",
  },
  {
    name: "Sridevi Reddy Aellala",
    excerpt: "He was kind and patient with kids.",
  },
  {
    name: "Syed Afzaal Ahmed",
    excerpt:
      "The best part? The extraction was completely painless! The dentist was skilled, gentle...",
  },
];



/* Recurring themes from patient reviews (CANONICAL #6) - an evidence
   trail threaded along one hand-drawn path. Each entry carries its own
   x-position, its landing height on the thread (--cy) and how far its
   word hangs beneath the node (--fall), so the five words can never
   resolve into a grid; on small screens the same items ride a single
   vertical trail. */
const SIGNALS = [
  { word: "CALM", note: "A calm, reassuring approach", size: "lg", x: "0%", cy: "10%", fall: "34px", nw: "10.5rem", drop: false },
  { word: "CLEAR", note: "Explanations before and during treatment", size: "sm", x: "19%", cy: "34%", fall: "44px", nw: "9.5rem", drop: true },
  { word: "COMFORT", note: "Smooth, comfortable, painless care", size: "lg", x: "38%", cy: "20%", fall: "30px", nw: "10rem", drop: false },
  { word: "RESPONSIVE", note: "Prompt help in urgent moments", size: "sm", x: "55%", cy: "50%", fall: "50px", nw: "8.5rem", drop: true },
  { word: "PERSONAL", note: "Attention, kindness and follow-up", size: "md", x: "72%", cy: "36%", fall: "38px", nw: "7.75rem", drop: false },
];

/* The thread: a smooth curve passing exactly through every node landing
   point (x% maps to 0-1200, cy% maps to the 0-100 viewBox y-axis). */
const THREAD_D =
  "M 0 10 C 80 10, 152 34, 228 34 C 312 34, 380 20, 456 20 C 542 20, 586 50, 660 50 C 748 50, 792 36, 864 36 C 920 36, 958 38.5, 1000 41";

const d = (s: string, x = "0%", cy = "10%", fall = "34px", nw = "15rem") =>
  ({ "--pd": s, "--sx": x, "--cy": cy, "--fall": fall, "--nw": nw }) as CSSProperties;
const PlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4.5v15l13-7.5-13-7.5z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </svg>
);

export function Proof() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLSpanElement | null>(null);
  const userPausedRef = useRef(false);

  const [voiceIndex, setVoiceIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [autoOn, setAutoOn] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [reduced, setReduced] = useState(false);

  /* Lazy source assignment + playback (muted, inline). The full footage
     plays from its very first frame — nothing is skipped or seeked. */
  const playVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (!v.src) v.src = VIDEO_SRC;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  /* Reveal system, no-JS fallback and subtle offset-plane drift. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    section.dataset.proofReady = "true";

    // Reveal targets: `.proof-reveal` elements directly, plus the overflow:hidden
    // line masks (`.proof-title-line`). We must observe the MASK, not the masked
    // child — the child's hidden state (translateY(112%)) sits fully outside the
    // mask's clip box, and IntersectionObserver clips targets by ancestor
    // overflow, so a clipped child would never intersect.
    const revealables = section.querySelectorAll(".proof-reveal");
    const lineMasks = section.querySelectorAll(".proof-title-line");
    if (typeof IntersectionObserver === "undefined") {
      revealables.forEach((el) => el.classList.add("is-revealed"));
      lineMasks.forEach((mask) => mask.querySelectorAll(".proof-line-reveal").forEach((el) => el.classList.add("is-revealed")));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const target = e.target;
            if (target.classList.contains("proof-title-line")) {
              target.querySelectorAll(".proof-line-reveal").forEach((el) => el.classList.add("is-revealed"));
            } else {
              target.classList.add("is-revealed");
            }
            io.unobserve(target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -7% 0px" },
    );
    revealables.forEach((el) => io.observe(el));
    lineMasks.forEach((mask) => io.observe(mask));

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;
    const onScroll = () => {
      if (frame || !canHover || mq.matches) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
        const plane = planeRef.current;
        if (plane) {
          plane.style.transform = `translate3d(0, ${((progress - 0.5) * -32).toFixed(2)}px, 0) rotate(-1.4deg)`;
        }
        const ghost = ghostRef.current;
        if (ghost) {
          ghost.style.transform = `translate3d(0, ${((progress - 0.5) * 14).toFixed(2)}px, 0)`;
        }
      });
    };
    if (canHover && !mq.matches) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    return () => {
      io.disconnect();
      if (canHover && !mq.matches) window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Video activation: play while in view, hold when out of view
     or when the tab is hidden. Reduced motion: load a still first
     frame, never autoplay - the play button stays available. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let inView = false;

    /* Wrap playback back to the very first frame on each cycle. */
    const onEnded = () => {
      v.muted = true;
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
              if (!v.src) v.src = VIDEO_SRC; // still first frame, no playback
            } else if (!userPausedRef.current) {
              playVideo();
            }
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(v);

    const onVisibility = () => {
      if (document.hidden) {
        v.pause();
      } else if (inView && !userPausedRef.current && !reduced) {
        playVideo();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      v.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, playVideo]);

  /* The voice stage breathes with the video: voices only advance
     while the treatment video is actually playing. */
  useEffect(() => {
    if (!autoOn || !playing || reduced) return;
    const t = window.setTimeout(() => {
      setVoiceIndex((i) => (i + 1) % VOICES.length);
      setCycle((c) => c + 1);
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [autoOn, playing, voiceIndex, reduced]);

  const selectVoice = (i: number) => {
    setCycle((c) => c + 1);
    if (i === voiceIndex) {
      setAutoOn(true); // clicking the active voice resumes the sequence
    } else {
      setVoiceIndex(i); // manual selection holds the chosen voice
      setAutoOn(false);
    }
  };

  const onToggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      playVideo();
    } else {
      userPausedRef.current = true;
      v.pause();
    }
  };

  {/* ---------- Google My Business–styled reputation card (authentic Google grammar,
     verified local data only). Lives beside the section title, on the dark open
     band, where the white card reads as a trust artifact — not a widget. ---------- */}
  const googleCard = (
    <div
      className="proof-gcard proof-reveal"
      style={d("0.05s")}
      role="group"
      aria-label="Rated 5.0 from 1,147 Google Reviews"
    >
      <div className="proof-gcard-head">
        <svg className="proof-gcard-glogo" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
        <span className="proof-gcard-headline">Google Reviews</span>
      </div>
      <div className="proof-gcard-rating">
        <span className="proof-gcard-score">5.0</span>
        <span className="proof-gcard-ratingcol">
          <span className="proof-gcard-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="proof-gcard-star"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ "--si": `${(i * 0.07).toFixed(2)}s` } as CSSProperties}
              >
                <path d={G_STAR_PATH} />
              </svg>
            ))}
          </span>
          <span className="proof-gcard-count">1,147 Google Reviews</span>
        </span>
      </div>
      <div className="proof-gcard-rule" aria-hidden="true" />
      <p className="proof-gcard-voice-label">A voice behind the rating</p>
      {/* keyed by voiceIndex so each verified voice crossfades into the card */}
      <div className="proof-gcard-review" key={`voice-${voiceIndex}`} aria-hidden="true">
        <span
          className="proof-gcard-avatar"
          style={{ background: G_AVATAR_COLORS[voiceIndex % G_AVATAR_COLORS.length] }}
        >
          {VOICES[voiceIndex].name.charAt(0)}
        </span>
        <span className="proof-gcard-reviewbody">
          <span className="proof-gcard-voice-name">{VOICES[voiceIndex].name}</span>
          <span className="proof-gcard-reviewstars">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="proof-gcard-star proof-gcard-star--sm" viewBox="0 0 24 24" aria-hidden="true">
                <path d={G_STAR_PATH} />
              </svg>
            ))}
          </span>
          <span className="proof-gcard-quote">&ldquo;{VOICES[voiceIndex].excerpt}&rdquo;</span>
        </span>
      </div>
      {/* quiet Google familiarity: oversized G bleeding off the corner */}
      <svg className="proof-gcard-gmark" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
      {/* cycle progress: the card breathes on the same 7s rhythm as the voice stage */}
      <span key={`cycle-${cycle}`} className="proof-gcard-progress" aria-hidden="true" />
    </div>
  );

  return (
    <section ref={sectionRef} id="approach" className="proof" aria-labelledby="proof-title">
      {/* ---------- Chapter handoff - continues the hero's end tone ---------- */}
      <div className="proof-open">
        <div className="proof-open-field" aria-hidden="true">
          <span className="proof-open-bloom" />
          <span className="proof-open-ring proof-open-ring-a" />
          <span className="proof-open-ring proof-open-ring-b" />
          <span className="proof-open-contour proof-open-contour-a" />
          <span className="proof-open-contour proof-open-contour-b" />
          <span className="proof-open-thread" />
        </div>
        <div className="proof-shell proof-open-inner proof-open-grid">
          <div className="proof-open-copy">
          <p className="proof-eyebrow-row proof-reveal">
            <span className="proof-index" aria-hidden="true">
              02
            </span>
            <span className="proof-eyebrow">THE PATIENT EXPERIENCE</span>
          </p>
          <h2 className="proof-title display" id="proof-title">
            <span className="proof-title-line">
              <span className="proof-line-reveal" style={d("0s")}>
                A reputation built
              </span>
            </span>
            <span className="proof-title-line">
              <span className="proof-line-reveal" style={d("0.12s")}>
                one experience
              </span>
            </span>
            <span className="proof-title-line">
              <span className="proof-line-reveal" style={d("0.24s")}>
                <em className="proof-title-em">at a time.</em>
              </span>
            </span>
          </h2>
          <p className="proof-intro proof-reveal" style={d("0.42s")}>
            At The Tooth Dental Studio, patient experience is central. Dr. Mohammed Imran Ali is
            repeatedly described as calm, gentle, approachable and thorough — particularly in the
            way he explains treatment and helps nervous patients feel reassured.
          </p>
          </div>
          <div className="proof-open-card">{googleCard}</div>
        </div>
      </div>

      {/* ---------- The Bridge - real treatment video + real voices ---------- */}
      <div className="proof-body">
        <div className="proof-shell proof-grid">
          {/* Voice stage — one verified voice at a time, in rhythm with the video */}
          <div className="proof-stage">
            <p className="proof-stage-eyebrow proof-reveal">
              <span className="proof-stage-rule" aria-hidden="true" />
              <span>PATIENT VOICES — IN THEIR OWN WORDS</span>
            </p>
            <div className="proof-stage-quotebox proof-reveal" style={d("0.1s")} aria-live="polite">
              {VOICES.map((v, i) => (
                <figure
                  key={v.name}
                  className={`proof-quote${i === voiceIndex ? " is-active" : ""}`}
                  aria-hidden={i !== voiceIndex}
                >
                  <blockquote>
                    <p>{v.excerpt}</p>
                  </blockquote>
                  <figcaption>
                    <span className="proof-quote-name">{`— ${v.name}`}</span>
                    <span className="proof-quote-meta">GOOGLE REVIEW</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div
              className="proof-rail proof-reveal"
              style={d("0.2s")}
              role="group"
              aria-label="Patient voices — select a review to read it here"
            >
              {VOICES.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  className={`proof-rail-item focus-ring${i === voiceIndex ? " is-active" : ""}`}
                  aria-pressed={i === voiceIndex}
                  aria-label={`Show the review by ${v.name}`}
                  onClick={() => selectVoice(i)}
                >
                  <span className="proof-rail-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="proof-rail-name">{v.name}</span>
                  {i === voiceIndex && autoOn && playing && !reduced ? (
                    <span key={cycle} className="proof-rail-progress" aria-hidden="true" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* The Bridge — the real portrait treatment video, crossing the boundary */}
          <figure className="proof-media proof-reveal" style={d("0.08s")}>
            <div className="proof-media-plane" aria-hidden="true" ref={planeRef} />
            <div className="proof-frame">
              {/* offset gold mat + viewfinder ticks: the video presented as a
                  filmed print — evidence laid on the studio table, not a widget */}
              <span className="proof-frame-mat" aria-hidden="true" />
              <video
                ref={videoRef}
                className={`proof-video${loaded ? " is-live" : ""}`}
                poster={VIDEO_POSTER}
                muted
                playsInline
                preload="none"
                disablePictureInPicture
                aria-label="Video: Dr. Mohammed Imran Ali treating a patient at The Tooth Dental Studio, Tolichowki, Hyderabad"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onLoadedData={() => setLoaded(true)}
              />
              <div className="proof-frame-rail">
                <div className="proof-rail-live-group">
                  <span className="proof-rail-doctor">Dr. Mohammed Imran Ali</span>
                  <span className="proof-rail-live">
                    <i className="proof-dot" aria-hidden="true" />
                    <span>REAL TREATMENT</span>
                  </span>
                </div>
                <button
                  type="button"
                  className="proof-video-toggle focus-ring"
                  aria-pressed={playing}
                  aria-label={playing ? "Pause the treatment video" : "Play the treatment video"}
                  onClick={onToggle}
                >
                  {playing ? <PauseIcon /> : <PlayIcon />}
                </button>
              </div>
              {/* viewfinder corner ticks — the frame reads as camera capture */}
              <span className="proof-tick proof-tick-tl" aria-hidden="true" />
              <span className="proof-tick proof-tick-tr" aria-hidden="true" />
              <span className="proof-tick proof-tick-bl" aria-hidden="true" />
              <span className="proof-tick proof-tick-br" aria-hidden="true" />
            </div>
            <figcaption className="proof-media-caption">
              <span>REAL TREATMENT · FILMED INSIDE THE STUDIO</span>
              <span>THE TOOTH DENTAL STUDIO · TOLICHOWKI, HYDERABAD</span>
            </figcaption>
          </figure>
        </div>

                {/* ---------- Reputation ground - ghost word + rating bridge ---------- */}
        <div className="proof-shell proof-reputation">
          <span ref={ghostRef} className="proof-reputation-ghost proof-reveal" aria-hidden="true">
            REPUTATION
          </span>

          <p className="proof-gcard-bridge proof-reveal" style={d("0.1s")}>
            The rating is the number. <em>The experience is the&nbsp;reason.</em>
          </p>

          <p className="proof-gcard-note proof-reveal" style={d("0.12s")}>
            Behind that number are patients who have shared what mattered to them most: feeling
            comfortable, receiving clear explanations, being treated with care, and finding help
            when they needed it.
          </p>
{/* ---------- Culture signals — annotations on a single path, not cards ---------- */}
          <div className="proof-signals">
            <h3 className="proof-signals-eyebrow proof-reveal">
              RECURRING THEMES FROM PATIENT REVIEWS
            </h3>
            <div className="proof-signal-canvas">
              <svg
                className="proof-signal-thread proof-reveal"
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  className="proof-signal-thread-echo"
                  d={THREAD_D}
                  transform="translate(0 2)"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="proof-signal-thread-path"
                  d={THREAD_D}
                  pathLength={1}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <ol className="proof-signal-path">
                {SIGNALS.map((s, i) => (
                  <li
                    key={s.word}
                    className={`proof-signal proof-signal-${s.size} proof-reveal${s.drop ? " is-dropped" : ""}`}
                    style={d(`${(i * 0.12).toFixed(2)}s`, s.x, s.cy, s.fall, s.nw)}
                  >
                    <span className="proof-signal-stem" aria-hidden="true" />
                    <span className="proof-signal-node" aria-hidden="true" />
                    <span className="proof-signal-idx" aria-hidden="true">{`0${i + 1}`}</span>
                    <span className="proof-signal-word display">{s.word}</span>
                    <span className="proof-signal-note">{s.note}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="proof-signature proof-reveal">THE EXPERIENCE IS PART OF THE TREATMENT.</p>
          </div>
        </div>
      </div>
    </section>
  );
}






