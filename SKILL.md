---
name: stitch-ui-skill
description: End-to-end framework for extracting UI reference screens into color-agnostic JSON blueprints, maintaining brand design tokens & locked component specs, saving approved screen prompts to app-screens/, compiling domain-adapted Google Stitch prompts, and generating Dual-Prompt specs for App Icons and App Store Screenshots with zero dummy text guardrails.
---

# 🎨 Google Stitch UI Design & Prompt Compilation Skill (`stitch-ui-skill`)

This skill defines the complete, 3-tier architecture and execution workflow for extracting reference UI screenshots, cataloging color-agnostic visual blueprints in `design_catalog.json`, applying brand themes in `app_theme.json`, archiving approved screen prompts into `app-screens/`, compiling domain-adapted Google Stitch prompts via `scripts/stitch_formatter.js`, and tracking UI design state in `docs/04-ui-design/DESIGN-MEMORY.md`.

> [!IMPORTANT]
> **AGENT MANDATE**: Any agent executing a UI extraction, design system setup, or generative prompt compilation task **MUST ALWAYS read this SKILL.md file first** (`view_file`) to adhere to the PRD & Component-First Execution Protocol, Design Guardrails, Hardcoded Output Prompt Standards, Zero Dummy Text Enforcement, and Dedicated UI Design Memory (`docs/04-ui-design/DESIGN-MEMORY.md`).

---

## ⚡ Shortcut Slash Commands & Help Triggers

When the user types any of the following shortcuts or asks for help, the agent must execute the corresponding action:

| Command / Shortcut | Action / Behavior | Output Prompt Standard |
| :--- | :--- | :--- |
| **`/ui-help`** | Displays a complete manual overview: what the skill does, file explanations (`app_theme.json`, `design_catalog.json`, `scripts/stitch_formatter.js`, `app-screens/`, `docs/04-ui-design/DESIGN-MEMORY.md`), workflow phases, CLI flags, and rules. | Summary Text |
| **`/ui-shortcuts`** | Displays a fast reference list of all available `/ui-*` shortcut triggers and what they do. | Summary Text |
| **`/ui-flow`** | Generates UI screen prompt blueprints organized by single user flow (Onboarding & Auth, Activation & Paywall, Main App Tabs, Happy Path Core Loop). Ingests `docs/` for real copy. | **Google Stitch Prompt ONLY** |
| **`/app-icon`** | Generates 5 distinct logo exploration concept canvases (Mascot, Metaphor, Lettermark, Geometric, Wordmark) for the app brand. | **Dual-Prompt Standard** (Variant A: Stitch + Variant B: ChatGPT / Midjourney) |
| **`/app-screenshots`** | Generates 5 panoramic App Store marketing screenshots + 1 Next.js web storefront hero mockup screen (`shots.so` framing). | **Dual-Prompt Standard** (Variant A: Stitch + Variant B: ChatGPT / Midjourney) |
| **`/ui-init`** | Auto-creates `app_theme.json`, `design_catalog.json`, `app-screens/` folder, and `docs/04-ui-design/DESIGN-MEMORY.md` in current project root. | Operations Script |
| **`/ui-extract`** | Extracts attached reference screenshot into color-agnostic JSON blueprint via `scripts/add_catalog_blueprint.js` and appends to `design_catalog.json`. | Catalog Blueprint JSON |
| **`/ui-compile`** | Compiles a Stitch prompt for a specific screen from `design_catalog.json` with domain adaptation (`node scripts/stitch_formatter.js --app_domain`). | **Google Stitch Prompt ONLY** |
| **`/ui-sync`** | Batch compiles & updates ALL archived screen prompts in `app-screens/` to reflect global theme changes (`node scripts/stitch_formatter.js --all`). | Formatter Sync |
| **`/ui-approve`** | Saves current approved Google Stitch prompt into `app-screens/prompts/<screen_id>.md` and updates `docs/04-ui-design/DESIGN-MEMORY.md`. | Markdown File Archive |

---

## 📄 PRD Content Extraction Mandate (Zero Dummy Text Rule)

When compiling UI screens (`/ui-flow`), App Icons (`/app-icon`), or Storefront Screenshots (`/app-screenshots`), the agent **MUST INGEST** the authoritative documentation files in the project workspace:
- `docs/01-app-brief/APP-BRIEF.md` (Product Identity, Mascot, Colors, Copy & Vibe)
- `docs/02-prd-research/ARCH-PRD.md` (Features, JTBD, Monorepo, Onboarding Carousel, Paywall, Permissions)
- `docs/03-tech-stack/app-features.md` (Feature-First Stack Decomposition)
- `docs/03-tech-stack/TECH-STACK.md` (Monorepo Infrastructure & DB Schemas)

