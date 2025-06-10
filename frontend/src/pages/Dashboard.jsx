import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>📊 Welcome to Your News Dashboard</h2>
      {/* Navigation links to main news sections */}
      <div className="dashboard-links">
        <Link to="/top-headlines" className="dashboard-link">
          🇺🇸 Top Headlines (US)
        </Link>
        <Link to="/all-news" className="dashboard-link">
          🌍 All News
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
