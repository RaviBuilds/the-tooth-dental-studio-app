# Asset Guidelines — The Tooth Dental Studio

**Comprehensive asset-usage guidelines for AI agents implementing the website.**

This document defines how to use the clinic's photography, videos, and visual assets. All content decisions must reference `.agent/CANONICAL.md`.

---

## Asset Philosophy

### Core principle:

**REAL CLINIC ASSETS FIRST.**

The website should use the clinic's real photography and videos as primary design material. These assets contain authentic moments, real patients, actual clinical work, and the genuine environment of The Tooth Dental Studio.

### Rule:

> Do not replace existing authentic media with stock or AI-generated imagery unless explicitly instructed.

Stock imagery should only be considered when:

- No relevant real asset exists
- The project explicitly requests stock
- A placeholder is needed temporarily

### Why real assets matter:

| Asset type            | Value                                             |
| --------------------- | ------------------------------------------------- |
| Real doctor photos    | Humanizes the practice, builds trust              |
| Real clinic images    | Shows the actual environment patients will visit  |
| Real patient photos   | Authentic social proof, not staged                |
| Real treatment images | Demonstrates actual clinical work                 |
| Real videos           | Shows the doctor in action, the clinic in reality |

---

## Asset Inventory Overview

| Category                | Count | Location                                  |
| ----------------------- | ----- | ----------------------------------------- |
| Hero video              | 1     | `/public/videos/`                         |
| Educational video       | 1     | `/public/videos/`                         |
| Clinic tour videos      | 2     | `/public/videos/clinic video/`            |
| Doctor photos           | 2     | `/public/images/Dr photo/`                |
| Clinic images           | 6     | `/public/images/clinic images/`           |
| Happy patient photos    | 4     | `/public/images/Happy Patient/`           |
| Treatment-action images | 22    | `/public/images/Treatment action images/` |
| Before/after images     | 8     | `/public/images/before-after/`            |
| X-rays                  | 3     | `/public/images/x-ray/`                   |
| Educational images      | 5     | `/public/images/eduction image/`          |
| Logo                    | 1     | `/public/images/`                         |

**Total: 55+ authentic clinic assets**

---

## Hero Assets

### Highest-priority video:

```
dr-mohammed-imran-ali-dental-treatment-tooth-dental-studio-hyderabad.mp4
```

**Location:** `/public/videos/`

### Usage notes:

| Attribute    | Value                                              |
| ------------ | -------------------------------------------------- |
| Format       | Portrait / Reel format                             |
| Subject      | Dr. Mohammed Imran Ali performing dental treatment |
| Priority     | Highest — signature visual asset                   |
| Intended use | Hero section or major feature section              |

### Important constraints:

- **Do not** force this video into a landscape video container
- **Do not** crop unnecessarily to fit a different aspect ratio
- **Do** design around portrait media intentionally
- **Do** let the video showcase the real doctor and real treatment

### Technical recommendations:

- Use poster image for initial load
- Consider muted autoplay for hero implementation
- Ensure performance is not compromised
- Mobile: Portrait video is a natural fit
- Desktop: Design around portrait gracefully

---

## Doctor Assets

### Primary doctor image:

```
dr-mohammed-imran-ali-tooth-dental-studio-hyderabad-01.png
```

**Location:** `/public/images/Dr photo/`

**Intended use:** Primary doctor portrait, section 04 (THE DOCTOR), any feature where Dr. Imran is the focus

### Secondary doctor image:

```
dr-mohammed-imran-ali-tooth-dental-studio-hyderabad-02.png
```

**Location:** `/public/images/Dr photo/`

**Intended use:** Alternative portrait, supporting content, about/conversion sections

### Usage notes:

- Both are PNG format with potential transparency
- Use for doctor-focused sections and trust building
- Maintain aspect ratio—do not crop into awkward framing
- Consider editorial portrait treatment

---

## Clinic Assets

### Front-desk / Reception image:

```
tooth-dental-studio-tolichowki-hyderabad.webp
```

**Location:** `/public/images/clinic images/`

**Intended use:** Primary clinic image, "Inside the Studio" section, establishing the clinic environment

### Treatment room / Interior images:

| Filename                                                          | Format |
| ----------------------------------------------------------------- | ------ |
| `tooth-dental-studio-treatment-room-tolichowki-hyderabad-01.jpg`  | JPG    |
| `tooth-dental-studio-treatment-room-tolichowki-hyderabad-02.webp` | WebP   |
| `tooth-dental-studio-treatment-room-tolichowki-hyderabad-03.webp` | WebP   |
| `tooth-dental-studio-treatment-room-tolichowki-hyderabad-04.webp` | WebP   |
| `tooth-dental-studio-treatment-room-tolichowki-hyderabad-05.jpg`  | JPG    |

