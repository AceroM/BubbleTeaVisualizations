import React, { useEffect } from "react";
import BubbleTea from "../../components/BubbleTea";

import "./Homepage.scss";

const Homepage = () => {
  useEffect(() => {}, []);

  return (
    <div className="body-wrapper">
      <div className="bmb-header">
        <div className="grid-container">
          <a href="/">
            <img className="logo" src={"/bubble-tea.png"} alt="logo" />
          </a>
        </div>
      </div>
      <BubbleTea />
      <br />
      <br />
    </div>
  );
};
export default Homepage;
