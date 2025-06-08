import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import EverythingCard from "../components/EverythingCard";
import Loader from "../components/Loader";
import "./TopHeadlines.css";
import ToastNotification from "../components/ToastNotification";

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

  const countryName = countryMap[iso.toLowerCase()] || iso.toUpperCase();
  const flagUrl = `https://flagcdn.com/48x36/${iso.toLowerCase()}.png`;

  useEffect(() => {
    setPage(1);
  }, [iso]);

  useEffect(() => {
    const fetchCountryNews = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${API_BASE_URL}/news/country/${iso}?page=${page}&pageSize=${pageSize}`
        );
        if (res.data && res.data.data) {
          setNews(res.data.data.articles);
          setTotal(res.data.data.totalResults || 0);
          if (res.data?.fromCache === true) setShowCacheNotice(true);
        } else {
          setNews([]);
          setError("No data received.");
        }
      } catch (err) {
        console.error(`Error fetching country (${iso}) news:`, err);
        setError("Failed to fetch news for this country.");
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryNews();
  }, [iso, page]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      (news.length >= pageSize
        ? total
        : (page - 1) * pageSize + news.length) / pageSize
    )
  );

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

      {showCacheNotice && (
        <ToastNotification
          message="The API is currently unavailable. News data is being retrieved directly from the database (MongoDB Atlas)."
          onClose={() => setShowCacheNotice(false)}
        />
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: "crimson", textAlign: "center", marginTop: "2rem" }}>
          {error}
        </p>
      ) : news.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No news found for {countryName}.
        </p>
      ) : (
        <>
          <div className="news-grid">
            {news.map((article, idx) => (
              <EverythingCard key={idx} article={article} />
            ))}
          </div>
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
