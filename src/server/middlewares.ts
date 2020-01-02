import { NextFunction, Request, Response } from 'express';
import { anonymousUser } from '../models/auth';

type Middleware = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

/**
 * Ensure the user object is always amended with the anonymous user unless a user is logged in.
 */
export const userMiddleware: Middleware = async (req, _, next) => {
  // This is the only place the user may be undefined.
  if (!req.user) {
    req.user = anonymousUser;
  }
  return await next();
};
