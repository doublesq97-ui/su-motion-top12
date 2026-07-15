# 06 Shimmer Sweep

## Canonical profile

~~~json recipe-profile
{
  "id": "shimmer-sweep",
  "durationMs": 900,
  "easing": "cubic-bezier(0.45, 0, 0.55, 1)",
  "engineEase": "power2.inOut",
  "delayMs": 160,
  "repeatDelayMs": 1400,
  "entrance": {"durationMs": 540, "fromYpx": 14, "fromOpacity": 0, "fromBrightness": 0.9},
  "sweep": {"leftPercent": -45, "widthPercent": 34, "fromXPercent": 0, "toXPercent": 460, "skewDeg": -14, "opacity": 0.72},
  "surface": {"peakBrightness": 1.045, "peakBorderAlpha": 0.18, "pulseDurationMs": 220},
  "completionDelayMs": 650
}
~~~

## Why it fits

Use one soft specular pass to communicate material or loading. The highlight needs enough width and travel to cross the full surface, while its core stays restrained enough that the whole card never flashes.

## Reference implementation

~~~js
surface.animate(
  [
    {transform: 'translateY(14px)', opacity: 0, filter: 'brightness(.9)'},
    {transform: 'translateY(0)', opacity: 1, filter: 'brightness(1)'}
  ],
  {duration: 540, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both'}
);
Object.assign(sweep.style, {
  left: '-45%',
  width: '34%',
  opacity: '.72'
});
sweep.animate(
  [
    {transform: 'translateX(0) skewX(-14deg)'},
    {transform: 'translateX(460%) skewX(-14deg)'}
  ],
  {duration: 900, delay: 160, easing: 'cubic-bezier(0.45, 0, 0.55, 1)'}
);
surface.animate(
  [
    {filter: 'brightness(1)', borderColor: 'rgba(255,255,255,.12)'},
    {filter: 'brightness(1.045)', borderColor: 'rgba(255,255,255,.18)'},
    {filter: 'brightness(1)', borderColor: 'rgba(255,255,255,.12)'}
  ],
  {duration: 440, delay: 460, easing: 'ease-in-out'}
);
~~~

Repeat only when the state remains active, with at least 1400ms of rest between passes.

## Reduced motion

Use a static edge or material highlight. Do not move the specular band.

## Verification

- Only one surface sweeps in the focal region.
- The band begins fully outside one edge and clears the opposite edge; most of the 900ms pass is visible on the material.
- The moving band has one restrained bright core and the surface stays at or below `brightness(1.045)`.
- The loop stops when the surface leaves or the state ends.
- Text contrast remains readable at peak brightness.
