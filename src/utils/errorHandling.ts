import { NextFunction, Request, Response } from 'express';

class ErrorHandling {
    public static errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
        console.error(`Error caught: ${err.message}`);

        if (res.headersSent) {
            return next(err);
        };

        let status = err.status || 500;
        let errorMessage = 'Internal Server Error';

        // Verifica se o erro é do tipo ValidationError
        if (err.name === 'ValidationError') {
            status = 400; // Bad Request
            errorMessage = err.message || 'Validation Error';
        } else if (err.name === 'UnauthorizedError') {
            status = 401; // Unauthorized
            errorMessage = 'Unauthorized';
        };

        // Caso não haja um status ou nome definido no erro, trata como erro interno do servidor
        if (!err.status && !err.name) {
            console.error('Unhandled error:', err);
            status = 500;
            errorMessage = 'Internal Server Error';
        };

        // Monta a resposta de erro em formato JSON
        const response: {
            error: {
                message: string;
                stack?: string; // Adiciona stack apenas em ambiente de desenvolvimento
                [key: string]: any;
            };
        } = {
            error: {
                message: errorMessage,
            },
        };

        // Inclui a stack trace do erro apenas em ambiente de desenvolvimento
        if (process.env.NODE_ENV === 'development') {
            response.error['stack'] = err.stack;
        }

        // Envia a resposta JSON com o status e mensagem definidos
        res.status(status).json(response);
    };

    public static notFoundHandler(req: Request, res: Response): void {
        res.status(404).json({
            error: {
                message: 'Route not found',
            },
        });
    };
};

export default ErrorHandling;
