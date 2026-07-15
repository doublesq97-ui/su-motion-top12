#!/usr/bin/env node

import fs from 'node:fs';
import {
  atlasPath,
  buildAtlasPayload,
  catalogPath,
  readJson,
  readRecipeProfiles,
  renderAtlasWithPayload,
} from './catalog.mjs';

const checkOnly = process.argv.includes('--check');
const catalog = readJson(catalogPath);
const profiles = readRecipeProfiles();
const atlas = fs.readFileSync(atlasPath, 'utf8');
const nextAtlas = renderAtlasWithPayload(atlas, buildAtlasPayload(catalog, profiles));

if (checkOnly) {
  if (nextAtlas !== atlas) {
    console.error('Motion Atlas data is stale. Run npm run build:atlas.');
    process.exit(1);
  }
  console.log('Motion Atlas data matches the catalog and recipe profiles.');
} else {
  fs.writeFileSync(atlasPath, nextAtlas);
  console.log('Updated the self-contained Motion Atlas data payload.');
}
