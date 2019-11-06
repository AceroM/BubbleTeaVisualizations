const nta = require('./data/nyc/nyc_nta.json');
const turf = require('@turf/turf');
const fs = require('fs');

const cityData = require('./data/nyc/full_city_tea.json');
const updated = require('./data/most_updated_data/ny_places_with_reviews.json');

/**
 * @params {GeoJSON} nta - neightborhood geojson
 */
function removeNonNYfromGeoJSON(nta) {
  var bbox = turf.bbox(nta);
  var bboxPolygon = turf.bboxPolygon(bbox);
  var hexgrid = turf.hexGrid(bbox, 0.5, {
    units: 'miles',
  });

  var newPoints = hexgrid.features
    .map(hex => turf.centroid(hex))
    .filter(p => nta.features.some(b => turf.booleanPointInPolygon(p, b)));

  const newObj = {
    type: 'FeatureCollection',
    features: newPoints,
  };

  fs.writeFileSync('./data/full_city_tea.geojson', JSON.stringify(newObj), err => {
    if (err) throw err;
    console.log('done');
  });
}

function filterNy(nta) {
  const filteredPoints = cityData.filter(loc => {
    const { latitude, longitude } = loc.coordinates;
    const pt = turf.point([latitude, longitude]);
    const bool = nta.features.some(b => {
      return turf.booleanPointInPolygon(pt, b);
    });
    if (bool) {
      console.log(loc);
    }
    return bool;
  });
  console.log(filteredPoints);
}

function convertToCartoJSON(updated) {
  let modified = updated.map(place => {
    const { id, name } = place;
    let { rating, price } = place;
    const { latitude, longitude } = place.coordinates;
    const { city, zip_code, country } = place.location;

    rating = `${rating} stars`;
    price = `$${rating}.00`;

    return {
      id,
      name,
      latitude,
      longitude,
      city,
      zip_code,
      country,
      address: place.location.address1,
      rating,
      price,
    };
  });

  fs.writeFileSync('./data/most_updated_data/cartoData.json', JSON.stringify(modified), err => {
    if (err) throw err;
    console.log('done');
  });
}

convertToCartoJSON(updated);
// filterNy(nta);
// removeNonNYfromGeoJSON(nta);