**Location:** `/public/images/clinic images/`

**Intended use:** "Inside the Studio" section, environmental storytelling, showing the clinical space

### Usage notes:

- Show the actual clinic environment patients will experience
- Use for "A space where care happens" narrative
- Mix formats (JPG, WebP)—consider optimization
- Can be used as supporting visuals throughout

---

## Clinic Videos

### Clinic tour videos:

| Filename                                                      |
| ------------------------------------------------------------- |
| `tooth-dental-studio-clinic-tour-tolichowki-hyderabad-01.mp4` |
| `tooth-dental-studio-clinic-tour-tolichowki-hyderabad-02.mp4` |

**Location:** `/public/videos/clinic video/`

**Intended use:** "Inside the Studio" section, studio/environment storytelling, showing the clinic space in motion

### Usage notes:

- Both videos are valuable for environmental storytelling
- Portrait/reel format
- Use to show the clinic in a dynamic, immersive way
- Consider autoplay, muted, with optional sound toggle
- Can be used as supporting media or featured content

---

## Educational Video

### Water flossers educational video:

```
dr-mohammed-imran-ali-oracura-water-flossers-usage-video-tooth-dental-studio-hyderabad.mp4
```

**Location:** `/public/videos/`

**Intended use:** Educational content section, social proof of doctor's expertise, supporting material

### Usage notes:

| Attribute | Value                                             |
| --------- | ------------------------------------------------- |
| Subject   | Dr. Imran discussing/demonstrating water flossers |
| Priority  | Lower — supporting content                        |
| Format    | Portrait / Reel format                            |

**Placement:**

- Use in educational content section
- Can support the "Know Your Dental Health" section
- Not intended for hero or primary feature

---

## Happy Patient Assets

### Happy patient images (4 total):

| Filename                                                                    |
| --------------------------------------------------------------------------- |
| `dr-mohammed-imran-ali-happy-patient-tooth-dental-studio-hyderabad-01.webp` |
| `dr-mohammed-imran-ali-happy-patient-tooth-dental-studio-hyderabad-02.webp` |
| `dr-mohammed-imran-ali-happy-patient-tooth-dental-studio-hyderabad-03.webp` |
| `dr-mohammed-imran-ali-happy-patient-tooth-dental-studio-hyderabad-04.webp` |

**Location:** `/public/images/Happy Patient/`

**Intended use:** Major human/social-proof section, "Patient Stories" section, bringing the 5-star reputation to life

### Usage notes:

- Real patient photos—authentic social proof
- Use for "The people behind the 5 stars" narrative
- Combine with review excerpts
- Create emotional connection through real faces
- Can be used in multiple patient-focused sections

---

## Treatment Action Images

### Treatment-action images (22 total):