### Strict Copy Directives:
1. **Real Domain Copy Only**: All titles, labels, card descriptions, stat counters, badge microcopy, and button text MUST be pulled directly from the PRD or adapted to the app's real domain.
2. **Zero Placeholder String Policy**: Absolutely NO "Lorem Ipsum", "John Doe", "$99", "Sample User", "Feature Title 1", "Lorem dolor sit amet", or generic placeholders.
3. **Exact Brand Theme Alignment**: Use the exact Hex codes, color tokens, and Google Fonts pairings defined in `app_theme.json` and `APP-BRIEF.md`.

---

## 🏛️ System Architecture & File Structure

```
+-----------------------------------------------------------------+
| Tier 1: Reference UI Extraction (design_catalog.json)           |
| Color-agnostic structural layout & hand-curated specs           |
+-----------------------------------------------------------------+
                               │
                               ▼
+-----------------------------------------------------------------+
| Tier 2: App Brand System (app_theme.json)                       |
| Color tokens, Google Fonts, SVG icon registry & navbar          |
+-----------------------------------------------------------------+
                               │
                               ▼
+-----------------------------------------------------------------+
| Tier 3: Prompt Compiler (scripts/stitch_formatter.js)           |
| Outputs domain-adapted Stitch prompt with guardrails             |
+-----------------------------------------------------------------+
                               │
                               ▼
+-----------------------------------------------------------------+
| Tier 4: Approved Prompts Archive (app-screens/)                 |
| Permanent markdown files for approved screen prompts            |
+-----------------------------------------------------------------+
                               │
                               ▼
+-----------------------------------------------------------------+
| Tier 5: Dedicated UI Memory Log (docs/04-ui-design/DESIGN-MEMORY)|
| Dedicated UI design system state & active screen version log    |
+-----------------------------------------------------------------+
```

### File Responsibilities:
1. `design_catalog.json`: Holds color-agnostic UI layout blueprints for screens and hand-curated components extracted from reference screenshots or standard design patterns.
2. `app_theme.json`: Holds app brand design tokens, active theme profile, Google Fonts pairings, and locked foundational component specs.
3. `scripts/stitch_formatter.js`: Node.js CLI script inside skill directory that injects theme colors, locked components, and domain adaptation directives into Stitch prompts.
4. `app-screens/`: Project folder containing approved, production-ready markdown screen prompts (`app-screens/prompts/`) and screenshots (`app-screens/images/`).
5. `docs/04-ui-design/DESIGN-MEMORY.md`: Dedicated project-level UI design log tracking active theme, locked components, registered SVG icons, and screen versions. **Isolated from main agent memory to guarantee zero collisions.**

---

## 📋 Interactive App Design Lifecycle Protocol (4 Phases)

When starting a project or generating screens, follow this 4-phase protocol:

```
[Phase 1: Foundation Component Lock] ➔ [Phase 2: Screen Interview & On-Demand Themes] ➔ [Phase 3: Screen Approval & Archiving] ➔ [Phase 4: Hand-Curated Component Policy]
```

### Phase 1: Foundation Component Lock (No Forced Color Questions)
- **Do NOT ask generic robotic color/vibe questions up front.**
- Agent prompts the user:
  > *"Before we start generating full screens, let me confirm your foundational components (Nav Bar, Action Buttons, Headers) from `app_theme.json` and `APP-BRIEF.md`. Do you have a reference image for the nav bar and buttons you want, or shall I propose a design based on your app brief?"*
- Only after the user provides an image or approves a proposal are the foundational specs written to `app_theme.json` under `locked_navigation_bar` and primary action tokens.

### Phase 2: Screen Generation Interview & Reference Image Selection
For each screen in the PRD (e.g. *Home Feed*, *Streak Milestones*, *5s Video Shutter*, *Profile Settings*):
1. **Agent Interview Prompt**:
   > *"For the **[Screen Name] Screen**, do you have a reference UI screenshot / inspiration image you'd like me to extract and use, or should I select and adapt the best layout blueprint from our `design_catalog.json` based on your PRD?"*
