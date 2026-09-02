# Implementation Guidelines — The Tooth Dental Studio

**Technical implementation guidelines for AI coding agents building the website.**

This document defines architecture, coding standards, and implementation rules. All content decisions must reference `.agent/CANONICAL.md`. All visual decisions must reference `.agent/design-system.md`.

---

## Tech Stack

| Technology | Version/Notes            |
| ---------- | ------------------------ |
| Framework  | Next.js (App Router)     |
| Language   | TypeScript               |
| Styling    | Tailwind CSS             |
| Assets     | Local files in `/public` |

---

## Architecture

### Core principle:

**Build with reusable section components, not monolithic page files.**

The website should be composed of distinct section components that can be developed, tested, and reasoned about independently. Each section maps to a distinct content purpose defined in `.agent/CANONICAL.md`.

### Suggested conceptual sections:

| Section           | Purpose                                            | CANONICAL.md Reference |
| ----------------- | -------------------------------------------------- | ---------------------- |
| `hero`            | First impression, trust proof, primary CTA         | SECTION 01             |
| `philosophy`      | Patient experience, Listen/Explain/Treat/Follow-up | SECTION 02             |
| `authority`       | Review reputation, 5.0 rating, patient themes      | SECTION 03             |
| `doctor`          | Dr. Mohammed Imran Ali introduction                | SECTION 04             |
| `studio`          | Clinic environment, atmosphere                     | SECTION 05             |
| `care-method`     | Treatment philosophy and approach                  | SECTION 06             |
| `emergency`       | "When pain can't wait" messaging                   | SECTION 07             |
| `clinical-craft`  | Technical expertise, X-rays, before/after          | SECTION 08             |
| `treatments`      | Services offered                                   | SECTION 09             |
| `diagnosis`       | Examination and diagnosis approach                 | SECTION 10             |
| `patient-stories` | Authentic patient experiences                      | SECTION 11             |
| `before-after`    | Visual treatment outcomes                          | SECTION 12             |
| `education`       | Patient education content                          | SECTION 13             |
| `final-cta`       | Conversion, appointment booking                    | SECTION 14             |
| `footer`          | Contact, location, navigation                      | —                      |

### Component structure:

```
app/
├── layout.tsx
├── page.tsx
├── globals.css
└── components/
    ├── sections/
    │   ├── Hero.tsx
    │   ├── Philosophy.tsx
    │   ├── Authority.tsx
    │   ├── Doctor.tsx
    │   ├── Studio.tsx
    │   ├── CareMethod.tsx
    │   ├── Emergency.tsx
    │   ├── ClinicalCraft.tsx
    │   ├── Treatments.tsx
    │   ├── Diagnosis.tsx
    │   ├── PatientStories.tsx
    │   ├── BeforeAfter.tsx
    │   ├── Education.tsx
    │   ├── FinalCTA.tsx
    │   └── Footer.tsx
    ├── ui/
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   └── [other shared UI components]
    └── layout/
        ├── Navigation.tsx
        └── [layout components]
```

### Architecture rules:

1. **One section = one component file** — Each conceptual section is a dedicated component
2. **Sections compose the page** — `page.tsx` imports and arranges section components
3. **Shared UI is separate** — Buttons, cards, and reusable elements live in `components/ui/`
4. **Layout components are separate** — Navigation, footer, and structural elements in `components/layout/`
5. **The folder structure can evolve** — If a better architecture is justified, document the reasoning

---

## Content Separation

### Core principle:

**Keep major website content/data separate from visual components where practical.**

### Approaches:

| Content Type                        | Recommended Approach                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| Section copy (headlines, body text) | Consider a content file (e.g., `content.ts` or `content.json`) or CMS integration |
| Navigation links                    | Data file or configuration                                                        |
| Treatment list                      | Data file with treatment objects                                                  |
| Doctor information                  | Data file referencing CANONICAL.md facts                                          |
| Clinic details                      | Data file with address, hours, contact                                            |
| Theme/design tokens                 | Tailwind config or separate theme file                                            |

