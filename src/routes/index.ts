'use strict';

import usersRouter from '../routes/users';
import * as express from 'express';
import * as path from 'path';

const router = express.Router();

/* expose public folder */
router.use('/public', express.static(path.join(__dirname, '../../public')));

/* use our subrouters */
router.use('/users', usersRouter);

export default router;
