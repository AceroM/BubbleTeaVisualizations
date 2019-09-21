import React from "react";
import './Logo.scss';
function Logo() {
  return (
    <div className="grid-container">
      <a href="/"><img className="logo" src={"/stateastics.png"} alt ="logo"/></a>
    </div>
  );
}

export default Logo;