2. **Branch A (Reference Image Provided)**: Extract visual layout blueprint into JSON $\rightarrow$ Append color-agnostic structure to `design_catalog.json` via `scripts/add_catalog_blueprint.js` $\rightarrow$ Compile Google Stitch prompt using `app_theme.json` tokens.
3. **Branch B (No Reference Image)**: Query `design_catalog.json` for matching `domain_tags` $\rightarrow$ Select best structural blueprint from `design_catalog.json` $\rightarrow$ Adapt domain copy from `docs/` $\rightarrow$ Compile prompt.
4. **Single Active Theme Delivery**: Deliver ONE prompt matching the active theme. Do NOT spit out multiple theme variations simultaneously.
5. **On-Demand Theme Variants**: Ask the user: *"Would you like to generate this screen in a different theme (e.g., Clean Light Mode)?"* Only output alternate themes when requested.

### Phase 3: Screen Approval, Archiving & Versioning Protocol (`app-screens/`)
- When the user approves a generated or revised Stitch prompt (*"This looks great"*, *"Approved"*, *"Good to go"*):
  1. Ensures `app-screens/prompts/` directory exists in the project root.
  2. Saves/overwrites the screen prompt markdown file in `app-screens/prompts/<screen_id>.md`, incrementing version number in the header (e.g. `home_daily_streak_feed_v1.md` ➔ `home_daily_streak_feed_v2.md`).
  3. Updates `docs/04-ui-design/DESIGN-MEMORY.md` to log active screen version.

#### 📌 Rule: Approved Alterations & Single Active File Overwrite Mandate
- When an already approved screen is altered and approved again:
  - The previous version file MUST BE DELETED/REPLACED by the newly approved file with the updated version suffix (`home_daily_streak_feed_v2.md`).
  - There MUST NEVER be multiple version files (`_v1`, `_v2`, `_v3`...) coexisting in `app-screens/prompts/` for the same screen.

#### 🎨 Rule A: On-Demand Theme Variant Archiving
- When generating an alternate theme variant (e.g., Light Mode vs. Dark Mode) for an approved screen:
  - Do **NOT** overwrite the primary active screen prompt file.
  - Save a distinct copy with a theme suffix (e.g., `app-screens/prompts/<screen_id>_v2_clean_light.md`).

#### 🛠️ Rule B: Structural & Layout Correction Propagation
- When the user approves structural layout corrections for a screen:
  - Overwrite primary prompt file at new version number.
  - Automatically update existing theme variant files with the new structural blueprint while preserving theme color tokens.

#### 🌐 Rule C: Universal Multi-App Catalog & Variant Selection Protocol (`design_catalog.json`)
1. **Universal Multi-App Library**: `design_catalog.json` is a global visual catalog designed to serve as an inspiration and blueprint library across **ANY app project**.
2. **Non-Destructive Base Blueprints**: Standard base screen templates in the catalog are **NEVER overwritten** when customizing a screen for a specific app.
3. **Variant Branching on Customization**: When a screen from the catalog is customized for an app, create a **new variant entry** in `design_catalog.json` (e.g. `hero_card_video_preview_v1`).
4. **Intelligent Variant Selection**: Analyze app brief, query catalog `domain_tags`, and select the variant or base template that best matches the app domain.

### Phase 4: Hand-Curated Component Library Policy
- Standalone components inside `"components"` in `design_catalog.json` are **NEVER auto-saved indiscriminately**.
- Only store component snippets when explicitly requested or approved by the user.

---

## 🔄 Domain Adaptation Mode (`--app_domain="Target App"`)

The `--app_domain` flag allows taking **ANY extracted JSON screen blueprint** from `design_catalog.json` (e.g. Fintech Wallet, Mood Tracker, E-commerce) and adapting it into **ANY target app domain** (e.g. Habit Journal, To-Do App, Fitness Tracker).

### CLI Flag Syntax:
```bash
node .agents/skills/stitch-ui-skill/scripts/stitch_formatter.js <category> <id> --app_domain="Target App Name"
```

---

## 📐 Mandatory Design Rules & Guardrails

1. **Color-Agnostic Catalog Rule**: NEVER hardcode HEX or RGB values inside `design_catalog.json`. Only use abstract semantic color roles (`primary_accent`, `surface_background`, `on_surface_high`, `on_surface_muted`, `subtle_border`, etc.).
2. **Mobile Portrait Canvas Mandate (9:16 Aspect Ratio)**:
   - Target Platform: `Mobile Smartphone App Screen (Vertical 9:16 Portrait)`
   - Avoid generic keywords like `"Dashboard"` in titles without specifying `"Mobile Smartphone App Screen"` to prevent Stitch from rendering desktop canvases.
