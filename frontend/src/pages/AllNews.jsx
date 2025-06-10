import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import EverythingCard from "../components/EverythingCard";
import Loader from "../components/Loader";
import ToastNotification from "../components/ToastNotification";

function AllNews() {
  // State to hold news articles and metadata
  const [news, setNews] = useState({ articles: [] });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 6; // Number of articles per page
  const [loading, setLoading] = useState(true);
  const [showCacheNotice, setShowCacheNotice] = useState(false);
  const cacheNoticeKey = "has-shown-cache-notice"; // Shared key for the whole app

  useEffect(() => {
    // Async function to fetch news from API
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/news/all?page=${page}&pageSize=${pageSize}`
        );
        // Fallback to empty articles if no data received
        const data = res.data?.data || { totalResults: 0, articles: [] };
        setNews(data);
        setTotal(data.totalResults);

        // Show notice if data is from cache and user hasn't seen the notice yet
        if (
          res.data?.fromCache === true &&
          localStorage.getItem(cacheNoticeKey) !== "true"
        ) {
          setShowCacheNotice(true);
          localStorage.setItem(cacheNoticeKey, "true");
        }
      } catch (err) {
        // Log error and reset news state on failure
        console.error("Error fetching all news:", err);
        setNews({ articles: [] });
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  // Calculate total pages based on total results and page size
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="news-page">
      <h2>🌍 All News</h2>

      {/* Show toast notification if API data is cached */}
      {showCacheNotice && (
        <ToastNotification
          message="The API is currently unavailable. News data is being retrieved directly from the database (MongoDB Atlas)."
          onClose={() => setShowCacheNotice(false)}
        />
      )}

      {loading ? (
        // Show loader while fetching data
        <Loader />
      ) : (
        <>
          {/* Display list of news articles */}
          <div className="news-grid">
            {(news?.articles || []).map((article, idx) => (
              <EverythingCard key={idx} article={article} />
            ))}
          </div>

          {/* Pagination controls if more than one page */}
          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Prev
              </button>
              <span style={{ padding: "0.5rem 1rem", fontWeight: "bold" }}>
                Page {page} of {totalPages}
              </span>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllNews;
