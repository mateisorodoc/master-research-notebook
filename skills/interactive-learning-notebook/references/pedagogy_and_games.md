# Zero-to-Hero Pedagogy, Lab Missions & Game Design Guide

A great learning notebook doesn't just dump documentation into HTML—it **teaches** like a master tutor. Follow these rules when authoring `notebook-data.js` and `learn.js`.

---

## 1. The 4-Stage "Zero-to-Hero" Lesson Arc (Per Concept)

Every concept in `learn.html` must guide the student through 4 cognitive stages:

### Stage 1: The Hook Puzzle ("Why Should I Care?")
- Open with `hookPuzzle`: a concrete 2-sentence problem or failure mode that occurs *without* this concept.
  - *Bad:* "This module implements causal Butterworth filtering."
  - *Good:* "Imagine your emotion controller reacts at $t = 2.0\text{ s}$ to a brainwave spike that won't happen until $t = 3.5\text{ s}$. How did your code cheat—and how do we stop it?"

### Stage 2: 3 Radically Distinct Depth Tiers (`1. Intuition` → `2. Practitioner` → `3. Mastery`)
**CRITICAL BAN:** Never display the same paragraph across Level 1, Level 2, and Level 3! Each depth tier MUST have its own distinct structure, voice, and visual chrome (`.depth-tier-card.tier-1`, `.tier-2`, `.tier-3`):

- **Level 1 (`level1` — Intuition & Everyday Mental Model):**
  - `analogy`: Story-driven everyday metaphor (thermostat, prism, orchestra, sailboat) with **zero** unexplained jargon or formulas.
  - `naiveTrap`: *"Why Naive Approaches Fail"* callout box explaining the intuitive trap.
  - `labGuide`: Direct 1-sentence invitation pointing to what to click in the Lab on the right.
- **Level 2 (`level2` — Practitioner Pipeline & Engineering):**
  - `pipeline`: 4 numbered step-by-step execution stages (`.pipeline-step-row`) showing exact inputs → processing → outputs.
  - `tradeoffs`: Real-world engineering trade-offs (why this window length, sampling rate, or architecture was chosen over alternatives).
  - `labGuide`: Concrete guide to clearing Mission 1 and Mission 2 in the Lab.
- **Level 3 (`level3` — Formal Math, Proofs & Source Code):**
  - `math`: Exact equation, formal rule, or statutory/clinical criterion.
  - `variables[]`: Symbol-by-symbol dictionary defining every variable and unit in the formula.
  - `codeWalkthrough`: Exact file path, class/method name, algorithmic implementation, and unit-test/audit proof.

### Stage 3: Strict 1:1 Dedicated Interactive Lab (`N Concepts = N Distinct Labs`)
- **Never** share a generic lab across multiple concepts or omit anything taught in Theory!
- If the notebook has 10 concepts, build **10 distinct Interactive Labs** (`1 per concept`), where the exact parameters, failure modes, and equations taught in that concept's Theory are directly manipulated on the canvas/sliders.
- Every Interactive Lab MUST display a **Lab Missions Bar** (`m1`, `m2`) above the canvas/controls that auto-detects when the learner hits the target state, marks the pill green (`✓ Cleared +25 XP`), and plays `playSound('missionClear')`.

### Stage 4: Strictly Aligned 3-Rung Mastery Check (`100% Derived From Theory + Lab`)
- **Zero Unintroduced Facts:** Every question in a concept's Mastery Check MUST test strictly what was taught in that concept's Level 1, Level 2, Level 3, and Interactive Lab—never ask trivia about facts not covered on the page!
- Structure the 3 questions per concept as a strict 1:1 ladder:
  1. **Q1 (`[Level 1 · Warm-Up]`):** Tests the core mental model and *"Why Naive Approaches Fail"* from Level 1.
  2. **Q2 (`[Level 2 + Lab]`):** Tests the 4-stage pipeline and what the user just observed while completing the Interactive Lab missions.
  3. **Q3 (`[Level 3 · Boss Check]`):** Tests the formal equation, variable definitions, or verified code/audit proof from Level 3.

---

## 2. Designing Addictive Arcade Games (`games.html`)

Include a live **Combo Multiplier** (`1x` → `2x` after 2 in a row → `3x` after 4 → `5x` after 6+) and all **5 Game Modes**:

1. **Predict the Outcome (`predictOutcome`):**
   - Present a concrete state/input and ask the player to bet on the output before revealing the result.
2. **Order the Pipeline / Proof (`orderPipeline`):**
   - Give 4–6 scrambled steps (e.g., execution flow, signal pipeline, historical sequence, legal test). The learner taps steps in order to build the chain.
3. **Complete the Code / Formula / Principle (`fillBlanks`):**
   - Show a key equation, code snippet, or domain rule with a missing token (`____`) and 3–4 tap-friendly chips.
4. **Spot the Flaw — "Reviewer / Debugger Mode" (`spotFlaws`):**
   - Present a realistic bug, methodological error (e.g., data leakage, race condition, logical fallacy), or misconfiguration and ask the learner to diagnose the exact flaw.
5. **60-Second Blitz & Weakest-Concept Review:**
   - **60s Blitz:** Rapid-fire mix of all questions against a 60-second countdown timer to test fluency and rack up high-combo XP.
   - **Weakest-Concept Review:** Pulls directly from `state.missedQuestions` so learners turn every past mistake into mastery (`+15 XP` per cleared mistake).

---

## 3. The Zero-to-Hero Capstone Challenge ("Final Boss")

On `games.html` (and linked from `index.html`), include a multi-step **Capstone Diagnostic Case Study** (`capstoneChallenge`):
- Present one cohesive, realistic end-to-end scenario that spans the entire project (e.g., debugging a failing production pipeline, designing a complete closed-loop experiment, or resolving a complex multi-issue case).
- Require **3 to 5 sequential decisions** (`steps[]`), where each step tests a different module/concept from the notebook.
- Completing all steps with `100%` accuracy unlocks the **Capstone Cleared** badge and promotes the learner eligible for **Grandmaster** rank.
