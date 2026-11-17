/* ==========================================================================
   MASTER_RESEARCH — Zero-to-Hero Comprehensive Data
   - 10 Concepts × 3 Distinct Depth Tiers (Level 1 Intuition, Level 2 Practitioner, Level 3 Mastery)
   - 10 Dedicated 1:1 Interactive Labs + 20 Auto-Verified Lab Missions
   - 30 Strictly-Aligned Mastery Checks (0 unintroduced facts; 100% from Theory + Lab)
   ========================================================================== */

window.NOTEBOOK_DATA = {
  meta: {
    title: "2D Affective Control — Zero-to-Hero Learning Platform",
    lastUpdated: "2026-11-18",
    currentPhase: "Phase 1 Complete — Phase 2 Next",
    testsPassed: "18 / 18 passed (95% coverage)",
    totalWindows: "153,600 valid control steps (1,280 trials × 120 steps @ Δt = 0.5 s)",
    causalityLeak: "0.0 (causal SOS) vs. 27.595335 log-power units (acausal filtfilt)"
  },

  concepts: [
    {
      id: "circumplex",
      title: "1. 2D Valence–Arousal & Closed-Loop Control",
      phase: "Phase 0–1",
      tag: "Core Principle",
      labType: "circumplex",
      summary: "Mapping human emotion onto continuous 2D coordinates (Valence, Arousal) and steering it every 0.5 s like a smart thermostat.",
      level1: {
        analogy: "Think of a room thermostat: a thermometer alone only tells you 'it is 14°C in here' (Open-Loop detection). A thermostat compares 14°C against your target 22°C and turns on the heater until you reach 22°C (Closed-Loop control). Russell's (1980) Circumplex Model gives emotions a 2D map so our 'emotion thermostat' knows where you are and where to steer you: horizontal Valence (unpleasant -1 to pleasant +1) and vertical Arousal (calm/sleepy -1 to excited/stressed +1).",
        naiveTrap: "Most Affective BCI papers stop at Open-Loop classification ('you look 78% stressed'). They never close the feedback loop to actively guide your state toward a target like Calm (Quadrant 4: High Valence +, Low Arousal -).",
        labGuide: "In the Lab on the right, click the 4 Quadrants (Q1 Excite, Q2 Stressed, Q3 Sad, Q4 Calm) and toggle between Open-Loop (passive) and Closed-Loop (active steering every Δt = 0.5 s)."
      },
      level2: {
        pipeline: [
          "1. Define Target Setpoint x* = [V*, A*]^T in continuous 2D space (e.g., Calm in Q4: V* = +0.75, A* = -0.60).",
          "2. Sample physiological sensors (EEG, GSR, BVP) on a discrete real-time clock every Δt = 0.5 s (2 Hz control rate).",
          "3. Compute tracking error e_k = x* - x̂_k between the target quadrant and the estimated emotional state.",
          "4. Update sensory actuators u_k to drive tracking error e_k → 0 across the 120 control steps of a 60 s stimulus."
        ],
        tradeoffs: "Why Δt = 0.5 s? Faster updates (< 0.1 s) are dominated by raw EEG phase noise and cannot speed up slow autonomic sweat/heart responses; slower updates (> 5 s) miss rapid frontal alpha shifts.",
        labGuide: "Use the Lab to test Mission 1 (select Q4 Calm in Open-Loop to see why passive systems leave error unchanged) and Mission 2 (turn on Closed-Loop to drive tracking error ||e_k|| < 0.10)."
      },
      level3: {
        math: "x_k = [Valence_k, Arousal_k]^T ∈ [-1, 1]^2,   e_k = x* - x̂_k,   Δt = 0.5 s (120 steps / 60 s trial)",
        variables: [
          "x_k : True 2D emotional state vector at discrete control step k (Valence horizontal, Arousal vertical).",
          "x* = [V*, A*]^T : Desired target emotion coordinate in one of the 4 Circumplex quadrants.",
          "e_k : Instantaneous 2D tracking error vector driving the closed-loop controller.",
          "Δt = 0.5 s : Discrete control interval (64 samples at 128 Hz)."
        ],
        codeWalkthrough: "main.tex §1 (Introduction) & configs/eeg_features.yaml (`window_step_sec: 0.5`). Establishes the 4 canonical regulation trajectories from Daly et al. (2016): De-stress, Calm (Q4: High V, Low A), Make Happy (Q1: High V, High A), and Excite."
      },
      codeRef: "main.tex §1, configs/eeg_features.yaml (Δt = 0.5 s), Russell (1980), Daly et al. (2016)",
      trivia: [
        {
          q: "[Level 1 · Warm-Up] What is the core difference between an Open-Loop and a Closed-Loop Affective BCI?",
          options: [
            "Open-Loop only measures/classifies emotion passively; Closed-Loop continuously adapts stimuli every 0.5 s to drive tracking error toward the target state (V*, A*).",
            "Open-Loop uses 2D coordinates; Closed-Loop only uses 1D Arousal.",
            "Closed-Loop only runs after the participant goes home."
          ],
          answer: 0,
          explain: "Like a thermostat vs. a thermometer, Closed-Loop control measures state x̂_k, computes error e_k = x* - x̂_k, and updates stimuli every Δt = 0.5 s."
        },
        {
          q: "[Level 2 + Lab] In Russell's 2D Circumplex Model, which quadrant corresponds to the 'Calm / Content' target (V* = +0.75, A* = -0.60)?",
          options: [
            "Quadrant 2: Negative Valence (-), High Arousal (+) — Stressed/Anxious.",
            "Quadrant 4: Positive Valence (+), Low Arousal (-) — Calm/Relaxed.",
            "Quadrant 3: Negative Valence (-), Low Arousal (-) — Sad/Fatigued."
          ],
          answer: 1,
          explain: "As shown in the Lab, Quadrant 4 (bottom-right) combines pleasant Positive Valence (+0.75) with low, relaxed Arousal (-0.60)."
        },
        {
          q: "[Level 3 · Boss Check] At our discrete control step Δt = 0.5 s, how many closed-loop control steps occur during the 60 s stimulus window of a single trial?",
          options: [
            "60 steps (1 step per second)",
            "120 steps (60 s / 0.5 s = 120 steps, advancing 64 samples @ 128 Hz per step)",
            "8,064 steps"
          ],
          answer: 1,
          explain: "60 s / 0.5 s = 120 discrete control steps per trial (and 1,280 trials × 120 steps = 153,600 total valid steps)."
        }
      ]
    },

    {
      id: "deap-data",
      title: "2. DEAP Dataset & Quadrant-1 SAM Fix",
      phase: "Phase 1",
      tag: "DATA-ID",
      labType: "deap-sam",
      summary: "32 participants × 40 trials (63 s @ 128 Hz = 8,064 samples) and rescuing 439 inverted Quadrant-1 labels.",
      level1: {
        analogy: "Imagine grading 1,280 exams, but whenever a student scores an A+ on both parts (Valence > 5 and Arousal > 5, Quadrant 1), a spreadsheet bug flips their 9.0 score into `9.0 - 9.0 = 0.0`! That exact bug exists inside DEAP's pre-packaged `.dat['labels']` arrays for 439 Quadrant-1 trials. By cross-checking the original `participant_ratings.xls` logbook, we rescued all 439 trials.",
        naiveTrap: "Training a model directly on raw `.dat['labels']` without checking `participant_ratings.xls` teaches the AI that ecstatic/happy people (9.0) are maximally miserable (0.0)!",
        labGuide: "In the Lab on the right, toggle between Raw `.dat['labels']` (corrupted Q1) and Restored `participant_ratings.xls` to watch the 439 Quadrant-1 trials snap back to their true positions."
      },
      level2: {
        pipeline: [
          "1. Verify SHA-256 checksums of all 32 read-only `s01.dat`–`s32.dat` files against `docs/deap_sha256_manifest.json`.",
          "2. Load tensor shape `(40 trials, 40 channels, 8064 samples)` sampled at 128 Hz (63.0 s total: 3.0 s fixation baseline `0:384` + 60.0 s stimulus `384:8064`).",
          "3. Match trial order via `Experiment_id` in `participant_ratings.xls` (verified to < 1e-6 against Dominance & Liking).",
          "4. Replace the 439 inverted Quadrant-1 (`V > 5, A > 5`) ratings where `.dat` stored `9.0 - rating`, recovering all 1,280 trials × 120 steps = 153,600 control steps."
        ],
        tradeoffs: "Why keep raw `.dat` files strictly read-only? Rule 5 forbids altering raw data on disk; `DEAPLoader` patches the labels deterministically in memory at load time (`use_metadata_labels=True`).",
        labGuide: "Test Mission 1 (inspect the corrupted `.dat` mode where 40 ratings equal 0.00) and Mission 2 (enable `use_metadata_labels=True` to restore all 439 Q1 trials)."
      },
      level3: {
        math: "X_subj ∈ R^{40 × 40 × 8064} @ f_s = 128 Hz  |  If (V_xls > 5 ∧ A_xls > 5): y_dat = 9.0 - y_xls  (439 / 1,280 trials)",
        variables: [
          "32 Subjects × 40 Trials = 1,280 total trials (153,600 valid 0.5 s windows).",
          "Samples 0:384 (3.0 s @ 128 Hz) : Neutral pre-stimulus fixation baseline.",
          "Samples 384:8064 (60.0 s @ 128 Hz) : Music-video stimulus (120 steps of 64 samples).",
          "439 Q1 Trials : Exact number of trials with V > 5 and A > 5 inverted as (9.0 - rating) in raw .dat['labels']."
        ],
        codeWalkthrough: "src/data/loader.py → `DEAPLoader.load_subject(subject_id, use_metadata_labels=True)` reads `participant_ratings.xls`, aligns by `Experiment_id`, verifies Dominance/Liking within 1e-6, and restores authoritative SAM ratings [1, 9]."
      },
      codeRef: "src/data/loader.py → DEAPLoader, docs/deap_sha256_manifest.json, Koelstra et al. (2012)",
      trivia: [
        {
          q: "[Level 1 · Warm-Up] Why did raw DEAP `.dat['labels']` contain 40 exact `0.00` ratings even though the SAM scale runs from 1 to 9?",
          options: [
            "All 439 Quadrant-1 trials (Valence > 5 and Arousal > 5) were stored inverted as (9.0 - rating), turning 9.00 into 0.00.",
            "Participants skipped 40 videos.",
            "The SAM scale starts at 0.00 for neutral."
          ],
          answer: 0,
          explain: "The formula (9.0 - rating) was accidentally applied to all 439 Quadrant-1 trials in `.dat['labels']`; restoring from `participant_ratings.xls` fixes all 439 trials."
        },
        {
          q: "[Level 2 + Lab] How is each 63.0-second DEAP trial (8,064 samples at 128 Hz) partitioned?",
          options: [
            "3.0 s pre-stimulus baseline (samples 0:384) followed by 60.0 s stimulus (samples 384:8064, yielding 120 steps @ 0.5 s).",
            "30.0 s baseline followed by 33.0 s stimulus.",
            "63.0 s of continuous stimulus with no baseline."
          ],
          answer: 0,
          explain: "3.0 s × 128 Hz = 384 baseline samples (`0:384`), and 60.0 s × 128 Hz = 7,680 stimulus samples (`384:8064`)."
        },
        {
          q: "[Level 3 · Boss Check] How does `DEAPLoader` in `src/data/loader.py` verify that `participant_ratings.xls` rows match the exact trial order of the `.dat` pickle files?",
          options: [
            "It sorts trials alphabetically by song title.",
            "It aligns by `Experiment_id` and asserts that uncorrupted Dominance & Liking columns match `.dat['labels']` within 1e-6.",
            "It overwrites the raw `.dat` files on disk."
          ],
          answer: 1,
          explain: "Matching `Experiment_id` and checking Dominance/Liking to < 1e-6 guarantees 100% alignment while keeping raw `.dat` files strictly read-only."
        }
      ]
    },

    {
      id: "montages",
      title: "3. Wearable EEG Montages & Geneva Indexing",
      phase: "Phase 1",
      tag: "DATA-ID",
      labType: "montage",
      summary: "Benchmarking 32-ch lab caps (146 D) vs. 6-ch (38 D) and 4-ch (29 D) wearables without MNE channel scrambling.",
      level1: {
        analogy: "A 32-electrode hospital cap (`full_32`) is like setting up 32 studio microphones around an orchestra—great in a lab, impossible on a daily commute. Our `wearable_6` (6 electrodes) and `wearable_4` (4 forehead/ear electrodes) test whether a sleek headband can still track Valence and Arousal. Even more important: plugging DEAP into MNE's default `biosemi32` map is like reading a phonebook with the names shuffled—30 out of 32 wires point to the wrong brain region!",
        naiveTrap: "Assuming all 32-channel BioSemi caps share the same channel order! DEAP recorded in Geneva (`Geneva 10–20 sequence`), which disagrees with MNE's default `biosemi32` at 30 of 32 indices.",
        labGuide: "In the Lab on the right, switch between `full_32`, `wearable_6`, and `wearable_4`, tap `F4` on the head map, and toggle the Geneva vs. MNE Channel Scrambler warning."
      },
      level2: {
        pipeline: [
          "1. Select montage channel indices explicitly from `MONTAGE_CHANNELS` in `src/data/loader.py` (Geneva order).",
          "2. Extract 4 EEG log-bandpowers per channel + montage-specific asymmetry/ratio features (`135`, `27`, or `18` EEG features).",
          "3. Concatenate the `11` peripheral autonomic features (5 GSR + 6 BVP) to form `D = 146`, `38`, or `29` total features.",
          "4. Verify real-time step latency stays < 1.55 ms (`0.903 ms` full_32, `0.842 ms` wearable_6, `0.822 ms` wearable_4)."
        ],
        tradeoffs: "`wearable_6` (`Fz, F3, F4, P4, T7, T8`) retains all 3 canonical cognitive/affective indices (`FAA`, `TBR`, `BAR`) while cutting EEG channels by 81% (from 32 to 6). `wearable_4` (`AF3, AF4, T7, T8`) drops midline/parietal sites (`Fz, P4`) to fit a minimalist forehead+temple band.",
        labGuide: "Complete Mission 1 (select `wearable_4` to verify 29 features & 0.822 ms latency) and Mission 2 (tap electrode `F4` on the SVG head map to verify Geneva index 19)."
      },
      level3: {
        math: "D_full = (32×4 + 7) + 11 = 146  |  D_w6 = (6×4 + 3) + 11 = 38  |  D_w4 = (4×4 + 2) + 11 = 29",
        variables: [
          "full_32 (indices 0..31) : 128 bandpowers + 7 bilateral alpha asymmetries + 11 peripheral = 146 features (0.903 ms mean).",
          "wearable_6 [18:Fz, 2:F3, 19:F4, 28:P4, 7:T7, 25:T8] : 24 bandpowers + 3 indices (FAA, TBR, BAR) + 11 peripheral = 38 features (0.842 ms mean).",
          "wearable_4 [1:AF3, 17:AF4, 7:T7, 25:T8] : 16 bandpowers + 2 asymmetries (AF4-AF3, T8-T7) + 11 peripheral = 29 features (0.822 ms mean).",
          "Geneva vs. MNE biosemi32 : Disagrees at 30/32 slots; only Fp1 (0) and Oz (31 in MNE / 14 in Geneva—wait: Fp1=0 and Oz match only 2 slots total)."
        ],
        codeWalkthrough: "src/data/loader.py (`DEAP_EEG_CHANNELS_GENEVA`, `MONTAGE_CHANNELS`) and `src/features/eeg_pipeline.py` (`ASYMMETRY_PAIRS`). Unit-tested in `tests/test_montage_shapes.py`."
      },
      codeRef: "src/data/loader.py (MONTAGE_CHANNELS), src/features/eeg_pipeline.py, results/phase1_audit_metrics.json",
      trivia: [
        {
          q: "[Level 1 · Warm-Up] Why must we NEVER apply MNE's default `biosemi32` channel template directly to DEAP?",
          options: [
            "DEAP's Geneva BioSemi acquisition sequence differs from MNE's default `biosemi32` order at 30 of 32 electrode positions.",
            "MNE only supports 64-channel caps.",
            "DEAP was recorded at 1000 Hz."
          ],
          answer: 0,
          explain: "30 out of 32 channels are in different slots! Using MNE's default template scrambles frontal, parietal, and occipital signals."
        },
        {
          q: "[Level 2 + Lab] Which 6 electrodes make up our `wearable_6` montage (38 total features, 0.842 ms mean latency)?",
          options: [
            "Fz (18), F3 (2), F4 (19), P4 (28), T7 (7), T8 (25)",
            "AF3, AF4, Fp1, Fp2, O1, O2",
            "Cz, Pz, Oz, Fp1, Fp2, Fz"
          ],
          answer: 0,
          explain: "As shown on the head map, `wearable_6` picks Fz (TBR), F3 & F4 (FAA), P4 (BAR), and temporal T7 & T8."
        },
        {
          q: "[Level 3 · Boss Check] How are the 29 total features in `wearable_4` (`AF3, AF4, T7, T8`) composed?",
          options: [
            "4 channels × 4 bands (16) + 2 alpha asymmetries (AF4-AF3, T8-T7) (2) + 11 peripheral (5 GSR + 6 BVP) = 29 features.",
            "29 EEG channels × 1 band = 29 features.",
            "4 channels × 7 bands + 1 BVP = 29 features."
          ],
          answer: 0,
          explain: "16 log-bandpowers + 2 bilateral alpha asymmetries = 18 EEG features, plus 5 GSR + 6 BVP = 29 features."
        }
      ]
    },

    {
      id: "causal-filters",
      title: "4. Causal DSP & Zero Lookahead Proof",
      phase: "Phase 1",
      tag: "Signal Processing",
      labType: "causality",
      summary: "Why acausal filtfilt leaks 27.60 log-power units backward in time and how CausalSOSFilter guarantees 0.0 leak.",
      level1: {
        analogy: "Imagine driving a car while looking through a time machine that shows you a pothole 2 seconds before you reach it. That's what `scipy.signal.filtfilt` does: it filters a recording forward, then flips the whole recording backward from the end of the trial to the beginning! In a real-time BCI, the future hasn't happened yet. Our `CausalSOSFilter` only looks at past and present samples, guaranteeing `0.0` future leakage.",
        naiveTrap: "Using `filtfilt` in an offline simulation of a real-time controller is a textbook Inverse Crime: the controller reacts to brainwave bursts before they even occur!",
        labGuide: "In the Lab on the right, inject a massive 20 Hz burst at Sample 1024 (`t = 8.0 s`) and switch between `Causal SOS` (`0.0` leak) and `Acausal filtfilt` (`27.60` backward leak)."
      },
      level2: {
        pipeline: [
          "1. Impute any transient NaN/Inf sensor glitches causally via sample-and-hold (`impute_causal_nans`, fallback 0.0 at t=0).",
          "2. Design N-th order Butterworth filter in Second-Order Sections (`scipy.signal.butter(..., output='sos')`) to prevent high-order polynomial overflow.",
          "3. Initialize filter state `zi = sosfilt_zi(sos) * x[0]` on the very first sample so the filter starts at steady state without a startup transient spike.",
          "4. Propagate state step-by-step: `y_chunk, self._zi = sosfilt(self.sos, x_chunk, zi=self._zi)`."
        ],
        tradeoffs: "Causal filters introduce a physical phase/group delay (e.g., `24.42 ms` mean / `3.13 samples` for 4–45 Hz EEG broadband; `4,856.15 ms` for 0.05 Hz GSR SCL), whereas `filtfilt` has zero phase delay only because it cheats by reading the future.",
        labGuide: "Complete Mission 1 (expose the 27.60 unit backward leak in `Acausal filtfilt`) and Mission 2 (select `Compare Both` to see causal group delay vs. acausal pre-ringing)."
      },
      level3: {
        math: "y_k, z_k = sosfilt(SOS, x_k, zi=z_{k-1}),  z_0 = sosfilt_zi(SOS)·x_0  |  max_{t ≤ 1024} |ΔF_causal(t)| = 0.0 vs. ΔF_filtfilt = 27.595335",
        variables: [
          "SOS : Cascaded 2nd-order section matrix (prevents numerical instability of transfer-function b, a polynomials).",
          "z_k (zi) : Persistent internal filter delay-line state carried seamlessly across 0.5 s chunks.",
          "0.0 : Exact bitwise difference in features at t <= 1024 when a 10^5 uV, 20 Hz burst is injected at sample 1024.",
          "27.595335 : Log-bandpower leakage before sample 1024 when using acausal scipy.signal.filtfilt."
        ],
        codeWalkthrough: "src/features/causal_dsp.py (`CausalSOSFilter`, `impute_causal_nans`) and `tests/test_causality_leak.py` (injects 10^5 uV 20 Hz burst at sample 1024 and asserts exact 0.0 difference on all prior windows)."
      },
      codeRef: "src/features/causal_dsp.py, tests/test_causality_leak.py, results/phase1_audit_metrics.json",
      trivia: [
        {
          q: "[Level 1 · Warm-Up] Why is `scipy.signal.filtfilt` forbidden in real-time closed-loop BCI pipelines?",
          options: [
            "It filters forward and then backward from the end of the signal, leaking future samples into the past (27.595335 log-power units in our audit).",
            "It only works on audio files.",
            "It deletes half of the EEG channels."
          ],
          answer: 0,
          explain: "The backward pass of `filtfilt` propagates future events backward in time, violating real-time causality."
        },
        {
          q: "[Level 2 + Lab] Why does `CausalSOSFilter` initialize its internal state as `zi = sosfilt_zi(sos) * x[0]` on the first sample?",
          options: [
            "To start the filter at DC steady state matching the initial signal offset x[0], preventing an artificial startup transient spike.",
            "To set the sampling rate to 128 Hz.",
            "To zero out the entire signal."
          ],
          answer: 0,
          explain: "Scaling `sosfilt_zi(sos)` by `x[0]` prevents a huge step-response ringing artifact at `t = 0`."
        },
        {
          q: "[Level 3 · Boss Check] In `tests/test_causality_leak.py`, when a `10^5 uV` 20 Hz burst is injected at sample 1024 (`t = 8.0 s`), what is the maximum feature change for `t <= 1024` in our causal pipeline, and what is the measured mean group delay of the 4th-order 4–45 Hz EEG broadband filter?",
          options: [
            "0.0 exact lookahead leak; 24.42 ms (3.13 samples) mean group delay.",
            "1.55 leak; 500 ms group delay.",
            "27.60 leak; 0.0 ms group delay."
          ],
          answer: 0,
          explain: "Verified in `results/phase1_audit_metrics.json`: causal leak is exactly `0.0`, and the 4–45 Hz 4th-order Butterworth SOS filter has `3.13 samples` (`24.42 ms`) mean passband group delay."
        }
      ]
    },

    {
      id: "eeg-features",
      title: "5. EEG Spectral Power, Baseline Norm & Asymmetry",
      phase: "Phase 1",
      tag: "Neuroscience",
      labType: "eeg-bands",
      summary: "Sliding 2.0 s Hamming rFFT across Theta/Alpha/Beta/Gamma, log-baseline normalization (ε = 1e-12), and FAA/TBR/BAR.",
      level1: {
        analogy: "A prism splits white light into rainbow colors; our Fast Fourier Transform (`rFFT`) splits raw brainwaves into 4 musical rhythms every 0.5 seconds: Theta (4–8 Hz, sleepy/mental effort), Alpha (8–12 Hz, relaxed/idling), Beta (12–30 Hz, active focus/alertness), and Gamma (30–45 Hz, intense emotion). Because every person's skull thickness differs, we subtract their own 3-second quiet baseline first!",
        naiveTrap: "Comparing raw EEG microvolts across people without subtracting each trial's 3.0 s fixation baseline—or taking `ln(0)` on a flatlined channel without a safety floor `ε = 1e-12`, which crashes with `-Inf`!",
        labGuide: "In the Lab on the right, adjust Right Frontal (`F4`), Left Frontal (`F3`), Midline (`Fz`), and Parietal (`P4`) bandpowers to see live `FAA`, `TBR`, and `BAR` updates."
      },
      level2: {
        pipeline: [
          "1. Filter EEG causally in 4.0–45.0 Hz broadband (4th-order Butterworth SOS, 24.42 ms delay) to reject DC drift and 50 Hz mains hum.",
          "2. Slice a 2.0 s sliding window (`256 samples` @ 128 Hz) every `0.5 s` (`64 samples`), subtract window mean, and apply a Hamming taper `w[n]`.",
          "3. Compute one-sided PSD via `rFFT` (`Δf = 0.5 Hz` bin width) and integrate bandpower in Theta (4–8 Hz), Alpha (8–12 Hz), Beta (12–30 Hz), and Gamma (30–45 Hz).",
          "4. Normalize against the 3.0 s fixation baseline (`0:384`): `ΔP̃ = ln(P + ε) - ln(P_base + ε)` with `ε = 1e-12`, then compute `FAA = F4 - F3`, `TBR = θ_Fz - β_Fz`, and `BAR = β_P4 - α_P4`."
        ],
        tradeoffs: "Why a 2.0 s (256-sample) window? At 4 Hz (bottom of Theta), 2.0 s captures 8 full wave cycles (`Δf = 0.5 Hz` resolution) while staying short enough to track emotion shifts.",
        labGuide: "Complete Mission 1 (drive `FAA = F4 - F3 > +1.00` for strong Approach/Positive Valence) and Mission 2 (drive `FAA < -0.80` while raising `Fz` Theta to see High Mental Effort + Withdrawal)."
      },
      level3: {
        math: "ΔP̃[k,c,b] = ln(P[k,c,b] + ε) - ln(P_base[c,b] + ε) (ε = 10^{-12})  |  FAA = ΔP̃_{F4,α} - ΔP̃_{F3,α}",
        variables: [
          "P[k,c,b] : Integrated PSD in band b ∈ {θ, α, β, γ} for channel c at 2.0 s window k.",
          "P_base[c,b] : Mean bandpower during the 3.0 s pre-stimulus fixation epoch (samples 0:384).",
          "ε = 1e-12 : Numerical stability floor preventing ln(0) = -Inf on flatline/zero inputs.",
          "FAA, TBR, BAR : Log-power differences (equivalent to log-ratios): FAA = α(F4)-α(F3), TBR = θ(Fz)-β(Fz), BAR = β(P4)-α(P4)."
        ],
        codeWalkthrough: "src/features/eeg_pipeline.py → `CausalEEGPipeline.process_trial()` and `extract_window_features()`. Verified on flatline zeros in `tests/test_numerical_stability.py`."
      },
      codeRef: "src/features/eeg_pipeline.py, configs/eeg_features.yaml, tests/test_numerical_stability.py",
      trivia: [
        {
          q: "[Level 1 · Warm-Up] Why do we add `ε = 1e-12` inside `ln(P + ε) - ln(P_base + ε)` when computing log-bandpowers?",
          options: [
            "To guarantee numerical stability and prevent `ln(0) = -Inf` or `NaN` if a sensor flatlines to zero.",
            "To shift the sampling rate from 128 Hz to 256 Hz.",
            "To remove 50 Hz power-line noise."
          ],
          answer: 0,
          explain: "If `P = 0` on a disconnected/flatlined electrode, `ln(0)` produces `-Inf`; `ε = 1e-12` keeps all features strictly finite."
        },
        {
          q: "[Level 2 + Lab] What are the 3 derived neurophysiological indices in `wearable_6` and which electrodes do they use?",
          options: [
            "Frontal Alpha Asymmetry `FAA = α(F4) - α(F3)` (valence), Theta/Beta Ratio `TBR` at `Fz` (mental effort), and Beta/Alpha Ratio `BAR` at `P4` (cognitive demand).",
            "Heart Rate, SDNN, and RMSSD at Cz.",
            "SCL Mean, SCL Slope, and SCR Power at Fp1."
          ],
          answer: 0,
          explain: "Because features are already in log-space (`ΔP̃`), subtracting log-powers (`F4 - F3`, `θ_Fz - β_Fz`, `β_P4 - α_P4`) computes the exact log-ratios."
        },
        {
          q: "[Level 3 · Boss Check] What window length, taper, and frequency resolution (`Δf`) does `CausalEEGPipeline` use for each 0.5 s step at 128 Hz?",
          options: [
            "2.0 s window (256 samples), Hamming taper, Δf = 0.5 Hz bin spacing across 4–45 Hz.",
            "30.0 s window (3,840 samples), Rectangular taper, Δf = 0.033 Hz.",
            "0.5 s window (64 samples), Blackman taper, Δf = 2.0 Hz."
          ],
          answer: 0,
          explain: "256 samples at 128 Hz = 2.0 s window, giving `Δf = 128 / 256 = 0.5 Hz` per rFFT bin with a Hamming window."
        }
      ]
    },

    {
      id: "gsr-features",
      title: "6. Finger GSR: Parallel SCL/SCR vs. 4.86 s Lag",
      phase: "Phase 1",
      tag: "Autonomic",
      labType: "gsr-parallel",
      summary: "Why subtracting a 4.86 s delayed 0.05 Hz lowpass corrupts SCR spikes, and how parallel filtering extracts 5 clean features.",
      level1: {
        analogy: "Your palm sweat (Galvanic Skin Response, Channel 37 / Index 36) has two stories: a slow tide called Tonic SCL (< 0.05 Hz background drift) and sudden waves called Phasic SCR (0.05–1.5 Hz startle/arousal spikes). If you try to get the fast waves by subtracting the slow tide from the raw signal (`raw - lowpass`), there's a catch: the ultra-slow 0.05 Hz lowpass filter lags behind by `4.86 seconds`! Subtracting a 5-second-old tide from today's wave creates a fake negative echo.",
        naiveTrap: "Computing `SCR = raw_GSR - lowpass_0.05Hz(raw_GSR)` in a causal pipeline! Because the causal 0.05 Hz lowpass has a `621.59-sample` (`4,856.15 ms`) group delay, subtraction causes severe phase-mismatch distortion.",
        labGuide: "In the Lab on the right, toggle between `Parallel SCR (Clean)` and `Naive Subtract (4.86 s Phase Mismatch)` to see the fake negative dip appear after every sweat spike."
      },
      level2: {
        pipeline: [
          "1. Read DEAP peripheral index 36 (1-based Channel 37: Finger GSR) into a 30.0 s (`3,840-sample`) causal FIFO buffer.",
          "2. Branch A (Tonic SCL): Pass raw GSR through a 2nd-order 0.05 Hz causal Butterworth lowpass (`τ = 4,856.15 ms`) and baseline-normalize against the 3.0 s fixation mean/std.",
          "3. Branch B (Phasic SCR): In parallel, pass raw GSR through a 2nd-order 0.05–1.5 Hz causal Butterworth bandpass (`τ = 331.98 ms`).",
          "4. Extract 5 features every 0.5 s: `gsr_scl_mean`, `gsr_scl_slope` (OLS linear fit), `gsr_scr_power`, `gsr_scr_peaks` (causal 3-point local maxima with `1.0 s` refractory gate), and `gsr_scr_amp`."
        ],
        tradeoffs: "While parallel filtering eliminates phase-mismatch subtraction artifacts, raw `gsr_scr_power` has a heavy right-skewed tail across DEAP (reaching `8.73e8`), which we flag for log1p/robust scaling in Phase 2.",
        labGuide: "Complete Mission 1 (switch to `Naive Subtract` to inspect the 4.86 s delayed dip) and Mission 2 (switch back to `Parallel SCR` and adjust the spike amplitude slider to inspect the 5 extracted GSR features)."
      },
      level3: {
        math: "SCL_k = LP_{0.05Hz}(g_k) (τ = 4,856.15 ms)  ||  SCR_k = BP_{0.05-1.5Hz}(g_k) (τ = 331.98 ms)  → f_GSR ∈ R^5",
        variables: [
          "gsr_scl_mean, gsr_scl_slope : Baseline-normalized tonic level mean and ordinary-least-squares slope over the 30 s buffer.",
          "gsr_scr_power : Mean squared phasic energy (1/N) Σ SCR[n]^2.",
          "gsr_scr_peaks, gsr_scr_amp : Count and mean positive amplitude of causal 3-point peaks (SCR[n-1] > SCR[n-2] and SCR[n-1] >= SCR[n]) with a 1.0 s (128-sample) refractory period.",
          "621.59 samples (4,856.15 ms) : Measured passband group delay of the 2nd-order 0.05 Hz SCL lowpass filter."
        ],
        codeWalkthrough: "src/features/gsr_pipeline.py → `CausalGSRPipeline` (`_scl_filter` + `_scr_filter` in parallel) and `configs/peripheral_features.yaml`."
      },
      codeRef: "src/features/gsr_pipeline.py, configs/peripheral_features.yaml, results/phase1_audit_metrics.json",
      trivia: [
        {
          q: "[Level 1 · Warm-Up] Why does `CausalGSRPipeline` use two parallel filters instead of subtracting `raw_GSR - SCL_lowpass`?",
          options: [
            "Because the causal 0.05 Hz SCL lowpass filter has a 4,856.15 ms (~4.86 s) group delay, so subtracting it from undelayed raw GSR creates severe phase-mismatch distortion.",
            "Because subtraction is slower than FFT.",
            "Because GSR is sampled at 1000 Hz."
          ],
          answer: 0,
          explain: "Subtracting a 4.86 s delayed signal from an undelayed signal creates a fake inverted echo; parallel LP (0.05 Hz) and BP (0.05–1.5 Hz) filters avoid this."
        },
        {
          q: "[Level 2 + Lab] What are the 5 GSR features extracted every 0.5 s over the 30.0 s causal buffer?",
          options: [
            "`gsr_scl_mean`, `gsr_scl_slope`, `gsr_scr_power`, `gsr_scr_peaks` (1.0 s refractory gate), and `gsr_scr_amp`.",
            "Theta, Alpha, Beta, Gamma, and FAA.",
            "HR, SDNN, RMSSD, LF, and HF."
          ],
          answer: 0,
          explain: "2 tonic SCL features (`mean`, `slope`) + 3 phasic SCR features (`power`, `peaks`, `amp`) = 5 GSR features."
        },
        {
          q: "[Level 3 · Boss Check] What Phase 1 audit finding about `gsr_scr_power` is documented in `docs/PHASE_1_AUDIT_REPORT.md` for Phase 2 state-space modeling?",
          options: [
            "Unscaled `gsr_scr_power` reaches `8.73e8` on movement/artifact trials (vs. ~10^0 for EEG), requiring train-split `log1p`/robust scaling before fitting (C, R).",
            "`gsr_scr_power` is always 0.0 across all 32 subjects.",
            "`gsr_scr_power` contains 500 NaN values."
          ],
          answer: 0,
          explain: "All 153,600 windows are strictly finite (0 NaN/Inf), but the 8-order-of-magnitude scale gap (`8.73e8` vs `10^0`) requires train-split normalization in Phase 2."
        }
      ]
    },

    {
      id: "bvp-features",
      title: "7. Thumb BVP, Lomb–Scargle HRV & ω_BVP Fallback",
      phase: "Phase 1",
      tag: "Autonomic",
      labType: "bvp-hrv",
      summary: "300 ms refractory peak detection, irregular-beat Lomb–Scargle LF/HF, and ω_BVP = 0.1 cold-start confidence.",
      level1: {
        analogy: "Your pulse wave (Thumb BVP, Channel 39 / Index 38) speeds up and slows down with every breath—that beat-to-beat wiggle is Heart Rate Variability (HRV), a goldmine for stress vs. calm. But two things make HRV tricky in real time: (1) heartbeats arrive at uneven times, so a regular FFT can't read them directly; and (2) during the first 1–2 seconds of a trial, only 1 heartbeat has arrived—you can't measure the gap between beats with just 1 beat! So we use the Lomb–Scargle periodogram for uneven beats, and emit a confidence tag `ω_BVP = 0.1` during cold start.",
        naiveTrap: "Dividing by `(N_beats - 1)` when `N_beats < 2` (which crashes with `0/0 = NaN`!) or running a uniform-grid FFT on unevenly spaced heartbeat intervals.",
        labGuide: "In the Lab on the right, scrub the Beat Count / Window Elapsed slider from Cold Start (`1 beat`, `ω_BVP = 0.1`) to Active HRV (`>= 10 beats & >= 30 s`, `ω_BVP = 1.0`) and test the 300 ms refractory gate."
      },
      level2: {
        pipeline: [
          "1. Filter Thumb BVP (index 38) with a 2nd-order 0.5–5.0 Hz causal Butterworth bandpass (`τ = 111.78 ms`, corresponding to 30–300 bpm).",
          "2. Detect systolic peaks causally (`b[n-1] > b[n-2]` and `b[n-1] >= b[n]`, `b[n-1] > 0`) with a `300 ms` (`38-sample`) refractory gate capping heart rate at `<= 200 bpm`.",
          "3. If `< 2` peaks exist (`< 1` RR interval, occurring in `4,070 / 153,600` windows = `2.65%`), fall back to baseline HR (`60 bpm` default) and set confidence `ω_BVP = 0.1`.",
          "4. Once `>= 30.0 s` (`3,840 samples`) and `>= 10` RR intervals are available, evaluate `scipy.signal.lombscargle` on mean-centered RR intervals across LF (`0.04–0.15 Hz`) and HF (`0.15–0.40 Hz`) and set `ω_BVP = 1.0`."
        ],
        tradeoffs: "Why gate Lomb–Scargle until `>= 30 s` and `>= 10 beats`? A `0.04 Hz` LF wave has a `25.0 s` period—estimating it on a 5 s window produces meaningless spectral noise.",
        labGuide: "Complete Mission 1 (trigger Cold-Start Fallback with `< 2` beats to see `ω_BVP = 0.1`) and Mission 2 (advance to `>= 30 s` and `>= 12` beats to activate Lomb–Scargle LF/HF with `ω_BVP = 1.0`)."
      },
      level3: {
        math: "RR_i = t_{peak,i} - t_{peak,i-1} (≥ 300 ms)  |  P_LS(ω) = lombscargle(t_RR, RR - μ_RR)  |  ω_BVP ∈ {0.1 (4,070 win), 1.0 (149,530 win)}",
        variables: [
          "6 BVP Features : `bvp_hr_mean`, `bvp_sdnn`, `bvp_rmssd`, `bvp_lf_power` (0.04–0.15 Hz), `bvp_hf_power` (0.15–0.40 Hz), `bvp_lf_hf_ratio`.",
          "300 ms (38 samples @ 128 Hz) : Refractory period preventing double-counting dicrotic notches (> 200 bpm).",
          "ω_BVP = 0.1 : Degraded/cold-start confidence emitted on exactly 4,070 of 153,600 windows (2.65%) so the Kalman filter inflates R_BVP.",
          "111.78 ms (14.31 samples) : Measured mean group delay of the 0.5–5.0 Hz BVP bandpass filter."
        ],
        codeWalkthrough: "src/features/bvp_pipeline.py → `CausalBVPPipeline` (`_extract_window_features`, `lombscargle`) and `tests/test_bvp_cold_start.py`."
      },
      codeRef: "src/features/bvp_pipeline.py, configs/peripheral_features.yaml, tests/test_bvp_cold_start.py",
      trivia: [
        {
          q: "[Level 1 · Warm-Up] Why does `CausalBVPPipeline` use the Lomb–Scargle periodogram instead of a standard FFT to compute LF (0.04–0.15 Hz) and HF (0.15–0.40 Hz) HRV?",
          options: [
            "Because heartbeat RR intervals occur at unevenly spaced timestamps, which Lomb–Scargle evaluates natively without artificial resampling.",
            "Because Lomb–Scargle does not need heartbeats.",
            "Because FFT only works above 100 Hz."
          ],
          answer: 0,
          explain: "Heartbeats are point events separated by variable RR durations; `scipy.signal.lombscargle` estimates spectral power directly on irregular timestamps."
        },
        {
          q: "[Level 2 + Lab] What happens during the first moments of a trial when fewer than 2 systolic peaks (`< 1` RR interval) have been detected?",
          options: [
            "The pipeline emits finite baseline fallback values and sets the quality confidence scalar to `ω_BVP = 0.1` (occurring in 4,070 of 153,600 windows = 2.65%).",
            "The pipeline throws a DivideByZero exception and aborts the trial.",
            "The pipeline sets Heart Rate to `NaN`."
          ],
          answer: 0,
          explain: "Tested in `tests/test_bvp_cold_start.py`: all 6 BVP features remain finite and `ω_BVP = 0.1` signals low BVP confidence to the Phase 2 Kalman observer."
        },
        {
          q: "[Level 3 · Boss Check] What are the two gating conditions required before Lomb–Scargle LF/HF spectral features activate, and what is the refractory period of the systolic peak detector?",
          options: [
            "`>= 30.0 s` buffer duration AND `>= 10` RR intervals; `300 ms` (`38 samples` @ 128 Hz, max 200 bpm) refractory period.",
            "`>= 2.0 s` buffer AND `>= 2` beats; `10 ms` refractory period.",
            "`>= 60.0 s` buffer AND `>= 100` beats; `1000 ms` refractory period."
          ],
          answer: 0,
          explain: "Configured in `configs/peripheral_features.yaml`: `min_rr_intervals_for_freq: 10`, `window_length_sec: 30.0`, and `min_peak_distance_sec: 0.30`."
        }
      ]
    },

    {
      id: "kalman-p2",
      title: "8. Phase 2: 2D State-Space & Kalman Observer",
      phase: "Phase 2 (Next)",
      tag: "Control Theory",
      labType: "kalman-preview",
      summary: "Identifying 32 Virtual Subjects (A, B, C, Q, R), scaling features, augmenting filter lags, and fusing sensors under dropout.",
      level1: {
        analogy: "Imagine tracking a submarine with two sonar systems: one is fast but static-filled (EEG), and the other is steady but delayed by 5 seconds (GSR/BVP). A **Kalman Filter** is the ultimate navigator: it keeps a 2D mental model of how emotion moves (`x_{k+1} = A x_k + B u_k`) and blends that prediction with incoming sensors based on how trustworthy each sensor is right now (`Q` vs. `R`). If an EEG wire pops loose or BVP is in cold start (`ω_BVP = 0.1`), the Kalman filter smoothly rides on its internal model and remaining sensors!",
        naiveTrap: "Feeding unscaled features (where `gsr_scr_power` is `8.73e8` and EEG is `~1.0`) directly into linear regression or a Kalman filter without scaling, delay augmentation, and collinearity pruning!",
        labGuide: "In the Lab on the right, toggle `Simulate EEG Dropout` and adjust `Model Trust (1/Q)` and `ω_BVP Confidence` to watch the green Kalman estimate track the blue ground truth through sensor blackouts."
      },
      level2: {
        pipeline: [
          "1. Pre-condition Phase 1 features on training splits only: apply `log1p`/robust z-score scaling (fixing the `8.73e8` GSR scale gap) and prune exact linear dependencies (`FAA = F4-F3`, `TBR`, `BAR`, `LF/HF`).",
          "2. Augment the state vector to account for the `4.86 s` (`~10 steps`) causal GSR SCL group delay and gate low-amplitude BVP windows (`HR < 40 bpm` or `ω_BVP = 0.1`) by inflating `R_k`.",
          "3. Identify subject-specific matrices `(A_i, B_i, C_i, Q_i, R_i)` for all `N = 32` Virtual Subjects with sequential Affective Priming Score (`APS`, Gutierrez Maestro et al. 2025) transition weighting.",
          "4. Verify asymptotic stability (`ρ(A_i) < 1`) and observability (`rank(obsv(A_i, C_i)) == 2`) on held-out test trials."
        ],
        tradeoffs: "Regularized subspace/state-space identification prevents overfitting on `D = 146` (`full_32`) features when fitting 40 trials per subject.",
        labGuide: "Complete Mission 1 (enable `EEG Dropout` to see raw sensor error spike while the Kalman estimate stays bounded) and Mission 2 (raise `Model Trust 1/Q >= 8` during dropout to reduce estimation RMSE)."
      },
      level3: {
        math: "x_{k+1} = A x_k + B u_k + w_k (w_k ~ N(0,Q)),  y_k = C x_k + v_k (v_k ~ N(0,R_k))  |  K_k = P_{k|k-1} C^T (C P_{k|k-1} C^T + R_k)^{-1}",
        variables: [
          "A ∈ R^{2×2}, B ∈ R^{2×m}, C ∈ R^{D×2} : State transition, actuator input, and physiological observation matrices.",
          "Q, R_k : Process noise covariance and time-varying measurement noise covariance (inflated when ω_BVP = 0.1 or EEG drops out).",
          "K_k : Optimal Kalman gain balancing model prediction P_{k|k-1} against sensor innovation (y_k - C x̂_{k|k-1}).",
          "APS : Affective Priming Score (Gutierrez Maestro et al., 2025) modeling emotional carry-over between consecutive trials."
        ],
        codeWalkthrough: "Planned for `src/models/` in Phase 2, strictly following `docs/PHASE_1_AUDIT_REPORT.md` (§5 Recommendations 1–4) and `.agents/skills/control-theory-anti-inverse-crime/SKILL.md`."
      },
      codeRef: "docs/PHASE_1_AUDIT_REPORT.md (§5), .agents/skills/control-theory-anti-inverse-crime/SKILL.md, Gutierrez Maestro et al. (2025)",
      trivia: [
        {
          q: "[Level 1 · Warm-Up] How does our Kalman Filter handle a temporary EEG channel dropout or a BVP cold-start window (`ω_BVP = 0.1`)?",
          options: [
            "It increases the measurement noise covariance `R_k` for the degraded channels so the Kalman gain `K_k` relies more on the state-space prediction `A x̂_k + B u_k` and intact sensors.",
            "It halts the closed-loop controller until the experiment restarts.",
            "It replaces missing EEG with random numbers between -100 and +100."
          ],
          answer: 0,
          explain: "By inflating `R_k` on degraded/missing channels, `K_k = P C^T (C P C^T + R_k)^{-1}` automatically down-weights unreliable measurements."
        },
        {
          q: "[Level 2 + Lab] What three Phase 1 audit findings in `docs/PHASE_1_AUDIT_REPORT.md` must Phase 2 address before fitting `(A, B, C, Q, R)`?",
          options: [
            "(1) Train-split scaling for `gsr_scr_power` (`8.73e8`), (2) pruning exact linear combinations (`FAA = F4-F3`, `TBR`, `BAR`), and (3) delay augmentation for the `4.86 s` GSR SCL lag.",
            "Deleting GSR, deleting BVP, and downsampling EEG to 1 Hz.",
            "Using `filtfilt` on all trials."
          ],
          answer: 0,
          explain: "All three are explicitly logged in `docs/PHASE_1_AUDIT_REPORT.md` §5 to prevent ill-conditioned covariance matrices `R`."
        },
        {
          q: "[Level 3 · Boss Check] Which literature concept from Gutierrez Maestro et al. (2025) inspires our sequential inter-trial emotional carry-over modeling in Phase 2?",
          options: [
            "The Affective Priming Score (APS), which quantifies how emotional state from trial `n-1` carries over into baseline/trial `n`.",
            "The Lomb–Scargle periodogram.",
            "The Geneva BioSemi montage."
          ],
          answer: 0,
          explain: "Gutierrez Maestro et al. (2025) introduced the Affective Priming Score (APS) to capture sequential emotional carry-over across stimuli."
        }
      ]
    },

    {
      id: "three-actuators",
      title: "9. Phase 3: Three-Actuator Decoupling Model",
      phase: "Phase 3 (Planned)",
      tag: "LIT-PARAM",
      labType: "three-actuators-lab",
      summary: "Coordinating Parametric Music (Agres 2023/2025), Ambient Light (Li 2025), and Wrist Haptics (Azevedo 2017) to break crossover.",
      level1: {
        analogy: "Try steering a sailboat with only a rudder and no sail: turning left also slows you down! Music has that exact flaw in Quadrant 4 (`Calm`: High Valence, Low Arousal). Agres et al. (2023, 2025) proved that slowing music tempo to calm someone down (`R² = 0.86–0.96` for arousal) accidentally makes the music sound *sad*, dragging Valence down (**Tempo–Valence Crossover**). We fix this by adding two independent actuators: **Green/Purple Ambient Lighting** (Li et al., 2025) to lift Valence and **Slow Wrist Heartbeat Haptics** (Azevedo et al., 2017) to lower Arousal without sad audio!",
        naiveTrap: "Assuming a single actuator (Music alone) can independently steer both axes of a 2D Valence–Arousal space without cross-coupling!",
        labGuide: "In the Lab on the right, set a Quadrant-4 Calm goal (`V* = +0.75, A* = -0.60`), observe the Valence drop when only Music is active, then mix in `180 lx Green Light` and `52 bpm Haptics` to decouple both axes."
      },
      level2: {
        pipeline: [
          "1. Actuator 1 — Parametric Music (Agres et al. 2023/2025; Ehrlich et al. 2019; Daly et al. 2016): Modulate tempo/density for Arousal (`R² = 0.86–0.96`) and mode/harmonic brightness for Valence, modeling the Q4 tempo–valence crossover penalty.",
          "2. Actuator 2 — Ambient Lighting (Li et al. 2025): Switch between `180 lx Green` (highest self-reported valence) and `20 lx Purple` (elevated frontal midline theta FMT & alpha asymmetry FAA).",
          "3. Actuator 3 — Wrist Heartbeat Haptics (Azevedo et al. 2017): Deliver tactile pulses `~20% slower` than resting HR, clamped to `40–65 bpm`, reducing tonic/phasic SCR arousal (`p = 0.029`) and STAI anxiety (`p = 0.007`) without altering mean HR.",
          "4. Tag all actuator gain matrices `B_act` as `[LIT-PARAM]` with physical saturation (`u_min <= u_k <= u_max`) and slew-rate (`|Δu_k| <= Δu_max`) limits."
        ],
        tradeoffs: "Music acts fast on cortical/auditory engagement, while slow haptics and ambient lighting provide steady, non-intrusive autonomic and valence bias without acoustic fatigue.",
        labGuide: "Complete Mission 1 (run Music Alone in Q4 Calm to observe the Tempo–Valence Crossover error `> 0.35`) and Mission 2 (tune Light to `180 lx Green` and Haptics to `52 bpm` so 2D tracking error drops `< 0.08`)."
      },
      level3: {
        math: "u_k = [u_tempo, u_mode, u_light_lx, u_haptic_bpm]^T  |  B_act u_k = B_music u_m + B_light u_l + B_haptic u_h  (rank(B_act) = 2)",
        variables: [
          "R² = 0.86–0.96 : Linear arousal regression fit of musical tempo/features in Agres et al. (2023/2025), accompanied by tempo–valence crossover in Q4.",
          "180 lx Green vs. 20 lx Purple (Li et al., 2025) : 180 lx green maximizes subjective valence; 20 lx purple maximizes EEG FMT and FAA.",
          "40–65 bpm (~20% below resting HR, Azevedo et al., 2017) : Calming haptic pulse band that lowers NS-SCRs (p=0.029) and STAI anxiety (p=0.007).",
          "[LIT-PARAM] : Explicit provenance tag distinguishing literature-derived actuator gains from DEAP data-identified dynamics [DATA-ID]."
        ],
        codeWalkthrough: "Documented in `docs/CLAIMS_EVIDENCE_MATRIX.md` and `.agents/skills/control-theory-anti-inverse-crime/SKILL.md` for Phase 3 (`src/models/actuators.py`)."
      },
      codeRef: "docs/CLAIMS_EVIDENCE_MATRIX.md, Agres et al. (2023/2025), Li et al. (2025), Azevedo et al. (2017)",
      trivia: [
        {
          q: "[Level 1 · Warm-Up] What is the 'Tempo–Valence Crossover' reported by Agres et al. (2023, 2025) when using Music Alone?",
          options: [
            "Slowing music tempo to reduce Arousal (e.g., toward Quadrant 4 Calm) unintentionally makes the music sound sadder, pulling Valence downward.",
            "Playing fast music lowers heart rate.",
            "Music only affects skin conductance and never affects EEG."
          ],
          answer: 0,
          explain: "While music controls Arousal strongly (`R² = 0.86–0.96`), slow calming music couples negatively into Valence—requiring auxiliary Lighting + Haptics."
        },
        {
          q: "[Level 2 + Lab] What are the exact literature-verified parameters for Ambient Lighting (Li et al., 2025) and Wrist Heartbeat Haptics (Azevedo et al., 2017)?",
          options: [
            "Lighting: `180 lx Green` (highest subjective valence) & `20 lx Purple` (boosts FMT/FAA); Haptics: `~20% slower than resting HR`, clamped to `40–65 bpm` (lowers SCRs `p=0.029` & anxiety `p=0.007`).",
            "Lighting: 10,000 lx White; Haptics: 180 bpm.",
            "Lighting: 0 lx Pitch Dark; Haptics: 5 bpm."
          ],
          answer: 0,
          explain: "Verified directly against Li et al. (2025) and Azevedo et al. (2017) in `docs/CLAIMS_EVIDENCE_MATRIX.md`."
        },
        {
          q: "[Level 3 · Boss Check] Why does adding Lighting and Wrist Haptics to Parametric Music mathematically resolve the Quadrant-4 Calm tracking problem?",
          options: [
            "It makes the 2D control input matrix `B_act` full-rank (`rank = 2`) with independent control authority over Valence and Arousal within saturation bounds `u_min <= u_k <= u_max`.",
            "It increases the EEG sampling rate from 128 Hz to 512 Hz.",
            "It eliminates the need for a state estimator."
          ],
          answer: 0,
          explain: "With `rank(B_act) = 2` and positive valence bias from 180 lx green light + arousal damping from 40–65 bpm haptics, the controller decouples V and A."
        }
      ]
    },

    {
      id: "anti-inverse-crime",
      title: "10. Phase 4–5: MPC, RL & Anti-Inverse-Crime Benchmark",
      phase: "Phase 4–5 (Planned)",
      tag: "Verification",
      labType: "mpc-benchmark-lab",
      summary: "Benchmarking Open-Loop, LQR, Constrained MPC, Fuzzy-MPC, and RL under plant mismatch, dropouts, and 38% non-responder baselines.",
      level1: {
        analogy: "If a teacher writes a practice test and then gives the exact same questions with the exact same numbers on the final exam, getting 100% doesn't prove you learned anything! In control theory, testing a controller on the exact noiseless equations used to design it is called an **Inverse Crime**. To prove our controller works in the real world, we stress-test 5 controllers (`Open-Loop`, `LQR`, `Constrained MPC`, `Fuzzy-MPC`, and `Model-Free RL`) when the virtual human's brain dynamics drift (`ΔA, ΔB`), carryover emotions linger, and sensors drop out!",
        naiveTrap: "Testing LQR or MPC on a noiseless nominal model without actuator saturation limits (`u_min <= u_k <= u_max`), or cherry-picking 1 lucky subject instead of reporting all 32 subjects (`mean ± SD`, `median [IQR]`, and non-responder rate vs. Sayal et al. 2025's `38%` mean).",
        labGuide: "In the Lab on the right, switch between the 5 Controllers (`Open-Loop`, `LQR`, `Constrained MPC`, `Fuzzy-MPC`, `RL`) and inject `Plant–Model Mismatch (ΔA)` to see which controller respects actuator safety bounds while minimizing RMSE."
      },
      level2: {
        pipeline: [
          "1. Compare 5 matched-bound controllers across all `N = 32` Virtual Subjects and 4 Daly et al. (2016) trajectories (`De-stress`, `Calm`, `Make Happy`, `Excite`).",
          "2. Enforce identical physical saturation (`u_min <= u_k <= u_max`) and slew-rate (`|Δu_k| <= Δu_max`) constraints across all controllers.",
          "3. Stress-test under 3 Anti-Inverse-Crime regimes: (a) Plant–Model Mismatch (`ΔA, ΔB` perturbation), (b) Affective Priming Carry-Over disturbance, and (c) Temporary EEG Channel Dropout.",
          "4. Report fixed-seed Monte Carlo cohort distributions (`mean ± SD`, `median [IQR]`), tracking RMSE, settling time, actuator effort, and cohort non-responder fraction against the `16–57%` (`mean 38%`, Sayal et al. 2025) neurofeedback benchmark."
        ],
        tradeoffs: "`LQR` is fast in closed form but clips naively at saturation bounds; `Constrained MPC` optimizes over a lookahead horizon while explicitly respecting `u_min <= u_k <= u_max`; `Fuzzy-MPC` adapts weights smoothly under uncertainty; `Model-Free RL` requires exploration/training data before converging.",
        labGuide: "Complete Mission 1 (compare `Constrained MPC` vs. `Open-Loop` under `25% Plant Mismatch`) and Mission 2 (test `Fuzzy-MPC` at `>= 30% Mismatch` to verify zero actuator saturation violations)."
      },
      level3: {
        math: "min_{u_{0..H-1}} Σ_{j=0}^{H-1} (||x̂_{k+j} - x*||_Q^2 + ||u_{k+j}||_R^2 + ||Δu_{k+j}||_S^2)   s.t.  u_min ≤ u ≤ u_max, |Δu| ≤ Δu_max",
        variables: [
          "H : MPC prediction horizon (steps of Δt = 0.5 s).",
          "Q, R, S : State tracking error weight, control effort penalty, and actuator slew-rate smoothness penalty.",
          "ΔA, ΔB : True-plant parameter perturbations testing robustness against inter-trial/inter-subject mismatch (Anti-Inverse Crime).",
          "16–57% (mean 38%, Sayal et al., 2025) : Literature BCI/neurofeedback non-responder rate benchmark."
        ],
        codeWalkthrough: "Governed by `AGENTS.md` (Rules 3, 4, 6) and `.agents/skills/control-theory-anti-inverse-crime/SKILL.md` for Phase 4–5 implementation in `src/controllers/`."
      },
      codeRef: "AGENTS.md (Rule 3), .agents/skills/control-theory-anti-inverse-crime/SKILL.md, Sayal et al. (2025)",
      trivia: [
        {
          q: "[Level 1 · Warm-Up] What is an 'Inverse Crime' in closed-loop physiological simulation (AGENTS.md Rule 3)?",
          options: [
            "Testing a controller or Kalman observer on the exact same noiseless, unperturbed model parameters `(A, B, C)` used to design it, without testing parameter mismatch, unmodeled dynamics, or out-of-sample generalization.",
            "Inverting a matrix in Python using `np.linalg.inv`.",
            "Using 6 electrodes instead of 32."
          ],
          answer: 0,
          explain: "Rule 3 strictly forbids circular validation on noiseless nominal models; we must test under noise, plant–model mismatch (`ΔA, ΔB`), carry-over, and sensor dropouts."
        },
        {
          q: "[Level 2 + Lab] Why does Constrained MPC outperform naive clipped LQR when driving a stressed user toward Calm under actuator limits?",
          options: [
            "Constrained MPC optimizes future inputs over a prediction horizon `H` while explicitly enforcing saturation (`u_min <= u_k <= u_max`) and slew-rate (`|Δu_k| <= Δu_max`) constraints.",
            "Constrained MPC ignores actuator limits and applies infinite voltage.",
            "LQR cannot run on 2D systems."
          ],
          answer: 0,
          explain: "Unlike LQR (which computes unconstrained gains and clips after the fact), MPC plans ahead within physical actuator and slew-rate bounds."
        },
        {
          q: "[Level 3 · Boss Check] What literature benchmark from Sayal et al. (2025) do we use to evaluate our simulated cohort non-responder fraction, and how must stochastic results be reported?",
          options: [
            "16–57% (mean 38%) non-responder rate; report fixed-seed cohort distributions (`mean ± SD` and `median [IQR]` across all N = 32 virtual subjects, never cherry-picked runs).",
            "0% non-responders; report only Subject s01.",
            "95% non-responders; report without random seeds."
          ],
          answer: 0,
          explain: "Sayal et al. (2025) document that 16–57% (mean 38%) of neurofeedback users are non-responders; Rule 3 mandates fixed seeds and full cohort distributions."
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
  ],

  labMissions: {
    "circumplex": [
      { id: "m1", prompt: "Mission 1: Pick Calm (Q4: +0.75, -0.60) in Open-Loop mode to see why passive systems leave error high.", xp: 25 },
      { id: "m2", prompt: "Mission 2: Switch to Closed-Loop (Δt = 0.5 s) in Q4 so tracking error ||e_k|| drops < 0.08.", xp: 25 }
    ],
    "deap-sam": [
      { id: "m1", prompt: "Mission 1: Select Raw .dat['labels'] to expose the 439 inverted Quadrant-1 trials (where 9.00 → 0.00).", xp: 25 },
      { id: "m2", prompt: "Mission 2: Enable Restored participant_ratings.xls and scrub past t = 3.0 s into the 60 s stimulus.", xp: 25 }
    ],
    "montage": [
      { id: "m1", prompt: "Mission 1: Switch to wearable_4 (29 features, 0.822 ms/step) to inspect the minimal headband.", xp: 25 },
      { id: "m2", prompt: "Mission 2: Tap electrode F4 on the SVG head map to inspect its Geneva BioSemi index (19).", xp: 25 }
    ],
    "causality": [
      { id: "m1", prompt: "Mission 1: Select Acausal filtfilt to reveal the 27.60 log-power backward leakage before sample 1024.", xp: 25 },
      { id: "m2", prompt: "Mission 2: Select Compare Both to contrast zero-leakage Causal SOS (24.42 ms lag) against filtfilt.", xp: 25 }
    ],
    "eeg-bands": [
      { id: "m1", prompt: "Mission 1: Set F4 and F3 sliders so FAA (F4 - F3) exceeds +1.00 (Strong Positive / Approach bias).", xp: 25 },
      { id: "m2", prompt: "Mission 2: Invert the sliders so FAA drops below -0.80 while raising Fz Theta (High TBR).", xp: 25 }
    ],
    "gsr-parallel": [
      { id: "m1", prompt: "Mission 1: Switch to Naive Subtract to observe the fake negative phase-mismatch artifact (4.86 s delay).", xp: 25 },
      { id: "m2", prompt: "Mission 2: Return to Parallel SCR to verify the clean 331.98 ms phasic response and 5 GSR features.", xp: 25 }
    ],
    "bvp-hrv": [
      { id: "m1", prompt: "Mission 1: Set Elapsed Time < 2.0 s (< 2 beats) to trigger Cold-Start Fallback (ω_BVP = 0.1).", xp: 25 },
      { id: "m2", prompt: "Mission 2: Advance Elapsed Time >= 32.0 s (>= 10 beats) to activate Lomb–Scargle LF/HF (ω_BVP = 1.0).", xp: 25 }
    ],
    "kalman-preview": [
      { id: "m1", prompt: "Mission 1: Enable Simulate EEG Dropout (t = 20–40 s) to test observer resilience.", xp: 25 },
      { id: "m2", prompt: "Mission 2: Increase Model Trust (1/Q >= 8) during dropout to smooth the state estimate.", xp: 25 }
    ],
    "three-actuators-lab": [
      { id: "m1", prompt: "Mission 1: Select Music Alone in Q4 Calm to expose the Tempo–Valence Crossover drop.", xp: 25 },
      { id: "m2", prompt: "Mission 2: Enable 180 lx Green Light (Li 2025) + 52 bpm Wrist Haptics (Azevedo 2017) to decouple V & A.", xp: 25 }
    ],
    "mpc-benchmark-lab": [
      { id: "m1", prompt: "Mission 1: Set Plant–Model Mismatch ΔA >= 25% in LQR to see actuator clipping.", xp: 25 },
      { id: "m2", prompt: "Mission 2: Switch to Constrained MPC / Fuzzy-MPC at ΔA >= 25% to keep saturation violations at 0.", xp: 25 }
    ]
  },

  orderPipelines: [
    {
      title: "Real-Time 0.5 s Causal Feature Extraction Loop",
      steps: [
        "1. Calibrate baseline stats (μ_base, σ_base) strictly on fixation epoch (0–3 s, samples 0:384).",
        "2. Step forward Δt = 0.5 s (64 samples @ 128 Hz) using causal sosfilt with persistent state zi.",
        "3. Extract 2 s EEG log-bandpowers (135/27/18 D), 30 s parallel GSR SCL/SCR (5 D), and 30 s BVP HRV + ω_BVP (6 D).",
        "4. Fuse features in the Kalman observer & compute constrained 3-actuator control u_k (Music + Light + Haptics)."
      ],
      explain: "Every step respects strict temporal causality (0.0 lookahead leakage) and finishes in < 1.55 ms."
    },
    {
      title: "Authoritative DEAP Label & Montage Verification",
      steps: [
        "1. Verify SHA-256 checksums of all 32 raw s01.dat–s32.dat files (read-only).",
        "2. Restore 439 inverted Quadrant-1 valence/arousal ratings from participant_ratings.xls.",
        "3. Map EEG channels using the Geneva 10–20 sequence (avoiding MNE biosemi32 30/32 channel scrambling).",
        "4. Export 153,600 verified control steps per montage with 0 NaN/Inf values."
      ],
      explain: "Restoring Q1 labels and using the Geneva channel order prevents fatal data corruption before Phase 2."
    }
  ],

  capstoneChallenge: {
    title: "Zero-to-Hero Capstone Diagnostic: Designing a Real-Time Calm Controller",
    scenario: "A wearable headband user enters a high-arousal stressed state (V = -0.60, A = +0.75) and wants to reach Calm (V* = +0.75, A* = -0.60). Walk through all 3 engineering decisions without committing an inverse crime:",
    steps: [
      {
        stepTitle: "Step 1 of 3 — Sensor & DSP Integrity (Phase 1)",
        q: "At t = 4.5 s (1.5 s into the stimulus), the user blinks heavily and the 30 s BVP buffer only has 1 beat. How does our causal pipeline handle this?",
        options: [
          "Run scipy.signal.filtfilt across the whole 63 s trial and drop the trial if BVP has < 2 beats.",
          "Filter forward-only with CausalSOSFilter (0.0 leak) and emit neutral BVP features with confidence weight ω_BVP = 0.1.",
          "Interpolate future BVP peaks from t = 35 s backward to t = 4.5 s."
        ],
        answer: 1,
        explain: "CausalSOSFilter preserves 0.0 lookahead leakage, and ω_BVP = 0.1 informs the Kalman observer that the 30 s HRV buffer is still in cold start (4,070/153,600 windows)."
      },
      {
        stepTitle: "Step 2 of 3 — Overcoming the Tempo–Valence Crossover (Phase 3)",
        q: "To move from Stressed (-0.60, +0.75) to Calm (+0.75, -0.60), we slow the music tempo to reduce arousal. According to Agres et al. (2023/2025), what risk arises and how do we solve it?",
        options: [
          "Slowing music causes the Tempo–Valence Crossover (music sounds sadder, dropping Valence); we counter this by coordinating green/warm ambient lighting (Li 2025) and slow ~50–60 bpm wrist haptics (Azevedo 2017).",
          "Slowing music increases arousal; we fix it by turning off all actuators.",
          "Music alone independently decouples Valence and Arousal with zero cross-coupling."
        ],
        answer: 0,
        explain: "Coordinating Music + Lighting + Heartbeat Haptics makes the input matrix B_act full-rank in 2D Valence–Arousal space, preventing the Valence drop in Quadrant 4."
      },
      {
        stepTitle: "Step 3 of 3 — Anti-Inverse-Crime Benchmarking (Phase 4)",
        q: "When benchmarking Constrained MPC against LQR and RL in simulation, what must we include so reviewers accept the validation?",
        options: [
          "Test the controller on the exact noiseless A, B, C matrices used to fit it, and report only the single best run.",
          "Inject plant–model parameter mismatch (ΔA, ΔB), affective priming carry-over disturbances, and temporary EEG channel dropouts across N virtual subjects with fixed random seeds (reporting mean ± SD and median [IQR]).",
          "Modify raw DEAP .dat files until the controller achieves 100% accuracy."
        ],
        answer: 1,
        explain: "Rule 3 (Anti-Inverse Crime) requires testing under parameter mismatch, unmodeled dynamics, and sensor dropouts with full cohort distributions."
      }
    ]
  }
};
