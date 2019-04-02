"use strict";
const numbersRouter = require('express').Router();
import wordsC from '../controllers/words'; 

const { echo, random } = wordsC;

numbersRouter.get('/:word', echo); 
numbersRouter.get('/', random);

export default numbersRouter;