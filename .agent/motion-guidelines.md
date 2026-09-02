# Motion Guidelines — The Tooth Dental Studio

**Motion and interaction philosophy for the website.**

This document defines how motion should feel and function. All visual decisions must reference `.agent/design-system.md`. All content facts must reference `.agent/CANONICAL.md`.

---

## Motion Character

### Core concept:

**The motion should feel like one continuous wave.**

Not a series of disconnected animations. Not a demonstration of capability. A single, flowing experience that carries the visitor through the content.

### Motion qualities:

| Quality        | Definition                                                     |
| -------------- | -------------------------------------------------------------- |
| **Soft**       | Gentle, not harsh or abrupt. No sudden jumps or snaps.         |
| **Fluid**      | Continuous flow between states. Elements feel connected.       |
| **Cinematic**  | Composed, intentional. Like a film, not a cartoon.             |
| **Controlled** | Purposeful restraint. Every movement serves a purpose.         |
| **Organic**    | Natural, not mechanical. Movement feels alive, not programmed. |

### Motion should feel like:

> The visitor should experience the motion as natural breathing rather than obvious animation.

Motion is present but not attention-seeking. It enhances the experience without announcing itself.

---

## Motion Families

The website uses five motion families. Each serves a specific purpose.

### 1. Reveal

**Purpose:** Gentle opacity and position transitions for text and imagery entering the viewport.

**When to use:**

- Section headings appearing on scroll
- Body text fading in
- Images emerging into view
- Content blocks revealing sequentially

**Implementation:**

| Property | Approach                                      |
| -------- | --------------------------------------------- |
| Opacity  | Fade from 0 to 1                              |
| Position | Gentle upward translation (e.g., 20-40px)     |
| Duration | 400-800ms                                     |
| Easing   | Ease-out or cubic-bezier for organic feel     |
| Stagger  | Delay between sequential elements (100-200ms) |

**Character:**

- Soft, not dramatic
- Content arrives gracefully
- No bouncing or overshooting
- Respect content hierarchy

**Example timing:**

```
Section enters viewport
  → Eyebrow reveals first (100ms delay)
  → Headline reveals second (200ms delay)
  → Body copy reveals third (300ms delay)
  → Supporting elements reveal as needed
```

---

### 2. Image Drift

**Purpose:** Very subtle parallax and scale movement for imagery.

**When to use:**

- Hero video background
- Large photography sections
- Environmental imagery
- Creating depth without distraction

**Implementation:**

| Property | Approach                                   |
| -------- | ------------------------------------------ |
| Parallax | Very subtle vertical translation on scroll |
| Scale    | Gentle scale shift (1.0 to 1.05 max)       |
| Duration | Tied to scroll position, not time-based    |
| Easing   | Linear or subtle ease based on scroll      |

**Character:**

- Barely perceptible
- Creates depth and dimension
- Never distracting from content
- Feels like the image is alive, not animated

**Restraint:**

- Parallax should be subtle (5-15% of scroll distance)
- Scale should be minimal (never more than 1.05-1.1)
- Do not create aggressive depth effects
- Do not make users dizzy

---

### 3. Horizontal Travel

**Purpose:** Lateral motion for clinical craft, gallery, and visual storytelling moments.

**When to use:**

- Treatment-action image sequences
- Before/after comparison viewers
- Clinic environment imagery
- Gallery-style content blocks

**Implementation:**

| Property   | Approach                                |
| ---------- | --------------------------------------- |
| Direction  | Horizontal scroll or drag               |
| Container  | Overflow-hidden with scrollable content |
| Navigation | Optional arrows, dots, or drag hint     |
| Momentum   | Natural momentum on drag release        |
| Snap       | Optional snap points for discrete items |

**Character:**

- Editorial, not carousel-like
- Feels like moving through a gallery
- Can be scroll-driven or interaction-driven
- Supports narrative flow

**Usage:**

- Use for the 22 treatment-action images
- Use for before/after comparison
- Use for clinic tour imagery
- Let content dictate width, not arbitrary breakpoints

---

### 4. Transform

**Purpose:** Subtle scale, clip, mask, and position transitions for element state changes.

**When to use:**

- Section transitions
- Content blocks changing state
- Visual reveals that need more than fade
- Masking imagery into view

**Implementation:**

| Property | Approach                             |
| -------- | ------------------------------------ |
| Scale    | Subtle (0.95 to 1.0, or 1.0 to 1.02) |
| Clip     | Reveal through clipping path         |
| Mask     | Mask imagery for reveals             |
| Position | Translation for entry/exit           |
| Duration | 300-600ms                            |

