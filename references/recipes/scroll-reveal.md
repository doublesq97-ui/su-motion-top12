# 05 Scroll Reveal

## Canonical profile

~~~json recipe-profile
{
  "id": "scroll-reveal",
  "durationMs": 780,
  "easing": "cubic-bezier(0.22, 1, 0.36, 1)",
  "engineEase": "power3.out",
  "staggerMs": 270,
  "from": {"opacity": 0.22, "scale": 0.97},
  "to": {"opacity": 1, "scale": 1},
  "showcaseScene": {"durationMs": 1800, "engineEase": "power2.inOut", "travelYpx": -138},
  "completionDelayMs": 2100
}
~~~

## Why it fits

Use viewport arrival to pace long-page reading. The 780ms value belongs to each revealed unit; the Atlas uses a deliberate 1800ms scene traversal to demonstrate several units together.

## Reference implementation

~~~js
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.animate(
      [{opacity: 0.22, transform: 'scale(.97)'}, {opacity: 1, transform: 'scale(1)'}],
      {duration: 780, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both'}
    );
    observer.unobserve(entry.target);
  }
}, {threshold: 0.18, rootMargin: '0px 0px -8% 0px'});
~~~

For a staged group, offset child starts by 270ms. Do not animate every icon, label, and divider.

## Reduced motion

Show all content in place. An optional short opacity crossfade is allowed.

## Verification

- Above-the-fold content is readable without waiting for intersection.
- Re-entering the viewport does not restart unexpectedly.
- The page has no horizontal overflow.
- The demo scene timing is never mistaken for one item's reveal duration.
