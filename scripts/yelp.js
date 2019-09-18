/**
 * This uses the yelp api to
 */

const axios = require("axios");

// https://www.yelp.com/developers/documentation/v3/business_search
const baseUrl = "https://api.yelp.com/v3";
const term = encodeURIComponent("Bubble Tea");

const config = {
  headers: { Authorization: "bearer " + process.env.yelpToken }
};

(function YelpToCsv() {
  let coordinates = [
    {
      latitude: "40.730610",
      longitude: "-73.935242"
    }
  ];

  const business_search = axios.get(
    `${baseUrl}/businesses/search?term=${term}&latitude=40.730610&longitude=-73.935242&limit=50`,
    config
  );
})();
