import "./Preferences.css";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const handleClick = (category) => {
        if (category.length <= 3) {
            navigate(`/country/${category}`);
        } else {
            navigate(`/top-headlines?category=${category}`);
        }
    };

    return (
        <div className="preferences-page">
            <h2>🎯 Select Your Preferences</h2>
            <p>
                Discover news that matters to you. Click on a category or country below to explore personalized headlines.
            </p>
            <div className="preferences-grid">
                {preferences.map((pref) => (
                    <div
                        className="pref-card"
                        key={pref.category}
                        onClick={() => handleClick(pref.category)}
                        style={{ cursor: "pointer" }}
                    >
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
                            <span className="pref-icon">{pref.label}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Preferences;