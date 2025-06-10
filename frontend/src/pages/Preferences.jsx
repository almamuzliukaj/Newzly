import "./Preferences.css";
import { useNavigate } from "react-router-dom";

// List of news categories and countries with their respective labels and flags
const preferences = [
    { category: "general", label: "📰 General News" },
    { category: "business", label: "💼 Business" },
    { category: "health", label: "🩺 Health" },
    { category: "science", label: "🔬 Science" },
    { category: "technology", label: "💻 Technology" },
    { category: "sports", label: "🏅 Sports" },
    { category: "entertainment", label: "🎬 Entertainment" },
    { category: "us", label: "United States", flag: "us" },
    { category: "gb", label: "United Kingdom", flag: "gb" },
    { category: "fr", label: "France", flag: "fr" },
    { category: "in", label: "India", flag: "in" },
    { category: "de", label: "Germany", flag: "de" },
    { category: "it", label: "Italy", flag: "it" },
    { category: "ca", label: "Canada", flag: "ca" },
    { category: "au", label: "Australia", flag: "au" },
    { category: "jp", label: "Japan", flag: "jp" },
    { category: "br", label: "Brazil", flag: "br" }
];

function Preferences() {
    // React Router's navigation hook to programmatically change routes
    const navigate = useNavigate();

    // Handle click on a preference: navigate either to country or category page
    const handleClick = (category) => {
        // If category length <= 3, treat it as a country code
        if (category.length <= 3) {
            navigate(`/country/${category}`); // Navigate to country-specific news page
        } else {
            navigate(`/top-headlines?category=${category}`); // Navigate to category news page
        }
    };

    return (
        <div className="preferences-page">
            <h2>🎯 Select Your Preferences</h2>
            <p>
                Discover news that matters to you. Click on a category or country below to explore personalized headlines.
            </p>
            <div className="preferences-grid">
                {/* Render each preference as a clickable card */}
                {preferences.map((pref) => (
                    <div
                        className="pref-card"
                        key={pref.category}
                        onClick={() => handleClick(pref.category)}
                        style={{ cursor: "pointer" }}
                    >
                        {/* If the preference has a flag, show the flag image */}
                        {pref.flag ? (
                            <div className="pref-flag">
                                <img
                                    src={`https://flagcdn.com/48x36/${pref.flag}.png`}
                                    alt={pref.label}
                                    className="flag-img"
                                />
                                <span>{pref.label}</span>
                            </div>
                        ) : (
                            // Otherwise, just display the label with emoji/icon
                            <span className="pref-icon">{pref.label}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Preferences;
