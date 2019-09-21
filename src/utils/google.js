const axios = require("axios");
const { mapsKey } = require("../config.json");

(async function textToLocation(str = "China") {
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      str
    )}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${mapsKey}`
  );

  console.log(res.data);
  console.log(res.data.candidates[0].geometry);
})();
