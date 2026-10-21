# Animation research → portfolio mapping

Original implementations inspired by (not copied from) these sites:

## Polpharma Biologics
- Cinematic large typography entrance → `SplitHeadline`
- Soft scroll section reveals → `FadeIn` / `Stagger`
- Full-height hero presence → home `min-h-[min(100svh,920px)]`

## GPG / DOPS Agency
- Orbital dots / circular loader → `Preloader`
- Rings + orbiting particles → `FloatingOrbs`
- Layered glow spheres → hero background blurs

## Webflow scroll snap
- Storytelling motion without forcing snap on every page
- Page route transitions → `PageTransition`
- Scroll progress line → `ScrollProgress`
- Staggered cards → `StaggerItem` hover lift

## Morpho Water
- Refined sticky nav + active indicator → Navbar `layoutId="nav-underline"`
- Ambient depth / pointer light → `CursorGlow`
- Magnetic CTA feel → `Magnetic`

All effects respect `prefers-reduced-motion`.
