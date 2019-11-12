import React, { useState, useEffect } from 'react';
import './BubbleCartoMap.scss';

import { Map, TileLayer as Basemap } from 'react-leaflet';
import carto from '@carto/carto.js';
import trackPoints from './track_points';
import Layer from './track_points';

const CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png';

const getUrlParameter = name => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function BubbleCartoMap() {
  const defaultCenter = getUrlParameter('lat') ? [parseFloat(getUrlParameter('lat')), parseFloat(getUrlParameter('lng'))] : [40.758730, -73.829767]
  const [center, setCenter] = useState(defaultCenter);

  const [nativeMap, setNativeMap] = useState()

  const [zoom, setZoom] = useState(11);

  const client = new carto.Client({
    apiKey: '8b05256a59ae80e54948010bb0439ecf6e21356f',
    username: 'acerom',
  });

  useEffect(() => {
    if(nativeMap){
      const { source, style } = trackPoints;
      const cartoSource = new carto.source.SQL(source);
      const cartoCSS = new carto.style.CartoCSS(style);
      const layer = new carto.layer.Layer(cartoSource, cartoCSS);
      console.log( nativeMap)
      client.addLayer(layer);
      client.getLeafletLayer().addTo(nativeMap);
    }
  }, [nativeMap])

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
      <Map className="map" center={center} zoom={zoom} ref={node => { setNativeMap(node && node.leafletElement) }}>
        <Basemap attribution="" url={CARTO_BASEMAP} />
        {/* <Layer source={trackPoints.source} style={trackPoints.style} client={client} hidden={false} /> */}
      </Map>
      {/* Have maybe a panel here that you can filter the map in live? */}
      {/* <div className="panel"> */}
      {/* </div> */}
    </div>
  );
}

export default BubbleCartoMap;
