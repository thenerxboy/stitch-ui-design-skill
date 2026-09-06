---
name: ui-design-skill
description: End-to-end framework for extracting UI reference screens into color-agnostic JSON blueprints, maintaining brand design tokens & locked component specs, saving approved screen prompts to app-screens/, and compiling domain-adapted Google Stitch prompts with 9:16 mobile canvas guardrails.
---

# UI Design Extraction & Google Stitch Prompt Compilation Skill

This skill defines the complete, 3-tier architecture and execution workflow for extracting reference UI screenshots, cataloging color-agnostic visual blueprints, applying brand themes, archiving approved screen prompts into `app-screens/`, and compiling domain-adapted Google Stitch prompts.

> [!IMPORTANT]
> **AGENT MANDATE**: Any agent executing a UI extraction, design system setup, or Google Stitch prompt compilation task **MUST ALWAYS read this SKILL.md file first** (`view_file`) to adhere to the PRD & Component-First Execution Protocol, Design Guardrails, and Error Prevention Checklist.

---

## ⚡ Shortcut Slash Commands & Help Triggers

When the user types any of the following shortcuts or asks for help, the agent must execute the corresponding action:

| Command / Shortcut | Action / Behavior |
| :--- | :--- |
| **`/ui-help`** | Displays a complete manual overview: what the skill does, file explanations (`app_theme.json`, `design_catalog.json`, `stitch_formatter.js`, `app-screens/`), workflow phases, CLI flags, and rules. |
| **`/ui-shortcuts`** | Displays a fast reference list of all available `/ui-*` shortcut triggers and what they do. |
| **`/ui-init`** | Auto-creates `app_theme.json`, `design_catalog.json`, `stitch_formatter.js`, and `app-screens/` folder in the current project root. |
| **`/ui-extract`** | Extracts attached reference screenshot into a color-agnostic JSON blueprint and appends it to `design_catalog.json`. |
| **`/ui-compile`** | Compiles a Stitch prompt for a specific screen with domain adaptation (`--app_domain`). |
| **`/ui-sync`** | Batch compiles & updates ALL archived screen prompts in `app-screens/` to reflect global theme/component changes (`node stitch_formatter.js --all`). |
| **`/ui-approve`** | Saves the current approved Google Stitch prompt into `app-screens/<screen_id>.md`. |

---

## 🏛️ System Architecture & File Structure

```
+-------------------------------------------------------+
| Tier 1: Reference UI Extraction (design_catalog.json) |
| Color-agnostic structural layout & hand-curated specs |
+-------------------------------------------------------+
                           │
                           ▼
+-------------------------------------------------------+
| Tier 2: App Brand System (app_theme.json)             |
| Color tokens, theme profiles & locked nav bar specs   |
+-------------------------------------------------------+
                           │
                           ▼
+-------------------------------------------------------+
| Tier 3: Prompt Compiler (stitch_formatter.js)         |
| Outputs domain-adapted Stitch prompt with guardrails   |
+-------------------------------------------------------+
                           │
                           ▼
+-------------------------------------------------------+
| Tier 4: Approved Prompts Archive (app-screens/)       |
| Permanent markdown files for approved screen prompts  |
+-------------------------------------------------------+
```

### File Responsibilities:
1. `design_catalog.json`: Holds color-agnostic UI layout blueprints for screens and hand-curated components.
2. `app_theme.json`: Holds app brand design tokens, active theme profile, and locked foundational component specs.
3. `stitch_formatter.js`: Node.js CLI script that injects theme colors, locked components, and domain adaptation directives into Stitch prompts.
4. `app-screens/`: Project folder containing approved, production-ready markdown screen prompts (e.g. `app-screens/home_dashboard.md`).

---

## 📋 Interactive App Design Lifecycle Protocol (4 Phases)

When starting a project or generating screens, follow this 4-phase protocol:

```
[Phase 1: Foundation Component Lock] ➔ [Phase 2: Screen Interview & On-Demand Themes] ➔ [Phase 3: Screen Approval & Archiving] ➔ [Phase 4: Hand-Curated Component Policy]
```

### Phase 1: Foundation Component Lock (No Forced Color Questions)
- **Do NOT ask generic robotic color/vibe questions up front.**
- Agent prompts the user:
  > *"Before we start generating full screens, let's establish your foundational components (Nav Bar, Action Buttons, Headers). Do you have a reference image for the nav bar and buttons you want, or would you like me to propose a design based on your app brief?"*
