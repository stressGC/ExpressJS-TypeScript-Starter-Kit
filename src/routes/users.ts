'use strict';

import { Router } from 'express';
import * as userController from '../controllers/users';
import validators from '../validators';
import { USER_VALIDATION } from '../utils/constants';

const userRouter = Router();

/* SUBROUTER */
userRouter.get('/', userController.getAll);
userRouter.post('/create', validators.get(USER_VALIDATION), userController.create);

export default userRouter;
