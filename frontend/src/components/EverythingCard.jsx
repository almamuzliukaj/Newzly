import "./EverythingCard.css";

function EverythingCard({ article }) {
  const { title, description, urlToImage, url, author, publishedAt, source } = article;
  const isValidUrl = urlToImage && urlToImage.startsWith("http");

  return (
    <div className="card">
      <img
        src={isValidUrl ? urlToImage : "https://via.placeholder.com/300x180?text=No+Image"}
        alt={title}
        className="card-img"
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
