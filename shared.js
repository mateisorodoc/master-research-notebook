/* ==========================================================================
   MASTER_RESEARCH — Zero-to-Hero Shared State, Web Audio, 5 Theme Pairs & HUD
   ========================================================================== */

(function () {
  const STORE_KEY = "mr_notebook_progress_v1";

  function defaultState() {
    return {
      xp: 0,
      streak: 0,
      combo: 0,
      maxCombo: 0,
      depthLevel: 1, // 1: Intuition, 2: Practitioner, 3: Mastery
      muted: false,
      themePair: "1", // "1".."5"
      mastered: [],
      labMissionsCleared: [],
      missedQuestions: [],
      capstoneCleared: false
    };
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    } catch (_) {}
    return defaultState();
  }

  function saveProgress(state) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  // Zero-dependency Web Audio API Synthesizer + Mobile Haptics
  let audioCtx = null;
  function playSound(type) {
    const st = loadProgress();
    if (st.muted) return;
    try {
      if (navigator.vibrate) {
        if (type === "tap") navigator.vibrate(6);
        else if (type === "correct" || type === "missionClear") navigator.vibrate([10, 25, 18]);
        else if (type === "wrong") navigator.vibrate(25);
      }
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const now = audioCtx.currentTime;

      const tone = (freq, start, dur, wave = "sine", gainVal = 0.045) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = wave;
        osc.frequency.setValueAtTime(freq, start);
        g.gain.setValueAtTime(gainVal, start);
        g.gain.exponentialRampToValueAtTime(0.0008, start + dur);
        osc.connect(g);
        g.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + dur);
      };

      if (type === "tap") {
        tone(240, now, 0.035, "sine", 0.03);
      } else if (type === "correct") {
        tone(523.25, now, 0.11, "triangle", 0.05);
        tone(659.25, now + 0.08, 0.16, "triangle", 0.05);
      } else if (type === "combo") {
        tone(523.25, now, 0.08, "triangle", 0.05);
        tone(659.25, now + 0.07, 0.08, "triangle", 0.05);
        tone(783.99, now + 0.14, 0.18, "triangle", 0.06);
      } else if (type === "missionClear") {
        tone(523.25, now, 0.28, "triangle", 0.045);
        tone(659.25, now + 0.04, 0.26, "triangle", 0.045);
        tone(783.99, now + 0.08, 0.28, "triangle", 0.05);
      } else if (type === "wrong") {
        tone(165, now, 0.09, "sawtooth", 0.035);
        tone(135, now + 0.07, 0.12, "sawtooth", 0.035);
      }
    } catch (_) {}
  }

  function computeRank(st) {
    if (st.xp >= 1200 && st.capstoneCleared) return "Grandmaster";
    if (st.xp >= 800) return "Architect";
    if (st.xp >= 400) return "Practitioner";
    if (st.xp >= 150) return "Apprentice";
    return "Novice";
  }

  function comboMultiplier(combo) {
    if (combo >= 6) return 5;
    if (combo >= 4) return 3;
    if (combo >= 2) return 2;
    return 1;
  }

  window.NotebookState = {
    get: loadProgress,
    playSound,
    getRank() {
      return computeRank(loadProgress());
    },
    awardXP(baseAmount, reason = "") {
      const st = loadProgress();
      st.streak += 1;
      st.combo = (st.combo || 0) + 1;
      if (st.combo > (st.maxCombo || 0)) st.maxCombo = st.combo;
      const mult = comboMultiplier(st.combo);
      const total = baseAmount * mult;
      st.xp += total;
      saveProgress(st);
      renderHUD();
      playSound(mult >= 2 ? "combo" : "correct");
      const multTxt = mult > 1 ? ` (${mult}x Combo!)` : "";
      showToast(`+${total} XP${multTxt}${reason ? " · " + reason : ""}`);
      return st;
    },
    resetStreak(missedItem) {
      const st = loadProgress();
      st.streak = 0;
      st.combo = 0;
      if (missedItem && missedItem.q) {
        const exists = st.missedQuestions.some((m) => m.q === missedItem.q);
        if (!exists) {
          st.missedQuestions.push(missedItem);
        }
      }
      saveProgress(st);
      renderHUD();
      playSound("wrong");
    },
    clearMissedQuestion(qText) {
      const st = loadProgress();
      st.missedQuestions = st.missedQuestions.filter((m) => m.q !== qText);
      st.xp += 15;
      saveProgress(st);
      renderHUD();
      playSound("correct");
      showToast("+15 XP · Mistake Cleared!");
    },
    completeMission(conceptId, missionId, xp = 25) {
      const key = `${conceptId}:${missionId}`;
      const st = loadProgress();
      if (!st.labMissionsCleared.includes(key)) {
        st.labMissionsCleared.push(key);
        st.xp += xp;
        saveProgress(st);
        renderHUD();
        playSound("missionClear");
        showToast(`+${xp} XP · Lab Mission Cleared!`);
        return true;
      }
      return false;
    },
    isMissionDone(conceptId, missionId) {
      return loadProgress().labMissionsCleared.includes(`${conceptId}:${missionId}`);
    },
    markMastered(conceptId) {
      const st = loadProgress();
      if (!st.mastered.includes(conceptId)) {
        st.mastered.push(conceptId);
        st.xp += 30;
        saveProgress(st);
        renderHUD();
        playSound("missionClear");
        showToast("+30 XP · Concept Mastered!");
      }
      return st;
    },
    completeCapstone() {
      const st = loadProgress();
      if (!st.capstoneCleared) {
        st.capstoneCleared = true;
        st.xp += 100;
        saveProgress(st);
        renderHUD();
        playSound("missionClear");
        showToast("+100 XP · Capstone Diagnostic Cleared!");
      }
      return st;
    },
    getDepth() {
      return loadProgress().depthLevel || 1;
    },
    setDepth(lvl) {
      const st = loadProgress();
      st.depthLevel = lvl;
      saveProgress(st);
      playSound("tap");
      window.dispatchEvent(new CustomEvent("depthchange", { detail: { level: lvl } }));
    },
    setThemePair(val) {
      const st = loadProgress();
      st.themePair = String(val);
      saveProgress(st);
      document.body.setAttribute("data-theme-pair", String(val));
      const sel = document.getElementById("themePairSelect");
      if (sel) sel.value = String(val);
      playSound("tap");
      window.dispatchEvent(new CustomEvent("themechange"));
    },
    setupHiDPICanvas(canvas, logicalW, logicalH) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = logicalW * dpr;
      canvas.height = logicalH * dpr;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return ctx;
    }
  };

  function showToast(msg) {
    let toast = document.getElementById("xpToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "xpToast";
      toast.className = "xp-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function renderHUD() {
    const st = loadProgress();
    const xpEl = document.getElementById("hudXp");
    const strEl = document.getElementById("hudStreak");
    const mult = comboMultiplier(st.combo || 0);
    const isNarrow = window.innerWidth < 480;
    if (xpEl) xpEl.textContent = isNarrow ? `${st.xp} XP` : `${st.xp} XP · ${computeRank(st)}`;
    if (strEl) strEl.textContent = mult > 1 ? `${st.streak} Streak (${mult}x)` : `${st.streak} Streak`;
  }

  // Apply persisted light/dark and theme pair
  const initSt = loadProgress();
  if (localStorage.getItem("mr_notebook_theme") === "light") {
    document.body.classList.add("light-theme");
  }
  document.body.setAttribute("data-theme-pair", initSt.themePair || "1");

  document.addEventListener("DOMContentLoaded", () => {
    renderHUD();

    // Inject 5-Theme Pair Selector + Sound Mute Toggle into .hud-group
    const hud = document.querySelector(".hud-group");
    if (hud && !document.getElementById("themePairSelect")) {
      const sel = document.createElement("select");
      sel.id = "themePairSelect";
      sel.className = "theme-select";
      sel.setAttribute("aria-label", "Select color theme pair");
      const pairs = [
        ["1", "01 · 3b1b Cinema"],
        ["2", "02 · Starship Terminal"],
        ["3", "03 · Miura Fold Sheet"],
        ["4", "04 · VU Meter Bridge"],
        ["5", "05 · Shallow Basin"]
      ];
      pairs.forEach(([val, label]) => {
        const opt = document.createElement("option");
        opt.value = val;
        opt.textContent = label;
        if (val === (loadProgress().themePair || "1")) opt.selected = true;
        sel.appendChild(opt);
      });
      sel.addEventListener("change", () => {
        const st = loadProgress();
        st.themePair = sel.value;
        saveProgress(st);
        document.body.setAttribute("data-theme-pair", sel.value);
        playSound("tap");
        window.dispatchEvent(new CustomEvent("themechange"));
      });
      hud.insertBefore(sel, hud.firstChild);

      const muteBtn = document.createElement("button");
      muteBtn.id = "muteToggleBtn";
      muteBtn.className = "btn btn-sm";
      muteBtn.type = "button";
      const syncMute = () => {
        const m = loadProgress().muted;
        muteBtn.setAttribute("aria-pressed", String(m));
        muteBtn.setAttribute("aria-label", m ? "Unmute sound effects" : "Mute sound effects");
        muteBtn.innerHTML = m
          ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
          : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
      };
      syncMute();
      muteBtn.addEventListener("click", () => {
        const st = loadProgress();
        st.muted = !st.muted;
        saveProgress(st);
        syncMute();
        if (!st.muted) playSound("tap");
      });
      hud.appendChild(muteBtn);
    }

    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", String(document.body.classList.contains("light-theme")));
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        localStorage.setItem("mr_notebook_theme", isLight ? "light" : "dark");
        themeBtn.setAttribute("aria-pressed", String(isLight));
        playSound("tap");
        window.dispatchEvent(new CustomEvent("themechange"));
      });
    }

    // Ensure mobile bottom nav includes Roadmap tab on every page
    const bNav = document.querySelector(".mobile-bottom-nav");
    if (bNav && !bNav.querySelector('a[href="roadmap.html"]')) {
      const a = document.createElement("a");
      a.className = "bottom-tab";
      a.href = "roadmap.html";
      if (window.location.pathname.endsWith("roadmap.html")) {
        a.setAttribute("aria-current", "page");
      }
      a.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg><span>Roadmap</span>';
      bNav.appendChild(a);
    }

    // Global Desktop Keyboard Shortcuts (D = depth, M = mute, / = search)
    document.addEventListener("keydown", (e) => {
      if (e.target && ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      if (e.key === "m" || e.key === "M") {
        const mb = document.getElementById("muteToggleBtn");
        if (mb) mb.click();
      } else if (e.key === "d" || e.key === "D") {
        const cur = window.NotebookState.getDepth();
        window.NotebookState.setDepth((cur % 3) + 1);
      } else if (e.key === "/") {
        const search = document.querySelector('input[type="search"], #glossSearch');
        if (search) {
          e.preventDefault();
          search.focus();
        }
      }
    });
  });
})();
