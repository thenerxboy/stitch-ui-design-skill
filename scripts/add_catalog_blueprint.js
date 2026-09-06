/**
 * Safe Catalog Blueprint Extractor Helper Script
 * Parses, validates JSON syntax, and safely appends color-agnostic blueprints to design_catalog.json.
 */
const fs = require('fs');
const path = require('path');

const localCatalog = path.join(process.cwd(), 'design_catalog.json');
const skillCatalog = path.join(__dirname, '..', 'resources', 'design_catalog.json');
const catalogPath = fs.existsSync(localCatalog) ? localCatalog : skillCatalog;

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const newBlueprints = [
  {
    "id": "screen_or_component_id_v1",
    "title": "Descriptive Blueprint Title",
    "screen_type": "profile",
    "description": "Extracted visual layout blueprint description...",
    "viewport_target": "app_screen",
    "background": {
      "type": "solid_surface_background",
      "color_role": "surface_background"
    },
    "sections": [
      {
        "section_id": "header_section",
        "type": "compact_header",
        "title": "Section Title",
        "right_action_svg": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"...\"/></svg>"
      }
    ]
  }
];

newBlueprints.forEach(bp => {
  const cat = bp.screen_type;
  if (!catalog.screens[cat]) catalog.screens[cat] = [];
  const existingIdx = catalog.screens[cat].findIndex(item => item.id === bp.id);
  if (existingIdx >= 0) {
    catalog.screens[cat][existingIdx] = bp;
  } else {
    catalog.screens[cat].push(bp);
  }
});

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Successfully appended blueprints to ${catalogPath}!`);
