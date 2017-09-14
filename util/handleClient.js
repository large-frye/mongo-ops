function ClientSwitch() {
  this.set = function(req, res, next) {
    req.client = {
      host: req.headers.host,
      mongoURI: 'http://localhost:27017/ops',
    };
    next();
  }
}

module.exports = new ClientSwitch();