
import { NextFunction, Request, Response, Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserRepository } from '../repositories/UserRepository';
import AuthService from '../services/AuthService';

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authController.login(req, res, next);
    } catch (error) {
        next(error);
    };
});

router.post('/getToken', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authController.getToken(req, res);
    } catch (error) {
        next(error);
    };
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authController.register(req, res);
    } catch (error) {
        next(error);
    };
});

router.get('/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authController.logout(req, res, next);
    } catch (error) {
        next(error);
    };
});

export default router;
