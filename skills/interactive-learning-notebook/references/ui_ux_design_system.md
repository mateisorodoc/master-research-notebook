# Baked-In UI/UX Design System, Ergonomics & Audio-Tactile Spec

This rulebook combines **Impeccable** (`Read` + `Operate` craft floor) and **UI/UX Pro Max** (priority 1–10 UX guidelines) into a **100% offline** design system for both mobile phones and desktop monitors.

---

## 1. The 5 Radically Distinct Design Worlds (Impeccable Directions · Dark & Light)

**CRITICAL RULE:** The 5 themes must NOT merely swap hex colors on the same rounded card! Each theme (`body[data-theme-pair="1".."5"]`) is a complete **Design World** that changes **typography (`--font-display`, `--font-sans`), corner geometry (`--radius`, `--radius-sm`), surface atmosphere (`background-image` grid/fold/glow), and hardware/card chrome**:

| World | Vibe & Inspiration | Corner Radius | Typography | Signature Surface & Chrome |
|---|---|---|---|---|
| **01 · 3Blue1Brown Cinema** | Velvety mathematical theater (`#0b0e14` / `#f6f7f9`) | `14px` / `10px` | Classical math serif (`STIX Two Text`, `Georgia`) + humanist sans | Subtle cyan/gold radial spotlight + luminous vector borders |
| **02 · Starship Crew Terminal** | Tactical phosphor cockpit HUD (`#040906` / `#eaf0ec`) | `0px` / `0px` (sharp) | **100% Monospace** (`Fira Code`, `JetBrains Mono`) + uppercase headers | 28px coordinate grid background + inset phosphor border frame |
| **03 · Miura Fold Sheet** | Architectural origami paper (`#141518` / `#f3efe6`) | `2px` / `2px` (crisp) | High-contrast editorial serif + Swiss grotesque sans | Diagonal 48px fold crease pattern + `4px 4px 0` hard paper shadow |
| **04 · VU Meter Bridge** | Studio analog hardware console (`#181512` / `#e6e0d6`) | `6px` / `4px` (bezel) | Industrial geometric sans + instrument mono readouts | Recessed `inset` meter cells + `3px` tactile bottom-lip buttons |
| **05 · Shallow Basin** | Organic bioluminescent journal (`#060d18` / `#eef6f8`) | `22px` / `14px` (organic) | Literary serif display + clean sans | Pelagic radial basin glow + aqua/coral bioluminescent accents |

