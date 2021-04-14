const request = require("request");

forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=41fb278651dfe3b704706cb0dcc5e6a9&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Undable to conect to location services", undefined);
    } else if (body.error) {
      callback("Undable to find location", undefined);
    } else {
      callback(
        undefined,
        "Current Temperature is : " +
          body.current.temperature +
          " Degree Celcius" +
          " But it fells like it's  : " +
          body.current.feelslike +
          " Degree Celcius "
      );
    }
  });
};

module.exports = forecast;
