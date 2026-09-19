export const mlTranslations = {
  en: {
    appTitle: "ML Mastery Portal",
    badge: "Designed for Students & Engineers",
    subtitle: "Bilingual Machine Learning & Production Deployment Interactive Hub 🚀",
    toggleLang: "తెలుగు",
    audienceToggle: {
      student: "🎓 Student Mode",
      engineer: "🛠️ Engineer Mode",
      studentDesc: "Intuitive analogies, visual interactive labs, and zero-jargon foundations.",
      engineerDesc: "Mathematical formulas, loss functions, scikit-learn pipelines & FastAPI APIs."
    },
    navTabs: [
      { id: "foundations", label: "1. Foundations", icon: "BookOpen" },
      { id: "algorithms", label: "2. Algorithm Lab", icon: "Cpu" },
      { id: "engineering", label: "3. Python & FastAPI", icon: "Terminal" },
      { id: "quiz", label: "4. Knowledge Quiz", icon: "CheckCircle" },
      { id: "glossary", label: "5. ML Glossary", icon: "Layers" }
    ],

    // TAB 1: FOUNDATIONS
    foundations: {
      header: "Machine Learning Fundamentals",
      desc: "Understand how computers learn predictive patterns directly from historical data instead of hardcoded rules.",
      comparisonTitle: "Traditional Programming vs Machine Learning",
      tradTitle: "Traditional Programming (Rule-Based)",
      tradInput: "Data + Explicit Rules",
      tradOutput: "Answers / Output",
      tradExample: "Example: If email contains 'free cash' AND 'click link' -> mark as Spam.",
      tradLimitation: "Problem: Fails when rules become too complex or patterns constantly change.",
      mlTitle: "Machine Learning (Data-Driven)",
      mlInput: "Data + Desired Answers",
      mlOutput: "Learned Model / Rules",
      mlExample: "Example: Feed 100,000 real emails; algorithm learns statistical word probabilities automatically.",
      mlAdvantage: "Advantage: Adapts to new trends, handles subtle nuances, and scales effortlessly.",
      
      corePillarsTitle: "The 3 Core Learning Paradigms",
      pillars: [
        {
          id: "supervised",
          title: "Supervised Learning",
          icon: "Tag",
          tag: "Labeled Data",
          desc: "The model is trained on input-output pairs ($X \\rightarrow y$). Like a student learning with an answer key.",
          studentAnalogy: "Like learning math problems with textbook solutions. You adjust your answers until they match the answer key.",
          engineerDetails: "Includes Regression (continuous $y \\in \\mathbb{R}$) and Classification (discrete $y \\in \\{0, 1\\}$). Target loss minimized via SGD/Adam or closed-form OLS.",
          examples: ["House Price Forecasting", "Medical Diagnosis", "Email Spam Detection"]
        },
        {
          id: "unsupervised",
          title: "Unsupervised Learning",
          icon: "Network",
          tag: "Unlabeled Data",
          desc: "The algorithm explores raw data without predefined answers to discover natural patterns, clusters, and latent representations.",
          studentAnalogy: "Like organizing a messy wardrobe by grouping shirts, pants, and socks by color and texture without being told what they are called.",
          engineerDetails: "Key methods: K-Means (minimizing within-cluster inertia), Hierarchical Clustering, PCA (eigenvector dimensionality reduction), and Autoencoders.",
          examples: ["Customer Segmentation", "Anomaly Detection", "Genomic Pattern Grouping"]
        },
        {
          id: "reinforcement",
          title: "Reinforcement Learning",
          icon: "Trophy",
          tag: "Reward & Penalty",
          desc: "An autonomous agent learns optimal behavioral policies through trial, error, and feedback in a dynamic environment.",
          studentAnalogy: "Like training a puppy: giving treats when it sits correctly, and withholding treats when it misbehaves.",
          engineerDetails: "Formulated as a Markov Decision Process (MDP): $(S, A, P, R, \\gamma)$. Optimizes expected discounted reward using Q-Learning, PPO, or Actor-Critic.",
          examples: ["Autonomous Self-Driving", "Game AI (AlphaGo/Chess)", "Robotic Arm Manipulation"]
        }
      ],

      trainTestTitle: "Dataset Splitting & Overfitting Simulator",
      trainTestDesc: "In real-world ML, we never evaluate a model on the same data it learned from. We split into Train and Test sets.",
      trainLabel: "Train Set",
      testLabel: "Test Set",
      splitRatioLabel: "Train / Test Ratio:",
      overfittingRisk: "Overfitting Risk",
      underfittingRisk: "Underfitting Risk",
      balancedSplit: "Optimal Balanced Generalization (Standard: 80/20)",
      overfitExpl: "Too little test data! Model memorizes training noise and fails on unseen production data.",
      underfitExpl: "Too little training data! Model lacks sufficient sample diversity to discover true signals.",
      balancedExpl: "Healthy split: Sufficient training samples (80%) paired with a robust validation test benchmark (20%)."
    },

    // TAB 2: ALGORITHM LAB
    algorithms: {
      header: "Core ML Algorithms & Interactive Visual Lab",
      desc: "Experiment in real-time with regression slopes, decision boundaries, and ensemble aggregation.",
      
      // Linear Regression Lab
      linearTitle: "1. Linear Regression Playground",
      linearDesc: "Models the relationship between an independent feature $X$ (e.g. Study Hours) and dependent target $y$ (e.g. Exam Score) using a straight line: y = wX + b.",
      slopeLabel: "Slope / Weight (w):",
      biasLabel: "Intercept / Bias (b):",
      mseLabel: "Mean Squared Error (MSE):",
      r2Label: "Goodness of Fit (R²):",
      resetPoints: "Reset Scatter Points",
      addPointHint: "Click anywhere on the graph canvas to add custom student data points!",
      formulaStudent: "Score = (Hours × w) + Base Points",
      formulaEngineer: "Loss = \\frac{1}{N} \\sum_{i=1}^N (y_i - (w x_i + b))^2",

      // Logistic Regression & Sigmoid Lab
      logisticTitle: "2. Logistic Regression & Sigmoid Classification Lab",
      logisticDesc: "Compresses continuous scores $z = wX + b$ through the non-linear Sigmoid activation $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ to yield probabilistic predictions between 0.0 and 1.0.",
      thresholdLabel: "Decision Threshold (τ):",
      probScoreLabel: "Predicted Probability P(Pass):",
      classificationDecision: "Classification Output:",
      bceLossLabel: "Binary Cross-Entropy Loss:",
      formulaStudentLog: "Probability = 1 / (1 + e^-(Hours × w + b))",
      formulaEngineerLog: "\\mathcal{L}_{BCE} = - \\frac{1}{N} \\sum [y \\ln \\hat{y} + (1 - y) \\ln(1 - \\hat{y})]",
      thresholdIntuition: "Adjusting the threshold τ controls sensitivity: setting τ=0.4 is lenient (reduces False Negatives), while τ=0.7 is strict (reduces False Positives).",

      // K-Means Clustering Lab
      kmeansTitle: "3. K-Means Clustering & Elbow Method Simulator",
      kmeansDesc: "An unsupervised algorithm grouping unlabelled student profiles by study hours and practice exams, minimizing within-cluster inertia.",
      kSliderLabel: "Number of Clusters (k):",
      stepCentroidBtn: "Step Centroids (Run 1 Iteration)",
      resetClustersBtn: "Reset Centroids",
      inertiaLabel: "Inertia (Within-Cluster Sum of Squares):",
      elbowTitle: "Elbow Method Curve (Optimal k Detection)",
      elbowDesc: "The 'Elbow' at k=3 reveals optimal clustering where further clusters produce diminishing returns in variance reduction.",
      clusterA: "Cluster 1: Intensive Achievers",
      clusterB: "Cluster 2: Consistent Learners",
      clusterC: "Cluster 3: Foundational Support",
      clusterD: "Cluster 4: High-Velocity Preppers",
      
      // Decision Tree & Random Forest
      treeTitle: "4. Decision Tree & Random Forest Ensemble",
      treeDesc: "Decision trees partition feature space using hierarchical if-else decision nodes. Random Forest combines many diverse trees to eliminate overfitting.",
      treeCardTitle: "Single Decision Tree",
      treeCardPoints: [
        "Intuitive flowchart of binary questions (e.g., Study Hours > 5?)",
        "Calculates Gini Impurity or Information Gain to select optimal splits",
        "High variance: Highly susceptible to overfitting noisy samples"
      ],
      forestCardTitle: "Random Forest Ensemble (Bagging)",
      forestCardPoints: [
        "Constructs an ensemble of B independent bootstrap trees",
        "Injects randomness via feature subsampling (mtry = sqrt(p))",
        "Aggregates predictions by majority voting or continuous averaging"
      ],
      interactiveVoteTitle: "Interactive Forest Voting Simulator",
      votePrompt: "Test Sample: [Study Hours = 6.5, Attendance = 92%]",
      runVoteBtn: "Run Ensemble Prediction",
      voteResult: "Ensemble Decision:",
      confidence: "Confidence:",

      // Workflow
      workflowTitle: "5. The End-to-End Production ML Workflow",
      steps: [
        { num: "01", name: "Data Ingestion", desc: "Collecting tabular logs, database records, and streaming telemetry." },
        { num: "02", name: "EDA & Preprocessing", desc: "Handling null values, feature scaling (StandardScaler), and encoding." },
        { num: "03", name: "Model Training", desc: "Training scikit-learn estimators with 5-fold Cross-Validation." },
        { num: "04", name: "Hyperparameter Tuning", desc: "GridSearchCV / Optuna optimization for max_depth & estimators." },
        { num: "05", name: "Evaluation & Testing", desc: "Checking ROC-AUC, Precision, Recall, and Confusion Matrix." },
        { num: "06", name: "API Deployment", desc: "Serving via FastAPI with Pydantic validation inside Docker." }
      ]
    },

    // TAB 3: ENGINEERING
    engineering: {
      header: "Production Python & FastAPI Deployment",
      desc: "Bridge the gap between experimental Jupyter Notebooks and high-throughput production inference APIs.",
      
      apiTesterTitle: "Interactive Live FastAPI Testbench",
      apiTesterDesc: "Simulate a live REST POST request to an asynchronous FastAPI inference service.",
      endpoint: "POST /api/v1/predict-performance",
      feature1: "Hours Studied (0 - 15 hrs):",
      feature2: "Attendance Percentage (0 - 100%):",
      feature3: "Practice Exams Completed (0 - 10):",
      sendReqBtn: "Send Inference Request",
      sending: "Executing Inference...",
      responseHeader: "HTTP 200 OK — Model Response JSON",
      latencyLabel: "Inference Latency:",
      modelMeta: "Model: RandomForestClassifier (n_estimators=100, joblib)",
      
      codeTabs: {
        train: "1. train_model.py (MLflow Tracking)",
        logger: "2. logger.py (Structured JSON)",
        api: "3. main.py (FastAPI + Pydantic v2)",
        docker: "4. Dockerfile (Multi-Stage)",
        req: "5. requirements.txt"
      },
      mlflowBadge: "MLflow Registry: Registered as 'StudentPerformanceClassifier' • Run Active",
      logStreamTitle: "Production Structured JSON Log Stream",
      logStreamDesc: "Real-time structured JSON telemetry captured with correlation ID, latency, and sanitized feature payloads.",
      copyBtn: "Copy Code",
      copied: "Copied!",

      architectureTitle: "Production MLOps Serving Architecture",
      archSteps: [
        { title: "Client Application", desc: "Web browser, Mobile app, or Microservice sending JSON payloads." },
        { title: "FastAPI Gateway", desc: "Async ASGI server validating inputs using Pydantic data schemas." },
        { title: "Serialized Model", desc: "Pre-compiled Scikit-learn Pipeline loaded once into memory via joblib." },
        { title: "Monitoring & Drift", desc: "Tracking latency, prediction distributions, and concept drift metrics." }
      ]
    },

    // TAB 4: QUIZ
    quiz: {
      header: "Interactive ML Knowledge Evaluation",
      desc: "Test your understanding of algorithms, workflow pipelines, and deployment practices.",
      scoreLabel: "Your Score:",
      questionOf: "Question",
      nextBtn: "Next Question",
      prevBtn: "Previous",
      restartBtn: "Retake Quiz",
      congratsTitle: "Outstanding Performance! 🏆",
      congratsDesc: "You have demonstrated mastery over foundational machine learning concepts and production engineering workflows!",
      feedbackCorrect: "Correct! Excellent grasp of the concept.",
      feedbackIncorrect: "Incorrect. Check the explanation below to reinforce your understanding.",
      questions: [
        {
          id: 1,
          q: "What is the primary difference between Supervised and Unsupervised Learning?",
          options: [
            "Supervised learning requires human supervision while running, unsupervised runs overnight.",
            "Supervised learning trains on labeled data (inputs paired with known targets), whereas unsupervised learning finds patterns in unlabeled data.",
            "Supervised learning can only run on GPUs, whereas unsupervised learning runs on CPUs.",
            "There is no difference; they are interchangeable terms."
          ],
          correct: 1,
          expl: "Supervised learning utilizes labeled datasets where ground truth targets ($y$) guide parameter convergence. Unsupervised learning discovers latent clustering or structure without target labels."
        },
        {
          id: 2,
          q: "Why do we evaluate machine learning models on an independent Test dataset rather than the Training set?",
          options: [
            "To save memory on the computer during training.",
            "Because training data is deleted automatically after model fit is called.",
            "To accurately measure generalization capability on unseen real-world data and detect overfitting.",
            "Because scikit-learn throws an error if test data is omitted."
          ],
          correct: 2,
          expl: "Evaluating on training data gives an artificially optimistic score because complex models can easily memorize training noise. Testing on unseen data measures true generalization."
        },
        {
          id: 3,
          q: "Which technique is fundamentally employed by Random Forest to improve upon single Decision Trees?",
          options: [
            "Bagging (Bootstrap Aggregation) combining multiple diverse trees trained on subsampled data to reduce variance.",
            "Running gradient descent directly on individual decision tree nodes.",
            "Deleting random branches every 5 seconds to reduce model file size.",
            "Converting all continuous features into binary 0/1 booleans."
          ],
          correct: 0,
          expl: "Random Forest combines bootstrap sampling of training instances with random feature selection across multiple trees, averaging out individual errors and significantly reducing variance."
        },
        {
          id: 4,
          q: "When deploying a scikit-learn model with FastAPI, what is the best practice for loading the trained model file (`model.pkl`)?",
          options: [
            "Read and load `model.pkl` inside each individual HTTP request handler function.",
            "Load `model.pkl` once at application startup into memory so all subsequent requests share the pre-loaded estimator.",
            "Re-train the model from scratch on every incoming POST request.",
            "Store the model inside an external HTML file."
          ],
          correct: 1,
          expl: "Loading the model once during application lifecycle startup prevents severe disk I/O bottlenecks and keeps per-request inference latency under a few milliseconds."
        },
        {
          id: 5,
          q: "What metric is most suitable for evaluating a regression model predicting continuous house prices?",
          options: [
            "Accuracy score (percentage correct)",
            "Confusion Matrix and ROC-AUC",
            "Mean Squared Error (MSE) or Root Mean Squared Error (RMSE)",
            "Precision and Recall"
          ],
          correct: 2,
          expl: "Continuous targets require numerical distance metrics like MSE, RMSE, or MAE. Accuracy and Confusion Matrices are designated for discrete classification problems."
        }
      ]
    },

    // TAB 5: GLOSSARY
    glossary: {
      header: "Bilingual Machine Learning Glossary & Cheat Sheet",
      desc: "Fast lookup of essential terms for students preparing for exams and engineers preparing for systems design interviews.",
      searchPlaceholder: "Search ML concepts (e.g. Overfitting, Hyperparameter, FastAPI, MSE)...",
      studentView: "Student Explanation",
      engineerView: "Engineering Rigor",
      terms: [
        {
          term: "Overfitting (ఓవర్‌ఫిట్టింగ్)",
          category: "Model Generalization",
          student: "Like a student who memorizes textbook questions word-for-word but fails exams when the questions are slightly rephrased.",
          engineer: "Model learns training noise along with signal: Low Train Loss, High Validation Loss. Mitigated by regularizers (L1/L2), pruning, dropout, and early stopping."
        },
        {
          term: "Underfitting (అండర్‌ఫిట్టింగ్)",
          category: "Model Generalization",
          student: "Like trying to solve complex calculus problems using only primary school addition; the model is too simple to capture patterns.",
          engineer: "High bias: Model exhibits high error on both training and validation sets. Solution: Increase model capacity, engineer richer features, or decrease regularization."
        },
        {
          term: "Hyperparameter (హైపర్‌పారామీటర్)",
          category: "Model Architecture",
          student: "The external tuning dials you set before the machine starts learning (like selecting baking temperature before baking a cake).",
          engineer: "Configurations external to the model not updated during backpropagation/optimization (e.g., learning rate $\\eta$, tree depth, batch size, number of estimators)."
        },
        {
          term: "Mean Squared Error (MSE)",
          category: "Loss Functions",
          student: "The average squared penalty for mistakes. Large errors are penalized much more heavily than small errors.",
          engineer: "$\\text{MSE} = \\frac{1}{N} \\sum (y_i - \\hat{y}_i)^2$. Convex and differentiable loss function widely used in Ordinary Least Squares regression."
        },
        {
          term: "FastAPI (ఫాస్ట్‌ఏపీఐ)",
          category: "Deployment & MLOps",
          student: "A modern Python tool that acts like a super-fast digital waiter, taking inputs from web users and delivering answers from your ML model.",
          engineer: "High-performance Python ASGI web framework built on Starlette and Pydantic with native async support, automatic OpenAPI documentation, and typing validation."
        },
        {
          term: "Feature Engineering (ఫీచర్ ఇంజనీరింగ్)",
          category: "Data Processing",
          student: "Creating smart clues from raw data that help the computer learn much faster and more accurately.",
          engineer: "Transforming raw signals into informative numerical representations via scaling (StandardScaler), one-hot encoding, target encoding, polynomial interactions, or embeddings."
        }
      ]
    },

    auth: {
      modalTitleSignIn: "Welcome Back to AI Odyssey",
      modalSubtitleSignIn: "Sign in to access personalized learning labs, bookmarks, and saved model checkpoints.",
      modalTitleSignUp: "Create Your AI Odyssey Account",
      modalSubtitleSignUp: "Join Siliconbrainsai's interactive bilingual machine learning explorer platform.",
      tabSignIn: "Sign In",
      tabSignUp: "Sign Up",
      trackLabel: "Select Your Learning Track:",
      trackStudentTitle: "🎓 Student Mode",
      trackStudentSubtitle: "Intuitive analogies, visual sliders, zero-jargon fundamentals",
      trackEngineerTitle: "🛠️ Engineer Mode",
      trackEngineerSubtitle: "Math rigor, scikit-learn code, loss functions, FastAPI microservices",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "e.g. Srikanth Varma",
      emailLabel: "Corporate / Academic Email",
      emailPlaceholder: "analyst@siliconbrain.ai",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••••••",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "••••••••••••",
      strengthWeak: "Weak password (add 8+ chars, numbers, symbols)",
      strengthMedium: "Good password",
      strengthStrong: "Strong & secure password",
      rememberMe: "Remember my session",
      forgotPassword: "Forgot password?",
      btnSignIn: "Sign In to Portal",
      btnSignUp: "Register Account",
      orDivider: "OR QUICK ACCESS",
      quickFillAnalyst: "⚡ Autofill Operational Analyst Credentials",
      analystHint: "analyst@siliconbrain.ai (Senior ML Analyst • Engineer Track)",
      guestExploreBtn: "🚀 Quick Guest Explore (No Login Needed)",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      signInLink: "Sign in here",
      signUpLink: "Register now",
      logout: "Sign Out",
      roleAnalyst: "Senior ML Analyst",
      roleStudent: "Student Explorer",
      roleEngineer: "MLOps Engineer",
      guestUser: "Guest Explorer",
      loginSuccess: "Signed in successfully!",
      registerSuccess: "Account registered successfully!",
      logoutSuccess: "You have been logged out.",
      invalidCreds: "Invalid email or password. Please try again.",
      passwordMismatch: "Passwords do not match.",
      requiredField: "Please fill in all required fields."
    },

    landing: {
      brand: "SILICONBRAIN AI",
      tagline: "DEFENSE & GEOSPATIAL LABS • SECURE PORTAL",
      engineStatus: "ML EXPLORER ENGINE STATUS: V.2.0",
      statusOnline: "ONLINE",
      heroTitle: "AI ODYSSEY: MACHINE LEARNING EXPLORER",
      heroSubtitle: "AI-Powered Interactive Learning & Production Studio by SiliconBrain AI",
      heroDesc: "Master machine learning concepts through intuitive visual examples and professional production engineering workflows.",
      selectTrackTitle: "TARGET AUDIENCE TRACK",
      modulesHeading: "CORE EXPLORATION MODULES",
      moduleFoundations: "1. Foundations",
      moduleFoundationsDesc: "Rule-Based vs ML • 3 Pillars • Data Splitting Simulator",
      moduleAlgorithms: "2. Algorithm Lab",
      moduleAlgorithmsDesc: "Linear & Logistic Regression • K-Means • Random Forest",
      moduleEngineering: "3. Python & FastAPI",
      moduleEngineeringDesc: "MLflow Tracking • Containerization • Live Inference Testbench",
      moduleQuiz: "4. Knowledge Quiz",
      moduleQuizDesc: "Bilingual interactive assessment with instant explanations",
      moduleGlossary: "5. ML Glossary",
      moduleGlossaryDesc: "Student analogies vs engineering mathematical definitions",
      
      // Monitor & Telemetry
      monitorHeader: "LIVE ML MODEL TRAINING MONITOR",
      monitorSubtitle: "Telemetry: ai-odyssey-student-classifier • Active Run #104",
      metricLoss: "Training Loss",
      metricAcc: "Val Accuracy",
      metricEpoch: "Epoch Progress",
      metricLatency: "Batch Latency",
      coreStatus: "NEURON CORE ACTIVE",
      throughputText: "1,280 infer/sec • P99: 1.4ms",
      
      // Quick access chips
      quickAccessTitle: "QUICK ACCESS TOPICS // INTERACTIVE DIRECT JUMP",
      chipLinReg: "Linear Regression Playground",
      chipFastAPI: "FastAPI ASGI Inference",
      chipKMeans: "K-Means & Elbow Method",
      chipRandomForest: "Random Forest Ensembles",
      chipQuiz: "Knowledge Assessment Quiz",
      
      // Auth Card (Access Command Nexus)
      authCardBadge: "SECURE ACCESS PROTOCOL // LEVEL-4",
      authCardTitle: "ACCESS COMMAND NEXUS",
      authCardSubtitle: "Authorize operator identity or initialize guest sandbox.",
      ssoGithub: "GitHub Repo",
      ssoGoogle: "Google SSO",
      orAuth: "OR AUTHORIZE WITH CREDENTIALS",
      idLabel: "Operator ID / Corporate Email",
      passLabel: "Access Key / Token",
      rememberSession: "Remember active session",
      forgotToken: "Forgot Key?",
      btnInitSession: "INITIALIZE ML EXPLORER SESSION",
      btnStudentStart: "LAUNCH STUDENT EXPLORER",
      btnEngineerStart: "LAUNCH PRODUCTION STUDIO",
      autofillAnalyst: "⚡ Autofill Operational Analyst (analyst@siliconbrain.ai)",
      quickGuestExplore: "🚀 Instant Guest Access (No Credentials Required)",
      enterLabDirectly: "Open Full Interactive Lab",
      authFooter: "SiliconBrain AI • Defense & Enterprise Machine Learning Studio • All telemetry encrypted & audited"
    },

    security: {
      restrictedBadge: "ACCESS CONTROL // LEVEL-4 CLASSIFIED",
      restrictedTitle: "Access Restricted: Corporate Operator ID Required",
      restrictedDesc: "The AI Odyssey Machine Learning Laboratory and internal execution modules are restricted to authorized SiliconBrain AI personnel. Only verified corporate accounts ending in @siliconbrain.ai are granted operational clearance.",
      policyNote: "Security Directive: Public registrations, external domains (@gmail, @yahoo, etc.), and unverified direct links are strictly blocked under corporate compliance standards.",
      authorizedDomainOnly: "Corporate Domain Whitelist Enforced: *@siliconbrain.ai",
      btnAutofillAuthorized: "Authenticate as Authorized Analyst (analyst@siliconbrain.ai)",
      btnReturnToNexus: "Return to Command Nexus",
      unauthorizedDomainError: "Access Restricted: Only @siliconbrain.ai accounts are authorized.",
      statusBlocked: "BLOCKED // 403 FORBIDDEN"
    },

    footer: {
      text: "Designed for Students & Engineers • Bilingual ML Learning Interactive Portal",
      rights: "Built with React, Vite & Tailwind CSS • Production Ready",
      techBadge: "Bilingual (English / తెలుగు)"
    }
  },

  te: {
    appTitle: "ఎంఎల్ మాస్టరీ పోర్టల్",
    badge: "విద్యార్థులు & ఇంజనీర్ల కోసం ప్రత్యేక రూపకల్పన",
    subtitle: "ద్విభాషా మెషిన్ లెర్నింగ్ & ప్రొడక్షన్ డిప్లాయ్‌మెంట్ ఇంటరాక్టివ్ హబ్ 🚀",
    toggleLang: "English",
    audienceToggle: {
      student: "🎓 విద్యార్థి మోడ్",
      engineer: "🛠️ ఇంజనీర్ మోడ్",
      studentDesc: "సులభమైన ఉదాహరణలు, ఇంటరాక్టివ్ ల్యాబ్స్ మరియు స్పష్టమైన ప్రాథమిక అంశాలు.",
      engineerDesc: "గణిత సూత్రాలు, లాస్ ఫంక్షన్స్, scikit-learn కోడ్ మరియు FastAPI డిప్లాయ్‌మెంట్."
    },
    navTabs: [
      { id: "foundations", label: "1. ప్రాథమిక అంశాలు", icon: "BookOpen" },
      { id: "algorithms", label: "2. అల్గారిథమ్ ల్యాబ్", icon: "Cpu" },
      { id: "engineering", label: "3. పైథాన్ & FastAPI", icon: "Terminal" },
      { id: "quiz", label: "4. జ్ఞాన పరిశీలన క్విజ్", icon: "CheckCircle" },
      { id: "glossary", label: "5. ML శబ్దకోశం", icon: "Layers" }
    ],

    // TAB 1: FOUNDATIONS
    foundations: {
      header: "మెషిన్ లెర్నింగ్ ప్రాథమిక భావనలు",
      desc: "కంప్యూటర్లు స్వయంగా రూల్స్ రాయకుండా డేటా నుండి స్వయంగా నేర్చుకుని భవిష్యత్తును ఎలా అంచనా వేస్తాయో తెలుసుకోండి.",
      comparisonTitle: "సాంప్రదాయ ప్రోగ్రామింగ్ vs మెషిన్ లెర్నింగ్",
      tradTitle: "సాంప్రదాయ ప్రోగ్రామింగ్ (రూల్-బేస్డ్)",
      tradInput: "డేటా + స్పష్టమైన నియమాలు (Rules)",
      tradOutput: "సమాధానాలు / ఫలితం (Output)",
      tradExample: "ఉదాహరణ: ఈమెయిల్‌లో 'free cash' మరియు 'click link' ఉంటే -> స్పామ్ అని మార్క్ చేయి.",
      tradLimitation: "సమస్య: నియమాలు చాలా సంక్లిష్టమైనప్పుడు లేదా మార్పులు జరిగినప్పుడు ఈ విధానం విఫలమవుతుంది.",
      mlTitle: "మెషిన్ లెర్నింగ్ (డేటా-డ్రైవెన్)",
      mlInput: "డేటా + గతంలో వచ్చిన సమాధానాలు",
      mlOutput: "శిక్షణ పొందిన మోడల్ / స్వయం నియమాలు",
      mlExample: "ఉదాహరణ: 1,00,000 ఈమెయిల్స్ ఇస్తే, కంప్యూటర్ స్వయంగా ఏ పదాలు స్పామో శాతాల ఆధారంగా నేర్చుకుంటుంది.",
      mlAdvantage: "ప్రయోజనం: కొత్త నమూనాలకు సులభంగా అలవాటుపడుతుంది మరియు భారీ డేటాను హ్యాండిల్ చేయగలదు.",

      corePillarsTitle: "ప్రధాన 3 లెర్నింగ్ రకాలు (Pillars)",
      pillars: [
        {
          id: "supervised",
          title: "సూపర్వైజ్డ్ లెర్నింగ్ (Supervised)",
          icon: "Tag",
          tag: "లేబుల్డ్ డేటా",
          desc: "ఇన్‌పుట్ మరియు సరైన సమాధానం రెండూ ఉన్న డేటాతో మోడల్‌కు శిక్షణ ఇవ్వడం ($X \\rightarrow y$). ఉపాధ్యాయుడి పర్యవేక్షణలో నేర్చుకోవడం లాంటిది.",
          studentAnalogy: "గైడ్ లేదా ఆన్సర్ షీట్ చూస్తూ లెక్కలు చేయడం లాంటిది. తప్పులు సరిదిద్దుకుంటూ సరైన ఆన్సర్ వచ్చేలా ప్రాక్టీస్ చేయడం.",
          engineerDetails: "రిగ్రెషన్ (కంటిన్యూయస్ నంబర్స్) మరియు క్లాసిఫికేషన్ (డిస్క్రీట్ గ్రూప్స్) ఇందులో భాగం. SGD/Adam లేదా OLS ద్వారా లాస్ తగ్గిస్తారు.",
          examples: ["ఇంటి ధరల అంచనా", "వ్యాధి నిర్ధారణ", "స్పామ్ మెయిల్స్ గుర్తింపు"]
        },
        {
          id: "unsupervised",
          title: "అన్-సూపర్వైజ్డ్ లెర్నింగ్ (Unsupervised)",
          icon: "Network",
          tag: "లేబుల్ లేని డేటా",
          desc: "ముందస్తు సమాధానాలు లేని డేటా నుండి దాగి ఉన్న సహజమైన క్లస్టర్లు మరియు నమూనాలను అల్గారిథమ్ స్వయంగా కనుగొంటుంది.",
          studentAnalogy: "ఒక గదిలోని దుస్తులను వాటి రంగు, రకం ప్రకారం ఎవరూ చెప్పకుండానే వేర్వేరు సమూహాలుగా సర్దుకోవడం లాంటిది.",
          engineerDetails: "కీలక పద్ధతులు: K-Means (ఇనర్షియా కనిష్టం చేయడం), PCA (డైమెన్షనాలిటీ తగ్గింపు), ఆటోఎన్‌కోడర్స్.",
          examples: ["కస్టమర్ సెగ్మెంటేషన్", "మోసాలను గుర్తించడం (Anomaly)", "జీన్ ప్యాటర్న్స్ సమూహం"]
        },
        {
          id: "reinforcement",
          title: "రీన్‌ఫోర్స్‌మెంట్ లెర్నింగ్ (Reinforcement)",
          icon: "Trophy",
          tag: "రివార్డు & పెనాల్టీ",
          desc: "ఒక ఏజెంట్ తన తప్పుల ద్వారా, వచ్చే బహుమతులు (రివార్డులు) మరియు శిక్షల (పెనాల్టీలు) ద్వారా స్వయంగా అత్యుత్తమ నిర్ణయాలు తీసుకోవడం నేర్చుకుంటుంది.",
          studentAnalogy: "చిన్నపిల్లవాడు సైకిల్ తొక్కడం నేర్చుకున్నట్లు: పడిపోతే జాగ్రత్త పడటం, సరిగ్గా తొక్కితే సంతోషపడటం.",
          engineerDetails: "మార్కోవ్ డెసిషన్ ప్రాసెస్ (MDP) ఆధారంగా పనిచేస్తుంది. Q-Learning లేదా PPO ద్వారా ఎక్స్‌పెక్టెడ్ రివార్డ్ గరిష్టం చేయబడుతుంది.",
          examples: ["స్వయం చాలక కార్లు (Self-driving)", "గేమ్స్ (చెస్, ఆల్ఫాగో)", "రోబోటిక్స్"]
        }
      ],

      trainTestTitle: "డేటా విభజన & ఓవర్‌ఫిట్టింగ్ సిమ్యులేటర్",
      trainTestDesc: "మెషిన్ లెర్నింగ్‌లో మోడల్ నేర్చుకున్న డేటా మీదే దాని పనితీరును పరీక్షించకూడదు. అందుకే డేటాను ట్రైనింగ్ మరియు టెస్టింగ్ సెట్లుగా విభజిస్తాం.",
      trainLabel: "ట్రైనింగ్ సెట్",
      testLabel: "టెస్టింగ్ సెట్",
      splitRatioLabel: "ట్రైనింగ్ / టెస్టింగ్ నిష్పత్తి:",
      overfittingRisk: "ఓవర్‌ఫిట్టింగ్ ప్రమాదం",
      underfittingRisk: "అండర్‌ఫిట్టింగ్ ప్రమాదం",
      balancedSplit: "సమతుల్య జనరలైజేషన్ (ప్రామాణికం: 80/20)",
      overfitExpl: "టెస్ట్ డేటా చాలా తక్కువగా ఉంది! మోడల్ ట్రైనింగ్ డేటాను బట్టీ పట్టి కొత్త రియల్-వరల్డ్ డేటాలో విఫలమయ్యే ప్రమాదం ఉంది.",
      underfitExpl: "ట్రైనింగ్ డేటా సరిపోవడం లేదు! సరైన నమూనాలను నేర్చుకోవడానికి తగినంత డేటా లేకపోవడం వల్ల అండర్‌ఫిట్టింగ్ వస్తుంది.",
      balancedExpl: "ఆదర్శవంతమైన విభజన: నేర్చుకోవడానికి 80% డేటా, సరిగ్గా పరీక్షించడానికి 20% కొత్త డేటా."
    },

    // TAB 2: ALGORITHM LAB
    algorithms: {
      header: "ముఖ్యమైన అల్గారిథమ్స్ & ఇంటరాక్టివ్ విజువల్ ల్యాబ్",
      desc: "రిగ్రెషన్ రేఖలు, డెసిషన్ బౌండరీలు మరియు ఎన్‌సెంబుల్ ఓటింగ్‌ను లైవ్‌గా పరీక్షించండి.",

      // Linear Regression Lab
      linearTitle: "1. లీనియర్ రిగ్రెషన్ ప్లేగ్రౌండ్ (Linear Regression)",
      linearDesc: "ఇన్‌పుట్ ఫీచర్ $X$ (ఉదా: చదివిన గంటలు) మరియు ఫలితం $y$ (ఉదా: పరీక్ష మార్కులు) మధ్య సరళరేఖా సంబంధాన్ని ఏర్పరుస్తుంది: y = wX + b.",
      slopeLabel: "వాలు / వెయిట్ (w):",
      biasLabel: "ఇంటర్‌సెప్ట్ / బయాస్ (b):",
      mseLabel: "మీన్ స్క్వేర్డ్ ఎర్రర్ (MSE):",
      r2Label: "సరిపోయే గుణకం (R² స్కోరు):",
      resetPoints: "పాయింట్లను రీసెట్ చేయండి",
      addPointHint: "గ్రాఫ్ కాన్వాస్‌పై ఎక్కడైనా క్లిక్ చేసి విద్యార్థుల కొత్త డేటా పాయింట్లను జోడించండి!",
      formulaStudent: "మార్కులు = (చదివిన గంటలు × w) + కనీస మార్కులు (b)",
      formulaEngineer: "లాస్ సూత్రం: MSE = \\frac{1}{N} \\sum (y_i - (w x_i + b))^2",

      // Logistic Regression & Sigmoid Lab
      logisticTitle: "2. లాజిస్టిక్ రిగ్రెషన్ & సిగ్మోయిడ్ క్లాసిఫికేషన్ ల్యాబ్",
      logisticDesc: "నిరంతర స్కోర్లను నాన్-లీనియర్ సిగ్మోయిడ్ కర్వ్ ద్వారా 0.0 నుండి 1.0 మధ్య సంభావ్యతగా (Probability) మార్చి బైనరీ వర్గీకరణ నిర్ణయాన్ని అందిస్తుంది.",
      thresholdLabel: "నిర్ణయ థ్రెషోల్డ్ (Threshold τ):",
      probScoreLabel: "గణించిన సంభావ్యత P(ఉత్తీర్ణత):",
      classificationDecision: "వర్గీకరణ నిర్ణయం:",
      bceLossLabel: "బైనరీ క్రాస్-ఎంట్రోపీ లాస్:",
      formulaStudentLog: "సంభావ్యత = 1 / (1 + e^-(చదివిన గంటలు × w + b))",
      formulaEngineerLog: "\\mathcal{L}_{BCE} = - \\frac{1}{N} \\sum [y \\ln \\hat{y} + (1 - y) \\ln(1 - \\hat{y})]",
      thresholdIntuition: "థ్రెషోల్డ్ మార్చడం ద్వారా మోడల్ ఎంత సున్నితంగా పాస్/ఫెయిల్ నిర్ణయం తీసుకోవాలో నిర్ణయించవచ్చు. τ=0.4 పెడితే ఎక్కువ మందిని సులభంగా పాస్ చేస్తుంది, τ=0.7 పెడితే ఖచ్చితత్వం అవసరం.",

      // K-Means Clustering Lab
      kmeansTitle: "3. K-మీన్స్ క్లస్టరింగ్ & ఎల్బో మెథడ్ సిమ్యులేటర్",
      kmeansDesc: "ముందస్తు లేబుల్స్ లేని విద్యార్థుల అధ్యయన నమూనాలను ఇనర్షియా కనిష్టం చేస్తూ k సహజ సమూహాలుగా (Clusters) వర్గీకరించే అన్-సూపర్వైజ్డ్ అల్గారిథమ్.",
      kSliderLabel: "క్లస్టర్ల సంఖ్య (k):",
      stepCentroidBtn: "సెంట్రాయిడ్లను కదిలించండి (Run 1 Iteration)",
      resetClustersBtn: "సెంట్రాయిడ్లను రీసెట్ చేయండి",
      inertiaLabel: "ఇనర్షియా (వితిన్-క్లస్టర్ సమ్ ఆఫ్ స్క్వేర్స్ - WCSS):",
      elbowTitle: "ఎల్బో మెథడ్ గ్రాఫ్ (ఆప్టిమల్ k గుర్తింపు)",
      elbowDesc: "గ్రాఫ్‌లో మోచేయి (Elbow) ఆకారంలో వంగే బిందువు (ఇక్కడ k=3) అత్యుత్తమ సమతుల్యతను సూచిస్తుంది. ఆ తర్వాత అదనపు క్లస్టర్ల వల్ల పెద్దగా ప్రయోజనం ఉండదు.",
      clusterA: "క్లస్టర్ 1: తీవ్ర అభ్యాసకులు",
      clusterB: "క్లస్టర్ 2: స్థిరమైన అభ్యాసకులు",
      clusterC: "క్లస్టర్ 3: ప్రాథమిక సమీక్షకులు",
      clusterD: "క్లస్టర్ 4: వేగవంతమైన ప్రిపరేషన్",

      // Decision Tree & Random Forest
      treeTitle: "4. డిసిషన్ ట్రీ & రాండమ్ ఫారెస్ట్ ఎన్‌సెంబుల్",
      treeDesc: "డిసిషన్ ట్రీ బ్రాంచింగ్ ప్రశ్నల ద్వారా నిర్ణయాలు తీసుకుంటుంది. రాండమ్ ఫారెస్ట్ అనేక ట్రీలను కలిపి అత్యంత కచ్చితమైన అంచనాలను అందిస్తుంది.",
      treeCardTitle: "సింగిల్ డిసిషన్ ట్రీ (Decision Tree)",
      treeCardPoints: [
        "అవును/కాదు లాంటి ప్రశ్నల ఫ్లోచార్ట్ (ఉదా: చదివిన గంటలు > 5?)",
        "జిని ఇంప్యూరిటీ (Gini) ద్వారా ఉత్తమమైన విభజనలను ఎంచుకుంటుంది",
        "హై వేరియన్స్: ఒంటరి ట్రీ ఓవర్‌ఫిట్ అయ్యే అవకాశం ఎక్కువ"
      ],
      forestCardTitle: "రాండమ్ ఫారెస్ట్ ఎన్‌సెంబుల్ (Random Forest)",
      forestCardPoints: [
        "డేటా నుండి అనేక స్వతంత్ర ట్రీలను తయారు చేస్తుంది (Bagging)",
        "ఫీచర్లలో వైవిధ్యాన్ని తీసుకురావడం ద్వారా ఖచ్చితత్వాన్ని పెంచుతుంది",
        "మెజారిటీ ఓటింగ్ ద్వారా అంతిమ నిర్ణయాన్ని ప్రకటిస్తుంది"
      ],
      interactiveVoteTitle: "ఇంటరాక్టివ్ ఫారెస్ట్ ఓటింగ్ సిమ్యులేటర్",
      votePrompt: "పరీక్ష డేటా: [చదివిన గంటలు = 6.5, హాజరు = 92%]",
      runVoteBtn: "ఎన్‌సెంబుల్ అంచనా వేయి",
      voteResult: "అంతిమ నిర్ణయం:",
      confidence: "నమ్మకపు శాతం (Confidence):",

      // Workflow
      workflowTitle: "5. ఎండ్-టు-ఎండ్ ప్రొడక్షన్ ML వర్క్‌ఫ్లో",
      steps: [
        { num: "01", name: "డేటా సేకరణ (Data Ingestion)", desc: "డేటాబేస్‌లు, లాగ్స్ మరియు స్ట్రీమింగ్ నుండి డేటాను సమీకరించడం." },
        { num: "02", name: "ప్రీ-ప్రాసెసింగ్ & క్లీనింగ్", desc: "మిస్సింగ్ వాల్యూస్ సరిచేయడం, ఫీచర్ స్కేలింగ్ (StandardScaler)." },
        { num: "03", name: "మోడల్ ట్రైనింగ్ (Training)", desc: "Scikit-learn ఎస్టిమేటర్లతో మోడల్‌కు శిక్షణ ఇవ్వడం." },
        { num: "04", name: "హైపర్‌పారామీటర్ ట్యూనింగ్", desc: "GridSearchCV / Optuna ద్వారా గరిష్ట సామర్థ్యాన్ని సాధించడం." },
        { num: "05", name: "పరీక్ష & మూల్యాంకనం", desc: "ROC-AUC, ప్రెసిషన్, రీకాల్ మరియు కన్‌ఫ్యూజన్ మ్యాట్రిక్స్ తనిఖీ." },
        { num: "06", name: "ఏపీఐ డిప్లాయ్‌మెంట్ (FastAPI)", desc: "FastAPI మరియు డాకర్ (Docker) ద్వారా క్లౌడ్‌లో లైవ్ చేయడం." }
      ]
    },

    // TAB 3: ENGINEERING
    engineering: {
      header: "పైథాన్ & FastAPI ప్రొడక్షన్ ఇంజనీరింగ్",
      desc: "ల్యాబ్‌లోని నోట్‌బుక్స్ నుండి రియల్-వరల్డ్ హై-స్పీడ్ ప్రొడక్షన్ మైక్రోసర్వీసుల వరకు ప్రయాణం.",

      apiTesterTitle: "ఇంటరాక్టివ్ లైవ్ FastAPI టెస్ట్‌బెంచ్",
      apiTesterDesc: "FastAPI ఇన్ఫరెన్స్ సర్వీస్‌కు లైవ్ REST POST రిక్వెస్ట్ పంపి రియల్-టైమ్ అంచనా పొందండి.",
      endpoint: "POST /api/v1/predict-performance",
      feature1: "చదివిన గంటలు (0 - 15 గంటలు):",
      feature2: "హాజరు శాతం (0 - 100%):",
      feature3: "ప్రాక్టీస్ టెస్టులు (0 - 10):",
      sendReqBtn: "ఇన్ఫరెన్స్ రిక్వెస్ట్ పంపండి",
      sending: "అంచనా వేస్తోంది...",
      responseHeader: "HTTP 200 OK — మోడల్ రెస్పాన్స్ JSON",
      latencyLabel: "ఇన్ఫరెన్స్ వేగం (Latency):",
      modelMeta: "మోడల్: RandomForestClassifier (n_estimators=100, joblib)",

      codeTabs: {
        train: "1. train_model.py (MLflow ట్రాకింగ్)",
        logger: "2. logger.py (స్ట్రక్చర్డ్ JSON లాగ్స్)",
        api: "3. main.py (FastAPI + Pydantic v2)",
        docker: "4. Dockerfile (మల్టీ-స్టేజ్)",
        req: "5. requirements.txt"
      },
      mlflowBadge: "MLflow రిజిస్ట్రీ: 'StudentPerformanceClassifier' గా రిజిస్టర్ అయింది",
      logStreamTitle: "ప్రొడక్షన్ స్ట్రక్చర్డ్ JSON లాగ్ స్ట్రీమ్",
      logStreamDesc: "ఇన్ఫరెన్స్ జరిగేటప్పుడు కారిలేషన్ ID, లేటెన్సీ మరియు డేటాతో కూడిన రియల్-టైమ్ ఈవెంట్ లాగ్స్.",
      copyBtn: "కోడ్ కాపీ చేయి",
      copied: "కాపీ అయింది!",

      architectureTitle: "ప్రొడక్షన్ MLOps సర్వింగ్ ఆర్కిటెక్చర్",
      archSteps: [
        { title: "క్లయింట్ అప్లికేషన్", desc: "వెబ్ బ్రౌజర్ లేదా మొబైల్ యాప్ పంపే JSON ఇన్పుట్ డేటా." },
        { title: "FastAPI గేట్‌వే", desc: "Pydantic ద్వారా డేటాను ధృవీకరించి అతి వేగంగా ప్రాసెస్ చేసే సర్వర్." },
        { title: "సీరియలైజ్డ్ మోడల్", desc: "joblib ద్వారా మెమరీలోకి ఒకేసారి లోడ్ చేయబడిన శిక్షణ పొందిన మోడల్." },
        { title: "మానిటరింగ్ & డ్రిఫ్ట్", desc: "రియల్ టైమ్ లేటెన్సీ మరియు డేటా నాణ్యతను నిరంతరం పర్యవేక్షించడం." }
      ]
    },

    // TAB 4: QUIZ
    quiz: {
      header: "ఇంటరాక్టివ్ ML నాలెడ్జ్ ఎవాల్యుయేషన్ క్విజ్",
      desc: "మెషిన్ లెర్నింగ్ భావనలు మరియు డిప్లాయ్‌మెంట్ విధానాలపై మీ పరిజ్ఞానాన్ని పరీక్షించుకోండి.",
      scoreLabel: "మీ స్కోరు:",
      questionOf: "ప్రశ్న",
      nextBtn: "తరువాతి ప్రశ్న",
      prevBtn: "వెనుకకు",
      restartBtn: "మళ్లీ ప్రయత్నించండి",
      congratsTitle: "అద్భుతమైన ప్రతిభ! 🏆",
      congratsDesc: "మీరు మెషిన్ లెర్నింగ్ ప్రాథమిక మరియు ఇంజనీరింగ్ అంశాలలో పరిపూర్ణమైన అవగాహన సాధించారు!",
      feedbackCorrect: "సరైన సమాధానం! భావనను చక్కగా అర్థం చేసుకున్నారు.",
      feedbackIncorrect: "సరైనది కాదు. మరింత స్పష్టత కోసం క్రింది వివరణను చదవండి.",
      questions: [
        {
          id: 1,
          q: "సూపర్వైజ్డ్ మరియు అన్-సూపర్వైజ్డ్ లెర్నింగ్ మధ్య ప్రధాన వ్యత్యాసం ఏమిటి?",
          options: [
            "సూపర్వైజ్డ్ లెర్నింగ్ రన్ అవుతున్నప్పుడు మనుషులు పక్కనే ఉండాలి, అన్-సూపర్వైజ్డ్ రాత్రిపూట రన్ అవుతుంది.",
            "సూపర్వైజ్డ్ లెర్నింగ్ లేబుల్డ్ డేటా (సమాధానాలతో కూడిన డేటా) పై శిక్షణ పొందుతుంది, అన్-సూపర్వైజ్డ్ లేబుల్స్ లేని డేటాలోని నమూనాలను గుర్తిస్తుంది.",
            "సూపర్వైజ్డ్ లెర్నింగ్ కేవలం GPU లపై మాత్రమే నడుస్తుంది.",
            "రెండింటి మధ్య ఎటువంటి తేడా లేదు; రెండూ ఒకటే."
          ],
          correct: 1,
          expl: "సూపర్వైజ్డ్ లెర్నింగ్ లేబుల్ చేయబడిన ఫలితాలు ($y$) ఉన్న డేటాను ఉపయోగిస్తుంది. అన్-సూపర్వైజ్డ్ లెర్నింగ్ ఎటువంటి ముందస్తు లేబుల్స్ లేకుండా డేటాలోని దాగి ఉన్న క్లస్టర్లను గుర్తిస్తుంది."
        },
        {
          id: 2,
          q: "ట్రైనింగ్ డేటా కాకుండా కొత్త టెస్ట్ డేటా పై మోడల్‌ను ఎందుకు పరీక్షించాలి?",
          options: [
            "కంప్యూటర్ మెమరీని ఆదా చేయడం కోసం.",
            "ట్రైనింగ్ పూర్తయ్యాక పాత డేటా స్వయంగా డిలీట్ అయిపోతుంది కాబట్టి.",
            "మోడల్ కేవలం బట్టీ పట్టకుండా, సరికొత్త డేటాపై ఎంత కచ్చితంగా పనిచేస్తుందో (Generalization) తెలుసుకోవడానికి మరియు ఓవర్‌ఫిట్టింగ్‌ను నివారించడానికి.",
            "Scikit-learn లో టెస్ట్ డేటా ఇవ్వకపోతే ఎర్రర్ వస్తుంది కాబట్టి."
          ],
          correct: 2,
          expl: "ట్రైనింగ్ డేటా మీదే టెస్ట్ చేస్తే మోడల్ బట్టీ పట్టిన ఫలితాలు కనిపిస్తాయి. బయటి సరికొత్త డేటా మీదే మోడల్ యొక్క నిజమైన సామర్థ్యం తెలుస్తుంది."
        },
        {
          id: 3,
          q: "సింగిల్ డిసిషన్ ట్రీ కంటే రాండమ్ ఫారెస్ట్ మెరుగ్గా పనిచేయడానికి ఉపయోగపడే ప్రధాన టెక్నిక్ ఏది?",
          options: [
            "బ్యాగింగ్ (Bootstrap Aggregation) ద్వారా అనేక విభిన్న ట్రీలను తయారు చేసి వాటి ఓటింగ్ ద్వారా వేరియన్స్‌ను తగ్గించడం.",
            "ప్రతి 5 సెకన్లకు కొన్ని బ్రాంచులను డిలీట్ చేయడం.",
            "అన్ని ఫీచర్లను కేవలం 0 మరియు 1 గా మార్చడం.",
            "కేవలం ఒక్క చెట్టునే పదే పదే రన్ చేయడం."
          ],
          correct: 0,
          expl: "రాండమ్ ఫారెస్ట్ బూట్‌స్ట్రాప్ విధానంలో డేటాను, ఫీచర్లను విభజించి అనేక స్వతంత్ర ట్రీలను నిర్మిస్తుంది. వాటి సగటు లేదా ఓటింగ్ వల్ల వ్యక్తిగత తప్పులు రద్దయి కచ్చితత్వం పెరుగుతుంది."
        },
        {
          id: 4,
          q: "FastAPI ద్వారా scikit-learn మోడల్‌ను డిప్లాయ్ చేసేటప్పుడు, మోడల్ ఫైల్‌ను (`model.pkl`) ఎప్పుడు లోడ్ చేయడం ఉత్తమ పద్ధతి?",
          options: [
            "ప్రతి HTTP రిక్వెస్ట్ వచ్చినప్పుడల్లా కొత్తగా డిస్క్ నుండి లోడ్ చేయడం.",
            "అప్లికేషన్ స్టార్ట్ అయినప్పుడు ఒక్కసారే మెమరీలోకి లోడ్ చేసి పెట్టుకోవడం (తద్వారా రిక్వెస్ట్‌లు వేగంగా ప్రాసెస్ అవుతాయి).",
            "ప్రతి రిక్వెస్ట్‌కు మోడల్‌కు మళ్లీ మొదటి నుండి శిక్షణ ఇవ్వడం.",
            "మోడల్‌ను కేవలం HTML ఫైల్‌లో సేవ్ చేయడం."
          ],
          correct: 1,
          expl: "యాప్ స్టార్టప్‌లో ఒక్కసారే మోడల్ లోడ్ చేయడం ద్వారా ప్రతి రిక్వెస్ట్‌కు డిస్క్ రీడ్ అయ్యే సమయం ఆదా అవుతుంది, ఫలితంగా కొన్ని మిల్లీసెకన్లలోనే సమాధానం లభిస్తుంది."
        },
        {
          id: 5,
          q: "ఇంటి ధరలను (నిరంతర సంఖ్యలు) అంచనా వేసే రిగ్రెషన్ మోడల్ పనితీరును కొలవడానికి ఏ మెట్రిక్ సరైనది?",
          options: [
            "ఆక్యురసీ స్కోరు (Accuracy percentage)",
            "కన్‌ఫ్యూజన్ మ్యాట్రిక్స్ (Confusion Matrix)",
            "మీన్ స్క్వేర్డ్ ఎర్రర్ (MSE) లేదా RMSE",
            "ప్రెసిషన్ మరియు రీకాల్"
          ],
          correct: 2,
          expl: "సంఖ్యలను అంచనా వేసే రిగ్రెషన్ సమస్యలకు MSE, RMSE లేదా MAE వంటి డిస్టెన్స్ మెట్రిక్స్ అవసరం. ఆక్యురసీ మరియు కన్‌ఫ్యూజన్ మ్యాట్రిక్స్ క్లాసిఫికేషన్ సమస్యల కోసం వాడతారు."
        }
      ]
    },

    // TAB 5: GLOSSARY
    glossary: {
      header: "ద్విభాషా మెషిన్ లెర్నింగ్ శబ్దకోశం & చీట్ షీట్",
      desc: "పరీక్షలకు సిద్ధమయ్యే విద్యార్థులకు మరియు సిస్టమ్ డిజైన్ ఇంటర్వ్యూలకు సిద్ధమయ్యే ఇంజనీర్లకు అత్యంత ఉపయోగకరమైన శబ్దకోశం.",
      searchPlaceholder: "శోధించండి (ఉదా: ఓవర్‌ఫిట్టింగ్, హైపర్‌పారామీటర్, FastAPI, MSE)...",
      studentView: "విద్యార్థి వివరణ",
      engineerView: "ఇంజనీరింగ్ సాంకేతిక వివరాలు",
      terms: [
        {
          term: "ఓవర్‌ఫిట్టింగ్ (Overfitting)",
          category: "మోడల్ జనరలైజేషన్",
          student: "పుస్తకంలోని ప్రశ్నలను ఉన్నదున్నట్లు బట్టీ పట్టి, పరీక్షలో కాస్త మార్చి అడిగితే తికమకపడే విద్యార్థి లాంటిది.",
          engineer: "ట్రైనింగ్ డేటాలోని నాయిస్‌ను కూడా మోడల్ బట్టీ పడుతుంది: Train Loss తక్కువగా, Test Loss ఎక్కువగా ఉంటుంది. L1/L2 రెగ్యులరైజేషన్, డ్రాపౌట్ లేదా ప్రూనింగ్ ద్వారా నివారిస్తారు."
        },
        {
          term: "అండర్‌ఫిట్టింగ్ (Underfitting)",
          category: "మోడల్ జనరలైజేషన్",
          student: "కేవలం ఒకటో తరగతి కూడికలు నేర్చుకుని పదో తరగతి లెక్కలను పరిష్కరించడానికి ప్రయత్నించడం లాంటిది; మోడల్ చాలా బలహీనంగా ఉండటం.",
          engineer: "హై బయాస్: ట్రైనింగ్ మరియు టెస్టింగ్ రెండింటిలోనూ అధిక ఎర్రర్ వస్తుంది. పరిష్కారం: మరింత క్లిష్టమైన మోడల్ వాడటం, మెరుగైన ఫీచర్లను జోడించడం."
        },
        {
          term: "హైపర్‌పారామీటర్ (Hyperparameter)",
          category: "మోడల్ ఆర్కిటెక్చర్",
          student: "కంప్యూటర్ నేర్చుకోవడం ప్రారంభించడానికి ముందే మనం సెట్ చేసే నియంత్రణ బటన్లు (కేక్ బేక్ చేసే ముందు ఒవెన్ టెంపరేచర్ సెట్ చేయడం లాంటిది).",
          engineer: "ఆప్టిమైజేషన్ సమయంలో స్వయంగా అప్‌డేట్ అవ్వని బాహ్య సెట్టింగ్స్ (ఉదా: లెర్నింగ్ రేట్ $\\eta$, ట్రీ లోతు max_depth, బ్యాచ్ సైజు)."
        },
        {
          term: "మీన్ స్క్వేర్డ్ ఎర్రర్ (MSE)",
          category: "లాస్ ఫంక్షన్స్",
          student: "కంప్యూటర్ చేసిన తప్పులను స్క్వేర్ చేసి కనుగొనే సగటు జరిమానా. చిన్న తప్పుల కంటే పెద్ద తప్పులకు భారీ పెనాల్టీ విధిస్తుంది.",
          engineer: "$\\text{MSE} = \\frac{1}{N} \\sum (y_i - \\hat{y}_i)^2$. ఆర్డినరీ లీస్ట్ స్క్వేర్స్ రిగ్రెషన్‌లో విస్తృతంగా ఉపయోగించే కాన్వెక్స్ మరియు డిఫరెన్షియబుల్ లాస్ ఫంక్షన్."
        },
        {
          term: "ఫాస్ట్‌ఏపీఐ (FastAPI)",
          category: "డిప్లాయ్‌మెంట్ & MLOps",
          student: "యూజర్ల నుండి సమాచారాన్ని తీసుకుని, మన మెషిన్ లెర్నింగ్ మోడల్ నుండి క్షణాల్లో సమాధానాన్ని వెనక్కి తెచ్చే సూపర్ ఫాస్ట్ డిజిటల్ వెయిటర్.",
          engineer: "స్టార్లెట్ మరియు పైడాంటిక్ పై నిర్మించబడిన అత్యున్నత వేగం కలిగిన పైథాన్ ASGI వెబ్ ఫ్రేమ్‌వర్క్. నేటివ్ async సపోర్ట్ మరియు ఆటోమేటిక్ డాక్యుమెంటేషన్‌ను కలిగి ఉంటుంది."
        },
        {
          term: "ఫీచర్ ఇంజనీరింగ్ (Feature Engineering)",
          category: "డేటా ప్రాసెసింగ్",
          student: "కంప్యూటర్ సులభంగా అర్థం చేసుకుని కచ్చితమైన నిర్ణయం తీసుకోవడానికి ముడి డేటా నుండి ఉపయోగకరమైన ఆధారాలను రూపొందించడం.",
          engineer: "ముడి డేటాను ఉపయోగకరమైన సంఖ్యా రూపాల్లోకి మార్చడం: StandardScaler, వన్-హాట్ ఎన్‌కోడింగ్, టార్గెట్ ఎన్‌కోడింగ్ మరియు ఎంబెడ్డింగ్స్."
        }
      ]
    },

    auth: {
      modalTitleSignIn: "AI ఒడిస్సీకి తిరిగి స్వాగతం",
      modalSubtitleSignIn: "వ్యక్తిగతీకరించిన అభ్యాస ల్యాబ్‌లు, బుక్‌మార్క్‌లు మరియు సేవ్ చేసిన మోడల్ చెక్‌పాయింట్‌లను యాక్సెస్ చేయడానికి లాగిన్ అవ్వండి.",
      modalTitleSignUp: "మీ AI ఒడిస్సీ ఖాతాను సృష్టించండి",
      modalSubtitleSignUp: "సిలికాన్‌బ్రెయిన్స్‌ఎఐ ద్విభాషా మెషిన్ లెర్నింగ్ ఇంటరాక్టివ్ పోర్టల్‌లో చేరండి.",
      tabSignIn: "సైన్ ఇన్ (లాగిన్)",
      tabSignUp: "ఖాతా నమోదు (రిజిస్ట్రేషన్)",
      trackLabel: "మీ అభ్యాస విధానాన్ని (Track) ఎంచుకోండి:",
      trackStudentTitle: "🎓 విద్యార్థి మోడ్",
      trackStudentSubtitle: "సులభమైన ఉదాహరణలు, విజువల్ స్లైడర్లు మరియు ప్రాథమిక భావనలు",
      trackEngineerTitle: "🛠️ ఇంజనీర్ మోడ్",
      trackEngineerSubtitle: "గణిత సూత్రాలు, scikit-learn కోడ్, లాస్ ఫంక్షన్లు, FastAPI మైక్రోసర్వీసెస్",
      fullNameLabel: "పూర్తి పేరు",
      fullNamePlaceholder: "ఉదా: శ్రీకాంత్ వర్మ",
      emailLabel: "ఈమెయిల్ చిరునామా",
      emailPlaceholder: "analyst@siliconbrain.ai",
      passwordLabel: "పాస్‌వర్డ్",
      passwordPlaceholder: "••••••••••••",
      confirmPasswordLabel: "పాస్‌వర్డ్ నిర్ధారణ",
      confirmPasswordPlaceholder: "••••••••••••",
      strengthWeak: "బలహీనమైన పాస్‌వర్డ్ (8+ అక్షరాలు, సంఖ్యలు, చిహ్నాలను కలపండి)",
      strengthMedium: "మంచి పాస్‌వర్డ్",
      strengthStrong: "బలమైన & సురక్షితమైన పాస్‌వర్డ్",
      rememberMe: "నా సెషన్‌ను గుర్తుంచుకో",
      forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
      btnSignIn: "పోర్టల్‌లోకి ప్రవేశించండి",
      btnSignUp: "ఖాతాను సృష్టించండి",
      orDivider: "లేదా ప్రత్యక్ష యాక్సెస్",
      quickFillAnalyst: "⚡ సీనియర్ ఎనలిస్ట్ ఖాతా వివరాలు నింపండి (Demo)",
      analystHint: "analyst@siliconbrain.ai (సీనియర్ ML ఎనలిస్ట్ • ఇంజనీర్ మోడ్)",
      guestExploreBtn: "🚀 గెస్ట్ ఎక్స్‌ప్లోరర్ (లాగిన్ లేకుండా పరిశీలించండి)",
      alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?",
      dontHaveAccount: "ఖాతా లేదా?",
      signInLink: "ఇక్కడ లాగిన్ అవ్వండి",
      signUpLink: "ఇప్పుడే నమోదు చేసుకోండి",
      logout: "లాగౌట్",
      roleAnalyst: "సీనియర్ ML ఎనలిస్ట్",
      roleStudent: "స్టూడెంట్ ఎక్స్‌ప్లోరర్",
      roleEngineer: "MLOps ఇంజనీర్",
      guestUser: "గెస్ట్ యూజర్",
      loginSuccess: "విజయవంతంగా లాగిన్ అయ్యారు!",
      registerSuccess: "ఖాతా విజయవంతంగా నమోదైంది!",
      logoutSuccess: "మీరు లాగౌట్ అయ్యారు.",
      invalidCreds: "ఈమెయిల్ లేదా పాస్‌వర్డ్ తప్పు. దయచేసి మళ్లీ ప్రయత్నించండి.",
      passwordMismatch: "పాస్‌వర్డ్‌లు సరిపోలడం లేదు.",
      requiredField: "దయచేసి అన్ని అవసరమైన వివరాలను పూరించండి."
    },

    landing: {
      brand: "సిలికాన్‌బ్రెయిన్ AI",
      tagline: "డిఫెన్స్ & జియోస్పేషియల్ ల్యాబ్స్ • సురక్షిత పోర్టల్",
      engineStatus: "ML ఎక్స్‌ప్లోరర్ ఇంజిన్ స్థితి: V.2.0",
      statusOnline: "ఆన్‌లైన్",
      heroTitle: "AI ఒడిస్సీ: మెషిన్ లెర్నింగ్ ఎక్స్‌ప్లోరర్",
      heroSubtitle: "సిలికాన్‌బ్రెయిన్ AI వారి ఇంటరాక్టివ్ లెర్నింగ్ & ప్రొడక్షన్ స్టూడియో",
      heroDesc: "సులభమైన విజువల్ ఉదాహరణలు మరియు ప్రొఫెషనల్ ఇంజనీరింగ్ వర్క్‌ఫ్లోల ద్వారా మెషిన్ లెర్నింగ్ భావనలను నేర్చుకోండి.",
      selectTrackTitle: "అభ్యాస విధానం (Track) ఎంపిక",
      modulesHeading: "కీలక అన్వేషణ మాడ్యూల్స్",
      moduleFoundations: "1. ప్రాథమిక అంశాలు",
      moduleFoundationsDesc: "రూల్-బేస్డ్ vs ML • 3 పిల్లర్లు • డేటా స్ప్లిటింగ్ సిమ్యులేటర్",
      moduleAlgorithms: "2. అల్గారిథమ్ ల్యాబ్",
      moduleAlgorithmsDesc: "లీనియర్ & లాజిస్టిక్ రిగ్రెషన్ • K-మీన్స్ • రాండమ్ ఫారెస్ట్",
      moduleEngineering: "3. పైథాన్ & FastAPI",
      moduleEngineeringDesc: "MLflow ట్రాకింగ్ • కంటైనరైజేషన్ • లైవ్ ఇన్ఫరెన్స్ టెస్ట్‌బెంచ్",
      moduleQuiz: "4. జ్ఞాన పరిశీలన క్విజ్",
      moduleQuizDesc: "తక్షణ వివరణలతో కూడిన ద్విభాషా ఇంటరాక్టివ్ మూల్యాంకనం",
      moduleGlossary: "5. ML శబ్దకోశం",
      moduleGlossaryDesc: "విద్యార్థి ఉదాహరణలు vs ఇంజనీరింగ్ గణిత నిర్వచనాలు",
      
      // Monitor & Telemetry
      monitorHeader: "లైవ్ ML మోడల్ ట్రైనింగ్ మానిటర్",
      monitorSubtitle: "టెలిమెట్రీ: ai-odyssey-student-classifier • రన్ #104",
      metricLoss: "ట్రైనింగ్ లాస్ (Loss)",
      metricAcc: "వ్యాలిడేషన్ కచ్చితత్వం (Acc)",
      metricEpoch: "ఎపోచ్ పురోగతి (Epoch)",
      metricLatency: "ప్రాసెసింగ్ వేగం",
      coreStatus: "న్యూరాన్ కోర్ యాక్టివ్",
      throughputText: "1,280 ఇన్ఫరెన్స్/సెకన్ • P99: 1.4ms",
      
      // Quick access chips
      quickAccessTitle: "శీఘ్ర యాక్సెస్ అంశాలు // ప్రత్యక్ష ల్యాబ్ లింకులు",
      chipLinReg: "లీనియర్ రిగ్రెషన్ ప్లేగ్రౌండ్",
      chipFastAPI: "FastAPI ASGI ఇన్ఫరెన్స్",
      chipKMeans: "K-మీన్స్ & ఎల్బో పద్ధతి",
      chipRandomForest: "రాండమ్ ఫారెస్ట్ ఎన్‌సెంబుల్స్",
      chipQuiz: "నాలెడ్జ్ అసెస్‌మెంట్ క్విజ్",
      
      // Auth Card (Access Command Nexus)
      authCardBadge: "సెక్యూర్ యాక్సెస్ ప్రోటోకాల్ // లెవల్-4",
      authCardTitle: "యాక్సెస్ కమాండ్ నెక్సస్",
      authCardSubtitle: "ఆపరేటర్ గుర్తింపును ధృవీకరించండి లేదా గెస్ట్ మోడ్ ప్రారంభించండి.",
      ssoGithub: "GitHub రెపో",
      ssoGoogle: "Google SSO",
      orAuth: "లేదా అధికారిక ఆధారాలతో లాగిన్ అవ్వండి",
      idLabel: "ఆపరేటర్ ID / అధికారిక ఈమెయిల్",
      passLabel: "యాక్సెస్ కీ / పాస్‌వర్డ్",
      rememberSession: "సెషన్‌ను యాక్టివ్‌గా ఉంచు",
      forgotToken: "కీ మర్చిపోయారా?",
      btnInitSession: "ML ఎక్స్‌ప్లోరర్ సెషన్‌ను ప్రారంభించండి",
      btnStudentStart: "స్టూడెంట్ ఎక్స్‌ప్లోరర్ ప్రారంభించు",
      btnEngineerStart: "ప్రొడక్షన్ స్టూడియో ప్రారంభించు",
      autofillAnalyst: "⚡ ఎనలిస్ట్ ఖాతా వివరాలు నింపండి (analyst@siliconbrain.ai)",
      quickGuestExplore: "🚀 తక్షణ గెస్ట్ యాక్సెస్ (లాగిన్ అవసరం లేదు)",
      enterLabDirectly: "పూర్తి ఇంటరాక్టివ్ ల్యాబ్‌ను తెరవండి",
      authFooter: "సిలికాన్‌బ్రెయిన్ AI • డిఫెన్స్ & ఎంటర్‌ప్రైజ్ మెషిన్ లెర్నింగ్ స్టూడియో • సురక్షిత ఆడిటింగ్ వ్యవస్థ"
    },

    security: {
      restrictedBadge: "యాక్సెస్ కంట్రోల్ // లెవల్-4 క్లాసిఫైడ్",
      restrictedTitle: "యాక్సెస్ పరిమితం: కార్పొరేట్ ఆపరేటర్ ID తప్పనిసరి",
      restrictedDesc: "AI ఒడిస్సీ మెషిన్ లెర్నింగ్ లేబొరేటరీ మరియు అంతర్గత మోడల్స్ కేవలం సిలికాన్‌బ్రెయిన్ AI అధికారిక సిబ్బందికి మాత్రమే పరిమితం చేయబడ్డాయి. @siliconbrain.ai తో ముగిసే అధీకృత ఖాతాలకు మాత్రమే యాక్సెస్ లభిస్తుంది.",
      policyNote: "భద్రతా నిబంధన: కార్పొరేట్ ప్రమాణాల ప్రకారం పబ్లిక్ రిజిస్ట్రేషన్లు, బాహ్య డొమైన్లు (@gmail, @yahoo, మొదలైనవి) మరియు ధృవీకరించబడని లింకులు పూర్తిగా నిరోధించబడ్డాయి.",
      authorizedDomainOnly: "కార్పొరేట్ డొమైన్ వైట్‌లిస్ట్ అమలులో ఉంది: *@siliconbrain.ai",
      btnAutofillAuthorized: "అధీకృత ఎనలిస్ట్‌గా లాగిన్ అవ్వండి (analyst@siliconbrain.ai)",
      btnReturnToNexus: "కమాండ్ నెక్సస్‌కు తిరిగి వెళ్లండి",
      unauthorizedDomainError: "యాక్సెస్ పరిమితం: కేవలం @siliconbrain.ai ఖాతాలకు మాత్రమే అనుమతి ఉంది.",
      statusBlocked: "బ్లాక్ చేయబడింది // 403 నిషేధించబడింది"
    },

    footer: {
      text: "విద్యార్థులు & ఇంజనీర్ల కోసం ప్రత్యేక రూపకల్పన • ద్విభాషా ML లెర్నింగ్ ఇంటరాక్టివ్ పోర్టల్",
      rights: "React, Vite & Tailwind CSS తో నిర్మించబడింది • ప్రొడక్షన్ రెడీ",
      techBadge: "ద్విభాషా సదుపాయం (English / తెలుగు)"
    }
  }
};

