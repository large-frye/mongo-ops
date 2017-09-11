const router = require('express').Router();
const spawn = require('child_process');
const defaults = {
  host: '',
  user: '',
  pass: '',
  port: '27017',
  db: '',
  collection: '',
  query: ''
};

function createMongoOptions(payload) {
  Object.assign(payload, {});
}

function postDump(req, res) {
  const payload = req.body;
  const mongoOptions = createMongoOptions(payload);
  const mongoDump = spawn('mongodump', [
    `--host ${defaults.host}`,
    `--user ${defaults.user}`,
    `--password ${defaults.pass}`,
    `--port ${defaults.port}`]);

  res.json(req.body);
}

router.post('/dump', postDump);

module.exports = router;