### Pair 1: 3Blue1Brown Midnight & Chalk *(Math, Science, Control, Physics)*
```css
:root {
  --bg: #0b0e14; --bg-elev: #121722; --bg-card: #161c2a; --bg-code: #090c11;
  --border: #252f42; --border-strong: #374663;
  --text: #eef2f7; --text-muted: #9aa7bd;
  --accent-1: #58c4dd; --accent-1-dim: rgba(88, 196, 221, 0.14);
  --accent-2: #f9c846; --accent-2-dim: rgba(249, 200, 70, 0.14);
  --accent-3: #83c167; --accent-3-dim: rgba(131, 193, 103, 0.15);
  --accent-4: #fc6255; --accent-4-dim: rgba(252, 98, 85, 0.15);
  --accent-5: #9a72ac; --accent-5-dim: rgba(154, 114, 172, 0.16);
}
body.light-theme {
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
:root {
  --bg: #11161d; --bg-elev: #171e28; --bg-card: #1c2430; --bg-code: #0c1016;
  --border: #2a3444; --border-strong: #3f4e65;
  --text: #e6edf3; --text-muted: #93a1b5;
  --accent-1: #6cb6ff; --accent-1-dim: rgba(108, 182, 255, 0.14);
  --accent-2: #d29922; --accent-2-dim: rgba(210, 153, 34, 0.14);
  --accent-3: #57ab5a; --accent-3-dim: rgba(87, 171, 90, 0.14);
  --accent-4: #f47067; --accent-4-dim: rgba(244, 112, 103, 0.14);
  --accent-5: #b083f0; --accent-5-dim: rgba(176, 131, 240, 0.15);
}
body.light-theme {
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
:root {
  --bg: #091310; --bg-elev: #0f1e19; --bg-card: #132620; --bg-code: #060d0b;
  --border: #203c33; --border-strong: #325b4e;
  --text: #e8f3ee; --text-muted: #93b5a7;
  --accent-1: #34d399; --accent-1-dim: rgba(52, 211, 153, 0.14);
  --accent-2: #fbbf24; --accent-2-dim: rgba(251, 191, 36, 0.14);
  --accent-3: #38bdf8; --accent-3-dim: rgba(56, 189, 248, 0.14);
  --accent-4: #fb7185; --accent-4-dim: rgba(251, 113, 133, 0.15);
  --accent-5: #a78bfa; --accent-5-dim: rgba(167, 139, 250, 0.15);
}
body.light-theme {
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
:root {
  --bg: #151210; --bg-elev: #1e1916; --bg-card: #251f1b; --bg-code: #0f0d0b;
  --border: #3a3029; --border-strong: #56473d;
  --text: #f3ece4; --text-muted: #b8a898;
  --accent-1: #e5a95e; --accent-1-dim: rgba(229, 169, 94, 0.15);
  --accent-2: #7cc49b; --accent-2-dim: rgba(124, 196, 155, 0.14);
  --accent-3: #e07a5f; --accent-3-dim: rgba(224, 122, 95, 0.15);
  --accent-4: #9b8ec4; --accent-4-dim: rgba(155, 142, 196, 0.15);
  --accent-5: #72b4d4; --accent-5-dim: rgba(114, 180, 212, 0.14);
}
body.light-theme {
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
:root {
  --bg: #0d0d12; --bg-elev: #14141d; --bg-card: #1a1a26; --bg-code: #08080c;
  --border: #2a2a3d; --border-strong: #41415e;
  --text: #f0f0f5; --text-muted: #9c9cb4;
  --accent-1: #818cf8; --accent-1-dim: rgba(129, 140, 248, 0.15);
  --accent-2: #22d3ee; --accent-2-dim: rgba(34, 211, 238, 0.14);
  --accent-3: #4ade80; --accent-3-dim: rgba(74, 222, 128, 0.14);
  --accent-4: #f87171; --accent-4-dim: rgba(248, 113, 113, 0.15);
  --accent-5: #fbbf24; --accent-5-dim: rgba(251, 191, 36, 0.14);
}
body.light-theme {
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

---

## 2. Desktop Split-Studio vs. Mobile Responsive Layout (`styles.css`)

A common failure in educational web apps is overflowing narrow `360px` phone topbars, clipping multi-column grids, shrinking wide node graphs until text is unreadable, or making a `<canvas>` `position: sticky` on mobile so it floats over and blocks the sliders/questions below it. Always include these exact responsive rules:

```css
/* Desktop (>= 1024px): Two-column Studio — Theory on Left, Live Lab Pinned on Right */
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
  }
}

/* Mobile & Tablet (< 1024px): Clean Vertical Flow (Never Sticky-Overlap Canvas!) */
@media (max-width: 1023px) {
  .studio-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .lab-canvas-sticky {
    position: relative;
    top: auto;
  }
}

