
import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { Role } from '@prisma/client';
import { IUser } from '../interfaces/IUserRepository';

export class AuthController {
    constructor(private authService: AuthService) { }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const result = await this.authService.login(email, password);
        res.status(200).json(result);
    };

    async getToken(req: Request, res: Response) {
        const { email, password, role } = req.body;
        const result = await this.authService.generateToken(email as string, password as string, role as Role);
        res.status(200).json(result);
    };

    async register(req: Request, res: Response) {
        const userData: IUser = req.body;
        const result = await this.authService.register(userData);
        res.status(200).json(result);
    };

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("jsonwebtoken");
            res.clearCookie("refreshtoken");
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    };
}
