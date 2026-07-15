# 08 Line Drawing

## Canonical profile

~~~json recipe-profile
{
  "id": "line-drawing",
  "durationMs": 1700,
  "easing": "cubic-bezier(0.45, 0, 0.55, 1)",
  "engineEase": "power2.inOut",
  "node": {"durationMs": 350, "staggerMs": 380, "engineEase": "power3.out"},
  "completionDelayMs": 2100
}
~~~

## Why it fits

Use when the path, route, signal, or connection is the information. Decorative outlines should remain static.

## Reference implementation

~~~js
const length = path.getTotalLength();
path.style.strokeDasharray = String(length);
path.style.strokeDashoffset = String(length);
path.animate(
  [{strokeDashoffset: length}, {strokeDashoffset: 0}],
  {duration: 1700, easing: 'cubic-bezier(0.45, 0, 0.55, 1)', fill: 'both'}
);
nodes.forEach((node, index) => {
  node.animate(
    [{transform: 'scale(0)'}, {transform: 'scale(1)'}],
    {duration: 350, delay: index * 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both'}
  );
});
~~~

Set SVG transform origins explicitly. The path should lead the node arrivals.

## Reduced motion

Show the complete path immediately and use a short node opacity fade.

## Verification

- Path length is measured after the SVG is rendered.
- The line finishes exactly at zero dash offset.
- Node order follows the path's meaning.
- Multiple paths do not animate simultaneously without a clear hierarchy.
