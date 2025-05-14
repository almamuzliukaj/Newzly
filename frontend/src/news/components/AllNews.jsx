import { React, useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 6;

  const GNEWS_API_KEY = 'fd6ce0d243b37b9b52e0ae591169c6b5';
  const fallbackGNewsUrl = `https://gnews.io/api/v4/top-headlines?token=${GNEWS_API_KEY}&lang=en&country=us&max=${pageSize}&page=${page}`;

  function handlePrev() {
    setPage(prev => Math.max(prev - 1, 1));
  }

  function handleNext() {
    setPage(prev => prev + 1);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const primaryUrl = `http://localhost:5000/all-news?page=${page}&pageSize=${pageSize}`;

    fetch(primaryUrl)
      .then(response => {
        if (!response.ok) throw new Error('Primary API failed');
        return response.json();
      })
      .then(json => {
        if (json.success) {
          setTotalResults(json.data.totalResults);
          setData(json.data.articles);
        } else {
          throw new Error('Primary API returned failure');
        }
      })
      .catch(primaryError => {
        console.warn("Primary API failed, trying backup...", primaryError.message);
        fetch(fallbackGNewsUrl)
          .then(res => {
            if (!res.ok) throw new Error("Backup API failed");
            return res.json();
          })
          .then(backupJson => {
            if (backupJson.articles) {
              setData(backupJson.articles);
              setTotalResults(1000); // fallback estimate
            } else {
              throw new Error("No articles from backup API");
            }
          })
          .catch(backupError => {
            console.error("Both APIs failed", backupError);
            setError("Failed to fetch news. Please try again later.");
          });
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [page]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="cards grid lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {!isLoading ? data.map((element, index) => (
          <EverythingCard
            title={element.title}
            description={element.description}
            imgUrl={element.urlToImage || element.image}
            publishedAt={element.publishedAt}
            url={element.url}
            author={element.author || (element.source && element.source.name)}
            source={element.source?.name || "Unknown"}
            key={index}
          />
        )) : <Loader />}
      </div>

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className='pagination-btn text-center'
            onClick={handlePrev}
          >
            &larr; Prev
          </button>

          <p className='font-semibold opacity-80'>
            Page {page} of {Math.ceil(totalResults / pageSize)}
          </p>

          <button
            className='pagination-btn text-center'
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
