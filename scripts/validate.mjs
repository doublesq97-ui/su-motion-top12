#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {
  atlasPath,
  buildAtlasPayload,
  catalogPath,
  readJson,
  readRecipeProfiles,
  root,
} from './catalog.mjs';

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));
const catalog = readJson(catalogPath);
const packageMetadata = readJson(path.join(root, 'package.json'));
const profiles = readRecipeProfiles();
const atlas = fs.readFileSync(atlasPath, 'utf8');
const readme = read('README.md');
const readmeEnglish = read('README.en.md');
const skill = read('SKILL.md');
const implementation = read('references/implementation-contract.md');
const selectionGuide = read('references/selection-guide.md');
const videoAdapter = read('references/video-adapter.md');
const agentMetadata = read('agents/openai.yaml');
const pagesIndex = read('index.html');
const errors = [];
const expectedOrder = [
  'typewriter',
  'fade-blur',
  'directional-slide',
  'mask-reveal',
  'scroll-reveal',
  'shimmer-sweep',
  'marquee',
  'line-drawing',
  'number-ticker',
  'orbit-network',
  'parallax-depth',
  'float-levitate',
];

function fail(message) {
  errors.push(message);
}

function requireValue(object, key, label) {
  if (object[key] === undefined || object[key] === null || object[key] === '') {
    fail(label + ': missing ' + key);
  }
}

if (catalog.coreCount !== 12) fail('coreCount must be 12, got ' + catalog.coreCount);
if (!Array.isArray(catalog.motions) || catalog.motions.length !== 12) {
  fail('motions must contain exactly 12 entries');
}
if (catalog.version !== packageMetadata.version) fail('catalog and package versions must match');
if (packageMetadata.version !== '0.3.0') fail('release version must be 0.3.0');
if (Object.keys(packageMetadata.dependencies || {}).length) fail('runtime dependencies must remain empty');
if (catalog.motions.map((motion) => motion.id).join(',') !== expectedOrder.join(',')) {
  fail('motions must preserve the stable Core 12 order');
}

const ids = new Set();
for (const [index, motion] of catalog.motions.entries()) {
  const label = motion.id || 'motion-' + (index + 1);
  if (motion.index !== index + 1) fail(label + ': index must be ' + (index + 1));
  if (ids.has(motion.id)) fail(label + ': duplicate id');
  ids.add(motion.id);

  for (const key of ['id', 'name', 'zh', 'role', 'timing', 'reducedMotion', 'display']) {
    requireValue(motion, key, label);
  }
  for (const key of ['intent', 'triggers', 'useWhen', 'avoidWhen', 'properties', 'observedIn']) {
    if (!Array.isArray(motion[key]) || !motion[key].length) fail(label + ': ' + key + ' must be a non-empty array');
  }
  if (typeof motion.timing.durationMs !== 'number' || motion.timing.durationMs < 0) {
    fail(label + ': timing.durationMs must be a non-negative number');
  }
  requireValue(motion.timing, 'easing', label + '.timing');
  for (const key of ['category', 'timingLabel', 'easingLabel', 'sourceLabels', 'description']) {
    requireValue(motion.display, key, label + '.display');
  }
  if (!Array.isArray(motion.display.sourceLabels) || motion.display.sourceLabels.length !== motion.observedIn.length) {
    fail(label + ': display source labels must match observedIn count');
  }
  if (!selectionGuide.includes(motion.name)) fail(label + ': missing from selection guide');
  if (!videoAdapter.includes('| `' + motion.id + '` |')) fail(label + ': missing from video adapter');

  const recipe = profiles.get(motion.id);
  if (!recipe) {
    fail(label + ': missing implementation recipe');
    continue;
  }
  if (recipe.file !== motion.id + '.md') fail(label + ': recipe filename must match the motion id');
  if (recipe.profile.id !== motion.id) fail(label + ': recipe profile id mismatch');
  if (recipe.profile.durationMs !== motion.timing.durationMs) fail(label + ': recipe duration must match catalog timing');
  if (recipe.profile.easing !== motion.timing.easing) fail(label + ': recipe easing must match catalog timing');
  const expectedTimingValue = motion.id === 'typewriter' ? motion.timing.unitMs : motion.timing.durationMs;
  if (motion.id === 'orbit-network') {
    if (motion.display.timingLabel !== 'continuous') fail(label + ': continuous timing label is required');
  } else if (!motion.display.timingLabel.includes(String(expectedTimingValue))) {
    fail(label + ': display timing must expose the canonical timing value');
  }
  const displayEngineEase = recipe.profile.engineEase === 'none' ? 'linear' : recipe.profile.engineEase;
  if (displayEngineEase && !motion.display.easingLabel.includes(displayEngineEase)) {
    fail(label + ': display easing must expose the Atlas engine easing');
  }
  if (motion.id === 'typewriter' && recipe.profile.unitMs !== motion.timing.unitMs) {
    fail(label + ': recipe unitMs must match catalog timing');
  }
  if (motion.id === 'shimmer-sweep') {
    if (recipe.profile.delayMs !== motion.timing.delayMs) fail(label + ': recipe delay must match catalog timing');
    if (recipe.profile.repeatDelayMs !== motion.timing.repeatDelayMs) fail(label + ': recipe repeat delay must match catalog timing');
  }
  if (motion.id === 'scroll-reveal' && !motion.display.timingLabel.includes(String(recipe.profile.showcaseScene.durationMs))) {
    fail(label + ': display timing must name the showcase scene duration');
  }
  for (const heading of ['## Why it fits', '## Reference implementation', '## Reduced motion', '## Verification']) {
    if (!recipe.content.includes(heading)) fail(label + ': recipe missing ' + heading);
  }
}

