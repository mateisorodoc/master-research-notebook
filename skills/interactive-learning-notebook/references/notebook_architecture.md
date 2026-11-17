# Zero-to-Hero Multi-Page Architecture & Data Blueprint

## 1. File Inventory

| File | Responsibility |
|---|---|
| `index.html` | **Home & Mission Control:** Live interactive `<canvas>` hero, XP / Combo / Rank progress (`Novice → Grandmaster`), **Quick 3-Min Weakest-Concept Review** card (`missedQuestions`), **Capstone Exam** unlock card, and Concept Pack grid with mission/quiz badges. |
| `learn.html` + `learn.js` | **Zero-to-Hero Concept Studio:** Horizontal concept rail, **3-Tier Depth Switcher** (`1. Intuition` ↔ `2. Pipeline` ↔ `3. Math & Code`), desktop split-pane / mobile clean vertical flow, **1:1 Dedicated Interactive Lab + 2 Auto-Verified Lab Missions** per concept, and **3-Stage Concept Check** (*Warm-Up*, *Level 2 + Lab*, *Boss Check*). |
| `games.html` | **Mastery Arcade & Capstone Exam:** Live combo multiplier (`2x`, `3x`, `5x`), **5 Game Modes** (*Predict the Outcome*, *Order the Pipeline/Argument*, *Complete the Code/Formula*, *Spot the Flaw*, *60s Blitz*), plus the multi-step **Zero-to-Hero Capstone Challenge**. |
| `map.html` | **Interactive Knowledge Map:** Clickable/tap-friendly dependency graph (`<svg>` + HTML) showing locked/unlocked/mastered status per concept node and deep-linking to `learn.html#<id>`. |
| `glossary.html` | **Searchable Dictionary & Formula/Rule Sheet:** Instant search (`/`) + category chips + deep links + `@media print` cheat-sheet support. |
| `roadmap.html` | **Roadmap, Evidence Ledger & File Map:** Project phases, verified empirical/source table, complete clickable Codebase/Document Map, and `@media print` cheat-sheet support. |
| `styles.css` | Shared responsive CSS implementing the 5 Impeccable Design Worlds (`references/ui_ux_design_system.md`), desktop split-studio, mobile touch carousels & `1fr` grids, bottom nav, and `@media print`. |
| `shared.js` | Theme toggle, `localStorage` state & Rank engine, Web Audio API synthesizer + `navigator.vibrate` + 1-tap Mute, keyboard shortcut router (`1–4`, `Enter`, `J/K`, `D`, `M`, `/`), HiDPI `<canvas>` helper. |
| `notebook-data.js` | Single source of truth (`window.NOTEBOOK_DATA`) holding all verified concepts, 3-tier explanations, lab missions, 5 game modes, capstone exam, map graph, glossary, and file map. |
| `README.md` | Quick-start guide (`index.html` or `python -m http.server`) and sync rules. |

---

## 2. `window.NOTEBOOK_DATA` Schema

```js
window.NOTEBOOK_DATA = {
  meta: {
    title: "Project / Course Title",
    subtitle: "Zero-to-Hero Interactive Learning Platform",
    language: "en", // or "ro", "fr", etc.
    domain: "stem | software | bio | humanities",
    lastUpdated: "YYYY-MM-DD",
    currentPhase: "Current Milestone",
    keyMetrics: [
      { label: "Verified Metric", value: "Exact Value", source: "path/to/source" }
    ]
  },

  concepts: [
    {
      id: "slug-id",
      title: "1. Concept Title",
      phase: "Module / Phase 1",
      tag: "Core Principle",
      labType: "state-space | topology | comparison | timeline | decision-tree | matrix",
      summary: "One-sentence hook explaining why this concept exists.",
      hookPuzzle: "A quick real-world puzzle or failure case that motivates the concept.",
      depth: {
        level1Intuition: "ELI12 visual analogy with zero unexplained jargon.",
        level2Practitioner: "Step-by-step how it works in practice, workflow, and trade-offs.",
        level3Mastery: "Deep formal treatment: derivations, edge cases, complexity, or primary source analysis."
      },
      formalRule: "Exact equation, algorithm signature, statutory rule, or clinical criterion.",
      sourceRef: "src/module.py -> Class.method() (or Document §2.1, p. 14)",
      labConfig: {
        isIllustrative: false, // true if curve is educational model rather than raw log
        missions: [
          {
            id: "m1",
            prompt: "Concrete goal: e.g., Drag parameter X until error < 0.05",
            hint: "What to observe on the canvas.",
            xp: 25
          },
          {
            id: "m2",
            prompt: "Second mission exploring an edge case or trade-off.",
            hint: "Why this boundary matters.",
            xp: 25
          }
        ]
      },
      exercises: [
        {
          tier: "warmup", // Stage 1: Recall & Intuition
          q: "Warm-up question?",
          options: ["Option A", "Option B", "Option C"],
          answer: 0,
          explain: "Clear explanation."
        },
        {
          tier: "predict", // Stage 2: Predict What Happens Next
          q: "If we double parameter X in the lab above, what happens to Y?",
          options: ["Prediction A", "Prediction B", "Prediction C"],
          answer: 1,
          explain: "Why Prediction B happens."
        },
        {
          tier: "boss", // Stage 3: Synthesis / Edge-Case Boss Check
          q: "Diagnostic or multi-constraint question?",
          options: ["Option A", "Option B", "Option C"],
          answer: 2,
          explain: "Deep technical explanation."
        }
      ]
    }
  ],

  games: {
    predictOutcome: [
      {
        id: "po-1",
        conceptId: "slug-id",
        setup: "Given input/state S and action A...",
        q: "What will the system/model output before we run it?",
        options: ["Outcome 1", "Outcome 2", "Outcome 3"],
        answer: 0,
        explain: "Why Outcome 1 occurs."
      }
    ],
    orderPipeline: [
      {
        id: "op-1",
        conceptId: "slug-id",
        title: "Put these steps in the exact causal/execution order:",
        steps: ["Step 1 (first)", "Step 2 (second)", "Step 3 (third)", "Step 4 (fourth)"],
        explain: "Why this exact order is required."
      }
    ],
    fillBlanks: [
      {
        id: "fb-1",
        conceptId: "slug-id",
        prompt: "Code, formula, or principle with ____ blank.",
        choices: ["right_token", "wrong_1", "wrong_2"],
        answer: "right_token",
        explain: "Why right_token fits."
      }
    ],
    spotFlaws: [
      {
        id: "sf-1",
        conceptId: "slug-id",
        scenario: "Buggy code snippet, flawed proof, or broken architecture.",
        options: ["Exact flaw", "Plausible distractor", "Nothing is wrong"],
        answer: 0,
        explain: "How to fix the flaw."
      }
    ],
    linkDecks: [
      {
        title: "Deck Title",
        pairs: [{ left: "Term / Symbol", right: "Verified Meaning / Role" }]
      }
    ]
  },

  capstoneChallenge: {
    title: "Zero-to-Hero Capstone Diagnostic",
    scenario: "End-to-end real-world scenario combining multiple concepts from the project.",
    steps: [
      {
        stepTitle: "Part 1: Diagnose the Bottleneck / Anomaly",
        q: "Question 1...",
        options: ["A", "B", "C"],
        answer: 0,
        explain: "..."
      },
      {
        stepTitle: "Part 2: Select the Architecture / Intervention",
        q: "Question 2...",
        options: ["A", "B", "C"],
        answer: 1,
        explain: "..."
      },
      {
        stepTitle: "Part 3: Verify Constraints & Safety",
        q: "Question 3...",
        options: ["A", "B", "C"],
        answer: 2,
        explain: "..."
      }
    ]
  },

  map: {
    nodes: [{ id: "slug-id", label: "Short Label", x: 120, y: 80, group: "Core", summary: "..." }],
    edges: [["slug-1", "slug-2"]]
  },
  glossary: [{ term: "Term", category: "Category", definition: "...", conceptId: "slug-id" }],
  roadmap: [{ phase: "Phase 1", title: "...", status: "complete | active | planned", deliverables: ["..."] }],
  codebaseMap: [{ path: "path/to/file", role: "Verified role", status: "verified" }]
};
```

