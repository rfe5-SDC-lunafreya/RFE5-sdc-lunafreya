const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const {TOKEN} = require('../config.js');


const app = express();
var router = require('./routes.js');
app.use(express.json());


app.use('/catwalk', router); //placeholder
app.use(express.static(__dirname + '/../dist'));

app.use(morgan('dev'));

const port = 3001;

app.listen(port, function(err) {
  if (err) console.log("erro in serving setup")
  console.log(`Moving and groving on port ${port}`);
});
module.exports = {app: app, port: port};


// app.listen(port, function(err) {
//   if (err) console.log("erro in serving setup")
//   console.log(`Moving and groving on port ${port}`);
// });