if (profiles.size !== 12) fail('recipes must contain exactly 12 motion profiles');

const atlasMatch = atlas.match(/<script id="motion-catalog-json" type="application\/json">\s*([\s\S]*?)\s*<\/script>/);
if (!atlasMatch) {
  fail('atlas: missing generated data payload');
} else {
  try {
    const actualPayload = JSON.parse(atlasMatch[1]);
    const expectedPayload = buildAtlasPayload(catalog, profiles);
    if (JSON.stringify(actualPayload) !== JSON.stringify(expectedPayload)) {
      fail('atlas: generated payload does not match catalog and recipe profiles');
    }
  } catch (error) {
    fail('atlas: invalid generated JSON: ' + error.message);
  }
}

for (const [name, content, phrase] of [
  ['skill', skill, 'references/recipes/{id}.md'],
  ['skill', skill, 'references/video-adapter.md'],
  ['skill', skill, 'HyperFrames'],
  ['skill', skill, 'Remotion'],
  ['implementation contract', implementation, '## Quality Preservation Redlines'],
  ['implementation contract', implementation, 'Motion Atlas'],
  ['implementation contract', implementation, '## Web Routing'],
  ['implementation contract', implementation, '## Video Routing'],
  ['video adapter', videoAdapter, 'Translate Interaction Into Time'],
  ['video adapter', videoAdapter, 'seek-safe'],
  ['video adapter', videoAdapter, 'actual preview or render'],
  ['agent metadata', agentMetadata, 'web and video'],
  ['readme', readme, '[English](README.en.md)'],
  ['readme', readme, 'https://doublesq97-ui.github.io/su-motion-top12/'],
  ['readme', readme, '请将下述开源项目安装，并告知我如何使用调用：'],
  ['english readme', readmeEnglish, '[中文](README.md)'],
  ['english readme', readmeEnglish, '## Installation'],
]) {
  if (!content.includes(phrase)) fail(name + ': missing ' + phrase);
}

for (const requirement of [
  ['atlas', atlas, 'data-theme-option="system"'],
  ['atlas', atlas, 'data-theme-option="light"'],
  ['atlas', atlas, 'data-theme-option="dark"'],
  ['atlas', atlas, 'id="motionList"'],
  ['atlas', atlas, 'id="dockDescription"'],
  ['atlas', atlas, 'const id=item.id,p=item.profile'],
  ['atlas', atlas, "setupTypewriter(item.profile,true)"],
  ['atlas', atlas, "setupNetwork(item.profile,true)"],
  ['atlas', atlas, "if(!reducedMotion.matches)stage.animate"],
  ['pages', pagesIndex, 'assets/motion-atlas/'],
]) {
  if (!requirement[1].includes(requirement[2])) fail(requirement[0] + ': missing ' + requirement[2]);
}

for (const requiredFile of [
  '.github/workflows/validate.yml',
  'assets/motion-atlas/previews/showcase.gif',
  'README.en.md',
]) {
  if (!exists(requiredFile)) fail('missing required file: ' + requiredFile);
}

if (errors.length) {
  console.error(errors.map((error) => '- ' + error).join('\n'));
  process.exit(1);
}

console.log('Validated 12 Core motions, 12 recipes, generated Atlas parity, bilingual docs, and release safeguards.');
