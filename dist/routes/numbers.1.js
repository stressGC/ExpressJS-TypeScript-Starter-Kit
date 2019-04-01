const numbersRouter = require('express').Router();
numbersRouter.get('/', function (req, res, next) {
    const result = Math.random() * 50000;
    res.status(200).send({ result });
});
numbersRouter.get('/:number', function (req, res, next) {
    const result = req.params.number;
    res.status(200).send({ result });
});
module.exports = numbersRouter;
//# sourceMappingURL=numbers.1.js.map