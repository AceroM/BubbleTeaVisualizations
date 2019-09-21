/**
 * This uses the yelp api to query for 50 (limit) Bubble Tea locations near my location
 */

// https://www.yelp.com/developers/documentation/v3/business_search
const axios = require("axios");
const baseUrl = "https://api.yelp.com/v3";
const term = encodeURIComponent("Bubble Tea");
const config = {
  headers: { Authorization: "bearer " + process.env.YELP_TOKEN }
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
