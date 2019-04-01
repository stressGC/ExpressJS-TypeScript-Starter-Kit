const numbersRouter = require('express').Router();
import numbersC from '../controllers/numbers';

const { echo, random } = numbersC;

numbersRouter.get('/:number', echo); 
numbersRouter.get('/', random);

export default numbersRouter;