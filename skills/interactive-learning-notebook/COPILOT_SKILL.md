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

# Zero-to-Hero Interactive Learning Notebook Builder (All-in-One Skill)

Transform any codebase, research repository, course packet, or documentation folder into a **Brilliant.org + 3Blue1Brown + Duolingo-caliber interactive learning platform** (`HTML` + `CSS` + vanilla `JS`) that runs **100% offline** on both mobile phones and desktop monitors.

---

## 1. Universal Adaptability (Any Field, Language, or Level)

Adapt to **any subject matter, human language, or learner background**:

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
5. **Impeccable Mobile + Desktop UI/UX:**
   - **5 Dark/Light Theme Pairs** with WCAG AA contrast (`>= 4.5:1`).
   - **Mobile (`< 768px`):** Fixed bottom tab bar (`<= 5` tabs), `>= 44×44px` tap targets, and **sticky compact `<canvas>` viewport** above lab sliders so users never scroll up and down on their phone to see a slider's effect.
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
   - **Tactile Web Audio + Haptics:** Offline Web Audio API synthesizer (`tap`, `correct`, `combo`, `missionClear`, `wrong`) + mobile `navigator.vibrate`, with a persistent 1-tap **Mute** toggle.
   - **Weakest-Concepts Review Queue:** Missed questions automatically enter a `localStorage` review queue surfaced as a **"Quick 3-Min Review"** button on `index.html`.
   - **Unlockable Capstone Challenge ("Final Boss"):** Multi-step diagnostic scenario on `games.html` / `index.html` that synthesizes all concepts in the notebook.
   - **Print / PDF Study Cheat-Sheet (`@media print`):** Clean 1-click printable reference on `roadmap.html` and `glossary.html`.

---

## 3. Step-by-Step Workflow

### Step 1: Intake (Ask ≤ 5 Questions)
Ask only what is not already specified:
1. **Source & Output Mode:** Which folder should I read, and where should I write the notebook (default: `project_notebook/`)? *(If it already exists: **Audit & Update** or **Clean Rebuild**?)*
2. **Learner Profile & Language:** What is your starting level (complete beginner to expert), and which human language should the notebook use?
3. **Theme Pair (Dark + Light Toggle):** Pick one of the 5 built-in pairs:
   - `1` — **3Blue1Brown Midnight & Chalk** *(Math / Science / Control)*
   - `2` — **Nordic Slate & Paper** *(Systems / Docs / Engineering)*
   - `3` — **Emerald Lab & Botanical** *(Bio / Medicine / Data)*
   - `4` — **Warm Espresso & Parchment** *(Humanities / Law / Deep Reading)*
   - `5` — **Obsidian Studio & Crisp Ivory** *(Software / Compilers / DevTools)*
4. **Priority Concepts & Labs:** Any specific modules, equations, or workflows you want emphasized in the interactive labs and Capstone exam?
5. **Permanent Sync Rule:** Should I add a sync rule to `AGENTS.md` / `CLAUDE.md` / `.github/copilot-instructions.md` so future project edits automatically update the notebook?

### Step 2: Deep Source Audit & Curriculum Design
1. Inspect the target directory's files, code, docs, configs, tests, and results.
2. Organize the material into **6 to 12 Concept Mastery Packs** ordered along a strict dependency graph (so Concept $k$ only uses ideas introduced in Concepts $1 \dots k-1$).
3. Record exact verified metrics, formulas, and file paths for the Evidence Ledger and Codebase Map.

