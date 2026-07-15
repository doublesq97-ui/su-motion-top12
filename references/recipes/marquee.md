# 07 Marquee

## Canonical profile

~~~json recipe-profile
{
  "id": "marquee",
  "durationMs": 9000,
  "easing": "linear",
  "engineEase": "none",
  "primary": {"fromXpx": 0, "toXpx": -620},
  "reverse": {"fromXpx": -520, "toXpx": 0, "durationMs": 11000},
  "completionDelayMs": 650
}
~~~

## Why it fits

Use for repeated inventory, logos, tags, or brand rhythm. Essential reading must remain available outside the moving track.

## Reference implementation

~~~css
.marquee {
  overflow: hidden;
}
.marquee__track {
  display: flex;
  width: max-content;
  animation: su-marquee 9s linear infinite;
  will-change: transform;
}
@keyframes su-marquee {
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
    flex-wrap: wrap;
    width: auto;
  }
}
~~~

Duplicate the full content sequence exactly once. Measure the sequence and translate by one sequence width; the Atlas values correspond to its own measured tracks.

## Reduced motion

Use a static wrapped row or user-controlled horizontal scroll.

## Verification

- The seam is invisible at the loop boundary.
- Duplicate content is hidden from assistive technology.
- The track pauses or becomes controllable when reading is required.
- Only one marquee competes for attention in a viewport.
