# Design System — The Tooth Dental Studio

**Visual language specification for AI agents implementing the website.**

This document defines the visual direction, not the content. All content decisions must reference `.agent/CANONICAL.md`.

---

## Design Concept

### The website should feel like:

- A contemporary dental studio
- Editorial healthcare design
- Premium but approachable
- Clinical but human
- Precise but warm
- Authentic rather than luxurious for the sake of luxury

### Core emotional response journey:

| Moment           | Response                                      |
| ---------------- | --------------------------------------------- |
| First impression | "This feels premium."                         |
| Second           | "This is clearly this real clinic."           |
| Third            | "These people genuinely care about patients." |
| Final            | "I trust them enough to book."                |

### Brand philosophy in visual form:

**"THE EXPERIENCE IS PART OF THE TREATMENT."**

The design itself should communicate care, attention, and intentionality. Every visual choice should reinforce that this is a place where patients are listened to, understood, and treated with consideration.

---

## Visual Principles

### Core principles:

**Editorial composition**

- Think magazine layout, not landing page template
- Each section has a distinct visual personality
- Content flows with narrative intention

**Asymmetric layouts**

- Avoid centered, balanced symmetry
- Use offset positioning deliberately
- Create visual tension and release

**Large typography**

- Major statements demand visual weight
- Headlines should feel commanding, not decorative
- Let key messages breathe

**Oversized statements**

- Signature phrases deserve presence
- Numbers like "5.0" and "1,147" can be monumental
- Trust signals should feel substantial

**Strong whitespace**

- Space is a design element, not empty space
- Let content breathe
- Premium feel comes from restraint, not filling every pixel

**Intentional image cropping**

- Crop with purpose
- Focus on what matters
- Don't show everything—show the right thing

**Overlapping media**

- Layer elements to create depth
- Images can break out of containers
- Text and image can interact

**Visual rhythm**

- Alternate between dense and sparse sections
- Create pacing through the scroll
- Let the page breathe, then compress, then breathe again

**Alternating light/dark moments**

- Use contrast between sections
- Dark sections create intimacy and focus
- Light sections create openness and clarity

**Photography-led storytelling**

- Real clinic photography is the primary visual asset
- Let images tell the story
- Design around the photos, not the other way around

**Subtle technical/clinical visual details**

- Precision markers, measurement-like elements
- Clean lines and edges
- Clinical aesthetic without being cold

---

## Color Direction

### Primary palette:

| Color                         | Usage                                          |
| ----------------------------- | ---------------------------------------------- |
| **Charcoal / Near-black**     | Primary backgrounds, text, dark sections       |
| **Warm ivory / Off-white**    | Light backgrounds, text on dark, open sections |
| **Warm yellow / Gold accent** | Highlights, accents, CTAs, trust signals       |

### Gold usage rules:

- Use as an accent, not as an overwhelming theme
- Draw attention to key elements: CTAs, ratings, highlights
- Should feel intentional, not decorative
- Never gold-for-gold's-sake

### Color application:

- Dark sections create focus, intimacy, and premium feel
- Light sections create openness, clarity, and approachability
- Transitions between dark and light should feel intentional
- Clinical precision can be suggested through clean color boundaries

### Important:

Do not redesign the clinic logo or invent a new brand identity. The existing visual identity from the clinic's assets and logo should inform the palette.

---

## Typography

### Hierarchy principles:

**Display typography (major statements)**

- Strong modern display typeface
- Used for signature phrases and headlines
- Command attention without shouting
- Editorial presence

**Body copy**

- Highly readable neutral sans-serif
- Optimized for reading comfort
- Warm but not casual
- Clinical but not cold

**Metadata labels**

- Small uppercase
- Used for eyebrows, categories, section labels
- Creates structure and hierarchy
- Spacer caps or tracking-increased for refinement

### Editorial hierarchy:

| Level           | Purpose              | Treatment                      |
| --------------- | -------------------- | ------------------------------ |
| H1 / Display    | Signature statements | Large, bold, commanding        |
| H2              | Section headlines    | Substantial, clear             |
| H3              | Subsections          | Distinct but subordinate       |
| Body            | Reading content      | Comfortable, warm              |
| Eyebrow / Label | Metadata             | Small caps, uppercase, tracked |

### Font selection note:

