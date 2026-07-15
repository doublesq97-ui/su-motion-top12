# 10 Orbit Network

## Canonical profile

~~~json recipe-profile
{
  "id": "orbit-network",
  "durationMs": 0,
  "easing": "time-driven",
  "nodeCount": 26,
  "baseRadiusPx": 58,
  "radiusStepPx": 18,
  "radiusSteps": 7,
  "speedBase": 0.00012,
  "speedStep": 0.000018,
  "speedSteps": 5,
  "connectionThresholdPx": 92,
  "maxDevicePixelRatio": 2,
  "completionDelayMs": 650
}
~~~

## Why it fits

Use for a living system map with one clear center and restrained relationships. It is atmosphere, not a substitute for a readable diagram.

## Reference implementation

~~~js
function positionNode(node, index, time, width, height) {
  const angle = index / 26 * Math.PI * 2;
  const radius = 58 + (index % 7) * 18;
  const speed = 0.00012 + (index % 5) * 0.000018;
  return {
    x: width / 2 + Math.cos(angle + time * speed) * radius,
    y: height / 2 + Math.sin(angle + time * speed) * radius * 0.62
  };
}
~~~

Connect pairs only below 92px and fade the line by distance. Cap canvas resolution at device pixel ratio 2 and stop rendering when hidden.

## Reduced motion

Render one deterministic static frame. Keep the system center and hierarchy intact.

## Verification

- Node generation is deterministic for the same time and index.
- The canvas resizes without stretching.
- Rendering stops offscreen or when the component unmounts.
- The network never competes with primary reading content.
