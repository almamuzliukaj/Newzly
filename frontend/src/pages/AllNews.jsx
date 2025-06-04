import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import EverythingCard from "../components/EverythingCard";
import Loader from "../components/Loader";

function AllNews() {
  const [news, setNews] = useState({ articles: [] });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/news/all?page=${page}&pageSize=${pageSize}`);
        const data = res.data?.data || { totalResults: 0, articles: [] };
        setNews(data);
        setTotal(data.totalResults);
      } catch (err) {
        console.error("Error fetching all news:", err);
        setNews({ articles: [] });
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="news-page">
      <h2>🌍 All News</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="news-grid">
            {(news?.articles || []).map((article, idx) => (
              <EverythingCard key={idx} article={article} />
            ))}
          </div>
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
