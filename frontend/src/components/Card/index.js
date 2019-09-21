import React from "react";
import "./Card.scss";

function Card({ children }) {
  return <div className="card-container">{children}</div>;
}

export default Card;
