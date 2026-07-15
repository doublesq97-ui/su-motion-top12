# Implementation Recipes

Each Core 12 motion has one canonical recipe. Load only the selected motion's file after selection and before implementation.

The json recipe-profile block is executable project data:

- Motion Atlas reads it at build time.
- Validation checks it against motion-catalog.json.
- Agents use the same values when implementing the motion.

The catalog owns intent and canonical timing. A recipe owns the concrete movement profile. Scene-level timing may be longer than one motion unit only when the recipe names both values explicitly.

Do not load every recipe for one task. Do not translate these recipes into a framework matrix; preserve the target project's existing stack.
