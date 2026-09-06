# 🎨 `stitch-ui-skill`

AI UI design system and blueprint catalog for building mobile app screens with Google Stitch.

---

### 📖 Overview

`stitch-ui-skill` is a universal, agent-agnostic UI design system framework. It provides:
- **15 Core Design Rules & Protocols**: Forbids AI visual drift, hardcodes raw mathematical SVG vector icons, enforces flat 2D surfaces (zero drop-shadows & glows), and auto-bootstraps project workspace files.
- **29+ Color-Agnostic Reference Blueprints**: Parsed structural layout JSON definitions extracted from top mobile apps.
- **Project Memory Log Protocol (`MEMORY.md`)**: Maintains local workspace project state across long sessions and different AI tools.
- **Central SVG Icon Registry (`app_theme.json.svg_registry`)**: Single source of truth for all mathematical SVG icon geometries.

---

### 📂 Directory Structure

```
stitch-ui-skill/
├── SKILL.md                 <── Master Rulebook, Directives & Production Script Templates
├── README.md                <── Skill Installation & Overview Guide
└── resources/               <── Shared Master Assets
    └── design_catalog.json  <── Master Color-Agnostic Blueprint Library (29+ Blueprints)
```

---

### 🚀 How to Use in Any App Project

1. **Clone the Skill into your Project**:
   ```bash
   git clone https://github.com/thenerxboy/stitch-ui-design-skill.git .agents/skills/stitch-ui-skill
   ```

2. **Instruct ANY AI Agent (Claude Code, Cursor, Antigravity, ChatGPT)**:
   > *"Read `SKILL.md` inside `.agents/skills/stitch-ui-skill/` and bootstrap this app project workspace."*

3. The AI agent will automatically create `app_theme.json`, `MEMORY.md`, and `stitch_formatter.js` in your project root and start building high-fidelity prompts!
