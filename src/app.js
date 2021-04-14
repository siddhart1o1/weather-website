const chalk = require("chalk");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

// defining paths
const app = express();
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);
//defining path for views
const publicDirectoryPath = path.join(__dirname, "../public");

//setup handalbar and views locatipon
app.set("view engine", "hbs");
app.set("views", viewsPath);

//setup static directory
app.use(express.static(publicDirectoryPath));

//index  page
app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "siddharth" });
});

//about page
app.get("/about", (req, res) => {
  res.render("about", { title: "About page", name: "Siddharth" });
});

//helppage
app.get("/help", (req, res) => {
  res.render("help", { title: "Help page", name: "Siddharth" });
});

//to send reponse when someone tries to get something
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please Provide an Address");
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          error: error,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404");
});

// to start server use listen
app.listen(port, () => {
  console.log(chalk.green.bold("server has started on port :" + port));
});
