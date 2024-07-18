import { Request, Response, NextFunction } from 'express';
import { validateCPF } from '../utils/validateCPF';

export function validateCPFMiddleware(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | void {
    const { cpf } = req.body;
    if (!cpf || !validateCPF(cpf)) {
        return res.status(400).json({ error: 'CPF inválido' });
    };

    next();
};
