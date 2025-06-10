import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import EverythingCard from "../components/EverythingCard";
import Loader from "../components/Loader";
import "./TopHeadlines.css";
import ToastNotification from "../components/ToastNotification";

// Mapping country codes to full country names
const countryMap = {
  us: "United States",
  gb: "United Kingdom",
  fr: "France",
  de: "Germany",
  it: "Italy",
  br: "Brazil",
  ca: "Canada",
  au: "Australia",
  in: "India",
  jp: "Japan",
};

function CountryNews() {
  const { iso } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCacheNotice, setShowCacheNotice] = useState(false);
  const pageSize = 6;

  // Get the full country name or fallback to uppercase code
  const countryName = countryMap[iso.toLowerCase()] || iso.toUpperCase();
  // Flag image URL based on country code
  const flagUrl = `https://flagcdn.com/48x36/${iso.toLowerCase()}.png`;

  const cacheNoticeKey = "has-shown-cache-notice"; // Stored once for entire app

  useEffect(() => {
    // Reset page to 1 when country changes
    setPage(1);
  }, [iso]);

  useEffect(() => {
    // Fetch news for the selected country and page
    const fetchCountryNews = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(
          `${API_BASE_URL}/news/country/${iso}?page=${page}&pageSize=${pageSize}`
        );

        if (res.data && res.data.data) {
          // Remove duplicate articles by title
          const uniqueArticles = Array.from(
            new Map(
              res.data.data.articles.map((item) => [item.title, item])
            ).values()
          );

          setNews(uniqueArticles);
          setTotal(res.data.data.totalResults || 0);

          // Show cache notice once if data is from cache
          if (
            res.data?.fromCache === true &&
            localStorage.getItem(cacheNoticeKey) !== "true"
          ) {
            setShowCacheNotice(true);
            localStorage.setItem(cacheNoticeKey, "true");
          }
        } else {
          setNews([]);
          setError("No data received.");
        }
      } catch (err) {
        // Handle errors and reset news list
        console.error(`Error fetching country (${iso}) news:`, err);
        setError("Failed to fetch news for this country.");
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryNews();
  }, [iso, page]);

  // Calculate total pages for pagination
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="news-page">
      <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        📍 News from {countryName}
        <img
          src={flagUrl}
          alt={iso.toUpperCase()}
          style={{ width: "32px", height: "24px", borderRadius: "3px" }}
        />
      </h2>

      {/* Display cache notice toast if applicable */}
      {showCacheNotice && (
        <ToastNotification
          message="The API is currently unavailable. News data is being retrieved directly from the database (MongoDB Atlas)."
          onClose={() => setShowCacheNotice(false)}
        />
      )}

      {loading ? (
        // Show loader during data fetch
        <Loader />
      ) : error ? (
        // Show error message if fetch failed
        <p style={{ color: "crimson", textAlign: "center", marginTop: "2rem" }}>
          {error}
        </p>
      ) : news.length === 0 ? (
        // Show message if no news articles found
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No news found for {countryName}.
        </p>
      ) : (
        <>
          {/* Render news articles */}
          <div className="news-grid">
            {news.map((article, idx) => (
              <EverythingCard key={idx} article={article} />
            ))}
          </div>
          {/* Pagination controls */}
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <span style={{ padding: "0.5rem 1rem", fontWeight: "bold" }}>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CountryNews;
