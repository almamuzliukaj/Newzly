// Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  // State to toggle the mobile navigation menu
  const [isOpen, setIsOpen] = useState(false);
  
  // React Router hook to programmatically navigate
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    // Remove token and cache notice from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("has-shown-cache-notice");
    // Remove token from session storage as well
    sessionStorage.removeItem("token");
    // Redirect user to login page
    navigate("/login");
  };

  // Array of countries with code and name for the country dropdown menu
  const countries = [
    { code: "us", name: "United States" },
    { code: "gb", name: "United Kingdom" },
    { code: "fr", name: "France" },
    { code: "in", name: "India" },
    { code: "de", name: "Germany" },
    { code: "it", name: "Italy" },
    { code: "ca", name: "Canada" },
    { code: "au", name: "Australia" },
    { code: "jp", name: "Japan" },
    { code: "br", name: "Brazil" },
  ];

  return (
    <header className="site-header">
      {/* Site logo with emoji */}
      <h1 className="logo">📰 Newzly</h1>

      {/* Hamburger button shown when menu is closed */}
      {!isOpen && (
        <button className="hamburger" onClick={() => setIsOpen(true)}>
          ☰
        </button>
      )}

      {/* Overlay that closes the menu when clicked */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Navigation links container; toggles "open" class when menu is open */}
      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        {/* Close button inside the menu */}
        {isOpen && (
          <span className="close-text" onClick={() => setIsOpen(false)}>
            ✖ Close
          </span>
        )}

        {/* Link to all news */}
        <Link to="/all-news" onClick={() => setIsOpen(false)}>
          All News
        </Link>

        {/* Link to preferences page */}
        <Link to="/preferences" onClick={() => setIsOpen(false)}>
          Preferences
        </Link>

        {/* Dropdown for Top Headlines categories */}
        <div className="dropdown">
          <button className="dropbtn">Top Headlines ▾</button>
          <div className="dropdown-content">
            <Link to="/top-headlines?category=general" onClick={() => setIsOpen(false)}>
              📰 General
            </Link>
            <Link to="/top-headlines?category=business" onClick={() => setIsOpen(false)}>
              💼 Business
            </Link>
            <Link to="/top-headlines?category=health" onClick={() => setIsOpen(false)}>
              🩺 Health
            </Link>
            <Link to="/top-headlines?category=sports" onClick={() => setIsOpen(false)}>
              🏅 Sports
            </Link>
            <Link to="/top-headlines?category=technology" onClick={() => setIsOpen(false)}>
              💻 Technology
            </Link>
            <Link to="/top-headlines?category=entertainment" onClick={() => setIsOpen(false)}>
              🎬 Entertainment
            </Link>
          </div>
        </div>

        {/* Dropdown for selecting country */}
        <div className="dropdown">
          <button className="dropbtn">Country ▾</button>
          <div className="dropdown-content">
            {/* Map over countries array to create links with flags */}
            {countries.map((country) => (
              <Link
                key={country.code}
                to={`/country/${country.code}`}
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={`https://flagcdn.com/24x18/${country.code}.png`}
                  alt={country.name}
                  style={{
                    width: "24px",
                    height: "18px",
                    marginRight: "8px",
                    verticalAlign: "middle",
                    borderRadius: "2px",
                  }}
                />
                {country.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Logout button with SVG icon */}
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="logout-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
            />
          </svg>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
