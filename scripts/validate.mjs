#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(root, 'references', 'motion-catalog.json');
const demoPath = path.join(root, 'assets', 'motion-atlas', 'index.html');
const skillPath = path.join(root, 'SKILL.md');
const implementationPath = path.join(root, 'references', 'implementation-contract.md');
const videoAdapterPath = path.join(root, 'references', 'video-adapter.md');
const agentMetadataPath = path.join(root, 'agents', 'openai.yaml');
const packagePath = path.join(root, 'package.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const demo = fs.readFileSync(demoPath, 'utf8');
const skill = fs.readFileSync(skillPath, 'utf8');
const implementation = fs.readFileSync(implementationPath, 'utf8');
const videoAdapter = fs.readFileSync(videoAdapterPath, 'utf8');
const agentMetadata = fs.readFileSync(agentMetadataPath, 'utf8');
const packageMetadata = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const demoCatalogMatch = demo.match(/<script id="motion-catalog-json" type="application\/json">\s*([\s\S]*?)\s*<\/script>/);
const demoCatalog = demoCatalogMatch ? JSON.parse(demoCatalogMatch[1]) : [];
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

if (catalog.coreCount !== 12) errors.push(`coreCount must be 12, got ${catalog.coreCount}`);
if (catalog.motions.length !== 12) errors.push(`motions must contain 12 entries, got ${catalog.motions.length}`);
if (catalog.version !== packageMetadata.version) errors.push('catalog and package versions must match');
if (catalog.motions.map((motion) => motion.id).join(',') !== expectedOrder.join(',')) {
  errors.push('motions must preserve the curated common-first order');
}
if (demoCatalog.map((motion) => motion.id).join(',') !== expectedOrder.join(',')) {
  errors.push('demo catalog must match the curated common-first order');
}

const ids = new Set();
catalog.motions.forEach((motion, index) => {
  if (motion.index !== index + 1) errors.push(`${motion.id}: index must be ${index + 1}`);
  if (ids.has(motion.id)) errors.push(`${motion.id}: duplicate id`);
  ids.add(motion.id);
  for (const key of ['name', 'zh', 'role', 'timing', 'reducedMotion']) {
    if (!motion[key]) errors.push(`${motion.id}: missing ${key}`);
  }
  if (!demo.includes(`\"id\":\"${motion.id}\"`)) errors.push(`${motion.id}: missing from demo catalog`);
  if (!videoAdapter.includes(`| \`${motion.id}\` |`)) errors.push(`${motion.id}: missing from video adapter`);
});

for (const requirement of [
  ['skill', skill, 'references/video-adapter.md'],
  ['skill', skill, 'HyperFrames'],
  ['skill', skill, 'Remotion'],
  ['implementation contract', implementation, '## Web Routing'],
  ['implementation contract', implementation, '## Video Routing'],
  ['video adapter', videoAdapter, 'Translate Interaction Into Time'],
  ['video adapter', videoAdapter, 'seek-safe'],
  ['video adapter', videoAdapter, 'actual preview or render'],
  ['agent metadata', agentMetadata, 'web and video'],
]) {
  const [name, content, phrase] = requirement;
  if (!content.includes(phrase)) errors.push(`${name}: missing ${phrase}`);
}
if (skill.includes('This skill is for interactive web interfaces')) {
  errors.push('skill: legacy web-only scope remains');
}

if (!demo.includes('data-theme-option="system"')) errors.push('demo: missing system theme control');
if (!demo.includes('data-theme-option="light"')) errors.push('demo: missing light theme control');
if (!demo.includes('data-theme-option="dark"')) errors.push('demo: missing dark theme control');
if (!demo.includes('id="motionList"')) errors.push('demo: missing single Core 12 motion list');
if (!demo.includes('id="dockDescription"')) errors.push('demo: missing expanded motion detail content');
for (const legacyRail of ['topRail', 'leftRail', 'rightRail', 'mobileRail']) {
  if (demo.includes(legacyRail)) errors.push(`demo: legacy rail remains: ${legacyRail}`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${catalog.motions.length} Core motions, Web demo, and Video adapter.`);
