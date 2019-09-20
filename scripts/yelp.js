/**
 * This uses the yelp api to
 */

const axios = require("axios");

// https://www.yelp.com/developers/documentation/v3/business_search
const baseUrl = "https://api.yelp.com/v3";
const term = encodeURIComponent("Bubble Tea");

const config = {
  headers: { Authorization: "bearer " + process.env.YELP_TOKEN }
};

(async function YelpToCsv() {
  let coordinates = [
    {
      latitude: "40.730610",
      longitude: "-73.935242",
      description: "North Manhattan"
    },
    {
      latitude: "40.838197",
      longitude: "-73.942332",
      description: "Soho"
    },
    {
      latitude: "40.765856",
      longitude: "-73.979325",
      description: "Central Park"
    }
  ];

  let businesses = [];
  for (let coord of coordinates) {
    const store = await axios.get(
      `${baseUrl}/businesses/search?term=${term}&latitude=${coord.latitude}&longitude=${coord.longitude}&limit=50`,
      config
    );
    businesses.push(store.data.businesses);
  }
  businesses = businesses.flat();
  businesses = [...new Set(businesses)];
  console.log("businesses");
  console.log(businesses);
  console.log(`--------------`);
  console.log(businesses.length);
})();