- Only after the user provides an image or approves a proposal are the foundational specs written to `app_theme.json` under `locked_navigation_bar` and primary action tokens.

### Phase 2: Screen Generation Interview & On-Demand Themes
For each screen in the PRD (e.g. *Home Dashboard*, *Task Detail*, *Analytics*, *User Profile*):
1. **Agent Prompt**:
   > *"For the **[Screen Name] Screen**, do you have a reference UI screenshot/inspiration image you'd like to use, or should I select and adapt the best layout blueprint from our catalog based on your PRD?"*
2. **Branch A (Reference Image Provided)**: Extract visual blueprint into JSON $\rightarrow$ Append to `design_catalog.json` $\rightarrow$ Compile prompt.
3. **Branch B (No Reference Image)**: Select best blueprint from `design_catalog.json` $\rightarrow$ Compile prompt.
4. **Single Active Theme Delivery**: Deliver ONE prompt matching the active theme. Do NOT spit out multiple theme variations simultaneously.
5. **On-Demand Theme Variants**: Ask the user: *"Would you like to generate this screen in a different theme (e.g., Light Mode)?"* Only output alternate themes when requested.

### Phase 3: Screen Approval, Archiving & Versioning Protocol (`app-screens/`)
- When the user approves a generated or revised Stitch prompt (*"This looks great"*, *"Approved"*, *"Good to go"*):
  1. Ensures the `app-screens/` directory exists in the project root.
  2. Saves/overwrites the screen prompt markdown file in `app-screens/` with the new standalone Stitch prompt, incrementing the version number in the filename and header (e.g. `home_daily_quote_feed_v1.md` ➔ `home_daily_quote_feed_v2.md` ➔ `home_daily_quote_feed_v3.md`).

#### 📌 Rule: Approved Alterations & Single Active File Overwrite Mandate
- When an already approved screen is altered and approved again:
  - The previous version file (e.g. `home_daily_quote_feed_v5.md`) MUST BE DELETED/REPLACED by the newly approved file with the updated version suffix (`home_daily_quote_feed_v6.md`).
  - There MUST NEVER be multiple version files (`_v1`, `_v2`, `_v3`...) or unversioned shortcut aliases coexisting in `app-screens/` for the same screen. At any given time, there is ONLY ONE SINGLE markdown file per screen in `app-screens/` representing its active version.

#### 🎨 Rule A: On-Demand Theme Variant Archiving (Non-Destructive Copy)
- When generating an alternate theme variant (e.g., Light Mode vs. Dark Mode) for an already approved screen:
  - Do **NOT** overwrite the primary active screen prompt file.
  - Save a distinct copy with a theme suffix (e.g., `app-screens/<screen_id>_v2_clean_light.md`).

#### 🛠️ Rule B: Structural & Layout Correction Propagation
- When the user approves significant structural layout, component, or visual hierarchy corrections for a screen:
  - The primary prompt file is overwritten with the new approved full standalone prompt at the new version number (e.g. `home_daily_quote_feed_v2.md`).
  - **Automatic Propagation**: If any theme variant files already exist for that screen (e.g., `app-screens/home_daily_quote_feed_v1_clean_light.md`), the agent **automatically updates** those theme variant files with the new structural blueprint while preserving their respective theme color tokens.

#### 🌐 Rule C: Universal Multi-App Catalog & Variant Selection Protocol (`design_catalog.json`)
1. **Universal Multi-App Library**: `design_catalog.json` is a global visual catalog designed to serve as an inspiration and blueprint library across **ANY app project**, not tied to a single codebase.
2. **Non-Destructive Base Blueprints**: Standard base screen templates in the catalog (e.g. `base_quote_hero`, `settings_list_base`) are **NEVER overwritten** when customizing a screen for a specific app.
3. **Variant Branching on Customization**: When a screen from the catalog is selected as a base and customized for an app (e.g. adding a low-opacity background image for a quotes app), the agent creates a **new variant entry** in `design_catalog.json` (e.g. `hero_card_low_opacity_nature_bg_v1`).
4. **App-Specific Modification Isolation**: Subsequent design edits for that app update **only that specific variant entry**, keeping the original base template clean and available for other projects.
5. **Intelligent Variant Selection for Future Apps**: Each catalog entry includes `domain_tags` (e.g. `["mindset", "quotes", "hero_card", "image_bg"]`), `visual_style`, and `best_use_case` metadata. When starting a new project in any domain (e.g. Settings, Fitness, Finance), the agent analyzes the app brief, queries the catalog metadata, and intelligently selects the variant or base template that best represents the app's goals and domain aesthetics.

