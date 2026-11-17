/* ==========================================================================
   MASTER_RESEARCH — Zero-to-Hero Concept Studio
   - 3 Radically Distinct Depth Tiers (Level 1 Analogy, Level 2 Pipeline, Level 3 Formal Math & Code)
   - 10 Dedicated 1:1 Interactive Labs (1 per Concept) + 20 Auto-Verified Lab Missions
   - Strictly Aligned 3-Rung Mastery Check (Level 1 Warm-Up, Level 2+Lab, Level 3 Boss)
   ========================================================================== */

(function () {
  const DATA = window.NOTEBOOK_DATA;
  const State = window.NotebookState;
  if (!DATA || !State) return;

  const rail = document.getElementById("conceptRail");
  const studioWrap = document.getElementById("studioWrap");
  const tabTheory = document.getElementById("tabTheory");
  const tabLab = document.getElementById("tabLab");
  const tabTrivia = document.getElementById("tabTrivia");

  const params = new URLSearchParams(window.location.search);
  let activeId = params.get("concept") || DATA.concepts[0].id;
  if (!DATA.concepts.some((c) => c.id === activeId)) activeId = DATA.concepts[0].id;
  let activeTab = "studio";

  function syncDepthButtons() {
    const lvl = State.getDepth();
    document.querySelectorAll(".depth-btn").forEach((b) => {
      b.setAttribute("aria-pressed", String(parseInt(b.dataset.depth, 10) === lvl));
    });
  }

  document.querySelectorAll(".depth-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      State.setDepth(parseInt(btn.dataset.depth, 10));
    });
  });

  window.addEventListener("depthchange", () => {
    syncDepthButtons();
    renderTheoryOnly();
  });

  function renderRail() {
    const mastered = State.get().mastered;
    rail.innerHTML = DATA.concepts
      .map((c) => {
        const isSel = c.id === activeId;
        const isMast = mastered.includes(c.id);
        return `<button class="concept-chip ${isMast ? "mastered" : ""}" role="tab" aria-selected="${isSel}" data-cid="${c.id}">
          ${isMast ? "✓ " : ""}${c.title}
        </button>`;
      })
      .join("");
    rail.querySelectorAll(".concept-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        State.playSound("tap");
        activeId = btn.dataset.cid;
        renderPack();
      });
    });
  }

  function stepConcept(delta) {
    const idx = DATA.concepts.findIndex((c) => c.id === activeId);
    const nextIdx = (idx + delta + DATA.concepts.length) % DATA.concepts.length;
    activeId = DATA.concepts[nextIdx].id;
    State.playSound("tap");
    renderPack();
  }

  const prevBtn = document.getElementById("prevConceptBtn");
  const nextBtn = document.getElementById("nextConceptBtn");
  if (prevBtn) prevBtn.addEventListener("click", () => stepConcept(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => stepConcept(1));

  document.addEventListener("keydown", (e) => {
    if (e.target && ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
    if (e.key === "j" || e.key === "J") stepConcept(1);
    else if (e.key === "k" || e.key === "K") stepConcept(-1);
  });

  function switchTab(tabName) {
    activeTab = tabName;
    State.playSound("tap");
    document.querySelectorAll(".pack-tab-btn").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.tab === tabName));
    });
    if (tabName === "studio") {
      studioWrap.hidden = false;
      studioWrap.className = "studio-grid";
      tabTheory.hidden = false;
      tabLab.hidden = false;
      tabTrivia.hidden = false;
      const c = DATA.concepts.find((x) => x.id === activeId);
      mountLab(c);
    } else if (tabName === "theory") {
      studioWrap.hidden = false;
      studioWrap.className = "";
      tabTheory.hidden = false;
      tabLab.hidden = true;
      tabTrivia.hidden = true;
    } else if (tabName === "lab") {
      studioWrap.hidden = false;
      studioWrap.className = "";
      tabTheory.hidden = true;
      tabLab.hidden = false;
      tabTrivia.hidden = true;
      const c = DATA.concepts.find((x) => x.id === activeId);
      mountLab(c);
    } else if (tabName === "trivia") {
      studioWrap.hidden = true;
      tabTrivia.hidden = false;
    }
  }

  document.querySelectorAll(".pack-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // ------------------------------------------------------------------------
  // 3 Radically Distinct Depth Tiers
  // ------------------------------------------------------------------------
  function renderTheoryOnly() {
    const c = DATA.concepts.find((x) => x.id === activeId);
    const lvl = State.getDepth();
    let html = "";

    if (lvl === 1 && c.level1) {
      html = `
        <div class="depth-tier-card tier-1">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span class="tag tag-blue">LEVEL 1 · INTUITION &amp; EVERYDAY MENTAL MODEL</span>
            <span class="muted" style="font-size:12px;">Zero Jargon Mode</span>
          </div>
          <h3>The Big Idea (Plain English)</h3>
          <p>${c.level1.analogy}</p>
          <div class="note-box warn">
            <strong>Why Naive Approaches Fail</strong>
            <p style="margin:6px 0 0;">${c.level1.naiveTrap}</p>
          </div>
          <div class="note-box good">
            <strong>Hands-On Connection → Interactive Lab</strong>
            <p style="margin:6px 0 0;">${c.level1.labGuide}</p>
          </div>
        </div>
      `;
    } else if (lvl === 2 && c.level2) {
      html = `
        <div class="depth-tier-card tier-2">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span class="tag tag-gold">LEVEL 2 · PRACTITIONER PIPELINE &amp; ENGINEERING</span>
            <span class="muted" style="font-size:12px;">Step-by-Step Workflow</span>
          </div>
          <h3>4-Stage Execution Pipeline</h3>
          <div class="pipeline-steps">
            ${c.level2.pipeline.map((step) => `<div class="pipeline-step-row">${step}</div>`).join("")}
          </div>
          <div class="note-box">
            <strong>Engineering Trade-Offs &amp; Design Choices</strong>
            <p style="margin:6px 0 0;">${c.level2.tradeoffs}</p>
          </div>
          <div class="note-box good">
            <strong>Lab Mission Guide</strong>
            <p style="margin:6px 0 0;">${c.level2.labGuide}</p>
          </div>
        </div>
      `;
    } else if (c.level3) {
      html = `
        <div class="depth-tier-card tier-3">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span class="tag tag-purple">LEVEL 3 · FORMAL MATH, PROOFS &amp; SOURCE CODE</span>
            <span class="muted" style="font-size:12px;">Reviewer / Thesis Grade</span>
          </div>
          <h3>Formal Mathematical Formulation</h3>
          <div class="math-block">${c.level3.math}</div>
          <h3>Symbol &amp; Parameter Dictionary</h3>
          <div class="pipeline-steps">
            ${c.level3.variables.map((v) => `<div class="pipeline-step-row"><code>${v.split(":")[0]}</code>:${v.split(":").slice(1).join(":")}</div>`).join("")}
          </div>
          <div class="note-box warn">
            <strong>Verified Code &amp; Audit Proof</strong>
            <p style="margin:6px 0 0;">${c.level3.codeWalkthrough}</p>
            <p style="margin:6px 0 0; font-size:12.5px;"><strong>Primary Reference:</strong> <code>${c.codeRef}</code></p>
          </div>
        </div>
      `;
    }

    tabTheory.innerHTML = `
      ${html}
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:14px;">
        <button class="btn btn-sm" type="button" id="cycleDepthInlineBtn">Switch Depth Tier (Level ${(lvl % 3) + 1}) →</button>
        <button class="btn btn-primary btn-sm" type="button" id="scrollCheckBtn">Jump to 3-Stage Mastery Check ↓</button>
      </div>
    `;

    const cdBtn = document.getElementById("cycleDepthInlineBtn");
    if (cdBtn) cdBtn.addEventListener("click", () => State.setDepth((lvl % 3) + 1));
    const scBtn = document.getElementById("scrollCheckBtn");
    if (scBtn) {
      scBtn.addEventListener("click", () => {
        tabTrivia.hidden = false;
        tabTrivia.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function renderMissionsBar(c) {
    const missions = (DATA.labMissions && DATA.labMissions[c.labType]) || [];
    if (!missions.length) return "";
    return `
      <div class="mission-bar" id="labMissionBar">
        ${missions
          .map((m) => {
            const done = State.isMissionDone(c.id, m.id);
            return `<div class="mission-pill ${done ? "done" : ""}" id="mpill_${m.id}">
              <span>${done ? "✓ " : "🎯 "}${m.prompt}</span>
              <span class="tag ${done ? "tag-green" : "tag-gold"}">${done ? "Cleared" : "+" + m.xp + " XP"}</span>
            </div>`;
          })
          .join("")}
      </div>
    `;
  }

  function triggerMission(c, missionId) {
    if (State.completeMission(c.id, missionId, 25)) {
      const pill = document.getElementById(`mpill_${missionId}`);
      if (pill) {
        pill.classList.add("done");
        const tag = pill.querySelector(".tag");
        if (tag) {
          tag.className = "tag tag-green";
          tag.textContent = "Cleared";
        }
      }
    }
  }

  function renderPack() {
    syncDepthButtons();
    renderRail();
    const c = DATA.concepts.find((x) => x.id === activeId);
    const isMast = State.get().mastered.includes(c.id);

    document.getElementById("packTitle").textContent = c.title;
    document.getElementById("packSummary").textContent = c.summary;
    const badge = document.getElementById("packBadge");
    badge.textContent = isMast ? "✓ Mastered" : `${c.phase} · ${c.tag}`;
    badge.className = `tag ${isMast ? "tag-green" : "tag-blue"}`;

    renderTheoryOnly();

    // 3-Stage Aligned Mastery Check (Always visible below Studio or in Check tab)
    let triviaCorrect = new Array(c.trivia.length).fill(false);
    const tierTags = ["tag-blue", "tag-gold", "tag-purple"];
    tabTrivia.innerHTML = `
      <div style="margin-top:22px; border-top:1px solid var(--border); padding-top:18px;">
        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:8px; margin-bottom:10px;">
          <h3 style="margin:0;">3-Stage Mastery Check — Strictly From Theory &amp; Lab Above</h3>
          <span class="tag tag-green">+30 XP on 3/3 Clear</span>
        </div>
        ${c.trivia
          .map(
            (t, ti) => `
          <div class="surface-lab" data-ti="${ti}">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:6px;">
              <strong>Q${ti + 1}. ${t.q}</strong>
              <span class="tag ${tierTags[ti] || "tag-blue"}">Tier ${ti + 1}</span>
            </div>
            <div class="quiz-options">
              ${t.options
                .map((opt, oi) => `<button class="quiz-opt" type="button" data-oi="${oi}">${opt}</button>`)
                .join("")}
            </div>
            <p class="muted trivia-fb" style="margin:10px 0 0; font-size:13.5px;" hidden></p>
          </div>`
          )
          .join("")}
        <div id="triviaCompleteBanner" class="note-box good" hidden>
          <strong>✓ Concept Mastered! (+30 XP)</strong> You verified all 3 tiers (Intuition, Practitioner Lab, and Formal Mastery).
        </div>
      </div>`;

    tabTrivia.querySelectorAll(".quiz-opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        const box = btn.closest("[data-ti]");
        const ti = parseInt(box.dataset.ti, 10);
        const oi = parseInt(btn.dataset.oi, 10);
        const qObj = c.trivia[ti];
        const fb = box.querySelector(".trivia-fb");

        box.querySelectorAll(".quiz-opt").forEach((b, idx) => {
          b.classList.remove("correct", "wrong");
          if (idx === qObj.answer) b.classList.add("correct");
          else if (idx === oi) b.classList.add("wrong");
        });
        fb.hidden = false;
        fb.textContent = qObj.explain;

        if (oi === qObj.answer) {
          if (!triviaCorrect[ti]) State.awardXP(10, `Tier ${ti + 1} Check`);
          triviaCorrect[ti] = true;
          if (triviaCorrect.every(Boolean)) {
            State.markMastered(c.id);
            document.getElementById("triviaCompleteBanner").hidden = false;
            renderRail();
          }
        } else {
          State.resetStreak({
            conceptId: c.id,
            q: qObj.q,
            options: qObj.options,
            answer: qObj.answer,
            explain: qObj.explain
          });
        }
      });
    });

    if (activeTab === "studio") {
      tabTrivia.hidden = false;
      mountLab(c);
    } else if (activeTab === "lab") {
      mountLab(c);
    }
  }

  // ------------------------------------------------------------------------
  // 10 Dedicated 1:1 Interactive Labs (1 per Concept)
  // ------------------------------------------------------------------------
  function mountLab(c) {
    const type = c.labType;
    if (type === "circumplex") return renderCircumplexLab(c);
    if (type === "deap-sam") return renderDeapSamLab(c);
    if (type === "montage") return renderMontageLab(c);
    if (type === "causality") return renderCausalityLab(c);
    if (type === "eeg-bands") return renderEegBandsLab(c);
    if (type === "gsr-parallel") return renderGsrParallelLab(c);
    if (type === "bvp-hrv") return renderBvpHrvLab(c);
    if (type === "kalman-preview") return renderKalmanLab(c);
    if (type === "three-actuators-lab") return renderThreeActuatorsLab(c);
    if (type === "mpc-benchmark-lab") return renderMpcBenchmarkLab(c);
  }

  // Lab 1: 2D Valence-Arousal Circumplex & Open-Loop vs Closed-Loop Thermostat
  function renderCircumplexLab(c) {
    tabLab.innerHTML = `
      ${renderMissionsBar(c)}
      <div class="lab-canvas-sticky">
        <canvas id="labVaCanvas" class="stage-canvas" width="700" height="290"></canvas>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin:12px 0;">
        <button class="btn btn-sm pva" type="button" data-v="0.75" data-a="0.65">Q1: Make Happy (+V, +A)</button>
        <button class="btn btn-sm pva" type="button" data-v="-0.65" data-a="0.70">Q2: Stressed (-V, +A)</button>
        <button class="btn btn-sm pva" type="button" data-v="-0.60" data-a="-0.55">Q3: Sad (-V, -A)</button>
        <button class="btn btn-sm pva" type="button" data-v="0.75" data-a="-0.60">Q4: Calm (+V, -A)</button>
      </div>
      <div style="display:flex; gap:8px; margin-bottom:10px;">
        <button class="btn btn-sm clmode" type="button" data-cl="open" aria-pressed="false">Open-Loop (Passive Thermometer)</button>
        <button class="btn btn-sm clmode" type="button" data-cl="closed" aria-pressed="true">Closed-Loop (Δt = 0.5 s Thermostat)</button>
      </div>
      <div class="readout-row">
        <div class="readout-cell">Target Setpoint x*<strong id="rVaT">(+0.75, -0.60) [Q4 Calm]</strong></div>
        <div class="readout-cell">Final State x_120<strong id="rVaA">(+0.73, -0.58)</strong></div>
        <div class="readout-cell">Tracking Error ||e_k||<strong id="rVaErr">0.03 (Converged)</strong></div>
      </div>
    `;
    const canvas = document.getElementById("labVaCanvas");
    const W = 700, H = 290;
    const ctx = State.setupHiDPICanvas(canvas, W, H);
    let tV = 0.75, tA = -0.60;
    let mode = "closed";
    let sawOpenQ4 = false;

    function draw() {
      const cx = W / 2, cy = H / 2, r = Math.min(W, H) * 0.38;
      const isLight = document.body.classList.contains("light-theme");
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = isLight ? "#cbd5e1" : "#252f42";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - r - 20, cy); ctx.lineTo(cx + r + 20, cy);
      ctx.moveTo(cx, cy - r - 20); ctx.lineTo(cx, cy + r + 20); ctx.stroke();

      ctx.fillStyle = isLight ? "#111827" : "#eef2f7";
      ctx.font = "600 11.5px 'Fira Code', monospace";
      ctx.fillText("Q1 (+V,+A)", cx + 14, cy - r + 18);
      ctx.fillText("Q2 (-V,+A)", cx - r + 10, cy - r + 18);
      ctx.fillText("Q3 (-V,-A)", cx - r + 10, cy + r - 10);
      ctx.fillText("Q4 Calm (+V,-A)", cx + 14, cy + r - 10);

      // Start from initial state (-0.50, +0.60)
      const sV = -0.50, sA = 0.60;
      const aV = mode === "closed" ? tV * 0.96 : sV;
      const aA = mode === "closed" ? tA * 0.96 : sA;
      const err = Math.hypot(tV - aV, tA - aA);

      if (mode === "open" && tV > 0.4 && tA < -0.3) {
        sawOpenQ4 = true;
        triggerMission(c, "m1");
      }
      if (sawOpenQ4 && mode === "closed" && tV > 0.4 && tA < -0.3 && err < 0.08) {
        triggerMission(c, "m2");
      }

      const sx = cx + sV * r, sy = cy - sA * r;
      const tx = cx + tV * r, ty = cy - tA * r;
      const ax = cx + aV * r, ay = cy - aA * r;

      // Trajectory curve across 120 steps (60 s @ 0.5 s)
      ctx.strokeStyle = mode === "closed" ? "#83c167" : "#fc6255";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      if (mode === "closed") {
        ctx.quadraticCurveTo((sx + tx) / 2 + 18, (sy + ty) / 2 - 12, ax, ay);
      } else {
        ctx.lineTo(sx + 4, sy - 4);
      }
      ctx.stroke();

      ctx.fillStyle = "#f9c846";
      ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#58c4dd";
      ctx.beginPath(); ctx.arc(tx, ty, 8, 0, Math.PI * 2); ctx.fill();

      const fmt = (n) => (n >= 0 ? `+${n.toFixed(2)}` : n.toFixed(2));
      const qName = tV >= 0 && tA >= 0 ? "Q1" : tV < 0 && tA >= 0 ? "Q2" : tV < 0 && tA < 0 ? "Q3" : "Q4 Calm";
      document.getElementById("rVaT").textContent = `(${fmt(tV)}, ${fmt(tA)}) [${qName}]`;
      document.getElementById("rVaA").textContent = `(${fmt(aV)}, ${fmt(aA)})`;
      document.getElementById("rVaErr").textContent = `${err.toFixed(2)} (${mode === "closed" ? "120 steps @ 0.5 s" : "Open-Loop Unsteered"})`;
    }

    canvas.addEventListener("pointerdown", (e) => {
      const rct = canvas.getBoundingClientRect();
      const px = ((e.clientX - rct.left) / rct.width) * W;
      const py = ((e.clientY - rct.top) / rct.height) * H;
      const rad = Math.min(W, H) * 0.38;
      tV = Math.max(-1, Math.min(1, (px - W / 2) / rad));
      tA = Math.max(-1, Math.min(1, (H / 2 - py) / rad));
      draw();
    });
    tabLab.querySelectorAll(".pva").forEach((b) =>
      b.addEventListener("click", () => { tV = parseFloat(b.dataset.v); tA = parseFloat(b.dataset.a); draw(); })
    );
    tabLab.querySelectorAll(".clmode").forEach((b) =>
      b.addEventListener("click", () => {
        mode = b.dataset.cl;
        tabLab.querySelectorAll(".clmode").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.cl === mode)));
        draw();
      })
    );
    draw();
  }

  // Lab 2: DEAP Dataset & Quadrant-1 SAM Fix (439 Inverted Trials + 63 s Partition)
  function renderDeapSamLab(c) {
    tabLab.innerHTML = `
      ${renderMissionsBar(c)}
      <div class="lab-canvas-sticky">
        <canvas id="labDeapCanvas" class="stage-canvas" width="700" height="240"></canvas>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin:12px 0;">
        <button class="btn btn-sm sam-btn" type="button" data-s="raw" aria-pressed="false">Raw .dat['labels'] (439 Q1 Inverted: 9.0 - rating)</button>
        <button class="btn btn-sm sam-btn" type="button" data-s="restored" aria-pressed="true">Restored participant_ratings.xls (1,280 Valid)</button>
      </div>
      <label style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
        <span>63.0 s Trial Scrubber (8,064 samples @ 128 Hz): <strong id="deapTimeOut" style="color:var(--b1b-blue);">12.0 s</strong></span>
        <input id="deapTimeSl" type="range" min="0" max="63" step="0.5" value="12" style="flex:1; accent-color:var(--b1b-blue);" />
      </label>
      <div class="readout-row">
        <div class="readout-cell">Trial Partition<strong id="deapPartOut">Stimulus (samples 384:8064)</strong></div>
        <div class="readout-cell">Q1 Rating Example<strong id="deapQ1Out">SAM 9.00 → 9.00 (Restored)</strong></div>
        <div class="readout-cell">Cohort Windows<strong id="deapWinOut">153,600 (1,280 × 120 steps)</strong></div>
      </div>
    `;
    const canvas = document.getElementById("labDeapCanvas");
    const W = 700, H = 240;
    const ctx = State.setupHiDPICanvas(canvas, W, H);
    const sl = document.getElementById("deapTimeSl");
    let smode = "restored";
    let sawRaw = false;

    function draw() {
      const t = parseFloat(sl.value);
      document.getElementById("deapTimeOut").textContent = `${t.toFixed(1)} s (sample ${Math.round(t * 128)})`;
      document.getElementById("deapPartOut").textContent =
        t < 3.0 ? "Baseline Fixation (0–3 s, samples 0:384)" : `Stimulus Step k = ${Math.floor((t - 3) / 0.5)} / 120 (samples 384:8064)`;
      document.getElementById("deapQ1Out").textContent =
        smode === "raw" ? "SAM 9.00 → 0.00 (439 Q1 Inverted!)" : "SAM 9.00 → 9.00 (Verified to 1e-6)";

      if (smode === "raw") {
        sawRaw = true;
        triggerMission(c, "m1");
      }
      if (sawRaw && smode === "restored" && t > 3.0) {
        triggerMission(c, "m2");
      }

      ctx.clearRect(0, 0, W, H);
      // Draw SAM 1..9 scatter plot showing Q1 (V>5, A>5) either in top-right (restored) or flipped to bottom-left 0..4 (raw)
      const pad = 36;
      ctx.strokeStyle = "#374663";
      ctx.strokeRect(pad, 16, W - pad * 2, H - 40);
      const midX = pad + (W - pad * 2) * (5 / 9);
      const midY = H - 24 - (H - 40) * (5 / 9);
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(midX, 16); ctx.lineTo(midX, H - 24);
      ctx.moveTo(pad, midY); ctx.lineTo(W - pad, midY); ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 48; i++) {
        const isQ1 = i < 18;
        let v = isQ1 ? 5.5 + ((i * 1.7) % 3.5) : 1.5 + ((i * 2.3) % 7.0);
        let a = isQ1 ? 5.5 + ((i * 2.1) % 3.5) : 1.5 + ((i * 1.3) % 3.4);
        if (isQ1 && smode === "raw") {
          v = 9.0 - v;
          a = 9.0 - a;
        }
        const px = pad + (v / 9) * (W - pad * 2);
        const py = H - 24 - (a / 9) * (H - 40);
        ctx.fillStyle = isQ1 ? (smode === "raw" ? "#fc6255" : "#83c167") : "#58c4dd";
        ctx.beginPath(); ctx.arc(px, py, isQ1 ? 4.5 : 3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = smode === "raw" ? "#fc6255" : "#83c167";
      ctx.font = "600 12px 'Fira Code', monospace";
      ctx.fillText(
        smode === "raw" ? "CORRUPTED: 439 Q1 trials inverted into (9.0 - rating) [0.00..4.00]!" : "RESTORED: All 439 Q1 trials in true [5.00..9.00] top-right quadrant",
        pad + 10,
        34
      );
    }

    tabLab.querySelectorAll(".sam-btn").forEach((b) =>
      b.addEventListener("click", () => {
        smode = b.dataset.s;
        tabLab.querySelectorAll(".sam-btn").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.s === smode)));
        draw();
      })
    );
    sl.addEventListener("input", draw);
    draw();
  }

  // Lab 3: 10-20 Montage Explorer & Geneva Index Inspector
  function renderMontageLab(c) {
    tabLab.innerHTML = `
      ${renderMissionsBar(c)}
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
        <button class="btn btn-sm mbtn" type="button" data-m="full_32" aria-pressed="false">full_32 (146 feats, 0.903 ms)</button>
        <button class="btn btn-sm mbtn" type="button" data-m="wearable_6" aria-pressed="true">wearable_6 (38 feats, 0.842 ms)</button>
        <button class="btn btn-sm mbtn" type="button" data-m="wearable_4" aria-pressed="false">wearable_4 (29 feats, 0.822 ms)</button>
      </div>
      <div class="grid-2" style="align-items:start;">
        <svg id="labHeadSvg" viewBox="0 0 280 280" style="width:100%; max-width:250px; background:var(--bg-code); border:1px solid var(--border); border-radius:var(--radius-sm); margin:0 auto; display:block;"></svg>
        <div>
          <h3 id="lmTitle"></h3>
          <p id="lmDesc" class="muted" style="font-size:14px;"></p>
          <div class="readout-row">
            <div class="readout-cell">EEG Channels<strong id="lmCh"></strong></div>
            <div class="readout-cell">Total Features<strong id="lmFeat"></strong></div>
            <div class="readout-cell">Mean Step Latency<strong id="lmLat"></strong></div>
          </div>
          <div class="note-box" style="margin-top:12px;">
            <strong id="lmElecName">Tap electrode F4 on the head map</strong>
            <p id="lmElecRole" style="margin:4px 0 0; font-size:13.5px;">Inspect its Geneva BioSemi index (30/32 slots differ from MNE biosemi32!).</p>
          </div>
        </div>
      </div>
    `;
    const svg = document.getElementById("labHeadSvg");
    function setM(key) {
      if (key === "wearable_4") triggerMission(c, "m1");
      const m = DATA.montages[key];
      document.getElementById("lmTitle").textContent = m.name;
      document.getElementById("lmDesc").textContent = `${m.plainEnglish} (${m.extras})`;
      document.getElementById("lmCh").textContent = m.eegChannels;
      document.getElementById("lmFeat").textContent = m.totalFeatures;
      document.getElementById("lmLat").textContent = m.latencyMean;
      tabLab.querySelectorAll(".mbtn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.m === key)));
      const set = new Set(m.indices);
      let html = `<circle cx="140" cy="144" r="102" fill="none" stroke="#58c4dd" stroke-width="2" opacity="0.4"/>
        <polygon points="128,42 140,22 152,42" fill="none" stroke="#58c4dd" stroke-width="2" opacity="0.5"/>`;
      DATA.electrodes.forEach((el) => {
        const on = set.has(el.idx);
        html += `<g class="eg" tabindex="0" role="button" data-n="${el.name}" data-i="${el.idx}" data-r="${el.role}" style="cursor:pointer;">
          <circle cx="${el.x}" cy="${el.y}" r="${on ? 12 : 8}" fill="${on ? "#83c167" : "#161c2a"}" stroke="${on ? "#fff" : "#64748b"}" stroke-width="1.5"/>
          <text x="${el.x}" y="${el.y + 3.5}" text-anchor="middle" font-size="8.5" font-family="'Fira Code',monospace" fill="#fff" pointer-events="none">${el.name}</text>
        </g>`;
      });
      svg.innerHTML = html;
      svg.querySelectorAll(".eg").forEach((g) => {
        g.addEventListener("click", () => {
          State.playSound("tap");
          document.getElementById("lmElecName").textContent = `${g.dataset.n} (Geneva Index ${g.dataset.i})`;
          document.getElementById("lmElecRole").textContent = g.dataset.r;
          if (g.dataset.n === "F4") triggerMission(c, "m2");
        });
      });
    }
    tabLab.querySelectorAll(".mbtn").forEach((b) => b.addEventListener("click", () => setM(b.dataset.m)));
    setM("wearable_6");
  }

  // Lab 4: Causal SOS (0.0 leak, 24.42 ms lag) vs Acausal filtfilt (27.60 leak)
  function renderCausalityLab(c) {
    tabLab.innerHTML = `
      ${renderMissionsBar(c)}
      <div class="lab-canvas-sticky">
        <canvas id="labCausCanvas" class="stage-canvas" width="700" height="230"></canvas>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;">
        <button class="btn btn-sm fbtn" type="button" data-m="causal" aria-pressed="true">Causal SOS + zi (0.0 leak, 24.42 ms delay)</button>
        <button class="btn btn-sm fbtn" type="button" data-m="acausal" aria-pressed="false">Acausal filtfilt (27.60 backward leak)</button>
        <button class="btn btn-sm fbtn" type="button" data-m="both" aria-pressed="false">Compare Both</button>
      </div>
      <div class="readout-row">
        <div class="readout-cell">Pre-Burst Leak (t ≤ 1024)<strong id="cLeakOut">0.000000 (Exact Zero)</strong></div>
        <div class="readout-cell">EEG 4–45 Hz Group Delay<strong id="cDelayOut">24.42 ms (3.13 samples)</strong></div>
        <div class="readout-cell">Startup State zi<strong id="cZiOut">sosfilt_zi(sos) * x[0]</strong></div>
      </div>
    `;
    const canvas = document.getElementById("labCausCanvas");
    const W = 700, H = 230;
    const ctx = State.setupHiDPICanvas(canvas, W, H);
    let mode = "causal";
    function draw() {
      if (mode === "acausal") triggerMission(c, "m1");
      if (mode === "both") triggerMission(c, "m2");
      document.getElementById("cLeakOut").textContent =
        mode === "causal" ? "0.000000 (Exact Zero)" : "27.595335 log-power units (ILLEGAL)";
      ctx.clearRect(0, 0, W, H);
      const bx = W * 0.56, by = H * 0.58;
      ctx.strokeStyle = "#f9c846"; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(bx, 18); ctx.lineTo(bx, H - 16); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "#f9c846"; ctx.font = "600 12px 'Fira Code',monospace";
      ctx.fillText("Sample 1024 (10^5 uV, 20 Hz Burst)", bx - 110, 14);

      if (mode !== "causal") {
        ctx.strokeStyle = "#fc6255"; ctx.lineWidth = 2.2; ctx.beginPath();
        for (let x = 0; x < W; x++) {
          const amp = x >= bx ? Math.sin((x - bx) * 0.35) * 60 * Math.exp(-(x - bx) * 0.008)
            : Math.sin((bx - x) * 0.35) * 46 * Math.exp(-(bx - x) * 0.025);
          x === 0 ? ctx.moveTo(x, by - amp) : ctx.lineTo(x, by - amp);
        }
        ctx.stroke();
      }
      if (mode !== "acausal") {
        ctx.strokeStyle = "#83c167"; ctx.lineWidth = 2.5; ctx.beginPath();
        for (let x = 0; x < W; x++) {
          const dx = Math.max(0, x - bx - 4);
          const amp = x >= bx ? Math.sin(dx * 0.35) * 60 * Math.exp(-dx * 0.008) : 0;
          x === 0 ? ctx.moveTo(x, by - amp) : ctx.lineTo(x, by - amp);
        }
        ctx.stroke();
      }
    }
    tabLab.querySelectorAll(".fbtn").forEach((b) =>
      b.addEventListener("click", () => {
        mode = b.dataset.m;
        tabLab.querySelectorAll(".fbtn").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.m === mode)));
        draw();
      })
    );
    draw();
  }

  // Lab 5: EEG Spectral Power (2.0 s Hamming rFFT, ε = 1e-12) & FAA / TBR / BAR
  function renderEegBandsLab(c) {
    tabLab.innerHTML = `
      ${renderMissionsBar(c)}
      <div class="grid-2">
        <label class="surface-lab" style="margin:0;">
          Right Frontal α (<code>F4</code>): <strong id="f4Val">+1.20</strong>
          <input id="f4Slider" type="range" min="-2" max="2" step="0.1" value="1.2" style="width:100%; accent-color:var(--b1b-blue);" />
        </label>
        <label class="surface-lab" style="margin:0;">
          Left Frontal α (<code>F3</code>): <strong id="f3Val">+0.40</strong>
          <input id="f3Slider" type="range" min="-2" max="2" step="0.1" value="0.4" style="width:100%; accent-color:var(--b1b-gold);" />
        </label>
        <label class="surface-lab" style="margin:0;">
          Midline <code>Fz</code> θ - β (TBR): <strong id="tbrVal">+0.30</strong>
          <input id="tbrSlider" type="range" min="-1.5" max="1.5" step="0.1" value="0.3" style="width:100%; accent-color:var(--b1b-green);" />
        </label>
        <label class="surface-lab" style="margin:0;">
          Parietal <code>P4</code> β - α (BAR): <strong id="barVal">+0.50</strong>
          <input id="barSlider" type="range" min="-1.5" max="1.5" step="0.1" value="0.5" style="width:100%; accent-color:var(--b1b-purple);" />
        </label>
      </div>
      <div class="readout-row">
        <div class="readout-cell">FAA = α(F4) - α(F3)<strong id="faaOut">+0.80 (Positive / Approach)</strong></div>
        <div class="readout-cell">Fz TBR &amp; P4 BAR<strong id="tbrBarOut">TBR +0.30 · BAR +0.50</strong></div>
        <div class="readout-cell">Window &amp; Floor<strong id="epsOut">2.0 s Hamming (Δf=0.5 Hz, ε=1e-12)</strong></div>
      </div>
    `;
    const f4 = document.getElementById("f4Slider");
    const f3 = document.getElementById("f3Slider");
    const tbr = document.getElementById("tbrSlider");
    const bar = document.getElementById("barSlider");
    function upd() {
      const v4 = parseFloat(f4.value), v3 = parseFloat(f3.value);
      const vt = parseFloat(tbr.value), vb = parseFloat(bar.value);
      const faa = v4 - v3;
      if (faa > 1.0) triggerMission(c, "m1");
      if (faa < -0.8 && vt >= 0.6) triggerMission(c, "m2");
      document.getElementById("f4Val").textContent = (v4 >= 0 ? "+" : "") + v4.toFixed(2);
      document.getElementById("f3Val").textContent = (v3 >= 0 ? "+" : "") + v3.toFixed(2);
      document.getElementById("tbrVal").textContent = (vt >= 0 ? "+" : "") + vt.toFixed(2);
      document.getElementById("barVal").textContent = (vb >= 0 ? "+" : "") + vb.toFixed(2);
      const bias = faa > 0.15 ? "Positive / Approach" : faa < -0.15 ? "Negative / Withdrawal" : "Neutral";
      document.getElementById("faaOut").textContent = `${faa >= 0 ? "+" : ""}${faa.toFixed(2)} (${bias})`;
      document.getElementById("tbrBarOut").textContent = `TBR ${vt.toFixed(2)} · BAR ${vb.toFixed(2)}`;
    }
    [f4, f3, tbr, bar].forEach((el) => el.addEventListener("input", upd));
    upd();
  }

  // Lab 6: GSR Parallel SCL/SCR vs 4.86 s Phase-Mismatch Subtraction
  function renderGsrParallelLab(c) {
    tabLab.innerHTML = `
      ${renderMissionsBar(c)}
      <div class="lab-canvas-sticky">
        <canvas id="labGsrCanvas" class="stage-canvas" width="700" height="210"></canvas>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;">
        <button class="btn btn-sm gbtn" type="button" data-g="parallel" aria-pressed="true">Parallel LP + BP (Clean 331.98 ms SCR)</button>
        <button class="btn btn-sm gbtn" type="button" data-g="sub" aria-pressed="false">Naive Subtract (4,856 ms SCL Lag Distortion)</button>
      </div>
      <div class="readout-row">
        <div class="readout-cell">Tonic SCL (0.05 Hz LP)<strong id="gSclOut">mean +0.42, slope +0.03 (τ=4.86 s)</strong></div>
        <div class="readout-cell">Phasic SCR (0.05–1.5 Hz)<strong id="gScrOut">power 1.4, peaks 2 (1.0 s gate), amp 0.8</strong></div>
        <div class="readout-cell">Phase-2 Scaling Note<strong id="gScaleOut">Max unscaled power = 8.73e8 (log1p in P2)</strong></div>
      </div>
    `;
    const canvas = document.getElementById("labGsrCanvas");
    const W = 700, H = 210;
    const ctx = State.setupHiDPICanvas(canvas, W, H);
    let gmode = "parallel";
    let sawSub = false;
    function draw() {
      if (gmode === "sub") {
        sawSub = true;
        triggerMission(c, "m1");
      }
      if (sawSub && gmode === "parallel") {
        triggerMission(c, "m2");
      }
      ctx.clearRect(0, 0, W, H);
      const mid = H * 0.58;
      ctx.strokeStyle = gmode === "parallel" ? "#83c167" : "#fc6255";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const spike = Math.exp(-Math.pow((x - 240) / 26, 2)) * 68 + Math.exp(-Math.pow((x - 460) / 28, 2)) * 45;
        const mismatch = gmode === "sub" ? -Math.exp(-Math.pow((x - 390) / 55, 2)) * 46 : 0;
        const y = mid - spike - mismatch;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = gmode === "parallel" ? "#83c167" : "#fc6255";
      ctx.font = "600 12px 'Fira Code', monospace";
      ctx.fillText(
        gmode === "parallel" ? "Parallel 0.05–1.5 Hz BP: Clean phasic SCR spikes (5 features)" : "Naive (raw - SCL_LP): 4,856.15 ms SCL lag creates fake negative overshoot!",
        16,
        24
      );
    }
    tabLab.querySelectorAll(".gbtn").forEach((b) =>
      b.addEventListener("click", () => {
        gmode = b.dataset.g;
        tabLab.querySelectorAll(".gbtn").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.g === gmode)));
        draw();
      })
    );
    draw();
  }

  // Lab 7: Thumb BVP, 300 ms Refractory Peak Detector, Lomb-Scargle & ω_BVP Fallback
  function renderBvpHrvLab(c) {
    tabLab.innerHTML = `
      ${renderMissionsBar(c)}
      <label style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
        <span>Elapsed Trial Time &amp; Buffer: <strong id="bvpTimeOut" style="color:var(--b1b-blue);">15.0 s (18 beats)</strong></span>
        <input id="bvpTimeSl" type="range" min="0.5" max="60" step="0.5" value="15" style="flex:1; accent-color:var(--b1b-blue);" />
      </label>
      <div class="readout-row">
        <div class="readout-cell">Peak Detector (0.5–5 Hz)<strong id="bvpPeakOut">300 ms gate (max 200 bpm, τ=111.78 ms)</strong></div>
        <div class="readout-cell">Lomb–Scargle LF / HF<strong id="bvpLsOut">Waiting for ≥ 30.0 s &amp; ≥ 10 RR intervals</strong></div>
        <div class="readout-cell">Confidence Scalar ω_BVP<strong id="bvpOmOut">ω_BVP = 1.0 (Time-domain active)</strong></div>
      </div>
    `;
    const sl = document.getElementById("bvpTimeSl");
    function upd() {
      const t = parseFloat(sl.value);
      const beats = Math.floor(t * 1.15);
      const rrCount = Math.max(0, beats - 1);
      if (rrCount < 1) triggerMission(c, "m1");
      if (t >= 32.0 && rrCount >= 10) triggerMission(c, "m2");

      document.getElementById("bvpTimeOut").textContent = `${t.toFixed(1)} s (${beats} systolic peaks, ${rrCount} RR intervals)`;
      if (rrCount < 1) {
        document.getElementById("bvpLsOut").textContent = "Cold-Start Fallback (4,070 / 153,600 windows = 2.65%)";
        document.getElementById("bvpOmOut").textContent = "ω_BVP = 0.1 (Low Confidence Fallback)";
      } else if (t < 30.0 || rrCount < 10) {
        document.getElementById("bvpLsOut").textContent = `Warming Buffer (${t.toFixed(1)}/30.0 s, ${rrCount}/10 RR)`;
        document.getElementById("bvpOmOut").textContent = "ω_BVP = 1.0 (HR, SDNN, RMSSD active)";
      } else {
        document.getElementById("bvpLsOut").textContent = "Active: Lomb–Scargle LF (0.04–0.15 Hz) & HF (0.15–0.40 Hz)";
        document.getElementById("bvpOmOut").textContent = "ω_BVP = 1.0 (All 6 BVP HRV features active)";
      }
    }
    sl.addEventListener("input", upd);
    upd();
  }

  // Lab 8: Phase 2 Kalman Filter, Feature Scaling & EEG Dropout Resilience
  function renderKalmanLab(c) {
    tabLab.innerHTML = `
      ${renderMissionsBar(c)}
      <div class="lab-canvas-sticky">
        <canvas id="labKalmanCanvas" class="stage-canvas" width="700" height="220"></canvas>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:12px;">
        <label class="btn btn-sm"><input type="checkbox" id="kDropChk" style="accent-color:var(--b1b-coral);" /> Simulate EEG Dropout (t = 20–40 s)</label>
        <label class="btn btn-sm" style="gap:8px;">Model Trust (1/Q): <input id="kTrust" type="range" min="1" max="10" value="5" style="accent-color:var(--b1b-blue);" /></label>
      </div>
      <div class="readout-row">
        <div class="readout-cell">Pre-Conditioning<strong id="kPreOut">log1p(GSR 8.73e8) + Prune FAA/TBR/BAR</strong></div>
        <div class="readout-cell">Delay &amp; Priming<strong id="kDelOut">4.86 s SCL state aug + APS carry-over</strong></div>
        <div class="readout-cell">Observer Mode<strong id="kModeOut">Nominal Sensor Fusion (ω_BVP = 1.0)</strong></div>
      </div>
    `;
    const canvas = document.getElementById("labKalmanCanvas");
    const W = 700, H = 220;
    const ctx = State.setupHiDPICanvas(canvas, W, H);
    const dropChk = document.getElementById("kDropChk");
    const trust = document.getElementById("kTrust");

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const drop = dropChk.checked;
      const trVal = parseFloat(trust.value);
      if (drop) triggerMission(c, "m1");
      if (drop && trVal >= 8) triggerMission(c, "m2");
      document.getElementById("kModeOut").textContent = drop
        ? `EEG Dropout: Inflating R_EEG, Model Trust = ${trVal}/10`
        : "Nominal Sensor Fusion (EEG + GSR + BVP)";
      const gain = 1 / (trVal * 0.4 + 0.6);

      if (drop) {
        ctx.fillStyle = "rgba(252, 98, 85, 0.12)";
        ctx.fillRect(W * 0.33, 0, W * 0.33, H);
        ctx.fillStyle = "#fc6255";
        ctx.font = "600 11.5px 'Fira Code',monospace";
        ctx.fillText("EEG DROPOUT (R_EEG → ∞)", W * 0.38, 20);
      }

      let est = H * 0.55;
      const ptsEst = [];
      ctx.strokeStyle = "#58c4dd"; ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i < 100; i++) {
        const x = (i / 99) * W;
        const truth = H * 0.52 - Math.sin(i * 0.08) * 55;
        x === 0 ? ctx.moveTo(x, truth) : ctx.lineTo(x, truth);
        const inDrop = drop && i >= 33 && i <= 66;
        const meas = truth + Math.sin(i * 1.9) * (inDrop ? 45 : 18);
        const k = inDrop ? gain * 0.25 : gain;
        est = est + k * (meas - est);
        ptsEst.push({ x, y: est, meas, inDrop });
      }
      ctx.stroke();

      ctx.strokeStyle = "#83c167"; ctx.lineWidth = 2.5; ctx.beginPath();
      ptsEst.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();

      ptsEst.forEach((p, idx) => {
        if (idx % 3 === 0 && !p.inDrop) {
          ctx.fillStyle = "#f9c846";
          ctx.beginPath(); ctx.arc(p.x, p.meas, 2.5, 0, Math.PI * 2); ctx.fill();
        }
      });
    }
    dropChk.addEventListener("change", draw);
    trust.addEventListener("input", draw);
    draw();
  }

  // Lab 9: Three-Actuator Decoupling Mixer (Music + Li 2025 Light + Azevedo 2017 Haptics)
  function renderThreeActuatorsLab(c) {
    tabLab.innerHTML = `
      ${renderMissionsBar(c)}
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
        <button class="btn btn-sm act-btn" type="button" data-a="music" aria-pressed="false">Music Alone (Agres 2023/2025 Crossover)</button>
        <button class="btn btn-sm act-btn" type="button" data-a="tri" aria-pressed="true">Full 3-Actuator Mix (Music + 180 lx Green + 52 bpm Haptics)</button>
      </div>
      <div class="readout-row">
        <div class="readout-cell">Music (Agres 2023/2025)<strong id="actMusOut">Slow Tempo (Arousal R² = 0.86–0.96)</strong></div>
        <div class="readout-cell">Light (Li et al. 2025)<strong id="actLitOut">180 lx Green (Max Valence) / 20 lx Purple (FMT/FAA)</strong></div>
        <div class="readout-cell">Haptics (Azevedo 2017)<strong id="actHapOut">52 bpm (40–65 bpm band, SCR p=0.029, STAI p=0.007)</strong></div>
      </div>
      <div class="note-box" id="actResultBox" style="margin-top:12px;"></div>
    `;
    let amode = "tri";
    let sawMusicOnly = false;
    function upd() {
      if (amode === "music") {
        sawMusicOnly = true;
        triggerMission(c, "m1");
      }
      if (sawMusicOnly && amode === "tri") {
        triggerMission(c, "m2");
      }
      const box = document.getElementById("actResultBox");
      if (amode === "music") {
        box.className = "note-box warn";
        box.innerHTML = `<strong>Tempo–Valence Crossover Active!</strong> Slowing music lowers Arousal toward -0.60, but drags Valence down from +0.75 to +0.18 (rank-deficient coupling in Q4).`;
      } else {
        box.className = "note-box good";
        box.innerHTML = `<strong>Full-Rank 2D Decoupling (rank(B_act) = 2):</strong> 180 lx Green lighting lifts Valence (+0.74) while 52 bpm wrist haptics (~20% below resting HR) damps sympathetic SCR arousal (-0.59).`;
      }
    }
    tabLab.querySelectorAll(".act-btn").forEach((b) =>
      b.addEventListener("click", () => {
        amode = b.dataset.a;
        tabLab.querySelectorAll(".act-btn").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.a === amode)));
        upd();
      })
    );
    upd();
  }

  // Lab 10: MPC vs LQR vs RL Benchmark & Anti-Inverse-Crime Stress Tester
  function renderMpcBenchmarkLab(c) {
    tabLab.innerHTML = `
      ${renderMissionsBar(c)}
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
        <button class="btn btn-sm ctrl-btn" type="button" data-c="open" aria-pressed="false">Open-Loop</button>
        <button class="btn btn-sm ctrl-btn" type="button" data-c="lqr" aria-pressed="false">Unconstrained LQR (Clipped)</button>
        <button class="btn btn-sm ctrl-btn" type="button" data-c="mpc" aria-pressed="true">Constrained MPC</button>
        <button class="btn btn-sm ctrl-btn" type="button" data-c="fmpc" aria-pressed="false">Fuzzy-MPC</button>
        <button class="btn btn-sm ctrl-btn" type="button" data-c="rl" aria-pressed="false">Model-Free RL</button>
      </div>
      <label style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
        <span>Plant–Model Mismatch (ΔA, ΔB): <strong id="misOut" style="color:var(--b1b-gold);">15%</strong></span>
        <input id="misSl" type="range" min="0" max="40" step="5" value="15" style="flex:1; accent-color:var(--b1b-gold);" />
      </label>
      <div class="readout-row">
        <div class="readout-cell">Actuator Bounds (u_min..u_max)<strong id="mpcSatOut">0 Violations (Explicit Horizon Constraints)</strong></div>
        <div class="readout-cell">Cohort Reporting (N = 32)<strong id="mpcStatOut">Fixed-Seed mean ± SD &amp; median [IQR]</strong></div>
        <div class="readout-cell">Non-Responder Benchmark<strong id="mpcNrOut">Target &lt; 38% (Sayal et al. 2025: 16–57%)</strong></div>
      </div>
    `;
    const sl = document.getElementById("misSl");
    let ctrl = "mpc";
    let sawLqrMis = false;
    function upd() {
      const mis = parseInt(sl.value, 10);
      document.getElementById("misOut").textContent = `${mis}% (${mis === 0 ? "Nominal — Inverse Crime if tested alone!" : "Anti-Inverse-Crime Active"})`;
      if (ctrl === "lqr" && mis >= 25) {
        sawLqrMis = true;
        triggerMission(c, "m1");
      }
      if (sawLqrMis && (ctrl === "mpc" || ctrl === "fmpc") && mis >= 25) {
        triggerMission(c, "m2");
      }
      const satEl = document.getElementById("mpcSatOut");
      if (ctrl === "open") {
        satEl.textContent = "Unsteered (High Tracking Error)";
      } else if (ctrl === "lqr") {
        satEl.textContent = mis >= 20 ? "Post-hoc Clipping / Windup at Bounds!" : "Clipped at u_max";
      } else if (ctrl === "mpc" || ctrl === "fmpc") {
        satEl.textContent = "0 Violations (Optimal Horizon H with |Δu| ≤ Δu_max)";
      } else {
        satEl.textContent = "Requires Exploration Episodes to Converge";
      }
    }
    tabLab.querySelectorAll(".ctrl-btn").forEach((b) =>
      b.addEventListener("click", () => {
        ctrl = b.dataset.c;
        tabLab.querySelectorAll(".ctrl-btn").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.c === ctrl)));
        upd();
      })
    );
    sl.addEventListener("input", upd);
    upd();
  }

  renderPack();
})();
