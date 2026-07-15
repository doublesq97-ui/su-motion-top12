---
name: su-motion-top12
description: Curated decision and implementation layer for refined motion across web interfaces and frame-driven video. Use when a user wants to browse, choose, recommend, or apply common high-quality motion patterns; when an AI-built website, HyperFrames composition, Remotion project, motion graphic, or rendered video needs entrance, scroll/progression, ambient, data, text, or surface-polish motion; or when motion technically works but lacks clear selection, restraint, accessibility, composition, or visual craft.
---

# SU Motion Top 12

Use a stable catalog of 12 motion patterns to choose and implement motion without turning every web or video project into an animation experiment.

## Route the Medium

Determine the delivery medium before selecting an implementation:

- **Web**: live interface behavior driven by mount, viewport, scroll, navigation, hover, pointer, focus, or data state.
- **Video**: frame-driven composition or rendered output driven by timeline, shot, narration, music, camera, or edit beats.
- **Catalog only**: browsing, comparison, or recommendation without implementation.

Infer the medium from the target project, requested artifact, and named stack. Ask only when no evidence exists and the choice would change the deliverable.

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
- After selecting a motion in Apply mode, read only its `references/recipes/{id}.md` file. The recipe profile is the same profile used by Motion Atlas; do not load all 12 recipes.
- Read [references/video-adapter.md](references/video-adapter.md) before implementing any video, motion graphic, HyperFrames, or Remotion deliverable.
- Use [assets/motion-atlas/index.html](assets/motion-atlas/index.html) when the user needs a visual catalog or interactive demonstration.

## Core Workflow

1. Inspect the target medium, subject, trigger or timeline cue, existing stack, and output requirements.
2. Select one primary pattern from the catalog.
3. Add at most one supporting ambient or polish pattern when it materially improves hierarchy.
4. Preserve the project's existing animation stack. For Web, prefer native CSS or Web Animations API when no animation library is already present. For Video, route through the selected video engine and its own authoring workflow.
5. Implement the smallest complete version that preserves timing, easing, and spatial continuity, plus interruption behavior for Web or seek behavior for Video.
6. Match the selected recipe's canonical profile. When the user expects the Atlas look, preserve its movement values and named scene-level timing rather than substituting a generic animation.
7. Apply the medium-specific verification contract: browser interaction and accessibility for Web; seek safety, representative frames, aspect ratio, and actual preview/render for Video.
8. Return the finished artifact or code, selected pattern name, and editable parameters.

## Output Contract

Do not expose chain-of-thought, hidden comparison, or internal scoring. Return only:

- selected motion ID and name;
- target medium and implementation engine;
- concise fit statement when useful;
- editable timing and intensity parameters;
- working implementation or artifact;
- verification result.

## Scope Boundary

This skill is a cross-media motion decision and craft layer. It is not an animation or rendering runtime.

- For Web, route implementation through the target project's CSS, Web Animations API, GSAP, Motion, Canvas, WebGL, or existing stack.
- For Video, use HyperFrames by default unless the user names another framework or an existing project establishes one. Follow `/hyperframes` routing rather than guessing a workflow.
- Use Remotion when the user explicitly requests it or the target is an existing Remotion project.
- Translate interaction meaning into video time; do not reproduce hover, pointer, viewport, or scroll events literally in a rendered composition.
- Core 12 does not replace a complete gesture, sheet, shared-layout, or component micro-interaction system.

## Quality Bar

- Prefer transform and opacity; avoid layout-triggering animation unless the behavior requires it.
- Use strong ease-out entrances and restrained continuous motion.
- Avoid decorative bounce without gesture momentum.
- Never run multiple attention-seeking loops on the same focal surface.
- For Web, keep direct manipulation interruptible; respect reduced-motion, reduced-transparency, contrast, input, and theme preferences.
- For Video, keep motion deterministic at arbitrary frames; respect aspect-ratio safety, edit rhythm, exact final values, and loop seams.
- Do not call a Web result complete without browser-level verification.
- Do not call a Video result complete without engine validation and an actual preview or render appropriate to the requested deliverable.
