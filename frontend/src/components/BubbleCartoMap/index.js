import React, { useState, useEffect } from 'react';
import './BubbleCartoMap.scss';

import { Map, TileLayer as Basemap } from 'react-leaflet';
import carto from '@carto/carto.js';
import trackPoints from './track_points';

const CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png';

const getUrlParameter = name => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function BubbleCartoMap() {
  const [center, setCenter] = useState([parseFloat(getUrlParameter('lat')), parseFloat(getUrlParameter('lng'))]);

  const [zoom, setZoom] = useState(11);

  const client = new carto.Client({
    apiKey: '8b05256a59ae80e54948010bb0439ecf6e21356f',
    username: 'acerom',
  });

  const { source, style } = trackPoints;
  const cartoSource = new carto.source.SQL(source);
  const cartoCSS = new carto.style.CartoCSS(style);
  const layer = new carto.layer.Layer(cartoSource, cartoCSS);

  client.addLayer(layer);

  useEffect(() => {
    console.log(center);
    fetch('/reviews')
      .then(res => res.json())
      .then(d => {
        console.log(d);
      });
  }, []);

  return (
    <div>
      <h1> {getUrlParameter('place')} </h1>
      <Map className="map" center={center} zoom={11}>
        <Basemap attribution="" url={CARTO_BASEMAP} />
      </Map>
      {/* Have maybe a panel here that you can filter the map in live? */}
      {/* <div className="panel"> */}
      {/* </div> */}
    </div>
  );
}

export default BubbleCartoMap;
