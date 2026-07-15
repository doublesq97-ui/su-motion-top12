# 04 Mask Reveal

## Canonical profile

~~~json recipe-profile
{
  "id": "mask-reveal",
  "durationMs": 1100,
  "easing": "cubic-bezier(0.19, 1, 0.22, 1)",
  "engineEase": "expo.out",
  "mask": {"fromScaleX": 1, "toScaleX": 0, "origin": "right center"},
  "subject": {"durationMs": 900, "delayMs": 180, "fromYpx": 30, "fromOpacity": 0},
  "completionDelayMs": 2100
}
~~~

## Why it fits

Use when the subject should remain compositionally stable while a covering surface, clip, or matte reveals it.

## Reference implementation

~~~js
const maskMotion = mask.animate(
  [{transform: 'scaleX(1)'}, {transform: 'scaleX(0)'}],
  {duration: 1100, easing: 'cubic-bezier(0.19, 1, 0.22, 1)', fill: 'both'}
);
mask.style.transformOrigin = 'right center';
subject.animate(
  [{transform: 'translateY(30px)', opacity: 0}, {transform: 'translateY(0)', opacity: 1}],
  {duration: 900, delay: 180, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both'}
);
~~~

The mask owns the reveal. The subject may settle subtly but must not drift with the covering surface.

## Reduced motion

Remove the mask immediately and use a 180ms opacity crossfade.

## Verification

- Layout does not move while the mask opens.
- The transform origin matches the intended reveal direction.
- Essential copy is never trapped behind an idle mask.
- Final mask and subject values are exact.
