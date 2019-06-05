'use strict';

import users from '../routes/users';
import * as express from 'express';
import * as path from 'path';
import * as authController from '../controllers/auth';
import * as validators from '../validators/helper';
import { AUTH } from '../utils/constants';

const router = express.Router();

/* expose public folder */
router.use('/public', express.static(path.join(__dirname, '../../public')));

/* global scope routes */
router.post('/login',
            validators.get(AUTH.LOGIN),
            authController.login);

/* use our subrouters */
router.use('/users', users);

export default router;
