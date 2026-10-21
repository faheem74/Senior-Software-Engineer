# Animation Research — Adopted Techniques

Researched: 2026-10-21  
Sources inspected:

- https://www.a1.gallery/websites/animated-portfolio
- https://www.a1.gallery/websites/animated-development (reference list)
- Prior high-end engineering portfolio patterns (dark hero, staggered cards, restrained motion)

## Techniques studied (gallery patterns)

1. **Hero entrance sequencing** — name/title/CTA fade-up with staggered delays.
2. **Scroll-triggered reveals** — sections animate once on enter; cards stagger.
3. **Project card hover** — soft lift, image scale, border glow (no aggressive rotation).
4. **Filter layout transitions** — category filters with layout animation.
5. **Scroll progress** — thin top progress bar for long pages.
6. **Mobile-first caveat** — hover is enhancement only; all CTAs work on touch.

## Adopted in this portfolio

| Technique | Implementation |
|-----------|----------------|
| Hero stagger | Framer Motion `FadeIn` on hero blocks |
| Section reveals | `FadeIn` / `Stagger` / `StaggerItem` |
| Project hover | `ProjectCard` translate + image scale + glow |
| Filter motion | `ProjectFilters` + `layout` on cards |
| Scroll progress | `ScrollProgress` component |
| Reduced motion | `useReducedMotion` + CSS media query |
| Chat panel motion | AnimatePresence open/close |

## Intentionally not adopted

- Heavy WebGL / Three.js backgrounds (performance risk).
- Custom cursor as primary UX (optional, disabled under reduced-motion).
- Horizontal pinned scroll sections (poor mobile UX for this content).
- Copying any third-party portfolio branding or unique artwork.

## Design goal

Sophisticated, memorable motion that communicates senior engineering quality without harming Core Web Vitals or accessibility.
