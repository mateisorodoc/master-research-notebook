/* ==========================================================================
   MASTER_RESEARCH — Comprehensive Data for Multi-Page Learning Platform
   All numbers strictly verified from workspace artifacts & primary PDFs.
   ========================================================================== */

window.NOTEBOOK_DATA = {
  meta: {
    title: "2D Affective Control — Interactive Learning Notebook",
    lastUpdated: "2026-11-17",
    currentPhase: "Phase 1 Complete — Phase 2 Next",
    testsPassed: "18 / 18 passed (95% coverage)",
    totalWindows: "153,600 valid control steps (1,280 trials × 120 steps @ Δt = 0.5 s)",
    causalityLeak: "0.0 (causal SOS) vs. 27.595335 log-power units (acausal filtfilt)"
  },

  concepts: [
    {
      id: "circumplex",
      title: "1. 2D Valence–Arousal Space",
      phase: "Phase 0–1",
      tag: "Core Principle",
      labType: "circumplex",
      summary: "How we map every human emotion onto two continuous axes (Valence & Arousal) and why closed-loop control beats passive detection.",
      plainEnglish: "Instead of labeling emotions with rigid words like 'angry' or 'happy', Russell's Circumplex Model places your state on a 2D map: Valence (unpleasant to pleasant, left to right) and Arousal (calm/sleepy to excited/stressed, bottom to top). Most BCI studies are open-loop (they only read the map). Our system is closed-loop: like a thermostat, it continuously nudges you toward a target coordinate (V*, A*).",
      math: "x_k = [Valence_k, Arousal_k]^T ∈ R^2,   Δt = 0.5 s",
      codeRef: "main.tex §1 (Introduction), Russell (1980)",
      trivia: [
        {
          q: "What is the main difference between an open-loop and a closed-loop Affective BCI?",
          options: [
            "Open-loop only detects emotion; closed-loop continuously adapts stimuli (music, light, haptics) to steer emotion.",
            "Open-loop uses 32 EEG channels; closed-loop uses 64.",
            "Closed-loop only works offline after the experiment ends."
          ],
          answer: 0,
          explain: "Closed-loop control closes the feedback loop: Measure → Estimate State → Adjust Actuators → Repeat every 0.5 s."
        },
        {
          q: "In Russell's 2D Circumplex Model, what does high Valence + low Arousal represent?",
          options: [
            "Stressed / Anxious",
            "Calm / Content / Relaxed",
            "Sad / Fatigued"
          ],
          answer: 1,
          explain: "High Valence = pleasant, Low Arousal = calm. That's the exact target of our 'Calm' trajectory!"
        }
      ]
    },
    {
      id: "deap-data",
      title: "2. DEAP Dataset & SAM Fix",
      phase: "Phase 1",
      tag: "DATA-ID",
      labType: "timeline",
      summary: "32 participants × 40 one-minute videos at 128 Hz, and how we rescued 439 inverted Quadrant-1 trials.",
      plainEnglish: "DEAP is our real-world physiological ground truth: 32 people watched 40 music videos (63 s each: 3 s neutral baseline + 60 s video) while 32 EEG + 8 body channels recorded at 128 Hz. During our Phase 1 audit, we caught a hidden bug in DEAP's .dat['labels']: all 439 Quadrant-1 trials (Valence > 5 and Arousal > 5) were stored inverted as (9.0 - rating), turning 9.00 into 0.00! We restored all 1,280 trials from participant_ratings.xls.",
      math: "Shape = (40 trials, 40 ch, 8064 samples) @ 128 Hz  |  1,280 trials × 120 steps = 153,600 windows",
      codeRef: "src/data/loader.py → DEAPLoader.load_subject(..., use_metadata_labels=True)",
      trivia: [
        {
          q: "How long is the pre-stimulus baseline fixation epoch in every DEAP trial?",
          options: ["1.0 s (128 samples)", "3.0 s (384 samples)", "10.0 s (1280 samples)"],
          answer: 1,
          explain: "Samples 0:384 (3.0 s at 128 Hz) are the neutral fixation baseline used for causal normalization."
        },
        {
          q: "Why did raw DEAP .dat['labels'] have 40 exact 0.00 ratings?",
          options: [
            "Participants fell asleep during those trials.",
            "All 439 Quadrant-1 trials were stored inverted as (9.0 - rating), so 9.00 became 0.00.",
            "The EEG cap disconnected."
          ],
          answer: 1,
          explain: "Cross-checking participant_ratings.xls (verified to 1e-6 against Dominance/Liking) restored all 439 Q1 trials!"
        }
      ]
    },
    {
      id: "montages",
      title: "3. Wearable EEG Montages",
      phase: "Phase 1",
      tag: "DATA-ID",
      labType: "montage",
      summary: "Comparing the 32-channel lab cap against practical 6-electrode and 4-electrode wearable subsets.",
      plainEnglish: "Nobody wears a 32-electrode gel cap at their desk. We benchmark full_32 (146 features, 0.903 ms/step) against wearable_6 (Fz, F3, F4, P4, T7, T8 → 38 features, 0.842 ms/step) and wearable_4 (AF3, AF4, T7, T8 → 29 features, 0.822 ms/step). Crucially, DEAP uses the Geneva BioSemi sequence, which differs from MNE's default biosemi32 template at 30 of 32 positions—so we map channel indices explicitly!",
      math: "D_full = 135 EEG + 11 Periph = 146  |  D_w6 = 27 + 11 = 38  |  D_w4 = 18 + 11 = 29",
      codeRef: "src/data/loader.py (MONTAGE_CHANNELS), src/features/eeg_pipeline.py",
      trivia: [
        {
          q: "Which electrodes are in our wearable_6 montage?",
          options: [
            "Fz, F3, F4, P4, T7, T8",
            "Fp1, Fp2, O1, O2, Cz, Pz",
            "AF7, AF8, TP9, TP10, Oz, Cz"
          ],
          answer: 0,
          explain: "wearable_6 uses Fz (TBR), F3 & F4 (FAA), P4 (BAR), and temporal T7 & T8."
        },
        {
          q: "Why must we NOT use MNE's default 'biosemi32' channel order on DEAP?",
          options: [
            "MNE only supports 16 channels.",
            "DEAP's Geneva acquisition sequence differs from MNE's default biosemi32 at 30 of 32 positions.",
            "MNE uses 256 Hz."
          ],
          answer: 1,
          explain: "Only Fp1 (index 0) and Oz (index 31) match! Using explicit Geneva indices prevents spatial scrambling."
        }
      ]
    },
    {
      id: "causal-filters",
      title: "4. Causal DSP & Zero Lookahead",
      phase: "Phase 1",
      tag: "Signal Processing",
      labType: "causality",
      summary: "Why acausal filtfilt is an 'inverse crime' and how forward-only SOS filters + zi state give 0.0 lookahead.",
      plainEnglish: "A digital filter removes unwanted frequencies. Offline tools like scipy.signal.filtfilt filter forward and then backward in time—which peeks into the future! In real-time control, you only have past and present samples. We use forward-only Butterworth Second-Order Sections (sosfilt) with persistent state zi initialized at steady state (sosfilt_zi * x[0]).",
      math: "y_k, z_k = sosfilt(SOS, x_k, zi=z_{k-1})  |  Causal Leak = 0.0 vs. filtfilt Leak = 27.595335",
      codeRef: "src/features/causal_dsp.py → CausalSOSFilter, impute_causal_nans",
      trivia: [
        {
          q: "What happens if you inject a 10^5 uV, 20 Hz burst at sample 1024 in our causal pipeline?",
          options: [
            "Features at t <= 1024 change by 0.0 (exact bitwise zero).",
            "Features at t <= 1024 jump by 27.60 units.",
            "The filter crashes with NaN."
          ],
          answer: 0,
          explain: "Strict causality means future inputs at t >= 1024 can NEVER affect outputs at t <= 1024."
        },
        {
          q: "Why do we initialize zi using sosfilt_zi(sos) * x[0]?",
          options: [
            "To double the sampling rate.",
            "To start the filter at steady state and prevent a huge startup transient spike.",
            "To make the filter acausal."
          ],
          answer: 1,
          explain: "Steady-state initialization eliminates artificial ringing on the very first sample of a trial."
        }
      ]
    },
    {
      id: "eeg-features",
      title: "5. EEG Spectral & Asymmetry Features",
      phase: "Phase 1",
      tag: "Neuroscience",
      labType: "eeg-bands",
      summary: "Sliding 2.0 s Hamming rFFT across Theta, Alpha, Beta, Gamma plus Frontal Alpha Asymmetry (FAA).",
      plainEnglish: "Every 0.5 s, we take the last 2.0 s (256 samples) of causally filtered EEG (4–45 Hz), multiply by a Hamming window to reduce spectral leakage, and run an rFFT. We integrate power in 4 bands: Theta (4–8 Hz, effort), Alpha (8–12 Hz, relaxation/valence), Beta (12–30 Hz, active thought), Gamma (30–45 Hz, emotion). Then we take log-power minus the 3.0 s baseline log-power, and compute Frontal Alpha Asymmetry (F4 - F3).",
      math: "ΔP̃[k,c,b] = ln(P[k,c,b] + ε) - ln(P_base[c,b] + ε),   ε = 1e-12",
      codeRef: "src/features/eeg_pipeline.py → CausalEEGPipeline",
      trivia: [
        {
          q: "In wearable_6, what are the 3 derived neurophysiological indices?",
          options: [
            "FAA (F4 - F3), Theta/Beta Ratio (Fz), and Beta/Alpha Ratio (P4).",
            "Heart Rate, SDNN, and RMSSD.",
            "SCL mean, SCL slope, and SCR power."
          ],
          answer: 0,
          explain: "F4-F3 tracks valence asymmetry, Fz TBR tracks mental effort, and P4 BAR tracks cognitive demand."
        },
        {
          q: "Why do we add ε = 1e-12 inside ln(P + ε)?",
          options: [
            "To boost Gamma power.",
            "To prevent ln(0) = -Inf if a channel flatlines.",
            "To convert Hz to ms."
          ],
          answer: 1,
          explain: "Numerical safety! Tested explicitly in test_numerical_stability.py with flatline zero inputs."
        }
      ]
    },
    {
      id: "gsr-features",
      title: "6. Finger GSR (Parallel SCL & SCR)",
      phase: "Phase 1",
      tag: "Autonomic",
      labType: "gsr-parallel",
      summary: "Separating slow tonic sweat (SCL) from fast phasic spikes (SCR) without phase-mismatch distortion.",
      plainEnglish: "Galvanic Skin Response (Channel 37 / Index 36) measures sympathetic arousal via sweat glands. It has two parts: slow background drift (SCL, < 0.05 Hz) and fast spikes (SCR, 0.05–1.5 Hz). A naive approach subtracts (raw - SCL), but our 0.05 Hz lowpass filter lags by 621.59 samples (4.86 s)! Subtracting a 4.86 s delayed signal from undelayed raw GSR creates fake ripples. So we run two parallel 2nd-order filters instead.",
      math: "SCL: 0.05 Hz LP (τ = 4,856.15 ms)  ||  SCR: 0.05–1.5 Hz BP (τ = 331.98 ms)  → 5 features",
      codeRef: "src/features/gsr_pipeline.py → CausalGSRPipeline",
      trivia: [
        {
          q: "Why do we avoid subtracting (raw_GSR - SCL_lowpass) to get phasic SCR?",
          options: [
            "The 0.05 Hz lowpass has a ~4.86 s group delay, causing phase-mismatch gain peaking.",
            "DEAP does not record GSR.",
            "SCR only exists above 30 Hz."
          ],
          answer: 0,
          explain: "Parallel filtering (LP for SCL, BP for SCR) completely avoids phase-mismatch artifacts!"
        }
      ]
    },
    {
      id: "bvp-features",
      title: "7. Thumb BVP, HRV & Cold Start",
      phase: "Phase 1",
      tag: "Autonomic",
      labType: "timeline",
      summary: "Systolic peak detection, 200 bpm refractory cap, Lomb–Scargle LF/HF, and ω_BVP = 0.1 fallback.",
      plainEnglish: "Thumb Blood Volume Pulse (Channel 39 / Index 38) tracks your heartbeat. After a 0.5–5.0 Hz bandpass (111.78 ms delay), a 1-sample-delayed peak detector finds heartbeats with a 300 ms refractory gate (so noise can't trigger > 200 bpm). Because heartbeats are unevenly spaced, we use Lomb–Scargle periodograms for LF (0.04–0.15 Hz) and HF (0.15–0.40 Hz) once >= 10 beats and >= 30 s have elapsed. If < 2 beats occur (4,070 of 153,600 windows = 2.65%), we fall back cleanly and emit ω_BVP = 0.1.",
      math: "6 features: HR, SDNN, RMSSD, LF, HF, LF/HF  |  ω_BVP ∈ {0.1, 1.0}",
      codeRef: "src/features/bvp_pipeline.py → CausalBVPPipeline",
      trivia: [
        {
          q: "Why does BVP use Lomb–Scargle instead of standard FFT for LF/HF HRV?",
          options: [
            "Heartbeat intervals (RR intervals) are unevenly spaced in time, which Lomb–Scargle handles natively.",
            "Lomb–Scargle is a type of EEG electrode.",
            "Standard FFT only works on 1-second windows."
          ],
          answer: 0,
          explain: "Lomb–Scargle computes spectral power directly on irregular beat timestamps without interpolation distortion."
        }
      ]
    },
    {
      id: "kalman-p2",
      title: "8. Phase 2: State-Space & Kalman Filter",
      phase: "Phase 2 (Next)",
      tag: "Control Theory",
      labType: "kalman-preview",
      summary: "Identifying 32 Virtual Subjects (A, B, C, Q, R), scaling features, and fusing fast EEG with slow EDA/HRV.",
      plainEnglish: "In Phase 2, we build a 2D mathematical 'digital twin' for each DEAP participant: x_{k+1} = A x_k + B u_k + w_k. A Kalman Filter acts like an optimal sensor fusion engine: it balances trust between its own prediction (process noise Q) and incoming sensors (measurement noise R). When EEG drops out or BVP degrades (ω_BVP = 0.1), the Kalman Filter automatically leans more on its model and remaining sensors!",
      math: "x_{k+1} = A x_k + B u_k + w_k (w_k ~ N(0, Q)),   y_k = C x_k + v_k (v_k ~ N(0, R))",
      codeRef: "Planned: src/models/ (Phase 2) — governed by control-theory-anti-inverse-crime",
      trivia: [
        {
          q: "What two Phase 1 findings must Phase 2 handle before fitting (A, B, C, Q, R)?",
          options: [
            "Feature scaling (gsr_scr_power reaches 8.73e8 vs ~10^0 EEG) and filter group-delay augmentation.",
            "Deleting all 32 subjects and generating random noise.",
            "Switching from 128 Hz to 10 Hz."
          ],
          answer: 0,
          explain: "Train-split scaling/log-transforms + delay state augmentation + linear-dependency pruning are documented in PHASE_1_AUDIT_REPORT.md!"
        }
      ]
    },
    {
      id: "three-actuators",
      title: "9. Phase 3: Three-Actuator Coordination",
      phase: "Phase 3 (Planned)",
      tag: "LIT-PARAM",
      labType: "circumplex",
      summary: "Combining Parametric Music, Ambient Lighting, and Wrist Heartbeat Haptics to break tempo–valence crossover.",
      plainEnglish: "Music alone has strong arousal control (R² = 0.86–0.96, Agres et al. 2023/2025) but drags valence down when slowed for calming. So we coordinate three literature-grounded actuators: (1) Parametric Music, (2) Ambient Lighting (Li et al. 2025: 180 lx green boosts valence, 20 lx purple boosts FMT & FAA), and (3) Wrist Heartbeat Haptics (Azevedo et al. 2017: 40–65 bpm pulses ~20% slower than resting HR reduce SCR & anxiety).",
      math: "u_k = [u_music_tempo, u_music_val, u_light_lux, u_light_hue, u_haptic_bpm]^T",
      codeRef: "Planned: src/models/actuators.py (Phase 3) — tagged [LIT-PARAM]",
      trivia: [
        {
          q: "In Azevedo et al. (2017), what wrist haptic rate reduced anxiety and skin conductance arousal?",
          options: [
            "120–140 bpm",
            "~20% slower than resting HR, clamped to 40–65 bpm",
            "10 bpm"
          ],
          answer: 1,
          explain: "40–65 bpm tactile pulses lowered NS-SCRs (p=0.029) and STAI anxiety (p=0.007) without changing mean HR."
        }
      ]
    },
    {
      id: "anti-inverse-crime",
      title: "10. Phase 4: MPC, RL & Anti-Inverse Crime",
      phase: "Phase 4–5 (Planned)",
      tag: "Verification",
      labType: "kalman-preview",
      summary: "Fair benchmarking of Open-Loop, LQR, MPC, Fuzzy-MPC, and Model-Free RL under noise, mismatch & dropouts.",
      plainEnglish: "An 'inverse crime' happens when you test a controller on the exact same noiseless equation you used to design it—of course it looks perfect! To be honest and journal-ready for Elsevier BSPC, Phase 4 tests all 5 controllers under: (a) process/sensor noise, (b) plant–model parameter mismatch, (c) emotional carry-over disturbances, and (d) temporary EEG channel dropouts—all with matched actuator bounds and fixed random seeds across all 32 Virtual Subjects.",
      math: "u_min <= u_k <= u_max  |  Report: mean ± SD, median [IQR], non-responder < 38%",
      codeRef: "AGENTS.md Rule 3 & .agents/skills/control-theory-anti-inverse-crime/SKILL.md",
      trivia: [
        {
          q: "What is the neurofeedback non-responder benchmark rate cited from Sayal et al. (2025)?",
          options: ["5%", "16–57% (mean 38%)", "90%"],
          answer: 1,
          explain: "Sayal et al. (2025) cite 16–57% (mean 38%) non-responders; we evaluate our cohort non-responder fraction transparently against this!"
        }
      ]
    }
  ],

  arcade: {
    fillBlanks: [
      {
        prompt: "To avoid future-to-past data leakage, we use forward-only",
        blank: "sosfilt",
        after: "with persistent state zi instead of acausal filtfilt.",
        choices: ["sosfilt", "filtfilt", "fftshift", "polyfit"],
        explain: "sosfilt processes samples strictly forward in time; filtfilt runs backward and leaks 27.60 log-power units!"
      },
      {
        prompt: "In DEAP's .dat['labels'], all 439 Quadrant-1 trials were stored inverted as",
        blank: "9.0 - rating",
        after: ", which we restored from participant_ratings.xls.",
        choices: ["9.0 - rating", "rating * 2", "rating - 5", "1 / rating"],
        explain: "9.0 - rating mapped SAM 9.00 ratings to 0.00! Restoring from participant_ratings.xls recovered all 1,280 trials."
      },
      {
        prompt: "We extract GSR SCL (0.05 Hz LP) and SCR (0.05–1.5 Hz BP) in parallel because SCL has a",
        blank: "4,856 ms",
        after: "group delay that would distort subtraction.",
        choices: ["4,856 ms", "2 ms", "50 ms", "0 ms"],
        explain: "621.59 samples at 128 Hz = 4,856.15 ms (~4.86 s) lag!"
      },
      {
        prompt: "When BVP detects fewer than 2 beats (e.g., cold start), it emits quality confidence",
        blank: "omega_bvp = 0.1",
        after: "and falls back to baseline.",
        choices: ["omega_bvp = 0.1", "omega_bvp = 1.0", "NaN", "0 Hz"],
        explain: "This occurred in 4,070 of 153,600 windows (2.65%) and prevents non-finite divisions."
      },
      {
        prompt: "Single-step execution latency across all 3 montages stays below",
        blank: "1.55 ms",
        after: ", leaving > 99.6% slack inside the 500 ms control interval.",
        choices: ["1.55 ms", "450 ms", "1200 ms", "50 ms"],
        explain: "Mean latencies are 0.903 ms (full_32), 0.842 ms (wearable_6), and 0.822 ms (wearable_4)."
      },
      {
        prompt: "Slowing down music to lower arousal can unintentionally lower perceived",
        blank: "Valence",
        after: ", known as the tempo–valence crossover.",
        choices: ["Valence", "Sampling Rate", "Impedance", "Gamma"],
        explain: "Agres et al. (2023, 2025) showed slow calm music is often perceived as sadder when target V is high."
      }
    ],

    matchDecks: [
      {
        title: "Deck 1: Signals & Features",
        pairs: [
          { left: "FAA (F4 - F3)", right: "Valence asymmetry" },
          { left: "Fz Theta/Beta Ratio", right: "Mental effort" },
          { left: "GSR 0.05 Hz Lowpass", right: "Tonic SCL (4.86 s lag)" },
          { left: "Lomb–Scargle", right: "Unevenly spaced HRV LF/HF" }
        ]
      },
      {
        title: "Deck 2: Actuators & Literature",
        pairs: [
          { left: "Music Alone", right: "Tempo–valence crossover" },
          { left: "Green 180 lx Light", right: "Highest self-reported valence" },
          { left: "Purple 20 lx Light", right: "Boosts FMT & FAA" },
          { left: "Wrist Haptics (40–65 bpm)", right: "Lowers SCR & anxiety" }
        ]
      },
      {
        title: "Deck 3: Files & Engineering",
        pairs: [
          { left: "src/features/causal_dsp.py", right: "CausalSOSFilter & NaN hold" },
          { left: "src/data/loader.py", right: "Read-only DEAP + SAM fix" },
          { left: "docs/CLAIMS_EVIDENCE_MATRIX.md", right: "Claims-to-PDF ledger" },
          { left: "tests/test_causality_leak.py", right: "Proves 0.0 lookahead" }
        ]
      }
    ],

    spotFlaws: [
      {
        scenario: "A student preprocesses 60-second DEAP trials using scipy.signal.filtfilt(b, a, trial) before feeding 0.5 s chunks into a simulated MPC controller.",
        flaw: "Acausal future-to-past data leakage!",
        options: [
          "Acausal future-to-past data leakage (filtfilt peeks at future samples).",
          "60 seconds is too short for EEG.",
          "MPC cannot run at 0.5 s steps."
        ],
        answer: 0,
        explain: "In our audit, acausal filtfilt leaked 27.595335 log-power units backward across sample 1024!"
      },
      {
        scenario: "A pipeline loads DEAP using MNE's default 'biosemi32' montage order and picks indices for Fz, F3, F4, P4, T7, T8.",
        flaw: "Spatial channel scrambling!",
        options: [
          "MNE cannot read Python pickle files.",
          "DEAP's Geneva channel sequence differs from MNE biosemi32 at 30 of 32 slots.",
          "T7 and T8 are peripheral GSR channels."
        ],
        answer: 1,
        explain: "Only Fp1 (0) and Oz (31) match! Always use explicit Geneva indices from src/data/loader.py."
      },
      {
        scenario: "A researcher identifies a Virtual Subject (A, B, C) from DEAP and tests their Kalman Filter + MPC on noiseless trajectories generated by that exact same (A, B, C).",
        flaw: "Classic 'Inverse Crime'!",
        options: [
          "Inverse Crime: zero noise and zero plant–model mismatch makes validation circular.",
          "Kalman filters cannot estimate 2D states.",
          "DEAP has 40 subjects instead of 32."
        ],
        answer: 0,
        explain: "AGENTS.md Rule 3 requires noise, parameter mismatch, carry-over shifts, and EEG dropout testing."
      },
      {
        scenario: "To extract phasic sweat spikes (SCR), a script computes: scr = raw_gsr - lowpass_0.05Hz(raw_gsr).",
        flaw: "4.86-second phase-mismatch distortion!",
        options: [
          "GSR is measured in Volts, not microSiemens.",
          "Subtracting a 4.86 s delayed lowpass from undelayed raw GSR creates gain peaking.",
          "SCR requires a 100 Hz highpass filter."
        ],
        answer: 1,
        explain: "Parallel filtering (0.05 Hz LP for SCL, 0.05–1.5 Hz BP for SCR) solves this cleanly."
      }
    ]
  },

  knowledgeGraph: {
    nodes: [
      { id: "deap-data",       label: "DEAP Dataset\n(N=32, 128 Hz)", x: 110, y: 120, color: "#58c4dd", phase: "P1" },
      { id: "montages",        label: "Wearable Montages\n(32 / 6 / 4 ch)", x: 110, y: 270, color: "#58c4dd", phase: "P1" },
      { id: "causal-filters",  label: "Causal SOS\nFilters (0.0 leak)", x: 310, y: 195, color: "#83c167", phase: "P1" },
      { id: "eeg-features",    label: "EEG Features\n(rFFT + FAA)", x: 500, y: 90,  color: "#83c167", phase: "P1" },
      { id: "gsr-features",    label: "GSR Parallel\n(SCL + SCR)", x: 500, y: 195, color: "#83c167", phase: "P1" },
      { id: "bvp-features",    label: "BVP / HRV\n(Lomb-Scargle)", x: 500, y: 300, color: "#83c167", phase: "P1" },
      { id: "kalman-p2",       label: "2D State-Space\n& Kalman Filter", x: 700, y: 195, color: "#f9c846", phase: "P2" },
      { id: "three-actuators", label: "3 Actuators\n(Music+Light+Haptic)", x: 700, y: 330, color: "#9a72ac", phase: "P3" },
      { id: "anti-inverse-crime", label: "MPC vs RL\nBenchmark", x: 890, y: 255, color: "#fc6255", phase: "P4–5" },
      { id: "circumplex",      label: "2D Valence–Arousal\nControl Goal", x: 890, y: 105, color: "#58c4dd", phase: "P0–5" }
    ],
    edges: [
      ["deap-data", "causal-filters"],
      ["montages", "causal-filters"],
      ["causal-filters", "eeg-features"],
      ["causal-filters", "gsr-features"],
      ["causal-filters", "bvp-features"],
      ["eeg-features", "kalman-p2"],
      ["gsr-features", "kalman-p2"],
      ["bvp-features", "kalman-p2"],
      ["kalman-p2", "anti-inverse-crime"],
      ["three-actuators", "anti-inverse-crime"],
      ["anti-inverse-crime", "circumplex"],
      ["kalman-p2", "circumplex"]
    ]
  },

  montages: {
    full_32: {
      name: "Full 32-Channel Lab Cap (full_32)",
      eegChannels: 32,
      totalFeatures: 146,
      latencyMean: "0.903 ms",
      latencyMax: "1.547 ms",
      indices: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      extras: "7 bilateral alpha asymmetries",
      plainEnglish: "Hospital/lab cap: maximum spatial coverage, impractical for daily wear."
    },
    wearable_6: {
      name: "Wearable 6-Electrode Subset (wearable_6)",
      eegChannels: 6,
      totalFeatures: 38,
      latencyMean: "0.842 ms",
      latencyMax: "1.462 ms",
      indices: [18, 2, 19, 28, 7, 25],
      extras: "FAA (F4-F3), TBR (Fz), BAR (P4)",
      plainEnglish: "Balanced wearable target: frontal emotion/effort, parietal demand, temporal audio."
    },
    wearable_4: {
      name: "Minimal 4-Electrode Headband (wearable_4)",
      eegChannels: 4,
      totalFeatures: 29,
      latencyMean: "0.822 ms",
      latencyMax: "1.165 ms",
      indices: [1, 17, 7, 25],
      extras: "AF4-AF3 & T8-T7 alpha asymmetries",
      plainEnglish: "Consumer headband style (forehead + above-ears) to test minimal-sensor accuracy."
    }
  },

  electrodes: [
    { idx: 0,  name: "Fp1", x: 115, y: 48,  role: "Left prefrontal pole (full_32 only)" },
    { idx: 16, name: "Fp2", x: 165, y: 48,  role: "Right prefrontal pole (full_32 only)" },
    { idx: 1,  name: "AF3", x: 102, y: 72,  role: "Left anterior frontal (full_32, wearable_4)" },
    { idx: 17, name: "AF4", x: 178, y: 72,  role: "Right anterior frontal (full_32, wearable_4)" },
    { idx: 2,  name: "F3",  x: 100, y: 100, role: "Left frontal — FAA = F4 - F3 (full_32, wearable_6)" },
    { idx: 18, name: "Fz",  x: 140, y: 96,  role: "Frontal midline — Theta/Beta Ratio (full_32, wearable_6)" },
    { idx: 19, name: "F4",  x: 180, y: 100, role: "Right frontal — FAA = F4 - F3 (full_32, wearable_6)" },
    { idx: 3,  name: "F7",  x: 68,  y: 96,  role: "Left lateral frontal (full_32 only)" },
    { idx: 20, name: "F8",  x: 212, y: 96,  role: "Right lateral frontal (full_32 only)" },
    { idx: 7,  name: "T7",  x: 52,  y: 144, role: "Left temporal (all 3 montages)" },
    { idx: 25, name: "T8",  x: 228, y: 144, role: "Right temporal (all 3 montages)" },
    { idx: 23, name: "Cz",  x: 140, y: 144, role: "Central vertex (full_32 only)" },
    { idx: 15, name: "Pz",  x: 140, y: 192, role: "Parietal midline (full_32 only)" },
    { idx: 10, name: "P3",  x: 100, y: 192, role: "Left parietal (full_32 only)" },
    { idx: 28, name: "P4",  x: 180, y: 192, role: "Right parietal — Beta/Alpha Ratio (full_32, wearable_6)" },
    { idx: 14, name: "Oz",  x: 140, y: 236, role: "Occipital midline (full_32 only)" }
  ],

  filterDelays: [
    { stream: "EEG Broadband (4–45 Hz)", order: 4, meanSamples: 3.13, meanMs: 24.42, peakMs: 163.42, note: "Before rFFT bandpower" },
    { stream: "EEG Theta (4–8 Hz)", order: 4, meanSamples: 32.04, meanMs: 250.31, peakMs: 445.95, note: "Narrowband reference" },
    { stream: "EEG Alpha (8–12 Hz)", order: 4, meanSamples: 32.03, meanMs: 250.21, peakMs: 375.03, note: "Narrowband reference" },
    { stream: "EEG Beta (12–30 Hz)", order: 4, meanSamples: 7.11, meanMs: 55.58, peakMs: 104.95, note: "Narrowband reference" },
    { stream: "EEG Gamma (30–45 Hz)", order: 4, meanSamples: 8.54, meanMs: 66.69, peakMs: 98.55, note: "Narrowband reference" },
    { stream: "GSR SCL Lowpass (0.05 Hz)", order: 2, meanSamples: 621.59, meanMs: 4856.15, peakMs: 5216.63, note: "Slow tonic drift (~4.86 s)" },
    { stream: "GSR SCR Bandpass (0.05–1.5 Hz)", order: 2, meanSamples: 42.49, meanMs: 331.98, peakMs: 3713.64, note: "Fast phasic sweat spikes" },
    { stream: "BVP Bandpass (0.5–5.0 Hz)", order: 2, meanSamples: 14.31, meanMs: 111.78, peakMs: 549.45, note: "Heartbeat pulse" }
  ],

  roadmap: [
    {
      phase: "Phase 0",
      title: "Literature Audit, Claims–Evidence Matrix & Manuscript Foundation",
      status: "DONE",
      summary: "Audited 27 BibTeX keys & 22 Section 1 claims against primary PDFs; unified main.tex; selected DEAP (Option A).",
      deliverables: [
        "docs/CLAIMS_EVIDENCE_MATRIX.md — verified every author, page, DOI, and quantitative claim.",
        "main.tex + references.bib — 26 verified active references, clean 5-page build."
      ]
    },
    {
      phase: "Phase 1",
      title: "Read-Only DEAP Verification & Causal Multimodal Feature Pipeline",
      status: "DONE",
      summary: "Built strictly causal EEG/GSR/BVP pipelines (< 1.55 ms/step), restored 439 Q1 SAM ratings, passed 18/18 tests (95% cov).",
      deliverables: [
        "src/data/loader.py — SHA-256 locked DEAP loader + participant_ratings.xls restoration (153,600 windows).",
        "src/features/ — CausalSOSFilter, EEG, GSR, BVP, and multimodal synchronization.",
        "results/phase1_audit_metrics.json — 0.0 lookahead vs 27.60 acausal leak."
      ]
    },
    {
      phase: "Phase 2",
      title: "2D State-Space Virtual Subjects & Kalman Observer",
      status: "NEXT",
      summary: "Identify (A, B, C, Q, R) for N=32 Virtual Subjects, scale/prune observations, augment delays, and add APS carry-over.",
      deliverables: [
        "Observation scaling (gsr_scr_power ~8.73e8 vs EEG ~10^0) & collinearity pruning.",
        "Delay state augmentation for 4.86 s GSR SCL lag + BVP HR < 40 bpm quality gating.",
        "Observability/stability checks (spectral radius, obsv(A, C)) on held-out trials."
      ]
    },
    {
      phase: "Phase 3",
      title: "Three-Actuator Coordination Model (Music + Lighting + Haptics)",
      status: "PLANNED",
      summary: "Parameterize Music, Lighting (Li 2025), and Wrist Haptics (Azevedo 2017) to decouple Valence & Arousal.",
      deliverables: [
        "Literature-grounded actuator input matrix B_act tagged [LIT-PARAM].",
        "Physical saturation & slew-rate constraints + crossover mitigation proof."
      ]
    },
    {
      phase: "Phase 4",
      title: "Closed-Loop Controller Benchmark & Anti-Inverse-Crime Tests",
      status: "PLANNED",
      summary: "Compare Open-Loop, LQR, Constrained MPC, Fuzzy-MPC, and Model-Free RL across 4 trajectories & EEG dropouts.",
      deliverables: [
        "Trajectories: De-stress, Calm, Make Happy, Excite (Daly et al., 2016).",
        "Plant–model mismatch, carry-over disturbance, and temporary EEG channel dropout tests."
      ]
    },
    {
      phase: "Phase 5",
      title: "Statistics, Publication Figures & Elsevier BSPC Submission",
      status: "PLANNED",
      summary: "Generate reproducible figures, cohort statistics (mean ± SD, median [IQR], non-responder < 38%), and finalize main.tex.",
      deliverables: [
        "Automated LaTeX table sync + publication-grade figures.",
        "Full adversarial review of Results, Discussion, Ethics (Steinert 2020), and Conclusion."
      ]
    }
  ],

  glossary: [
    { term: "Valence", cat: "Neuroscience", concept: "circumplex", def: "Horizontal axis of Russell's 2D emotion map: unpleasant/sad (-) to pleasant/happy (+)." },
    { term: "Arousal", cat: "Neuroscience", concept: "circumplex", def: "Vertical axis of Russell's 2D emotion map: calm/sleepy (-) to excited/stressed (+)." },
    { term: "Closed-Loop aBCI", cat: "Control Theory", concept: "circumplex", def: "Affective Brain-Computer Interface that measures emotion and continuously adapts stimuli to regulate it." },
    { term: "DEAP Dataset", cat: "Neuroscience", concept: "deap-data", def: "32 participants × 40 1-minute music videos (63 s @ 128 Hz), 32 EEG + 8 peripheral channels." },
    { term: "SAM Q1 Inversion", cat: "Code & Files", concept: "deap-data", def: "Bug in DEAP .dat['labels'] where 439 Quadrant-1 trials were stored as (9.0 - rating); fixed via participant_ratings.xls." },
    { term: "Geneva 10–20 Sequence", cat: "Neuroscience", concept: "montages", def: "DEAP's BioSemi channel order; differs from MNE's default biosemi32 at 30 of 32 slots." },
    { term: "FAA (F4 - F3)", cat: "Neuroscience", concept: "eeg-features", def: "Frontal Alpha Asymmetry: right minus left frontal log-alpha power, linked to emotional valence." },
    { term: "TBR (Fz)", cat: "Neuroscience", concept: "eeg-features", def: "Frontal midline Theta/Beta Ratio at Fz, indexing mental effort and cognitive load." },
    { term: "BAR (P4)", cat: "Neuroscience", concept: "eeg-features", def: "Right parietal Beta/Alpha Ratio at P4, indexing cognitive demand and arousal." },
    { term: "Causal Filter (sosfilt)", cat: "Signal Processing", concept: "causal-filters", def: "Forward-only digital filter using only past and present samples (0.0 lookahead leakage)." },
    { term: "Acausal Filter (filtfilt)", cat: "Signal Processing", concept: "causal-filters", def: "Forward+backward zero-phase filter; illegal in real-time control because it leaks future data (27.60 units)." },
    { term: "Group Delay", cat: "Signal Processing", concept: "causal-filters", def: "Time lag introduced by a causal filter (e.g., 24.42 ms for 4–45 Hz EEG; 4,856 ms for 0.05 Hz GSR SCL)." },
    { term: "SOS (Second-Order Sections)", cat: "Signal Processing", concept: "causal-filters", def: "Cascaded 2nd-order filter blocks that keep high-order IIR filters numerically stable." },
    { term: "GSR SCL vs. SCR", cat: "Signal Processing", concept: "gsr-features", def: "Skin Conductance Level (slow <0.05 Hz tonic drift) vs. Skin Conductance Response (fast 0.05–1.5 Hz spikes)." },
    { term: "Lomb–Scargle Periodogram", cat: "Signal Processing", concept: "bvp-features", def: "Spectral estimator for unevenly spaced heartbeat intervals (RR) to compute LF and HF HRV." },
    { term: "ω_BVP Confidence", cat: "Code & Files", concept: "bvp-features", def: "Quality scalar (0.1 during cold start / <2 beats, else 1.0) so downstream observers downweight degraded BVP." },
    { term: "Kalman Filter", cat: "Control Theory", concept: "kalman-p2", def: "Optimal recursive estimator that fuses noisy sensors with a state-space model (A, B, C, Q, R)." },
    { term: "APS (Affective Priming Score)", cat: "Literature", concept: "kalman-p2", def: "Sequential emotional carry-over metric (Gutierrez Maestro et al., 2025) inspiring our transition weighting." },
    { term: "Tempo–Valence Crossover", cat: "Literature", concept: "three-actuators", def: "Side effect (Agres et al., 2023/2025) where slowing music to lower arousal accidentally makes it sound sadder." },
    { term: "MPC (Model Predictive Control)", cat: "Control Theory", concept: "anti-inverse-crime", def: "Optimal controller that predicts future states over a horizon while respecting actuator safety limits." },
    { term: "Anti-Inverse Crime", cat: "Control Theory", concept: "anti-inverse-crime", def: "Testing controllers under noise, parameter mismatch, and dropouts rather than exact nominal models." },
    { term: "Non-Responder Rate", cat: "Literature", concept: "anti-inverse-crime", def: "Fraction of users who fail to regulate; neurofeedback reviews report 16–57% (mean 38%, Sayal et al. 2025)." }
  ],

  codebaseMap: [
    { path: "main.tex", role: "Single source of truth for the Elsevier BSPC manuscript." },
    { path: "references.bib", role: "26 verified BibTeX references with DOIs." },
    { path: "AGENTS.md", role: "Unbreakable research rules (Rules 1–8 including Notebook Sync)." },
    { path: "docs/CLAIMS_EVIDENCE_MATRIX.md", role: "Maps every claim & number to primary PDFs or script outputs." },
    { path: "docs/PHASE_1_AUDIT_REPORT.md", role: "Adversarial sign-off report for Phase 1 + open Phase 2 items." },
    { path: "docs/deap_sha256_manifest.json", role: "Cryptographic SHA-256 checksums for all 32 DEAP .dat files." },
    { path: "configs/eeg_features.yaml", role: "EEG bands, 128 Hz sampling, 2 s window, 0.5 s step, 3 montages." },
    { path: "configs/peripheral_features.yaml", role: "GSR & BVP filter cutoffs, 30 s HRV window, refractory & fallback rules." },
    { path: "src/data/loader.py", role: "Read-only DEAP loader + authoritative SAM rating restoration." },
    { path: "src/data/feature_store.py", role: "HDF5/NPZ feature staging & merging with metadata (100% test cov)." },
    { path: "src/features/causal_dsp.py", role: "CausalSOSFilter (sosfilt + zi) & sample-and-hold NaN imputation." },
    { path: "src/features/eeg_pipeline.py", role: "4–45 Hz bandpass, 2 s Hamming rFFT, baseline norm, montages." },
    { path: "src/features/gsr_pipeline.py", role: "Parallel SCL lowpass + SCR bandpass (5 features)." },
    { path: "src/features/bvp_pipeline.py", role: "Systolic peaks, 30 s HRV, Lomb–Scargle LF/HF, ω_BVP fallback." },
    { path: "src/features/multimodal_pipeline.py", role: "Synchronizes EEG + GSR + BVP onto the 0.5 s discrete control grid." },
    { path: "scripts/extract_features.py", role: "Runs full N=32 cohort extraction into data/processed/." },
    { path: "scripts/audit_phase1_metrics.py", role: "Measures group delays, step latencies, and 0.0 lookahead proof." },
    { path: "scripts/verify_feature_artifacts.py", role: "Verifies 153,600 windows & 0 NaN/Inf across HDF5/NPZ archives." },
    { path: "results/phase1_audit_metrics.json", role: "Verified group delays, latencies, and causality leak measurements." },
    { path: "results/phase1_extraction_summary.json", role: "Full-cohort archive sizes and window counts (153,600/montage)." },
    { path: "tests/", role: "18 deterministic unit tests (95% coverage, 0.0 lookahead proof)." }
  ]
};
