import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.message) {
        res.status(400).send({
            error: err.stack?.toString(),
            message: err.message,
        });
    } else {
        res.status(500).send({
            error: err.stack?.toString(),
            message: 'Something went wrong',
        });
    }
};
