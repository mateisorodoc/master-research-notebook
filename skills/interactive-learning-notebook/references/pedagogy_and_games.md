# Zero-to-Hero Pedagogy, Lab Missions & Game Design Guide

A great learning notebook doesn't just dump documentation into HTML—it **teaches** like a master tutor. Follow these rules when authoring `notebook-data.js` and `learn.js`.

---

## 1. The 4-Stage "Zero-to-Hero" Lesson Arc (Per Concept)

Every concept in `learn.html` must guide the student through 4 cognitive stages:

### Stage 1: The Hook Puzzle ("Why Should I Care?")
- Open with `hookPuzzle`: a concrete 2-sentence problem or failure mode that occurs *without* this concept.
  - *Bad:* "This module implements causal Butterworth filtering."
  - *Good:* "Imagine your emotion controller reacts at $t = 2.0\text{ s}$ to a brainwave spike that won't happen until $t = 3.5\text{ s}$. How did your code cheat—and how do we stop it?"

### Stage 2: 3-Tier Adaptive Depth (`1. Intuition` → `2. Practitioner` → `3. Mastery`)
Never force a beginner to read dense math first, and never bore an expert with only analogies. Populate all three depth tiers for every concept:
- **Level 1 (`Intuition`):** Everyday physical/visual analogy (e.g., thermostat, traffic light, postal sorting, recipe). Zero unexplained acronyms.
- **Level 2 (`Practitioner`):** How the mechanism works step-by-step in the project, inputs → outputs, design choices, and trade-offs.
- **Level 3 (`Mastery / Formal`):**
  - *For STEM / Code:* Exact formula (`formalRule`), variable definitions, complexity/latency, and verified file/method reference (`sourceRef`).
  - *For Medicine / Humanities / Law / Business:* Primary evidence, formal statutory/clinical criteria, historical primary source quotes, and edge cases/counter-arguments.

### Stage 3: Goal-Driven Interactive Lab (With 2–3 Auto-Verified Missions)
Sliders without a goal are toys; sliders with a challenge teach intuition.
- Every Interactive Lab MUST display a **Lab Missions Bar** (`m1`, `m2`, `m3`) above or below the controls.
- Inside the lab's `update()` function in `learn.js`, check whether the current slider/canvas state satisfies each mission's condition:
  - Example: `if (filterMode === 'causal' && cutoffHz >= 4 && cutoffHz <= 8) completeMission(concept.id, 'm1', 25);`
- When a mission condition is met:
  1. Mark the mission pill green (`✓ Cleared +25 XP`),
  2. Call `playSound('missionClear')`,
  3. Persist `slug-id:m1` in `localStorage`.

### Stage 4: 3-Tier Concept Mastery Check (`Warm-Up` → `Predict` → `Boss`)
Instead of random trivia, structure every concept's `exercises` as a 3-rung ladder:
1. **`warmup`:** Checks basic comprehension of the Level 1 mental model.
2. **`predict`:** Asks the learner to predict what happens when a parameter or condition changes (reinforcing the Interactive Lab).
3. **`boss`:** A realistic diagnostic or synthesis question requiring Level 2/3 mastery. Passing all 3 rungs unlocks the Concept's **Mastered** badge!

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
