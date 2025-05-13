// frontend/src/news/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import CountryNews from "./components/CountryNews";
import "./App.css";

function NewsDashboard() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <Routes>
        <Route path="/dashboard" element={<AllNews />} />
        <Route path="/dashboard/top-headlines/:category" element={<TopHeadlines />} />
        <Route path="/dashboard/country/:iso" element={<CountryNews />} />
      </Routes>
    </div>
  );
}

export default NewsDashboard;
