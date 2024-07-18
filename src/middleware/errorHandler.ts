import { NextFunction, Request, Response } from 'express';
import ErrorHandling from '../utils/errorHandling';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    ErrorHandling.errorHandler(err, req, res, next);
};

export function notFoundHandler(req: Request, res: Response): void {
    ErrorHandling.notFoundHandler(req, res);
};
