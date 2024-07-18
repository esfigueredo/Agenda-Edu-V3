import { Address, PrismaClient, Role, Student } from '@prisma/client';
import { IUser } from '../interfaces/IUserRepository';

const prisma = new PrismaClient();

export class UserModel implements IUser {
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

    constructor({
        id, name, email, password, role, student, cpf, telefone1, telefone2, telefone3, brithDay, address
    }: IUser) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.student = student || null;
        this.cpf = cpf;
        this.telefone1 = telefone1;
        this.telefone2 = telefone2;
        this.telefone3 = telefone3;
        this.brithDay = brithDay;
        this.address = address || null;
    };
};
