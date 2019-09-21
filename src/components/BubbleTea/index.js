import React from "react";
import milk from "../../static/milk.svg";

function BubbleTea() {
  return (
    <div class="bubble" style={{ width: "90vw", height: "100vh" }}>
      <img style={{ width: "100vw", height: "90vh" }} src={milk} />
    </div>
  );
}

export default BubbleTea;
