/* ==================================================================
   SECTION 08 — FINAL AUTHORITY / CONVERSION + LOCATION + FOOTER
   ("THE FINAL RESOLUTION")
   ------------------------------------------------------------------
   The final page of the site's visual story. Chapters 01–07 built
   trust (who / proof / treatments / diagnosis / doctor / studio /
   urgent access); this chapter calmly hands the visitor the next
   step: TRUST → CONFIDENCE → ACTION → LOCATION → GOODBYE.

   Editorial metaphor — THE FINAL RESOLUTION: a dark-charcoal closing
   chapter in the site's dark editorial language (Hero / Atlas /
   Studio family), ending on the signature statement drawn across as
   the website's visual full stop, then the footer as the lower band
   of this ONE major section (no Section 09 — homepage stays at
   exactly 8 major sections).

   Composition: folio meta row → READY WHEN YOU ARE. → headline →
   canonical support copy → BOOK AN APPOINTMENT (primary, opens the
   existing ConsultationDialog — no invented booking route) + CALL
   099663 40056 (large tel link) → GET DIRECTIONS / WHATSAPP
   (tertiary) → compact 5.0 / 1,147 trust anchor (Section 02 owns the
   full review story; this is only the final reminder) → LOCATION /
   01 editorial address plate (no map embed) → signature line →
   footer (brand / navigation / social+phone / legal).

   Content sources (nothing invented):
   - Eyebrow READY WHEN YOU ARE. / support paragraph / CTAs:
     verbatim .agent/CANONICAL.md SECTION 14 (FINAL AUTHORITY /
     CONVERSION) and the approved ConsultationDialog copy.
   - H2 "Care starts with a conversation.": the approved final
     headline already live on the homepage (CANONICAL conversion
     direction; content-guidelines Section 14 expressions).
   - Trust anchor: 5.0 ★★★★★ / 1,147 Google Reviews (CANONICAL §4).
   - Location block: verbatim CANONICAL LOCATION / CONTACT (address,
     descriptor, microcopy) + GET DIRECTIONS / Call / WhatsApp.
   - Footer: verbatim CANONICAL FOOTER table (brand, byline,
     description, links, social, contact).
   - Signature: THE EXPERIENCE IS PART OF THE TREATMENT.
     (CANONICAL §5 approved phrase 2 — placement: section statement).

   Ghost identity word: TRUST (unique across the site; the master
   brief proposed CARE, but CARE is owned by Section 03 Atlas and
   design-system.md requires one unique ghost word per section —
   TRUST was approved as the closing chapter's word).
   [VERIFY before production] — flagged constants:
   - DIRECTIONS_URL: client-approved Google Maps link (maps.app.goo.gl/
     nTqhRoZfwA6Cme8D6) — verified destination, used for all directions
     actions. The embedded map plate uses the keyless output=embed form
     pinned to the canonical address.
   - INSTAGRAM_URL: derived from the approved handle @dentist24_7
     (CANONICAL §11). Verify before launch.
   - "Patient Stories" footer link targets #approach (Proof owns the
     patient stories). The #stories anchor Hero links to does not
     exist; fixing it would require touching the locked Hero, which
     is out of scope.

   Behaviour:
   - Reveal gating: .final[data-final-ready] is set from JS so all
     content stays fully visible without JavaScript (the Hero→Studio
     pattern). Masked title lines are observed on their MASK element
     (the Proof.tsx IntersectionObserver/clip finding).
   - The ghost word is static (the closing chapter holds still) and
     resolves slowly — felt before it is read.
   - All motion is transform/opacity only; fully disabled under
     prefers-reduced-motion. No new dependencies, no media.
   ================================================================== */

"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const PHONE_DISPLAY = "099663 40056";
const PHONE_TEL = "tel:+919966340056";
const WHATSAPP_URL = "https://wa.me/919966340056";
const INSTAGRAM_URL = "https://www.instagram.com/dentist24_7"; // [VERIFY before production]

/* Client-approved Google Maps destination (supplied by the clinic) —
   used for every GET DIRECTIONS link in this section. */
const DIRECTIONS_URL = "https://maps.app.goo.gl/nTqhRoZfwA6Cme8D6";

