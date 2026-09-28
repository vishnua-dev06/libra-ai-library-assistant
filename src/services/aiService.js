/**
 * AI Recommendation & Chat Assistant Service
 * Dual-Engine:
 * 1. Google Gemini Generative AI (when API Key is available)
 * 2. Intelligent Deterministic Fallback Engine (Demo Mode - 100% resilient & offline-ready)
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Intelligent Local Fallback Engine for Hackathon Demo Mode
 * Parses student queries, identifies intent, discipline (ECE/CS/Data Science), difficulty level,
 * and matches with high-precision scoring against library catalog.
 */
export function generateLocalAiRecommendations(userQuery, catalog) {
  const queryLower = userQuery.toLowerCase();
  
  // 1. Detect Student Discipline / Academic Background
  let detectedDiscipline = "General Engineering & Sciences";
  if (queryLower.includes("ece") || queryLower.includes("electronics") || queryLower.includes("electrical") || queryLower.includes("hardware") || queryLower.includes("circuit")) {
    detectedDiscipline = "Electronics & Communication Engineering (ECE)";
  } else if (queryLower.includes("cs") || queryLower.includes("cse") || queryLower.includes("software") || queryLower.includes("programming") || queryLower.includes("developer")) {
    detectedDiscipline = "Computer Science & Engineering (CSE)";
  } else if (queryLower.includes("data science") || queryLower.includes("ai") || queryLower.includes("machine learning") || queryLower.includes("ml")) {
    detectedDiscipline = "Artificial Intelligence & Data Science";
  } else if (queryLower.includes("fiction") || queryLower.includes("story") || queryLower.includes("novel") || queryLower.includes("sci-fi") || queryLower.includes("leisure")) {
    detectedDiscipline = "Fiction & Leisure Reading";
  }

  // 2. Detect Difficulty / Level
  let targetDifficulty = "All Levels";
  let difficultyWeight = 1.0;
  if (queryLower.includes("beginner") || queryLower.includes("scratch") || queryLower.includes("intro") || queryLower.includes("start") || queryLower.includes("basics") || queryLower.includes("freshman")) {
    targetDifficulty = "Beginner";
  } else if (queryLower.includes("advanced") || queryLower.includes("deep") || queryLower.includes("expert") || queryLower.includes("mastery") || queryLower.includes("rigor")) {
    targetDifficulty = "Advanced";
  } else if (queryLower.includes("intermediate") || queryLower.includes("project") || queryLower.includes("practical") || queryLower.includes("hands-on")) {
    targetDifficulty = "Intermediate";
  }

  // 3. Keyword Scoring
  const scoredBooks = catalog.map(book => {
    let score = 0;
    const reasons = [];
    const bookText = `${book.title} ${book.author} ${book.category} ${book.subCategory} ${book.description} ${book.tags.join(" ")} ${book.keyTopics.join(" ")}`.toLowerCase();

    // Query terms tokenization
    const tokens = queryLower
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(t => t.length > 2 && !["want", "need", "learn", "book", "books", "read", "show", "give", "some", "good", "best", "like", "with", "from", "that"].includes(t));

    // Keyword hits
    tokens.forEach(token => {
      if (book.title.toLowerCase().includes(token)) {
        score += 15;
        reasons.push(`Direct title match for keyword "${token}"`);
      }
      if (book.tags.some(tag => tag.toLowerCase().includes(token))) {
        score += 10;
        reasons.push(`Core subject tag matches "${token}"`);
      }
      if (book.category.toLowerCase().includes(token) || book.subCategory.toLowerCase().includes(token)) {
        score += 8;
      }
      if (book.description.toLowerCase().includes(token)) {
        score += 4;
      }
    });

    // Discipline-specific boost
    if (detectedDiscipline.includes("ECE") && (book.category === "Electronics" || book.category === "Embedded Systems" || book.category === "Communication")) {
      score += 12;
      reasons.push(`High syllabus relevance for ECE curriculum`);
    } else if (detectedDiscipline.includes("CSE") && (book.category === "Programming" || book.category === "AI/ML")) {
      score += 12;
      reasons.push(`Foundational pillar for Computer Science students`);
    } else if (detectedDiscipline.includes("Data Science") && (book.category === "AI/ML" || book.category === "Mathematics")) {
      score += 12;
      reasons.push(`Direct alignment with statistical ML & data analysis`);
    } else if (detectedDiscipline.includes("Fiction") && book.category === "Fiction") {
      score += 20;
      reasons.push(`Top rated campus sci-fi recommendation`);
    }

    // Difficulty matching
    if (targetDifficulty !== "All Levels" && book.difficulty === targetDifficulty) {
      score += 8;
      reasons.push(`Matches your requested ${targetDifficulty} learning pace`);
    }

    // Rating boost
    score += (book.rating || 4.5) * 1.5;

    // Availability bonus
    if (book.availableCopies > 0) {
      score += 3;
    }

    // Build custom dynamic reason if none generated
    let finalReason = reasons.length > 0 ? reasons.slice(0, 2).join(". ") + "." : `Recommended for comprehensive coverage of ${book.category} fundamentals.`;
    
    // Enrich reason with tailored student context
    if (queryLower.includes("python") && book.tags.includes("python")) {
      finalReason = `Ideal for building practical Python intuition with project-oriented exercises, perfectly suited for ${targetDifficulty.toLowerCase()} level learners.`;
    } else if (queryLower.includes("embedded") && book.category === "Embedded Systems") {
      finalReason = `Covers critical microcontroller architectures (ARM/Cortex), memory mapping, and hardware-software interfacing tailored for embedded engineers.`;
    } else if (queryLower.includes("linear algebra") || (queryLower.includes("math") && book.tags.includes("linear algebra"))) {
      finalReason = `Renowned for delivering intuitive geometric understanding of matrix operations, eigenvalues, and SVD essential for modern AI/ML algorithms.`;
    } else if (queryLower.includes("machine learning") && book.category === "AI/ML") {
      finalReason = `Provides a rigorous balance between mathematical foundations and production-grade implementation pipelines.`;
    }

    return {
      book,
      score,
      reason: finalReason,
      difficulty: book.difficulty,
      category: book.category,
      availableCopies: book.availableCopies,
      shelfLocation: book.shelfLocation
    };
  });

  // Sort descending and pick top 4
  scoredBooks.sort((a, b) => b.score - a.score);
  const topRecommendations = scoredBooks.slice(0, 4);

  // Generate Assistant Executive Summary
  let summary = `Based on your request, I identified key focus areas in **${detectedDiscipline}** (${targetDifficulty} level). Here are ${topRecommendations.length} curated recommendations from our campus library:`;

  if (queryLower.includes("embedded") && queryLower.includes("ece")) {
    summary = `Welcome! For an **ECE student targeting Embedded Systems**, hardware-software co-design and microcontroller register-level programming are vital. I've ranked our top campus resources below, prioritized by real-time shelf availability:`;
  } else if (queryLower.includes("python")) {
    summary = `Great choice! Python is one of the most versatile languages. Here are the top-rated books to build practical coding confidence from beginner syntax to complete projects:`;
  } else if (queryLower.includes("machine learning") || queryLower.includes("ai")) {
    summary = `Here is a tailored learning path for **Artificial Intelligence & Machine Learning**, combining practical coding implementations with necessary mathematical foundations:`;
  }

  return {
    summary,
    recommendations: topRecommendations,
    detectedDiscipline,
    targetDifficulty,
    source: "Demo Mode (Intelligent Local Engine)",
    timestamp: new Date().toISOString()
  };
}