3. **Zero Shadows & Zero Glows Rule**: Flat UI surfaces ONLY. No drop-shadows, box-shadows, ambient glows, or neon glows. Cards and buttons must use solid fills or clean borders.
4. **Zero Animations Rule**: 100% static UI renders. No motion graphics, dynamic keyframe loops, or pulsing effects.
5. **Locked Single Navigation Bar Rule**: Render EXACTLY ONE bottom navigation bar using the locked stadium pill spec from `app_theme.json`. Enforce strict anti-duplication directives so AI generators do not append extra template nav bars.
6. **Screen Correction & Dual Prompt Standard**: When screenshot corrections or screen revisions are requested, the agent MUST update `app_theme.json`, `design_catalog.json`, and `app-screens/prompts/<screen_id>.md`, and output TWO prompts in chat: (1) a concise Follow-Up Revision Prompt for active Stitch threads, and (2) a Full Standalone Prompt for new canvases.
7. **Auto-Generated Folder README Rule**: Whenever the agent creates or initializes ANY new directory in the project workspace (e.g. `app-screens/`, `components/`, `assets/`, `blueprints/`), the agent MUST automatically generate a clear, self-documenting `README.md` inside that directory explaining its purpose, file naming conventions, and usage guidelines.
8. **Component Consistency & Strict Icon Locking Rule**: Every locked foundational component MUST specify explicit permanent icon symbols and layout structure rules in `app_theme.json`.
9. **Embedded SVG Vector Icon Rule**: Locked icons in `app_theme.json` MUST include raw SVG vector string definitions (`<svg viewBox="..." ...><path d="..."/></svg>`) sourced from standard open-source icon libraries (Lucide, Heroicons, Feather).
10. **Universal Component SVG & Quantitative Dimension Locking Rule**: All repeating components across screens (Nav Bar, Headers, Action Buttons, Search Bars, Filter Chips) MUST define explicit SVG vector strings and exact quantitative pixel metrics (`icon_size: 24px x 24px`, `active_label_font_size: 13px`, `inactive_label_font_size: 11px`, `active_pill_height: 56px`, `nav_bar_height: 80px`).
11. **Mandatory Universal Mathematical SVG Vector Injection Directive**: EVERY icon symbol MUST explicitly include raw mathematical SVG vector code. Never use emojis or font placeholders for icons.
12. **Safe Automated Catalog Management Protocol (`design_catalog.json`)**: When extracting reference images, agents may execute safe Node.js scripts (`scripts/add_catalog_blueprint.js`) to parse and validate catalog entries.
13. **Central Project SVG Registry & Autonomous Hardcoding Protocol (`app_theme.json.svg_registry`)**: All icon vector geometries for an app MUST be registered in `app_theme.json` under `svg_registry`.
14. **Contextual Git Commit & User Approval Protocol**: The agent MUST NEVER run `git commit` or `git push` silently. The agent MUST propose the exact commit message and ask for explicit user approval before executing any Git action.
15. **Dedicated UI Design Memory Log Protocol (`docs/04-ui-design/DESIGN-MEMORY.md`)**: Local workspace file inside `docs/04-ui-design/` tracking app goals, active screen versions, design system locks, registered SVG icons, and user preferences. **Isolated from general agent memory to guarantee zero collisions.**

---

## 🔒 Component Consistency & Explicit Locking Protocol

To prevent generative AI drift across screens (such as shifting icons, straight tick quote marks vs curved quote marks, or changing layout alignment between active/inactive states):

1. **Embedded SVG Vector Mandate**: Every locked component tab/button in `app_theme.json` includes an immutable `svg_vector` string containing the exact SVG `<path>` data.
2. **Dual Active vs. Inactive Layout Directives**:
   - **Active State Layout**: `HORIZONTAL_INLINE_SIDE_BY_SIDE` (icon left of label inside active pill).
   - **Inactive State Layout**: `VERTICAL_STACK_ICON_TOP_LABEL_BOTTOM` (icon centered top, label centered bottom).
