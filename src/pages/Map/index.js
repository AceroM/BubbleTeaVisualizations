import React, { Component } from "react";
// import Heatmap from '../../components/Heatmap';
import BubbleTeaMap from '../../components/BubbleTeaMap';
import "./Map.scss";

function Map({ location }) {
  const maplocation = location.pathname.replace("/map/", "")
  return (
    <div className="body-wrapper">
      <h1> hello </h1>
      <BubbleTeaMap location={maplocation}/>
    </div>
  );
}

export default Map;
