// frontend/src/pages/Dashboard.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../news/components/Header";
import AllNews from "../news/components/AllNews";
import TopHeadlines from "../news/components/TopHeadlines";
import CountryNews from "../news/components/CountryNews";
import "../news/style.css";

function Dashboard() {
  return (
    <div className="w-full min-h-screen pt-20">
      <Header />
      <Routes>
        <Route path="/" element={<AllNews />} />
        <Route path="top-headlines/:category" element={<TopHeadlines />} />
        <Route path="country/:iso" element={<CountryNews />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
