'use strict';

import { Router } from 'express';
import * as userController from '../controllers/users';
import validators from '../validators';
import { USER } from '../utils/constants';

const userRouter = Router();

/* SUBROUTER */
userRouter.get('/', userController.getAll);
userRouter.post('/create', validators.get(USER.VALIDATION), userController.create);

export default userRouter;
