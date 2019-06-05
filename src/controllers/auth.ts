import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import {} from 'dotenv/config';
import * as Boom from '@hapi/boom';
import { getStatusText, FORBIDDEN, OK } from 'http-status-codes';

/**
 * Logs a user in
 *
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 */
export const login = (req: Request, res: Response) => {
  const { user } = req.context;
  // Return token
  jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' }, (error: Error, token) => {
    if (error) return Boom.forbidden(getStatusText(FORBIDDEN));
    return res.status(OK).json({
      token,
      user,
    });
  });
};
