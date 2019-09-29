const { YELP_TOKEN } = require("./config.json");
const fs = require("fs");
const coords = require("./hexGridCoords.json");
const filteredB = require("./filteredB.json");

const axios = require("axios");
const baseUrl = "https://api.yelp.com/v3";
const term = encodeURIComponent("Bubble Tea");

const config = {
  headers: { Authorization: "bearer " + YELP_TOKEN }
};

/**
 * Retrieves nearby business data from one location
 * @param {float} latitude
 * @param {float} longitude
 */
async function yelp(latitude, longitude) {
  const store = await axios.get(
    `${baseUrl}/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&limit=50`,
    config
  );
  let businesses = [];
  businesses.push(store.data.businesses);
  businesses = businesses.flat();
  businesses = [...new Set(businesses)];
  return businesses;
}

async function getNYCData() {
  // const locations = [
  // ["40.712776", "-74.005974", ""],
  // ["40.765", "-73.805", ""]
  // ];
  let businesses = [];
  for (let loc of coords) {
    const store = await axios.get(
      `${baseUrl}/businesses/search?term=${term}&latitude=${loc[1]}&longitude=${
        loc[0]
      }&limit=50`,
      config
    );
    businesses.push(store.data.businesses);
  }
  businesses = businesses.flat();
  let filteredBusinesses = [];
  for (let b of businesses) {
    if (!(filteredBusinesses.findIndex(fb => fb.id === b.id) > -1)) {
      filteredBusinesses.push(b);
    }
  }
  console.log(filteredBusinesses);
  console.log(filteredBusinesses.length);
  fs.writeFileSync(
    "./filteredB.json",
    JSON.stringify(filteredBusinesses),
    err => {
      if (err) throw err;
      console.log("done");
    }
  );
  // return filteredBusinesses.length;
}

// getNYCData();
console.log(filteredB);

// console.log(coords);
