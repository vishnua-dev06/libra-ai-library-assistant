/**
 * Service to interact with the public Open Library API
 * Provides live search by title, author, subject, and keyword.
 */

const OPEN_LIBRARY_BASE = "https://openlibrary.org";

/**
 * Normalizes Open Library search response items to match LibraAI schema
 */
function normalizeOpenLibraryDoc(doc) {
  const coverId = doc.cover_i;
  const isbn = doc.isbn && doc.isbn.length > 0 ? doc.isbn[0] : null;
  
  let coverUrl = null;
  if (coverId) {
    coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  } else if (isbn) {
    coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  }

  const authors = doc.author_name ? doc.author_name.join(", ") : "Unknown Author";
  const subjects = doc.subject ? doc.subject.slice(0, 5) : [];
  
  return {
    bookId: `OL-${doc.key?.replace("/works/", "") || Math.random().toString(36).substring(2, 9)}`,
    openLibraryKey: doc.key,
    title: doc.title || "Untitled Book",
    author: authors,
    year: doc.first_publish_year || doc.publish_year?.[0] || "Unknown",
    isbn: isbn || "N/A",
    edition: doc.edition_count ? `${doc.edition_count} editions` : "Standard Edition",
    cover: coverUrl,
    tags: subjects,
    category: determineCategoryFromSubjects(subjects, doc.title),
    subCategory: subjects[0] || "General Reading",
    difficulty: "Intermediate",
    rating: doc.ratings_average ? Number(doc.ratings_average.toFixed(1)) : 4.5,
    description: doc.first_sentence?.[0] || (doc.subtitle ? `${doc.title}: ${doc.subtitle}` : "Available in global Open Library catalog archive."),
    isExternal: true, // Clearly marked as external Open Library item
    totalCopies: 0,
    availableCopies: 0,
    shelfLocation: "External Catalog (Digital / Inter-Library Loan)",
    keyTopics: subjects.slice(0, 4)
  };
}

function determineCategoryFromSubjects(subjects = [], title = "") {
  const text = `${subjects.join(" ")} ${title}`.toLowerCase();
  if (text.includes("python") || text.includes("programming") || text.includes("software") || text.includes("code") || text.includes("algorithm")) return "Programming";
  if (text.includes("machine learning") || text.includes("deep learning") || text.includes("artificial intelligence") || text.includes("neural") || text.includes("data science")) return "AI/ML";
  if (text.includes("embedded") || text.includes("microcontroller") || text.includes("arm") || text.includes("arduino") || text.includes("rtos")) return "Embedded Systems";
  if (text.includes("electronics") || text.includes("circuit") || text.includes("semiconductor") || text.includes("analog") || text.includes("vlsi")) return "Electronics";
  if (text.includes("communication") || text.includes("network") || text.includes("wireless") || text.includes("telecom") || text.includes("signal")) return "Communication";
  if (text.includes("math") || text.includes("calculus") || text.includes("algebra") || text.includes("discrete") || text.includes("geometry") || text.includes("statistics")) return "Mathematics";
  if (text.includes("fiction") || text.includes("novel") || text.includes("science fiction") || text.includes("fantasy") || text.includes("space")) return "Fiction";
  return "General";
}

/**
 * Searches Open Library with timeout & error safety
 */
export async function searchOpenLibrary({ query = "", type = "all", limit = 12 } = {}) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  let param = "q";
  if (type === "title") param = "title";
  else if (type === "author") param = "author";
  else if (type === "subject") param = "subject";

  const url = `${OPEN_LIBRARY_BASE}/search.json?${param}=${encodeURIComponent(query.trim())}&limit=${limit}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Open Library API responded with status ${res.status}`);
    }

    const data = await res.json();
    if (!data.docs || !Array.isArray(data.docs)) {
      return [];
    }

    return data.docs.map(normalizeOpenLibraryDoc);
  } catch (error) {
    console.warn("Open Library search failed or timed out:", error.message);
    return [];
  }
}

/**
 * Fetches book description from Open Library work endpoint
 */
export async function fetchWorkDetails(workKey) {
  if (!workKey) return null;
  const cleanKey = workKey.startsWith("/works/") ? workKey : `/works/${workKey}`;
  const url = `${OPEN_LIBRARY_BASE}${cleanKey}.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();

    let description = "";
    if (typeof data.description === "string") {
      description = data.description;
    } else if (data.description && typeof data.description.value === "string") {
      description = data.description.value;
    }

    return {
      description: description || "No detailed synopsis available in public record.",
      subjects: data.subjects || [],
      title: data.title
    };
  } catch (err) {
    return null;
  }
}
