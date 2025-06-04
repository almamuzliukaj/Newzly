import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>📊 Welcome to Your News Dashboard</h2>
      <div className="dashboard-links">
        <Link to="/all-news">🌍 All News</Link>
        <Link to="/top-headlines">🔥 Top Headlines</Link>
        <Link to="/country/us">🇺🇸 Country News (US)</Link>
      </div>
    </div>
  );
}

export default Dashboard;
