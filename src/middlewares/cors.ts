import { Request, Response, NextFunction } from 'express';

/**
 * Adds important CORS headers to the HTTP Response
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
};

export default cors;