| Filename                                                     | Format |
| ------------------------------------------------------------ | ------ |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-01.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-02.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-03.png`  | PNG    |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-04.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-05.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-06.png`  | PNG    |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-07.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-08.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-09.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-10.png`  | PNG    |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-11.png`  | PNG    |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-12.png`  | PNG    |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-13.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-14.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-15.png`  | PNG    |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-16.png`  | PNG    |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-17.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-18.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-19.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-20.webp` | WebP   |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-21.png`  | PNG    |
| `tooth-dental-studio-treatment-tolichowki-hyderabad-22.png`  | PNG    |

**Location:** `/public/images/Treatment action images/`

**Intended use:** "Clinical Craft" section, showing real clinical work, "Dentistry is precision you can see"

### Critical restriction:

**Treatment identity is currently unknown.**

Until Dr. Imran confirms treatment identities:

**Allowed temporary labels:**

| Label     | When to use                                           |
| --------- | ----------------------------------------------------- |
| CONSULT   | Images showing consultation, discussion, examination  |
| PREPARE   | Images showing preparation, setup, clinical readiness |
| TREAT     | Images showing active treatment, clinical work        |
| REFINE    | Images showing refinement, adjustment, fine work      |
| COMPLETE  | Images showing completion, final results, finishing   |
| FOLLOW UP | Images showing post-treatment, follow-up care         |

**Do not:**

- Invent exact treatment names (e.g., "Root Canal Treatment," "Dental Implant Procedure")
- Claim specific clinical procedures are shown
- Make assumptions about what treatment is depicted

### Usage notes:

- These are real clinical images—treat with professional respect
- Use for "REAL CLINIC. REAL DENTISTRY. REAL PATIENT CARE." narrative
- Editorial presentation preferred over clinical documentation style
- Mix of WebP and PNG formats—optimize for performance

---

## Before / After Images

### Before/after images (8 total):

| Filename                                                                 |
| ------------------------------------------------------------------------ |
| `tooth-dental-studio-before-after-treatment-tolichowki-hyderabad-01.jpg` |
| `tooth-dental-studio-before-after-treatment-tolichowki-hyderabad-02.jpg` |
| `tooth-dental-studio-before-after-treatment-tolichowki-hyderabad-03.jpg` |
| `tooth-dental-studio-before-after-treatment-tolichowki-hyderabad-04.jpg` |
| `tooth-dental-studio-before-after-treatment-tolichowki-hyderabad-05.jpg` |
| `tooth-dental-studio-before-after-treatment-tolichowki-hyderabad-06.jpg` |
| `tooth-dental-studio-before-after-treatment-tolichowki-hyderabad-07.jpg` |
| `tooth-dental-studio-before-after-treatment-tolichowki-hyderabad-08.jpg` |

**Location:** `/public/images/before-after/`

**Intended use:** "Before / After" section, visual proof of treatment outcomes

### Critical restriction:

**Treatment identities are currently unknown.**

Until Dr. Imran confirms treatment identities:

**Use neutral case labels:**

| Label   | Format        |
| ------- | ------------- |
| CASE 01 | Primary label |
| CASE 02 | Primary label |
| CASE 03 | Primary label |
| CASE 04 | Primary label |
| CASE 05 | Primary label |
| CASE 06 | Primary label |
| CASE 07 | Primary label |
| CASE 08 | Primary label |

**Do not:**

- Invent clinical labels (e.g., "Dental Implant Case," "Root Canal Case")
- Claim specific treatment outcomes
- Imply guaranteed results
- Make up procedure names

### Usage notes:

- These are real clinical cases—treat professionally
- Use interactive before/after viewer if appropriate
- Can be grouped as "Clinical cases from The Tooth Dental Studio"
- Once confirmed, these can become treatment-specific case studies

---

## X-Ray Images

### X-ray images (3 total):

| Filename                                                         | Notes                                                 |
| ---------------------------------------------------------------- | ----------------------------------------------------- |
| `tooth-dental-studio-treatment-xray-tolichowki-hyderabad-01.jpg` | Visibly references "WISDOM TEETH RCT / DR. IMRAN ALI" |
| `tooth-dental-studio-treatment-xray-tolichowki-hyderabad-02.jpg` | Visibly references "FILE RETRIEVAL"                   |
| `tooth-dental-studio-treatment-xray-tolichowki-hyderabad-03.jpg` | Not sufficiently identified (panoramic X-ray)         |

**Location:** `/public/images/x-ray/`

**Intended use:** "Diagnosis & Precision" section, demonstrating clinical imaging capability

### Usage notes:

| Image    | Acceptable label                   |
| -------- | ---------------------------------- |
| X-ray 01 | "Wisdom Teeth RCT — Clinical Case" |
| X-ray 02 | "File Retrieval — Clinical Case"   |
| X-ray 03 | "Dental X-Ray — Clinical Imaging"  |

### Critical restriction:

**Do not:**

- Diagnose or interpret X-rays
- Claim clinical findings not confirmed by the dentist
- Invent case details
- Make treatment recommendations based on X-ray appearance

### Usage notes:

- Use for "Better treatment begins with better understanding" narrative
- Show clinical precision and diagnostic capability
- Present as clinical imaging, not marketing material
- Neutral, professional presentation

---

## Educational Images

### Educational/Instagram images (5 total):

| Filename                                                                    |
| --------------------------------------------------------------------------- |
| `tooth-dental-studio-how-to-protect-your-teeth-tolichowki-hyderabad-01.jpg` |
| `tooth-dental-studio-how-to-protect-your-teeth-tolichowki-hyderabad-02.jpg` |
| `tooth-dental-studio-how-to-protect-your-teeth-tolichowki-hyderabad-03.jpg` |
| `tooth-dental-studio-how-to-protect-your-teeth-tolichowki-hyderabad-04.jpg` |
| `tooth-dental-studio-how-to-protect-your-teeth-tolichowki-hyderabad-05.jpg` |

**Location:** `/public/images/eduction image/`

**Intended use:** "Know Your Dental Health" section, educational content, social media crosslink

### Usage notes:

- Normal Instagram educational assets
- **Lower priority** — supporting material, not primary hero content
- Use to show the clinic's educational role
- Can link to Instagram @dentist24_7
- Not intended for major visual moments

---

## Logo

### Clinic logo:

```
tooth-dental-studio-logo.png
```

**Location:** `/public/images/`

**Intended use:** Navigation, footer, branding elements

### Usage notes:

- Do not redesign or modify the logo
- Use in appropriate branding contexts
- Maintain aspect ratio
- Consider dark/light background versions if needed

---

## Video Rules

### Format:

**All current supplied videos are portrait/reel format.**

| Video                     | Format   |
| ------------------------- | -------- |
| Hero treatment video      | Portrait |
| Clinic tour 01            | Portrait |
| Clinic tour 02            | Portrait |
| Educational flosser video | Portrait |

### Design principles:

1. **Design around portrait media** — Do not force portrait videos into landscape containers
2. **Do not crop unnecessarily** — Respect the original composition
3. **Use poster images where appropriate** — Provide a good first frame
4. **Muted autoplay only when appropriate** — Never autoplay with sound
5. **Performance matters** — Do not allow video to compromise page performance

### Implementation recommendations:

| Consideration | Recommendation                                                   |
| ------------- | ---------------------------------------------------------------- |
| Format        | MP4 (already supplied)                                           |
| Poster        | Use first frame or selected poster image                         |
| Autoplay      | Muted, optionally with scroll-trigger                            |
| Controls      | Provide play/pause, optional sound toggle                        |
| Mobile        | Portrait video is a strength on mobile                           |
| Desktop       | Design around portrait gracefully, consider side-by-side layouts |
| Loading       | Lazy-load below-fold videos                                      |
| Size          | Optimize for web, consider multiple resolutions                  |

### Mobile vs. Desktop:

| Platform | Treatment                                                   |
| -------- | ----------------------------------------------------------- |
| Mobile   | Portrait video is natural and immersive                     |
| Desktop  | Can be featured prominently or alongside supporting content |

---

## Naming Conventions

### Current naming pattern:

Assets follow a descriptive naming convention:

```
[clinic/doctor]-[subject]-[location]-[number].[extension]
```

**Examples:**

| Pattern                 | Example                                                                  |
| ----------------------- | ------------------------------------------------------------------------ |
| Doctor + Clinic         | `dr-mohammed-imran-ali-tooth-dental-studio-hyderabad-01.png`             |
| Clinic + Location       | `tooth-dental-studio-tolichowki-hyderabad.webp`                          |
| Treatment + Location    | `tooth-dental-studio-treatment-tolichowki-hyderabad-01.webp`             |
| Before/After + Location | `tooth-dental-studio-before-after-treatment-tolichowki-hyderabad-01.jpg` |

### Naming rules:

- Filenames should remain lowercase
- Use hyphens as separators
- Descriptive, keyword-rich names
- Numbered sequences for related images
- Natural keyword combinations

### If new assets are added:

Follow the existing naming convention:

```
tooth-dental-studio-[subject]-tolichowki-hyderabad-[number].[extension]
```

or

```
dr-mohammed-imran-ali-[subject]-tooth-dental-studio-hyderabad-[number].[extension]
```

---

## AI Rule

### Before using an asset:

**Inspect its actual content when necessary instead of trusting a filename blindly.**

Filenames are descriptive but may not perfectly match what's shown in the image.

### When to inspect:

| Situation                       | Action                               |
| ------------------------------- | ------------------------------------ |
| Uncertain what the image shows  | Open and examine the actual image    |
| Need to verify orientation      | Check actual dimensions              |
| Need to confirm subject         | View the image content               |
| Choosing between similar assets | Compare actual content               |
| Writing captions or alt text    | Base on actual content, not filename |

### How to inspect:

1. Use the `view_image` tool for image files
2. Use the `read_file` tool for metadata where needed
3. When implementing, visually verify in the development environment

---

## Asset Quick Reference

### Priority ranking:

| Priority | Asset                        | Use                                  |
| -------- | ---------------------------- | ------------------------------------ |
| 1        | Hero treatment video         | Hero section                         |
| 2        | Doctor photos (2)            | Doctor section, trust building       |
| 3        | Clinic front-desk image      | Studio section, environment          |
| 4        | Happy patient photos (4)     | Patient stories section              |
| 5        | Before/after images (8)      | Before/after section                 |
| 6        | Clinic tour videos (2)       | Studio section                       |
| 7        | Treatment-action images (22) | Clinical craft section               |
| 8        | X-rays (3)                   | Diagnosis section                    |
| 9        | Clinic interior images (5)   | Supporting environment content       |
| 10       | Educational images (5)       | Educational section (lower priority) |
| 11       | Educational video            | Supporting content (lower priority)  |

---

## Final Directive

Use real clinic assets as the primary visual material. These are not placeholders—they are the actual photography and video that makes this website authentic to The Tooth Dental Studio.

**Before using any external or generated asset, ask:**

> "Does a real clinic asset already exist for this purpose?"

If the answer is yes, use the real asset.

---

**Reference the canonical document for all content decisions:**

```
.agent/CANONICAL.md
```
