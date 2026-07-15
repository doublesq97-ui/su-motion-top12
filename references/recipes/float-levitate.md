# 12 Float & Levitate

## Canonical profile

~~~json recipe-profile
{
  "id": "float-levitate",
  "durationMs": 3200,
  "easing": "ease-in-out",
  "engineEase": "sine.inOut",
  "core": {"fromYpx": 12, "toYpx": -12, "fromRotateDeg": -2, "toRotateDeg": 2},
  "chips": {
    "baseDurationMs": 3200,
    "durationStepMs": 350,
    "offsets": [
      {"xPx": -5, "yPx": 9},
      {"xPx": 8, "yPx": -10},
      {"xPx": -5, "yPx": 9}
    ],
    "staggerMs": 200
  },
  "completionDelayMs": 650
}
~~~

## Why it fits

Use slow breathing motion on one or two nonessential product or decorative objects. Text and controls should stay still.

## Reference implementation

~~~js
core.animate(
  [
    {transform: 'translateY(12px) rotate(-2deg)'},
    {transform: 'translateY(-12px) rotate(2deg)'}
  ],
  {duration: 3200, easing: 'ease-in-out', direction: 'alternate', iterations: Infinity}
);
~~~

Offset supporting objects in duration and phase; do not give every object an independent random loop.

## Reduced motion

Keep all objects at their resting positions.

## Verification

- The composition remains attractive in a frozen frame.
- Only nonessential objects move.
- Loop boundaries are invisible.
- Multiple ambient loops do not compete in one focal region.
