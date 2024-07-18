// middlewares/authorize.ts
import { Request, Response, NextFunction } from 'express';
import { Permission } from './../@types/permissions';
import PermissionsService from '../services/PermissionService';
import { IUser } from '../interfaces/IUserRepository';

const authorize = (requiredPermissions: Permission[], getResourceId: (req: Request) => string | null) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        
        const user = req.logedUser; 

        if (!user?.role) {
            return res.status(403).json({ message: 'Acesso negado' });
        };

        if (!PermissionsService.hasPermission(user.role, requiredPermissions)) {
            return res.status(403).json({ message: 'Permissão insuficiente' });
        };

        if (user.role === 'guardian') {
            const resourceId = getResourceId(req);
            if (resourceId && user.id !== resourceId && !await isGuardianOfStudent(user)) {
                return res.status(403).json({ message: 'Permissão insuficiente' });
            };
        };
        next();
    };
};

async function isGuardianOfStudent(userData : IUser): Promise<boolean> {
    
    const studentIds = userData.student?.map(student => student.userId) || [];
    const userId = userData.id
    
    return studentIds.every(studentId => studentId === userId);
};

export default authorize;