### Step 3: Generate the 6-Page Platform
- `index.html` — **Home & Mission Control** (live interactive `<canvas>` hero, XP / Combo / Rank badge `Novice → Grandmaster`, **Quick 3-Min Weakest-Concept Review**, **Capstone Exam** status card, and Concept Pack grid).
- `learn.html` + `learn.js` — **Zero-to-Hero Concept Studio** (sticky 3-Tier Depth Switcher, desktop split-screen / mobile sticky-canvas layout, 2–3 auto-verified **Lab Missions** per lab, and 3-stage **Concept Mastery Check**: *Warm-Up*, *Predict the Output*, *Boss Question*).
- `games.html` — **Mastery Arcade & Capstone Exam** (Combo multiplier `2x/3x/5x`, 5 game modes: *Predict the Outcome*, *Order the Pipeline*, *Complete the Code/Formula*, *Spot the Flaw*, *60s Blitz*, plus the multi-step **Zero-to-Hero Capstone Challenge**).
- `map.html` — **Interactive Knowledge Map** (clickable/tap-friendly dependency graph showing mastery status per node and deep-linking to `learn.html#<id>`).
- `glossary.html` — **Searchable Dictionary & Formula/Rule Sheet** (instant search, category chips, deep links, and `@media print` PDF export).
- `roadmap.html` — **Roadmap, Evidence Ledger & File Map** (project phases, verified metrics table, complete clickable file map, and `@media print` PDF export).
- `styles.css`, `shared.js`, `notebook-data.js`, `README.md`.

### Step 4: Mandatory Automated Verification
1. **JS Syntax Check:** Run `node --check` on every `.js` file (`notebook-data.js`, `shared.js`, `learn.js`, etc.).
2. **Offline Guarantee Check:** Search all `.html`, `.css`, and `.js` files for `http://` or `https://` runtime dependencies (must be `0`).
3. **Internal Link & Asset Check:** Verify every `href` and `src` resolves to an existing file on disk.
4. **Fact & Metric Audit:** Verify every number, formula, and file path in `notebook-data.js` matches the source folder.

---

## 4. The 5 Dark / Light Theme Pairs & UI/UX Tokens (`styles.css`)

### Pair 1: 3Blue1Brown Midnight & Chalk *(Math, Science, Control, Physics)*
```css
:root, body[data-theme-pair="1"] {
  --bg: #0b0e14; --bg-elev: #121722; --bg-card: #161c2a; --bg-code: #090c11;
  --border: #252f42; --border-strong: #374663;
  --text: #eef2f7; --text-muted: #9aa7bd;
  --accent-1: #58c4dd; --accent-1-dim: rgba(88, 196, 221, 0.14);
  --accent-2: #f9c846; --accent-2-dim: rgba(249, 200, 70, 0.14);
  --accent-3: #83c167; --accent-3-dim: rgba(131, 193, 103, 0.15);
  --accent-4: #fc6255; --accent-4-dim: rgba(252, 98, 85, 0.15);
  --accent-5: #9a72ac; --accent-5-dim: rgba(154, 114, 172, 0.16);
}
body.light-theme, body.light-theme[data-theme-pair="1"] {
  --bg: #f6f7f9; --bg-elev: #ffffff; --bg-card: #ffffff; --bg-code: #edf1f7;
  --border: #d5dce6; --border-strong: #9fb0c7;
  --text: #111827; --text-muted: #4b5563;
  --accent-1: #0e7490; --accent-1-dim: rgba(14, 116, 144, 0.11);
  --accent-2: #b45309; --accent-2-dim: rgba(180, 83, 9, 0.11);
  --accent-3: #15803d; --accent-3-dim: rgba(21, 128, 61, 0.11);
  --accent-4: #b91c1c; --accent-4-dim: rgba(185, 28, 28, 0.11);
  --accent-5: #6d28d9; --accent-5-dim: rgba(109, 40, 217, 0.11);
}
```