3. **Quantitative Pixel & Font Dimension Locking**:
   - Icon dimensions: `24px x 24px` standard vector size.
   - Typography sizes: Active label = `13px` bold, Inactive label = `11px` medium, Header titles = `26px` display, Subtitles = `14px`.
   - Container metrics: Nav bar height = `80px`, Active pill height = `56px`, Corner radius = `32px`.

---

## 📋 Hardcoded Unabridged Output Prompt Examples

The agent MUST follow these exact output formats when executing `/ui-flow`, `/app-icon`, and `/app-screenshots`.

### 1. Hardcoded Example Output Prompt: `/ui-flow` (Google Stitch Screen Format)

Below is an unabridged, copy-pasteable example of a compiled Google Stitch UI screen prompt for a Home Dashboard flow:

```markdown
=== GOOGLE STITCH PROMPT SPECIFICATION ===
Target Platform: Mobile Smartphone App Screen (Vertical 9:16 Portrait)
Target App Name: StreakStudio (5-Sec Video Habit Journal)
Active Theme Profile: "Cyber Obsidian Dark" (cyber_obsidian)
Design Title: StreakStudio Home Daily Streak Feed & 5s Video Recorder Screen
Target Viewport: Mobile Smartphone App Screen (Vertical 9:16 Portrait)
Screen Category: home

[CRITICAL CANVAS ASPECT RATIO INSTRUCTION]
Canvas Type: Mobile Phone App Screen (Narrow Vertical Portrait 9:16 aspect ratio).
Do NOT render a widescreen desktop dashboard, web browser canvas, or wide tablet container. The generated UI canvas MUST be a standard narrow vertical smartphone app screen.

[GOAL & INSTRUCTIONS FOR GOOGLE STITCH]
Generate a high-fidelity mobile app screen for StreakStudio using the exact structural layout, component positions, and element scale below. Apply the specified app color palette and styling tokens into the design.

[EMBEDDED MATHEMATICAL SVG VECTOR ICON MANDATE]
CRITICAL MANDATORY DIRECTIVE FOR ALL ICONS:
- EVERY SINGLE ICON on this screen MUST BE DRAWN USING EXPLICIT MATHEMATICAL SVG PATH DATA (<svg width="..." height="..." viewBox="0 0 24 24"><path d="..."/></svg>).
- Do NOT use emojis, text placeholders, or generic font names for icons under any circumstances!

[PROJECT CENTRAL SVG REGISTRY (APP_THEME.JSON)]
{
  "flame_streak": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FF6D00\" stroke-width=\"2\"><path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/></svg>",
  "video_camera": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#00E5FF\" stroke-width=\"2\"><polygon points=\"23 7 16 12 23 17 23 7\"/><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\" ry=\"2\"/></svg>",
  "plus_add": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2.5\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg>"
}

[APP DESIGN SYSTEM COLOR PALETTE & TYPOGRAPHY]
- Primary Brand Accent: #00E5FF (Electric Cyan)
- Secondary Vibe Accent: #FF6D00 (Flame Orange)
- Surface Background: #090A0F (Cyber Obsidian)
- Container Surface: #181B26
- High-Contrast Text: #FFFFFF (Font: Plus Jakarta Sans Bold)
- Body & Muted Text: #A0A5B5 (Font: Inter Medium)
- Subtle Border: #232736

[EXACT LAYOUT & COMPONENT BLUEPRINT]
1. Header Bar (56px Height):
   - Left: App Mascot Icon (Sparky Flame) + Title "StreakStudio" (Font: Plus Jakarta Sans 22px Bold, Color: #FFFFFF).
   - Right: Active Streak Counter Pill (#181B26 background, 1.5px #232736 border, rounded-full) containing SVG Flame Icon + Text "14 Days 🔥" (#FF6D00, 14px SemiBold).

2. Hero Daily Action Card (#181B26 background, 24px rounded corners, 1.5px #00E5FF border):
   - Card Badge: "TODAY'S 5-SEC HABIT" (#00E5FF background, #090A0F text, 11px Bold, 6px padding).
   - Card Title: "Record Your 5-Second Morning Workout Clip" (Font: Plus Jakarta Sans 18px Bold, #FFFFFF).
   - Center Visual: Video Viewport Frame (9:16 thumbnail preview with dark low-opacity overlay) featuring camera shutter button icon (64px circle, #00E5FF fill, white inner ring).
   - CTA Primary Action Button: Full-width 52px height stadium pill button (#00E5FF solid fill, #090A0F text, Plus Jakarta Sans 16px Bold) reading "Hold to Record 5s Clip".

3. Daily Streak Milestones Grid:
   - Section Title: "Weekly Consistency" (#FFFFFF 16px Bold).
   - 7 Day Tracker Pills (Mon - Sun): Completed days (Mon-Fri) rendered in solid #FF6D00 fill with white checkmarks; Today (Sat) pulsing cyan ring; Sun locked gray.

[LOCKED APP NAVIGATION SYSTEM]
Render ONLY this single floating stadium pill navigation bar (80px height, 32px corner radius, #18181B dark surface container):
- Tab 1 [Home - Active]: #00E5FF highlighted pill container, icon + "Today" label.
- Tab 2 [Streaks]: Muted text #A0A5B5, flame icon + "Streaks" label.
- Tab 3 [Memories]: Muted text #A0A5B5, video gallery icon + "Memories" label.
- Tab 4 [Profile]: Muted text #A0A5B5, user icon + "Profile" label.

[STRICT GENERATION CONSTRAINTS]
1. MOBILE PORTRAIT CANVAS ONLY (9:16 Portrait Aspect Ratio).
2. ZERO SHADOWS & ZERO GLOWS (Flat 2D surfaces only).
3. ZERO ANIMATION RULE (100% static UI render).
4. LOCKED SINGLE NAVIGATION BAR (Do NOT render multiple nav bars).
============================================================
```

