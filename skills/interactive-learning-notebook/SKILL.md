---
name: interactive-learning-notebook
description: >-
  Build and maintain a world-class, zero-dependency, offline-ready, mobile- and
  desktop-optimized multi-page HTML/CSS/JS interactive learning platform ("Zero
  to Hero") from any code, research, or documentation folder. Supports any
  field, human language, and skill level with 3-tier adaptive depth,
  mission-driven interactive labs, synthesized Web Audio feedback, 5 arcade
  game modes, a multi-step Capstone exam, 5 dark/light theme pairs, and strict
  anti-fabrication verification.
---

# Zero-to-Hero Interactive Learning Notebook Builder

Transform any codebase, research repository, course packet, or documentation folder into a **Brilliant.org + 3Blue1Brown + Duolingo-caliber interactive learning platform** (`HTML` + `CSS` + vanilla `JS`) that runs **100% offline** on both mobile phones and desktop monitors.

---

## 1. Universal Adaptability (Any Field, Language, or Level)

This skill adapts to **any subject matter, human language, or learner background**:

| Domain Profile | Level 1 (`Intuition`) | Level 2 (`Practitioner`) | Level 3 (`Mastery / Formal`) | Typical Interactive Labs |
|---|---|---|---|---|
| **STEM / ML / Signal Processing / Control** | Everyday physical analogies & visual intuition | Block diagrams, algorithms, step-by-step pipeline | Exact LaTeX/Unicode equations, derivations, verified source code & complexity | 2D state-space `<canvas>`, signal/filter sliders, causality/ablation comparators |
| **Software Engineering / Systems / DevTools** | Mental model & "why naive code breaks" | Request/data lifecycle, module boundaries, API contracts | Exact file/line code walkthroughs, edge cases, concurrency & latency trade-offs | Interactive architecture `<svg>`, request-scrubber timeline, cache/throughput simulator |
| **Medicine / Biology / Chemistry** | Physiological story & patient/molecular analogy | Mechanism of action, diagnostic pathway, lab markers | Primary trial data, receptor/pathway kinetics, differential diagnosis criteria | Pathway node inspector, dose-response / biomarker curve lab, clinical decision tree |
| **Humanities / Law / Economics / Business** | Core conflict, historical hook, or real-world case | Competing frameworks, timeline of events, stakeholder incentives | Primary source texts, statutory/doctrinal rules, mathematical models or counter-arguments | Interactive timeline scrubber, stakeholder payoff matrix, causal argument graph |

- **Human Language Adaptation:** Generate all UI chrome, explanations, hints, missions, and games in the user's requested human language (English, Romanian, French, German, Spanish, etc.).

---

## 2. Core Non-Negotiable Rules

1. **Strict ≤ 5-Question Intake Cap:** Ask **at most 5** setup questions before building. Skip any question already answered in the user's prompt.
2. **100% Offline / Zero External Dependencies:** Never emit `http://` or `https://` `<script>`, `<link>`, `@import`, or font CDN URLs. Everything—including sound effects (Web Audio API), graphics (`<canvas>` / inline `<svg>`), and fonts—must work offline via `file://` or `python -m http.server`.
3. **Zero Fabrication & Direct-Source Traceability:** Every file path, function/symbol name, formula, historical/clinical fact, benchmark metric, and test count MUST come directly from the target folder. Mark missing or unrun items `[UNVERIFIED / NOT YET RUN]`. Clearly label simulated curves in interactive labs as illustrative when they are not raw empirical logs.
4. **User Choice on Existing Notebooks:** If the output folder already contains `index.html` or `notebook-data.js`, **never overwrite silently**. Ask the user to choose: **(a) Audit & Incrementally Update** or **(b) Clean Rebuild**.
5. **Impeccable Mobile + Desktop UI/UX:** Follow `references/ui_ux_design_system.md` strictly:
   - **5 Dark/Light Theme Pairs** with WCAG AA contrast (`>= 4.5:1`).
   - **Mobile (`< 860px`):**
     - Fixed bottom tab bar (all 6 destinations reachable: `Home`, `Learn`, `Arcade`, `Map`, `Glossary`, `Roadmap`), `>= 44×44px` tap targets, and `padding-bottom: 96px` on `<main>`.
     - Compact wrapping `.topbar` (`height: auto; flex-wrap: wrap;`), icon-only SVG mute/theme buttons, compact XP badge, and capped `.theme-select` (`max-width: 122px`) so `360px` phones never overflow horizontally.
     - **Never** make `<canvas>` `position: sticky` inside a vertical mobile scroll stack (it floats over and blocks sliders/quiz cards below it); keep canvases in natural flow (`position: relative`), force `.grid-2` / `.grid-3` / `.mission-bar` to `1fr`, make `.world-strip` and `.pack-tabs` single-row horizontal touch carousels (`scroll-snap-type: x mandatory`), make `.depth-bar` a full-width 3-column grid, wrap wide diagrams in `.map-scroll-wrap { overflow-x: auto }` (`min-width: 680px`), and bind `pointerdown` (not just `click`) on interactive canvases.
   - **Desktop (`>= 1024px`):** Split-studio layout on `learn.html` (Theory & Depth switcher on the left, live Interactive Lab + Missions pinned on the right) + full keyboard shortcuts (`1–4`, `Enter`, `J/K`, `D`, `M`, `/`).
   - **Craft Floor Bans:** No eyebrow/kicker labels above headings, no gradient text, no emoji as UI chrome icons (use crisp inline `<svg>`), no ghost cards (border OR shadow, never both).
6. **Zero-to-Hero Learning Mechanics & Strict 1:1 Alignment Built In:**
   - **Strict 1:1 Alignment (`Theory ↔ Dedicated Lab ↔ Mastery Check`):** Every concept ($1 \dots N$) MUST have its own **dedicated, concept-specific Interactive Lab** ($N$ concepts = $N$ distinct labs; never share a generic lab across concepts). Nothing in Theory may be omitted in the Lab, and **100% of Mastery Check questions (`Tier 1 Warm-Up`, `Tier 2 + Lab`, `Tier 3 Boss Check`) must test strictly what was taught in that concept's Theory and Lab**.
   - **3 Radically Distinct Depth Tiers:** Never reuse the same paragraph across depth levels!
     - `Level 1 (Intuition / ELI12)`: Story-driven analogy, zero jargon, *"Why Naive Approaches Fail"*, and *"Hands-On Lab Connection"*.
     - `Level 2 (Practitioner Pipeline)`: 4-stage numbered execution pipeline, concrete parameter trade-offs, and *"Lab Mission Guide"*.
     - `Level 3 (Mastery / Formal)`: Exact equations/rules, symbol-by-symbol variable dictionary, and verified file/method walkthrough + audit proof.
   - **5 Distinct Impeccable Design Worlds (Not Just Hex Color Swaps):** Each theme (`01 · 3b1b Cinema`, `02 · Starship Crew Terminal`, `03 · Miura Fold Sheet`, `04 · VU Meter Bridge`, `05 · Shallow Basin`) transforms typography, corner radii (`0px` HUD vs `2px` origami fold vs `6px` hardware bezel vs `14px` theater vs `22px` organic basin), surface texture, and button/meter chrome in both Dark and Light modes.
   - **Goal-Driven Lab Missions:** Every Interactive Lab includes **2–3 interactive missions** that auto-verify when the learner hits the target state on the canvas/controls and award `+25 XP`.
   - **Tactile Web Audio + Haptics:** Offline Web Audio API synthesizer (subtle tap, correct chime, combo fanfare, mission-clear chord) + mobile `navigator.vibrate`, with a persistent 1-tap **Mute** toggle.
   - **Weakest-Concepts Review Queue:** Missed questions automatically enter a `localStorage` review queue surfaced as a **"Quick 3-Min Review"** button on `index.html`.
   - **Unlockable Capstone Challenge ("Final Boss"):** Multi-step diagnostic scenario on `games.html` / `index.html` that synthesizes all concepts in the notebook.
   - **Print / PDF Study Cheat-Sheet (`@media print`):** Clean 1-click printable reference on `roadmap.html` and `glossary.html`.

---

## 3. Step-by-Step Workflow

### Step 1: Intake (Ask ≤ 5 Questions)
Ask only what is not already specified:
1. **Source & Output Mode:** Which folder should I read, and where should I write the notebook (default: `project_notebook/`)? *(If it already exists: **Audit & Update** or **Clean Rebuild**?)*
2. **Learner Profile & Language:** What is your starting level (complete beginner to expert), and which human language should the notebook use?
3. **Theme Pair (Dark + Light Toggle):** Pick one of the 5 built-in pairs from `references/ui_ux_design_system.md`:
   - `1` — **3Blue1Brown Midnight & Chalk** *(Math / Science / Control)*
   - `2` — **Nordic Slate & Paper** *(Systems / Docs / Engineering)*
   - `3` — **Emerald Lab & Botanical** *(Bio / Medicine / Data)*
   - `4` — **Warm Espresso & Parchment** *(Humanities / Law / Deep Reading)*
   - `5` — **Obsidian Studio & Crisp Ivory** *(Software / Compilers / DevTools)*
4. **Priority Concepts & Labs:** Any specific modules, equations, or workflows you want emphasized in the interactive labs and Capstone exam?
5. **Permanent Sync Rule:** Should I add a sync rule to `AGENTS.md` / `CLAUDE.md` so future project edits automatically update the notebook?

### Step 2: Deep Source Audit & Curriculum Design
1. Inspect the target directory's files, code, docs, configs, tests, and results.
2. Read `references/pedagogy_and_games.md` and organize the material into **6 to 12 Concept Mastery Packs** ordered along a strict dependency graph (so Concept $k$ only uses ideas introduced in Concepts $1 \dots k-1$).
3. Record exact verified metrics, formulas, and file paths for the Evidence Ledger and Codebase Map.

### Step 3: Generate the 6-Page Platform
Read `references/notebook_architecture.md` and `references/ui_ux_design_system.md` and generate:
- `index.html` — **Home & Mission Control** (live interactive `<canvas>` hero, XP / Combo / Rank badge `Novice → Grandmaster`, **Quick 3-Min Weakest-Concept Review**, **Capstone Exam** status card, and Concept Pack grid).
- `learn.html` + `learn.js` — **Zero-to-Hero Concept Studio** (3-Tier Depth Switcher, desktop split-screen / mobile clean vertical flow, 1:1 dedicated Interactive Lab with 2–3 auto-verified **Lab Missions** per concept, and 3-stage **Concept Mastery Check**: *Warm-Up*, *Level 2 + Lab*, *Boss Check*).
- `games.html` — **Mastery Arcade & Capstone Exam** (Combo multiplier `2x/3x/5x`, 5 game modes: *Predict the Outcome*, *Order the Pipeline*, *Complete the Code/Formula*, *Spot the Flaw*, *60s Blitz*, plus the multi-step **Zero-to-Hero Capstone Challenge**).
- `map.html` — **Interactive Knowledge Map** (clickable/tap-friendly dependency graph showing mastery status per node and deep-linking to `learn.html#<id>`).
- `glossary.html` — **Searchable Dictionary & Formula/Rule Sheet** (instant search, category chips, deep links, and `@media print` PDF export).
- `roadmap.html` — **Roadmap, Evidence Ledger & File Map** (project phases, verified metrics table, complete clickable file map, and `@media print` PDF export).
- `styles.css`, `shared.js`, `notebook-data.js`, `README.md`.

### Step 4: Mandatory Automated Verification
Run all 4 verification checks before finishing:
1. **JS Syntax Check:** Run `node --check` on every `.js` file (`notebook-data.js`, `shared.js`, `learn.js`, etc.).
2. **Offline Guarantee Check:** Grep all `.html`, `.css`, and `.js` files for `http://` or `https://` runtime dependencies (must be `0`).
3. **Internal Link & Asset Check:** Verify every `href` and `src` resolves to an existing file on disk.
4. **Fact & Metric Audit:** Verify every number, formula, and file path in `notebook-data.js` matches the source folder.

---

## 4. Reference Files (Load Before Building)

- [references/ui_ux_design_system.md](references/ui_ux_design_system.md) — 5 distinct Impeccable Design Worlds, split-desktop & mobile-responsive CSS rules, craft floor bans, keyboard shortcuts, Web Audio synthesizer spec, and `@media print` rules.
- [references/notebook_architecture.md](references/notebook_architecture.md) — Complete 6-page file blueprint, `window.NOTEBOOK_DATA` schema, `localStorage` state & rank engine, and 6 domain-adaptable interactive lab archetypes.
- [references/pedagogy_and_games.md](references/pedagogy_and_games.md) — How to write 3-tier explanations, design auto-verified Lab Missions, craft the 5 Arcade game modes, and build the multi-step Capstone Challenge.