**Character:**

- Refined, not flashy
- Supports visual hierarchy
- Can create premium feel
- Never aggressive

**Examples:**

| Use case           | Transform                              |
| ------------------ | -------------------------------------- |
| Image entering     | Scale from 0.98 to 1.0 while fading in |
| Section transition | Content blocks shift and fade together |
| Reveal element     | Clip-path animation to reveal content  |
| CTA attention      | Subtle scale pulse (1.0 to 1.02)       |

---

### 5. Micro-interactions

**Purpose:** Small-scale motion for interactive elements and feedback.

**When to use:**

- Button hover/tap states
- Navigation interactions
- Treatment card hovers
- Review interactions
- Link hovers
- Form inputs

**Implementation:**

| Element    | Interaction | Motion                                  |
| ---------- | ----------- | --------------------------------------- |
| Buttons    | Hover       | Subtle scale (1.0 to 1.02), color shift |
| Buttons    | Press       | Scale down slightly (1.0 to 0.98)       |
| Links      | Hover       | Underline slide or color shift          |
| Navigation | Hover       | Color shift, subtle indicator           |
| Cards      | Hover       | Subtle lift or scale                    |
| Images     | Hover       | Subtle scale within container           |

**Character:**

- Fast and responsive (150-250ms)
- Clear feedback
- Not distracting
- Consistent across similar elements

**Restraint:**

- No aggressive bouncing on hover
- No excessive 3D transforms
- No distracting cursor effects
- Keep subtle and purposeful

---

## Motion Rules

### Motion must:

1. **Support storytelling**

   Every animation should serve the narrative. If it doesn't help tell the story, question whether it's needed.

2. **Be purposeful**

   Motion exists to enhance understanding, guide attention, or provide feedback—not to demonstrate capability.

3. **Feel responsive**

   Users should never wait for content. Motion should be fast enough to feel immediate while maintaining its soft character.

4. **Respect user preferences**

   Honor `prefers-reduced-motion`. For users who prefer reduced motion, disable or minimize animations.

### Motion must not:

| Prohibition              | Reason                                         |
| ------------------------ | ---------------------------------------------- |
| Aggressive bouncing      | Feels unprofessional, distracts from content   |
| Excessive 3D             | Creates visual noise, can feel dated           |
| Excessive cursor effects | Interferes with user intent, annoying          |
| Scroll hijacking         | Unless absolutely necessary; breaks user trust |
| Waiting for content      | Users should access content immediately        |
| Attention-seeking        | Motion should support, not compete             |

### Scroll behavior:

| Approach                   | Rule                                           |
| -------------------------- | ---------------------------------------------- |
| Native scroll              | Prefer native browser scroll                   |
| Scroll-triggered animation | Use IntersectionObserver, not scroll listeners |
| Smooth scroll              | Use CSS `scroll-behavior: smooth` sparingly    |
| Parallax                   | Keep minimal and performant                    |

---

## Video Motion

### Portrait video handling:

**All supplied clinic videos are portrait/reel format.**

| Video                | Format   | Treatment                                     |
| -------------------- | -------- | --------------------------------------------- |
| Hero treatment video | Portrait | Feature intentionally, do not force landscape |
| Clinic tour 01       | Portrait | Use for environment storytelling              |
| Clinic tour 02       | Portrait | Use for environment storytelling              |
| Educational video    | Portrait | Supporting content                            |

### Rules:

| Do                               | Do not                                                    |
| -------------------------------- | --------------------------------------------------------- |
| Design around portrait media     | Artificially convert portrait to fake cinematic landscape |
| Let portrait video be a strength | Crop unnecessarily                                        |
| Use video intentionally          | Add decorative motion effects to video                    |
| Use poster frames                | Let video delay content                                   |

### Video implementation:

| Technique    | Recommendation                                    |
| ------------ | ------------------------------------------------- |
| Poster frame | Use high-quality poster for initial frame         |
| Autoplay     | Muted only, never autoplay with sound             |
| Controls     | Provide play/pause, optional sound toggle         |
| Lazy loading | Lazy-load below-fold videos                       |
| Performance  | Optimize file size, consider multiple resolutions |

---

## Performance

### Motion performance rules:

