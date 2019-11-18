import React, { useState, useEffect } from 'react';
import './BubbleCartoMap.scss';

import { Map, Marker, Popup, TileLayer as Basemap } from 'react-leaflet';
import carto from '@carto/carto.js';
import trackPoints from './track_points';

// components
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import BubbleButton from '../Styled/BubbleButton';

const CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png';

const getUrlParameter = name => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const BubbleCartoMap = () => {
  const defaultCenter = getUrlParameter('lat')
    ? [parseFloat(getUrlParameter('lat')), parseFloat(getUrlParameter('lng'))]
    : [40.75873, -73.829767];

  // TODO: create a live zip code relocation
  const [rating, setRating] = useState(false);
  const [location, setLocation] = useState(getUrlParameter('place'));
  const [center, setCenter] = useState(defaultCenter);
  const [nativeMap, setNativeMap] = useState();
  const [zipBool, setZipBool] = useState(false);
  const [zoom, setZoom] = useState(11);
  const [pricesBool, setPricesBool] = useState(false);
  const [ratingsBool, setRatingsBool] = useState(false);

  const client = new carto.Client({
    apiKey: '8b05256a59ae80e54948010bb0439ecf6e21356f',
    username: 'acerom',
  });

  const { source, style } = trackPoints;
  const cartoSource = new carto.source.SQL(source);

  const createFilters = ratingVal => {
    // cartoSource.setQuery(`SELECT * FROM cartodata WHERE rating = ${ratingVal}`);
    console.log('doesn works: ', `SELECT * FROM cartodata WHERE rating = ${ratingVal}`);
    console.log('works: ', `SELECT * FROM cartodata WHERE rating = 4`);
    cartoSource.setQuery(`SELECT * FROM cartodata WHERE rating = 4`);
  };

  useEffect(() => {
    if (nativeMap) {
      const cartoCSS = new carto.style.CartoCSS(style);
      const layer = new carto.layer.Layer(cartoSource, cartoCSS);

      client.addLayer(layer);
      client.getLeafletLayer().addTo(nativeMap);
    }
  }, [nativeMap]);

  return (
    <div>
      <div className="container">
        <aside className="toolbox">
          <div className="box">
            <header>
              <h2>{location}</h2>
            </header>
            <div className="zip">
              <h3>
                {' '}
                Zip Code
                <Checkbox checked={zipBool} onChange={() => setZipBool(!zipBool)} />
              </h3>
              <Input id="standard-basic" label="Standard" margin="normal" defaultValue="10001" />
            </div>
            <div className="filters">
              <h3>
                {' '}
                Prices
                <Checkbox checked={pricesBool} onChange={() => setPricesBool(!pricesBool)} />
              </h3>
              <p> The number represents how many dollar signs ($). </p>
              <Slider
                defaultValue={1}
                onChange={(e, val) => {
                  setRating(val);
                }}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={2}
              />
              <h3>
                {' '}
                Ratings
                <Checkbox checked={ratingsBool} onChange={() => setRatingsBool(!ratingsBool)} />
              </h3>
              <Slider
                defaultValue={1}
                onChange={(e, val) => {
                  setRating(val);
                }}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={5}
              />
            </div>
            <BubbleButton
              onClick={() => {
                // cartoSource.setQuery(`SELECT * FROM cartodata WHERE rating = 4`);
                createFilters(rating);
              }}
              style={{ marginLeft: '5em', marginTop: '1em' }}
            >
              {' '}
              FILTER{' '}
            </BubbleButton>
          </div>
        </aside>
        <Map
          className="map"
          center={center}
          zoom={zoom}
          ref={node => {
            setNativeMap(node && node.leafletElement);
          }}
        >
          <Basemap attribution="" url={CARTO_BASEMAP} />

          {/* <Layer source={trackPoints.source} style={trackPoints.style} client={client} hidden={false} /> */}
        </Map>
      </div>
    </div>
  );
};

export default BubbleCartoMap;
