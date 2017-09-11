'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// minor api routing
app.use('/mongo', require('./routes/dump'));

module.exports = app;