const randoms = require('express').Router();

randoms.get('/', function(req, res, next) {
  const result = Math.random() * 50000;
  res.status(200).send({ result });
});

randoms.get('/:number', function(req, res, next) {
  const result = req.params.number
  res.status(200).send({ result });
});

module.exports = randoms;