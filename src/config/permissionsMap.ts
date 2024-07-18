import { Permission } from './../@types/permissions';

const permissionsMap: Record<string, Record<string, Permission[]>> = {
    '/messages': {
        'POST': ['create_message'],
        'GET': ['view_message'],
        'PUT': ['edit_message'],
        'DELETE': ['delete_message'],
    },
    '/users': {
        'POST': ['create_user'],
        'GET': ['view_user'],
        'PUT': ['edit_user'],
        'DELETE': ['delete_user'],
    },
    '/students': {
        'POST': ['create_student'],
        'GET': ['view_student'],
        'PUT': ['edit_student'],
        'DELETE': ['delete_student'],
    }
};

export default permissionsMap;