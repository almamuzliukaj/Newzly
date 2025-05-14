import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from "./Loader";

function TopHeadlines() {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6;
  const GNEWS_API_KEY = 'fd6ce0d243b37b9b52e0ae591169c6b5';

  useEffect(() => {
    if (!category) return;

    setIsLoading(true);
    setError(null);

    const primaryUrl = `http://localhost:5000/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}`;
    const fallbackUrl = `https://gnews.io/api/v4/search?q=${category}&token=${GNEWS_API_KEY}&lang=en&max=${pageSize}&page=${page}`;

    fetch(primaryUrl)
      .then((res) => res.ok ? res.json() : Promise.reject("Primary API failed"))
      .then((json) => {
        if (json.success && json.data.articles.length > 0) {
          // ✅ RENDITJA NGA MË E RE TE MË E VJETRA
          const sortedArticles = json.data.articles.sort((a, b) => {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });
          setData(sortedArticles);
          setTotalResults(json.data.totalResults);
        } else {
          throw new Error("Primary API returned no articles");
        }
      })
      .catch(() => {
        fetch(fallbackUrl)
          .then((res) => res.ok ? res.json() : Promise.reject("Fallback API failed"))
          .then((json) => {
            if (json.articles && json.articles.length > 0) {
              const sortedFallback = json.articles.sort((a, b) => {
                return new Date(b.publishedAt) - new Date(a.publishedAt);
              });
              setData(sortedFallback);
              setTotalResults(1000);
            } else {
              throw new Error("No articles in fallback");
            }
          })
          .catch(() => {
            setError("Nuk u gjetën lajme për këtë kategori. Provo më vonë.");
            setData([]);
            setTotalResults(0);
          });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, category]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  return (
    <>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      <div className="cards grid lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((article, index) => (
              <EverythingCard
                key={index}
                title={article.title}
                description={article.description}
                imgUrl={article.urlToImage || article.image}
                publishedAt={article.publishedAt}
                url={article.url}
                author={article.author || article.source?.name}
                source={article.source?.name || "Unknown"}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">Nuk ka lajme për këtë kategori.</p>
          )
        ) : (
          <Loader />
        )}
      </div>

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-10 my-10 items-center">
          <button
            className="pagination-btn"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="font-semibold opacity-80">
            Page {page} of {Math.ceil(totalResults / pageSize)}
          </span>
          <button
            className="pagination-btn"
            onClick={handleNext}
            disabled={page >= Math.ceil(totalResults / pageSize)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default TopHeadlines;
