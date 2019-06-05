'use strict';

import { Router } from 'express';
import * as userController from '../controllers/users';
import * as auth from '../middlewares/auth';
import * as validators from '../validators/helper';
import { USER } from '../utils/constants';

const userRouter = Router();

/* SUBROUTER */
userRouter.get('/',
               userController.getAll);

userRouter.get('/:userID',
               validators.get(USER.IS_ID_CORRECT),
               userController.getByID);

userRouter.post('/create',
                validators.get(USER.VALIDATION),
                userController.create);

userRouter.put('/:userID',
               auth.isAuth,
               validators.get(USER.MODIFICATION),
               userController.modifyByID);

userRouter.delete('/:userID',
                  validators.get(USER.IS_ID_CORRECT),
                  userController.deleteByID);

export default userRouter;
