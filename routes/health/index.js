const router = require('express').Router();

function info(req, res) {
  res.json({
    client: req.client,
  });
}

router.get('/info', info);

module.exports = router;