import { Router, Request, Response, NextFunction } from 'express';
import authRoutes from '../authRoutes';
import userRoutes from '../userRoutes';
import studentRoutes from '../studentRoutes';
import messageRoutes from '../messageRoutes';
import { authMiddleware } from '../../middleware/authMiddleware';
import validateEmail from '../../middleware/validateEmailMiddleware';
import validateUniqueData from '../../middleware/validateUniqueData';
import validateTokenToRegister from '../../middleware/validateTokenToRegister';
import authorize from '../../middleware/authorize';
import permissionsMap from '../../config/permissionsMap';
import { validateCPFMiddleware } from '../../middleware/validateCPFMiddleware';
import transformData from '../../middleware/transformDataToInsert';

class RoutesConfig {
    private router: Router;

    constructor(private baseRoute: string) {
        this.router = Router();
        this.configureRoutes();
    };

    private configureRoutes(): void {
        
        const registerMiddleware = [
            validateCPFMiddleware,
            transformData,
            validateUniqueData,
            validateTokenToRegister
        ];

        const validateEmailMiddleware = [
            validateEmail
        ];

        this.router.use((req: Request, res: Response, next: NextFunction) => {
            const currentRoute = req.baseUrl + req.path;

            if (currentRoute === `${this.baseRoute}/login` ||
                currentRoute === `${this.baseRoute}/getToken` ||
                currentRoute === `${this.baseRoute}/register`) {
                if (currentRoute === `${this.baseRoute}/register`) {
                    registerMiddleware.forEach(middleware => middleware(req, res, next));
                } else {
                    validateEmailMiddleware.forEach(middleware => middleware(req, res, next));
                }
            } else {
                authMiddleware(req, res, () => {
                    const routePermissions = permissionsMap[req.path];
                    if (routePermissions) {
                        const methodPermissions = routePermissions[req.method];
                        if (methodPermissions) {
                            authorize(methodPermissions, req => req.params.id)(req, res, next);
                        } else {
                            next();
                        }
                    } else {
                        next();
                    }
                });
            }
        });
        this.router.use(authRoutes);
        this.router.use(userRoutes);
        this.router.use(studentRoutes);
        this.router.use(messageRoutes);
    };

    public getRouter(): Router {
        return this.router;
    };
};

export default RoutesConfig;
