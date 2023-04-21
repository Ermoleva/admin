import React from "react";
import { Link } from "react-router-dom";
import "./Aside.scss";

const Aside = () => {
  return (
    <div className="aside">
      <div className="aside__item">
        <Link className="aside__link" to="/que">Questions</Link>
      </div>
      <div className="aside__item">
        <Link className="aside__link" to="/lunch">Lunches</Link>
      </div>
      <div className="aside__item">
        <Link className="aside__link" to="/candyitem">Candy</Link>
      </div>
    </div>
  );
};

export default Aside;
