'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const clientSwitch = require('./util/handleClient');
const utilDB = require('./util/db');

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(clientSwitch.set);
app.use(utilDB.instance.init);

// minor api routing
app.use('/mongo', require('./routes/dump'));

// health
app.use('/health', require('./routes/health'));

module.exports = app;