| Rule                                   | Reason                                |
| -------------------------------------- | ------------------------------------- |
| Optimize video loading                 | Large files block rendering           |
| Use poster frames                      | Show something immediately            |
| Lazy-load lower-page media             | Prioritize above-fold content         |
| Avoid excessive simultaneous animation | Too much motion overwhelms and slows  |
| Do not block meaningful content        | Content is more important than motion |
| Use CSS transforms                     | GPU-accelerated, performant           |
| Avoid animating layout properties      | Causes reflow, hurts performance      |

### Performance budget:

| Metric                    | Target                               |
| ------------------------- | ------------------------------------ |
| Animation frame rate      | 60fps (16ms per frame)               |
| Initial animation delay   | < 100ms after content ready          |
| Scroll animation response | Immediate (< 1 frame delay)          |
| Video load                | Poster frame immediately, video < 3s |

### Optimization techniques:

| Technique               | Implementation                              |
| ----------------------- | ------------------------------------------- |
| `will-change`           | Use sparingly for known animated elements   |
| GPU acceleration        | Use `transform` and `opacity` for animation |
| Debounce/throttle       | For scroll-based animations                 |
| `requestAnimationFrame` | For JS-driven animation                     |
| CSS containment         | Use `contain` for complex layouts           |

---

## Accessibility

### Reduced motion:

**Honor `prefers-reduced-motion` user preference.**

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable or minimize animations */
}
```

### Implementation:

| For users who prefer reduced motion | Approach                       |
| ----------------------------------- | ------------------------------ |
| Reveal animations                   | Disable or show immediately    |
| Parallax                            | Disable                        |
| Transforms                          | Disable or simplify            |
| Micro-interactions                  | Simplify to color changes only |
| Video autoplay                      | Disable                        |

### Motion and accessibility:

| Consideration        | Approach                                      |
| -------------------- | --------------------------------------------- |
| Epilepsy             | Avoid flashing or rapidly changing content    |
| Vestibular disorders | Avoid excessive motion, parallax              |
| Cognitive load       | Keep motion simple and predictable            |
| Distraction          | Allow users to consume content without motion |

---

## Motion Timing

### Duration guidelines:

| Motion type          | Duration                   |
| -------------------- | -------------------------- |
| Micro-interactions   | 150-250ms                  |
| Standard transitions | 300-500ms                  |
| Complex reveals      | 500-800ms                  |
| Stagger delays       | 100-200ms between elements |

### Easing:

| Easing                         | Use for                        |
| ------------------------------ | ------------------------------ |
| `ease-out`                     | Most exits and reveals         |
| `ease-in-out`                  | Bidirectional transitions      |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Material-style standard easing |
| Custom curves                  | Specific character needs       |

### Timing example:

```css
/* Standard reveal */
.reveal-element {
  transition:
    opacity 600ms ease-out,
    transform 600ms ease-out;
}

/* Micro-interaction */
.button {
  transition:
    transform 200ms ease-out,
    background-color 200ms ease-out;
}
```

---

## Motion Sequence

### Page load sequence:

| Phase   | Timing    | Motion                              |
| ------- | --------- | ----------------------------------- |
| Initial | 0ms       | Content visible, no motion          |
| Setup   | 0-100ms   | Prepare animations                  |
| Reveal  | 100-500ms | Hero content reveals sequentially   |
| Settle  | 500-800ms | Page settles, ready for interaction |

### Scroll sequence:

| Phase    | Trigger               | Motion                                |
| -------- | --------------------- | ------------------------------------- |
| Approach | Element near viewport | Prepare for reveal                    |
| Enter    | Element in viewport   | Reveal animation plays                |
| Settle   | Animation complete    | Element static, ready for interaction |

### Interaction sequence:

| Phase  | Trigger               | Motion              |
| ------ | --------------------- | ------------------- |
| Rest   | Default state         | No motion           |
| Hover  | Mouse enter           | Subtle state change |
| Active | Mouse down / tap      | Press state         |
| Exit   | Mouse leave / release | Return to rest      |

---

## Final Directive

Motion is a tool to enhance the experience, not a feature to demonstrate.

**The goal:**

> The visitor should experience the motion as natural breathing rather than obvious animation.

Motion should feel inevitable, not added. It should guide attention, create rhythm, and support the narrative flow. The user should hardly notice it's there, but would miss it if it were gone.

### Questions to ask:

Before adding motion, ask:

1. Does this support the content?
2. Does this help tell the story?
3. Is this motion necessary?
4. Would the experience be worse without it?
5. Is it accessible?

If the answer to any of these is no, reconsider the motion.

---

**Reference the design system for visual decisions:**

```
.agent/design-system.md
```

**Reference the canonical document for content facts:**

```
.agent/CANONICAL.md
```