### Pair 2: Nordic Slate & Paper *(Systems, Architecture, Technical Docs)*
```css
body[data-theme-pair="2"] {
  --bg: #11161d; --bg-elev: #171e28; --bg-card: #1c2430; --bg-code: #0c1016;
  --border: #2a3444; --border-strong: #3f4e65;
  --text: #e6edf3; --text-muted: #93a1b5;
  --accent-1: #6cb6ff; --accent-1-dim: rgba(108, 182, 255, 0.14);
  --accent-2: #d29922; --accent-2-dim: rgba(210, 153, 34, 0.14);
  --accent-3: #57ab5a; --accent-3-dim: rgba(87, 171, 90, 0.14);
  --accent-4: #f47067; --accent-4-dim: rgba(244, 112, 103, 0.14);
  --accent-5: #b083f0; --accent-5-dim: rgba(176, 131, 240, 0.15);
}
body.light-theme[data-theme-pair="2"] {
  --bg: #f8fafc; --bg-elev: #ffffff; --bg-card: #ffffff; --bg-code: #f1f5f9;
  --border: #cbd5e1; --border-strong: #94a3b8;
  --text: #0f172a; --text-muted: #475569;
  --accent-1: #1d4ed8; --accent-1-dim: rgba(29, 78, 216, 0.10);
  --accent-2: #a16207; --accent-2-dim: rgba(161, 98, 7, 0.10);
  --accent-3: #15803d; --accent-3-dim: rgba(21, 128, 61, 0.10);
  --accent-4: #be123c; --accent-4-dim: rgba(190, 18, 60, 0.10);
  --accent-5: #7e22ce; --accent-5-dim: rgba(126, 34, 206, 0.10);
}
```

### Pair 3: Emerald Lab & Botanical *(Biology, Medicine, Healthcare, Data)*
```css
body[data-theme-pair="3"] {
  --bg: #091310; --bg-elev: #0f1e19; --bg-card: #132620; --bg-code: #060d0b;
  --border: #203c33; --border-strong: #325b4e;
  --text: #e8f3ee; --text-muted: #93b5a7;
  --accent-1: #34d399; --accent-1-dim: rgba(52, 211, 153, 0.14);
  --accent-2: #fbbf24; --accent-2-dim: rgba(251, 191, 36, 0.14);
  --accent-3: #38bdf8; --accent-3-dim: rgba(56, 189, 248, 0.14);
  --accent-4: #fb7185; --accent-4-dim: rgba(251, 113, 133, 0.15);
  --accent-5: #a78bfa; --accent-5-dim: rgba(167, 139, 250, 0.15);
}
body.light-theme[data-theme-pair="3"] {
  --bg: #f4f9f6; --bg-elev: #ffffff; --bg-card: #ffffff; --bg-code: #e8f2ec;
  --border: #c6ddd0; --border-strong: #8fb8a3;
  --text: #0c1f17; --text-muted: #3d5a4e;
  --accent-1: #047857; --accent-1-dim: rgba(4, 120, 87, 0.10);
  --accent-2: #b45309; --accent-2-dim: rgba(180, 83, 9, 0.10);
  --accent-3: #0369a1; --accent-3-dim: rgba(3, 105, 161, 0.10);
  --accent-4: #be123c; --accent-4-dim: rgba(190, 18, 60, 0.10);
  --accent-5: #6d28d9; --accent-5-dim: rgba(109, 40, 217, 0.10);
}
```

### Pair 4: Warm Espresso & Parchment *(Humanities, Law, History, Business)*
```css
body[data-theme-pair="4"] {
  --bg: #151210; --bg-elev: #1e1916; --bg-card: #251f1b; --bg-code: #0f0d0b;
  --border: #3a3029; --border-strong: #56473d;
  --text: #f3ece4; --text-muted: #b8a898;
  --accent-1: #e5a95e; --accent-1-dim: rgba(229, 169, 94, 0.15);
  --accent-2: #7cc49b; --accent-2-dim: rgba(124, 196, 155, 0.14);
  --accent-3: #e07a5f; --accent-3-dim: rgba(224, 122, 95, 0.15);
  --accent-4: #9b8ec4; --accent-4-dim: rgba(155, 142, 196, 0.15);
  --accent-5: #72b4d4; --accent-5-dim: rgba(114, 180, 212, 0.14);
}
body.light-theme[data-theme-pair="4"] {
  --bg: #faf6f0; --bg-elev: #ffffff; --bg-card: #ffffff; --bg-code: #f0e9df;
  --border: #dfd3c3; --border-strong: #bca88e;
  --text: #1f1914; --text-muted: #5c4e41;
  --accent-1: #9a5b13; --accent-1-dim: rgba(154, 91, 19, 0.11);
  --accent-2: #1f6f4a; --accent-2-dim: rgba(31, 111, 74, 0.10);
  --accent-3: #b53d24; --accent-3-dim: rgba(181, 61, 36, 0.10);
  --accent-4: #5b4896; --accent-4-dim: rgba(91, 72, 150, 0.10);
  --accent-5: #1c658c; --accent-5-dim: rgba(28, 101, 140, 0.10);
}
```

