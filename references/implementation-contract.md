# Implementation Contract

## Stack Routing

- Reuse the target project's animation library when one is already established.
- Default to CSS and the Web Animations API for simple entrances, loops, and surface polish.
- Use GSAP for orchestrated timelines or an existing GSAP codebase.
- Use Motion for an existing Motion/React/Vue codebase or gesture-heavy interaction.
- Use Canvas for Orbit Network when DOM nodes would be excessive.
- Use Remotion only when the requested deliverable is a frame-driven rendered video.

## Motion Requirements

- Animate transform and opacity by default.
- Start interactive feedback on pointer down.
- Cancel or retarget active motion when the user selects another pattern.
- Enter and exit along symmetric spatial paths.
- Avoid bounce unless momentum or a physical gesture justifies it.
- Keep continuous motion slower than first-arrival motion.

## Theme Requirements

- Support `system`, `light`, and `dark` preferences when the artifact includes theme controls.
- Persist explicit theme choice and listen for system changes in system mode.
- Design dark mode as a separate material state; do not invert colors mechanically.
- Avoid abrupt full-viewport brightness changes during theme transitions.

## Accessibility

- Replace translation, parallax, and looping movement with static states or short crossfades under `prefers-reduced-motion`.
- Provide solid material fallbacks under `prefers-reduced-transparency`.
- Maintain visible focus, readable contrast, semantic buttons, and keyboard navigation.

## Verification

Check:

1. first resting frame;
2. mid-motion frame;
3. final frame;
4. replay and rapid switching;
5. desktop and mobile viewports;
6. light, dark, and system themes;
7. reduced-motion behavior;
8. console errors and horizontal overflow.