### Benefits:

- Content changes don't require component editing
- Easier to audit content against CANONICAL.md
- Clearer separation of concerns
- Easier future CMS integration

### Implementation:

```
app/
├── content/
│   ├── sections.ts        # Section headlines and copy
│   ├── treatments.ts      # Treatment list data
│   ├── navigation.ts      # Navigation structure
│   └── clinic.ts          # Clinic facts and contact info
└── components/
    └── sections/
        └── Hero.tsx       # Imports from content/sections.ts
```

### Rule:

If content is defined in CANONICAL.md, it should be sourceable from a content file rather than hardcoded in components.

---

## Assets

### Core principle:

**Use local assets from `/public`. Do not create placeholder image URLs when real assets exist.**

### Asset locations:

| Category           | Path                                      |
| ------------------ | ----------------------------------------- |
| Hero video         | `/public/videos/`                         |
| Clinic tour videos | `/public/videos/clinic video/`            |
| Doctor photos      | `/public/images/Dr photo/`                |
| Clinic images      | `/public/images/clinic images/`           |
| Patient photos     | `/public/images/Happy Patient/`           |
| Treatment images   | `/public/images/Treatment action images/` |
| Before/after       | `/public/images/before-after/`            |
| X-rays             | `/public/images/x-ray/`                   |
| Educational        | `/public/images/eduction image/`          |

### Asset rules:

1. **Real assets first** — Use actual clinic photos and videos as primary design material
2. **No placeholder URLs** — Do not generate Unsplash, placeholder.com, or other external URLs when real assets exist
3. **Reference asset-guidelines.md** — Check `.agent/asset-guidelines.md` for complete inventory and usage notes
4. **Portrait video handling** — All clinic videos are portrait/reel format; design accordingly
5. **No forced transformations** — Don't force portrait video into landscape containers

### Image import pattern:

```tsx
// Preferred: Use Next.js Image component with local path
import Image from "next/image";

<Image
  src="/images/Dr photo/dr-mohammed-imran-ali-tooth-dental-studio-hyderabad-01.png"
  alt="Dr. Mohammed Imran Ali at The Tooth Dental Studio"
  width={600}
  height={800}
/>;
```

### Video import pattern:

```tsx
// Use video element or preferred video library
<video
  src="/videos/dr-mohammed-imran-ali-dental-treatment-tooth-dental-studio-hyderabad.mp4"
  autoPlay
  muted
  loop
  playsInline
/>
```

---

## Accessibility

### Core principle:

**Build for everyone. Accessibility is not optional.**

### Requirements:

