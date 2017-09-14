const models = require('../models');
const mongoose = require('mongoose');

function DB() {
  this.init = (req, res, next) => {
    const noClient = !!req.client;
    if (!(noClient)) {
      mongoose.connect(req.client.mongoURI);
      this.initModels();
    }
    next();
  };
  this.initModels = () => {
    Object.keys(models).forEach((key) => {
      const item = models[key];
      mongoose.model(key, item);
    });
  }
}

module.exports = {
  instance: new DB(),
  models,
};