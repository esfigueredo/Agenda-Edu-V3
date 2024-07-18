import { Address, Role, Student } from "@prisma/client";

export interface IUserRepository {
    create(user: IUser): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUserLogin | null>;
    findByEmailValidate(email: string): Promise<boolean | null>;
    findByCPF(cpf: string): Promise<boolean | null>;
    findAll(): Promise<IUser[]>;
    update(id: string, user: Partial<IUser>): Promise<IUser | null>;
    delete(id: string): Promise<boolean>;
}

export interface IUser {
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
}
export interface IUserLogin {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}
export interface ILoginResult {
    id: string;
    name: string;
    role: Role;
}