#### 🔄 Screen Revision & Screenshot Feedback Protocol (Dual Prompt Standard)
Whenever the user provides feedback, screenshot corrections, or requests adjustments for a rendered screen:
1. **Update System & Blueprint Files**:
   - Update `app_theme.json` if foundational design tokens or locked component specs (e.g. navbar height/padding) changed.
   - Update `design_catalog.json` with the refined visual blueprint.
   - Overwrite/update the archived prompt markdown file at `app-screens/<screen_id>.md` (and propagate to existing theme variants per Rule B).
2. **Output Dual Prompts in Chat Response**:
   - **Prompt 1: Follow-Up Revision Prompt (Delta Prompt)**: A concise, direct instruction string formatted specifically for the user to copy-paste into an **active Google Stitch thread** to modify their existing rendered canvas in-place.
   - **Prompt 2: Full Standalone Google Stitch Prompt**: The complete, fully-compiled prompt specification formatted for the user to copy-paste if starting a **brand new canvas** in Google Stitch.

### Phase 4: Hand-Curated Component Library Policy
- Standalone components inside `"components"` in `design_catalog.json` are **NEVER auto-saved indiscriminately**.
- The agent only stores a component snippet when:
  1. The user explicitly requests it (*"Save this bento card as a reusable component"*).
  2. The agent asks for permission (*"This metric card layout is unique. Should I save it into our hand-curated components library?"*) and the user approves.
- This guarantees `design_catalog.json` contains only 100% hand-curated, exceptional UI components.

---

## 🔄 Domain Adaptation Mode (`--app_domain="Target App"`)

The `--app_domain` flag allows you to take **ANY extracted JSON screen blueprint** from the catalog (e.g. Fintech Wallet, Mood Tracker, E-commerce, Social Feed) and adapt it into **ANY target app domain** (e.g. To-Do App, Fitness Tracker, Recipe Planner, Habit Tracker).

### CLI Flag Syntax:
```bash
node stitch_formatter.js <category> <id> --app_domain="Target App Name"
# Alternative alias:
node stitch_formatter.js <category> <id> --domain="Target App Name"
```

### Domain Translation Matrix:

| Reference Screen Component | Reference Placeholder (e.g., Fintech/Mood) | Adapted Target Placeholder (e.g., To-Do App) | Adapted Target Placeholder (e.g., Fitness App) |
| :--- | :--- | :--- | :--- |
| **Hero Balance Card** | Total Balance: `$24,500.00` | Task Completion: `18/24 Done (75%)` | Weekly Goal: `4/5 Workouts Completed` |
| **Cards Carousel** | Visa / Mastercard Credit Cards | Active Project Cards (Work, Personal) | Workout Routine Cards (Leg Day, Cardio) |
| **Operations Grid** | E-Shop, Gift, Charity, Internet | Quick Add, Today, Flagged, Categories | Start Run, Log Water, Track Sleep, Calorie Counter |
| **Transactions List** | Recent Transfers / Card Payments | Today's Task Items with Checkboxes | Today's Activity Log with Timestamps |
| **Mood Emoji Chart** | 7-Day Mood Level Bar Chart | 7-Day Task Completion Bar Chart | 7-Day Calorie Burn Bar Chart |

---

## 📐 Mandatory Design Rules & Guardrails

1. **Color-Agnostic Catalog Rule**: NEVER hardcode HEX or RGB values inside `design_catalog.json`. Only use abstract semantic color roles (`primary_accent`, `surface_background`, `on_surface_high`, `on_surface_muted`, `subtle_border`, etc.).
2. **Mobile Portrait Canvas Mandate (9:16 Aspect Ratio)**:
   - Target Platform: `Mobile Smartphone App Screen (Vertical 9:16 Portrait)`
   - Avoid generic keywords like `"Dashboard"` in titles without specifying `"Mobile Smartphone App Screen"` to prevent Stitch from rendering desktop canvases.
