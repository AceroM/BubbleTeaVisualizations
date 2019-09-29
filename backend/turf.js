const nta = require("./nts.json");
const turf = require("@turf/turf");
const fs = require("fs");

// var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
var bbox = turf.bbox(nta);
var bboxPolygon = turf.bboxPolygon(bbox);
var hexgrid = turf.hexGrid(bbox, 0.5, {
  units: "miles"
});

var newPoints = hexgrid.features
  .map(hex => turf.centroid(hex))
  .filter(p => nta.features.some(b => turf.booleanPointInPolygon(p, b)));
// newPoints = newPoints.map(p => p.geometry.coordinates);

// console.log(newPoints);
// console.log(dissolved);
// const filtered = hexgrid.features.filter(hex => {
// return turf.booleanWithin(hex, dissolved);
// });

// console.log(filtered);

// console.log("filtered len: ", filtered.features.length);
// console.log("hexgrid len: ", hexgrid.features.length);
// console.log(nta.features[0]);

// console.log(hexgrid);
const newObj = {
  type: "FeatureCollection",
  features: newPoints
};

fs.writeFileSync("./test.geojson", JSON.stringify(newObj), err => {
  if (err) throw err;
  console.log("done");
});
