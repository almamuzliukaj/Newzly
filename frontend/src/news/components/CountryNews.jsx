import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function CountryNews() {
  const { iso } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 6;
  const GNEWS_API_KEY = 'fd6ce0d243b37b9b52e0ae591169c6b5';

  useEffect(() => {
    if (!iso) return;

    setIsLoading(true);
    setError(null);

    const primaryUrl = `https://news-aggregator-dusky.vercel.app/country/${iso}?page=${page}&pageSize=${pageSize}`;
    const fallbackUrl = `https://gnews.io/api/v4/top-headlines?token=${GNEWS_API_KEY}&lang=en&country=${iso.toLowerCase()}&max=${pageSize}&page=${page}`;

    fetch(primaryUrl)
      .then((res) => res.ok ? res.json() : Promise.reject("Primary failed"))
      .then((json) => {
        if (json.success) {
          setData(json.data.articles);
          setTotalResults(json.data.totalResults);
        } else {
          throw new Error("No success in response");
        }
      })
      .catch(() => {
        fetch(fallbackUrl)
          .then((res) => res.ok ? res.json() : Promise.reject())
          .then((json) => {
            setData(json.articles);
            setTotalResults(1000);
          })
          .catch(() => {
            setError("Failed to load news for this country.");
          });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, iso]);

  function handlePrev() {
    setPage((p) => Math.max(p - 1, 1));
  }

  function handleNext() {
    setPage((p) => p + 1);
  }

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="cards grid lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {!isLoading ? (
          data.length > 0 ? data.map((article, index) => (
            <EverythingCard key={index} {...article} source={article.source?.name} />
          )) : <p>No news articles found for this country.</p>
        ) : (
          <Loader />
        )}
      </div>

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-10 my-10">
          <button className="pagination-btn" onClick={handlePrev} disabled={page === 1}>Prev</button>
          <span>Page {page} of {Math.ceil(totalResults / pageSize)}</span>
          <button className="pagination-btn" onClick={handleNext} disabled={page >= Math.ceil(totalResults / pageSize)}>Next</button>
        </div>
      )}
    </>
  );
}

export default CountryNews;
