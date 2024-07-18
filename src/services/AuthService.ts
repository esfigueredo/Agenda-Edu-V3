
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { IAuthService } from '../interfaces/IAuthService';
import { ILoginResult, IUser, IUserLogin, IUserRepository } from '../interfaces/IUserRepository';
import 'dotenv/config';
import { Role } from '@prisma/client';

const revokedTokens: Set<string> = new Set();
class AuthService implements IAuthService {
    private JWT_SECRET = process.env.SECRET_KEY;
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    };

    async login(email: string, password: string): Promise<{ user: ILoginResult, token: string }> {

        if (!this.JWT_SECRET) {
            throw new Error("Chave secreta não definida");
        };

        const userLogin: IUserLogin | null = await this.userRepository.findByEmail(email);

        if (!userLogin) {
            throw new Error('Email incorreto');
        };

        const senhaCorreta = await bcrypt.compare(password, userLogin.password);

        if (!senhaCorreta) {
            throw new Error('Senha incorreta');
        };

        const user = {
            id: userLogin.id,
            name: userLogin.name,
            role: userLogin.role
        } as ILoginResult;

        const token = jwt.sign(user, this.JWT_SECRET, { expiresIn: '24h' });

        return { user, token };
    };

    async register(userData: IUser): Promise<ILoginResult> {

        const createdUser = await this.userRepository.create(userData);

        const user = {
            id: createdUser.id,
            name: createdUser.name,
            role: createdUser.role
        } as ILoginResult;

        return user;
    };

    async generateToken(email: string, password: string, role: Role): Promise<{ email: string, role: Role, token: string }> {

        if (!this.JWT_SECRET) {
            throw new Error("Chave secreta não definida");
        };

        const userLogin: IUserLogin | null = await this.userRepository.findByEmail(email);

        if (userLogin) {
            throw new Error('E-mail já cadastrado');
        };

        const token = jwt.sign({ email: email, role: role }, this.JWT_SECRET, { expiresIn: '24h' });

        return { email, role, token };
    };   
};

export default AuthService;
