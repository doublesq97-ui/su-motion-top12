# SU Motion Top 12

[中文](README.md) | **English**

An agent-ready motion atlas: choose, implement, and verify 12 common, refined motion patterns for live web interfaces and frame-driven video.

## Live Atlas

[Open the Motion Atlas →](https://doublesq97-ui.github.io/su-motion-top12/)

Select any motion to play, replay, and copy its canonical parameters. The Atlas supports System, Light, and Dark themes.

![01 Typewriter showcase](assets/motion-atlas/previews/showcase.gif?v=20260715-3)

## Installation

In Codex, send:

~~~text
Install the following open-source project and tell me how to invoke it:
https://github.com/doublesq97-ui/su-motion-top12
~~~

Manual installation:

~~~bash
git clone https://github.com/doublesq97-ui/su-motion-top12.git ~/.codex/skills/su-motion-top12
cd ~/.codex/skills/su-motion-top12 && npm run validate
~~~

Once installed, Codex can discover it as a local Skill; you do not need to provide the repository path again.

## Usage

~~~text
Use su-motion-top12 to choose and implement a restrained entrance for this product hero.
~~~

~~~text
Use 08 Line Drawing to turn this data flow into a replayable web motion.
~~~

~~~text
Use su-motion-top12 to choose and implement one primary motion for this 9:16 product video.
~~~

## One Skill, Two Delivery Paths

The user always invokes `su-motion-top12`:

- **Web** preserves mount, hover, scroll, pointer, theme, interruption, and reduced-motion semantics in the target project's existing stack.
- **Video** translates the selected motion into frames, shots, and timeline cues. HyperFrames is the default when no engine is specified; use Remotion when requested or already established by the project.

Core 12 owns selection, rhythm, composition, and craft. The target engine owns code, media, rendering, and export.

## Atlas Parity, With Room to Tune

Motion Atlas is an implementation reference that can be delivered as shown. Unless the user asks for a change, the agent uses the same canonical profile so timing, travel, stagger, light response, and fallbacks match the showcase.

A 1:1 baseline does not lock the parameters. Ask the agent in natural language to tune speed, travel or float amplitude, sweep coverage, scale, density, regions, or spatial topology. The agent preserves the motion's intent, visual hierarchy, and quality redlines while changing only the requested dimensions.

> Keep the overall character of 06 Shimmer Sweep, slow the pass by 15%, widen its coverage, and make the light response more restrained.

> Keep the hierarchy of 10 Orbit Network, replace the planar orbit with three connected regions, then explore a spherical projection.

SU Motion Top 12 is made for restrained, refined, legible motion with a clear sense of order—motion that supports the product instead of competing with its content.

## Why Only 12

Core 12 is a stable default set, not a capacity limit:

- high-frequency, reusable patterns with distinct communication roles;
- stable IDs and ordering;
- one primary motion, with at most one supporting ambient or polish motion;
- future experiments belong in Community or Lab Packs rather than diluting the default set.

Core 12 does not replace a complete gesture, sheet, shared-element, or component micro-interaction system.

## Core 12

| # | Motion | Primary use |
|---:|---|---|
| 01 | Typewriter | Live generation or system response |
| 02 | Fade & Blur | Soft, focused entrance |
| 03 | Directional Slide | Origin, direction, or navigation continuity |
| 04 | Mask Reveal | Editorial image, headline, or material reveal |
| 05 | Scroll Reveal | Long-page reading rhythm |
| 06 | Shimmer Sweep | Material, loading, or surface highlight |
| 07 | Marquee | Continuous brand, tag, or content flow |
| 08 | Line Drawing | Path, signal, and process relationships |
| 09 | Number Ticker | Meaningful metric change |
| 10 | Orbit Network | System relationships and technical atmosphere |
| 11 | Parallax Depth | Foreground/background spatial hierarchy |
| 12 | Float & Levitate | Restrained ambient breathing |

## Repository Map

- `assets/motion-atlas/index.html`: self-contained interactive visual atlas.
- `SKILL.md`: invocation, routing, workflow, and output contract.
- `references/motion-catalog.json`: machine-readable Core 12 catalog.
- `references/selection-guide.md`: public selection and composition rules.
- `references/implementation-contract.md`: Web and Video implementation and verification requirements.
- `references/video-adapter.md`: frame, shot, timeline, HyperFrames, and Remotion translation.
- `references/recipes/`: twelve on-demand implementation recipes; only the selected motion is loaded.
- `scripts/build-atlas.mjs`: generates the Atlas payload from the catalog and recipe profiles.

## v0.3.1 Craft Fixes

- **A complete 06 pass:** removes the duplicated starting translation, lets the light band enter, cross, and clear the full material, and lowers the peak light response.
- **Extensible 10 topology:** the Atlas keeps its planar showcase while the implementation can also render connected regions and a spherical shell without changing Motion 10's identity.
- **1:1 without hard locks:** canonical profiles remain the delivery defaults; requested parameters can be tuned while untouched structure and quality redlines stay stable.
- **Regression protection:** automated checks now cover Shimmer Sweep width and brightness limits, Orbit Network topology support, and Canvas resolution limits.

## What v0.3.0 Adds

- **Showcase-to-delivery parity:** Motion Atlas and Agent recipes use the same canonical profiles, including distance, timing, stagger, interruption, and reduced-motion values.
- **Intentional Motion/Scene timing:** one motion unit and a longer showcase scene are recorded separately instead of silently overwriting each other.
- **More reliable Apply mode:** every Core 12 motion has one focused, on-demand implementation recipe.
- **Automatic drift prevention:** `npm run check` verifies the catalog, recipes, generated Atlas data, bilingual docs, and release safeguards.
- **No quality trade:** Core 12 identity, Atlas material, themes, mobile layout, reduced motion, and self-contained HTML remain intact.

## Related Work

| Project | What it solves | Relationship to SU Motion Top 12 |
|---|---|---|
| HyperFrames | HTML-based video authoring, validation, and rendering | Default video execution engine; SU Motion owns selection and language |
| [Remotion](https://github.com/remotion-dev/remotion) | Frame-driven video in React | Used when requested or already established |
| [Remotion Skills](https://github.com/remotion-dev/skills) | Agent-readable Remotion authoring practice | Complementary execution knowledge |
| [Motion](https://motion.dev/) | JavaScript, React, and Vue animation runtime | One possible target-project engine |
| [GSAP](https://github.com/greensock/GSAP) | High-control web timelines and animation | One possible engine for orchestrated motion |

SU Motion Top 12 is a complementary decision and craft layer. It is not affiliated with or endorsed by HyperFrames, Remotion, Motion, GSAP, or their maintainers.

## Quality Model

- Curated, not exhaustive.
- Intent, triggers, anti-patterns, timing, easing, and accessibility metadata.
- One primary motion and at most one supporting motion.
- Browser-level verification for Web.
- Seek safety, representative frames, aspect-ratio safety, and actual preview/render verification for Video.

## License

Original code and documentation are MIT licensed. Fonts and external runtimes retain their own licenses; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
