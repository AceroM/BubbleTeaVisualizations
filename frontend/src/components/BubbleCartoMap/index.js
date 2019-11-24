import React, { useState, useEffect } from 'react';
import './BubbleCartoMap.scss';

import { Map, TileLayer as Basemap } from 'react-leaflet';
import L from 'leaflet';
import carto from '@carto/carto.js';

// components
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import BubbleButton from '../Styled/BubbleButton';
import { Modal } from '@material-ui/core';
import MessageModal from '../MessageModal';
import Review from '../Review';

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
  const yelpId = getUrlParameter('modal');
  const storeName = getUrlParameter('store');
  const [isModal, setModal] = useState(!!yelpId.length);

  const source = 'SELECT * FROM cartodata';
  const [cartoStyle, setCartoStyle] = useState(`
    @fill: #bd7cc6;

    #layer {
      marker-width: [rating] * 2;
      marker-allow-overlap: false;
      marker-comp-op: multiply;

      marker-fill-opacity: 1;
      marker-fill: @fill;

      marker-line-color: ramp([price], (#9ccb86, #e9e29c, #eeb479, #e88471, #cf597e), (1,2,3,4,5), >=);
      marker-line-width: 1;
      marker-line-opacity: 1;
    }
  `);

  const changeStyle = color => {
    let temp = cartoStyle;
    temp = temp.split('\n');
    temp[1] = `    @fill: ${color};`;
    setCartoStyle(temp.join('\n'));
  };

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

  let popup = L.popup({ closeButton: false });

  function openPopup(featureEvent) {
    const { name, address, zip_code, price, rating, id } = featureEvent.data;

    const r = rating.toString();
    const isFull = r.length === 1;
    let stars = '';

    if (isFull) {
      stars += '<div class="clip-star"></div>'.repeat(parseInt(r));
    } else {
      stars += '<div class="clip-star"></div>'.repeat(parseInt(r[0]));
      stars += '<div class="clip-star half"></div>';
    }

    const content = `
      <div class="widget">
        <h1> ${name} </h1>
        <h2> <b>Address:</b> ${address}, ${zip_code}</h2>
        <h2> <b>Price:</b> ${price} </h2>
        <div class="stars">
          <h2><b>Rating:</b></h2>
          ${stars}
        </div>
        <a
          href="/map?lat=40.76361&lng=-73.98653&place=new%20york%20city&modal=${id}&store=${name}"
          class="widget-button"
        > Review Stats
        </a>
      </div>
    `;

    popup.setContent(content);
    popup.setLatLng(featureEvent.latLng);
    if (!popup.isOpen()) {
      popup.openOn(nativeMap);
    }
  }

  const [reviews, setReviews] = useState([]);
  const getReviews = id => {
    fetch(`/yelp/review?id=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('data: ', data);
        setReviews(data);
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  };

  const reviewContent = reviews.map(r => {
    const props = {
      rating: r.rating,
      text: r.text,
      time_created: r.time_created,
      name: r.user.name,
      image_url: r.user.image_url,
    };
    return <Review {...props} />;
  });

  useEffect(() => {
    if (nativeMap) {
      const cartoSource = new carto.source.SQL(source);
      setQuerySource(cartoSource);
      const cartoCSS = new carto.style.CartoCSS(cartoStyle);
      const layer = new carto.layer.Layer(cartoSource, cartoCSS, {
        featureOverColumns: ['name', 'address', 'zip_code', 'rating', 'price', 'id'],
      });
      layer.off('featureOver');
      layer.off('featureOut');
      layer.on('featureClicked', openPopup);

      client.addLayer(layer);
      client.getLeafletLayer().addTo(nativeMap);
    }
  }, [nativeMap]);

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isModal}
        onClose={() => setModal(false)}
      >
        {/* <div className="modal">hello</div> */}
        <div className="modal-container">
          <div className="gap" />
          <MessageModal
            closeModal={() => setModal(false)}
            openModal={() => getReviews(yelpId)}
            className="modal"
            title={storeName}
          >
            <div className="modal-stuff">{reviewContent.length ? reviewContent : <p>Loading</p>}</div>
          </MessageModal>
        </div>
      </Modal>
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
          {/* <Layer source={trackPoints.source} style={trackPoints.style} client={client} hidden={false} /> */}
        </Map>
      </div>
    </div>
  );
};

export default BubbleCartoMap;
