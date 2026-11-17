/* ==========================================================================
   MASTER_RESEARCH — Shared Multi-Page State, HUD (XP/Streak), Theme & Nav
   ========================================================================== */

(function () {
  const STORE_KEY = "mr_notebook_progress_v1";

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return { xp: 0, streak: 0, mastered: [] };
  }

  function saveProgress(state) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  window.NotebookState = {
    get: loadProgress,
    awardXP(amount, reason = "") {
      const st = loadProgress();
      st.xp += amount;
      st.streak += 1;
      saveProgress(st);
      renderHUD();
      showToast(`+${amount} XP${reason ? " · " + reason : ""}`);
      return st;
    },
    resetStreak() {
      const st = loadProgress();
      st.streak = 0;
      saveProgress(st);
      renderHUD();
    },
    markMastered(conceptId) {
      const st = loadProgress();
      if (!st.mastered.includes(conceptId)) {
        st.mastered.push(conceptId);
        st.xp += 30;
        saveProgress(st);
        renderHUD();
        showToast(`+30 XP · Mastered!`);
      }
      return st;
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
    if (xpEl) xpEl.textContent = `${st.xp} XP`;
    if (strEl) strEl.textContent = `${st.streak} Streak`;
  }

  // Theme initialization
  if (localStorage.getItem("mr_notebook_theme") === "light") {
    document.body.classList.add("light-theme");
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHUD();
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.setAttribute(
        "aria-pressed",
        String(document.body.classList.contains("light-theme"))
      );
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        localStorage.setItem("mr_notebook_theme", isLight ? "light" : "dark");
        themeBtn.setAttribute("aria-pressed", String(isLight));
        window.dispatchEvent(new CustomEvent("themechange"));
      });
    }
  });
})();