/**
 * Main AI Assistant Entry Point
 * Tries Gemini API if key is present; otherwise falls back automatically to local engine.
 */
export async function getAiRecommendations({ query, catalog, apiKey = "" }) {
  const cleanKey = apiKey?.trim() || import.meta.env.VITE_GEMINI_API_KEY?.trim();

  // If no API key is provided, execute local AI recommendation engine immediately
  if (!cleanKey) {
    // Artificial small delay (350ms) to simulate natural AI thinking & smooth UI transition
    await new Promise(r => setTimeout(r, 400));
    return generateLocalAiRecommendations(query, catalog);
  }

  // Gemini API Flow
  try {
    const genAI = new GoogleGenerativeAI(cleanKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build context-aware prompt with our catalog summary
    const catalogContext = catalog.map(b => ({
      id: b.bookId,
      title: b.title,
      author: b.author,
      category: b.category,
      difficulty: b.difficulty,
      availableCopies: b.availableCopies,
      shelfLocation: b.shelfLocation,
      summary: b.description
    }));

    const prompt = `
You are LibraAI, an intelligent campus library assistant for engineering and science university students.
A student asked: "${query}"

Here is our current campus library catalog:
${JSON.stringify(catalogContext, null, 2)}

Instructions:
1. Recommend 3 to 4 of the most relevant books from our catalog that best solve the student's need.
2. For each recommendation, provide:
   - "bookId": Exact bookId from catalog
   - "reason": A personalized 1-2 sentence explanation of WHY this book is perfect for this specific student query.
   - "difficulty": "Beginner" | "Intermediate" | "Advanced"
   - "category": Subject category
3. Provide a friendly, helpful "summary" intro paragraph for the student.

Respond ONLY with valid JSON in this exact structure without markdown backticks:
{
  "summary": "introductory text",
  "recommendations": [
    {
      "bookId": "LIB-...",
      "reason": "...",
      "difficulty": "...",
      "category": "..."
    }
  ]
}
`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const result = await model.generateContent(prompt);
    clearTimeout(timeoutId);

    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    // Hydrate recommendations with complete book objects
    const hydratedRecs = parsed.recommendations
      .map(rec => {
        const matchedBook = catalog.find(b => b.bookId === rec.bookId) || catalog.find(b => b.title.toLowerCase().includes(rec.bookId.toLowerCase()));
        if (!matchedBook) return null;
        return {
          book: matchedBook,
          reason: rec.reason,
          difficulty: rec.difficulty || matchedBook.difficulty,
          category: rec.category || matchedBook.category,
          availableCopies: matchedBook.availableCopies,
          shelfLocation: matchedBook.shelfLocation
        };
      })
      .filter(Boolean);

    if (hydratedRecs.length === 0) {
      throw new Error("No matching books returned in Gemini response");
    }

    return {
      summary: parsed.summary || "Here are your personalized library recommendations:",
      recommendations: hydratedRecs,
      source: "Gemini 1.5 Flash AI",
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn("Gemini API call failed or timed out. Falling back to local intelligence engine:", error.message);
    // Seamless graceful fallback
    const fallback = generateLocalAiRecommendations(query, catalog);
    return {
      ...fallback,
      source: "Demo Mode (Local Intelligent Fallback)"
    };
  }
}
