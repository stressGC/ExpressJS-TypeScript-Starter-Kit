"use strict";

const numbersRouter = require('express').Router();
import echo from '../controllers/numbers/echo';
import random from '../controllers/numbers/random';

/* SUBROUTER */
numbersRouter.get('/:number', echo); 
numbersRouter.get('/', random);

export default numbersRouter;