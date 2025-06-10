import "./EverythingCard.css";

function EverythingCard({ article }) {
  // Destructure article properties for easier access
  const { title, description, urlToImage, url, author, publishedAt, source } = article;

  // Check if the image URL is valid (starts with http)
  const isValidUrl = urlToImage && urlToImage.startsWith("http");

  return (
    <div className="card">
      <img
        src={
          // Use valid image URL or fallback to placeholder
          article.urlToImage && article.urlToImage.startsWith("http")
            ? article.urlToImage
            : "/placeholder.jpg"
        }
        alt="news" // Alt text for accessibility
        onError={(e) => {
          // Fallback image if original fails to load
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = "/placeholder.jpg";
        }}
      />

      <div className="card-body">
        <h3 className="card-title">{title}</h3> {/* Article title */}
        <p className="card-description">{description || "No description available."}</p> {/* Description or fallback */}
        <p className="card-meta">
          <strong>Source:</strong> {source?.name || "Unknown"}<br />
          <strong>Author:</strong> {author || "Anonymous"}<br />
          {/* Format published date to local string */}
          <strong>Published At:</strong> {new Date(publishedAt).toLocaleString()}
        </p>
        {/* Link opens article in new tab with security attributes */}
        <a href={url} target="_blank" rel="noopener noreferrer" className="card-link">
          Read more →
        </a>
      </div>
    </div>
  );
}

export default EverythingCard;
