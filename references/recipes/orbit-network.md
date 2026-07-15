# 10 Orbit Network

## Canonical profile

~~~json recipe-profile
{
  "id": "orbit-network",
  "durationMs": 0,
  "easing": "time-driven",
  "showcase": {
    "topology": "orbital-plane",
    "nodeCount": 26,
    "baseRadiusPx": 58,
    "radiusStepPx": 18,
    "radiusSteps": 7,
    "speedBase": 0.00012,
    "speedStep": 0.000018,
    "speedSteps": 5,
    "verticalScale": 0.62
  },
  "topologies": {
    "builtIn": ["orbital-plane", "clustered-regions", "spherical-shell"],
    "extensionMode": "strategy-registry",
    "clusteredRegions": {"clusterCount": 3, "clusterRadiusPx": 92, "localRadiusPx": 38},
    "sphericalShell": {"radiusPx": 124, "perspectivePx": 420, "rotationSpeed": 0.00008}
  },
  "connection": {"thresholdPx": 92},
  "render": {"maxDevicePixelRatio": 2},
  "completionDelayMs": 650
}
~~~

## Why it fits

Use for a living relationship field with clear hierarchy and restrained connections. The Atlas presents an `orbital-plane` example, not a fixed composition: the same motion can combine several regions, form clusters, or project nodes onto a spherical shell. It remains atmosphere, not a substitute for a readable diagram.

## Reference implementation

~~~js
const topologyStrategies = {
  'orbital-plane': positionOrbitalPlane,
  'clustered-regions': positionClusteredRegions,
  'spherical-shell': positionSphericalShell
};

function positionNode(profile, index, time, width, height) {
  const strategy = topologyStrategies[profile.showcase.topology];
  if (!strategy) throw new Error(`Unsupported network topology: ${profile.showcase.topology}`);
  return strategy({profile, index, time, width, height});
}

function positionOrbitalPlane({profile, index, time, width, height}) {
  const scene = profile.showcase;
  const angle = index / scene.nodeCount * Math.PI * 2;
  const radius = scene.baseRadiusPx + (index % scene.radiusSteps) * scene.radiusStepPx;
  const speed = scene.speedBase + (index % scene.speedSteps) * scene.speedStep;
  return {
    x: width / 2 + Math.cos(angle + time * speed) * radius,
    y: height / 2 + Math.sin(angle + time * speed) * radius * scene.verticalScale
  };
}

function positionClusteredRegions({profile, index, time, width, height}) {
  const scene = profile.showcase;
  const config = profile.topologies.clusteredRegions;
  const cluster = index % config.clusterCount;
  const order = Math.floor(index / config.clusterCount);
  const members = Math.ceil(scene.nodeCount / config.clusterCount);
  const clusterAngle = cluster / config.clusterCount * Math.PI * 2 + time * scene.speedBase * 0.28;
  const localAngle = order / members * Math.PI * 2 + time * scene.speedBase * (cluster % 2 ? -1 : 1);
  const centerX = width / 2 + Math.cos(clusterAngle) * config.clusterRadiusPx;
  const centerY = height / 2 + Math.sin(clusterAngle) * config.clusterRadiusPx * scene.verticalScale;
  return {
    x: centerX + Math.cos(localAngle) * config.localRadiusPx,
    y: centerY + Math.sin(localAngle) * config.localRadiusPx * scene.verticalScale
  };
}

function positionSphericalShell({profile, index, time, width, height}) {
  const scene = profile.showcase;
  const config = profile.topologies.sphericalShell;
  const phi = Math.acos(1 - 2 * (index + 0.5) / scene.nodeCount);
  const theta = index * Math.PI * (3 - Math.sqrt(5)) + time * config.rotationSpeed;
  const x = Math.sin(phi) * Math.cos(theta);
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.sin(theta);
  const projection = config.perspectivePx / (config.perspectivePx - z * config.radiusPx);
  return {
    x: width / 2 + x * config.radiusPx * projection,
    y: height / 2 + y * config.radiusPx * projection
  };
}
~~~

Keep each topology deterministic from `index + time`, then connect pairs below `connection.thresholdPx` and fade the line by distance. Add a new topology as a strategy rather than changing the Orbit Network identity. Cap canvas resolution at `render.maxDevicePixelRatio` and stop rendering when hidden.

## Reduced motion

Render one deterministic static frame for the selected topology. Keep its hierarchy intact.

## Verification

- Node generation is deterministic for the same time and index.
- Changing `showcase.topology` can select the planar, clustered, or spherical strategy without changing Motion ID 10.
- The canvas resizes without stretching.
- Rendering stops offscreen or when the component unmounts.
- The network never competes with primary reading content.