Do not specify an arbitrary font if the project has not chosen one yet. The typography direction should guide selection:

- Display: Strong character, modern, editorial feel
- Body: Neutral, highly legible, warm

---

## Layout Rules

### Avoid:

- **Repetitive 2-column sections** — The same layout repeated creates visual fatigue
- **Repetitive 3-column cards** — Generic service grids diminish the premium feel
- **Giant service-card grids** — This is not a SaaS product listing
- **Generic centered landing-page layouts** — Everything centered feels template-like
- **Uniform section heights** — Vary the rhythm
- **Predictable image placement** — Images should not always be left-then-right alternated

### Prefer:

**Asymmetric compositions**

- Offset blocks
- Unequal columns
- Intentional imbalance

**Full-bleed media**

- Images and video that extend to edges
- Break out of containers
- Create immersion

**Offset blocks**

- Content that doesn't align to a predictable grid
- Visual interest through positioning

**Editorial sequencing**

- Each section has its own layout personality
- Flow from one composition to the next
- Narrative-driven structure

**Horizontal compositions**

- Wide visual statements
- Panoramic treatment of media
- Use width as a design element

**Overlapping imagery**

- Images that overlap text or other images
- Creates depth and sophistication
- Breaks the grid intentionally

**Visual transitions between sections**

- Dark to light
- Dense to sparse
- Large to small
- Create contrast and pacing

### Section variation:

The 14 approved content sections should feel like a designed sequence, not a template repeated 14 times. Each section should have distinct visual personality while remaining cohesive.

### Section identity ghost word:

Every major homepage section carries **one unique uppercase word in the background** — a large, very low-contrast serif "ghost word" that names the identity of that section. This is a standing convention across the site, not a one-off decoration.

- **Section 02 (Proof)** — background word: `REPUTATION`
- **Section 03 (Treatment Atlas)** — background word: `CARE`
- Each future section must adopt its own single identity word — never reuse a word between sections.
- Treatment: oversized serif (Cormorant), extremely low contrast (5–8% opacity against its ground), anchored to the section head, `aria-hidden`, never interactive, never a competing read — it should be felt more than seen.
- The word replaces the section number as the background mark; the section number lives in the eyebrow / index typography instead.

---

## Image Treatment

### Core principle:

**Use the clinic's actual images.**

The project contains real clinic photography. This is a primary asset, not a placeholder for stock imagery.

### Orientation respect:

- Respect each image's natural orientation
- Portrait images should be treated as portrait
- Landscape images as landscape
- Square images as square
- Do not force portrait assets into inappropriate landscape compositions

### Portrait/Reel videos:

- The clinic videos are portrait/reel format
- This is a strength, not a limitation
- Design for vertical video intentionally
- Mobile experience should feel native to portrait video
- Desktop should accommodate portrait gracefully

### Image types and treatment:

| Image type              | Count | Treatment                             |
| ----------------------- | ----- | ------------------------------------- |
| Hero video              | 1     | Full presence, signature moment       |
| Doctor photos           | 2     | Editorial portrait treatment          |
| Clinic images           | 6     | Environmental, spatial storytelling   |
| Happy patient photos    | 4     | Authentic, warm, human                |
| Treatment-action images | 22    | Clinical, precise, documentary style  |
| Before/After            | 8     | Comparative, case-study format        |
| X-rays                  | 3     | Clinical imaging, technical aesthetic |
| Educational images      | 5     | Informational, approachable           |

### Cropping and framing:

- Crop with intention
- Focus on the subject or action
- Maintain authenticity
- Avoid over-stylizing clinical photos
- Editorial cropping is acceptable; artificial effects are not

---

## Brand Consistency

### Distinct from competitors:

The design must remain clearly distinct from:

- DentaLounge
- NeoDent
- Any competitor reference sites

### Quality benchmark:

The quality and polish may be similar to or higher than premium dental websites, but the visual language must be original to The Tooth Dental Studio.

### What to avoid copying:

- Competitor color schemes
- Competitor layout patterns
- Competiter typography choices
- Competitor section structures

### What to match or exceed:

- Polish and refinement
- Responsiveness and usability
- Loading performance
- Accessibility

### Originality requirement:

