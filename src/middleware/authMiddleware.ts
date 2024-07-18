import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, IUserRepository } from '../interfaces/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import { Address, Role, Student } from '@prisma/client';

const JWT_SECRET = process.env.SECRET_KEY || '';
const userRepository: IUserRepository = new UserRepository();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

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
            id: string;
            name: string;
            email: string;
            password: string;
            role: Role;
            student?: Student[] | null;
            cpf: string;
            telefone1: string;
            telefone2?: string | null;
            telefone3?: string | null;
            brithDay: Date;
            address: Address | null;
        } as IUser;

        const findedUser = await userRepository.findById(decoded.id);

        if (!findedUser) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        };

        req.logedUser = decoded;
        next();
    } catch (err) {
        console.log('Token de autenticação inválido');
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    };
};
