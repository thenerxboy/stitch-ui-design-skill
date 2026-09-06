# 🎨 `stitch-ui-skill`

Universal AI Agent UI Design System & Prompt Compilation Framework for Google Stitch, ChatGPT, Midjourney, and Generative UI Workflows.

---

### 📖 Overview

`stitch-ui-skill` is an enterprise-grade, agent-agnostic UI design system framework designed for mobile app developers and AI design agents. It standardizes visual layout extraction, color-agnostic blueprint cataloging, brand design token injection, mathematical SVG vector icon locking, and dual-prompt generation for App Icons and App Store Marketing Screenshots.

---

### ⚡ Shortcut Commands & Trigger Flags

You can invoke `stitch-ui-skill` in any AI assistant (Antigravity, Claude Code, Cursor, Windsurf, ChatGPT) using these shortcut commands:

| Command / Shortcut | Action / Behavior | Output Format |
| :--- | :--- | :--- |
| **`/ui-help`** | Displays complete manual overview, file schemas, workflow phases, CLI flags, and rules. | Summary Text |
| **`/ui-shortcuts`** | Displays fast reference list of all available `/ui-*` shortcut triggers. | Summary Text |
| **`/ui-flow`** | Compiles UI screen prompt blueprints organized by user flow (Onboarding & Auth, Activation & Paywall, Main App Tabs, Happy Path Core Loop). Ingests `docs/` for real copy. | **Google Stitch Prompt ONLY** |
| **`/app-icon`** | Generates 5 distinct logo exploration concept canvases (Mascot, Metaphor, Lettermark, Geometric, Wordmark) for the app brand. | **Dual-Prompt Standard** (Variant A: Stitch + Variant B: ChatGPT / Midjourney) |
| **`/app-screenshots`** | Generates 5 panoramic App Store marketing screenshots + 1 Next.js web storefront hero mockup screen (`shots.so` framing). | **Dual-Prompt Standard** (Variant A: Stitch + Variant B: ChatGPT / Midjourney) |
| **`/ui-init`** | Auto-creates `app_theme.json`, `design_catalog.json`, `app-screens/` folder, and `docs/04-ui-design/DESIGN-MEMORY.md` in current project root. | Workspace Bootstrap |
| **`/ui-extract`** | Extracts attached reference screenshot into color-agnostic JSON blueprint via `scripts/add_catalog_blueprint.js` and appends to `design_catalog.json`. | Catalog Blueprint JSON |
| **`/ui-compile`** | Compiles a Stitch prompt for a specific screen from `design_catalog.json` with domain adaptation (`node scripts/stitch_formatter.js --app_domain`). | **Google Stitch Prompt ONLY** |
| **`/ui-sync`** | Batch compiles & updates ALL archived screen prompts in `app-screens/` to reflect global theme changes (`node scripts/stitch_formatter.js --all`). | Formatter Sync |
| **`/ui-approve`** | Saves current approved Google Stitch prompt into `app-screens/prompts/<screen_id>.md` and updates `docs/04-ui-design/DESIGN-MEMORY.md`. | Markdown File Archive |

---

### 🏛️ System Architecture

```
stitch-ui-skill/ (GitHub Skill Repository Root)
├── SKILL.md                 <── Master Rulebook, Directives & Hardcoded Output Examples
├── README.md                <── Skill Installation & Overview Guide
├── scripts/
│   ├── stitch_formatter.js  <── CLI Prompt Compiler Script
│   └── add_catalog_blueprint.js <── Safe Catalog Blueprint Extractor
└── resources/
    └── design_catalog.json  <── Master Color-Agnostic Blueprint Library
```

#### Workspace Project Integration:
```
[Project Root]/ (App Workspace Folder)
├── app_theme.json           <── Local App Theme, Google Fonts & SVG Registry
├── design_catalog.json      <── Local Copy of Master Blueprint Library
├── app-screens/             <── Active Screen Prompts & Screenshots Directory
│   ├── prompts/             <── Compiled Google Stitch Prompt Blueprints (.md)
│   └── images/              <── Rendered UI Screenshots (.png / .jpg)
└── docs/
    ├── 01-app-brief/        <── Product Identity, Mascot, Vibe & Copy
    ├── 02-prd-research/     <── ARCH-PRD System Architecture & Features
    ├── 03-tech-stack/       <── TECH-STACK & app-features Monorepo Decompositions
    └── 04-ui-design/        <── DESIGN-MEMORY.md (Dedicated UI State & Version Log)
```

---

### 🎨 Key Capabilities & Guardrails

1. **Dual-Prompt Standard (`/app-icon` & `/app-screenshots`)**:
   - Delivers **Variant A** (Google Stitch design system vector spec) and **Variant B** (ChatGPT / Midjourney / Ideogram / Recraft generative prompt) for App Icons and App Store Marketing Screenshots.
2. **PRD Content Extraction Mandate (Zero Dummy Text Rule)**:
   - Ingests real copy, titles, feature names, mascot voice snippets, and CTA microcopy directly from `docs/`.
   - Zero tolerance for placeholder strings ("Lorem Ipsum", "John Doe", "$99", "Sample User").
3. **Dedicated UI Memory Log (`docs/04-ui-design/DESIGN-MEMORY.md`)**:
   - Dedicated workspace memory log tracking active screen versions (`home_v1.md`), active brand themes (`cyber_obsidian`), approved Google Fonts pairings, locked stadium pill navbar specs, and registered SVG icons.
   - **Guarantees zero collisions** with main AI agent memory (`MEMORY.md`).
4. **Central SVG Icon Registry (`app_theme.json.svg_registry`)**:
   - Single source of truth for all mathematical SVG icon geometries (`<svg viewBox="..." ...><path d="..."/></svg>`).
   - Hardcodes raw mathematical SVG code into every compiled prompt to eliminate icon drift across screens.
5. **Mobile Portrait Canvas Mandate (9:16 Aspect Ratio)**:
   - Enforces narrow vertical smartphone app screen canvases with flat 2D surfaces (zero drop-shadows, zero ambient glows, zero animation).

---

### 🚀 Installation & Usage

#### 1. Install Skill into Your Monorepo Workspace
Clone this repository directly into your project's `.agents/skills/` directory:

```bash
git clone https://github.com/thenerxboy/stitch-ui-design-skill.git .agents/skills/stitch-ui-skill
```

#### 2. Invoke the Skill
Instruct any AI assistant:
> *"Run `/ui-flow` to compile prompt blueprints for my onboarding and main app tabs"*  
> *"Run `/app-icon` to generate 5 logo exploration prompts for Google Stitch and Midjourney"*  
> *"Run `/app-screenshots` to generate App Store marketing screenshot prompts"*

---

### 📄 License

MIT License. Free for open-source and commercial applications.
