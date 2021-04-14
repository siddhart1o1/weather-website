const request = require("request");
// Get LONgitude and logitude of any place by provideing name
const geocode = (address, callback) => {
  url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?limit=2&access_token=pk.eyJ1Ijoic2lkZGhhcnRodGl3YXJpIiwiYSI6ImNrbmJnNGhudjB5ZGsydm1sanZ4b3A4Z2cifQ.NacvIPokmGNDgcZLUy_E5Q";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Undable to conect to location services", undefined);
    } else if (body.features.length == 0) {
      callback("Undable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