### Pair 5: Obsidian Studio & Crisp Ivory *(Software, Compilers, DevTools)*
```css
body[data-theme-pair="5"] {
  --bg: #0d0d12; --bg-elev: #14141d; --bg-card: #1a1a26; --bg-code: #08080c;
  --border: #2a2a3d; --border-strong: #41415e;
  --text: #f0f0f5; --text-muted: #9c9cb4;
  --accent-1: #818cf8; --accent-1-dim: rgba(129, 140, 248, 0.15);
  --accent-2: #22d3ee; --accent-2-dim: rgba(34, 211, 238, 0.14);
  --accent-3: #4ade80; --accent-3-dim: rgba(74, 222, 128, 0.14);
  --accent-4: #f87171; --accent-4-dim: rgba(248, 113, 113, 0.15);
  --accent-5: #fbbf24; --accent-5-dim: rgba(251, 191, 36, 0.14);
}
body.light-theme[data-theme-pair="5"] {
  --bg: #f9f9fb; --bg-elev: #ffffff; --bg-card: #ffffff; --bg-code: #eeeef4;
  --border: #d8d8e6; --border-strong: #a7a7c2;
  --text: #14141b; --text-muted: #4e4e66;
  --accent-1: #4338ca; --accent-1-dim: rgba(67, 56, 202, 0.10);
  --accent-2: #0e7490; --accent-2-dim: rgba(14, 116, 144, 0.10);
  --accent-3: #15803d; --accent-3-dim: rgba(21, 128, 61, 0.10);
  --accent-4: #b91c1c; --accent-4-dim: rgba(185, 28, 28, 0.10);
  --accent-5: #b45309; --accent-5-dim: rgba(180, 83, 9, 0.10);
}
```

### Desktop Split-Studio vs. Mobile Sticky-Viewport Layout
```css
@media (min-width: 1024px) {
  .studio-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: 24px;
    align-items: start;
  }
  .studio-lab-pane {
    position: sticky;
    top: 76px;
    max-height: calc(100vh - 96px);
    overflow-y: auto;
  }
}
@media (max-width: 767px) {
  .lab-canvas-sticky {
    position: sticky;
    top: 58px;
    z-index: 15;
    background: var(--bg-card);
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }
  main { padding-bottom: 92px; }
}
```

---

## 5. `window.NOTEBOOK_DATA` Schema & Pedagogical Structure

- **4-Stage Lesson Arc per Concept:**
  1. `hookPuzzle` — Concrete 2-sentence problem/puzzle before introducing jargon.
  2. `depth` — `{ level1Intuition, level2Practitioner, level3Mastery }` + `formalRule` + `sourceRef`.
  3. `labConfig` — `{ isIllustrative, missions: [{ id, prompt, hint, xp }] }` (auto-detected on slider/canvas change).
  4. `exercises` — 3-rung mastery ladder (`warmup`, `predict`, `boss`).
- **5 Arcade Game Modes (`games.html`):**
  1. `predictOutcome` (bet on the output before running),
  2. `orderPipeline` (tap steps in exact causal/execution order),
  3. `fillBlanks` (code/formula/principle chip builder),
  4. `spotFlaws` (debugger / reviewer mode),
  5. `60s Blitz` & `Weakest-Concept Review` (`missedQuestions`).
- **Multi-Step Capstone Challenge (`capstoneChallenge`):** 3–5 sequential diagnostic steps across the whole project to unlock **Grandmaster** rank.