---

## 3. `localStorage` State, Rank & Combo Engine (`shared.js`)

```js
// Default state stored in localStorage under `notebook_state_<project_slug>`
{
  xp: 0,
  combo: 0,
  maxCombo: 0,
  streak: 1,
  lastVisit: "YYYY-MM-DD",
  theme: "dark",               // "dark" | "light"
  muted: false,                // Web Audio API mute toggle
  depthLevel: 1,               // 1 (Intuition) | 2 (Practitioner) | 3 (Mastery)
  mastered: [],                // concept IDs where all 3 exercise tiers passed
  labMissionsCleared: [],      // ["slug-id:m1", "slug-id:m2"]
  missedQuestions: [],         // [{ id, conceptId, q, options, answer, explain }]
  capstoneCleared: false
}
```

### Rank Progression Table
Compute the learner's rank dynamically from `xp` and `mastered.length`:
- **Novice:** `0 – 149 XP`
- **Apprentice:** `150 – 399 XP`
- **Practitioner:** `400 – 799 XP`
- **Architect:** `800 – 1199 XP`
- **Grandmaster:** `>= 1200 XP` + `capstoneCleared === true`

---

## 4. The 6 Universal Interactive Lab Archetypes (`learn.js`)

Choose the archetype that best fits each concept (and attach 2–3 auto-verified `labMissions` that check the live state whenever the user drags a slider or clicks the canvas):

1. **`state-space` (2D Canvas Vector Field / Phase Portrait):** Tap/drag target state or parameters; watch live trajectories converge, oscillate, or diverge.
2. **`topology` (Interactive SVG Architecture / Pathway / Montage):** Clickable nodes/layers/organs/electrodes; clicking highlights downstream paths and updates the inspector panel.
3. **`comparison` (Dual-Curve / Ablation Slider Lab):** Live `<canvas>` plotting Method A vs. Method B as the user adjusts parameters (e.g., noise, window size, threshold, dosage, tax rate).
4. **`timeline` (Lifecycle / Epoch / Historical Scrubber):** Scrub across time/steps to inspect active buffers, state transitions, or historical events at step $t$.
5. **`decision-tree` (Interactive Diagnostic / Protocol Simulator):** Step through branching conditions (clinical triage, legal test, compiler dispatch) and see which path lights up.
6. **`matrix` (Payoff / Confusion / Trade-Off Matrix Lab):** Adjust weights, priors, or thresholds and watch cells, ROC operating points, or equilibria shift in real time.

---

## 5. Mandatory Verification Commands

```powershell
# 1. Syntax check every .js file
Get-ChildItem <notebook_dir> -Filter *.js | ForEach-Object { node --check $_.FullName }

# 2. Offline check: must return 0 external CDN/font/script URLs
Select-String -Path "<notebook_dir>\*.*" -Pattern 'https?://(fonts\.|cdn\.|unpkg\.|jsdelivr|cdnjs)'

# 3. Verify all local href/src targets exist in <notebook_dir>
```
