/**
 * This uses the yelp api to query for 50 (limit) Bubble Tea locations near my location
 */

// https://www.yelp.com/developers/documentation/v3/business_search
// import { YELP_TOKEN } from '../config.js';

const YELP_TOKEN = "bWEA1mx1RmtAy7OnR38cIb8oPN6R3kB-xSzkAQdYIMq6FBD8MCizHooXd0RCwK2CPB06I8HX5y9kLJm4Rwg1RTPe-o-fDnR1hdYYGoCWAhVk_XnzrIMwWS7z43x-XXYx";
const axios = require("axios");
const baseUrl = "https://api.yelp.com/v3";
const term = encodeURIComponent("Bubble Tea");
const config = {
  headers: { Authorization: "bearer " + YELP_TOKEN }
};
const latitude = "40.730610";
const longitude = "-73.935242";

(async function YelpToCsv(latitude, longitude) {
  const description = "My location"
  latitude = "40.730610"; // COMMENT THIS OUT LATER
  longitude = "-73.935242"; // COMMENT THIS OUT LATER
  const store = await axios.get(
    `${baseUrl}/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&limit=50`,
    config
  );
  let businesses = [];
  businesses.push(store.data.businesses);
  businesses = businesses.flat();
  businesses = [...new Set(businesses)];
  console.log("businesses:");
  console.log(businesses);
  console.log(`--------------`);
  console.log(businesses.length); // should be 50 since we set the limit to 50
})();