/* The in-page map plate. Google Maps short links cannot be iframed
   directly, so the embed uses the keyless `output=embed` form pinned
   to the verified canonical address (CANONICAL §11). The clickable
   destination remains the client-approved link above. */
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(
    "The Tooth Dental Studio, Nasr Plaza, Plot No. 158, above UCO Bank, beside Honda Showroom, Surya Nagar Colony, Toli Chowki, Hyderabad, Telangana 500008",
  ) +
  "&output=embed";

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "#top" },
  { label: "Experience", href: "#approach" },
  { label: "Treatments", href: "#treatments" },
  { label: "Doctor", href: "#doctor" },
  /* Proof (Section 02, #approach) owns the patient stories; the
     #stories anchor used by the locked Hero does not exist. */
  { label: "Patient Stories", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export function Final() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") return; // stays visible
    section.setAttribute("data-final-ready", "true");

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
    section.querySelectorAll(".final-reveal").forEach((el) => io.observe(el));
    // Masks are observed, not their clipped inner lines (see header).
    section.querySelectorAll(".final-line").forEach((el) => io.observe(el));
    // The signature rule draws across as the final full stop.
    section.querySelectorAll(".final-draw").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  /* The site's established booking conversation: the ConsultationDialog
     (already mounted globally) listens for this event and opens. */
  const openConsultation = () => {
    window.dispatchEvent(new CustomEvent("tooth:open-consultation"));
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="final"
      aria-labelledby="final-title"
    >
      {/* ---------- Print field: fine rules + registration marks ---------- */}
      <svg
        className="final-field"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        {[120, 300, 480, 660, 840].map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} />
        ))}
        <line x1="64" y1="0" x2="64" y2="900" />
        <line x1="1136" y1="0" x2="1136" y2="900" />
        {(
          [
            [64, 300],
            [1136, 120],
            [64, 660],
            [1136, 840],
          ] as const
        ).map(([x, y]) => (
          <g key={`${x}-${y}`} className="final-field-cross">
            <line x1={x - 9} y1={y} x2={x + 9} y2={y} />
            <line x1={x} y1={y - 9} x2={x} y2={y + 9} />
          </g>
        ))}
        {(
          [
            [30, 30],
            [1170, 30],
            [30, 870],
            [1170, 870],
          ] as const
        ).map(([x, y]) => (
          <g key={`trim-${x}-${y}`} className="final-field-trim">
            <line x1={x - 14} y1={y} x2={x + 14} y2={y} />
            <line x1={x} y1={y - 14} x2={x} y2={y + 14} />
          </g>
        ))}
      </svg>

      {/* ---------- Ghost identity word — the closing chapter holds still ---------- */}
      <div className="final-ghost-wrap" aria-hidden="true">
        <span className="final-ghost display final-reveal final-reveal--fade">
          TRUST
        </span>
      </div>

      <div className="final-shell">
        {/* ---------- Folio meta row ---------- */}
        <div className="final-meta final-reveal" style={delay("0.02s")}>
          <span className="final-meta-left eyebrow">
            08 · THE FINAL RESOLUTION
          </span>
          <span className="final-meta-rule" aria-hidden="true" />
          <span className="final-meta-right eyebrow">
            THE TOOTH DENTAL STUDIO
          </span>
        </div>

        {/* ---------- Chapter head ---------- */}
        <header className="final-head">
          <p
            className="final-eyebrow eyebrow final-reveal"
            style={delay("0.06s")}
          >
            <span className="final-eyebrow-rule" aria-hidden="true" />
            READY WHEN YOU ARE.
          </p>
          <h2 id="final-title" className="final-title display">
            <span className="final-line">
              <span className="final-line-inner" style={delay("0.1s")}>
                Care starts
              </span>
            </span>
            <span className="final-line">
              <span className="final-line-inner" style={delay("0.18s")}>
                with a conversation.
              </span>
            </span>
          </h2>
          <p className="final-support final-reveal" style={delay("0.22s")}>
            For The Tooth Dental Studio, every appointment is an opportunity
            to make dental care feel more comfortable, more understandable
            and more personal. Tell us what&rsquo;s bothering you — the next
            step starts with a conversation.
          </p>
        </header>

        {/* ---------- Mid band: action (left) + location plate (right) ---------- */}
        <div className="final-mid">
          <div className="final-action">
            <div className="final-ctas final-reveal" style={delay("0.28s")}>
              <button
                type="button"
                className="final-cta focus-ring"
                onClick={openConsultation}
              >
                <span>Book an Appointment</span>
                <span className="final-cta-arrow" aria-hidden="true">
                  →
                </span>
              </button>
              <a
                className="final-phone focus-ring"
                href={PHONE_TEL}
                aria-label="Call the clinic — 099663 40056"
              >
                <span className="final-phone-label eyebrow" aria-hidden="true">
                  CALL
                </span>
                <span className="final-phone-num">{PHONE_DISPLAY}</span>
              </a>
            </div>

            <div className="final-secondary final-reveal" style={delay("0.34s")}>
              <a
                className="final-secondary-link focus-ring"
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                GET DIRECTIONS <span aria-hidden="true">→</span>
              </a>
              <span className="final-secondary-dot" aria-hidden="true">
                ·
              </span>
              <a
                className="final-secondary-link focus-ring"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with the clinic on WhatsApp"
              >
                WHATSAPP
              </a>
            </div>

            {/* ----- Compact trust anchor (Section 02 owns the full story) ----- */}
            <div
              className="final-trust final-reveal"
              style={delay("0.4s")}
              aria-label="Google rating: 5.0 stars from 1,147 reviews"
            >
              <span className="final-trust-score display">5.0</span>
              <span className="final-trust-stars" aria-hidden="true">
                ★★★★★
              </span>
              <span className="final-trust-meta eyebrow">
                1,147 GOOGLE REVIEWS
                <br />
                PATIENT-RATED DENTAL CARE
                <br />
                TOLOCHOWKI · HYDERABAD
              </span>
            </div>
          </div>

          {/* ---------- LOCATION / 01 — editorial address plate ---------- */}
          <div className="final-location final-reveal" style={delay("0.36s")}>
            <p className="final-location-tag eyebrow">LOCATION / 01</p>
            <h3 className="final-location-title display">
              Find The Tooth Dental Studio
            </h3>
            <p className="final-location-desc eyebrow">
              TOLOCHOWKI · HYDERABAD · TELANGANA
            </p>
            <address className="final-location-address">
              Nasr Plaza, Plot No. 158,
              <br />
              above UCO Bank,
              <br />
              beside Honda Showroom,
              <br />
              Surya Nagar Colony,
              <br />
              Tolichowki,
              <br />
              Hyderabad, Telangana 500008
            </address>
            <p className="final-location-note">
              Conveniently located in Surya Nagar Colony, Tolichowki.
            </p>

            {/* ---------- The map plate: editorial frame, grayscale until
                hovered, loads lazily (no layout cost before scroll) ---------- */}
            <div className="final-map final-reveal" style={delay("0.06s")}>
              <iframe
                className="final-map-embed"
                src={MAP_EMBED_URL}
                title="Map showing the location of The Tooth Dental Studio, Nasr Plaza, Tolichowki, Hyderabad"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="final-map-caption eyebrow" aria-hidden="true">
                MAP · SURYA NAGAR COLONY · 500008
              </p>
            </div>

            <a
              className="final-directions focus-ring"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              GET DIRECTIONS <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* ---------- The signature: the website's full stop ---------- */}
        <div className="final-signature">
          <p
            className="final-signature-line display final-reveal"
            style={delay("0.08s")}
          >
            THE EXPERIENCE IS PART OF THE TREATMENT.
          </p>
          <span
            className="final-signature-rule final-draw"
            style={delay("0.2s")}
            aria-hidden="true"
          />
        </div>

        {/* ---------- Footer band ---------- */}
        <div className="final-footer final-reveal" style={delay("0.12s")}>
          <div className="final-footer-brand">
            <p className="final-footer-name display">
              THE TOOTH
              <br />
              DENTAL STUDIO
            </p>
            <p className="final-footer-by eyebrow">BY DR. MOHAMMED IMRAN ALI</p>
            <p className="final-footer-desc">
              Patient-focused dental care in Tolichowki, Hyderabad, built
              around clear communication, comfortable treatment and personal
              care.
            </p>
          </div>

          <nav className="final-footer-nav" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <a key={link.label} className="focus-ring" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="final-footer-contact">
            <a
              className="final-footer-link focus-ring"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              INSTAGRAM · @DENTIST24_7
            </a>
            <a
              className="final-footer-link final-footer-link--phone focus-ring"
              href={PHONE_TEL}
              aria-label="Call the clinic — 099663 40056"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="final-legal final-reveal" style={delay("0.18s")}>
          <p>© THE TOOTH DENTAL STUDIO — TOLOCHOWKI, HYDERABAD</p>
          <a className="focus-ring" href="#top">
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