export const codeSnippets = {
  train: `# ==============================================================================
# 1. train_model.py - Production Training Pipeline & MLflow Tracking
# ==============================================================================
import os
import json
import logging
from typing import Tuple, Dict, Any
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
from sklearn.metrics import (
    mean_squared_error, r2_score, mean_absolute_error,
    roc_auc_score, accuracy_score, precision_score, recall_score, f1_score,
    classification_report
)
import joblib

try:
    import mlflow
    import mlflow.sklearn
    from mlflow.models.signature import infer_signature
    MLFLOW_AVAILABLE = True
except ImportError:
    MLFLOW_AVAILABLE = False

def train_and_evaluate():
    # 1. Synthesize realistic academic dataset
    np.random.seed(42)
    n_samples = 1500
    hours = np.random.uniform(0.5, 14.0, n_samples)
    attendance = np.random.uniform(55.0, 100.0, n_samples)
    prep_tests = np.random.randint(0, 9, n_samples)
    
    continuous_score = np.clip(15.0 + 4.8 * hours + 0.35 * attendance + 2.8 * prep_tests + np.random.normal(0, 3.5, n_samples), 0, 100)
    binary_label = (continuous_score >= 60.0).astype(int)

    X = pd.DataFrame({"hours_studied": np.round(hours, 2), "attendance_pct": np.round(attendance, 1), "prep_tests": prep_tests})
    y = binary_label

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)
    
    # 2. Hyperparameters & MLflow Experiment
    params = {"n_estimators": 120, "max_depth": 6, "min_samples_split": 4, "random_state": 42}
    experiment_name = "ai-odyssey-student-performance"

    if MLFLOW_AVAILABLE:
        mlflow.set_experiment(experiment_name)
        mlflow.start_run(run_name="rf_production_v1.2")

    # 3. Fit Classifier & Continuous Regressor
    clf = RandomForestClassifier(**params)
    clf.fit(X_train, y_train)

    reg = LinearRegression()
    reg.fit(X_train, continuous_score[X_train.index])

    # 4. Metrics Evaluation
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:, 1]
    metrics = {
        "accuracy": float(accuracy_score(y_test, y_pred)),
        "roc_auc": float(roc_auc_score(y_test, y_prob)),
        "precision": float(precision_score(y_test, y_pred)),
        "recall": float(recall_score(y_test, y_pred)),
        "r2_score": float(r2_score(continuous_score[X_test.index], reg.predict(X_test))),
        "mse": float(mean_squared_error(continuous_score[X_test.index], reg.predict(X_test)))
    }

    # 5. Log to MLflow & Model Registry
    if MLFLOW_AVAILABLE:
        mlflow.log_params(params)
        mlflow.log_metrics(metrics)
        signature = infer_signature(X_train, clf.predict(X_train))
        mlflow.sklearn.log_model(
            sk_model=clf,
            artifact_path="student_performance_classifier",
            signature=signature,
            registered_model_name="StudentPerformanceClassifier"
        )
        mlflow.end_run()

    # 6. Save Local Fast Serving Artifact
    model_payload = {"classifier": clf, "regressor": reg, "metrics": metrics, "version": "v1.2.0-rf120"}
    joblib.dump(model_payload, "model.pkl")
    print("✅ Model serialized to model.pkl and registered in MLflow Registry")

if __name__ == "__main__":
    train_and_evaluate()`,

  logger: `# ==============================================================================
# 2. logger.py - Production-Grade Structured JSON Observability
# ==============================================================================
import sys
import json
import logging
from datetime import datetime, timezone
from typing import Any, Dict

class JSONFormatter(logging.Formatter):
    """Formats log records as structured single-line JSON with correlation telemetry."""
    def format(self, record: logging.LogRecord) -> str:
        log_record: Dict[str, Any] = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "file": record.filename,
            "line": record.lineno,
        }
        for field in ["request_id", "latency_ms", "path", "method", "status_code", "payload", "prediction", "event"]:
            if hasattr(record, field):
                log_record[field] = getattr(record, field)
        if record.exc_info:
            log_record["exception"] = self.formatException(record.exc_info)
        return json.dumps(log_record)

def get_logger(name: str = "ai_odyssey_inference", level: int = logging.INFO) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(level)
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(JSONFormatter())
        logger.addHandler(handler)
        logger.propagate = False
    return logger

logger = get_logger()`,

  api: `# ==============================================================================
# 3. main.py - Asynchronous FastAPI Backend with Pydantic v2 & Observability
# ==============================================================================
import time
import uuid
from contextlib import asynccontextmanager
from typing import Dict, Any, Optional
from datetime import datetime, timezone

from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import numpy as np
import pandas as pd
import joblib
from logger import logger

app_state = {"model_cache": None, "model_version": "v1.2.0-rf120", "start_time": time.time()}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Pre-load trained model artifact ONCE into RAM on startup
    try:
        app_state["model_cache"] = joblib.load("model.pkl")
        logger.info("Model loaded into RAM", extra={"event": "model_loaded", "version": app_state["model_version"]})
    except Exception as e:
        logger.warning("Operating in heuristic fallback", extra={"event": "model_missing"})
    yield
    app_state["model_cache"] = None

app = FastAPI(title="AI Odyssey: ML Inference Engine", version="1.2.0", lifespan=lifespan)

# CORS Middleware
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Correlation ID & Timing Middleware
@app.middleware("http")
async def correlation_and_logging_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    request.state.request_id = request_id
    start_time = time.perf_counter()
    
    response = await call_next(request)
    latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time-Ms"] = str(latency_ms)

    logger.info(
        f"{request.method} {request.url.path} -> {response.status_code} in {latency_ms}ms",
        extra={"event": "request_completed", "request_id": request_id, "latency_ms": latency_ms, "status_code": response.status_code}
    )
    return response

# Pydantic v2 Input Validation Schema
class StudentFeaturePayload(BaseModel):
    hours_studied: float = Field(..., ge=0.0, le=24.0, description="Daily study hours")
    attendance_pct: float = Field(..., ge=0.0, le=100.0, description="Class attendance percentage")
    prep_tests: int = Field(..., ge=0, le=50, description="Completed practice exams")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": app_state["model_cache"] is not None,
        "uptime_seconds": round(time.time() - app_state["start_time"], 2)
    }

@app.post("/api/v1/predict-performance")
async def predict_performance(payload: StudentFeaturePayload, request: Request):
    request_id = getattr(request.state, "request_id", str(uuid.uuid4()))
    features = pd.DataFrame([payload.model_dump()])
    cache = app_state.get("model_cache")
    
    if cache:
        pred = int(cache["classifier"].predict(features)[0])
        prob = float(cache["classifier"].predict_proba(features)[0][pred])
        score = round(float(cache["regressor"].predict(features)[0]), 2)
    else:
        pred, prob, score = 1, 0.92, 85.0

    return {
        "status": "success",
        "prediction": pred,
        "decision_label": "Pass / High Performance" if pred == 1 else "Needs Intervention",
        "confidence_pct": round(prob * 100, 1),
        "predicted_score": score,
        "request_id": request_id
    }`,

  docker: `# ==============================================================================
# 4. Dockerfile - Production Multi-Stage Container Build
# ==============================================================================
# Stage 1: Builder
FROM python:3.11-slim AS builder
WORKDIR /install
RUN apt-get update && apt-get install -y --no-install-recommends build-essential curl && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --prefix=/install/deps -r requirements.txt

# Stage 2: Minimal Production Runner
FROM python:3.11-slim AS runner
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
COPY --from=builder /install/deps /usr/local

# Non-root user for security
RUN useradd -m -u 1001 appuser && chown -R appuser:appuser /app
COPY --chown=appuser:appuser logger.py main.py train_model.py requirements.txt model.pk[l] ./
USER appuser

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\
    CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]`,

  req: `fastapi>=0.115.0
uvicorn[standard]>=0.34.0
pydantic>=2.10.0
scikit-learn>=1.6.0
mlflow>=2.19.0
pandas>=2.2.0
numpy>=1.26.0
joblib>=1.4.0
python-multipart>=0.0.20`
};
