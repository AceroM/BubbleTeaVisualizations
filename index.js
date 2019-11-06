const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const cityData = require('./data/nyc/full_city_tea.json');
const reviews = require('./data/most_updated_data/reviews.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 5000 || process.env.PORT;

// app.get("/yelp", async (req, res) => {
//   const { lat, lng } = req.query;
//   try {
//     const data = await yelp(lat, lng);
//     res.send(data);
//   } catch (err) {
//     console.error(err);
//     res.status(400).send(err);
//   }
// });

// app.get("/yelp/reviews", async (req, res) => {
//   reviewDict = {};
//   const { lat, lng } = req.query;
//   try {
//     const data = await yelp(lat, lng);
//     if (data) {
//       for (let place of data) {
//         const reviews = await axios.get(
//           `${baseUrl}/businesses/${place.id}/reviews`,
//           config
//         );
//         for (let review of reviews) {
//         }
//       }
//     }
//     res.send(data);
//   } catch (err) {
//     console.error(err);
//     res.status(400).send(err);
//   }
// });

// app.get("/yelp/city", async function(req, res) {
//   try {
//     res.send(cityData);
//   } catch (err) {
//     console.error(err);
//   }
// });

app.get('/reviews', (req, res) => {
  try {
    res.send(reviews);
  } catch (err) {
    console.error(err);
  }
});

app.get('/location/:place', async function(req, res) {
  const { place } = req.params;
  try {
    const coords = await axios.get(`https://geo-info.co/${place}`);
    if (!coords.data[0].latitude) {
      // default to new york cause why not
      // 40.7128° N, 74.0060° W
      res.send({
        latitude: 40.7128,
        longitude: -74.006,
      });
    }
    res.send({
      latitude: coords.data[0].latitude,
      longitude: coords.data[1].longitude,
    });
  } catch (err) {
    console.error(err);
  }
});

app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
