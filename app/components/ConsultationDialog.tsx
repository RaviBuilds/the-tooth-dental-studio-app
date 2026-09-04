"use client";

import { useEffect, useRef } from "react";

/* ==================================================================
   CONSULTATION DIALOG — Mid-Page Conversion Bridge
   
   A premium editorial dialog that appears at ~52% scroll progress,
   once per session, acting as a conversion bridge between editorial
   storytelling and the final contact section.
   
   Trigger: First scroll event past 52% page progress (inside the
   approved 45-60% band, with no upper bound so fast scrolls still fire).
   Session: sessionStorage "consultation-dialog-shown" flag
   Element: Native <dialog> for built-in accessibility
   Mobile: Bottom-sheet style (30-45vh)
   Desktop: Centered editorial panel + body scroll lock while open
   
   Content from CANONICAL.md and approved brand positioning.
   ================================================================== */

const SESSION_KEY = "consultation-dialog-shown";
const TRIGGER_THRESHOLD = 0.52; // 52% scroll progress

// Page scroll lock while the dialog is open. Native <dialog> makes the
// page inert, but wheel/keyboard scrolling can still chain to the page in
// some browsers, so the lock is explicit. The scrollbar width is
// compensated so the page behind does not shift when it disappears.
function lockScroll() {
  const root = document.documentElement;
  const scrollbar = window.innerWidth - root.clientWidth;
  root.style.overflow = "hidden";
  if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
}

function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.paddingRight = "";
}

export function ConsultationDialog() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) !== null;
    } catch {
      // Storage unavailable (some private modes) — treat as not shown.
      alreadyShown = false;
    }
    if (alreadyShown) {
      hasTriggeredRef.current = true;
      return;
    }

    // Fires on the first scroll event whose page progress crosses the
    // threshold. Deliberately never evaluated on mount: the dialog must
    // not appear before the visitor has actually scrolled.
    const handleScroll = () => {
      if (hasTriggeredRef.current) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = window.scrollY / scrollable;
      // No upper bound on purpose: a fast fling that jumps across the
      // whole 45-60% band must still trigger, exactly once.
      if (progress >= TRIGGER_THRESHOLD) {
        hasTriggeredRef.current = true;
        try {
          sessionStorage.setItem(SESSION_KEY, "true");
        } catch {
          // Storage unavailable — dialog still shows for this visit.
        }
        window.removeEventListener("scroll", handleScroll);
        lockScroll();
        dialogRef.current?.showModal();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* SECTION 08 — the Final section's primary CTA ("Book an Appointment")
     opens this dialog on demand via a custom event, independent of the
     52% auto-trigger. Guarded so an already-open dialog is never
     showModal()ed twice (which would throw InvalidStateError). */
  useEffect(() => {
    const handleOpen = () => {
      if (dialogRef.current?.open) return;
      hasTriggeredRef.current = true;
      lockScroll();
      dialogRef.current?.showModal();
    };
    window.addEventListener("tooth:open-consultation", handleOpen);
    return () => {
      window.removeEventListener("tooth:open-consultation", handleOpen);
    };
  }, []);

  // Single close path: unlock the page first, then close.
  const closeDialog = () => {
    unlockScroll();
    dialogRef.current?.close();
  };

  // Native close event — Escape key and any other programmatic close.
  const handleNativeClose = () => unlockScroll();

  // Close on click outside the panel only — the pointer must land on the
  // backdrop itself, never during normal page movement.
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInDialog) {
      closeDialog();
    }
  };

  // Primary CTA: close, then travel to the contact section. Smooth
  // scrolling is skipped when the visitor prefers reduced motion.
  const handleCTAClick = () => {
    closeDialog();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  // Phone: the tel: link proceeds via its default action; closing first
  // keeps the handoff to the dialer clean. The session flag was already
  // set on trigger, so the dialog never returns this session.
  const handlePhoneClick = () => {
    closeDialog();
  };

  return (
    <dialog
      ref={dialogRef}
      className="consultation-dialog"
      onClick={handleDialogClick}
      onClose={handleNativeClose}
      aria-labelledby="consultation-title"
      aria-describedby="consultation-desc"
    >
      {/* Ghost word - large editorial mark behind content */}
      <span className="consultation-ghost" aria-hidden="true">
        TALK
      </span>

      {/* Close control — a direct child of the dialog so it anchors to the
          panel corner with clearance from the content flow */}
      <button
        type="button"
        className="consultation-close focus-ring"
        onClick={closeDialog}
        aria-label="Close consultation invitation"
      >
        ×
      </button>

      {/* Content container */}
      <div className="consultation-content">
        {/* Eyebrow */}
        <p className="consultation-eyebrow eyebrow">READY WHEN YOU ARE</p>

        {/* Headline */}
        <h2 id="consultation-title" className="consultation-title">
          Let&apos;s talk about
          <br />
          <span className="consultation-title-gold">what you need.</span>
        </h2>

        {/* Supporting text */}
        <p id="consultation-desc" className="consultation-support">
          Tell us what&apos;s bothering you, and we&apos;ll help you understand
          the next step.
        </p>

        {/* Primary CTA */}
        <button
          type="button"
          className="consultation-cta focus-ring"
          onClick={handleCTAClick}
        >
          <span>TALK TO THE DENTIST</span>
          <span className="consultation-cta-arrow" aria-hidden="true">
            →
          </span>
        </button>

        {/* Phone */}
        <a
          href="tel:+919966340056"
          className="consultation-phone focus-ring"
          onClick={handlePhoneClick}
        >
          099663 40056
        </a>

        {/* Location metadata */}
        <p className="consultation-location">TOLOCHOWKI · HYDERABAD</p>
      </div>

      {/* Optional: fine gold line decoration */}
      <div className="consultation-line" aria-hidden="true" />
    </dialog>
  );
}
