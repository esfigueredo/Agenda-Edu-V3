// @types/permissions.d.ts
import { Role } from "@prisma/client";

export type Permission =
    'create_message' | 'view_message' | 'edit_message' | 'delete_message' |
    'create_student' | 'view_student' | 'edit_student' | 'delete_student' |
    'create_user' | 'view_user' | 'edit_user' | 'delete_user';

export type RolePermissions = Record<Role, Permission[]>;
