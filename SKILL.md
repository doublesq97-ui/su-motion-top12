---
name: su-motion-top12
description: Curated decision and implementation layer for refined interface motion. Use when a user wants to browse, choose, recommend, or apply common high-quality web motion patterns; when an AI-built website needs entrance, scroll, ambient, data, text, or surface-polish motion; or when motion code technically works but lacks clear selection, restraint, accessibility, or visual craft.
---

# SU Motion Top 12

Use a stable catalog of 12 interface-motion patterns to choose and implement motion without turning every project into an animation experiment.

## Route the Request

Classify the request into one mode:

- **Browse**: Present the Core 12 with compact descriptions.
- **Choose**: Show the visual atlas and let the user select.
- **Recommend**: Shortlist up to three patterns with concise tradeoffs.
- **Auto**: Select silently from the catalog when the user delegates the choice.
- **Apply**: Implement the selected pattern in the target project and verify it.

If the user names a pattern, honor that choice. Do not replace it with an automatic selection.

## Load the Right References

- Read [references/motion-catalog.json](references/motion-catalog.json) before listing, selecting, or applying a motion.
- Read [references/selection-guide.md](references/selection-guide.md) when recommending, auto-selecting, or combining patterns.
- Read [references/implementation-contract.md](references/implementation-contract.md) before producing or editing motion code.
- Use [assets/motion-atlas/index.html](assets/motion-atlas/index.html) when the user needs a visual catalog or interactive demonstration.

## Core Workflow

1. Inspect the target surface, interaction trigger, existing stack, and reduced-motion requirements.
2. Select one primary pattern from the catalog.
3. Add at most one supporting ambient or polish pattern when it materially improves hierarchy.
4. Preserve the project's existing animation stack. Prefer native CSS or Web Animations API when no animation library is already present.
5. Implement the smallest complete version that preserves timing, easing, spatial continuity, and interruption behavior.
6. Verify the resting frame, mid-motion frame, final frame, replay behavior, mobile layout, and reduced-motion fallback.
7. Return the finished artifact or code, selected pattern name, and editable parameters.

## Output Contract

Do not expose chain-of-thought, hidden comparison, or internal scoring. Return only:

- selected motion ID and name;
- concise fit statement when useful;
- editable timing and intensity parameters;
- working implementation or artifact;
- verification result.

## Scope Boundary

This skill is for interactive web interfaces. It is not an animation runtime and does not replace GSAP, Motion, CSS, Canvas, or WebGL.

For frame-driven React video rendering, use Remotion-specific tooling instead. A Remotion implementation may reproduce similar visual movement, but it does not provide the same event, hover, scroll, focus, or interruption semantics as a live interface.

## Quality Bar

- Prefer transform and opacity; avoid layout-triggering animation unless the behavior requires it.
- Use strong ease-out entrances and restrained continuous motion.
- Avoid decorative bounce without gesture momentum.
- Never run multiple attention-seeking loops on the same focal surface.
- Keep motion interruptible when users can directly manipulate the object.
- Respect `prefers-reduced-motion`, `prefers-reduced-transparency`, and contrast preferences.
- Treat light and dark themes as designed states, not automatic color inversion.
- Do not call a result complete without browser-level visual verification.
