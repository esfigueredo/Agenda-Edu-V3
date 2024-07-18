import { IStudentRepository, IStudent } from '../interfaces/IStudentRepository';

export class StudentService {
    constructor(private studentRepository: IStudentRepository) {}

    async createStudent(userId: string, student: IStudent): Promise<IStudent> {
        return this.studentRepository.create(userId, student);
    };

    async getStudentById(id: string): Promise<IStudent | null> {
        return this.studentRepository.findById(id);
    };

    async getAllStudents(id: string) {
        return this.studentRepository.findAllStudentsByUserId(id);
    };

    async updateStudent(id: string, user: Partial<IStudent>): Promise<IStudent | null> {
        return this.studentRepository.update(id, user);
    };

    async deleteStudent(id: string): Promise<IStudent> {
        return this.studentRepository.delete(id);
    };
};
