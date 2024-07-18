// services/permissionsService.ts

import { Role } from '@prisma/client';
import { Permission, RolePermissions } from '../@types/permissions';

export class PermissionsService {
    private static rolePermissions: RolePermissions = {
        admin: [
            'create_message', 'view_message', 'edit_message', 'delete_message',
            'create_student', 'view_student', 'edit_student', 'delete_student',
            'create_user', 'view_user', 'edit_user', 'delete_user'
        ],
        teacher: [
            'create_message', 'view_message', 'edit_message', 'delete_message',
            'view_student',
            'view_user'
        ],
        guardian: [
            'view_message',
            'view_student'
        ],
        student: [
            'view_message'
        ],
    };

    static hasPermission(role: Role, requiredPermissions: Permission[]): boolean {
        const userPermissions = PermissionsService.rolePermissions[role] || [];
        return requiredPermissions.every(permission => userPermissions.includes(permission));
    };
};

export default PermissionsService;