3. **Zero Shadows & Zero Glows Rule**: Flat UI surfaces ONLY. No drop-shadows, box-shadows, ambient glows, or neon glows. Cards and buttons must use solid fills or clean borders.
4. **Zero Animations Rule**: 100% static UI renders. No motion graphics, dynamic keyframe loops, or pulsing effects.
5. **Locked Single Navigation Bar Rule**: Render EXACTLY ONE bottom navigation bar using the locked stadium pill spec from `app_theme.json`. Enforce strict anti-duplication directives so AI generators do not append extra template nav bars.
6. **Screen Correction & Dual Prompt Standard**: When screenshot corrections or screen revisions are requested, the agent MUST update `app_theme.json`, `design_catalog.json`, and `app-screens/<screen_id>.md`, and output TWO prompts in chat: (1) a concise Follow-Up Revision Prompt for active Stitch threads, and (2) a Full Standalone Prompt for new canvases.
7. **Auto-Generated Folder README Rule**: Whenever the agent creates or initializes ANY new directory in the project workspace (e.g. `app-screens/`, `components/`, `assets/`, `blueprints/`), the agent MUST automatically generate a clear, self-documenting `README.md` inside that directory explaining its purpose, file naming conventions, and usage guidelines.
8. **Component Consistency & Strict Icon Locking Rule**: Every locked foundational component MUST specify explicit permanent icon symbols and layout structure rules (e.g. horizontal inline icon+label for active stadium pill vs vertical stacked for inactive) in `app_theme.json` to prevent AI generators from shifting icons or layout structures across screens.
9. **Embedded SVG Vector Icon Rule**: Locked icons in `app_theme.json` MUST include raw SVG vector string definitions (`<svg viewBox="..." ...><path d="..."/></svg>`) sourced from standard open-source icon libraries (Lucide, Heroicons, Feather). Prompt specs MUST inject these exact mathematical SVG geometries into Stitch prompts to eliminate symbol drift or font rendering differences across screens.
10. **Universal Component SVG & Quantitative Dimension Locking Rule**: All repeating components across screens (Nav Bar, Headers, Action Buttons, Search Bars, Filter Chips) MUST define explicit SVG vector strings and exact quantitative pixel metrics (`icon_size: 24px x 24px`, `active_label_font_size: 13px`, `inactive_label_font_size: 11px`, `active_pill_height: 56px`, `nav_bar_height: 80px`). Prompt specs MUST inject these exact pixel numbers and SVG paths into every prompt to guarantee zero drift in icon geometry, text scale, or container sizing across the entire app.
11. **Mandatory Universal Mathematical SVG Vector Injection Directive**: EVERY icon symbol—whether in navigation bars, action buttons, card footers, setting rows, or emblem containers—MUST explicitly include raw mathematical SVG vector code (`<svg width="..." height="..." viewBox="0 0 24 24"><path d="..."/></svg>`). Never use emojis, font placeholders, or generic text labels for icons in generated or compiled prompts.
12. **Safe Automated Catalog Management Protocol (`design_catalog.json`)**: When extracting reference images, agents may execute safe Node.js scripts to parse, validate JSON syntax, and format catalog entries in `design_catalog.json` to guarantee 0 JSON syntax errors or bracket corruption.
13. **Central Project SVG Registry & Autonomous Hardcoding Protocol (`app_theme.json.svg_registry`)**:
    - **Single Source of Truth**: All icon vector geometries for an app MUST be registered in that project's `app_theme.json` under `svg_registry`.
    - **Autonomous Lookup-or-Register Workflow**:
      1. Before generating or compiling any screen prompt, the agent MUST check `app_theme.json` -> `svg_registry`.
      2. If a required icon exists (e.g. `bell_notification`), reuse its exact `svg_code`.
      3. If a required icon does NOT exist, create a clean mathematical SVG vector string, save it into `app_theme.json.svg_registry`, and embed it directly into the prompt.
    - **Direct Inline SVG Hardcoding in Prompts**:
      - Place the exact raw `<svg width="..." height="..." viewBox="0 0 24 24"><path d="..."/></svg>` code block directly inside the prompt directive bullet point at the exact location where Stitch will render it.
      - Accompany every embedded SVG with an explicit Stitch mandate: `INSTRUCTION FOR STITCH: Render this exact mathematical SVG code: <svg...></svg>. Do NOT replace or generate any other icon!`.
    - **File Scope Boundaries**:
      - **Project-Level Workspace Files** (Isolated per app project folder): `app_theme.json`, `app-screens/`, and local project assets.
      - **Global Reusable Framework Files** (Shared across all projects): `SKILL.md`, `design_catalog.json`, `stitch_formatter.js`, and helper scripts.
    - **Mandatory SVG Registry Activity Log**:
      - After every prompt generation, screen update, or reference extraction turn, the agent MUST output a dedicated summary block:
        * ♻️ **Reused Existing Icons**: List icon keys reused from `app_theme.json.svg_registry`.
        * ✨ **Registered New Icons**: List new icon keys created and added to `app_theme.json.svg_registry`.
