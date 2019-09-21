const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const YELP_TOKEN =
  "bWEA1mx1RmtAy7OnR38cIb8oPN6R3kB-xSzkAQdYIMq6FBD8MCizHooXd0RCwK2CPB06I8HX5y9kLJm4Rwg1RTPe-o-fDnR1hdYYGoCWAhVk_XnzrIMwWS7z43x-XXYx";

const axios = require("axios");
const baseUrl = "https://api.yelp.com/v3";
const term = encodeURIComponent("Bubble Tea");

const config = {
  headers: { Authorization: "bearer " + YELP_TOKEN }
};

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/yelp", async (req, res) => {
  const { lat, lng } = req.query;
  try {
    const data = await yelp(lat, lng);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

app.listen(5000, () => {
  console.log("listening on port");
});
