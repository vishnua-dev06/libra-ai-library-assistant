export const BOOKS_DATA = [
  {
    id: "LIB-001",
    title: "Python Crash Course",
    author: "Eric Matthes",
    category: "Programming",
    year: 2023,
    totalCopies: 6,
    availableCopies: 4,
    status: "AVAILABLE",
    difficulty: "Beginner",
    description: "A fast-paced, hands-on introduction to programming with Python, covering variables, lists, classes, data visualization, and web applications.",
    keywords: ["python", "beginner", "coding", "programming", "software", "basics", "projects"]
  },
  {
    id: "LIB-002",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "Programming",
    year: 2008,
    totalCopies: 5,
    availableCopies: 2,
    status: "LIMITED",
    difficulty: "Intermediate",
    description: "Best practices for writing readable, maintainable, and clean code with principles of software craftsmanship.",
    keywords: ["clean code", "refactoring", "software engineering", "architecture", "best practices", "programming"]
  },
  {
    id: "LIB-003",
    title: "Introduction to Algorithms (CLRS)",
    author: "Cormen, Leiserson, Rivest, Stein",
    category: "Computer Science",
    year: 2022,
    totalCopies: 8,
    availableCopies: 0,
    status: "BORROWED",
    difficulty: "Advanced",
    description: "The premier textbook on data structures, sorting algorithms, dynamic programming, and graph theory.",
    keywords: ["algorithms", "dsa", "data structures", "graphs", "sorting", "computer science", "math"]
  },
  {
    id: "LIB-004",
    title: "Hands-On Machine Learning with Scikit-Learn & TensorFlow",
    author: "Aurélien Géron",
    category: "AI/ML",
    year: 2022,
    totalCopies: 6,
    availableCopies: 3,
    status: "LIMITED",
    difficulty: "Intermediate",
    description: "Practical machine learning and deep learning guide with Python, neural networks, and computer vision.",
    keywords: ["machine learning", "ai", "ml", "deep learning", "tensorflow", "neural networks", "python", "data science"]
  },
  {
    id: "LIB-005",
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio",
    category: "AI/ML",
    year: 2016,
    totalCopies: 4,
    availableCopies: 0,
    status: "BORROWED",
    difficulty: "Advanced",
    description: "Mathematical and conceptual foundations of linear models, backpropagation, CNNs, and deep generative models.",
    keywords: ["deep learning", "ai", "neural networks", "mathematics", "research", "machine learning"]
  },
  {
    id: "LIB-006",
    title: "Making Embedded Systems",
    author: "Elecia White",
    category: "Embedded Systems",
    year: 2011,
    totalCopies: 5,
    availableCopies: 3,
    status: "LIMITED",
    difficulty: "Beginner",
    description: "Design patterns, memory constraints, interrupts, peripheral buses (SPI, I2C), and hardware-software interfacing for microcontrollers.",
    keywords: ["embedded systems", "microcontrollers", "ece", "firmware", "c", "hardware", "arm", "iot"]
  },
  {
    id: "LIB-007",
    title: "The Art of Electronics",
    author: "Paul Horowitz, Winfield Hill",
    category: "Electronics",
    year: 2015,
    totalCopies: 7,
    availableCopies: 5,
    status: "AVAILABLE",
    difficulty: "Intermediate",
    description: "The gold-standard reference for circuit design, operational amplifiers, transistors, power supplies, and analog hardware.",
    keywords: ["electronics", "circuits", "analog", "ece", "transistors", "hardware", "op-amps", "electrical"]
  },
  {
    id: "LIB-008",
    title: "Computer Networking: A Top-Down Approach",
    author: "James Kurose, Keith Ross",
    category: "Communication",
    year: 2021,
    totalCopies: 6,
    availableCopies: 4,
    status: "AVAILABLE",
    difficulty: "Beginner",
    description: "Comprehensive guide to network protocols from the application layer (HTTP/DNS) to transport (TCP/UDP) and routing.",
    keywords: ["networking", "communication", "tcp/ip", "protocols", "internet", "wireless", "telecom"]
  },
  {
    id: "LIB-009",
    title: "Linear Algebra and Its Applications",
    author: "Gilbert Strang",
    category: "Mathematics",
    year: 2016,
    totalCopies: 8,
    availableCopies: 6,
    status: "AVAILABLE",
    difficulty: "Beginner",
    description: "Intuitive geometric and matrix foundation covering vector spaces, eigenvalues, singular value decomposition (SVD), and linear systems.",
    keywords: ["math", "mathematics", "linear algebra", "matrices", "vectors", "eigenvalues", "data science"]
  },
  {
    id: "LIB-010",
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Fiction",
    year: 2021,
    totalCopies: 5,
    availableCopies: 1,
    status: "LIMITED",
    difficulty: "Beginner",
    description: "A lone astronaut must save Earth using scientific problem-solving, orbital mechanics, physics, and chemistry.",
    keywords: ["fiction", "sci-fi", "science", "space", "physics", "novel", "reading"]
  }
];

export function getAvailabilityBadge(availableCopies) {
  if (availableCopies > 3) {
    return {
      label: "AVAILABLE",
      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    };
  }
  if (availableCopies > 0) {
    return {
      label: "LIMITED",
      className: "bg-amber-500/15 text-amber-400 border-amber-500/30"
    };
  }
  return {
    label: "BORROWED",
    className: "bg-rose-500/15 text-rose-400 border-rose-500/30"
  };
}

export function recommendBooks(query) {
  if (!query || !query.trim()) return [];

  const q = query.toLowerCase();
  const tokens = q
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !["want", "need", "learn", "book", "books", "read", "show", "give", "some", "good", "best"].includes(w));

  const scored = BOOKS_DATA.map(book => {
    let score = 0;
    const reasons = [];

    // Check query tokens against title, author, category, keywords, description
    tokens.forEach(tok => {
      if (book.title.toLowerCase().includes(tok)) {
        score += 10;
        reasons.push(`Title matches "${tok}"`);
      }
      if (book.keywords.some(k => k.includes(tok))) {
        score += 8;
        reasons.push(`Tag matches "${tok}"`);
      }
      if (book.category.toLowerCase().includes(tok)) {
        score += 6;
        reasons.push(`Subject category matches "${tok}"`);
      }
      if (book.description.toLowerCase().includes(tok)) {
        score += 3;
      }
    });

    // Special contextual boosts
    if ((q.includes("ece") || q.includes("embedded")) && book.category === "Embedded Systems") {
      score += 15;
      reasons.push("Essential foundation for ECE embedded systems and microcontrollers");
    }
    if ((q.includes("python") || q.includes("beginner")) && book.title.includes("Python")) {
      score += 15;
      reasons.push("Top-rated introductory project guide for beginners");
    }
    if ((q.includes("ml") || q.includes("machine learning") || q.includes("ai")) && book.category === "AI/ML") {
      score += 12;
      reasons.push("Comprehensive hands-on AI/ML curriculum");
    }

    return {
      book,
      score,
      reason: reasons.length > 0 ? reasons.slice(0, 2).join(". ") : `Relevant to ${book.category} study topics.`
    };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
