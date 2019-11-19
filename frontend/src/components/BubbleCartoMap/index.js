import React, { useState, useEffect } from 'react';
import './BubbleCartoMap.scss';

import { Map, Marker, Popup, TileLayer as Basemap } from 'react-leaflet';
import { defaultMarker } from './defaultMarker';
import L from 'leaflet';
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

  // checkbox booleans
  const [ratingsBool, setRatingsBool] = useState(false);
  const [pricesBool, setPricesBool] = useState(false);
  const [zipBool, setZipBool] = useState(false);
  const noFilters = !ratingsBool && !pricesBool && !zipBool;

  // values for those checkboxes
  const [rating, setRating] = useState(3);
  const [prices, setPrices] = useState(1);
  const [zipCode, setZipCode] = useState('10002');

  // locationStuff
  const [location, setLocation] = useState(getUrlParameter('place'));
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(11);
  const [nativeMap, setNativeMap] = useState();

  const client = new carto.Client({
    apiKey: '8b05256a59ae80e54948010bb0439ecf6e21356f',
    username: 'acerom',
  });

  const { source, style } = trackPoints;
  const [querySource, setQuerySource] = useState(undefined);

  const createFilters = () => {
    if (noFilters) {
      alert('Please select a filter!');
    } else {
      let query = ['SELECT * FROM cartodata WHERE'];
      const cPush = str => {
        if (query.length > 1) {
          query.push('AND ' + str);
        } else {
          query.push(str);
        }
      };
      if (ratingsBool) cPush(`rating = ${rating}`);
      if (pricesBool) cPush(`price = ${prices}`);
      if (zipBool) cPush(`zip_code = ${zipCode}`);

      if (querySource) {
        querySource.setQuery(query.join(' '));
      }
    }
  };

  const resetFilters = () => {
    if (querySource) {
      querySource.setQuery('SELECT * FROM cartodata');
    }
  };

  const popup = L.popup({ closeButton: false });

  function openPopup(featureEvent) {
    let content = '<div class="widget">';

    if (featureEvent.data.name) {
      content += `<h2 class="h2">${featureEvent.data.name}</h2>`;
    }

    if (featureEvent.data.pop_max || featureEvent.data.pop_min) {
      content += `<ul>`;

      if (featureEvent.data.pop_max) {
        content += `<li><h3>Max:</h3><p class="open-sans">${featureEvent.data.pop_max}</p></li>`;
      }

      if (featureEvent.data.pop_min) {
        content += `<li><h3>Min:</h3><p class="open-sans">${featureEvent.data.pop_min}</p></li>`;
      }

      content += `</ul>`;
    }

    content += `</div>`;

    popup.setContent(content);
    popup.setLatLng(featureEvent.latLng);
    if (!popup.isOpen()) {
      popup.openOn(nativeMap);
    }
  }

  function closePopup(featureEvent) {
    popup.removeFrom(nativeMap);
  }

  useEffect(() => {
    if (nativeMap) {
      const cartoSource = new carto.source.SQL(source);
      setQuerySource(cartoSource);
      const cartoCSS = new carto.style.CartoCSS(style);
      const layer = new carto.layer.Layer(cartoSource, cartoCSS);
      layer.off('featureOver');
      layer.off('featureOut');
      layer.on('featureClicked', openPopup);

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
              <Input
                value={zipCode}
                onChange={(e, v) => {
                  if (e.target.value.length <= 5) setZipCode(e.target.value);
                }}
                id="standard-basic"
                label="Standard"
                margin="normal"
              />
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
                  // console.log(val);
                  setPrices(val);
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
                defaultValue={3}
                onChange={(e, val) => {
                  setRating(val);
                }}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={5}
              />
            </div>
            <BubbleButton
              onClick={() => {
                createFilters();
              }}
              style={{ marginLeft: '3em', marginTop: '1em' }}
            >
              FILTER
            </BubbleButton>
            <BubbleButton
              onClick={() => {
                resetFilters();
              }}
              style={{ marginTop: '1em' }}
            >
              {' '}
              RESET{' '}
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
          <Marker position={[40.75873, -73.829767]} marker={defaultMarker}>
            <Popup>
              <div> hello</div>
            </Popup>
          </Marker>
          {/* <Layer source={trackPoints.source} style={trackPoints.style} client={client} hidden={false} /> */}
        </Map>
      </div>
    </div>
  );
};

export default BubbleCartoMap;