---

### 2. Hardcoded Example Output Prompt: `/app-icon` (Dual-Prompt Standard)

Below is an unabridged, copy-pasteable example of an `/app-icon` exploration suite delivering dual prompts:

```markdown
# 📱 App Icon Design Exploration: StreakStudio — 5-Sec Video Habit Journal

## 🎨 Design Vision & Canvas Specs
- **App Concept**: 5-Second Video Habit Journal & Daily Streak Tracker
- **Brand Vibe**: Energetic, Tactile, Modern, Cyber Obsidian & Flame Orange
- **Canvas Requirements**: Standard App Icon (1:1 Square with rounded squircle mask framing, high contrast, zero tiny text)

---

### VARIANT A: Google Stitch Canvas Exploration Prompt
*(Copy-paste into Google Stitch for a clean, vector 2D design system icon spec)*

```
=== GOOGLE STITCH APP ICON SPECIFICATION ===
Target Platform: Mobile App Icon Spec (1:1 Aspect Ratio Canvas)
App Name: StreakStudio
Brand Colors: #00E5FF (Electric Cyan), #FF6D00 (Flame Orange), #090A0F (Cyber Obsidian)

[GOAL & INSTRUCTIONS FOR GOOGLE STITCH]
Generate an App Store high-resolution mobile app icon on a 1:1 square canvas with iOS squircle corner mask framing.

