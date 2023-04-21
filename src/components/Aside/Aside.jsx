import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Aside.scss";

const Aside = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="aside">
      <Link className="aside__link" to="/que">
        <div
          className={`aside__item${isActive("/que") ? " aside__active" : ""}`}
        >
          Questions
        </div>
      </Link>

      <Link className="aside__link" to="/lunch">
        <div
          className={`aside__item${isActive("/lunch") ? " aside__active" : ""}`}
        >
          Lunches
        </div>
      </Link>

      <Link className="aside__link" to="/candyitem">
        <div
          className={`aside__item${
            isActive("/candyitem") ? " aside__active" : ""
          }`}
        >
          Candy
        </div>
      </Link>
      <Link className="aside__link" to="/article">
        <div
          className={`aside__item${
            isActive("/article") ? " aside__active" : ""
          }`}
        >
          Articles
        </div>
      </Link>
    </div>
  );
};

export default Aside;
