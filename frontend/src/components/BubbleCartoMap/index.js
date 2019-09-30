import React, { useState } from "react";
import "./BubbleCartoMap.scss";

// import { Map, TileLayer as Basemap } from "react-leaflet";
// import carto from "carto.js";

const CARTO_BASEMAP =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png";

const getUrlParameter = name => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function BubbleCartoMap() {
  const [center, setCenter] = useState([
    getUrlParameter("lat"),
    getUrlParameter("lng")
  ]);
  return (
    <div>
      <h1> {center} </h1>
    </div>
  );
}

export default BubbleCartoMap;