/* Mobile (< 860px): Compact Topbar, 1fr Grids, Touch Carousels, Pannable Graphs */
@media (max-width: 860px) {
  .desktop-nav { display: none; }
  .mobile-bottom-nav { display: flex; }
  .page-wrap { padding: 16px 12px 96px; overflow-x: hidden; }
  .topbar { height: auto; min-height: 54px; padding: 8px 12px; flex-wrap: wrap; gap: 8px; }
  .hud-group { margin-left: auto; gap: 5px; flex-wrap: wrap; }
  #hudStreak { display: none; }
  .theme-select { max-width: 122px; min-height: 34px; font-size: 11.5px; }
  .grid-2, .grid-3, .mission-bar { grid-template-columns: 1fr !important; gap: 10px; }
  .world-strip, .pack-tabs {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
  .world-card { flex: 0 0 205px; scroll-snap-align: start; }
  .depth-bar { display: grid; grid-template-columns: repeat(3, 1fr); width: 100%; }
  .map-scroll-wrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .map-scroll-wrap canvas.stage-canvas { min-width: 680px; }
  input[type="range"] { min-height: 36px; }
}
```

---

## 3. Priority 1–10 UI/UX Rules & Craft Floor Bans

1. **WCAG AA Contrast:** Body/placeholder text `>= 4.5:1`, large text & active borders `>= 3:1` in both dark and light modes.
2. **Touch Ergonomics:** Every button, chip, option card, and tab MUST be `>= 44×44px` (`48px` preferred on mobile quiz options) with `>= 8px` gap. Custom range sliders (`input[type="range"]`) must have `24px` thumb targets so they are effortless to drag on a phone.
3. **Typography & Reading Measure:**
   - `--font-display: "STIX Two Text", "Georgia", serif;`
   - `--font-sans: "Fira Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;`
   - `--font-mono: "Fira Code", "JetBrains Mono", Consolas, monospace;`
   - Base `16px`, `line-height: 1.62`, reading measure `65–75ch`, `font-variant-numeric: tabular-nums`.
4. **Craft Floor Bans:**
   - **No eyebrow/kicker labels** above headings.
   - **No gradient text** (`background-clip: text`).
   - **No emoji as UI chrome icons**—use crisp inline `<svg>` (`stroke-width="2"`).
   - **No ghost cards**—use `1px solid var(--border)` OR a soft shadow, never both together.
   - **Theme all browser surfaces:** `::selection`, `caret-color`, custom scrollbars, `:focus-visible`.

---

## 4. Offline Web Audio API Synthesizer & Tactile Haptics (`shared.js`)

Provide instant, satisfying sensory feedback using pure Web Audio oscillators (zero external `.mp3`/`.wav` files needed) plus mobile `navigator.vibrate`, controlled by a persistent Mute button (`state.muted`):

- `playSound('tap')`: short `180 Hz -> 260 Hz` sine blip (`35 ms`, gain `0.04`) + `vibrate(8)`.
- `playSound('correct')`: crisp ascending two-note chime (`523.25 Hz` C5 -> `659.25 Hz` E5, triangle wave, `180 ms`) + `vibrate([12, 30, 20])`.
- `playSound('combo')`: bright 3-note arpeggio pitched up by combo count (`C5 -> E5 -> G5 -> C6`) + `vibrate([15, 25, 30])`.
- `playSound('missionClear')`: warm major chord (`C5 + E5 + G5`, `320 ms`) when a Lab Mission auto-completes.
- `playSound('wrong')`: soft low double-thud (`160 Hz -> 130 Hz`, `140 ms`, gain `0.05`) + `vibrate(25)`.

---

## 5. Desktop Keyboard Shortcuts & Print Cheat-Sheet

### Keyboard Shortcuts (`shared.js`)
- `1`, `2`, `3`, `4` — Select quiz/game option 1–4.
- `Enter` — Submit answer or advance to next question.
- `J` / `K` (or `ArrowRight` / `ArrowLeft` when not in input) — Next / Previous Concept on `learn.html`.
- `D` — Cycle 3-Tier Depth (`1. Intuition` → `2. Practitioner` → `3. Mastery`).
- `M` — Toggle Sound Mute.
- `/` — Focus search input on `glossary.html` / `index.html`.

### Print / PDF Study Cheat-Sheet (`@media print`)
Hide `.topbar`, `.bottom-nav`, `.studio-lab-pane`, and buttons; force `#ffffff` background, `#111827` text, and `break-inside: avoid` on concept summary cards, formulas, and tables.
