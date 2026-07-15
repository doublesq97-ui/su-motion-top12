# 03 Directional Slide

## Canonical profile

~~~json recipe-profile
{
  "id": "directional-slide",
  "durationMs": 760,
  "easing": "cubic-bezier(0.16, 1, 0.3, 1)",
  "engineEase": "power4.out",
  "distancePx": 90,
  "staggerMs": 100,
  "alternate": true,
  "from": {"opacity": 0, "blurPx": 8},
  "to": {"opacity": 1, "blurPx": 0},
  "completionDelayMs": 2100
}
~~~

## Why it fits

Direction must explain origin, destination, previous/next order, or opposing sides. If direction has no meaning, use Fade & Blur.

## Reference implementation

~~~js
function slideIn(element, direction = 1) {
  return element.animate(
    [
      {transform: 'translateX(' + (direction * 90) + 'px)', opacity: 0, filter: 'blur(8px)'},
      {transform: 'translateX(0)', opacity: 1, filter: 'blur(0)'}
    ],
    {duration: 760, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both'}
  );
}
~~~

Alternate directions only when the content relationship supports it. Stagger related cards by 100ms.

## Reduced motion

Use a short opacity crossfade and preserve the final spatial order.

## Verification

- Direction matches navigation or content meaning.
- Exit and re-entry follow coherent paths.
- Rapid switching retargets rather than stacking animations.
- Large full-screen surfaces do not travel the full 90px.
