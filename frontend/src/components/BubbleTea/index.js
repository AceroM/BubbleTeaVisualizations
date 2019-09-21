import React, { useRef } from "react";
import "./BubbleTea.scss";
import * as d3 from "d3";

import Bubbles from "./Bubbles";

import milk from "../../static/milk.svg";
import data from "./data.json";

function BubbleTea() {
  return (
    <div className="bubble">
      <div className="bubble" style={{ width: "90vw", height: "100vh" }}>
        <img
          className="milk"
          style={{ width: "100vw", height: "90vh" }}
          src={milk}
        />
        <div className="bubbles-container">
          <Bubbles data={data} />
        </div>
      </div>
    </div>
  );
}

export default BubbleTea;
