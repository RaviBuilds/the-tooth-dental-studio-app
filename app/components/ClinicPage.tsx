"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Hero } from "./sections/Hero";
import { Proof } from "./sections/Proof";
import { Atlas } from "./sections/Atlas";
import { Diagnosis } from "./sections/Diagnosis";
import { Doctor } from "./sections/Doctor";
import { Studio } from "./sections/Studio";
import { Emergency } from "./sections/Emergency";
import { Final } from "./sections/Final";
import { ConsultationDialog } from "./ConsultationDialog";

function PhoneIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function Navigation() {
  return (
    <header className="site-nav">
      <a
        href="#top"
        className="nav-brand focus-ring"
        aria-label="The Tooth Dental Studio, Tolichowki, Hyderabad - home"
      >
        <Image
          src="/images/tooth-dental-studio-logo.png"
          alt=""
          width={92}
          height={92}
          sizes="92px"
          preload
          className="nav-logo"
        />
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a className="focus-ring" href="#approach">
          Approach
        </a>
        <a className="focus-ring" href="#doctor">
          Doctor
        </a>
        <a className="focus-ring" href="#studio">
          Studio
        </a>
        <a className="focus-ring" href="#contact">
          Contact
        </a>
      </nav>
      <div className="nav-actions">
        <a className="nav-phone focus-ring" href="tel:+919966340056">
          <PhoneIcon />
          <span>{"099663 40056"}</span>
        </a>
        <a className="nav-cta focus-ring" href="#contact">
          {"Book a Visit"} <span aria-hidden>{"\u2197"}</span>
        </a>
        <a
          className="nav-call focus-ring"
          href="tel:+919966340056"
          aria-label="Call the clinic - 099663 40056"
        >
          <PhoneIcon />
        </a>
      </div>
    </header>
  );
}

// export function Authority(){return <Section id="trust" dark className="px-6 py-24 md:px-10 md:py-32"><div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1fr_1.4fr] md:items-end"><div><Eyebrow>1,147 PATIENT VOICES</Eyebrow><div className="display mt-12 text-[9rem] leading-[.72] text-gold md:text-[14rem]">5.0</div><p className="mt-8 text-xl">★★★★★ <span className="text-background/50">/ Google Reviews</span></p></div><div><h2 className="display max-w-2xl text-6xl md:text-8xl">A reputation built one experience at a time.</h2><p className="mt-8 max-w-xl text-lg leading-8 text-background/70">A good dental visit is not simply about completing a procedure. It is about understanding the problem, knowing your options, feeling comfortable with the plan and knowing that someone is paying attention throughout the process.</p><p className="mt-12 max-w-xl text-2xl leading-9 text-gold">The rating is the number. The experience is the reason.</p></div></div></Section>}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.014a9.56 9.56 0 01-5.091-1.473l-.366-.218-3.79.994 1.013-3.69-.239-.375a9.57 9.57 0 01-1.463-5.106c0-5.275 4.292-9.567 9.567-9.567a9.49 9.49 0 016.766 2.8 9.49 9.49 0 012.8 6.766c0 5.275-4.292 9.567-9.567 9.567m8.114-17.681A11.47 11.47 0 0012 0C5.739 0 .567 5.173.567 11.434a11.41 11.41 0 001.563 5.775L.067 24l6.928-1.817a11.45 11.45 0 005.469 1.392h.005c6.259 0 11.432-5.173 11.432-11.434 0-3.056-1.19-5.931-3.351-8.09z" />
    </svg>
  );
}

function CallIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.96.96 0 00-.95.24l-2.2 2.2a15.15 15.15 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.24-.95 11.42 11.42 0 01-.56-3.53c0-.53-.43-.96-.96-.96H3.98c-.53 0-.96.43-.96.96 0 9.62 7.81 17.43 17.43 17.43.53 0 .96-.43.96-.96v-3.09c0-.53-.43-.96-.96-.96zM19 9.99h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z" />
    </svg>
  );
}

function FloatingCTAs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("top");
      if (!heroSection) return;

      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;
      const threshold = heroHeight * 0.6; // Show after scrolling 60% past hero

      setIsVisible(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`floating-ctas ${!isVisible ? "hidden" : ""}`}
      aria-label="Quick contact options"
    >
      <a
        href="tel:+919966340056"
        className="floating-cta floating-cta--call focus-ring"
        aria-label="Call The Tooth Dental Studio"
      >
        <CallIcon />
      </a>
      <a
        href="https://wa.me/919966340056"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-cta floating-cta--whatsapp focus-ring"
        aria-label="Chat on WhatsApp with The Tooth Dental Studio"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}

export function ClinicPage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Proof />
        <Atlas />
        <Diagnosis />
        {/* <Authority /> */}
        <Doctor />
        <Studio />
        <Emergency />
      </main>
      {/* SECTION 08 — the site footer is a true document landmark,
          outside <main>. It carries id="contact" for every inbound
          #contact link (nav, hero, atlas, diagnosis, doctor, dialog). */}
      <Final />
      <FloatingCTAs />
      <ConsultationDialog />
    </>
  );
}