| Requirement                | Implementation                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **Semantic HTML**          | Use appropriate elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`) |
| **Heading hierarchy**      | Logical heading order (h1 → h2 → h3). No skipped levels                                        |
| **Keyboard accessibility** | All interactive elements are keyboard-accessible                                               |
| **Focus states**           | Visible focus indicators on all interactive elements                                           |
| **Meaningful alt text**    | Images have descriptive alt text (empty `alt=""` for decorative images)                        |
| **Accessible buttons**     | Use `<button>` for actions, `<a>` for navigation. Never `<div onclick>`                        |
| **Form labels**            | All form inputs have associated labels                                                         |
| **Color contrast**         | Sufficient contrast ratios (WCAG AA minimum)                                                   |
| **Reduced motion**         | Respect `prefers-reduced-motion` media query                                                   |
| **Screen reader support**  | Test with screen readers. Use aria attributes when semantic HTML isn't sufficient              |

### Focus states:

```css
/* Tailwind CSS focus states */
.button {
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
}
```

### Reduced motion:

```css
/* Tailwind CSS reduced motion support */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
  }
}
```

### Alt text guidelines:

| Image Type       | Alt Text Approach                                                          |
| ---------------- | -------------------------------------------------------------------------- |
| Doctor portrait  | "Dr. Mohammed Imran Ali at The Tooth Dental Studio"                        |
| Clinic interior  | "Treatment room at The Tooth Dental Studio in Tolichowki"                  |
| Patient photo    | "Patient at The Tooth Dental Studio" (no identifying info without consent) |
| Treatment action | Describe the treatment context shown                                       |
| Before/after     | "Before and after dental treatment results" (no medical claims)            |
| Decorative       | Use `alt=""` to hide from screen readers                                   |

---

## Responsive Design

### Core principle:

**Design desktop and mobile intentionally. Do not simply shrink the desktop layout.**

### Approach:

| Viewport    | Design Philosophy                                                  |
| ----------- | ------------------------------------------------------------------ |
| **Mobile**  | Touch-friendly, single-column focus, prioritized content hierarchy |
| **Tablet**  | Transitional layout, appropriate touch targets                     |
| **Desktop** | Full design expression, multi-column layouts, hover states         |

### Rules:

1. **Mobile-first approach** — Start with mobile, enhance for larger screens
2. **Touch targets** — Minimum 44px touch targets on mobile/tablet
3. **Content priority** — Mobile shows essential content first; secondary content may be hidden or reorganized
4. **Navigation** — Mobile navigation pattern (hamburger, drawer) vs. desktop navigation
5. **Images** — Appropriate image sizes for each viewport; use Next.js Image responsive features
6. **Typography** — Readable type sizes at all breakpoints
7. **Interactions** — Hover states only on desktop; touch interactions on mobile

### Tailwind breakpoints:

```css
/* Default: Mobile-first */
.element {
  @apply text-base; /* Mobile */
  @apply md:text-lg; /* Tablet (768px+) */
  @apply lg:text-xl; /* Desktop (1024px+) */
  @apply xl:text-2xl; /* Large desktop (1280px+) */
}
```

---

## Performance

### Core principle:

**Fast first render. Optimize everything else.**

### Requirements:

| Area                    | Optimization                                                          |
| ----------------------- | --------------------------------------------------------------------- |
| **Images**              | Use Next.js Image component for automatic optimization                |
| **Video**               | Lazy-load videos below the fold; consider poster images               |
| **JavaScript**          | Minimize client-side JS; use server components where possible         |
| **Fonts**               | Use `next/font` for optimized font loading                            |
| **CSS**                 | Tailwind CSS purges unused styles automatically                       |
| **Third-party scripts** | Load after interaction or use `next/script` with appropriate strategy |
| **Code splitting**      | Dynamic imports for below-the-fold sections                           |

### Image optimization:

```tsx
// Next.js Image with optimization
import Image from "next/image";

<Image
  src="/images/clinic images/treatment-room.jpg"
  alt="Treatment room at The Tooth Dental Studio"
  width={800}
  height={600}
  loading="lazy" // Lazy-load below fold
  quality={85} // Optimize quality
  sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes
/>;
```

### Video optimization:

```tsx
// Video with poster and lazy loading
<video
  src="/videos/clinic-tour.mp4"
  poster="/images/clinic-poster.jpg"
  controls
  preload="none" // Don't preload
  playsInline
/>
```

### Code splitting:

```tsx
// Dynamic import for below-fold sections
import dynamic from "next/dynamic";

