const fs = require("fs");
const axios = require("axios");

// offline files
const coords = require("./data/nyc/full_city_tea_coords.json");
const { YELP_TOKEN } = require("./config.json");

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
export default async function yelp(latitude, longitude) {
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

/**
 * Queries all the coodinates with yelp api to produce master data json
 */
async function getNYCData() {
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
  fs.writeFileSync(
    "./filteredB.json",
    JSON.stringify(filteredBusinesses),
    err => {
      if (err) throw err;
      console.log("done");
    }
  );
}

// getNYCData();
