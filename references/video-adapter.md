# Video Adapter

Use this adapter after selecting a pattern from `motion-catalog.json` when the requested deliverable is a rendered video, motion graphic, title card, overlay, or frame-driven composition.

The Core 12 remain the source of truth for motion intent and taste. This adapter translates that intent into video time, frames, camera relationships, and render verification. It does not duplicate the catalog and it is not a video runtime.

## Engine Routing

- Use HyperFrames by default for authored and rendered video unless the user names another framework or the project already has an established video stack.
- For HyperFrames, read `/hyperframes` first, let its intent router choose the workflow, then load `/hyperframes-core` before authoring composition HTML. Load `/hyperframes-animation`, `/hyperframes-keyframes`, `/hyperframes-creative`, and `/hyperframes-cli` only when the chosen workflow needs them.
- Use Remotion when the user explicitly requests Remotion or the target is an existing Remotion project. Keep animation values deterministic functions of the current frame.
- For another existing video framework, preserve that stack and apply the same cue, timing, composition, and verification rules.
- If the required video workflow is unavailable, report the missing capability and its installation path instead of silently substituting an unrelated runtime.

SU Motion Top 12 chooses the motion language. The selected video engine owns composition authoring, media, audio, rendering, and export.

## Translate Interaction Into Time

Do not reproduce browser events literally inside a rendered video. Translate their meaning:

| Web trigger | Video cue |
|---|---|
| `mount` | Scene or shot entrance |
| `viewport` | The frame where the subject first becomes visible |
| `scroll` | A bounded timeline segment, camera move, or layer progression |
| `hover` | An authored emphasis beat or material response |
| `pointer` | A directed camera/object response written into the timeline |
| `navigation` | Shot, chapter, panel, or state transition |
| `data update` | A timed value or chart change |
| `idle` | A restrained ambient loop |
| `system response` | A timed response beat after the initiating action |

## Timing Conversion

- Read FPS, duration, and aspect ratio from the target project. Do not assume a fixed frame rate when one already exists.
- Convert milliseconds with `frames = round(milliseconds / 1000 * fps)`.
- Keep the catalog duration as a starting point, then adjust to narration, music, shot length, and edit rhythm.
- Preserve the catalog easing character. Use seek-safe keyframes, frame interpolation, or deterministic time functions.
- Never use wall-clock timers, `setInterval`, uncontrolled `requestAnimationFrame`, or browser-only event state in a rendered composition.
- Default to 16:9. Use 9:16 only for a named vertical destination or explicit request; respect an existing project format.

## Core 12 Video Map

| ID | Video role | Default implementation cue |
|---|---|---|
| `typewriter` | Generated response, kinetic statement, title build | Reveal characters from frame progress with a seek-safe caret; never depend on a live timer. |
| `fade-blur` | Soft shot or subject entrance | Resolve opacity, small translation, and blur into the resting frame. |
| `directional-slide` | State, panel, or chapter continuity | Enter from a direction that explains the previous/next spatial relationship. |
| `mask-reveal` | Editorial image, headline, or product reveal | Animate a clip, mask, matte, or covering surface while the subject remains compositionally stable. |
| `scroll-reveal` | Page journey, stacked story, or progressive scene | Convert scroll progress into a finite camera/layer timeline; do not simulate a user scroll event. |
| `shimmer-sweep` | Material highlight, loading beat, premium surface cue | Move a narrow specular band across the surface with one visible core and a restrained brightness response. |
| `marquee` | Brand rhythm, credits, inventory, or continuous information | Use a seamless time-based track with enough duplicated content to avoid a visible seam. |
| `line-drawing` | Route, connection, process, or signal explanation | Drive SVG stroke progress or a seek-safe path reveal from frame time. |
| `number-ticker` | Metric reveal, achievement, or comparison | Interpolate the numeric value from frame progress and finish on an exact, stable value. |
| `orbit-network` | System map, relationship field, or technical atmosphere | Select a planar, clustered, spherical, or project-specific topology; derive every node and connection from composition time so any seek position stays deterministic. |
| `parallax-depth` | Camera depth, layer separation, or dimensional product scene | Move foreground, subject, and background at different rates with a clear focal hierarchy. |
| `float-levitate` | Quiet product atmosphere or weightless ambient motion | Use slow deterministic oscillation on one or two nonessential objects; keep copy stable. |

## Composition Rules

1. Select one primary Core 12 pattern for the shot or scene.
2. Add at most one supporting ambient or polish pattern.
3. Treat narration, music, and edit beats as timing authorities when present.
4. Keep the resting composition legible without motion.
5. Do not stack two attention-seeking loops in the same focal region.
6. Do not turn every scene into a different motion sample; preserve a coherent motion language across the piece.

## Video Output Contract

Return:

- selected motion ID and name;
- target medium and video engine;
- FPS, aspect ratio, duration, and editable timing/intensity parameters;
- working composition or rendered artifact as requested;
- verification result and output location.

Do not expose hidden scoring or chain-of-thought. Do not claim a render exists until the engine has produced and verified it.

## Video Verification

Check:

1. first frame and resting composition;
2. representative mid-motion frames;
3. final frame and exact final values;
4. arbitrary seek positions and replay determinism;
5. aspect-ratio safety and text margins;
6. media, font, and asset resolution;
7. transition continuity and loop seams;
8. engine validation/lint output;
9. an actual preview or render appropriate to the requested deliverable.
