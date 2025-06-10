import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import EverythingCard from "../components/EverythingCard";
import Loader from "../components/Loader";
import "./TopHeadlines.css";
import ToastNotification from "../components/ToastNotification";

// List of news categories with corresponding emoji icons
const categories = [
  { name: "general", emoji: "📰" },
  { name: "business", emoji: "💼" },
  { name: "health", emoji: "🩺" },
  { name: "science", emoji: "🔬" },
  { name: "technology", emoji: "💻" },
  { name: "sports", emoji: "🏅" },
  { name: "entertainment", emoji: "🎬" },
];

function TopHeadlines() {
  // Hook to read and set URL search parameters (query params)
  const [searchParams, setSearchParams] = useSearchParams();

  // State variables to store news articles, loading status, current page, total results, and cache notice visibility
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCacheNotice, setShowCacheNotice] = useState(false);

  // Number of articles per page for pagination
  const pageSize = 6;

  // Extract category from URL params or fallback to 'general'
  const category = searchParams.get("category") || "general";

  // Key used to track if the cache notice has been shown before (in localStorage)
  const cacheNoticeKey = "has-shown-cache-notice";

  // Reset page to 1 whenever the category changes
  useEffect(() => {
    setPage(1);
  }, [category]);

  // Fetch news articles from API whenever category or page changes
  useEffect(() => {
    const fetchHeadlines = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/news/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}`
        );
        setHeadlines(res.data.data.articles);
        setTotal(res.data.data.totalResults);

        // Show cache notice once if data is loaded from cache
        if (
          res.data?.fromCache === true &&
          localStorage.getItem(cacheNoticeKey) !== "true"
        ) {
          setShowCacheNotice(true);
          localStorage.setItem(cacheNoticeKey, "true");
        }
      } catch (err) {
        console.error("Error fetching top headlines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, [category, page]);

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(total / pageSize);

  // Handle page change when user clicks pagination buttons
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle category selection button click
  const handleCategoryClick = (catName) => {
    setSearchParams({ category: catName });
  };

  return (
    <div className="top-headlines-page">
      <h2>🗞️ Top Headlines</h2>

      {/* Category filter buttons */}
      <div className="category-buttons">
        {categories.map(({ name, emoji }) => (
          <button
            key={name}
            className={`category-btn ${category === name ? "selected" : ""}`}
            onClick={() => handleCategoryClick(name)}
          >
            <span className="icon">{emoji}</span> {name}
          </button>
        ))}
      </div>

      {/* Show loader while loading */}
      {loading && <Loader />}

      {/* Display articles grid */}
      {!loading && (
        <>
          <div className="news-grid">
            {headlines.map((article, index) => (
              <EverythingCard key={index} article={article} />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Show cache notification */}
      {showCacheNotice && (
        <ToastNotification
          message="Info: Data is served from cache for faster loading."
          onClose={() => setShowCacheNotice(false)}
        />
      )}
    </div>
  );
}

export default TopHeadlines;
