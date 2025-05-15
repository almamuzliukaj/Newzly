import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import countries from "./countries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const navigate = useNavigate();

  const category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-[#5b3a29] z-10 flex items-center justify-around shadow-md">
        <h3 className="relative heading font-bold text-[#f7e8d0] md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">Newzly</h3>

        <ul className={`${active ? "active" : ""} nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end`}>
          <li>
            <Link className="no-underline font-semibold text-[#f7e8d0]" to="/dashboard">All News</Link>
          </li>

          <li className="dropdown-li">
            <Link className="no-underline font-semibold flex items-center gap-2 text-[#f7e8d0]" onClick={() => {
              setShowCategoryDropdown(!showCategoryDropdown);
              setShowCountryDropdown(false);
            }}>
              Top-Headlines
              <FontAwesomeIcon className={`down-arrow-icon ${showCategoryDropdown ? "down-arrow-icon-active" : ""}`} icon={faCircleArrowDown} color="#f7e8d0" />
            </Link>
            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => (
                <li key={index} onClick={() => setShowCategoryDropdown(false)}>
                  <Link to={`/dashboard/top-headlines/${element}`} className="flex gap-3 capitalize text-[#3a2d25]" onClick={() => setActive(false)}>
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="dropdown-li">
            <Link className="no-underline font-semibold flex items-center gap-2 text-[#f7e8d0]" onClick={() => {
              setShowCountryDropdown(!showCountryDropdown);
              setShowCategoryDropdown(false);
            }}>
              Country
              <FontAwesomeIcon className={`down-arrow-icon ${showCountryDropdown ? "down-arrow-icon-active" : ""}`} icon={faCircleArrowDown} color="#f7e8d0" />
            </Link>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {countries.map((element, index) => (
                <li key={index} onClick={() => setShowCountryDropdown(false)}>
                  <Link 
                    to={`/dashboard/country/${element?.iso_2_alpha.toLowerCase()}`} 
                    className="flex gap-3 text-[#3a2d25]" 
                    onClick={() => setActive(false)}
                  >
                    <img src={element?.png} srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`} alt={element?.countryName} />
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
              className="no-underline font-semibold text-[#f7e8d0] border border-[#f7e8d0] px-4 py-1 rounded hover:bg-[#f7e8d0] hover:text-[#5b3a29] transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>

        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => setActive(!active)}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
