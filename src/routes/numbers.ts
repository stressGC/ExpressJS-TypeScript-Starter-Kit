"use strict";

const numbersRouter = require('express').Router();
import echo from '../controllers/numbers/echo';
import random from '../controllers/numbers/random';
import { paramIsNumber } from './../validators/numberValidator';

/* SUBROUTER */
numbersRouter.get('/:number', paramIsNumber, echo); 
numbersRouter.get('/', random);

export default numbersRouter;