# 11 Parallax Depth

## Canonical profile

~~~json recipe-profile
{
  "id": "parallax-depth",
  "durationMs": 2400,
  "easing": "ease-in-out",
  "engineEase": "sine.inOut",
  "repeat": -1,
  "yoyo": true,
  "layers": {
    "foreground": {"xPx": 26, "yPx": -12},
    "background": {"xPx": -42, "yPx": 30},
    "subject": {"xPx": -12, "yPx": 9}
  },
  "completionDelayMs": 650
}
~~~

## Why it fits

Use only when foreground, subject, and background have a real spatial relationship. Copy must remain on the most stable layer.

## Reference implementation

~~~js
function drift(layer, x, y) {
  return layer.animate(
    [
      {transform: 'translate3d(0, 0, 0)'},
      {transform: 'translate3d(' + x + 'px, ' + y + 'px, 0)'}
    ],
    {duration: 2400, easing: 'ease-in-out', direction: 'alternate', iterations: Infinity}
  );
}
drift(foreground, 26, -12);
drift(background, -42, 30);
drift(subject, -12, 9);
~~~

Keep the subject movement smaller than the background difference. For pointer or scroll control, map bounded normalized progress to the same layer offsets.

## Reduced motion

Freeze every layer at its resting composition.

## Verification

- Copy stays readable and visually stable.
- Movement is bounded and does not change layout.
- Pointer leave or scroll stop returns to a coherent resting state.
- Large vestibular movement is avoided.