14. **Contextual Git Commit & User Approval Protocol**:
    - **User Confirmation Mandate**: The agent MUST NEVER run `git commit` or `git push` silently. The agent MUST propose the exact commit message and ask for explicit user approval before executing any Git action.
    - **Context-Specific Commit Messages**: Commit messages MUST specify the exact screens or rules modified (e.g. `feat(catalog): extract onboarding_nutrilens_v1 & 4 nutrition blueprints`, `docs(skill): add Rule 13 SVG registry protocol`).
    - **Immediate `SKILL.md` Update Commit Workflow**: Whenever changes, corrections, or rule additions to `SKILL.md` are approved by the user, the agent MUST immediately propose a Git commit for `SKILL.md` to keep the master GitHub skill repository 100% up-to-date.
15. **Project-Scoped Persistent Memory Log Protocol (`MEMORY.md`)**:
    - **Local Workspace Scope**: Every project workspace MUST maintain a local `./MEMORY.md` file tracking app goals, active screen versions, design system locks, registered SVG icons, and user preferences.
    - **Auto-Bootstrapping**: If `./MEMORY.md` does not exist in a new project folder, the agent creates it using the template in `SKILL.md`.
    - **Autonomous Memory Updates**: After every screen revision, blueprint extraction, or architectural decision, the agent updates `./MEMORY.md` to keep context sharp and token usage minimal across sessions and AI tools.

---

## 🔒 Component Consistency & Explicit Locking Protocol

To prevent generative AI drift across screens (such as shifting icons, straight tick quote marks vs curved quote marks, or changing layout alignment between active/inactive states):

1. **Embedded SVG Vector Mandate**:
   - Every locked component tab/button in `app_theme.json` includes an immutable `svg_vector` string containing the exact SVG `<path>` data from standard icon libraries (e.g., Lucide, Feather, Heroicons).
   - Injecting raw mathematical SVG vectors into Stitch prompts guarantees 100% precise icon geometry rendering across all app screens, preventing AI generators from replacing curved quote marks with straight ticks or speech bubbles.

2. **Dual Active vs. Inactive Layout Directives**:
   - **Active State Layout**: Explicitly state the exact layout mode (`HORIZONTAL_INLINE_SIDE_BY_SIDE` for active pills where the icon sits to the left of the label inside the highlighted pill).
   - **Inactive State Layout**: Explicitly state `VERTICAL_STACK_ICON_TOP_LABEL_BOTTOM` (icon centered on top, label text centered below).

3. **Quantitative Pixel & Font Dimension Locking**:
   - Every repeating locked component MUST specify exact pixel metrics:
     * **Icon Dimensions**: `24px x 24px` standard vector size for nav icons and action buttons.
     * **Typography Sizes**: Active tab label = `13px` bold, Inactive tab label = `11px` medium, Header titles = `26px` display, Subtitles = `14px`.
     * **Container Metrics**: Nav bar total height = `80px`, Active pill container height = `56px`, Corner radius = `full_stadium_pill_100px`, Border = `1.5px`.
   - Prompt specs MUST explicitly state these pixel numbers so AI generators do not shrink, stretch, or alter font/icon proportions across screens.

4. **Anti-Drift Prompt Directives**:
   - Every compiled Stitch prompt must include a strict `LOCKED NAVIGATION BAR STRICT LAYOUT & ICON DIRECTIVE` section with embedded SVG code and explicit pixel dimensions forbidding icon substitutions, font scaling shifts, or layout structure changes across app screens.

---

## 🚀 Auto-Bootstrapping & Workspace Organization Protocol

When an agent is invoked in a project folder, it MUST enforce standard directory structures for both the Skill Repository and the Project Workspace.

