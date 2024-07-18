import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY || '';

export default function validateTokenToRegister(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    const { email, role } = req.body;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    };

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('Token de autenticação inválido');
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    };

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            email: string,
            role: Role
        };

        if (decoded.email !== email) {
            return res.status(401).json({ error: 'E-mail não correspondente ao token ' });
        } else if (!Object.values(Role).includes(decoded.role)) {
            return res.status(401).json({ error: 'Role inválido no token' });
        } else if (decoded.role !== role) {
            return res.status(401).json({ error: 'Role não correspondente ao token ' })
        } else {
            next();
        };
    } catch (err) {
        console.log('Token de autenticação inválido');
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    };
};