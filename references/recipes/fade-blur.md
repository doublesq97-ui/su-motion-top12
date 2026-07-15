# 02 Fade & Blur

## Canonical profile

~~~json recipe-profile
{
  "id": "fade-blur",
  "durationMs": 900,
  "easing": "cubic-bezier(0.22, 1, 0.36, 1)",
  "engineEase": "power3.out",
  "staggerMs": 130,
  "from": {"translateYPercent": 110, "opacity": 0, "blurPx": 14},
  "to": {"translateYPercent": 0, "opacity": 1, "blurPx": 0},
  "completionDelayMs": 2100
}
~~~

## Why it fits

Use for a hero line or primary object that should gain focus without implying left/right navigation.

## Reference implementation

~~~js
const motion = element.animate(
  [
    {transform: 'translateY(110%)', opacity: 0, filter: 'blur(14px)'},
    {transform: 'translateY(0)', opacity: 1, filter: 'blur(0)'}
  ],
  {duration: 900, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both'}
);
~~~

For multiple wrapped lines, start each line 130ms after the previous one. Keep overflow clipping on the line wrapper, not on the whole section.

## Reduced motion

Use a 180ms opacity crossfade with no blur or translation.

## Verification

- Text is sharp and exactly at rest on completion.
- Wrapped lines do not clip ascenders or descenders.
- Replay cancels or replaces the active animation.
- The first readable frame is not delayed by unrelated decoration.