If a design direction feels like it could be mistaken for a competitor, it should be reconsidered. The Tooth Dental Studio has its own brand, its own story, and its own visual identity.

---

## Anti-Patterns

### Visual practices to use sparingly or not at all:

**Avoid excessive:**

| Pattern                       | Why avoid                                           |
| ----------------------------- | --------------------------------------------------- |
| Glassmorphism                 | Feels trendy, dates quickly, obscures content       |
| Gradients                     | Can feel generic, diminishes premium editorial feel |
| Floating blobs                | Decorative without purpose, feels template-like     |
| Heavy shadows                 | Can feel dated, reduces clarity                     |
| Rounded cards                 | Overused in SaaS, diminishes editorial feel         |
| Decorative shapes             | Adds visual noise without meaning                   |
| Excessive borders             | Creates visual clutter                              |
| Animations for their own sake | Distracts from content, feels gimmicky              |

### When effects are appropriate:

- **Subtle shadows** can create depth when intentional
- **Gentle animations** can enhance UX when purposeful (scroll reveals, micro-interactions)
- **Minimal gradients** can add warmth when used as texture, not decoration

### Test for appropriateness:

Ask: "Does this visual choice serve the content and user, or is it decoration?"

If it's decoration, remove it.

---

## Conversion Design

### CTA principles:

**CTAs should feel:**

- Premium and intentional
- Part of the design, not an interruption
- Clear and easy to act on

**CTAs should not feel:**

- Aggressive or desperate
- Generic button styling
- Repeated identically throughout the page

### Conversion points:

The page should guide users toward:

| Action                  | Context                                    |
| ----------------------- | ------------------------------------------ |
| **Book an Appointment** | Primary conversion, hero and final section |
| **Call the Clinic**     | Secondary, available when urgency matters  |
| **Emergency Contact**   | Contextually relevant in emergency section |
| **Get Directions**      | Location-focused, practical action         |

### Conversion restraint:

Do not turn every section into a CTA section.

The experience should build trust and interest naturally. Conversion opportunities should appear at meaningful moments:

- After establishing authority
- After emotional connection
- After providing value
- At natural decision points

### CTA hierarchy:

| Level     | Style                   | Placement           |
| --------- | ----------------------- | ------------------- |
| Primary   | Most prominent          | Hero, final section |
| Secondary | Present but subordinate | Contextual, in-line |
| Tertiary  | Minimal, functional     | Navigation, footer  |

---

## Responsive Design

### Core principle:

**Desktop and mobile must feel intentionally designed.**

Neither should feel like an afterthought of the other.

### Mobile considerations:

- Portrait videos are a strength on mobile
- Touch targets must be appropriate
- Typography should scale thoughtfully
- Layouts should reflow, not just shrink
- Dark sections can create focus on small screens
- Swipe/scroll interactions should feel natural

### Desktop considerations:

- Use the additional horizontal space intentionally
- Asymmetric layouts shine at larger sizes
- Typography can be more expressive
- Images can be larger and more immersive
- Don't center everything just because there's space

### Breakpoint philosophy:

- Design for the content, not arbitrary breakpoints
- Let the content dictate when layouts should change
- Test on actual devices when possible
- Consider the full range: mobile, tablet, desktop, large screens

### Performance:

- Image optimization is part of responsive design
- Video should be appropriately sized and compressed
- Load times affect user experience and trust
- Fast loads are a feature, not an afterthought

---

## Final Directive

The AI implementing this website has creative freedom inside this visual system.

**Creative freedom includes:**

- Visual composition and layout decisions
- Interaction and motion design
- Typography selection within the defined direction
- Spacing and rhythm choices
- Color application within the palette
- Responsive behavior and adaptation
- Technical implementation approach

**Creative freedom does not include:**

- Rewriting or changing approved content
- Inventing business facts or medical claims
- Changing the brand positioning or philosophy
- Ignoring the canonical project rules
- Using stock imagery when real assets exist
- Creating a generic template design

The design must serve the brand philosophy: **"THE EXPERIENCE IS PART OF THE TREATMENT."**

Every visual choice should reinforce that this is a place where care, attention, and patient experience matter.

---

**Reference the canonical document for all content decisions:**

```
.agent/CANONICAL.md
```

**Reference the approved content strategy for deeper context:**

```
public/content strategy for the clinic.pdf
```
