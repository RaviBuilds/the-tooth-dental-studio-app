<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# The Tooth Dental Studio — Project Instructions

**Before modifying this project, you must:**

1. **Read `.agent/CANONICAL.md`** — This is the authoritative specification for all business facts, approved content, brand positioning, SEO direction, and asset restrictions.

2. **Read all relevant instruction files inside `.agent/`** — Additional rules may exist beyond the canonical document.

3. **Treat CANONICAL.md as the source of truth** — Do not override its content with generic assumptions or invented information.

4. **Use the approved content strategy** — Reference `public/content strategy for the clinic.pdf` when you need deeper context on the approved 9.5/10 content foundation.

5. **Never invent business facts** — Do not fabricate:
   - Medical claims or treatment outcomes
   - Patient reviews or testimonials
   - Doctor credentials, qualifications, or awards
   - Statistics, patient counts, or success rates
   - Treatment identities for unlabeled clinical images
   - Clinic services not explicitly approved

6. **Use real assets from `/public`** — The project contains actual clinic photos, videos, X-rays, and patient images. Prefer these over stock imagery.

7. **Preserve the patient-experience positioning** — The brand is built around:
   - "THE EXPERIENCE IS PART OF THE TREATMENT"
   - Calm, reassuring care
   - Clear explanations
   - Personal attention and follow-up

8. **Do not create a generic dental template** — Avoid:
   - SaaS-style card grids
   - Generic icon blocks
   - Stock dental imagery
   - Excessive gradients/glassmorphism
   - Copying competitor websites

9. **Focus creative freedom appropriately** — You have freedom in:
   - Visual composition and layout
   - Interaction and motion design
   - Typography and spacing
   - Responsive behavior
   - Technical implementation

   You do **not** have freedom to:
   - Rewrite approved copy
   - Invent business facts
   - Change the brand positioning

10. **Flag unknowns explicitly** — When information is missing or unverified, mark it clearly rather than guessing.

---

## Quick Reference

| What                 | Where                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------- |
| Authoritative spec   | `.agent/CANONICAL.md`                                                                    |
| Content strategy PDF | `public/content strategy for the clinic.pdf`                                             |
| Doctor photos        | `public/images/Dr photo/`                                                                |
| Clinic images        | `public/images/clinic images/`                                                           |
| Patient photos       | `public/images/Happy Patient/`                                                           |
| Treatment images     | `public/images/Treatment action images/`                                                 |
| Before/After         | `public/images/before-after/`                                                            |
| X-rays               | `public/images/x-ray/`                                                                   |
| Hero video           | `public/videos/dr-mohammed-imran-ali-dental-treatment-tooth-dental-studio-hyderabad.mp4` |
| Clinic tours         | `public/videos/clinic video/`                                                            |

---

**Inspect the existing project structure before making architectural changes.**
