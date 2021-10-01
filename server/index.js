const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const { TOKEN } = require("../config.js");

let app = express();

var router = require('./routes.js');

app.use(express.json()); //need to put before the router middleware to make it work
app.use('/catwalk', router); //placeholder

app.use(express.static(__dirname + "/../dist"));

app.use(morgan("dev"));


const port = 3001;

app.listen(port, function () {
  console.log(`Moving and groving on port ${port}`);
});