const PatientStories = dynamic(
  () => import("@/components/sections/PatientStories"),
  { loading: () => <div className="min-h-screen" /> },
);
```

### Performance budget:

| Metric                   | Target                  |
| ------------------------ | ----------------------- |
| First Contentful Paint   | < 1.5s                  |
| Largest Contentful Paint | < 2.5s                  |
| Time to Interactive      | < 3.5s                  |
| Cumulative Layout Shift  | < 0.1                   |
| Total page weight        | < 1MB (excluding video) |

---

## SEO

### Core principle:

**Help search engines understand the content clearly.**

### Requirements:

| Area                  | Implementation                                              |
| --------------------- | ----------------------------------------------------------- |
| **Semantic headings** | Logical h1 → h2 → h3 hierarchy; one h1 per page             |
| **Metadata**          | Use Next.js Metadata API for title, description, Open Graph |
| **Structured data**   | LocalBusiness schema with verified information              |
| **Canonical URLs**    | Set canonical URLs where appropriate                        |
| **Images**            | Descriptive alt text for all meaningful images              |
| **URLs**              | Clean, readable URLs                                        |

### Metadata implementation:

```tsx
// app/layout.tsx or page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "The Tooth Dental Studio | Dentist & Dental Clinic in Tolichowki, Hyderabad",
  description:
    "Patient-focused dental care in Tolichowki, Hyderabad. 5.0 Google rating with 1,147 reviews. Dr. Mohammed Imran Ali provides calm, clear, and caring dentistry.",
  openGraph: {
    title:
      "The Tooth Dental Studio | Dentist & Dental Clinic in Tolichowki, Hyderabad",
    description:
      "Patient-focused dental care in Tolichowki, Hyderabad. 5.0 Google rating with 1,147 reviews.",
    url: "https://thetoothdentalstudio.com",
    siteName: "The Tooth Dental Studio",
    locale: "en_IN",
    type: "website",
  },
};
```

### Structured data:

Use only verified information from CANONICAL.md:

```tsx
// LocalBusiness schema
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "The Tooth Dental Studio",
  "image": "https://thetoothdentalstudio.com/images/clinic images/clinic-exterior.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nasr Plaza, Plot No. 158, above UCO Bank, beside Honda Showroom, Surya Nagar Colony",
    "addressLocality": "Tolichowki",
    "addressRegion": "Telangana",
    "postalCode": "500008",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    // Use actual coordinates if available
  },
  "telephone": // Use actual phone number if approved,
  "priceRange": // Only if approved in CANONICAL.md,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "1147"
  }
}
```

### SEO rules:

1. **Reference seo-guidelines.md** — Check `.agent/seo-guidelines.md` for complete SEO strategy
2. **Use verified facts only** — All structured data must come from CANONICAL.md
3. **Do not invent** — No made-up phone numbers, coordinates, or business facts
4. **One h1 per page** — Main headline is h1; section headlines are h2
5. **Descriptive URLs** — Use readable URL paths where applicable

---

## Code Quality

### Core principle:

**Write clean, readable, maintainable code.**

### Requirements:

| Area             | Standard                                                         |
| ---------------- | ---------------------------------------------------------------- |
| **TypeScript**   | Strict mode enabled; no `any` types without justification        |
| **Components**   | Reusable, composable, single responsibility                      |
| **Readability**  | Clear variable names, appropriate comments, logical organization |
| **Dependencies** | Minimal; justify each addition; prefer well-maintained packages  |
| **Duplication**  | DRY; extract shared logic into utilities or hooks                |
| **Abstractions** | Purposeful only; don't create abstractions for their own sake    |

### TypeScript standards:

```tsx
// Prefer explicit types
interface SectionProps {
  eyebrow?: string;
  headline: string;
  body: string;
  cta?: {
    label: string;
    href: string;
  };
}

// Avoid
const data: any = fetchData();

// Prefer
interface Treatment {
  name: string;
  description: string;
}

const data: Treatment[] = fetchData();
```

### Component organization:

```tsx
// Component file structure
// 1. Imports
// 2. Types/interfaces
// 3. Component definition
// 4. Sub-components (if local)
// 5. Utilities (if local)

import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  // ...
}

