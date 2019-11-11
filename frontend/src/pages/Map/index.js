import React, { Component } from "react";
import BubbleCartoMap from "../../components/BubbleCartoMap";
// import BubbleTeaMap from '../../components/BubbleTeaMap';
// import BubbleTea from '../../components/BubbleTea';
import "./Map.scss";

function Map({ location }) {
  const maplocation = location.pathname.replace("/map/", "");
  return (
    <div>
      <h1>Bubble Tea Heatmap</h1>

      <BubbleCartoMap />
      {/* <BubbleTeaMap location={maplocation} /> */}
      {/* <h1>Bubble Tea Flavor Popularity</h1> */}
      {/* <BubbleTea /> */}
    </div>
  );
}

export default Map;
