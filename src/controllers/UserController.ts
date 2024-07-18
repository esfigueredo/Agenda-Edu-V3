import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    constructor(private userService: UserService) { }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.getUserById(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.updateUser(req.params.id, req.body);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {

            const success = await this.userService.deleteUser(req.params.id);
            if (success) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'User not found' });
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
