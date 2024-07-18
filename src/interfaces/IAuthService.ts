
import { Role } from '@prisma/client';
import { ILoginResult, IUser } from './IUserRepository';

export interface IAuthService {
    login(email: string, senha: string): Promise<{ user: ILoginResult, token: string }>;
    register(userData: IUser): Promise<ILoginResult>;
    generateToken(email: string, password: string, role: Role): Promise<{ email: string, role: Role, token: string }>;
}

