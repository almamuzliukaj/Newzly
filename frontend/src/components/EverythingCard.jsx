import "./EverythingCard.css";

function EverythingCard({ article }) {
  const { title, description, urlToImage, url, author, publishedAt, source } = article;
  const isValidUrl = urlToImage && urlToImage.startsWith("http");

  return (
    <div className="card">
      <img
        src={
          article.urlToImage && article.urlToImage.startsWith("http")
            ? article.urlToImage
            : "/placeholder.jpg"
        }
        alt="news"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.jpg";
        }}
      />

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description || "No description available."}</p>
        <p className="card-meta">
          <strong>Source:</strong> {source?.name || "Unknown"}<br />
          <strong>Author:</strong> {author || "Anonymous"}<br />
          <strong>Published At:</strong> {new Date(publishedAt).toLocaleString()}
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="card-link">
          Read more →
        </a>
      </div>
    </div>
  );
}

export default EverythingCard;
