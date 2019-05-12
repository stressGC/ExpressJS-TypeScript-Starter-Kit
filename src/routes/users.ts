'use strict';

const userRouter = require('express').Router();
import * as userController from '../controllers/users';
import validators from '../validators';
import { USER_VALIDATION } from '../utils/constants';

/* SUBROUTER */
userRouter.get('/', userController.getAll);
userRouter.post('/create', validators.get(USER_VALIDATION), userController.create);

export default userRouter;
