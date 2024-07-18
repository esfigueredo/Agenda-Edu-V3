export interface IStudentRepository {
    create(userId: string, studentData: Omit<IStudent, 'id' | 'userId'>): Promise<IStudent>;
    findById(id: string): Promise<IStudent | null>;
    findAll():Promise<IStudent[] | null>;
    findAllStudentsByUserId(id: string): Promise<IStudent[]>;
    update(id: string, student: Partial<IStudent>): Promise<IStudent | null>;
    delete(id: string): Promise<IStudent>;
}

export interface IStudent {
    id: string;
    name: string;
    cpf?: string | null;
    className: string;
    turn: string;
    brithDay: Date;
}
