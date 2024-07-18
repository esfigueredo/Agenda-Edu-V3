import { PrismaClient } from '@prisma/client';
import { IStudentRepository, IStudent } from '../interfaces/IStudentRepository';
import { StudentModel } from '../models/Student';


export class StudentRepository implements IStudentRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    };

    async create(userId: string, studentData: Omit<IStudent, 'id' | 'userId'>): Promise<StudentModel> {
        const user = await this.prisma.user.findFirst({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found');
        };

        const student = await this.prisma.student.create({
            data: {
                ...studentData,
                userId: userId,
            },
        });

        return student;
    };

    async findById(id: string): Promise<IStudent | null> {
        return await this.prisma.student.findUnique({
            where: { id },
        });
    };

    async findAllStudentsByUserId(id: string): Promise<IStudent[]> {
        return await this.prisma.student.findMany({
            where: {
                userId: id
            },
        });
    };

    async findAll(): Promise<IStudent[]> {
        return await this.prisma.student.findMany();
    };

    async update(id: string, student: Partial<IStudent>): Promise<IStudent | null> {
        return await this.prisma.student.update({
            where: { id },
            data: { ...student },
        });
    };

    async delete(id: string): Promise<IStudent> {

        const student = await this.prisma.student.findUnique({
            where: { id },
        });

        if (!student) {
            throw new Error("student not found");
        };

        await this.prisma.student.delete({
            where: { id },
        });

        return student;
    };
};
