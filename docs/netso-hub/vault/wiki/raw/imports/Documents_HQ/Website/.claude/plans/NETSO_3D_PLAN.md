--- owner: Tazwar Mahtab project: Netso HQ Website — 3D Immersive Build version: "1.0 — BRAINSTORM COMPLETE" status: Planning | Awaiting Taz's Go Signal updated: 2026-04-14 confidence: high ---
# NETSO 3D WEBSITE — BUILD PLAN

## 1. Concept (What We're Building)

A world-class, Awwwards-tier solar energy marketing website for Netso — Bangladesh's rooftop solar company. The visual centerpiece is a **3D solar energy globe** (dark sphere, golden energy nodes, particle flows showing energy distribution) in the hero, with **bold GSAP ScrollTrigger cinema** throughout the page.

**The feeling**: Premium dark engineering meets solar warmth. Not cold-tech. Not generic-green-solar. Bold, cinematic, Awwwards-quality — but about solar in Bangladesh, not a generic SaaS.

---

## 2. Design Direction

### Aesthetic: "Awwwards Dark Solar"
- **Background**: `#0A0D14` (Netso night) — deep, architectural, like the reference image
- **Hero text**: Huge. Bold. `Instrument Serif` or `Syne` or `Syncopate` — distinctive, NOT Inter
- **3D centerpiece**: Solar energy globe — dark sphere with golden nodes showing Bangladesh + global energy flow. Particle system connecting nodes. Subtle rotation.
- **Accent**: `#F59E0B` solar gold everywhere — nodes, borders, CTAs, hover states
- **Texture**: Subtle noise/grain overlay, glassmorphism on cards

