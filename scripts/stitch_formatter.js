/**
 * Stitch Prompt Formatter & Color Token Compiler
 * 
 * Usage:
 *   node scripts/stitch_formatter.js [category] [id] [--theme=theme_name] [--app_domain="Target App"]
 * 
 * Examples:
 *   node .agents/skills/stitch-ui-skill/scripts/stitch_formatter.js home home_personalized_greeting_mood_tracker_grid --app_domain="To-Do App"
 */

const fs = require('fs');
const path = require('path');

const localCatalog = path.join(process.cwd(), 'design_catalog.json');
const skillCatalog = path.join(__dirname, '..', 'resources', 'design_catalog.json');
const CATALOG_PATH = fs.existsSync(localCatalog) ? localCatalog : skillCatalog;
const THEME_PATH = path.join(process.cwd(), 'app_theme.json');

function loadJSON(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at ${filePath}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function applyAppThemeToSpec(specObj, colorTokens) {
  if (!specObj || typeof specObj !== 'object') return specObj;

  if (Array.isArray(specObj)) {
    return specObj.map(item => applyAppThemeToSpec(item, colorTokens));
  }

  const result = {};
  for (const [key, value] of Object.entries(specObj)) {
    if (typeof value === 'object' && value !== null) {
      result[key] = applyAppThemeToSpec(value, colorTokens);
    } else if (typeof value === 'string' && colorTokens[value]) {
      result[key] = `${colorTokens[value]} /* role: ${value} */`;
    } else {
      result[key] = value;
    }
  }

  if (specObj.color_role && colorTokens[specObj.color_role]) {
    result.resolved_hex_color = colorTokens[specObj.color_role];
  }

  return result;
}

function generateStitchPrompt(spec, themeConfig, activeThemeKey, appDomain) {
  const activeTheme = themeConfig.themes[activeThemeKey] || themeConfig.themes[themeConfig.active_theme];
  const colorTokens = activeTheme.color_tokens;
  const themeInjectedSpec = applyAppThemeToSpec(spec, colorTokens);

  let lockedNav = null;
  if (themeConfig.locked_navigation_bar) {
    const rawNav = JSON.parse(JSON.stringify(themeConfig.locked_navigation_bar));
    const currentCategory = (spec.screen_type || '').toLowerCase();
    if (rawNav.tabs && Array.isArray(rawNav.tabs)) {
      rawNav.tabs = rawNav.tabs.map(tab => ({
        ...tab,
        active_state: tab.tab_id.toLowerCase() === currentCategory,
        active_pill_highlight: tab.tab_id.toLowerCase() === currentCategory
      }));
    }
    lockedNav = applyAppThemeToSpec(rawNav, colorTokens);
  }

  const effectiveNav = lockedNav || themeInjectedSpec.single_bottom_navigation_bar;
  const targetAppName = appDomain ? `${themeConfig.app_name} (${appDomain})` : themeConfig.app_name;
  const svgRegistry = themeConfig.svg_registry || {};

  return `=== GOOGLE STITCH PROMPT SPECIFICATION ===
Target Platform: Mobile Smartphone App Screen (Vertical 9:16 Portrait)
Target App Name: ${targetAppName}
Active Theme Profile: "${activeTheme.name}" (${activeThemeKey})
Design Title: ${spec.title}${appDomain ? ` (Adapted to ${appDomain})` : ''}
Target Viewport: Mobile Smartphone App Screen (Vertical 9:16 Portrait)
Screen Category: ${spec.screen_type || spec.component_type}
${appDomain ? `
[DOMAIN ADAPTATION DIRECTIVE - TARGET DOMAIN: "${appDomain}"]
CRITICAL: Adapt all content placeholders, section titles, card labels, list items, and action buttons from the reference layout blueprint below to fit a "${appDomain}".
1. Keep the EXACT visual structure, card containers, flex/grid layouts, component spacing, and locked bottom navigation bar.
2. Translate all domain-specific text and placeholders into "${appDomain}" equivalents.
` : ''}
[CRITICAL CANVAS ASPECT RATIO INSTRUCTION]
Canvas Type: Mobile Phone App Screen (Narrow Vertical Portrait 9:16 aspect ratio).
Do NOT render a widescreen desktop dashboard, web browser canvas, or wide tablet container. The generated UI canvas MUST be a standard narrow vertical smartphone app screen.

[GOAL & INSTRUCTIONS FOR GOOGLE STITCH]
Generate a high-fidelity mobile app screen using the exact structural layout, component positions, and element scale below. Apply the specified app color palette and styling tokens into the design.

[EMBEDDED MATHEMATICAL SVG VECTOR ICON MANDATE]
CRITICAL MANDATORY DIRECTIVE FOR ALL ICONS:
- EVERY SINGLE ICON on this screen MUST BE DRAWN USING EXPLICIT MATHEMATICAL SVG PATH DATA (<svg width="..." height="..." viewBox="0 0 24 24"><path d="..."/></svg>).
- Do NOT use emojis, text placeholders, or generic font names for icons under any circumstances!

[PROJECT CENTRAL SVG REGISTRY (APP_THEME.JSON)]
${JSON.stringify(svgRegistry, null, 2)}

[APP DESIGN SYSTEM COLOR PALETTE]
- Primary Brand Accent: ${colorTokens.primary_brand_accent}
- Primary Accent: ${colorTokens.primary_accent}
- Surface Background: ${colorTokens.surface_background}
- Elevated Surface: ${colorTokens.surface_elevation_1}
- Container Surface: ${colorTokens.surface_container}
- Dark Container Surface: ${colorTokens.surface_container_dark || '#18181B'}
- High-Contrast Text: ${colorTokens.on_surface_high}
- Medium Text: ${colorTokens.on_surface_medium}
- Muted Text: ${colorTokens.on_surface_muted}
- Subtle Border / Outline: ${colorTokens.outline_subtle}

[EXACT LAYOUT & COMPONENT BLUEPRINT (WITH APPLIED APP THEME)]
Background Configuration:
${JSON.stringify(themeInjectedSpec.background, null, 2)}

Layout Structure:
${JSON.stringify(themeInjectedSpec.layout_structure, null, 2)}

Main Page Sections:
${JSON.stringify(themeInjectedSpec.sections || themeInjectedSpec.tabs || themeInjectedSpec, null, 2)}
${effectiveNav ? `
[LOCKED APP NAVIGATION SYSTEM - 100% CONSISTENT ON ALL APP SCREENS]
IMPORTANT: This is the app's locked navigation bar. Render ONLY this single floating stadium pill navigation bar at the bottom of the screen. Do NOT append any default AI template navigation bar!
${JSON.stringify(effectiveNav, null, 2)}
` : ''}
[STRICT GENERATION CONSTRAINTS & ANTI-DUPLICATION RULES]
1. MOBILE PORTRAIT CANVAS ONLY: Render a narrow vertical mobile smartphone app screen ONLY. Do NOT generate a widescreen desktop dashboard or wide web canvas.
2. ZERO ANIMATION RULE: Render static UI ONLY. Absolutely NO animations, NO motion graphics, NO dynamic keyframe loops, and NO pulsing or glowing movement. The output must be completely static.
3. ZERO SHADOWS & ZERO GLOW RULE: Render flat UI surfaces ONLY. Absolutely NO drop-shadows, NO box-shadows, NO ambient glows, NO neon glow halos, and NO outer/inner glow effects. All cards, buttons, and containers must be completely flat with clean borders or solid color fills.
4. LOCKED NAVIGATION BAR CONSISTENCY: Render EXACTLY ONE bottom navigation bar on the entire screen using the locked stadium pill spec above. Do NOT alter the navigation bar shape, tabs, or styling.
5. SINGLE TOP HEADER RULE: Do NOT duplicate the top header bar.
6. Reproduce the exact layout flex/grid structure, stacking order, element padding, and vertical positioning as specified in the blueprint above.
7. Use the target app's exact color values provided above (${colorTokens.primary_brand_accent} for primary elements, ${colorTokens.surface_background} for main surface).
8. Do NOT invent extra section cards or duplicate bottom tabs outside of the specified blueprint.
============================================================`;
}

function main() {
  const catalog = loadJSON(CATALOG_PATH);
  const themeConfig = loadJSON(THEME_PATH);

  const rawArgs = process.argv.slice(2);
  const flags = rawArgs.filter(a => a.startsWith('--'));
  const args = rawArgs.filter(a => !a.startsWith('--'));

  let activeThemeKey = themeConfig.active_theme;
  const themeFlag = flags.find(f => f.startsWith('--theme='));
  if (themeFlag) activeThemeKey = themeFlag.split('=')[1];

  let appDomain = null;
  const domainFlag = flags.find(f => f.startsWith('--app_domain=') || f.startsWith('--domain='));
  if (domainFlag) appDomain = domainFlag.split('=')[1].replace(/^["']|["']$/g, '');

  if (args.length < 2) {
    console.log(`\n🎨 Active App Theme: "${themeConfig.themes[activeThemeKey]?.name || activeThemeKey}"`);
    console.log('\n📱 Available Screen Specs in Catalog:');
    for (const [cat, list] of Object.entries(catalog.screens)) {
      console.log(`\nCategory [${cat}]:`);
      list.forEach(s => console.log(`  - ID: "${s.id}" | Title: ${s.title}`));
    }
    return;
  }

  const [category, id] = args;
  let targetSpec = null;
  if (catalog.screens[category]) targetSpec = catalog.screens[category].find(item => item.id === id);
  if (!targetSpec && catalog.components[category]) targetSpec = catalog.components[category].find(item => item.id === id);

  if (!targetSpec) {
    console.error(`\n❌ Spec with ID "${id}" in category "${category}" not found.`);
    return;
  }

  console.log(generateStitchPrompt(targetSpec, themeConfig, activeThemeKey, appDomain));
}

main();
