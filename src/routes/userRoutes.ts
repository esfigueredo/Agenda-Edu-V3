import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { errorHandler } from '../middleware/errorHandler';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.createUser(req, res);
    } catch (error) {
        next(error);
    };
});

router.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.getUserById(req, res);
    } catch (error) {
        next(error);
    };
});

router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.getAllUsers(req, res);
    } catch (error) {
        next(error);
    };
});

router.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.updateUser(req, res);
    } catch (error) {
        next(error);
    };
});

router.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.deleteUser(req, res);
    } catch (error) {
        next(error);
    };
});

router.use(errorHandler);

export default router;
