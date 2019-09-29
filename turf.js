const nta = require("./data/nyc/nyc_nta.json");
const turf = require("@turf/turf");
const fs = require("fs");

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

removeNonNYfromGeoJSON(nta);
