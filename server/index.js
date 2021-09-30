const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const { TOKEN } = require("../config.js");

// connect to mongodb use mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/shop");

let app = express();
var router = require("./routes.js");
app.use(express.json());
// qa router
const qaRouter = require("./controllers/qa.routes");
app.use("/qa", qaRouter);

app.use("/catwalk", router); //placeholder

app.use(express.static(__dirname + "/../dist"));

app.use(morgan("dev"));

const port = 3001;

app.listen(port, function () {
  console.log(`Moving and groving on port ${port}`);
});
