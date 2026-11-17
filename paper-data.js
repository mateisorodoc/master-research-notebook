/* ==========================================================================
   MASTER_RESEARCH — Step-by-Step Annotated Paper Companion Data (main.tex)
   100% verified against manuscript/main.tex, references.bib & CLAIMS_EVIDENCE_MATRIX.md
   ========================================================================== */

window.PAPER_DATA = {
  meta: {
    title: "Simulation-Based Multimodal Closed-Loop Emotional Control in 2D Valence-Arousal Space Using Wearable EEG, Autonomic Signals, and Multi-Actuator Model Predictive Control",
    author: "Matei Sorodoc — Master's Program in Cyber-Physical Systems, Technical University of Cluj-Napoca (UTCN), Romania",
    journal: "Elsevier Biomedical Signal Processing and Control (BSPC) — cas-dc template",
    keywords: [
      "Affective Brain-Computer Interface",
      "Closed-Loop Emotion Regulation",
      "Multimodal Fusion",
      "Model Predictive Control",
      "EEG",
      "Electrodermal Activity",
      "Valence-Arousal Model"
    ]
  },

  // 1. Step-by-Step Section & Paragraph Walkthrough of main.tex
  sections: [
    {
      id: "sec-abstract",
      badge: "Abstract & Keywords",
      lines: "main.tex L24–45",
      title: "Title, Abstract & Core Quantitative Claims",
      paperQuote: "In this paper, we present a simulation-based framework for multimodal closed-loop emotion regulation in the continuous two-dimensional Valence-Arousal space. We implement a causal physiological signal processing pipeline that combines EEG with EDA and BVP photoplethysmography. Using recordings from N = 32 participants in the DEAP dataset (1,280 trials, 153,600 valid control steps at Δt = 0.5 s), we compare the full 32-channel BioSemi 10–20 layout against two sparse wearable subsets (6-electrode and 4-electrode montages). All filters use causal transposed second-order sections with steady-state initialization and past-only sliding spectral windows, giving zero lookahead leakage (max|Δy_k| = 0.0) compared to 27.60 units of leakage with acausal zero-phase filtering. Per-step execution time stays below 1.55 ms (mean <= 0.91 ms across all montages), leaving over 99.6% timing slack within the 500 ms control interval.",
      plainEnglish: [
        "1. The Problem: Most emotional BCIs only measure or control 1D stress/arousal using music alone. Slowing music to calm someone down triggers the 'tempo–valence crossover' (the music sounds sad, lowering valence).",
        "2. Our Solution: We regulate emotion in 2D (Valence + Arousal) using wearable EEG + finger EDA (GSR) + thumb BVP, and coordinate 3 actuators (Music + Ambient Lighting + Heartbeat Haptics).",
        "3. Hard Proof in the Abstract: Reviewers immediately see our verified Phase 1 numbers: N = 32 subjects, 1,280 trials, Δt = 0.5 s step, 0.0 causal lookahead leak (vs. 27.60 acausal filtfilt leak), and < 1.55 ms compute time (> 99.6% real-time slack)."
      ],
      reviewerWhy: "Elsevier BSPC reviewers judge an abstract by whether it states exact sample sizes (N = 32, 1,280 trials), exact causal guarantees (0.0 leak), and real-time feasibility (< 1.55 ms vs. 500 ms budget).",
      citations: ["koelstra2012deap", "agres2023affectmachine", "li2025designing", "azevedo2017calming"],
      conceptId: "circumplex",
      codeRef: "manuscript/main.tex (L24–45), results/phase1_audit_metrics.json"
    },
    {
      id: "sec-intro-context",
      badge: "§1 Intro · Para 1–2",
      lines: "main.tex L49–54",
      title: "From Passive Emotion Recognition to Early Closed-Loop Prototypes",
      paperQuote: "Emotions affect daily decision-making, attention, and mental well-being, and poor emotion regulation under workplace stress is closely linked to anxiety, depression, and burnout [palfi2024adaptive]... Most of these systems use Russell's two-dimensional (2D) Circumplex Model of Affect [russell1980circumplex]... Moreover, recent reviews note that most studies still stop at open-loop recognition [zhang2026closed]. Several early prototypes have shown that closed-loop emotion or affect regulation is feasible, especially using adaptive music: Ramirez et al. [ramirez2015musical] (N=10 elderly, n=6 pre/post BDI), Daly et al. [daly2016affective] (N=8 online across Make Happy, Calm, De-stress, Excite), Ehrlich et al. [ehrlich2019closed] (n=5 online, right-frontal gamma over FC6), Zhang et al. [zhang2026mindmelody] (MindMelody preprint), Khazaei et al. [khazaei2024bayesian] (Bayesian EM arousal decoder), and Fekri Azgomi & Faghih [azgomi2022enhancement] (in silico Fuzzy-LQR and MPC on EDA).",
      plainEnglish: [
        "1. Why Emotion Regulation Matters: Poor emotion regulation in high-stress jobs drives burnout, anxiety, and depression (Pálfi et al., 2024, N = 159 emergency department staff).",
        "2. Open-Loop vs. Closed-Loop: Decoding emotion from EEG/EDA/PPG is well studied (Wu et al., 2023; Koelstra et al., 2012; Saganowski et al., 2022), but single-trial F1 is modest (~0.53–0.61) and stopping at recognition leaves the feedback loop open (Zhang et al., 2026).",
        "3. The 6 Key Predecessors: We credit the pioneers of closed-loop music/stress BCIs (Ramirez 2015, Daly 2016, Ehrlich 2019, MindMelody 2026) and control-theoretic EDA modeling (Khazaei 2024 for Bayesian decoding; Azgomi & Faghih 2022 for in silico Fuzzy-LQR/MPC)."
      ],
      reviewerWhy: "During our Phase 0 audit, we separated Khazaei et al. (2024) (who did Bayesian state decoding, NOT MPC control) from Azgomi & Faghih (2022) (who did in silico Fuzzy-LQR/MPC), and specified FC6 right-frontal gamma Granger causality for Ehrlich et al. (2019).",
      citations: ["palfi2024adaptive", "wu2023affective", "russell1980circumplex", "koelstra2012deap", "saganowski2022emognition", "zhang2026closed", "ewing2016evaluation", "lorenz2016automatic", "sayal2025music", "ramirez2015musical", "daly2016affective", "ehrlich2019closed", "zhang2026mindmelody", "khazaei2024bayesian", "azgomi2022enhancement"],
      conceptId: "circumplex",
      codeRef: "docs/CLAIMS_EVIDENCE_MATRIX.md (Claims C01–C10)"
    },
    {
      id: "sec-gap1",
      badge: "§1 Intro · Gap 1",
      lines: "main.tex L57",
      title: "Gap 1: 1D Control vs. 2D Multimodal Dynamics & Sequential Carry-Over (APS)",
      paperQuote: "1. 1D control versus 2D multimodal dynamics: Existing mathematical control frameworks (such as LQR and MPC in [azgomi2022enhancement]) only regulate a 1D state (stress/arousal) estimated from a single peripheral modality (EDA). Likewise, the online closed-loop BCI implementation in [ehrlich2019closed] mapped a scalar classifier output s ∈ (0,1) identically to both musical axes (valence = arousal = s), constraining feedback along a single 1D diagonal... Prior studies show complementary roles across central and autonomic markers: frontal alpha asymmetry responds to valence shifts [ramirez2015musical, koelstra2012deap], midline frontal theta (Fz) and parietal upper alpha (P4) index mental effort and cognitive demand [ewing2016evaluation], EEG phase synchronization combined with ECG-derived HRV captures 2D affective quadrants [marin2018affective], and EDA impulse deconvolution supports continuous sympathetic arousal tracking [khazaei2024bayesian]... However, film-induction studies show that affective arousal and physiological responses can transfer across consecutive stimuli (emotional carry-over) [gross1995emotion, fernandez2019effective], as quantified in sequential EEG datasets by the Affective Priming Score (APS) [gutierrez2025affective].",
      plainEnglish: [
        "1. The 1D Trap: Azgomi & Faghih (2022) only controlled 1D stress from EDA. Ehrlich et al. (2019) had a 2D music generator, but in their live BCI (Eq. 6, p. 8) they set valence = arousal = s, locking the user onto a 1D diagonal line!",
        "2. Why Multimodal Fusion Is Needed: Brain (EEG) and body (GSR/BVP) signals capture different axes and timescales: FAA (F4-F3) tracks valence, Fz theta & P4 alpha track effort/demand, and EDA/HRV track autonomic arousal.",
        "3. Emotional Carry-Over (APS): Emotions don't reset to zero instantly between stimuli—previous emotions linger (Gross & Levenson 1995; Fernández-Aguilar 2019), quantified by the Affective Priming Score (APS, Gutierrez Maestro et al. 2025)."
      ],
      reviewerWhy: "This paragraph directly justifies RQ1 and Contribution 1: why we need a 2D state vector [Valence, Arousal]^T, why we fuse EEG + GSR + BVP, and why Phase 2 includes APS-inspired carry-over weighting.",
      citations: ["azgomi2022enhancement", "ehrlich2019closed", "koelstra2012deap", "chen2023large", "saganowski2022emognition", "ramirez2015musical", "ewing2016evaluation", "marin2018affective", "khazaei2024bayesian", "gross1995emotion", "fernandez2019effective", "gutierrez2025affective"],
      conceptId: "kalman-p2",
      codeRef: "docs/CLAIMS_EVIDENCE_MATRIX.md (Claims C11–C13)"
    },
    {
      id: "sec-gap2",
      badge: "§1 Intro · Gap 2",
      lines: "main.tex L59",
      title: "Gap 2: Single-Actuator Music Crossover vs. Ambient Light & Wrist Haptics",
      paperQuote: "2. Coupling limitations of single-actuator music feedback: ...Recent validation studies of parametric music generators (AffectMachine-Classical [agres2023affectmachine] and AffectMachine-Pop [agres2025affectmachine]) revealed an important side effect: while music parameters control perceived arousal strongly (R² = 0.86–0.96) alongside high valence fit (R² = 0.90–0.93), perceived valence suffers from an unintended tempo-valence crossover. Specifically, when target valence is high but arousal is driven low (a calm, positive state), listeners perceive the slower music as less pleasant than intended... Overcoming this actuator coupling motivates combining music with complementary non-acoustic modalities: (i) ambient colored lighting, where Li et al. [li2025designing] (N = 33) showed that illuminance strongly modulates both perceived valence and arousal (with bright green light at 180 lx yielding the highest self-reported valence and dim purple light at 20 lx elevating EEG frontal midline theta and frontal alpha asymmetry markers); and (ii) wrist-worn heartbeat haptics, where Azevedo et al. [azevedo2017calming] (N = 52) showed that tactile pulses delivered 20% slower than resting heart rate (clamped to 40–65 bpm) significantly reduced skin conductance arousal and state anxiety.",
      plainEnglish: [
        "1. The Tempo–Valence Crossover: When you want someone to feel Calm (Quadrant 4: High Valence +, Low Arousal -), slowing the music tempo lowers arousal (R² = 0.86–0.96) but accidentally makes the music sound sad, pulling Valence down (Agres et al. 2023/2025; Ehrlich et al. 2019).",
        "2. Conversely, in Daly et al. (2016), monophonic piano feedback failed to raise arousal during Excite tasks for most users.",
        "3. Our 3-Actuator Fix: We pair Music with (a) Ambient Colored Lighting (Li et al. 2025, N = 33: 180 lx green maximizes subjective valence; 20 lx purple boosts FMT & FAA) and (b) Slow Wrist Heartbeat Haptics (Azevedo et al. 2017, N = 52: pulses ~20% slower than resting HR, 40–65 bpm, lower SCR arousal p=0.029 and anxiety p=0.007)."
      ],
      reviewerWhy: "This paragraph justifies RQ2 and Contribution 2. Every number (R² = 0.86–0.96, N = 33, 180 lx green, 20 lx purple, N = 52, 40–65 bpm) was verified directly against the primary PDFs.",
      citations: ["sayal2025music", "daly2016affective", "ehrlich2019closed", "agres2023affectmachine", "agres2025affectmachine", "li2025designing", "azevedo2017calming"],
      conceptId: "three-actuators",
      codeRef: "docs/CLAIMS_EVIDENCE_MATRIX.md (Claims C14–C17)"
    },
    {
      id: "sec-gap3",
      badge: "§1 Intro · Gap 3",
      lines: "main.tex L61",
      title: "Gap 3: In Silico Simulation Benchmarks, 38% Non-Responders & Ethics",
      paperQuote: "3. Lack of simulation benchmarks before human testing: In biomedical control fields like automated anesthesia or insulin delivery, controllers are tested in computer simulations (in silico) on virtual patient models before human deployment [azgomi2022enhancement]. In affective computing, by contrast, many closed-loop prototypes are piloted directly on small volunteer cohorts (N = 5–10)... General neurofeedback reviews report non-responder rates ranging from 16% to 57% (mean 38%) [sayal2025music], while cross-session EEG non-stationarity and signal drift degrade decoder and controller stability across sessions [zhang2026closed, wu2023affective]. A simulation benchmark built from real physiological datasets lets us compare model-based controllers (MPC and Fuzzy-Supervised MPC [azgomi2022enhancement]) against model-free Reinforcement Learning (RL) [pohlmeyer2014using] under realistic noise, temporary sensor dropouts, and ethical user-safety, agency, and mental-privacy constraints [steinert2020wired].",
      plainEnglish: [
        "1. Why Simulate First (In Silico)? You would never test an artificial pancreas on humans without simulating virtual patients first. Yet affective BCIs jump straight to tiny N = 5–10 volunteer tests.",
        "2. The 38% Non-Responder Reality: Across neurofeedback studies, 16% to 57% (mean 38%) of users fail to respond (Alkoby et al. 2018, cited in Sayal et al. 2025), and EEG signals drift over time (Zhang 2026; Wu 2023).",
        "3. Fair Controller Stress-Testing: Our 32-subject virtual benchmark compares LQR, Constrained MPC, and Fuzzy-MPC (Azgomi & Faghih 2022) against Model-Free RL (Pohlmeyer et al. 2014) under sensor dropouts and ethical limits (Steinert & Friedrich 2020)."
      ],
      reviewerWhy: "This pre-empts the #1 reviewer question ('Why is this a simulation study rather than a live human trial?') by citing biomedical control standards (anesthesia/insulin), small-N pitfalls, and the 38% non-responder benchmark.",
      citations: ["azgomi2022enhancement", "zhang2026closed", "sayal2025music", "ramirez2015musical", "daly2016affective", "ehrlich2019closed", "wu2023affective", "pohlmeyer2014using", "steinert2020wired"],
      conceptId: "anti-inverse-crime",
      codeRef: "docs/CLAIMS_EVIDENCE_MATRIX.md (Claims C18–C21)"
    },
    {
      id: "sec-rqs",
      badge: "§1 Intro · RQ1–RQ3",
      lines: "main.tex L63–83",
      title: "Central Research Question, RQ1–RQ3 & The 3 Contributions",
      paperQuote: "Central Question: How can multimodal physiological signals from sparse wearable sensors be reliably fused to track emotional dynamics in real time, and how effectively can a coordinated multi-actuator controller steer a user state across the 2D Valence-Arousal space? • RQ1 (Multimodal Observability): Can combining sparse frontal and parietal EEG with peripheral EDA and HRV in a Kalman filter accurately track 2D emotional trajectories while attenuating slow autonomic lag and sequential carry-over? • RQ2 (Multi-Actuator Synergy): Does coordinating parametric music with ambient colored lighting and slow wrist heartbeat vibrations mitigate the musical tempo-valence crossover, enabling independent steering of both valence and arousal? • RQ3 (Robustness): How do optimal model-based controllers (MPC and Fuzzy-Supervised MPC) compare with data-driven Reinforcement Learning in tracking speed, control effort, and resilience against temporary EEG sensor dropouts?",
      plainEnglish: [
        "1. Notice the 1-to-1 Symmetry: Gap 1 → RQ1 → Contribution 1 (2D Multimodal Kalman Filter + APS Carry-Over). Gap 2 → RQ2 → Contribution 2 (3-Actuator Music + Light + Haptics Decoupling). Gap 3 → RQ3 → Contribution 3 (LQR / MPC / Fuzzy-MPC / RL Benchmark under EEG Dropouts).",
        "2. Wearable Grounding: We build N = 32 Virtual Subjects from DEAP and compare full_32 (32 ch) vs. wearable_6 (Fz, F3, F4, P4, T7, T8) vs. wearable_4 (AF3, AF4, T7, T8)."
      ],
      reviewerWhy: "Every top-tier journal paper needs a crystal-clear mapping where the 3 Gaps in Literature map 1-to-1 onto 3 Research Questions (RQ1–RQ3) and 3 Bullet Contributions.",
      citations: ["koelstra2012deap", "gutierrez2025affective", "ehrlich2019closed", "agres2023affectmachine", "agres2025affectmachine", "li2025designing", "azevedo2017calming", "azgomi2022enhancement", "pohlmeyer2014using", "daly2016affective"],
      conceptId: "montages",
      codeRef: "manuscript/main.tex (L63–83)"
    },
    {
      id: "sec-methods-21",
      badge: "§2.1 Methods",
      lines: "main.tex L85–91",
      title: "§2.1 Dataset (439 Q1 SAM Fix) & Wearable Montage Ablation Design",
      paperQuote: "We used the DEAP multimodal database (N = 32 participants, 40 one-minute music-video trials per participant, totaling 1,280 trials at f_s = 128 Hz) [koelstra2012deap]. Each preprocessed recording has tensor shape (40, 40, 8064) spanning 63.0 s: 3.0 s of pre-stimulus neutral fixation (384 samples, indices 0:384) followed by 60.0 s of affective stimulation (7,680 samples, indices 384:8064). In the preprocessed Python .dat distribution, all 439 Quadrant-1 trials (Valence > 5.0, Arousal > 5.0) store inverted labels (9.0 - Valence, 9.0 - Arousal), mapping 40 trials with 9.00 ratings to 0.00... We restored the authoritative SAM ratings directly from participant_ratings.xls... recovering all 1,280 valid trials (153,600 valid control steps at Δt = 0.5 s) across [1.00, 9.00] for valence (mean 5.25, SD 2.13) and arousal (mean 5.16, SD 2.02)... We used explicit channel indices rather than generic toolbox templates, which differ from DEAP's Geneva channel sequence at 30 of 32 positions: (i) full_32 (D = 146), (ii) wearable_6 [18, 2, 19, 28, 7, 25] -> Fz, F3, F4, P4, T7, T8 (D = 38), and (iii) wearable_4 [1, 17, 7, 25] -> AF3, AF4, T7, T8 (D = 29).",
      plainEnglish: [
        "1. The DEAP Tensor: 32 people × 40 videos = 1,280 trials. Each trial has 40 channels (32 EEG + 8 peripheral) and 8,064 samples at 128 Hz (3 s baseline = 384 samples; 60 s video = 7,680 samples = 120 steps of 0.5 s).",
        "2. The 439 Quadrant-1 Bug Rescue: In DEAP's Python .dat files, all 439 Q1 trials (V > 5, A > 5) had their ratings flipped to (9.0 - rating). We restored the true [1, 9] ratings from participant_ratings.xls (verified to 1e-6 against Dominance/Liking), recovering all 153,600 steps.",
        "3. Geneva Channel Order & 3 Montages: MNE's default biosemi32 template is wrong at 30 of 32 slots for DEAP! Using explicit Geneva indices, we compare full_32 (135 EEG + 11 periph = 146 D), wearable_6 (27 + 11 = 38 D), and wearable_4 (18 + 11 = 29 D)."
      ],
      reviewerWhy: "Catching and documenting both the 439 Q1 SAM label inversion and the 30/32 Geneva-vs-MNE channel order trap shows extraordinary data hygiene that reviewers rarely see.",
      citations: ["koelstra2012deap"],
      conceptId: "deap-data",
      codeRef: "src/data/loader.py, docs/deap_sha256_manifest.json"
    },
    {
      id: "sec-methods-22",
      badge: "§2.2 Methods & Eq. (1)",
      lines: "main.tex L93–105",
      title: "§2.2 Causal Preprocessing, Equation (1), Parallel GSR & Lomb–Scargle BVP",
      paperQuote: "To avoid future-to-past data leakage (an acausal filtering 'inverse crime'), we did not use bidirectional zero-phase filters (filtfilt), whole-trial ICA, or trial-wide z-scoring. Instead, every physiological stream passed forward sample-by-sample through Direct Form II Transposed Second-Order Sections (SOS) IIR Butterworth filters initialized at steady state (z_0 = sosfilt_zi · x[0]) and propagated across consecutive Δt = 0.5 s (64-sample) control steps... For EEG, a causal 4th-order Butterworth bandpass SOS filter (4.0–45.0 Hz, mean passband group delay 3.13 samples [24.42 ms]) conditioned selected channels before computing past-only W_EEG = 2.0 s (N_W = 256 samples) Hamming-windowed rFFT periodograms... Equation (1): ΔP̃_{k,c,b} = ln(P_{k,c,b} + ε) - ln(P_{base,c,b} + ε) with ε = 10^-12 μV²... For autonomic monitoring, we avoided subtractive phasic GSR decomposition because a 2nd-order 0.05 Hz lowpass filter has a mean group delay of 621.59 samples (4.86 s)... Instead, tonic SCL and phasic SCR (0.05–1.5 Hz, 42.49 samples [331.98 ms]) were extracted in parallel... Thumb BVP was conditioned with a 2nd-order 0.5–5.0 Hz bandpass (14.31 samples [111.78 ms]), 300 ms (39-sample) refractory gate (<= 200 bpm), 30.0 s Lomb–Scargle LF/HF when M >= 10 beats and t >= 30.0 s, and ω_BVP = 0.1 fallback on M < 2 beats (4,070 / 153,600 windows [2.65%]).",
      plainEnglish: [
        "1. Strict Causality: Every filter runs forward-only using `sosfilt` + steady-state `zi`, with causal sample-and-hold NaN imputation and ±5σ_base impulse clamping calibrated strictly on the 3 s fixation epoch (`0:384`).",
        "2. EEG & Equation (1): 4–45 Hz bandpass (24.42 ms lag) → 2.0 s (256-sample) Hamming rFFT every 0.5 s → integrate Theta (4–8), Alpha (8–12), Beta (12–30), Gamma (30–45) → subtract baseline log-power with safety floor ε = 1e-12.",
        "3. Parallel GSR (Solving the 4.86 s Lag): Because a 0.05 Hz lowpass lags by 621.59 samples (4.86 s), subtracting `raw - SCL` ruins SCR. Running parallel 0.05 Hz LP (SCL) and 0.05–1.5 Hz BP (SCR, 331.98 ms lag) gives 5 clean features.",
        "4. BVP, Lomb–Scargle & ω_BVP = 0.1: 0.5–5.0 Hz BP (111.78 ms lag) + 300 ms refractory peak gate + 30 s Lomb–Scargle HRV on irregular RR intervals (when >= 10 beats & >= 30 s), falling back to baseline with ω_BVP = 0.1 when < 2 beats occur (4,070 windows = 2.65%)."
      ],
      reviewerWhy: "This subsection gives the exact mathematical and algorithmic recipe so any signal-processing reviewer can reproduce all 146 / 38 / 29 features bit-for-bit.",
      citations: [],
      conceptId: "eeg-features",
      codeRef: "src/features/causal_dsp.py, eeg_pipeline.py, gsr_pipeline.py, bvp_pipeline.py"
    },
    {
      id: "sec-methods-23",
      badge: "§2.3 Verification",
      lines: "main.tex L107–109",
      title: "§2.3 Deterministic Verification, Zero-Lookahead Proof & Latency Budget",
      paperQuote: "Causal verification confirmed zero lookahead: injecting a 10^5 μV, 20 Hz burst at sample 1024 produced max|Δy_k| = 0.0 across all causal streaming steps ending at or before 1024, compared with 27.60 log-power leakage units when the same pipeline used acausal sosfiltfilt. Under single-threaded BLAS execution, mean per-step processing time measured 0.903 ms (max = 1.547 ms) for full_32, 0.842 ms (max = 1.462 ms) for wearable_6, and 0.822 ms (max = 1.165 ms) for wearable_4, leaving over 99.6% slack within the 500 ms control interval. All 18 deterministic unit tests passed without error... The staged HDF5 and NPZ feature archives for all three montages (153,600 windows each) contained zero non-finite entries.",
      plainEnglish: [
        "1. The Sample-1024 Burst Test: We proved zero future leakage mathematically and empirically: a massive 10^5 μV spike at t = 8.0 s (sample 1024) changes features at t <= 8.0 s by 0.000000 (whereas acausal filtfilt leaks 27.60 units backward!).",
        "2. Real-Time Speed: Every 0.5 s (500 ms) step finishes in < 1.55 ms (mean ~0.82–0.90 ms), leaving > 99.6% of the 500 ms CPU budget free for the Kalman filter and MPC optimizer.",
        "3. Zero NaNs Across 460,800 Total Montage Windows: 153,600 windows × 3 montages = 100% finite HDF5/NPZ archives verified by 18 unit tests."
      ],
      reviewerWhy: "Proving causality with an impulse-injection boundary test (`0.0` vs. `27.60`) and reporting exact single-threaded ms latencies makes the signal-processing foundation bulletproof.",
      citations: [],
      conceptId: "causal-filters",
      codeRef: "scripts/audit_phase1_metrics.py, tests/test_causality_leak.py, results/phase1_audit_metrics.json"
    },
    {
      id: "sec-upcoming",
      badge: "§2.4–§5 Blueprint",
      lines: "main.tex L83 (Phases 2–5)",
      title: "Upcoming Manuscript Sections (§2.4–§2.6, §3 Results, §4 Discussion, §5 Conclusion)",
      paperQuote: "The remainder of the paper is structured as follows. Section 2 describes the dataset, wearable montage selection, and causal multimodal feature extraction pipeline, while the following sections cover 2D state-space identification (§2.4), multi-actuator modeling (§2.5), and observer-controller design (§2.6). Section 3 presents the in silico simulation results for state tracking, actuator coordination, and sensor-dropout robustness. Section 4 discusses the findings, wearable hardware considerations, and ethical safeguards, and Section 5 concludes the paper.",
      plainEnglish: [
        "1. §2.4 (Phase 2 — Next): Identify 2D state-space Virtual Subjects (A, B, C, Q, R) for N = 32 DEAP subjects with train-split GSR log1p scaling, collinearity pruning, 4.86 s delay augmentation, and APS carry-over weighting.",
        "2. §2.5 (Phase 3): Formulate the 3-actuator input matrix B_act combining Music (Agres 2023/2025), Ambient Light (Li 2025), and Wrist Haptics (Azevedo 2017) with saturation & slew-rate bounds.",
        "3. §2.6 & §3 (Phase 4): Benchmark Open-Loop, LQR, Constrained MPC, Fuzzy-MPC, and RL across the 4 Daly et al. (2016) trajectories under plant mismatch (ΔA, ΔB) and EEG dropouts.",
        "4. §4 & §5 (Phase 5): Cohort statistics (mean ± SD, median [IQR], non-responder fraction vs. 38%), publication figures, and ethical safeguards (Steinert & Friedrich 2020)."
      ],
      reviewerWhy: "Shows how the completed Phase 0–1 sections in `main.tex` feed directly into Phases 2–5.",
      citations: ["gutierrez2025affective", "agres2023affectmachine", "li2025designing", "azevedo2017calming", "azgomi2022enhancement", "pohlmeyer2014using", "steinert2020wired"],
      conceptId: "anti-inverse-crime",
      codeRef: "docs/PHASE_1_AUDIT_REPORT.md (§5 Phase 2 Recommendations)"
    }
  ],

  // 2. Direct Mapping from each Concept ID on learn.html to main.tex
  conceptPaperAnchors: {
    "circumplex": {
      secId: "sec-intro-context",
      secLabel: "Abstract & §1 Introduction (L38–54)",
      roleInPaper: "Establishes Russell's 2D Valence–Arousal Circumplex as our continuous state space x_k ∈ R^2 and motivates closing the feedback loop every Δt = 0.5 s across the 4 Daly et al. (2016) trajectories.",
      keyCitations: ["russell1980circumplex", "palfi2024adaptive", "zhang2026closed", "daly2016affective"]
    },
    "deap-data": {
      secId: "sec-methods-21",
      secLabel: "§2.1 Dataset & SAM Remediation (L87–89)",
      roleInPaper: "Documents the N = 32 DEAP cohort (1,280 trials, 63.0 s @ 128 Hz: 3.0 s baseline 0:384 + 60.0 s stimulus 384:8064) and our remediation of the 439 inverted Quadrant-1 labels (9.0 - rating) via participant_ratings.xls.",
      keyCitations: ["koelstra2012deap"]
    },
    "montages": {
      secId: "sec-methods-21",
      secLabel: "§2.1 Wearable Montage Ablation Design (L91)",
      roleInPaper: "Defines full_32 (D=146), wearable_6 (Fz, F3, F4, P4, T7, T8 -> D=38), and wearable_4 (AF3, AF4, T7, T8 -> D=29) using explicit Geneva 10–20 indices (avoiding the 30/32 MNE biosemi32 mismatch).",
      keyCitations: ["koelstra2012deap", "ramirez2015musical", "ewing2016evaluation"]
    },
    "causal-filters": {
      secId: "sec-methods-23",
      secLabel: "§2.2–§2.3 Causal SOS Filtering & Zero-Lookahead Proof (L95, L109)",
      roleInPaper: "Proves our Direct Form II Transposed SOS Butterworth pipeline with steady-state initialization (z_0 = sosfilt_zi · x[0]) achieves max|Δy_k| = 0.0 lookahead leak vs. 27.60 leak for acausal filtfilt, executing in < 1.55 ms/step.",
      keyCitations: []
    },
    "eeg-features": {
      secId: "sec-methods-22",
      secLabel: "§2.2 EEG Periodograms & Equation (1) (L97–101)",
      roleInPaper: "Defines Equation (1) in main.tex: ΔP̃_{k,c,b} = ln(P_{k,c,b} + ε) - ln(P_{base,c,b} + ε) with ε = 10^-12 μV² over 2.0 s (256-sample) Hamming-windowed rFFT periodograms and FAA (F4-F3), TBR (Fz), and BAR (P4).",
      keyCitations: ["ramirez2015musical", "ewing2016evaluation", "koelstra2012deap"]
    },
    "gsr-features": {
      secId: "sec-methods-22",
      secLabel: "§2.2 Parallel Tonic/Phasic GSR Decomposition (L103)",
      roleInPaper: "Explains why subtracting 0.05 Hz lowpass SCL (621.59 samples = 4.86 s group delay) from raw GSR causes phase-mismatch gain peaking, and details our parallel 0.05 Hz LP + 0.05–1.5 Hz BP (331.98 ms delay) architecture.",
      keyCitations: ["khazaei2024bayesian"]
    },
    "bvp-features": {
      secId: "sec-methods-22",
      secLabel: "§2.2 Thumb BVP, Lomb–Scargle HRV & ω_BVP Fallback (L105)",
      roleInPaper: "Details the 0.5–5.0 Hz BVP bandpass (111.78 ms lag), 300 ms (39-sample) refractory peak gate (<= 200 bpm), 30.0 s Lomb–Scargle LF/HF (when M >= 10 beats & t >= 30 s), and ω_BVP = 0.1 fallback across 4,070 cold-start/dropout windows (2.65%).",
      keyCitations: ["marin2018affective"]
    },
    "kalman-p2": {
      secId: "sec-gap1",
      secLabel: "§1 Gap 1, RQ1 & Planned §2.4 State-Space Kalman Observer (L57, L69, L78)",
      roleInPaper: "Motivates fusing fast EEG with slow peripheral EDA/HRV in a 2D state-space Kalman filter with Affective Priming Score (APS)-inspired carry-over weighting and delay augmentation.",
      keyCitations: ["khazaei2024bayesian", "fernandez2019effective", "gutierrez2025affective"]
    },
    "three-actuators": {
      secId: "sec-gap2",
      secLabel: "§1 Gap 2, RQ2 & Planned §2.5 Three-Actuator Model (L59, L70, L79)",
      roleInPaper: "Resolves the Agres et al. (2023/2025) musical tempo–valence crossover by coordinating Parametric Music with Ambient Colored Lighting (Li et al. 2025: 180 lx green, 20 lx purple) and Wrist Heartbeat Haptics (Azevedo et al. 2017: 40–65 bpm).",
      keyCitations: ["agres2023affectmachine", "agres2025affectmachine", "ehrlich2019closed", "li2025designing", "azevedo2017calming"]
    },
    "anti-inverse-crime": {
      secId: "sec-gap3",
      secLabel: "§1 Gap 3, RQ3 & Planned §2.6–§4 Controller Benchmark (L61, L71, L80)",
      roleInPaper: "Establishes the in silico benchmark comparing Open-Loop, LQR, Constrained MPC, Fuzzy-MPC (Azgomi & Faghih 2022), and Model-Free RL (Pohlmeyer et al. 2014) under plant mismatch, EEG dropouts, 38% non-responder baselines (Sayal 2025), and neuroethics (Steinert 2020).",
      keyCitations: ["azgomi2022enhancement", "sayal2025music", "pohlmeyer2014using", "steinert2020wired"]
    }
  },

  // 3. Interactive Equation "X-Ray" (Tap any symbol token -> English + Units + Python Code)
  equationXrays: [
    {
      id: "eq1-eeg",
      title: "Equation (1) in main.tex (§2.2, L98–100) — Causal Baseline-Normalized Log-Bandpower",
      latexDisplay: "ΔP̃_{k,c,b} = ln( P_{k,c,b} + ε ) − ln( P_{base,c,b} + ε )",
      tokens: [
        {
          sym: "ΔP̃_{k,c,b}",
          name: "Baseline-Normalized Log-Bandpower",
          units: "Dimensionless (log-ratio / Nepers)",
          meaning: "How much brainwave power in band b at electrode c has risen (+) or fallen (-) at step k relative to this trial's own 3.0 s calm fixation baseline.",
          code: "src/features/eeg_pipeline.py: log_power - self._baseline_log_power"
        },
        {
          sym: "k",
          name: "Discrete Control Step Index",
          units: "Index k ∈ {0, 1, ..., 119} (step Δt = 0.5 s = 64 samples)",
          meaning: "Advances every 0.5 seconds across the 60.0 s stimulus window (120 steps per trial; 153,600 steps across all 1,280 trials).",
          code: "src/features/multimodal_pipeline.py: step_samples = 64 (0.5 s @ 128 Hz)"
        },
        {
          sym: "c , b",
          name: "Electrode Channel c & Frequency Band b",
          units: "c ∈ Montage (32, 6, or 4 ch), b ∈ {θ (4–8 Hz), α (8–12 Hz), β (12–30 Hz), γ (30–45 Hz)}",
          meaning: "Indexes which physical scalp location (in Geneva 10–20 order) and which brainwave rhythm is being integrated.",
          code: "configs/eeg_features.yaml: bands: theta [4,8], alpha [8,12], beta [12,30], gamma [30,45]"
        },
        {
          sym: "P_{k,c,b}",
          name: "Current Past-Only 2.0 s Window Bandpower",
          units: "μV² (microvolts squared)",
          meaning: "One-sided Hamming-tapered rFFT power spectral density integrated over band b using only the past N_W = 256 samples [k - 255, k].",
          code: "src/features/eeg_pipeline.py: psd = (np.abs(rfft_vals) ** 2) / (fs * win_norm)"
        },
        {
          sym: "P_{base,c,b}",
          name: "Pre-Stimulus Fixation Baseline Power",
          units: "μV² (microvolts squared)",
          meaning: "Reference bandpower calibrated strictly on the 3.0 s neutral fixation cross (samples 0:384) before the music video starts—removing skull-thickness and impedance differences across subjects.",
          code: "src/features/eeg_pipeline.py: fit_baseline(trial_eeg[:, :384])"
        },
        {
          sym: "ε = 10⁻¹²",
          name: "Numerical Stability Floor (Epsilon)",
          units: "10⁻¹² μV²",
          meaning: "Prevents ln(0) = -Inf or NaN if an electrode temporarily flatlines or outputs exact zeros.",
          code: "configs/eeg_features.yaml: log_eps: 1.0e-12 (verified in tests/test_numerical_stability.py)"
        }
      ]
    },
    {
      id: "eq2-kalman",
      title: "Phase 2 Equation (§2.4 Blueprint) — 2D State-Space Virtual Subject & Kalman Observer",
      latexDisplay: "x_{k+1} = A x_k + B_act u_k + w_k ,    y_k = C x_k + v_k (v_k ~ N(0, R_k))",
      tokens: [
        {
          sym: "x_k ∈ ℝ²",
          name: "2D Latent Emotional State Vector",
          units: "[Valence_k, Arousal_k]ᵀ",
          meaning: "The hidden continuous emotional state at step k (Δt = 0.5 s) that the Kalman filter estimates and the controller steers.",
          code: "Planned: src/models/state_space.py (2D state vector)"
        },
        {
          sym: "A ∈ ℝ²ˣ²",
          name: "Intrinsic Emotional Dynamics Matrix",
          units: "Dimensionless discrete transition matrix (ρ(A) < 1)",
          meaning: "Captures how fast a participant's Valence and Arousal naturally decay toward baseline and cross-couple from step k to k+1.",
          code: "Planned: src/models/system_id.py (identified per Virtual Subject i = 1..32)"
        },
        {
          sym: "B_act u_k",
          name: "Three-Actuator Control Input Effect",
          units: "B_act ∈ ℝ²ˣ⁵ [LIT-PARAM], u_k ∈ ℝ⁵",
          meaning: "How Parametric Music, Ambient Lighting (180 lx green / 20 lx purple), and Wrist Haptics (40–65 bpm) push Valence and Arousal at step k.",
          code: "Planned: src/models/actuators.py (tagged [LIT-PARAM])"
        },
        {
          sym: "y_k ∈ ℝᴰ",
          name: "Causal Multimodal Feature Vector",
          units: "D = 146 (full_32), 38 (wearable_6), or 29 (wearable_4)",
          meaning: "The exact feature vector produced by Phase 1 every 0.5 s (EEG log-bandpowers + asymmetries + 5 GSR + 6 BVP features), scaled on the training split.",
          code: "src/features/multimodal_pipeline.py -> extract_trial()"
        },
        {
          sym: "R_k (ω_BVP)",
          name: "Adaptive Measurement Noise Covariance",
          units: "D × D covariance matrix",
          meaning: "Quantifies sensor uncertainty at step k. When BVP is in cold start (ω_BVP = 0.1) or an EEG channel drops out, the corresponding diagonal entries of R_k are inflated so the Kalman filter trusts its model + intact sensors.",
          code: "src/features/bvp_pipeline.py emits omega_bvp ∈ {0.1, 1.0}"
        }
      ]
    }
  ],

  // 4. "Follow One 63-Second Trial" Step-by-Step Data Trace
  trialTrace: [
    {
      time: "t = 0.0 s (Sample 0)",
      stage: "1. Raw Read-Only DEAP Load & SHA-256 Check",
      shape: "Raw trial tensor: (40 channels, 8064 samples) @ 128 Hz",
      whatHappens: "DEAPLoader loads s01.dat in read-only mode, verifies its SHA-256 checksum, and restores authoritative SAM [1, 9] Valence & Arousal labels from participant_ratings.xls (fixing any 9.0 - rating Q1 inversion).",
      paperRef: "main.tex §2.1 (L89)"
    },
    {
      time: "t = 0.0 – 3.0 s (Samples 0:384)",
      stage: "2. Pre-Stimulus Fixation Baseline Calibration",
      shape: "Baseline slice: (40 channels, 384 samples)",
      whatHappens: "Participant looks at a neutral fixation cross. Causal filters initialize at steady state z_0 = sosfilt_zi · x[0]. We compute baseline EEG bandpower P_base, ±5σ_base spike-clamping bounds, baseline GSR SCL/SD (ΔS_min = 0.20 σ_base), and baseline BVP HR.",
      paperRef: "main.tex §2.2 (L95–105)"
    },
    {
      time: "t = 3.5 s (Step k = 1, Sample 448)",
      stage: "3. First 0.5 s Control Step & BVP Cold-Start Gate",
      shape: "Chunk: 64 new samples -> Output y_1 ∈ ℝ³⁸ (wearable_6)",
      whatHappens: "64 new samples stream through CausalSOSFilter (< 0.85 ms). EEG buffer has 256 samples (including baseline tail) -> computes Eq. (1) log-bandpowers + FAA/TBR/BAR. BVP buffer has < 2 systolic peaks -> safely falls back to baseline HR and emits ω_BVP = 0.1.",
      paperRef: "main.tex §2.2 (L97–105)"
    },
    {
      time: "t = 8.0 s (Step k = 10, Sample 1024)",
      stage: "4. Zero-Lookahead Causality Verification Point",
      shape: "max_{t ≤ 1024} |Δy_k| = 0.000000",
      whatHappens: "In our audit test, injecting a massive 10^5 μV 20 Hz burst right after sample 1024 has 0.0 effect on steps k <= 10 because no filter or window ever reads past sample k (unlike filtfilt, which leaks 27.60 units backward!).",
      paperRef: "main.tex §2.3 (L109)"
    },
    {
      time: "t = 33.0 s (Step k = 60, Sample 4224)",
      stage: "5. Full 30.0 s Autonomic Buffer & Lomb–Scargle Activation",
      shape: "3,840-sample GSR/BVP FIFO full -> ω_BVP = 1.0",
      whatHappens: "Both 30.0 s autonomic buffers are now full and BVP has >= 10 RR intervals. Lomb–Scargle periodogram activates for uneven heartbeat intervals (LF 0.04–0.15 Hz, HF 0.15–0.40 Hz, LF/HF) and ω_BVP switches from 0.1 to 1.0.",
      paperRef: "main.tex §2.2 (L103–105)"
    },
    {
      time: "t = 33.0 – 63.0 s (Steps k = 60..119)",
      stage: "6. Closed-Loop Kalman State Estimation & 3-Actuator MPC",
      shape: "y_k ∈ ℝ³⁸ → x̂_k ∈ ℝ² → u_k ∈ ℝ⁵ → Next Step",
      whatHappens: "Kalman observer fuses fast EEG (24.42 ms lag) with parallel GSR (SCL 4.86 s lag, SCR 331.98 ms lag) and BVP (111.78 ms lag) to estimate [Valence_k, Arousal_k]ᵀ, and Constrained MPC coordinates Music + Lighting + Haptics within saturation bounds.",
      paperRef: "main.tex §1 (L78–80) & §2.4–§3"
    }
  ],

  // 5. "Professor / Reviewer Defense Q&A" Simulator
  defenseQA: [
    {
      q: "1. 'DEAP was recorded while people passively watched music videos (open-loop). How can you use DEAP to benchmark a closed-loop controller?'",
      shortHook: "Open-Loop Data → Virtual Subject Plant Identification (A, C, Q, R) + Literature-Grounded Actuator Matrix B_act",
      answer: "In biomedical control (like artificial pancreas or automated anesthesia, cited via Azgomi & Faghih 2022), you first identify the patient's internal physiological state-space dynamics (how brain/autonomic features y_k evolve and map to Valence/Arousal x_k: matrices A, C, Q, R) from empirical recordings. Then we pair those data-identified Virtual Subjects [DATA-ID] with literature-parameterized actuator models B_act [LIT-PARAM] from validated human intervention studies (Agres 2023/2025 for music, Li 2025 for lighting, Azevedo 2017 for haptics) and stress-test the closed loop under plant–model mismatch (ΔA, ΔB) so we never commit an inverse crime.",
      evidence: "main.tex §1 (L61, L74) & AGENTS.md Rule 3"
    },
    {
      q: "2. 'Why did you use a 2.0-second window for EEG, but a 30.0-second window for GSR and BVP?'",
      shortHook: "Biophysical Timescale Mismatch: Cortical Oscillations (4–45 Hz) vs. Autonomic Sweat & HRV (0.04–0.40 Hz)",
      answer: "Each window matches the physical frequency of the underlying biology! The lowest EEG frequency is Theta at 4 Hz (0.25 s period), so a 2.0 s window (256 samples) captures 8 full cycles with Δf = 0.5 Hz resolution for fast cortical tracking. By contrast, BVP Low-Frequency (LF) HRV runs from 0.04 to 0.15 Hz—a 0.04 Hz wave has a 25.0-second period! A 2-second window cannot resolve a 25-second heartbeat rhythm or slow tonic sweat drift (< 0.05 Hz). That is why EEG uses 2.0 s and GSR/BVP use 30.0 s, updated on a shared Δt = 0.5 s step grid.",
      evidence: "main.tex §2.2 (L97–105), configs/eeg_features.yaml & peripheral_features.yaml"
    },
    {
      q: "3. 'Why not just subtract the 0.05 Hz lowpass tonic GSR (SCL) from raw GSR to get phasic sweat spikes (SCR)?'",
      shortHook: "The 4.86-Second Group-Delay Trap (621.59 samples @ 128 Hz)",
      answer: "In offline analysis with acausal filtfilt, zero-phase subtraction works because filtfilt peeks into the future to cancel phase lag. In a strictly causal real-time filter, a 2nd-order 0.05 Hz Butterworth lowpass has a measured passband group delay of 621.59 samples = 4,856.15 ms (4.86 s)! Subtracting a 4.86-second-delayed signal from undelayed raw GSR causes severe phase-mismatch gain peaking and fake negative echoes. Running two parallel causal filters (0.05 Hz LP for SCL; 0.05–1.5 Hz BP with 331.98 ms lag for SCR) eliminates this distortion completely.",
      evidence: "main.tex §2.2 (L103) & results/phase1_audit_metrics.json"
    },
    {
      q: "4. 'How do you know for sure that the 40 zeros in DEAP's .dat labels were an inversion bug (9.0 - rating) and not real ratings?'",
      shortHook: "Cross-Audited Against Official participant_ratings.xls to < 10⁻⁶ Precision",
      answer: "First, the Self-Assessment Manikin (SAM) scale in DEAP is strictly [1.0, 9.0]—a rating of 0.00 is physically impossible on the questionnaire. Second, when we aligned the raw metadata spreadsheet `participant_ratings.xls` by `Participant_id` and `Experiment_id`, all 841 non-Quadrant-1 trials matched `.dat['labels']` to 10⁻⁶, and Dominance/Liking matched across all 1,280 trials to 10⁻⁶. Exclusively on the 439 Quadrant-1 trials (Valence > 5 and Arousal > 5), `.dat['labels']` equaled `9.0 - xls_rating` (mapping all 40 ratings of 9.00 to 0.00!).",
      evidence: "main.tex §2.1 (L89), src/data/loader.py & docs/CLAIMS_EVIDENCE_MATRIX.md §5"
    },
    {
      q: "5. 'Why use a linear state-space Kalman Filter + Model Predictive Control (MPC) instead of an end-to-end Deep Neural Network?'",
      shortHook: "Explicit Actuator Safety Bounds (u_min <= u_k <= u_max), Dropout Resilience (R_k), and Interpretability",
      answer: "Three reasons critical for biomedical control: (1) Safety & Comfort Constraints: MPC explicitly enforces hard physical bounds on light illuminance, haptic bpm (40–65 bpm), and smooth slew rates (|Δu_k| <= Δu_max) over a lookahead horizon, whereas unconstrained neural networks can command jarring jumps; (2) Sensor Dropout Handling: When BVP is in cold start (ω_BVP = 0.1) or an EEG electrode disconnects, a Kalman filter mathematically down-weights the missing sensor via R_k without retraining; and (3) Small-Sample Data Efficiency: Fitting 32 individual subjects with 40 trials each favors compact, observable state-space models over data-hungry deep nets.",
      evidence: "main.tex §1 (L61, L78–80) & docs/PHASE_1_AUDIT_REPORT.md"
    },
    {
      q: "6. 'Why did you remove Emognition and use DEAP montage ablations (32-ch vs. 6-ch vs. 4-ch) instead?'",
      shortHook: "Electrode & Hardware Disjointness Audit (Muse 2 AF7/AF8/TP9/TP10 vs. Fz/F3/F4/P4/T7/T8)",
      answer: "During our Phase 0 audit, we verified the primary Saganowski et al. (2022) paper and found that Emognition used a 4-channel Muse 2 headband (`AF7, AF8, TP9, TP10`). It contains zero of the 6 electrodes (`Fz, F3, F4, P4, T7, T8`) required for midline frontal theta (`Fz`), canonical FAA (`F4-F3`), and parietal BAR (`P4`). By performing controlled 32-ch vs. 6-ch vs. 4-ch (`AF3, AF4, T7, T8`) ablations on DEAP, we hold the human subjects, stimuli, and 128 Hz amplifier constant—isolating the exact effect of reducing electrode count!",
      evidence: "main.tex §2.1 (L91) & docs/CLAIMS_EVIDENCE_MATRIX.md (Claim C22)"
    },
    {
      q: "7. 'Why does music alone fail to reach Quadrant 4 (Calm: High Valence, Low Arousal), and how do Light + Haptics fix it?'",
      shortHook: "Breaking the Tempo–Valence Crossover (Agres 2023/2025) with Full-Rank Multi-Actuator Decoupling",
      answer: "Agres et al. (2023, 2025) and Ehrlich et al. (2019) proved that while slowing musical tempo reliably reduces Arousal (R² = 0.86–0.96), listeners perceive slow, low-arousal music as sadder—dragging Valence down (the tempo–valence crossover). By adding 180 lx Green / 20 lx Purple ambient lighting (Li et al. 2025, which elevates subjective valence and frontal alpha asymmetry/theta) and slow 40–65 bpm wrist heartbeat haptics (Azevedo et al. 2017, which reduces sympathetic SCR arousal and anxiety without sad audio), our control input matrix B_act becomes full-rank (rank = 2) in 2D space.",
      evidence: "main.tex §1 Gap 2 (L59)"
    },
    {
      q: "8. 'What happens if a user's EEG cap shifts or BVP loses pulse contact mid-session?'",
      shortHook: "Causal Sample-and-Hold + ±5σ Clamping + ω_BVP = 0.1 Confidence Gating + Kalman R_k Inflation",
      answer: "Our pipeline has 3 layers of defense: (1) At the sample level, `impute_causal_nans` applies sample-and-hold and clamps artifacts to `μ_base ± 5σ_base`; (2) At the feature level, if BVP detects < 2 beats (occurring in 4,070 of 153,600 windows = 2.65%), `CausalBVPPipeline` outputs finite baseline fallbacks and sets `ω_BVP = 0.1`; (3) At the observer level (Phase 2/4), the Kalman filter inflates measurement noise `R_k` for degraded/dropped channels so state estimation smoothly coasts on intact modalities and state-space dynamics.",
      evidence: "main.tex §2.2–§2.3 (L95, L105, L109)"
    }
  ],

  // 6. All 26 Verified Cited Papers in references.bib & main.tex
  citations: [
    {
      key: "russell1980circumplex",
      authors: "Russell, J. A.",
      year: 1980,
      title: "A circumplex model of affect",
      venue: "J. Pers. Soc. Psychol. 39(6):1161–1178",
      doi: "10.1037/h0077714",
      group: "2D Affect & Datasets",
      sampleSize: "Foundational psychometric model",
      proved: "Emotions are organized around a circular 2D space defined by two bipolar orthogonal axes: pleasure–displeasure (valence) and degree of arousal.",
      limitation: "Descriptive psychological map only; does not specify physiological decoders or closed-loop control laws.",
      howWeUseIt: "Defines our 2D continuous state vector x_k = [Valence_k, Arousal_k]^T across all 4 quadrants (main.tex L51)."
    },
    {
      key: "gross1995emotion",
      authors: "Gross, J. J. & Levenson, R. W.",
      year: 1995,
      title: "Emotion elicitation using films",
      venue: "Cogn. Emot. 9(1):87–108",
      doi: "10.1080/02699939508408966",
      group: "The 3 Gaps & Carry-Over",
      sampleSize: "16 standardized emotion-eliciting films",
      proved: "Audio-visual film clips reliably elicit discrete and dimensional emotions, but physiological and affective responses persist after clip offset.",
      limitation: "Open-loop stimulus validation; highlights post-stimulus carry-over.",
      howWeUseIt: "Cited in Gap 1 (main.tex L57) alongside Fernández-Aguilar (2019) to motivate modeling sequential emotional carry-over."
    },
    {
      key: "palfi2024adaptive",
      authors: "Pálfi, K., Major, J., Horváth-Sarródi, A., Deák, A., Fehér, G., & Gács, B.",
      year: 2024,
      title: "Adaptive emotion regulation might prevent burnout in emergency healthcare professionals: an exploratory study",
      venue: "BMC Public Health 24:3136",
      doi: "10.1186/s12889-024-20547-0",
      group: "2D Affect & Datasets",
      sampleSize: "N = 159 emergency department staff",
      proved: "Burnout severity strongly correlates with stress, anxiety, depression, and maladaptive emotion regulation strategies (F(3,155) = 5.855, p < 0.001).",
      limitation: "Questionnaire/clinical study without wearable BCI hardware.",
      howWeUseIt: "Opens §1 Introduction (main.tex L51) to ground the clinical and workplace urgency of emotion regulation."
    },
    {
      key: "wu2023affective",
      authors: "Wu, D., Lu, B.-L., Hu, B., & Zeng, Z.",
      year: 2023,
      title: "Affective Brain–Computer Interfaces (aBCIs): A Tutorial",
      venue: "Proc. IEEE 111(10):1314–1332",
      doi: "10.1109/JPROC.2023.3277471",
      group: "2D Affect & Datasets",
      sampleSize: "Comprehensive IEEE tutorial",
      proved: "Reviews the full aBCI pipeline (signal acquisition, feature extraction, cross-session non-stationarity, and temporal correlation leakage in block splits).",
      limitation: "Focuses primarily on open-loop decoding rather than multi-actuator feedback control.",
      howWeUseIt: "Cited in §1 (main.tex L51, L61) for aBCI decoding progress and cross-session EEG non-stationarity/drift."
    },
    {
      key: "koelstra2012deap",
      authors: "Koelstra, S., Mühl, C., Soleymani, M., Lee, J.-S., Yazdani, A., Ebrahimi, T., Pun, T., Nijholt, A., & Patras, I.",
      year: 2012,
      title: "DEAP: A database for emotion analysis; using physiological signals",
      venue: "IEEE Trans. Affect. Comput. 3(1):18–31",
      doi: "10.1109/T-AFFC.2011.15",
      group: "2D Affect & Datasets",
      sampleSize: "N = 32 participants × 40 1-minute music videos (1,280 trials)",
      proved: "32-ch BioSemi EEG + 8 peripheral signals; single-trial F1 = 0.583 (EEG arousal) / 0.563 (EEG valence) and 0.533 (Periph arousal) / 0.608 (Periph valence), showing complementary multimodal information.",
      limitation: "Modest single-trial accuracy; Python .dat distribution inverted 439 Quadrant-1 labels as (9.0 - rating).",
      howWeUseIt: "Our primary physiological dataset across §1 and §2.1 (N = 32, 128 Hz, 153,600 causal control steps after SAM restoration)."
    },
    {
      key: "saganowski2022emognition",
      authors: "Saganowski, S., Komoszyńska, J., Behnke, M., Perz, B., Kunc, D., Klich, B., Kaczmarek, Ł. D., & Kazienko, P.",
      year: 2022,
      title: "Emognition dataset: emotion recognition with self-reports, facial expressions, and physiology using wearables",
      venue: "Sci. Data 9:158",
      doi: "10.1038/s41597-022-01262-0",
      group: "2D Affect & Datasets",
      sampleSize: "N = 43 participants (Muse 2 + Empatica E4 + Samsung Watch)",
      proved: "Validates wearable affect elicitation using 4-channel Muse 2 (`AF7, AF8, TP9, TP10`) and wrist wearables.",
      limitation: "Muse 2 lacks midline/central/parietal electrodes (`Fz, F3, F4, P4, T7, T8`).",
      howWeUseIt: "Cited in §1 (main.tex L51, L57) as a modern wearable affective benchmark dataset."
    },
    {
      key: "chen2023large",
      authors: "Chen, J., Wang, X., Huang, C., Hu, X., Shen, X., & Zhang, D.",
      year: 2023,
      title: "A large finer-grained affective computing EEG dataset",
      venue: "Sci. Data 10:740",
      doi: "10.1038/s41597-023-02650-w",
      group: "2D Affect & Datasets",
      sampleSize: "N = 123 participants (FACED dataset, 32-ch EEG)",
      proved: "Provides a large-scale 32-channel EEG benchmark across fine-grained emotional video clips.",
      limitation: "EEG-only (no peripheral EDA/BVP) and open-loop.",
      howWeUseIt: "Cited in Gap 1 (main.tex L57) alongside DEAP and Emognition as a benchmark affective dataset."
    },
    {
      key: "zhang2026closed",
      authors: "Zhang, Y., Qian, K., Coyle, D., Dangana, M., & Metcalfe, B.",
      year: 2026,
      title: "Closed-loop EEG-based neurofeedback and brain-computer interface interventions for mental health: a review",
      venue: "Front. Neurosci. 20:1914165",
      doi: "10.3389/fnins.2026.1914165",
      group: "Closed-Loop Music BCIs",
      sampleSize: "Comprehensive mental-health BCI review",
      proved: "Contrasts open-loop recognition with closed-loop EEG interventions; flags small sample sizes (N=5–10) and cross-session EEG non-stationarity.",
      limitation: "Review paper; notes lack of standardized multi-actuator control benchmarks.",
      howWeUseIt: "Cited in §1 (main.tex L51, L61) to motivate closing the loop and addressing small-N pilots and signal drift."
    },
    {
      key: "sayal2025music",
      authors: "Sayal, A., Direito, B., Sousa, T., Singer, N., & Castelo-Branco, M.",
      year: 2025,
      title: "Music in the loop: a systematic review of current neurofeedback methodologies using music",
      venue: "Front. Neurosci. 19:1515377",
      doi: "10.3389/fnins.2025.1515377",
      group: "Closed-Loop Music BCIs",
      sampleSize: "Systematic review of 26 musical neurofeedback studies",
      proved: "Synthesizes closed-loop music neurofeedback protocols and cites the 16%–57% (mean 38%, Alkoby et al. 2018) neurofeedback non-responder rate.",
      limitation: "Shows most protocols rely solely on audio feedback and simple 1D threshold/linear mappings.",
      howWeUseIt: "Cited in §1 (main.tex L51, L53, L59, L61) for music-in-the-loop precedents and the 38% non-responder benchmark."
    },
    {
      key: "ewing2016evaluation",
      authors: "Ewing, K. C., Fairclough, S. H., & Gilleade, K.",
      year: 2016,
      title: "Evaluation of an adaptive game that uses EEG measures validated during the design process as inputs to a biocybernetic loop",
      venue: "Front. Hum. Neurosci. 10:223",
      doi: "10.3389/fnhum.2016.00223",
      group: "The 3 Gaps & Carry-Over",
      sampleSize: "Biocybernetic adaptive Tetris loop",
      proved: "Validated midline frontal theta (Fz) for mental effort and right parietal upper alpha (P4) for cognitive demand in a real-time adaptive loop.",
      limitation: "Regulated game workload/engagement rather than 2D emotional valence–arousal.",
      howWeUseIt: "Justifies including Fz (TBR) and P4 (BAR) in our wearable_6 montage (main.tex L51, L53, L57, L91)."
    },
    {
      key: "lorenz2016automatic",
      authors: "Lorenz, R., Monti, R. P., Violante, I. R., Anagnostopoulos, C., Faisal, A. A., Montana, G., & Leech, R.",
      year: 2016,
      title: "The Automatic Neuroscientist: A framework for optimizing experimental design with closed-loop real-time fMRI",
      venue: "NeuroImage 129:320–334",
      doi: "10.1016/j.neuroimage.2016.01.032",
      group: "Closed-Loop Music BCIs",
      sampleSize: "Closed-loop real-time fMRI framework",
      proved: "Demonstrated that closing the loop between real-time brain state decoding and stimulus selection outperforms static open-loop designs.",
      limitation: "Uses fMRI scanner rather than portable wearable EEG/autonomic sensors.",
      howWeUseIt: "Cited in §1 (main.tex L51, L53) for the paradigm shift from passive monitoring to active closed-loop regulation."
    },
    {
      key: "ramirez2015musical",
      authors: "Ramirez, R., Palencia-Lefler, M., Giraldo, S., & Vamvakousis, Z.",
      year: 2015,
      title: "Musical neurofeedback for treating depression in elderly people",
      venue: "Front. Neurosci. 9:354",
      doi: "10.3389/fnins.2015.00354",
      group: "Closed-Loop Music BCIs",
      sampleSize: "N = 10 elderly pilot (n = 6 pre/post BDI evaluated)",
      proved: "Used prefrontal Emotiv EPOC channels (AF3, AF4, F3, F4) to map beta/alpha ratio to music loudness and FAA (F4-F3) to tempo, observing 17.2% mean BDI improvement.",
      limitation: "Small pilot (N=10/n=6), audio-only actuator, rule-based mapping without state-space MPC.",
      howWeUseIt: "Grounds our FAA (F4-F3) and prefrontalAF3/AF4 wearable channel selection (main.tex L53, L57, L61)."
    },
    {
      key: "daly2016affective",
      authors: "Daly, I., Williams, D., Kirke, A., Weaver, J., Malik, A., Hwang, F., Miranda, E., & Nasuto, S. J.",
      year: 2016,
      title: "Affective brain–computer music interfacing",
      venue: "J. Neural Eng. 13(4):046022",
      doi: "10.1088/1741-2560/13/4/046022",
      group: "Closed-Loop Music BCIs",
      sampleSize: "N = 8 online participants (EEG + ECG + GSR + respiration)",
      proved: "Defined the 4 canonical regulation trajectories (Make Happy, Calm, De-stress, Excite) and succeeded for most users on Make Happy, Calm, and De-stress.",
      limitation: "Monophonic piano feedback failed to raise arousal for most participants during Excite tasks (p. 20).",
      howWeUseIt: "Defines our 4 benchmark trajectories and proves why single-modality piano audio is insufficient (main.tex L53, L59, L80)."
    },
    {
      key: "ehrlich2019closed",
      authors: "Ehrlich, S. K., Agres, K. R., Guan, C., & Cheng, G.",
      year: 2019,
      title: "A closed-loop, music-based brain-computer interface for emotion mediation",
      venue: "PLoS ONE 14(3):e0213516",
      doi: "10.1371/journal.pone.0213516",
      group: "Closed-Loop Music BCIs",
      sampleSize: "n = 11 calibration, n = 5 online closed-loop",
      proved: "Found significant Granger-causal bidirectional interaction between parametric music feedback and right-frontal gamma activity over FC6.",
      limitation: "In the online closed-loop BCI (Eq. 6, p. 8), mapped scalar classifier output s ∈ (0,1) identically to both axes (valence = arousal = s, 1D diagonal), and noted low-arousal music biased valence negative.",
      howWeUseIt: "Key evidence for both Gap 1 (1D diagonal constraint) and Gap 2 (tempo–valence coupling) (main.tex L53, L57, L59)."
    },
    {
      key: "zhang2026mindmelody",
      authors: "Zhang, Y., Sun, Y., Gu, H., & Jin, Z.",
      year: 2026,
      title: "MindMelody: A closed-loop EEG-driven system for personalized music intervention",
      venue: "arXiv:2605.01235v2 (preprint)",
      doi: "arXiv:2605.01235v2",
      group: "Closed-Loop Music BCIs",
      sampleSize: "Deep EEG decoder + LLM music planner",
      proved: "Couples a Transformer–GNN EEG decoder with an LLM planner to adapt generated audio.",
      limitation: "Audio-only actuator; computationally heavy deep/LLM stack without formal state-space stability or multi-actuator decoupling.",
      howWeUseIt: "Cited in §1 (main.tex L53) as a recent deep-learning/LLM closed-loop audio prototype."
    },
    {
      key: "azgomi2022enhancement",
      authors: "Fekri Azgomi, H. & Faghih, R. T.",
      year: 2022,
      title: "Enhancement of closed-loop cognitive stress regulation using supervised control architectures",
      venue: "IEEE OJEMB 3:7–17",
      doi: "10.1109/OJEMB.2022.3143686",
      group: "Control, RL & Ethics",
      sampleSize: "In silico state-space simulation from EDA impulses",
      proved: "Demonstrated that hidden cognitive stress inferred from EDA can be regulated in simulation using LQR, MPC, Fuzzy-LQR, and Fuzzy-Supervised MPC.",
      limitation: "Regulates only a 1D stress/arousal state from a single peripheral modality (EDA), without EEG or 2D Valence–Arousal decoupling.",
      howWeUseIt: "Foundational precedent for our in silico Fuzzy-Supervised MPC & LQR benchmark, extended from 1D EDA to 2D Multimodal VA (main.tex L53, L57, L61, L80)."
    },
    {
      key: "khazaei2024bayesian",
      authors: "Khazaei, S., Amin, M. R., Tahir, M., & Faghih, R. T.",
      year: 2024,
      title: "Bayesian inference of hidden cognitive performance and arousal states in presence of music",
      venue: "IEEE OJEMB 5:627–636",
      doi: "10.1109/OJEMB.2024.3377923",
      group: "The 3 Gaps & Carry-Over",
      sampleSize: "N = 6 participants during n-back + calming/exciting music",
      proved: "Developed Bayesian expectation-maximization (EM) state-space decoders to infer hidden arousal and cognitive performance from EDA and behavioral signals.",
      limitation: "Open-loop state estimation only (did not run closed-loop LQR/MPC control).",
      howWeUseIt: "Supports state-space sympathetic arousal tracking from EDA in §1 (main.tex L53, L57)."
    },
    {
      key: "marin2018affective",
      authors: "Marín-Morales, J., Higuera-Trujillo, J. L., Greco, A., Guixeres, J., Llinares, C., Scilingo, E. P., Alcañiz, M., & Valenza, G.",
      year: 2018,
      title: "Affective computing in virtual reality: emotion recognition from brain and heartbeat dynamics using wearable sensors",
      venue: "Sci. Rep. 8:13657",
      doi: "10.1038/s41598-018-32063-4",
      group: "The 3 Gaps & Carry-Over",
      sampleSize: "Wearable EEG (9 ch) + ECG HRV in VR rooms",
      proved: "Combining 9-ch EEG bandpower/phase coherence (`Fz,F3,F4,Cz,C3,C4,POz,P3,P4`) with HRV achieved 75.00% arousal and 71.21% valence LOSO accuracy across 2D quadrants.",
      limitation: "Open-loop VR recognition without closed-loop actuator control.",
      howWeUseIt: "Supports fusing frontal/parietal EEG with HRV to separate 2D affective quadrants (main.tex L57)."
    },
    {
      key: "fernandez2019effective",
      authors: "Fernández-Aguilar, L., Navarro-Bravo, B., Ricarte, J., Ros, L., & Latorre, J. M.",
      year: 2019,
      title: "How effective are films in inducing positive and negative emotional states? A meta-analysis",
      venue: "PLoS ONE 14(11):e0225040",
      doi: "10.1371/journal.pone.0225040",
      group: "The 3 Gaps & Carry-Over",
      sampleSize: "Meta-analysis of film emotion induction studies",
      proved: "Demonstrates strong asymmetric induction and physiological excitation transfer (carry-over) across sequential film stimuli.",
      limitation: "Meta-analysis of open-loop film induction.",
      howWeUseIt: "Cited in Gap 1 (main.tex L57) to ground physiological excitation transfer and sequential emotional carry-over."
    },
    {
      key: "gutierrez2025affective",
      authors: "Gutierrez Maestro, E., Banaee, H., & Loutfi, A.",
      year: 2025,
      title: "Affective Priming Score: A data-driven method to detect priming in sequential datasets",
      venue: "arXiv:2506.20204v1",
      doi: "arXiv:2506.20204v1",
      group: "The 3 Gaps & Carry-Over",
      sampleSize: "Sequential EEG priming metric (SEED / SEED-VII)",
      proved: "Formulates the Affective Priming Score (APS) on EEG features to quantify how prior emotional states prime and bias subsequent trials.",
      limitation: "Evaluated on SEED/SEED-VII differential entropy rather than closed-loop multimodal state estimation.",
      howWeUseIt: "Inspires our APS-based sequential carry-over transition weighting in the Phase 2 Kalman observer (main.tex L57, L78)."
    },
    {
      key: "agres2023affectmachine",
      authors: "Agres, K. R., Dash, A., & Chua, P.",
      year: 2023,
      title: "AffectMachine-Classical: a novel system for generating affective classical music",
      venue: "Front. Psychol. 14:1158172",
      doi: "10.3389/fpsyg.2023.1158172",
      group: "Lighting & Haptics Actuators",
      sampleSize: "Parametric classical music validation",
      proved: "Achieved R² = 0.96 for arousal and R² = 0.90 for valence, but discovered the Tempo–Valence Crossover: when target V > 0.7 and A < 0.4 (Calm), perceived valence drops significantly.",
      limitation: "Audio-only generator cannot independently hold high valence at very low arousal.",
      howWeUseIt: "Primary quantitative proof of Gap 2 (Tempo–Valence Crossover) and parameters for our Music actuator (main.tex L59, L79)."
    },
    {
      key: "agres2025affectmachine",
      authors: "Agres, K. R., Dash, A., Chua, P., & Ehrlich, S. K.",
      year: 2025,
      title: "AffectMachine-Pop: A controllable expert system for real-time pop music generation",
      venue: "arXiv:2506.08200v1",
      doi: "arXiv:2506.08200v1",
      group: "Lighting & Haptics Actuators",
      sampleSize: "Real-time pop music generator validation",
      proved: "Achieved R² = 0.86 for arousal and R² = 0.93 for valence, confirming the exact same Tempo–Valence Crossover in pop music when target V > 0.8 and A < 0.6.",
      limitation: "Confirms tempo–valence coupling is a fundamental property of music perception across genres.",
      howWeUseIt: "Paired with Agres (2023) to establish the R² = 0.86–0.96 arousal / R² = 0.90–0.93 valence ranges and crossover effect (main.tex L59, L79)."
    },
    {
      key: "li2025designing",
      authors: "Li, X., Wang, R., & Whang, M.",
      year: 2025,
      title: "Designing light for emotion: A neurophysiological approach to modeling affective responses to the interplay of color and illuminance",
      venue: "Biomimetics 10(10):696",
      doi: "10.3390/biomimetics10100696",
      group: "Lighting & Haptics Actuators",
      sampleSize: "N = 33 participants (EEG + subjective SAM across color × illuminance)",
      proved: "Illuminance significantly modulates both valence and arousal (p < 0.001): bright green light at 180 lx yields the highest self-reported valence (M = 3.66, SD = 0.28), while dim purple light at 20 lx elevates EEG FMT (β = +0.589) and FAA (β = +0.049).",
      limitation: "Open-loop lighting study; never combined with music or haptics in a closed-loop controller.",
      howWeUseIt: "Parameterizes our second actuator (Ambient Colored Lighting) to counter the musical valence drop in Quadrant 4 (main.tex L59, L79)."
    },
    {
      key: "azevedo2017calming",
      authors: "Azevedo, R. T., Bennett, N., Bilicki, A., Hooper, J., Markopoulou, F., & Tsakiris, M.",
      year: 2017,
      title: "The calming effect of a new wearable device during the anticipation of public speech",
      venue: "Sci. Rep. 7:2285",
      doi: "10.1038/s41598-017-02274-2",
      group: "Lighting & Haptics Actuators",
      sampleSize: "N = 52 participants under speech-anticipation stress",
      proved: "Wrist-worn heartbeat-like tactile pulses delivered ~20% slower than resting HR (58.2 vs. 75.8 bpm, clamped to 40–65 bpm) significantly reduced skin conductanceNS-SCRs (p = 0.029, g = 0.54) and STAI state anxiety (p = 0.007, g = 0.77) without altering mean HR (p = 0.50).",
      limitation: "Single fixed-rate open-loop intervention; not integrated into a 2D closed-loop controller.",
      howWeUseIt: "Parameterizes our third actuator (Wrist Heartbeat Haptics) to damp sympathetic arousal independently of musical tempo (main.tex L59, L79)."
    },
    {
      key: "pohlmeyer2014using",
      authors: "Pohlmeyer, E. A., Mahmoudi, B., Geng, S., Prins, N. W., & Sanchez, J. C.",
      year: 2014,
      title: "Using Reinforcement Learning to Provide Stable Brain-Machine Interface Control Despite Neural Input Reorganization",
      venue: "PLoS ONE 9(1):e87253",
      doi: "10.1371/journal.pone.0087253",
      group: "Control, RL & Ethics",
      sampleSize: "Closed-loop actor-critic RLBMI under 50% neural input loss",
      proved: "Demonstrated that an actor-critic Reinforcement Learning BMI adapts within 2–4 trials and recovers closed-loop control after sudden 50% loss of neural input channels.",
      limitation: "Motor BMI trajectory task; requires exploration episodes compared to model-based MPC.",
      howWeUseIt: "Grounds our model-free RL controller baseline and EEG channel-dropout stress test in RQ3 (main.tex L61, L80)."
    },
    {
      key: "steinert2020wired",
      authors: "Steinert, S. & Friedrich, O.",
      year: 2020,
      title: "Wired emotions: Ethical issues of affective brain–computer interfaces",
      venue: "Sci. Eng. Ethics 26:351–367",
      doi: "10.1007/s11948-019-00087-2",
      group: "Control, RL & Ethics",
      sampleSize: "Foundational neuroethics analysis of affective BCIs",
      proved: "Identifies core ethical risks of closed-loop affective BCIs: mental privacy, emotional manipulation, loss of user agency/autonomy, and the need for hard safety bounds and user veto control.",
      limitation: "Philosophical/ethical framework requiring engineering implementation.",
      howWeUseIt: "Grounds our actuator saturation bounds, transparent non-responder reporting, and Section 4 ethical safeguards (main.tex L61, L83)."
    }
  ]
};