### Reference from Image #3
- Dark background (#0A0D14)
- Hero text: massive, bold, distinctive typography (Syncopate-style)
- 3D globe with glowing nodes and particle connections
- Generous negative space
- "Unleash Your Digital Potential" energy = "Turn Your Rooftop Into A Power Plant"

### Typography Choice (Decision Needed)
Based on the reference and Netso's brand:
- **Display**: `Aeonik Pro` (fluid.glass style) — OR `Syne` (bold, geometric) — OR keep current `Instrument Serif`
- We will NOT use: Inter, Roboto, Arial, Space Grotesk
- Test against reference image aesthetic

---

## 3. Three-Layer 3D Strategy

### Layer 1 — Hero Globe (Priority 🔴)
- Three.js dark sphere, rendered on canvas
- Golden dot/nodes placed at lat/long of Dhaka + other BD cities
- Particle connections flowing between nodes (energy flow metaphor)
- Subtle auto-rotation (Y-axis, slow)
- Mouse parallax: globe tilts slightly on mouse move
- **Mobile**: Static high-quality render image (pre-rendered PNG fallback)
- GSAP entrance: globe scales from 0.8 → 1.0, rotation starts, opacity 0 → 1

### Layer 2 — GSAP ScrollTrigger Cinema (Priority 🔴)
The entire page as a scroll pipeline — NOT just the hero:
```
Scroll Pipeline:
Section 1 (Hero):         Globe grows, text reveals
Section 2 (Scroll):       Globe tilts toward camera, energy particles speed up
Section 3 (HowItWorks):   Globe splits into 3 smaller mini-orbs
Section 4 (Calculator):   Orbs settle, calculator glows
Section 5 (Social Proof): Mini-orbs reform into full globe in background
Section 6 (CTA):          Globe pulses with golden corona → CTA button
```
- ScrollTrigger `scrub: 1` for smooth 1:1 scroll-to-animation mapping
- GSAP `pin: true` on sections where camera movement needs holding time
- `anticipatePin: 1` to prevent jump/drag on pinned sections

### Layer 3 — Component Accents (Priority 🟡)
- SavingsCalculator: 3D animated solar panel behind the form
- Pricing cards: 3D tilt on hover (framer-motion `useMotionValue` + `rotateX/Y`)
- Trust badges section: small 3D globe icons

---

## 4. Technology Stack

### Core (Already in place)
- React 19 + Vite 7 (rolldown-vite@7.2.5)
- Framer Motion 11
- ReactLenis (smooth scroll)
- Tailwind CSS + clsx/tailwind-merge

### New Additions
| Library | Version | Purpose | CDN |
|---------|---------|---------|-----|
| Three.js | ^0.170.0 | 3D globe rendering | `cdn.jsdelivr.net/npm/three@0.170.0` |
| GSAP + ScrollTrigger | 3.14.1 | Scroll cinema | already registered |
| @gsap/react | ^2.1.1 | React GSAP hooks | `cdn.jsdelivr.net/npm/@gsap/react` |
| React Three Fiber | ^8.x | React Three.js (optional) | only if R3F needed |

### CDN vs npm Decision
- **Three.js + GSAP ScrollTrigger**: Load via CDN script tags in `index.html`
  - Pros: No bundle size increase, global gsap registration automatic
  - Cons: Slightly delayed init on slow connections
- **@gsap/react**: `npm install @gsap/react` (tiny, React-specific hook)
- Three.js usage pattern: Vanilla Three.js inside a `useEffect` + `useRef` (not full R3F — keeps bundle light)

---

## 5. File Changes Map

### New Files (create)
```
Website/
├── public/
│   ├── models/
│   │   └── globe-1024.webp      ← Pre-rendered static globe fallback
│   ├── textures/
│   │   ├── noise.svg            ← Grain texture overlay
│   │   └── solar-texture.webp   ← Optional globe texture
│   └── favicon.ico              ← Netso favicon (already exists check)
│
├── src/
│   ├── components/
│   │   ├── Hero3D/              ← NEW: Three.js 3D Hero
│   │   │   ├── Hero3D.tsx       ← Main component
│   │   │   ├── useGlobeScene.ts ← Three.js scene hook
│   │   │   ├── nodes.ts         ← Bangladesh city coordinates
│   │   │   └── particles.ts     ← GSAP particle system
│   │   ├── Hero.tsx             ← REBUILD: drop in 3D component
│   │   ├── SavingsCalculator.tsx ← REBUILD: add 3D panel behind
│   │   └── GlobeAccent.tsx      ← NEW: small globe for trust section
│   │
│   └── lib/
│       ├── gsap-scroll.ts       ← NEW: GSAP ScrollTrigger setup
│       └── three-globe.ts       ← NEW: Three.js globe factory
│
├── index.html                   ← REBUILD: add Three.js CDN
└── src/index.css               ← UPDATE: add noise texture, new tokens
```

### Modified Files (update existing)
```
src/App.tsx                     ← Add Hero3D import, adjust section order
src/components/Navbar.tsx       ← Add language toggle consistency
src/components/Hero.tsx         ← Replace flat hero with 3D version
src/components/SavingsCalculator.tsx ← Add 3D solar panel accent
src/components/HowItWorks.tsx   ← Keep, add GSAP scroll animation
src/index.css                   ← Add noise texture, scroll progress style
tailwind.config.js              ← Add Netso 3D color tokens
```

### Deleted Files (none — all existing sections preserved)

---

## 6. Animation Pipeline (GSAP + Three.js)

### Scene States per Scroll Section

```
SCROLL POSITION → SCENE STATE

0%   (Hero)
  → Globe: scale 0.8 → 1.0, opacity 0 → 1
  → Globe: slow Y rotation starts (0.002 rad/frame)
  → Particles: calm flow (2-3 particles/sec)
  → Text: staggered reveal, clip-path

10%  (DesignedForBangladesh)
  → Globe: slight Z-tilt toward viewer
  → Particles: speed increases (5-6 particles/sec)
  → Globe: gold node at Dhaka pulses

25%  (HowItWorks)  [PINNED 2 viewport heights]
  → Globe: split animation — 1 → 3 mini orbs scatter outward
  → Each mini-orb positioned at: kW saved / monthly savings / CO2
  → Mini-orbs labeled: "3kW", "৳18,000/mo", "1.8T CO2"

50%  (SavingsCalculator)
  → Mini-orbs converge toward center
  → Calculator form: gold border glow activates
  → "Book Inspection" button: pulse animation

75%  (Social Proof)
  → Globe fully reassembled, slow rotation behind testimonials
  → Energy particles stream from globe to quote cards

90%  (CTA/Footer)
  → Globe corona pulse (scale 1.0 → 1.05 → 1.0)
  → CTA button: solar gold glow
  → Particles: all stream toward CTA button
```

### GSAP Key Configs
```javascript
// ScrollTrigger pin for HowItWorks globe split
ScrollTrigger.create({
  trigger: "#how-it-works",
  start: "top top",
  end: "+=200%",          // pin for 2x viewport height
  pin: true,
  scrub: 1,
  anticipatePin: 1,
});

// Globe scene state tween
gsap.to(globeRef.current.material, {
  emissiveIntensity: scrollY.map(0, 100, 0.2, 1.0),
  scrollTrigger: { trigger: "#section", scrub: 1 }
});
```

---

## 7. Performance Strategy

### Desktop (netso.energy — primary target)
- Three.js CDN in `<head>` with `defer`
- `requestAnimationFrame` capped at 60fps
- Pixel ratio: `Math.min(window.devicePixelRatio, 2)` — no 3x retina drain
- Particle count: 50 desktop, 20 tablet
- Dispose Three.js geometry/material on unmount

### Mobile (iPhone/Android — Bangladesh traffic ~60%+)
- **Static fallback**: Pre-rendered globe PNG loads in < 50KB
- Three.js canvas hidden (`display: none`) on mobile
- Background: atmospheric gradient (night sky dark → solar gold at horizon)
- All GSAP scroll effects still fire on mobile (they animate DOM, not 3D)

### Core Web Vitals Protection
- LCP: Preload hero text font, show text immediately (canvas hydrates later)
- CLS: Reserve space for canvas with fixed height/width attributes
- FID: All Three.js initialization inside `useEffect` (post-hydration)

---

## 8. WhatsApp Flow (Conversion Layer)

The 3D globe scroll pipeline ends at the CTA. Every stop of the scroll journey has a micro-CTA:
```
Every section footer:
"Questions about solar? → Chat on WhatsApp"
wa.me/8801791222777
```

**3D-enhanced CTA section**:
- Globe corona pulse → golden button "Get Your Free Rooftop Assessment"
- Below: "or chat now →" with WhatsApp link
- Mobile: sticky WhatsApp FAB bottom-right, always visible

---

## 9. Build Phases (Execution Order)

### Phase 1 — Foundation (Do First)
- [ ] Clean up `Hero.tsx`, create `Hero3D/` component skeleton
- [ ] Set up Three.js globe (dark sphere, Bangladesh nodes, basic rotation)
- [ ] Add Three.js CDN to `index.html`
- [ ] Verify globe renders on desktop, static fallback on mobile
- [ ] Performance check: LCP, CLS

### Phase 2 — GSAP Scroll Cinema
- [ ] Set up `gsap-scroll.ts` with all ScrollTrigger instances
- [ ] Implement globe split animation at HowItWorks section
- [ ] Wire scroll position → Three.js state (emissive intensity, rotation speed)
- [ ] Test full scroll pipeline on desktop
- [ ] Test mobile fallback (static still looks great?)

### Phase 3 — Component Upgrades
- [ ] SavingsCalculator: add 3D solar panel behind form
- [ ] HowItWorks: rebuild section with 3 mini-orb visualizers
- [ ] Pricing: 3D card tilt on hover
- [ ] GlobeAccent: small globe in trust badges section

### Phase 4 — Polish & Launch Prep
- [ ] Custom cursor update: crosshair or sun-helix cursor
- [ ] Awwwards-tier micro-interactions (button ripple, text scramble on hover)
- [ ] Performance audit: bundle size, Lighthouse score
- [ ] Mobile cross-device testing (real devices preferred)
- [ ] Netlify/Vercel deployment to netso.energy
- [ ] Meta tags, OG image, schema markup

---

## 10. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Three.js on mobile too slow | Medium | Static fallback — already planned |
| GSAP + Three.js RAF conflict | Low | Use single RAF loop, pass scroll value as state |
| LCP regression from canvas | Medium | Font preload, text-first render order |
| Globe assets too large | Low | Max 50KB texture, lazy init |
| ScrollTrigger + ReactLenis conflict | Low | Use Lenis scroll as GSAP smoother, configure `normalizeScroll: true` |
| netso.energy DNS + SSL not ready | Medium | Use netlify.app subdomain staging first |

---

## 11. Open Questions (Taz Decision Needed)

1. **Globe texture** — Dark sphere with golden nodes (particle-only) OR textured globe with Bangladesh visible?
2. **Display font** — `Syncopate` (reference image style) OR `Syne` (bold geometric) OR keep `Instrument Serif`?
3. **Particle color** — Pure solar gold (#F59E0B) OR gradient (amber → warm white)?
4. **Phase 3 scope** — Do all 3 component upgrades, or prioritize just the calculator 3D panel?
5. **Cursor** — Sun-helix SVG cursor (solar themed) OR keep existing circle OR remove?