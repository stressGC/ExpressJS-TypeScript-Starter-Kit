"use strict";

const numbersRouter = require('express').Router();
import echo from '../controllers/words/echo'; 
import random from '../controllers/words/random'; 

/* SUBROUTER */
numbersRouter.get('/:word', echo); 
numbersRouter.get('/', random);

export default numbersRouter;