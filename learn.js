/* ==========================================================================
   MASTER_RESEARCH — Concept Mastery Packs (Theory + 7 Interactive Labs + Trivia)
   ========================================================================== */

(function () {
  const DATA = window.NOTEBOOK_DATA;
  const State = window.NotebookState;
  if (!DATA || !State) return;

  const rail = document.getElementById("conceptRail");
  const tabTheory = document.getElementById("tabTheory");
  const tabLab = document.getElementById("tabLab");
  const tabTrivia = document.getElementById("tabTrivia");

  const params = new URLSearchParams(window.location.search);
  let activeId = params.get("concept") || DATA.concepts[0].id;
  if (!DATA.concepts.some((c) => c.id === activeId)) activeId = DATA.concepts[0].id;
  let activeTab = "theory";

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
        activeId = btn.dataset.cid;
        renderPack();
      });
    });
  }

  function switchTab(tabName) {
    activeTab = tabName;
    document.querySelectorAll(".pack-tab-btn").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.tab === tabName));
    });
    tabTheory.hidden = tabName !== "theory";
    tabLab.hidden = tabName !== "lab";
    tabTrivia.hidden = tabName !== "trivia";
    if (tabName === "lab") {
      const c = DATA.concepts.find((x) => x.id === activeId);
      mountLab(c.labType);
    }
  }

  document.querySelectorAll(".pack-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  function renderPack() {
    renderRail();
    const c = DATA.concepts.find((x) => x.id === activeId);
    const isMast = State.get().mastered.includes(c.id);

    document.getElementById("packTitle").textContent = c.title;
    document.getElementById("packSummary").textContent = c.summary;
    const badge = document.getElementById("packBadge");
    badge.textContent = isMast ? "Mastered" : `${c.phase} · ${c.tag}`;
    badge.className = `tag ${isMast ? "tag-green" : "tag-blue"}`;

    // 1. Theory Tab
    tabTheory.innerHTML = `
      <div class="note-box">
        <strong>Plain-English Intuition</strong>
        <p style="margin:6px 0 0;">${c.plainEnglish}</p>
      </div>
      <div class="math-block">${c.math}</div>
      <p class="muted" style="font-size:13.5px;"><strong>Verified Code / Source:</strong> <code>${c.codeRef}</code></p>
      <div style="margin-top:14px;">
        <button class="btn btn-primary btn-sm" type="button" id="goLabBtn">Launch Interactive Lab →</button>
      </div>
    `;
    document.getElementById("goLabBtn").addEventListener("click", () => switchTab("lab"));

    // 2. Trivia Tab
    let triviaCorrect = new Array(c.trivia.length).fill(false);
    tabTrivia.innerHTML =
      c.trivia
        .map(
          (t, ti) => `
      <div class="surface-lab" data-ti="${ti}">
        <strong>Q${ti + 1}. ${t.q}</strong>
        <div class="quiz-options">
          ${t.options
            .map((opt, oi) => `<button class="quiz-opt" type="button" data-oi="${oi}">${opt}</button>`)
            .join("")}
        </div>
        <p class="muted trivia-fb" style="margin:10px 0 0; font-size:13.5px;" hidden></p>
      </div>`
        )
        .join("") +
      `<div id="triviaCompleteBanner" class="note-box good" hidden>
        <strong>Concept Mastered!</strong> You answered all trivia questions correctly and earned +30 XP.
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
          if (!triviaCorrect[ti]) State.awardXP(10, "Trivia");
          triviaCorrect[ti] = true;
          if (triviaCorrect.every(Boolean)) {
            State.markMastered(c.id);
            document.getElementById("triviaCompleteBanner").hidden = false;
            renderRail();
          }
        } else {
          State.resetStreak();
        }
      });
    });

    if (activeTab === "lab") mountLab(c.labType);
  }

  // ------------------------------------------------------------------------
  // Interactive Labs Dispatcher
  // ------------------------------------------------------------------------
  function mountLab(type) {
    if (type === "circumplex") return renderCircumplexLab();
    if (type === "montage") return renderMontageLab();
    if (type === "causality") return renderCausalityLab();
    if (type === "eeg-bands") return renderEegBandsLab();
    if (type === "gsr-parallel") return renderGsrParallelLab();
    if (type === "timeline") return renderTimelineLab();
    if (type === "kalman-preview") return renderKalmanLab();
  }

  // Lab A: 2D Circumplex & Multi-Actuator Coupling
  function renderCircumplexLab() {
    tabLab.innerHTML = `
      <p class="muted" style="font-size:14px;">Tap anywhere on the 2D plane to set your target emotion <code>(V*, A*)</code>. Toggle Lighting + Haptics to see how we solve the tempo–valence crossover.</p>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
        <button class="btn btn-sm pva" type="button" data-v="-0.65" data-a="0.70">Stressed</button>
        <button class="btn btn-sm pva" type="button" data-v="0.75" data-a="-0.60">Calm (High V, Low A)</button>
        <button class="btn btn-sm pva" type="button" data-v="0.80" data-a="0.65">Make Happy</button>
        <label class="btn btn-sm" style="margin-left:auto;">
          <input type="checkbox" id="labMultiChk" checked style="accent-color:var(--b1b-blue);" /> Lighting + Haptics
        </label>
      </div>
      <canvas id="labVaCanvas" class="stage-canvas" width="700" height="330"></canvas>
      <div class="readout-row">
        <div class="readout-cell">Target (V*, A*)<strong id="rVaT">(+0.75, -0.60)</strong></div>
        <div class="readout-cell">Achieved (V, A)<strong id="rVaA">(+0.73, -0.58)</strong></div>
        <div class="readout-cell">Auxiliary Actuators<strong id="rVaAux">Green 180 lx + 52 bpm</strong></div>
      </div>
    `;
    const canvas = document.getElementById("labVaCanvas");
    const W = 700, H = 330;
    const ctx = State.setupHiDPICanvas(canvas, W, H);
    const chk = document.getElementById("labMultiChk");
    let tV = 0.75, tA = -0.60;

    function draw() {
      const cx = W / 2, cy = H / 2, r = Math.min(W, H) * 0.37;
      const isLight = document.body.classList.contains("light-theme");
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(249, 200, 70, 0.09)";
      ctx.fillRect(cx, cy, r + 24, r + 14);

      ctx.strokeStyle = isLight ? "#cbd5e1" : "#252f42";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - r - 20, cy); ctx.lineTo(cx + r + 20, cy);
      ctx.moveTo(cx, cy - r - 20); ctx.lineTo(cx, cy + r + 20); ctx.stroke();

      ctx.fillStyle = isLight ? "#111827" : "#eef2f7";
      ctx.font = "600 12px 'Fira Sans', sans-serif";
      ctx.fillText("+Valence", cx + r - 56, cy - 8);
      ctx.fillText("-Valence", cx - r + 4, cy - 8);
      ctx.fillText("+Arousal", cx + 8, cy - r - 6);
      ctx.fillText("-Arousal", cx + 8, cy + r + 16);

      const multi = chk.checked;
      let aV = multi ? tV * 0.97 : (tV > 0.2 && tA < 0 ? tV - Math.min(0.85, (tV - 0.1) * Math.abs(tA) * 0.95) : tV);
      let aA = multi ? tA * 0.97 : (tA > 0.5 ? tA * 0.72 : tA * 0.92);

      const tx = cx + tV * r, ty = cy - tA * r;
      const ax = cx + aV * r, ay = cy - aA * r;

      ctx.strokeStyle = multi ? "#83c167" : "#fc6255";
      ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(ax, ay); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#58c4dd";
      ctx.beginPath(); ctx.arc(tx, ty, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = multi ? "#83c167" : "#fc6255";
      ctx.beginPath(); ctx.arc(ax, ay, 7, 0, Math.PI * 2); ctx.fill();

      const fmt = (n) => (n >= 0 ? `+${n.toFixed(2)}` : n.toFixed(2));
      document.getElementById("rVaT").textContent = `(${fmt(tV)}, ${fmt(tA)})`;
      document.getElementById("rVaA").textContent = `(${fmt(aV)}, ${fmt(aA)})`;
      document.getElementById("rVaAux").textContent = multi
        ? (tA < 0 ? "Green 180 lx + 52 bpm" : "Purple 20 lx + Standby")
        : "OFF (Crossover Drop!)";
    }
    canvas.addEventListener("click", (e) => {
      const rct = canvas.getBoundingClientRect();
      const px = ((e.clientX - rct.left) / rct.width) * W;
      const py = ((e.clientY - rct.top) / rct.height) * H;
      const rad = Math.min(W, H) * 0.37;
      tV = Math.max(-1, Math.min(1, (px - W / 2) / rad));
      tA = Math.max(-1, Math.min(1, (H / 2 - py) / rad));
      draw();
    });
    tabLab.querySelectorAll(".pva").forEach((b) =>
      b.addEventListener("click", () => { tV = parseFloat(b.dataset.v); tA = parseFloat(b.dataset.a); draw(); })
    );
    chk.addEventListener("change", draw);
    draw();
  }

  // Lab B: 10-20 Montage Explorer
  function renderMontageLab() {
    tabLab.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
        <button class="btn btn-sm mbtn" type="button" data-m="full_32" aria-pressed="true">full_32 (146 feats)</button>
        <button class="btn btn-sm mbtn" type="button" data-m="wearable_6" aria-pressed="false">wearable_6 (38 feats)</button>
        <button class="btn btn-sm mbtn" type="button" data-m="wearable_4" aria-pressed="false">wearable_4 (29 feats)</button>
      </div>
      <div class="grid-2" style="align-items:start;">
        <svg id="labHeadSvg" viewBox="0 0 280 280" style="width:100%; max-width:280px; background:var(--bg-code); border:1px solid var(--border); border-radius:12px; margin:0 auto; display:block;"></svg>
        <div>
          <h3 id="lmTitle"></h3>
          <p id="lmDesc" class="muted" style="font-size:14px;"></p>
          <div class="readout-row">
            <div class="readout-cell">EEG Channels<strong id="lmCh"></strong></div>
            <div class="readout-cell">Total Features<strong id="lmFeat"></strong></div>
            <div class="readout-cell">Mean Latency<strong id="lmLat"></strong></div>
          </div>
          <div class="note-box" style="margin-top:12px;">
            <strong id="lmElecName">Tap any electrode on the head map</strong>
            <p id="lmElecRole" style="margin:4px 0 0; font-size:13.5px;">See its Geneva BioSemi index &amp; function.</p>
          </div>
        </div>
      </div>
    `;
    const svg = document.getElementById("labHeadSvg");
    function setM(key) {
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
        const pick = () => {
          document.getElementById("lmElecName").textContent = `${g.dataset.n} (Geneva Index ${g.dataset.i})`;
          document.getElementById("lmElecRole").textContent = g.dataset.r;
        };
        g.addEventListener("click", pick);
      });
    }
    tabLab.querySelectorAll(".mbtn").forEach((b) => b.addEventListener("click", () => setM(b.dataset.m)));
    setM("wearable_6");
  }

  // Lab C: Causality Simulator
  function renderCausalityLab() {
    tabLab.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
        <button class="btn btn-sm fbtn" type="button" data-m="causal" aria-pressed="true">Causal SOS (0.0 leak)</button>
        <button class="btn btn-sm fbtn" type="button" data-m="acausal" aria-pressed="false">Acausal filtfilt (27.60 leak)</button>
        <button class="btn btn-sm fbtn" type="button" data-m="both" aria-pressed="false">Compare Both</button>
      </div>
      <canvas id="labCausCanvas" class="stage-canvas" width="700" height="250"></canvas>
    `;
    const canvas = document.getElementById("labCausCanvas");
    const W = 700, H = 250;
    const ctx = State.setupHiDPICanvas(canvas, W, H);
    let mode = "causal";
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const bx = W * 0.56, by = H * 0.58;
      ctx.strokeStyle = "#f9c846"; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(bx, 18); ctx.lineTo(bx, H - 16); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "#f9c846"; ctx.font = "600 12px 'Fira Code',monospace";
      ctx.fillText("Sample 1024 (20 Hz Burst)", bx - 88, 14);

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

  // Lab D: EEG Bandpower & FAA (F4 - F3) Explorer
  function renderEegBandsLab() {
    tabLab.innerHTML = `
      <p class="muted" style="font-size:14px;">Adjust right frontal (<code>F4</code>) and left frontal (<code>F3</code>) log-alpha power to see how <strong>Frontal Alpha Asymmetry (FAA = F4 - F3)</strong> shifts emotional Valence!</p>
      <div class="grid-2">
        <label class="surface-lab" style="margin:0;">
          F4 Alpha Log-Power: <strong id="f4Val">1.20</strong>
          <input id="f4Slider" type="range" min="-2" max="2" step="0.1" value="1.2" style="width:100%; accent-color:var(--b1b-blue);" />
        </label>
        <label class="surface-lab" style="margin:0;">
          F3 Alpha Log-Power: <strong id="f3Val">0.40</strong>
          <input id="f3Slider" type="range" min="-2" max="2" step="0.1" value="0.4" style="width:100%; accent-color:var(--b1b-gold);" />
        </label>
      </div>
      <div class="readout-row">
        <div class="readout-cell">FAA (F4 - F3)<strong id="faaOut">+0.80</strong></div>
        <div class="readout-cell">Approach / Valence Bias<strong id="faaBias">Positive / Approach</strong></div>
      </div>
    `;
    const f4 = document.getElementById("f4Slider");
    const f3 = document.getElementById("f3Slider");
    function upd() {
      const v4 = parseFloat(f4.value), v3 = parseFloat(f3.value);
      const faa = v4 - v3;
      document.getElementById("f4Val").textContent = v4.toFixed(2);
      document.getElementById("f3Val").textContent = v3.toFixed(2);
      document.getElementById("faaOut").textContent = (faa >= 0 ? "+" : "") + faa.toFixed(2);
      document.getElementById("faaBias").textContent =
        faa > 0.15 ? "Positive / Approach" : faa < -0.15 ? "Negative / Withdrawal" : "Neutral";
    }
    f4.addEventListener("input", upd);
    f3.addEventListener("input", upd);
    upd();
  }

  // Lab E: GSR Parallel vs Subtractive Phase Mismatch
  function renderGsrParallelLab() {
    tabLab.innerHTML = `
      <p class="muted" style="font-size:14px;">Toggle between our <strong>Parallel Bandpass SCR</strong> and naive <strong>Subtractive (Raw - 0.05 Hz Lowpass)</strong> to see why a 4.86 s group delay ruins subtraction.</p>
      <div style="display:flex; gap:8px; margin-bottom:12px;">
        <button class="btn btn-sm gbtn" type="button" data-g="parallel" aria-pressed="true">Parallel SCR (Clean)</button>
        <button class="btn btn-sm gbtn" type="button" data-g="sub" aria-pressed="false">Naive Subtract (Phase Mismatch)</button>
      </div>
      <canvas id="labGsrCanvas" class="stage-canvas" width="700" height="220"></canvas>
    `;
    const canvas = document.getElementById("labGsrCanvas");
    const W = 700, H = 220;
    const ctx = State.setupHiDPICanvas(canvas, W, H);
    let gmode = "parallel";
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const mid = H * 0.55;
      ctx.strokeStyle = gmode === "parallel" ? "#83c167" : "#fc6255";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const spike = Math.exp(-Math.pow((x - 260) / 28, 2)) * 65;
        const mismatch = gmode === "sub" ? -Math.exp(-Math.pow((x - 440) / 55, 2)) * 42 + Math.sin(x * 0.08) * 10 : 0;
        const y = mid - spike - mismatch;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = gmode === "parallel" ? "#83c167" : "#fc6255";
      ctx.font = "600 12px 'Fira Sans', sans-serif";
      ctx.fillText(gmode === "parallel" ? "Clean phasic SCR spike (331.98 ms delay)" : "Fake negative dip from 4.86 s delayed SCL subtraction!", 16, 24);
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

  // Lab F: 63s Trial Timeline
  function renderTimelineLab() {
    tabLab.innerHTML = `
      <label style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
        <span>Trial Time: <strong id="ltOut" style="color:var(--b1b-blue); font-family:var(--font-mono);">15.0 s</strong></span>
        <input id="ltSlider" type="range" min="0" max="63" step="0.5" value="15" style="flex:1; accent-color:var(--b1b-blue);" />
      </label>
      <div class="readout-row">
        <div class="readout-cell">Epoch<strong id="ltPhase"></strong></div>
        <div class="readout-cell">EEG (2.0 s)<strong id="ltEeg"></strong></div>
        <div class="readout-cell">GSR (30.0 s)<strong id="ltGsr"></strong></div>
        <div class="readout-cell">BVP HRV<strong id="ltBvp"></strong></div>
      </div>
    `;
    const sl = document.getElementById("ltSlider");
    function upd() {
      const t = parseFloat(sl.value);
      document.getElementById("ltOut").textContent = `${t.toFixed(1)} s`;
      if (t < 3) {
        document.getElementById("ltPhase").textContent = "Baseline Fixation (0–3 s)";
        document.getElementById("ltEeg").textContent = "Fitting P_base (0:384)";
        document.getElementById("ltGsr").textContent = "Fitting Baseline SCL";
        document.getElementById("ltBvp").textContent = "Baseline Calibration";
      } else {
        const st = t - 3;
        document.getElementById("ltPhase").textContent = `Stimulus Step k = ${Math.floor(st / 0.5)} / 120`;
        document.getElementById("ltEeg").textContent = st < 2 ? `Warming (${st.toFixed(1)}/2 s)` : "Active (256 samples)";
        document.getElementById("ltGsr").textContent = st < 30 ? `Filling (${st.toFixed(1)}/30 s)` : "Full 30 s FIFO";
        document.getElementById("ltBvp").textContent = st < 30 ? "Cold Start (ω_BVP = 0.1)" : "Lomb–Scargle Active (ω = 1.0)";
      }
    }
    sl.addEventListener("input", upd);
    upd();
  }

  // Lab G: Kalman Filter & EEG Dropout Preview (Phase 2-4)
  function renderKalmanLab() {
    tabLab.innerHTML = `
      <p class="muted" style="font-size:14px;">Simulate a <strong>Kalman Filter</strong> tracking true emotion (blue) from noisy sensors (gold dots). Toggle an <strong>EEG Dropout</strong> mid-trial to see how the filter relies on its state-space model + slow peripheral sensors!</p>
      <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
        <label class="btn btn-sm"><input type="checkbox" id="kDropChk" style="accent-color:var(--b1b-coral);" /> Simulate EEG Dropout (t = 20–40 s)</label>
        <label class="btn btn-sm" style="gap:8px;">Model Trust (1/Q): <input id="kTrust" type="range" min="1" max="10" value="5" style="accent-color:var(--b1b-blue);" /></label>
      </div>
      <canvas id="labKalmanCanvas" class="stage-canvas" width="700" height="240"></canvas>
    `;
    const canvas = document.getElementById("labKalmanCanvas");
    const W = 700, H = 240;
    const ctx = State.setupHiDPICanvas(canvas, W, H);
    const dropChk = document.getElementById("kDropChk");
    const trust = document.getElementById("kTrust");

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const drop = dropChk.checked;
      const gain = 1 / (parseFloat(trust.value) * 0.4 + 0.6);

      if (drop) {
        ctx.fillStyle = "rgba(252, 98, 85, 0.12)";
        ctx.fillRect(W * 0.33, 0, W * 0.33, H);
        ctx.fillStyle = "#fc6255";
        ctx.font = "600 11.5px 'Fira Code',monospace";
        ctx.fillText("EEG DROPOUT ZONE", W * 0.41, 20);
      }

      // True trajectory (3b1b blue) + Kalman estimate (3b1b green)
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

      ctx.font = "600 12px 'Fira Sans', sans-serif";
      ctx.fillStyle = "#58c4dd"; ctx.fillText("True Emotion", 14, 22);
      ctx.fillStyle = "#83c167"; ctx.fillText("Kalman Estimate", 115, 22);
      ctx.fillStyle = "#f9c846"; ctx.fillText("Noisy Sensors", 230, 22);
    }
    dropChk.addEventListener("change", draw);
    trust.addEventListener("input", draw);
    draw();
  }

  renderPack();
})();
