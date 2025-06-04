import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import EverythingCard from "../components/EverythingCard";
import Loader from "../components/Loader";
import "./TopHeadlines.css";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 6;

  const category = searchParams.get("category") || "general";

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/news/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}`
        );
        setHeadlines(res.data.data.articles);
        setTotal(res.data.data.totalResults);
      } catch (err) {
        console.error("Error fetching top headlines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, [category, page]);

  const totalPages = Math.ceil(total / pageSize);

  const handleCategoryClick = (cat) => {
    setSearchParams({ category: cat });
    setPage(1);
  };

  return (
    <div className="news-page">
      <h2>🔥 Top Headlines</h2>

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className={`category-btn ${category === cat.name ? "selected" : ""}`}
          >
            <span className="icon">{cat.emoji}</span> {cat.name.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="news-grid">
            {headlines.map((article, idx) => (
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

            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TopHeadlines;
