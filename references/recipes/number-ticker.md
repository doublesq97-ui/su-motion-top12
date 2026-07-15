# 09 Number Ticker

## Canonical profile

~~~json recipe-profile
{
  "id": "number-ticker",
  "durationMs": 1600,
  "easing": "cubic-bezier(0.22, 1, 0.36, 1)",
  "engineEase": "power3.out",
  "example": {"from": 0, "to": 84.7, "decimals": 1},
  "completionDelayMs": 2100
}
~~~

## Why it fits

Use only when the change itself matters and the value has a clear final state. Static facts should usually remain static.

## Reference implementation

~~~js
function tickNumber(node, from, to, decimals = 0) {
  const duration = 1600;
  const probe = document.createElement('span');
  const animation = probe.animate(
    [{opacity: 0}, {opacity: 1}],
    {duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both'}
  );
  const draw = () => {
    const progress = animation.effect.getComputedTiming().progress ?? 0;
    node.textContent = (from + (to - from) * progress).toFixed(decimals);
    if (animation.playState !== 'finished') requestAnimationFrame(draw);
    else node.textContent = to.toFixed(decimals);
  };
  draw();
  return animation;
}
~~~

Use tabular numerals and preserve separators, currency, signs, and units outside the interpolated numeric core.

## Reduced motion

Render the exact final value with an optional short opacity change.

## Verification

- The last frame equals the source value exactly.
- Decimal precision and locale formatting do not drift.
- Rapid updates retarget from the currently displayed value.
- The ticker does not run for an unimportant metric.
