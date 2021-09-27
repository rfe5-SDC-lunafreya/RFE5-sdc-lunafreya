const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const {TOKEN} = require('../config.js');

let app = express();

app.use(express.static(__dirname + '/../dist'));


app.use(express.json());
app.use(morgan('dev'));

const port = 3001;

app.listen(port, function() {
  console.log(`Moving and groving on port ${port}`);
});