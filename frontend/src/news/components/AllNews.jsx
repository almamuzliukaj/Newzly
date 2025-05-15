import React, { useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function AllNews() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 6;
  const GNEWS_API_KEY = 'fd6ce0d243b37b9b52e0ae591169c6b5';
  const fallbackKeywords = ['world', 'technology', 'health', 'sports', 'business'];

  const getFallbackKeyword = () => fallbackKeywords[(page - 1) % fallbackKeywords.length];

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  useEffect(() => {
    if (data[page]) {
      setIsLoading(false);
      return; // Already cached
    }

    setIsLoading(true);
    setError(null);

    const primaryUrl = `http://localhost:5000/all-news?page=${page}&pageSize=${pageSize}`;
    const fallbackUrl = `https://gnews.io/api/v4/search?q=${getFallbackKeyword()}&token=${GNEWS_API_KEY}&lang=en&max=${pageSize}&page=${page}`;

    fetch(primaryUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Primary API failed');
        return res.json();
      })
      .then((json) => {
        if (json.success && Array.isArray(json.data.articles)) {
          setData((prev) => ({ ...prev, [page]: json.data.articles }));
          setTotalResults(json.data.totalResults || 100);
        } else {
          throw new Error('Invalid response from Primary API');
        }
      })
      .catch(() => {
        fetch(fallbackUrl)
          .then((res) => {
            if (!res.ok) throw new Error('Fallback API failed');
            return res.json();
          })
          .then((json) => {
            if (json.articles && json.articles.length > 0) {
              setData((prev) => ({ ...prev, [page]: json.articles }));
              setTotalResults(1000); // Approximation
            } else {
              throw new Error('No fallback articles');
            }
          })
          .catch(() => {
            setError('Failed to fetch news. Showing previously loaded articles if available.');
          });
      })
      .finally(() => setIsLoading(false));
  }, [page]);

  const currentArticles = data[page] || [];

  return (
    <>
      {error && (
        <div className="text-red-500 text-center my-6">
          {error}
        </div>
      )}

      <div className="cards grid lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {currentArticles.length > 0 ? (
          currentArticles.map((article, index) => (
            <EverythingCard
              key={index}
              title={article.title}
              description={article.description}
              imgUrl={article.urlToImage || article.image}
              publishedAt={article.publishedAt}
              url={article.url}
              author={article.author || article.source?.name}
              source={article.source?.name || 'Unknown'}
            />
          ))
        ) : isLoading ? (
          <Loader />
        ) : (
          <p className="text-center w-full text-gray-500">No articles available for this page.</p>
        )}
      </div>

      {!isLoading && currentArticles.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className="pagination-btn" onClick={handlePrev}>
            &larr; Prev
          </button>
          <p className="font-semibold opacity-80">
            Page {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className="pagination-btn"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default AllNews;
