# Implementation Contract

## Medium Routing

- Treat `motion-catalog.json` as the single source of truth for Core 12 identity, intent, default timing, combinations, and restraint.
- Choose the medium before the runtime: Web for live interaction; Video for frame-driven composition or rendered output.
- Reuse the target project's established animation or video stack.
- Do not duplicate the Core 12 into framework-specific catalogs.

## Quality Preservation Redlines

- Keep the Core 12 IDs, order, intent, and one-primary-plus-one-supporting composition rule stable.
- Treat `motion-catalog.json` as the selection and timing source of truth. Treat the selected recipe profile as the concrete movement source of truth.
- Generate the self-contained Motion Atlas payload from the catalog and recipe profiles. Do not hand-maintain a second set of overlapping parameters.
- Make the delivered motion match the Motion Atlas profile. If a showcase scene is longer than one motion unit, name both timings explicitly instead of silently replacing the canonical duration.
- Preserve the Atlas visual material, interaction behavior, System/Light/Dark themes, mobile layout, and reduced-motion behavior unless a reviewed change improves them.
- Load only the selected recipe in Apply mode. More implementation detail must not make the default skill slower, noisier, or less decisive.
- Keep the repository free of runtime package dependencies. Prefer the target project's existing stack and the self-contained Atlas.
- Do not release a change that passes static validation but regresses browser behavior, visual hierarchy, interruption, accessibility, or frame determinism.

## Web Routing

- Default to CSS and the Web Animations API for simple entrances, loops, and surface polish.
- Use GSAP for orchestrated timelines or an existing GSAP codebase.
- Use Motion for an existing Motion/React/Vue codebase or gesture-heavy interaction.
- Use Canvas or WebGL only when the visual system needs them.
- Preserve semantic triggers such as mount, viewport, scroll, navigation, hover, pointer, focus, and data state.

## Video Routing

- Read `video-adapter.md` before implementing any rendered video or motion graphic.
- Use HyperFrames by default for video authoring and rendering unless the user names another framework or an existing project establishes one.
- Follow `/hyperframes` intent routing, then its composition, animation, keyframe, creative, media, and CLI contracts on demand.
- Use Remotion when explicitly requested or when modifying an existing Remotion project.
- Convert browser triggers into timeline cues, camera relationships, shot transitions, or authored emphasis beats.
- Keep all animation seek-safe and deterministic at arbitrary frames.

## Shared Motion Requirements

- Animate transform and opacity by default.
- Preserve the semantic direction, hierarchy, and final resting state.
- Avoid bounce unless momentum or a physical gesture justifies it.
- Keep continuous motion slower and quieter than first-arrival motion.
- Use one primary motion and at most one supporting ambient or polish motion per focal region.
- Preserve exact final values for numbers, paths, text, and state transitions.

## Web Requirements

- Start direct feedback on pointer down when appropriate.
- Cancel or retarget active motion when the user changes state.
- Enter and exit along coherent spatial paths.
- Support `system`, `light`, and `dark` preferences when theme controls exist.
- Persist explicit theme choice and listen for system changes in system mode.
- Design dark mode as a separate material state; do not invert colors mechanically.

## Web Accessibility

- Replace translation, parallax, and looping movement with static states or short crossfades under `prefers-reduced-motion`.
- Provide solid material fallbacks under `prefers-reduced-transparency`.
- Maintain visible focus, readable contrast, semantic controls, keyboard navigation, and stable layout.

## Video Requirements

- Read FPS, aspect ratio, duration, narration, music, and shot boundaries from the target composition.
- Convert catalog timing into frames without fixing the project to one FPS.
- Use deterministic frame progress instead of wall-clock timers or uncontrolled animation loops.
- Keep essential copy inside the target format's safe area.
- Let narration, music, and edit beats override decorative timing when they conflict.

## Verification

For Web, check:

1. first resting frame, mid-motion frame, and final frame;
2. replay, interruption, and rapid switching;
3. desktop and mobile viewports;
4. light, dark, and system themes when present;
5. reduced-motion and reduced-transparency behavior;
6. console errors, keyboard access, and horizontal overflow.

For Video, check:

1. first, representative middle, and final frames;
2. arbitrary seek positions and replay determinism;
3. exact final values and loop seams;
4. aspect-ratio safety and asset resolution;
5. engine lint/validation output;
6. an actual preview or render appropriate to the requested deliverable.
