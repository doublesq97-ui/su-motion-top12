import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const catalogPath = path.join(root, 'references', 'motion-catalog.json');
export const recipeDirectory = path.join(root, 'references', 'recipes');
export const atlasPath = path.join(root, 'assets', 'motion-atlas', 'index.html');

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function readRecipeProfiles() {
  const profiles = new Map();
  const files = fs.readdirSync(recipeDirectory)
    .filter((file) => file.endsWith('.md') && file !== 'README.md')
    .sort();

  for (const file of files) {
    const content = fs.readFileSync(path.join(recipeDirectory, file), 'utf8');
    const match = content.match(/~~~json recipe-profile\s*([\s\S]*?)\s*~~~/);
    if (!match) throw new Error(`${file}: missing json recipe-profile block`);
    const profile = JSON.parse(match[1]);
    if (profiles.has(profile.id)) throw new Error(`${file}: duplicate recipe id ${profile.id}`);
    profiles.set(profile.id, {file, content, profile});
  }

  return profiles;
}

export function buildAtlasPayload(catalog, profiles) {
  return catalog.motions.map((motion) => {
    const recipe = profiles.get(motion.id);
    if (!recipe) throw new Error(`Missing recipe for ${motion.id}`);

    const {display, ...canonical} = motion;
    return {
      id: motion.id,
      en: motion.name,
      zh: motion.zh,
      category: display.category,
      duration: display.timingLabel,
      easing: display.easingLabel,
      sources: display.sourceLabels,
      description: display.description,
      canonical,
      profile: recipe.profile,
    };
  });
}

export function renderAtlasWithPayload(atlas, payload) {
  const pattern = /(<script id="motion-catalog-json" type="application\/json">)\s*[\s\S]*?\s*(<\/script>)/;
  if (!pattern.test(atlas)) throw new Error('Atlas data script was not found');
  const compactPayload = '[\n' + payload.map((item) => '    ' + JSON.stringify(item)).join(',\n') + '\n  ]';
  return atlas.replace(pattern, `$1\n${compactPayload}\n  $2`);
}
