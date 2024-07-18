
import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';

export class StudentController {
    constructor(private studetService: StudentService) { }

    async createstudent(req: Request, res: Response): Promise<void> {
        try {            
            const student = await this.studetService.createStudent(req.params.id, req.body);
            res.status(201).json(student);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async getstudentById(req: Request, res: Response): Promise<void> {
        try {
            const student = await this.studetService.getStudentById(req.params.id);
            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({ error: 'student not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async getAllstudents(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.logedUser.id
            const students = await this.studetService.getAllStudents(userId);
            res.status(200).json(students);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async updatestudent(req: Request, res: Response): Promise<void> {
        try {
            const student = await this.studetService.updateStudent(req.params.id, req.body);
            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({ error: 'student not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async deletestudent(req: Request, res: Response): Promise<void> {
        try {
            const deletedStudent  = await this.studetService.deleteStudent(req.params.id);
            if (deletedStudent) {
                res.status(200).json(deletedStudent);
            } else {
                res.status(404).json({ error: 'student not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };
}
