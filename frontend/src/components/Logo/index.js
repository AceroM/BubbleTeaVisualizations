import React from "react";
import Stateastics from "../../static/stateastics.png";
import Wordcloud from "../../static/wordcloud.png";
import "./Logo.scss";

function Logo() {
  return (
    <div className="grid-container">
      <a href="/">
        <img className="logo" src={Stateastics} alt="logo" />
      </a>
      <a href="/wordcloud">
        <img className="logo" src={Wordcloud} alt="logo" />
      </a>
      <a href="/report">
        <h1> Tableau Maps </h1>
      </a>
    </div>
  );
}

export default Logo;