export function Hero({ eyebrow, headline, body }: HeroProps) {
  return <section>{/* ... */}</section>;
}
```

### Rules:

1. **No unused imports** — Remove unused imports before committing
2. **No console.log in production** — Remove debugging statements
3. **Handle errors gracefully** — Try-catch for async operations, error boundaries for components
4. **Test critical paths** — At minimum, test booking flows and interactive elements
5. **Document complex logic** — Add comments for non-obvious decisions

---

## AI Safety

### Core principle:

**Before adding content or features, check `.agent/CANONICAL.md`.**

### Never invent:

| Category             | Rule                                                              |
| -------------------- | ----------------------------------------------------------------- |
| **Business facts**   | Use only approved information from CANONICAL.md                   |
| **Testimonials**     | Use only approved patient quotes; do not fabricate reviews        |
| **Medical outcomes** | No claims about treatment success rates or guarantees             |
| **Credentials**      | Do not invent degrees, certifications, awards, or specializations |
| **Statistics**       | Use only verified numbers (e.g., 5.0 rating, 1,147 reviews)       |
| **Treatment names**  | Use only treatments explicitly listed in CANONICAL.md             |

### When information is missing:

1. **Check CANONICAL.md** — Is the information there?
2. **Check other .agent/ files** — Is it in design-system.md, asset-guidelines.md, etc.?
3. **Mark as unknown** — Use placeholder like `[Contact info needed]` rather than guessing
4. **Do not fabricate** — Missing information stays missing; invented information is never acceptable

### Verification checklist:

Before adding any factual claim:

- [ ] Is this in CANONICAL.md?
- [ ] Is this in another .agent/ instruction file?
- [ ] Is this a reasonable design/layout decision within my creative freedom?
- [ ] Am I inventing something that should be verified first?

If any answer is "no" or "I don't know," do not add the claim.

---

## Design Freedom

### Core principle:

**The agent has substantial creative freedom within established boundaries.**

### Creative freedom:

| Area                         | Freedom Level                                                     |
| ---------------------------- | ----------------------------------------------------------------- |
| **Visual composition**       | Full — Design layouts that serve the content                      |
| **Layout**                   | Full — Create arrangements that feel premium and intentional      |
| **Interactions**             | Full — Design motion and interactions within motion-guidelines.md |
| **Typography**               | Full — Within design-system.md parameters                         |
| **Spacing**                  | Full — Use whitespace intentionally                               |
| **Responsive behavior**      | Full — Design mobile and desktop experiences intentionally        |
| **Technical implementation** | Full — Choose appropriate patterns and structures                 |

### No creative freedom:

| Area                  | Rule                                                           |
| --------------------- | -------------------------------------------------------------- |
| **Canonical content** | Use approved content from CANONICAL.md exactly as written      |
| **Brand positioning** | Maintain "THE EXPERIENCE IS PART OF THE TREATMENT" positioning |
| **Business facts**    | Do not change, embellish, or invent facts                      |
| **Design rules**      | Follow design-system.md constraints                            |
| **Motion rules**      | Follow motion-guidelines.md constraints                        |
| **SEO rules**         | Follow seo-guidelines.md constraints                           |

### The boundary:

**You can change HOW content is presented. You cannot change WHAT the content says or invent content that doesn't exist.**

---

## Quick Reference

| Need                                | Reference                      |
| ----------------------------------- | ------------------------------ |
| Business facts, approved content    | `.agent/CANONICAL.md`          |
| Visual language, colors, typography | `.agent/design-system.md`      |
| Writing voice, content rules        | `.agent/content-guidelines.md` |
| Asset inventory, usage notes        | `.agent/asset-guidelines.md`   |
| SEO strategy, structured data       | `.agent/seo-guidelines.md`     |
| Motion philosophy, animation rules  | `.agent/motion-guidelines.md`  |

---

## Final Directive

**Every implementation decision should be traceable to an approved source.**

Before making a decision, ask:

1. Is this content in CANONICAL.md?
2. Is this visual approach consistent with design-system.md?
3. Is this motion consistent with motion-guidelines.md?
4. Is this SEO consistent with seo-guidelines.md?
5. Am I inventing anything that should be verified?

If all answers are satisfactory, proceed with creative confidence.