### 1. Master Skill Repository Directory Structure (`ui-design-skill/`)
The GitHub Skill Repository folder is named after what the skill does (`ui-design-skill/` or `stitch-ui-design-skill/`). The main instruction file inside is named `SKILL.md`:
```
ui-design-skill/ (GitHub Skill Repository Root)
├── SKILL.md                 <── Master Rulebook, Protocols & Script Templates
├── README.md                <── Skill Installation & Usage Overview
└── resources/               <── Shared Master Assets
    └── design_catalog.json  <── Master Blueprint Library (6,000+ lines)
```

### 2. Standard Project Workspace Directory Structure (`[Project Root]/`)
Every app project workspace MUST maintain a clean, predictable folder tree:
```
[Project Root]/ (App Workspace Folder)
├── MEMORY.md                <── Local Project Memory Log
├── app_theme.json           <── Local App Theme & Icon SVG Registry
├── design_catalog.json      <── Local Copy of Master Blueprint Library
├── stitch_formatter.js      <── Local Prompt Compiler Script
└── app-screens/             <── Active Screen Prompt Files Directory
    ├── README.md            <── Directory Index & Active Screen Manifest
    ├── home_daily_quote_feed_v6.md
    ├── explore_mindset_topics_v5.md
    ├── saved_quotes_journal_v11.md
    └── profile_streak_stats_settings_v6.md
```

### 3. File Bootstrapping & Organization Mandate:
1. **Missing File Bootstrapping**: If `design_catalog.json`, `app_theme.json`, `stitch_formatter.js`, or `MEMORY.md` are missing from the project root, the agent automatically creates/copies them from the skill templates.
2. **File Organization**: The agent MUST place all active screen prompt `.md` files inside `app-screens/`.
3. **Single Active File Enforcement**: The agent MUST delete archived screen versions per the Single Active File Overwrite Mandate and update `app-screens/README.md`.

---

## 📄 File Templates & Full Source Code

### 1. `stitch_formatter.js` (Complete Production Source)

```javascript
/**
 * Stitch Prompt Formatter & Color Token Compiler
 * 
 * Usage:
 *   node stitch_formatter.js [category] [id] [--theme=theme_name] [--app_domain="Target App"]
 * 
 * Examples:
 *   node stitch_formatter.js home home_personalized_greeting_mood_tracker_grid --app_domain="To-Do App"
 */

const fs = require('fs');
const path = require('path');

const CATALOG_PATH = path.join(__dirname, 'design_catalog.json');
const THEME_PATH = path.join(__dirname, 'app_theme.json');

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
```

---

### 2. `app_theme.json` (Template)

```json
{
  "app_name": "My Vibe App",
  "active_theme": "cyber_obsidian",
  "svg_registry": {
    "bell_notification": {
      "category": "alerts",
      "svg_code": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9\"/><path d=\"M13.73 21a2 2 0 0 1-3.46 0\"/></svg>"
    },
    "pencil_edit": {
      "category": "actions",
      "svg_code": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><path d=\"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z\"/></svg>"
    }
  },
  "global_platform_settings": {
    "target_platform": "Mobile Smartphone App Screen (Vertical 9:16 Portrait)",
    "canvas_aspect_ratio": "9:16 vertical portrait mobile phone",
    "shadow_policy": "ZERO_SHADOWS_AND_ZERO_GLOWS",
    "motion_policy": "STATIC_UI_ONLY_ZERO_ANIMATIONS"
  },
  "locked_navigation_bar": {
    "type": "stadium_pill_navigation_bar",
    "anti_duplication_rule": "ONLY_RENDER_THIS_SINGLE_NAVIGATION_BAR_DO_NOT_ADD_SECOND_NAV_BAR",
    "position": "fixed_bottom_center",
    "horizontal_margin": "sp_16",
    "bottom_offset": "sp_16",
    "corner_radius": "32px",
    "padding": "sp_8",
    "color_role": "surface_container_dark",
    "tabs": [
      { "tab_id": "home", "label": "Home", "icon": "home_icon", "active_state": true, "text_color_role": "primary_accent", "active_pill_highlight": true },
      { "tab_id": "insights", "label": "Insights", "icon": "grid_icon", "active_state": false, "text_color_role": "on_surface_muted", "active_pill_highlight": false },
      { "tab_id": "journal", "label": "Journal", "icon": "book_icon", "active_state": false, "text_color_role": "on_surface_muted", "active_pill_highlight": false },
      { "tab_id": "profile", "label": "Profile", "icon": "user_icon", "active_state": false, "text_color_role": "on_surface_muted", "active_pill_highlight": false }
    ]
  },
  "themes": {
    "cyber_obsidian": {
      "name": "Cyber Obsidian Dark",
      "color_tokens": {
        "primary_brand_accent": "#00E5FF",
        "primary_accent": "#00E5FF",
        "surface_background": "#090A0F",
        "surface_elevation_1": "#12141D",
        "surface_container": "#181B26",
        "surface_container_dark": "#18181B",
        "on_surface_high": "#FFFFFF",
        "on_surface_medium": "#A0A5B5",
        "on_surface_muted": "#606575",
        "outline_subtle": "#232736"
      }
    },
    "clean_light": {
      "name": "Clean Obsidian Light",
      "color_tokens": {
        "primary_brand_accent": "#0066FF",
        "primary_accent": "#0066FF",
        "surface_background": "#F8FAFC",
        "surface_elevation_1": "#FFFFFF",
        "surface_container": "#F1F5F9",
        "surface_container_dark": "#0F172A",
        "on_surface_high": "#0F172A",
        "on_surface_medium": "#475569",
        "on_surface_muted": "#94A3B8",
        "outline_subtle": "#E2E8F0"
      }
    }
  }
}
```

