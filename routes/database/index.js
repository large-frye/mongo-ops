const router = require('express').Router();
const spawn = require('child_process');
const utilDB = require('../../util/db');

function createMongoOptions(payload) {
  Object.assign(payload, {});
}

function exists(data, cb) {
  utilDB.models.find({}).exec((err, doc) => {
    if (err) {
      // handle error
    }
    cb(doc);
  });
}

function view(req, res) {
  const query = {};
  if (req.params.id) {
    query = { _id: req.params.id };
  }

  utilDB.models.find()
}

function add(req, res) {
  const payload = req.body;

  exists(payload, (data) => {
    console.log(data);
    res.json(req.body);
  });
}

router.post('/save', add);
router.get('/view', exists);
router.get('/view/:id', exists);

module.exports = router;