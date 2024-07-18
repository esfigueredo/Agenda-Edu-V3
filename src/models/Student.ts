import { PrismaClient } from '@prisma/client';

import { IStudent } from '../interfaces/IStudentRepository';

const prisma = new PrismaClient();

export class StudentModel implements IStudent {
    id: string;
    name: string;
    cpf: string | null;
    className: string;
    turn: string;
    brithDay: Date;

    constructor({ id, name, cpf, className, turn, brithDay }: IStudent) {
        this.id = id;
        this.name = name;
        this.cpf = cpf  || null;
        this.className = className;
        this.turn = turn;
        this.brithDay = brithDay;
    };
};
