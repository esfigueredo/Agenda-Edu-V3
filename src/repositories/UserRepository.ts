import { PrismaClient } from '@prisma/client';
import { IUserRepository, IUser, IUserLogin } from '../interfaces/IUserRepository';
import { UserModel } from '../models/User';
import * as bcrypt from 'bcrypt';

export class UserRepository implements IUserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    };

    async create(user: IUser): Promise<UserModel> {

        user.password = await bcrypt.hash(user.password, 10);

        return this.prisma.user.create({
            data: {
                ...user,
                address: user.address ? {
                    create: user.address
                } : undefined,
                student: user.student ? {
                    create: user.student.map(student => ({
                        id: student.id,
                        name: student.name,
                        cpf: student.cpf,
                        className: student.className,
                        turn: student.turn,
                        brithDay: student.brithDay
                    })),
                } : undefined,
            },
            include: {
                address: true,
                student: true
            }
        });
    };

    async findById(id: string): Promise<IUser | null> {
        return await this.prisma.user.findUnique({
            where: { id },
            include: {
                address: true,
                student: true
            }
        });
    };

    async findByEmail(email: string): Promise<IUserLogin | null> {
        return  await this.prisma.user.findUnique({
            where: { email }
        });
    };
    
    async findByEmailValidate(email: string): Promise<boolean | null> {
        const userExist = await this.prisma.user.findUnique({
            where: { email }
        });
        if (userExist) {
            return true;
        };
        return false;
    };

    async findByCPF(cpf: string): Promise<boolean | null> {
        const userExist = await this.prisma.user.findUnique({
            where: { cpf }
        });
        if (userExist) {
            return true;
        };
        return false;
    };

    async findAll(): Promise<IUser[]> {
        return await this.prisma.user.findMany({
            include: {
                address: true,
                student: true
            }
        });
    };

    async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
        return await this.prisma.user.update({
            where: { id },
            data: {
                ...user,
                address: user.address ? {
                    update: user.address
                } : undefined,
                student: user.student ? {
                    set: user.student.map(student => ({ id: student.id }))
                } : undefined
            },
            include: {
                address: true,
                student: true
            }
        });
    };

    async delete(id: string): Promise<boolean> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                include: { address: true, student: true },
            });

            if (!user) {
                throw new Error("User not found");
            }

            if (user.address) {
                await this.prisma.address.delete({
                    where: { id: user.address.id },
                });
            }

            if (user.student && user.student.length > 0) {
                await this.prisma.student.deleteMany({
                    where: { id: { in: user.student.map(student => student.id) } },
                });
            }

            await this.prisma.user.delete({ where: { id }, });
            return true;
        } catch (error) {
            return false;
        }
    };
};
