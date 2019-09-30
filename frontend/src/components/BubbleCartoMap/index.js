import React, { useState, useEffect } from "react";
import "./BubbleCartoMap.scss";

import { Map, TileLayer as Basemap } from "react-leaflet";
import carto from "@carto/carto.js";

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
    parseFloat(getUrlParameter("lat")),
    parseFloat(getUrlParameter("lng"))
  ]);

  const [zoom, setZoom] = useState(11);

  const cartoClient = new carto.Client({
    apiKey: "default_public",
    username: "rochoa"
  });

  useEffect(() => {
    console.log(center);
  }, []);

  return (
    <div>
      <h1> {getUrlParameter("place")} </h1>
      <Map className="map" center={center} zoom={11}>
        <Basemap attribution="" url={CARTO_BASEMAP} />
      </Map>
    </div>
  );
}

export default BubbleCartoMap;
