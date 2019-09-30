const nta = require("./data/nyc/nyc_nta.json");
const turf = require("@turf/turf");
const fs = require("fs");

const cityData = require("./data/nyc/full_city_tea.json");

/**
 * @params {GeoJSON} nta - neightborhood geojson
 */
function removeNonNYfromGeoJSON(nta) {
  var bbox = turf.bbox(nta);
  var bboxPolygon = turf.bboxPolygon(bbox);
  var hexgrid = turf.hexGrid(bbox, 0.5, {
    units: "miles"
  });

  var newPoints = hexgrid.features
    .map(hex => turf.centroid(hex))
    .filter(p => nta.features.some(b => turf.booleanPointInPolygon(p, b)));

  const newObj = {
    type: "FeatureCollection",
    features: newPoints
  };

  fs.writeFileSync(
    "./data/full_city_tea.geojson",
    JSON.stringify(newObj),
    err => {
      if (err) throw err;
      console.log("done");
    }
  );
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

filterNy(nta);
// removeNonNYfromGeoJSON(nta);
