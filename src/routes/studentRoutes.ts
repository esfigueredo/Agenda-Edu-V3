import { NextFunction, Request, Response, Router } from 'express';
import { errorHandler } from '../middleware/errorHandler';
import { StudentRepository } from '../repositories/StudentRepositry';
import { StudentService } from '../services/StudentService';
import { StudentController } from '../controllers/StudentController';

const router = Router();
const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

router.post('/students/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await studentController.createstudent(req, res);
    } catch (error) {
        next(error);
    };
});

router.get('/students/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await studentController.getstudentById(req, res);
    } catch (error) {
        next(error);
    };
});

router.get('/students', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await studentController.getAllstudents(req, res);
    } catch (error) {
        next(error);
    };
});

router.put('/students/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await studentController.updatestudent(req, res);
    } catch (error) {
        next(error);
    };
});

router.delete('/students/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await studentController.deletestudent(req, res);
    } catch (error) {
        next(error);
    };
});

router.use(errorHandler);

export default router;
