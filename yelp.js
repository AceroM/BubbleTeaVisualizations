const fs = require('fs');
const axios = require('axios');

// offline files
const updated = require('./data/most_updated_data/ny_places_with_reviews.json');
const coords = require('./data/nyc/full_city_tea_coords.json');
const cityData = require('./data/nyc/full_city_tea.json');
const nyTea = require('./data/nyc/ny_city_tea.json');
const nyTeaWithReviews = require('./data/nyc/ny_places_with_reviews.json');
// const { YELP_TOKEN } = require('./config.json');

const baseUrl = 'https://api.yelp.com/v3';
const term = encodeURIComponent('Bubble Tea');
// const config = {
// headers: { Authorization: 'bearer ' + YELP_TOKEN },
// };

/**
 * Retrieves nearby business data from one location
 * @param {float} latitude
 * @param {float} longitude
 */
async function yelp(latitude, longitude) {
  const store = await axios.get(
    `${baseUrl}/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&limit=50`,
    config,
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
      `${baseUrl}/businesses/search?term=${term}&latitude=${loc[1]}&longitude=${loc[0]}&limit=50`,
      config,
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
  fs.writeFileSync('./filteredB.json', JSON.stringify(filteredBusinesses), err => {
    if (err) throw err;
    console.log('done');
  });
}

async function updateNYCdataWithReviews() {
  let updated = cityData
    .filter(place => place.location.state === 'NY')
    .map(place => ({
      ...place,
      price: place.price ? place.price.length : 0,
    }));
  console.log(updated);
  fs.writeFileSync('./data/nyc/ny_city_tea.json', JSON.stringify(updated));
}

// creating the super json
async function getReviews(places) {
  // https://api.yelp.com/v3/businesses/{id}/reviews

  let updated = [];
  for (let i = 0; i < places.length; i++) {
    const review = await axios.get(`${baseUrl}/businesses/${places[i].id}/reviews`, config);

    const { data } = review;
    const { reviews } = data;

    updated.push({
      ...places[i],
      reviews,
    });
  }

  // const review = await axios.get(
  // `${baseUrl}/businesses/${places[0].id}/reviews`,
  // config
  // );

  // console.log("updated: ", JSON.stringify(updated));

  fs.writeFileSync('./data/nyc/ny_places_with_reviews.json', JSON.stringify(updated));
}

async function getReviewWords(places) {
  const arr = [];
  for (let place of places) {
    const { reviews } = place;
    reviews.forEach(r => {
      arr.push(r.text);
    });
  }

  fs.writeFileSync('./data/most_updated_data/reviews.json', JSON.stringify(arr));
}

// console.log(updated.find(place => place.name.toLowerCase().indexOf('hawa') > -1));
// console.log(nyTea.find(place => place.name.toLowerCase().indexOf('yi fang') > -1));
// console.log(nyTea.filter(p => p.alias.toLowerCase().includes('hong-kong')));
// console.log(nyTea.filter(p => p.alias === 'yi-fang-taiwan-fruit-tea-long-island-city'));
// console.log(updated.filter(p => p.alias === 'yi-fang-taiwan-fruit-tea-long-island-city'));

// getReviewWords(nyTeaWithReviews);
// getReviews(nyTea);
// updateNYCdataWithReviews();
// getNYCData();
