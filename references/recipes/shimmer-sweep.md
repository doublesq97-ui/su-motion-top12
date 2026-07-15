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
  "sweep": {"fromXPercent": -230, "toXPercent": 690},
  "surface": {"peakBrightness": 1.12, "pulseDurationMs": 180},
  "completionDelayMs": 650
}
~~~

## Why it fits

Use one narrow specular pass to communicate material or loading. The bright core should be visible; the whole surface should not flash.

## Reference implementation

~~~js
surface.animate(
  [
    {transform: 'translateY(14px)', opacity: 0, filter: 'brightness(.9)'},
    {transform: 'translateY(0)', opacity: 1, filter: 'brightness(1)'}
  ],
  {duration: 540, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both'}
);
sweep.animate(
  [{transform: 'translateX(-230%)'}, {transform: 'translateX(690%)'}],
  {duration: 900, delay: 160, easing: 'cubic-bezier(0.45, 0, 0.55, 1)'}
);
~~~

Repeat only when the state remains active, with at least 1400ms of rest between passes.

## Reduced motion

Use a static edge or material highlight. Do not move the specular band.

## Verification

- Only one surface sweeps in the focal region.
- The moving band has one restrained bright core.
- The loop stops when the surface leaves or the state ends.
- Text contrast remains readable at peak brightness.