[VISUAL COMPOSITION BLUEPRINT]
- Icon Container: Dark obsidian gradient background (#090A0F top-left to #12141D bottom-right) with a subtle 2px #00E5FF border highlight around the squircle edge.
- Central Emblem: A stylized dual-symbol fusion of a 5-second video camera shutter aperture ring intertwined with a vibrant #FF6D00 flame vector symbol.
- Center Shutter Ring: Clean 64px circular aperture ring drawn in #00E5FF solid stroke with a centered play triangle.
- Lighting & Surface: Flat 2D vector graphic aesthetics. Zero photorealistic glossy glass reflection, zero outer ambient neon glow, zero complex gradient mesh.
- Composition Rule: Center the emblem with 25% padding on all sides. Do NOT add app title text inside the icon.

[STRICT GENERATION CONSTRAINTS]
1. 1:1 SQUARE ASPECT RATIO ONLY with rounded squircle boundary.
2. FLAT 2D VECTOR SURFACE ONLY. No 3D render depth or hyper-realistic textures.
3. NO SMALL TEXT INSIDE ICON. Emblem symbol ONLY.
============================================================
```

---

### VARIANT B: ChatGPT / Midjourney / DALL-E / Recraft Generative Prompt
*(Copy-paste into ChatGPT DALL-E 3, Midjourney v6, Ideogram 2, or Recraft V3)*

```
App store icon for a mobile habit tracker app named StreakStudio, 1:1 aspect ratio, centered emblem composition on a dark obsidian background (#090A0F). The icon features a striking minimalistic flat 2D vector logo combining an electric cyan (#00E5FF) video camera shutter ring and a bright flame orange (#FF6D00) streak icon. Clean geometric lines, smooth curves, iOS squircle shape framing, bold colors, professional App Store aesthetic, vector graphic style, high contrast, no words or text, isolated design on dark background --v 6.0 --ar 1:1 --no text, font, photorealism, glossy glass, shadows
```

---

```carousel
![App Icon Variant A Stitch](/app-screens/images/app_icon_variant_a.png)
<!-- slide -->
![App Icon Variant B Midjourney](/app-screens/images/app_icon_variant_b.png)
```
```

---

### 3. Hardcoded Example Output Prompt: `/app-screenshots` (Dual-Prompt Standard)

Below is an unabridged, copy-pasteable example of an `/app-screenshots` App Store marketing storyboard suite delivering dual prompts:

```markdown
# 📸 App Store Marketing Screenshots Storyboard: StreakStudio

## 📐 Storyboard Overview (5 Screenshots + Web Hero Mockup)
- **Screen 1 (Hook)**: "Build Unstoppable Habits in 5 Seconds a Day" (Home Feed & Shutter)
- **Screen 2 (Feature)**: "Record & Lock Your Daily Video Clip" (5s Camera Viewport)
- **Screen 3 (Streaks)**: "Watch Your 30-Day Flame Streak Grow" (Milestone Calendar)
- **Screen 4 (Memories)**: "Relive Your Habit Journey in 1-Min Rewinds" (Video Montage)
- **Screen 5 (Paywall)**: "Unlock Unlimited Cloud Rewinds with Pro" (Paywall Trial Modal)
- **Screen 6 (Web Hero)**: Next.js Storefront Hero Mockup with `shots.so` transparent device framing

---

### SCREEN 1 (THE HOOK): Dual-Prompt Specification

#### VARIANT A: Google Stitch Screenshot Prompt
```
=== GOOGLE STITCH APP STORE SCREENSHOT SPECIFICATION ===
Target Platform: Mobile App Store Marketing Screenshot (Vertical 9:16 Portrait)
App Name: StreakStudio
Screenshot Index: 1 of 5 (Hero Hook Screenshot)

[BACKGROUND CANVAS & TYPOGRAPHY HEADER]
- Top Background: Soft dark ambient gradient (#090A0F to #181B26).
- Headline Banner: "Build Unstoppable Habits in 5 Seconds a Day" (Font: Plus Jakarta Sans 28px ExtraBold, Color: #FFFFFF, Center Aligned).
- Subheadline: "No typing required. Just hold to record your daily win." (Font: Inter 14px Medium, Color: #A0A5B5).

[EMBEDDED DEVICE MOCKUP FRAME]
- Device Framing: Frameless vertical 9:16 iPhone 15 Pro titanium frame tilted at 0 degrees centered in the bottom 70% of the canvas.
- Displayed App Screen: StreakStudio Home Dashboard Screen showing 14-day flame streak counter (#FF6D00), cyan 5s video shutter card (#00E5FF), and bottom stadium pill navbar.

[STRICT CONSTRAINTS]
1. 9:16 PORTRAIT CANVAS ONLY.
2. Professional App Store presentation framing with headline copy at the top and app mockup below.
============================================================
```

#### VARIANT B: ChatGPT / Midjourney / DALL-E / Recraft Prompt
```
App Store promotional screenshot for a mobile video habit app named StreakStudio, 9:16 portrait ratio. Dark premium gradient background (#090A0F). Bold white headline at the top reading 'Build Unstoppable Habits in 5 Seconds a Day'. Centered floating 3D iPhone mockup displaying a dark mode app UI with an electric cyan (#00E5FF) video record button and orange flame (#FF6D00) streak badge. Modern Apple App Store feature graphic style, sleek composition, 8k resolution, vector UI graphics --v 6.0 --ar 9:16
```
```

---

## 📄 File Templates & Full Source Code

### 1. Dedicated UI Design Memory Log Template (`docs/04-ui-design/DESIGN-MEMORY.md`)

```markdown
# 🧠 UI Design System & Screen Memory Log (`docs/04-ui-design/DESIGN-MEMORY.md`)

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
- **Navbar Fill**: Solid Brand Accent, 80px total height, 32px corner radius.
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

## 🚫 Zero Memory Logging Mandate
- Memory updates during UI prompt compilation MUST sit inside `docs/04-ui-design/DESIGN-MEMORY.md` within the project workspace.
- All approved screen prompts sit permanently inside `app-screens/prompts/`.
