import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import countries from "./countries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const navigate = useNavigate();

  const category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];

  const handleMenuToggle = () => {
    setActive(!active);
    setShowCategoryDropdown(false);
    setShowCountryDropdown(false);
  };

  const handleCloseMenu = () => {
    setActive(false);
    setShowCategoryDropdown(false);
    setShowCountryDropdown(false);
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-[#5b3a29] z-10 flex items-center justify-between px-6 shadow-md">
        <h3 className="heading font-bold text-[#f7e8d0] text-2xl z-50 mb-5 mt-5">Newzly</h3>

        {/* Hamburger Button */}
        <div className="block md:hidden z-50" onClick={handleMenuToggle}>
          <FontAwesomeIcon icon={active ? faTimes : faBars} size="lg" color="#f7e8d0" />
        </div>

        <ul className={`nav-ul flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center absolute md:static bg-[#5b3a29] md:bg-transparent w-full md:w-auto left-0 top-[70px] md:top-0 p-6 md:p-0 z-40 transition-all duration-300 ${active ? "flex" : "hidden md:flex"}`}>
          <li>
            <Link onClick={handleCloseMenu} className="font-semibold text-[#f7e8d0]" to="/dashboard">All News</Link>
          </li>

          <li className="dropdown-li">
            <span className="font-semibold flex items-center gap-2 text-[#f7e8d0] cursor-pointer"
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowCountryDropdown(false);
              }}>
              Top-Headlines
              <FontAwesomeIcon className={`down-arrow-icon ${showCategoryDropdown ? "down-arrow-icon-active" : ""}`} icon={faCircleArrowDown} />
            </span>
            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => (
                <li key={index} onClick={handleCloseMenu}>
                  <Link to={`/dashboard/top-headlines/${element}`} className="capitalize text-[#3a2d25]">{element}</Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="dropdown-li">
            <span className="font-semibold flex items-center gap-2 text-[#f7e8d0] cursor-pointer"
              onClick={() => {
                setShowCountryDropdown(!showCountryDropdown);
                setShowCategoryDropdown(false);
              }}>
              Country
              <FontAwesomeIcon className={`down-arrow-icon ${showCountryDropdown ? "down-arrow-icon-active" : ""}`} icon={faCircleArrowDown} />
            </span>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {countries.map((element, index) => (
                <li key={index} onClick={handleCloseMenu}>
                  <Link to={`/dashboard/country/${element.iso_2_alpha.toLowerCase()}`} className="flex gap-3 text-[#3a2d25]">
                    <img src={element?.png} alt={element?.countryName} />
                    <span>{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="font-semibold text-[#f7e8d0] border border-[#f7e8d0] px-4 py-1 rounded hover:bg-[#f7e8d0] hover:text-[#5b3a29] transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
