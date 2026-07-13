#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(root, 'references', 'motion-catalog.json');
const demoPath = path.join(root, 'assets', 'motion-atlas', 'index.html');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const demo = fs.readFileSync(demoPath, 'utf8');
const errors = [];

if (catalog.coreCount !== 12) errors.push(`coreCount must be 12, got ${catalog.coreCount}`);
if (catalog.motions.length !== 12) errors.push(`motions must contain 12 entries, got ${catalog.motions.length}`);

const ids = new Set();
catalog.motions.forEach((motion, index) => {
  if (motion.index !== index + 1) errors.push(`${motion.id}: index must be ${index + 1}`);
  if (ids.has(motion.id)) errors.push(`${motion.id}: duplicate id`);
  ids.add(motion.id);
  for (const key of ['name', 'zh', 'role', 'timing', 'reducedMotion']) {
    if (!motion[key]) errors.push(`${motion.id}: missing ${key}`);
  }
  if (!demo.includes(`\"id\":\"${motion.id}\"`)) errors.push(`${motion.id}: missing from demo catalog`);
});

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

console.log(`Validated ${catalog.motions.length} Core motions and the interactive demo.`);
