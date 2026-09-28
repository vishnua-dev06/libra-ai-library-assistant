/**
 * Demo Campus Library Catalog & Inventory Database
 * Realistic dataset across CS, AI/ML, ECE, Embedded Systems, Communications, Math & Fiction.
 */

export const INITIAL_LIBRARY_CATALOG = [
  // 1. Programming
  {
    bookId: "LIB-CS-101",
    title: "Python Crash Course: A Hands-On, Project-Based Introduction to Programming",
    author: "Eric Matthes",
    category: "Programming",
    subCategory: "Python / Foundations",
    year: 2023,
    edition: "3rd Edition",
    isbn: "9781718502703",
    totalCopies: 8,
    availableCopies: 6,
    shelfLocation: "Building A, Floor 2, Shelf CS-04",
    difficulty: "Beginner",
    rating: 4.8,
    cover: "https://covers.openlibrary.org/b/isbn/9781718502703-M.jpg",
    tags: ["python", "beginner", "coding", "automation", "projects", "software engineering"],
    description: "The world's bestselling guide to the Python programming language. A fast-paced, thorough introduction that gets you writing code, solving problems, and building working applications and games right away.",
    keyTopics: ["Variables & Data Structures", "Functions & Classes", "Data Visualization with Matplotlib", "Django Web Apps", "Pygame Basics"],
    targetAudience: "Freshmen, non-CS majors, or anyone seeking a solid, pragmatic foundation in Python."
  },
  {
    bookId: "LIB-CS-102",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "Programming",
    subCategory: "Software Design / Best Practices",
    year: 2008,
    edition: "1st Edition",
    isbn: "9780132350884",
    totalCopies: 6,
    availableCopies: 2,
    shelfLocation: "Building A, Floor 2, Shelf CS-08",
    difficulty: "Intermediate",
    rating: 4.7,
    cover: "https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg",
    tags: ["clean code", "refactoring", "software engineering", "design patterns", "java", "best practices"],
    description: "A must-read for any developer looking to write readable, maintainable, and robust code. Demonstrates best practices for naming, functions, objects, error handling, and unit testing.",
    keyTopics: ["Meaningful Names", "Function Purity", "Error Handling & Exceptions", "Unit Testing & TDD", "Refactoring Smells"],
    targetAudience: "2nd to 4th year students wanting to elevate their coding style to industry standards."
  },
  {
    bookId: "LIB-CS-103",
    title: "Introduction to Algorithms (CLRS)",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    category: "Programming",
    subCategory: "Data Structures & Algorithms",
    year: 2022,
    edition: "4th Edition",
    isbn: "9780262046305",
    totalCopies: 10,
    availableCopies: 0,
    shelfLocation: "Building A, Floor 2, Shelf CS-12",
    difficulty: "Advanced",
    rating: 4.9,
    cover: "https://covers.openlibrary.org/b/isbn/9780262046305-M.jpg",
    tags: ["algorithms", "data structures", "dsa", "clrs", "graph theory", "dynamic programming"],
    description: "The definitive reference and textbook for data structures and algorithm analysis. Features comprehensive mathematical rigor, pseudocode, dynamic programming, graph algorithms, and NP-completeness.",
    keyTopics: ["Asymptotic Notation", "Divide & Conquer", "Dynamic Programming", "Greedy Algorithms", "Graph Traversal & Shortest Paths"],
    targetAudience: "CS undergraduates preparing for technical interviews, competitive programming, and core CS coursework."
  },

  // 2. AI / ML
  {
    bookId: "LIB-AI-201",
    title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
    author: "Aurélien Géron",
    category: "AI/ML",
    subCategory: "Applied Machine Learning & Deep Learning",
    year: 2022,
    edition: "3rd Edition",
    isbn: "9781098125974",
    totalCopies: 7,
    availableCopies: 4,
    shelfLocation: "Building B, Floor 1, Shelf AI-02",
    difficulty: "Intermediate",
    rating: 4.9,
    cover: "https://covers.openlibrary.org/b/isbn/9781098125974-M.jpg",
    tags: ["machine learning", "deep learning", "python", "scikit-learn", "tensorflow", "neural networks", "keras"],
    description: "An exceptional, hands-on guide that bridges theoretical concepts with practical Python code. Covers end-to-end ML pipelines, deep neural networks, CNNs, RNNs, transformers, and reinforcement learning.",
    keyTopics: ["Supervised & Unsupervised Learning", "SVMs & Random Forests", "Deep Neural Networks", "Transformers & LLMs", "MLOps & Model Deployment"],
    targetAudience: "Students who know basic Python and want to build real-world ML and AI models immediately."
  },
  {
    bookId: "LIB-AI-202",
    title: "Pattern Recognition and Machine Learning",
    author: "Christopher M. Bishop",
    category: "AI/ML",
    subCategory: "Statistical Machine Learning & Theory",
    year: 2006,
    edition: "1st Edition",
    isbn: "9780387310732",
    totalCopies: 5,
    availableCopies: 1,
    shelfLocation: "Building B, Floor 1, Shelf AI-05",
    difficulty: "Advanced",
    rating: 4.8,
    cover: "https://covers.openlibrary.org/b/isbn/9780387310732-M.jpg",
    tags: ["machine learning", "bayesian", "probability", "pattern recognition", "statistics", "math"],
    description: "The classic foundational text for statistical and probabilistic machine learning. Ideal for understanding the mathematics behind graphical models, Bayesian inference, and kernel methods.",
    keyTopics: ["Bayesian Decision Theory", "Linear Models for Regression & Classification", "Kernel Methods", "Mixture Models & EM", "Approximate Inference"],
    targetAudience: "Advanced undergraduates, graduate researchers, and students who want deep mathematical rigor."
  },
  {
    bookId: "LIB-AI-203",
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
    category: "AI/ML",
    subCategory: "Deep Learning Foundations",
    year: 2016,
    edition: "1st Edition",
    isbn: "9780262035613",
    totalCopies: 6,
    availableCopies: 3,
    shelfLocation: "Building B, Floor 1, Shelf AI-07",
    difficulty: "Advanced",
    rating: 4.7,
    cover: "https://covers.openlibrary.org/b/isbn/9780262035613-M.jpg",
    tags: ["deep learning", "neural networks", "goodfellow", "math", "optimization", "generative models"],
    description: "Referred to as the 'Deep Learning Bible' by Elon Musk and Yann LeCun. Covers applied math foundations, deep feedforward networks, regularization, optimization, convolutional networks, and autoencoders.",
    keyTopics: ["Linear Algebra & Probability Review", "Deep Feedforward Networks", "Optimization Algorithms", "Convolutional & Recurrent Nets", "Generative Adversarial Networks (GANs)"],
    targetAudience: "Students with strong math background seeking comprehensive foundation in neural network theories."
  },

  // 3. Electronics
  {
    bookId: "LIB-ECE-301",
    title: "The Art of Electronics",
    author: "Paul Horowitz, Winfield Hill",
    category: "Electronics",
    subCategory: "Analog & Digital Circuit Design",
    year: 2015,
    edition: "3rd Edition",
    isbn: "9780521809269",
    totalCopies: 8,
    availableCopies: 5,
    shelfLocation: "Building C, Floor 2, Shelf EE-01",
    difficulty: "Intermediate",
    rating: 4.9,
    cover: "https://covers.openlibrary.org/b/isbn/9780521809269-M.jpg",
    tags: ["electronics", "circuit design", "analog", "transistors", "op-amps", "hardware", "ece"],
    description: "Widely regarded as the holy grail of circuit design. Combines intuitive physical insight with rigorous practical engineering for op-amps, transistors, filters, and low-noise electronics.",
    keyTopics: ["Bipolar & Field Effect Transistors", "Operational Amplifiers", "Active Filters & Oscillators", "Power Supplies & Regulators", "Noise Measurement & Precision"],
    targetAudience: "ECE, Electrical, and Mechatronics students looking for practical, real-world hardware design intuition."
  },
  {
    bookId: "LIB-ECE-302",
    title: "Microelectronic Circuits",
    author: "Adel S. Sedra, Kenneth C. Smith",
    category: "Electronics",
    subCategory: "Semiconductor Devices & VLSI Basics",
    year: 2020,
    edition: "8th Edition",
    isbn: "9780190853464",
    totalCopies: 12,
    availableCopies: 8,
    shelfLocation: "Building C, Floor 2, Shelf EE-04",
    difficulty: "Intermediate",
    rating: 4.6,
    cover: "https://covers.openlibrary.org/b/isbn/9780190853464-M.jpg",
    tags: ["microelectronics", "semiconductors", "mosfet", "bjt", "integrated circuits", "ece", "analog"],
    description: "The standard international textbook for undergraduate analog and digital microelectronics. Thoroughly explores semiconductor physics, MOSFET amplifiers, frequency response, and IC fabrication principles.",
    keyTopics: ["MOSFET & BJT Physics", "Single-Stage & Multistage Amplifiers", "Differential & Multistage ICs", "Frequency Response Analysis", "CMOS Digital Logic"],
    targetAudience: "2nd and 3rd year ECE / EEE students preparing for core university microelectronics exams."
  },

  // 4. Embedded Systems
  {
    bookId: "LIB-EMB-401",
    title: "Making Embedded Systems: Design Patterns for Great Software",
    author: "Elecia White",
    category: "Embedded Systems",
    subCategory: "Embedded C & Architecture",
    year: 2011,
    edition: "1st Edition",
    isbn: "9781449302146",
    totalCopies: 5,
    availableCopies: 3,
    shelfLocation: "Building C, Floor 3, Shelf EMB-01",
    difficulty: "Beginner",
    rating: 4.8,
    cover: "https://covers.openlibrary.org/b/isbn/9781449302146-M.jpg",
    tags: ["embedded systems", "c", "firmware", "microcontrollers", "arm", "iot", "ece", "hardware-software"],
    description: "An approachable and entertaining guide to embedded software development. Teaches resource management, hardware interfaces, state machines, interrupts, and power optimization.",
    keyTopics: ["Memory Constraints & Schematics", "State Machines & Event Loops", "Interrupt Handlers (ISRs)", "SPI, I2C, UART Communication", "Power Reduction Strategies"],
    targetAudience: "ECE/CS students transitioning from pure software to hardware-level microcontroller programming."
  },
  {
    bookId: "LIB-EMB-402",
    title: "Embedded Systems: Real-Time Interfacing to ARM Cortex-M Microcontrollers",
    author: "Jonathan W. Valvano",
    category: "Embedded Systems",
    subCategory: "ARM Architecture & RTOS",
    year: 2017,
    edition: "5th Edition",
    isbn: "9781534964686",
    totalCopies: 6,
    availableCopies: 1,
    shelfLocation: "Building C, Floor 3, Shelf EMB-03",
    difficulty: "Intermediate",
    rating: 4.9,
    cover: "https://covers.openlibrary.org/b/isbn/9781534964686-M.jpg",
    tags: ["arm", "cortex-m", "rtos", "embedded systems", "microcontroller", "sensors", "interfacing", "valvano"],
    description: "Written by legendary UT Austin professor Jonathan Valvano. Deep dives into register-level programming on ARM Cortex-M, real-time operating systems (RTOS), DMA, ADCs, and sensor interfacing.",
    keyTopics: ["ARM Cortex-M Architecture", "Direct Memory Access (DMA)", "Timers & PWM Generation", "ADC & Sensor Interfacing", "Real-Time Operating Systems (RTOS) Basics"],
    targetAudience: "Junior & Senior ECE/Robotics students building complex IoT hardware, drones, or robotics controllers."
  },
  {
    bookId: "LIB-EMB-403",
    title: "Designing Embedded Hardware",
    author: "John Catsoulis",
    category: "Embedded Systems",
    subCategory: "Hardware System Design",
    year: 2005,
    edition: "2nd Edition",
    isbn: "9780596007553",
    totalCopies: 4,
    availableCopies: 0,
    shelfLocation: "Building C, Floor 3, Shelf EMB-07",
    difficulty: "Intermediate",
    rating: 4.5,
    cover: "https://covers.openlibrary.org/b/isbn/9780596007553-M.jpg",
    tags: ["embedded systems", "hardware design", "schematics", "pcb", "bus protocols", "electronics"],
    description: "Covers the fundamental principles of designing electronic hardware for embedded devices, including CPU selection, memory busses, power supply isolation, and serial communication buses.",
    keyTopics: ["CPU Architecture Essentials", "Bus Architectures (CAN, I2C, SPI)", "Logic Families & Interfacing", "Power Supplies & EMI Shielding", "Debugging with Oscilloscopes & Logic Analyzers"],
    targetAudience: "Students designing their own custom PCBs, capstone project hardware, or IoT gadgets."
  },

  // 5. Communication Systems
  {
    bookId: "LIB-COM-501",
    title: "Digital Communications: Fundamentals and Applications",
    author: "Bernard Sklar, Fredric J. Harris",
    category: "Communication",
    subCategory: "Digital Modulation & Signal Processing",
    year: 2020,
    edition: "3rd Edition",
    isbn: "9780134588568",
    totalCopies: 7,
    availableCopies: 4,
    shelfLocation: "Building C, Floor 2, Shelf COMM-02",
    difficulty: "Intermediate",
    rating: 4.7,
    cover: "https://covers.openlibrary.org/b/isbn/9780134588568-M.jpg",
    tags: ["digital communications", "telecom", "modulation", "qam", "ofdm", "wireless", "sklar", "signal processing"],
    description: "Clear, step-by-step exposition of digital communications concepts: modulation schemes (PSK, QAM, FSK), error control coding, synchronization, OFDM, and fading channels.",
    keyTopics: ["Baseband & Bandpass Modulation", "Matched Filters & SNR Optimization", "Convolutional & Block Codes", "OFDM & Multi-Carrier Systems", "Wireless Fading Channels"],
    targetAudience: "ECE & Telecom students studying modern 4G/5G physical layer wireless networks."
  },
  {
    bookId: "LIB-COM-502",
    title: "Computer Networking: A Top-Down Approach",
    author: "James F. Kurose, Keith W. Ross",
    category: "Communication",
    subCategory: "Computer Networks & Protocols",
    year: 2021,
    edition: "8th Edition",
    isbn: "9780136681557",
    totalCopies: 9,
    availableCopies: 7,
    shelfLocation: "Building A, Floor 1, Shelf NET-01",
    difficulty: "Beginner",
    rating: 4.8,
    cover: "https://covers.openlibrary.org/b/isbn/9780136681557-M.jpg",
    tags: ["networking", "tcp/ip", "http", "dns", "routing", "protocols", "socket programming", "kurose"],
    description: "The world-famous top-down approach that starts from the application layer (HTTP, DNS, WebSockets) and journeys down through TCP/UDP transport, IP routing, and physical link layers.",
    keyTopics: ["Application Protocols (HTTP/3, DNS)", "Transport Layer & TCP Congestion Control", "Network Layer (BGP, OSPF, SDN)", "Link Layer & Ethernet", "Network Security Fundamentals"],
    targetAudience: "CS, IT, and ECE students taking computer network architecture and distributed systems courses."
  },
  {
    bookId: "LIB-COM-503",
    title: "Wireless Communications: Principles and Practice",
    author: "Theodore S. Rappaport",
    category: "Communication",
    subCategory: "RF & Wireless Systems",
    year: 2002,
    edition: "2nd Edition",
    isbn: "9780130422323",
    totalCopies: 5,
    availableCopies: 2,
    shelfLocation: "Building C, Floor 2, Shelf COMM-05",
    difficulty: "Advanced",
    rating: 4.7,
    cover: "https://covers.openlibrary.org/b/isbn/9780130422323-M.jpg",
    tags: ["wireless", "rf", "cellular", "5g", "antennas", "propagation", "rappaport"],
    description: "The benchmark reference for mobile cellular systems, radio wave propagation models, path loss, Doppler shift, equalization, and multiple access techniques (CDMA, TDMA, FDMA).",
    keyTopics: ["Cellular Concept & Frequency Reuse", "Mobile Radio Propagation & Multipath Fading", "Modulation for Mobile Systems", "Equalization & Diversity", "Wireless Standards (GSM, LTE)"],
    targetAudience: "Senior undergraduate and graduate ECE students specializing in RF, antenna design, and telecom."
  },

  // 6. Mathematics
  {
    bookId: "LIB-MTH-601",
    title: "Linear Algebra and Its Applications",
    author: "Gilbert Strang",
    category: "Mathematics",
    subCategory: "Linear Algebra & Matrices",
    year: 2016,
    edition: "5th Edition",
    isbn: "9780030105678",
    totalCopies: 10,
    availableCopies: 6,
    shelfLocation: "Building D, Floor 1, Shelf MATH-02",
    difficulty: "Beginner",
    rating: 4.9,
    cover: "https://covers.openlibrary.org/b/isbn/9780030105678-M.jpg",
    tags: ["linear algebra", "matrices", "strang", "vectors", "eigenvalues", "pca", "data science", "math"],
    description: "Renowned MIT Professor Gilbert Strang's lively, intuitive treatment of vector spaces, matrix factorizations, eigenvalues, singular value decomposition (SVD), and least-squares approximations.",
    keyTopics: ["Vector Spaces & Subspaces", "Orthogonality & Gram-Schmidt", "Determinants & Eigenvalues", "Singular Value Decomposition (SVD)", "Applications to Graphs & Networks"],
    targetAudience: "Engineering, CS, and AI students needing strong geometric intuition and linear algebra mastery."
  },
  {
    bookId: "LIB-MTH-602",
    title: "Mathematics for Machine Learning",
    author: "Marc Peter Deisenroth, A. Aldo Faisal, Cheng Soon Ong",
    category: "Mathematics",
    subCategory: "Optimization, Calculus & Statistics",
    year: 2020,
    edition: "1st Edition",
    isbn: "9781108455145",
    totalCopies: 8,
    availableCopies: 5,
    shelfLocation: "Building D, Floor 1, Shelf MATH-08",
    difficulty: "Intermediate",
    rating: 4.8,
    cover: "https://covers.openlibrary.org/b/isbn/9781108455145-M.jpg",
    tags: ["math", "machine learning", "calculus", "linear algebra", "optimization", "probability", "statistics"],
    description: "A tailored, modern textbook that distills linear algebra, analytic geometry, matrix decompositions, vector calculus, probability, and optimization specifically for ML algorithms.",
    keyTopics: ["Analytic Geometry & Matrix Decompositions", "Vector Calculus & Gradients", "Probability Distributions & Bayes Rule", "Continuous Optimization (Convex & SGD)", "PCA & SVM Formulations"],
    targetAudience: "Students who want to connect abstract pure math directly to PCA, SVMs, and Gradient Descent."
  },
  {
    bookId: "LIB-MTH-603",
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth H. Rosen",
    category: "Mathematics",
    subCategory: "Discrete Structures & Logic",
    year: 2018,
    edition: "8th Edition",
    isbn: "9781259676512",
    totalCopies: 11,
    availableCopies: 0,
    shelfLocation: "Building D, Floor 1, Shelf MATH-04",
    difficulty: "Beginner",
    rating: 4.6,
    cover: "https://covers.openlibrary.org/b/isbn/9781259676512-M.jpg",
    tags: ["discrete math", "logic", "proofs", "set theory", "combinatorics", "graph theory", "boolean algebra"],
    description: "The cornerstone text for foundational CS mathematics: propositional logic, proof techniques, induction, recursion, counting, relations, and graph models.",
    keyTopics: ["Logic & Proof Techniques", "Sets, Functions & Sequences", "Induction & Recursion", "Combinatorics & Probability", "Graphs & Trees"],
    targetAudience: "Freshmen & Sophomore CS/ECE students beginning computer science theory courses."
  },

  // 7. Fiction / Campus Reading
  {
    bookId: "LIB-FIC-701",
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Fiction",
    subCategory: "Sci-Fi / Hard Science Fiction",
    year: 2021,
    edition: "1st Edition",
    isbn: "9780593135204",
    totalCopies: 6,
    availableCopies: 4,
    shelfLocation: "Building E, Ground Floor, Shelf FIC-SCI-01",
    difficulty: "Beginner",
    rating: 4.9,
    cover: "https://covers.openlibrary.org/b/isbn/9780593135204-M.jpg",
    tags: ["fiction", "sci-fi", "space", "science", "physics", "astronaut", "andy weir"],
    description: "A lone astronaut must save the Earth from an extinction-level catastrophe. Filled with thrilling real-world physics, chemistry, ingenious scientific problem-solving, and unforgettable humor.",
    keyTopics: ["Interstellar Space Travel", "Astrobiology & Physics", "Problem-Solving Under Pressure", "First Contact & Communication"],
    targetAudience: "Engineering students who love gripping science fiction grounded in real scientific problem-solving."
  },
  {
    bookId: "LIB-FIC-702",
    title: "Neuromancer",
    author: "William Gibson",
    category: "Fiction",
    subCategory: "Cyberpunk / Classic Sci-Fi",
    year: 1984,
    edition: "Ace Science Fiction Edition",
    isbn: "9780441569595",
    totalCopies: 4,
    availableCopies: 2,
    shelfLocation: "Building E, Ground Floor, Shelf FIC-CYBER-03",
    difficulty: "Intermediate",
    rating: 4.6,
    cover: "https://covers.openlibrary.org/b/isbn/9780441569595-M.jpg",
    tags: ["fiction", "cyberpunk", "ai", "cyberspace", "hacking", "william gibson", "classic"],
    description: "The Hugo and Nebula award-winning masterpiece that coined the term 'cyberspace' and defined the cyberpunk genre. A burned-out hacker is hired for one final, monumental heist against a sentient AI.",
    keyTopics: ["Cyberspace & Virtual Reality", "Artificial Intelligence Sentience", "Cybernetics & High-Tech Dystopia", "Corporate Espionage"],
    targetAudience: "CS & Tech students interested in the philosophical roots of AI, virtual reality, and hacking lore."
  },
  {
    bookId: "LIB-FIC-703",
    title: "The Three-Body Problem",
    author: "Cixin Liu",
    category: "Fiction",
    subCategory: "Hard Sci-Fi / Cosmology",
    year: 2014,
    edition: "English Translation",
    isbn: "9780765377067",
    totalCopies: 5,
    availableCopies: 1,
    shelfLocation: "Building E, Ground Floor, Shelf FIC-SCI-08",
    difficulty: "Intermediate",
    rating: 4.7,
    cover: "https://covers.openlibrary.org/b/isbn/9780765377067-M.jpg",
    tags: ["fiction", "sci-fi", "astrophysics", "nano-materials", "cixin liu", "cosmology"],
    description: "A breathtaking epic set against China's Cultural Revolution and modern quantum astrophysics, revealing humanity's first contact with an alien civilization in a chaotic three-star system.",
    keyTopics: ["Three-Body Celestial Mechanics", "Quantum Entanglement & Sophons", "Nano-Materials Engineering", "Cosmic Sociology"],
    targetAudience: "Students fascinated by grand scale physics, orbital mechanics, and philosophical science fiction."
  }
];