---

### 3. `design_catalog.json` (Template Structure)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "version": "1.0.0",
  "description": "Color-Agnostic UI Design Catalog for Google Stitch",
  "screens": {
    "get_started": [],
    "sign_up": [],
    "home": [],
    "insights": [],
    "wallet": []
  },
  "components": {
    "nav_tabs": []
  }
}
```

---

### 4. `add_catalog_blueprint.js` (Safe Extraction Helper Script Template)

```javascript
/**
 * Safe Catalog Blueprint Extractor Helper Script
 * Parses, validates JSON syntax, and safely appends color-agnostic blueprints to design_catalog.json.
 */
const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'design_catalog.json');
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
console.log('Successfully appended blueprints to design_catalog.json!');
```

---

### 5. `MEMORY.md` (Project Memory Log Template)

```markdown
# 🧠 Project Memory & Active State Log (`MEMORY.md`)

## 📌 Project Overview
- **App Name**: [Target App Name]
- **Target Platform**: Mobile Smartphone App Screen (Vertical 9:16 Portrait)
- **Active Theme**: [theme_name]

## 🧭 Active Navigation Architecture (4 Main Tabs)
- **Tab 1 `[ ” Daily ]`**: [screen_1_filename.md] (Active version: vX)
- **Tab 2 `[ 🧭 Explore ]`**: [screen_2_filename.md] (Active version: vX)
- **Tab 3 `[ 🔖 Saved ]`**: [screen_3_filename.md] (Active version: vX)
- **Tab 4 `[ 👤 Profile ]`**: [screen_4_filename.md] (Active version: vX)

## 🎨 Locked Design System & Navbar Specs
- **Navbar Fill**: Solid Brand Accent, 80px total height, 100px stadium radius.
- **Active Pill**: Inverted Dark Surface, 56px height, white text, side-by-side icon + label.
- **Inactive Tab Icons**: 2-line vertical stack (icon top, label text bottom).

## 🔑 Registered Icon Registry (`app_theme.json`)
- Active Registered Icons: [registered_icon_keys]

## 📝 Recent Architectural Decisions & User Directives
- [Summary of key user decisions and screen layout locks]

## ⌛ Next Action Items
- [Upcoming sub-screens or feature flows to build]
```

---

## ⚠️ Common Pitfalls & Prevention Checklist

- ❌ **JSON Nesting Error**: Always verify that ending brackets `]` and braces `}` are placed at the end of section arrays before starting new screen objects in `design_catalog.json`.
- ❌ **Unclosed Screen Objects**: Ensure that inside section arrays, every section object is properly closed with `}` before closing the `sections` array `]`.
- ❌ **Desktop Canvas Rendering**: Never use bare `"Dashboard"` titles without specifying `Mobile Smartphone App Screen (Vertical 9:16 Portrait)`.
- ❌ **Duplicate Navigation Bars**: Ensure `single_bottom_navigation_bar` or `locked_navigation_bar` includes the `anti_duplication_rule` directive.
- ❌ **Hardcoded Colors in Catalog**: Never write `#FFFFFF` or `#000000` inside `design_catalog.json`. Always use `on_surface_high`, `surface_background`, etc.
