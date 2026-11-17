# 2D Affective Control — Multi-Page Learning Notebook (`project_notebook/`)

A **3Blue1Brown-inspired, mobile-first, multi-page** interactive learning companion to `MASTER_RESEARCH` (Master's Thesis & Elsevier *Biomedical Signal Processing and Control*).

## Pages
- `index.html` — Home / Mission Control with animated 2D Valence–Arousal vector field, XP/Streak progress, and quick links to all 10 Concept Packs.
- `learn.html` — **10 Concept Mastery Packs**, each with **Theory + Interactive Lab + Concept Trivia**.
- `games.html` — **Mastery Arcade**: *Complete the Sentence/Code*, *Link Concepts*, and *Spot the Engineering Flaw* ("Reviewer Mode").
- `map.html` — **Interactive Knowledge Map** showing how DEAP data, causal filters, EEG/GSR/BVP, Kalman estimation, 3 actuators, and MPC/RL connect.
- `glossary.html` — Full searchable, category-filtered research dictionary with direct links to Mastery Packs.
- `roadmap.html` — Complete Phase 0–5 roadmap, verified filter group delays, and repository file map.

## Shared Assets
- `styles.css` — 3Blue1Brown-inspired midnight/light theme, mobile bottom tab bar, WCAG AA contrast, and themed browser surfaces.
- `notebook-data.js` — Single structured source of truth for all verified numbers, concepts, games, knowledge graph, and glossary.
- `shared.js` — Persistent `localStorage` XP, streak, mastered concepts, theme toggle, and HiDPI canvas helper.
- `learn.js` — Powers all 7 interactive labs and concept trivia.

## How to Open
- **Direct:** Open `project_notebook/index.html` in any desktop or mobile browser (works offline).
- **Local Server:** `python -m http.server 8080 --directory project_notebook` → `http://localhost:8080`.