/**
 * Calculates current availability status based on copy counts
 * Rules:
 * - availableCopies > 3  => "AVAILABLE" (Green)
 * - availableCopies 1..3 => "LIMITED" (Amber)
 * - availableCopies === 0 => "BORROWED" (Rose/Red)
 */
export function getAvailabilityStatus(availableCopies) {
  if (availableCopies > 3) return "AVAILABLE";
  if (availableCopies > 0) return "LIMITED";
  return "BORROWED";
}

/**
 * Categories list for filtering
 */
export const CATEGORIES = [
  "All Categories",
  "Programming",
  "AI/ML",
  "Electronics",
  "Embedded Systems",
  "Communication",
  "Mathematics",
  "Fiction"
];

/**
 * Preset Prompt Suggestions for AI Assistant
 */
export const PRESET_PROMPTS = [
  {
    title: "ECE & Embedded Systems",
    prompt: "I am an ECE student and want to learn embedded systems with microcontrollers.",
    category: "Embedded Systems",
    badge: "Student Favorite"
  },
  {
    title: "Python for Beginners",
    prompt: "I want to learn Python for complete beginners from scratch with projects.",
    category: "Programming",
    badge: "Popular"
  },
  {
    title: "Machine Learning Foundations",
    prompt: "I need good books to master practical machine learning and neural networks.",
    category: "AI/ML",
    badge: "High Demand"
  },
  {
    title: "Analog & Hardware Circuits",
    prompt: "Suggest best hardware circuit design and analog electronics books for college.",
    category: "Electronics",
    badge: "Core ECE"
  },
  {
    title: "Math for Data Science",
    prompt: "I am looking for linear algebra and calculus books geared towards data science.",
    category: "Mathematics",
    badge: "Foundations"
  },
  {
    title: "Weekend Sci-Fi Fiction",
    prompt: "Can you recommend engaging sci-fi fiction books with real physics and engineering?",
    category: "Fiction",
    badge: "Leisure"
  }
];
