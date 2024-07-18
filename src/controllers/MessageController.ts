import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

export class MessageController {
    constructor(private messageService: MessageService) { }

    async createMessage(req: Request, res: Response): Promise<void> {
        try {
            const message = await this.messageService.createMessage(req.body);
            res.status(201).json(message);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async getMessageById(req: Request, res: Response): Promise<void> {
        try {
            const message = await this.messageService.getMessageById(req.params.id);
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({ error: 'Message not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async getAllMessages(req: Request, res: Response): Promise<void> {
        try {
            const message = await this.messageService.getAllMessages();
            res.status(200).json(message);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async updateMessage(req: Request, res: Response): Promise<void> {
        try {
            const message = await this.messageService.updateMessage(req.params.id, req.body);
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({ error: 'Message not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error occurred' });
            }
        }
    };

    async deleteMessage(req: Request, res: Response): Promise<void> {
        try {

            const success = await this.messageService.deleteMessage(req.params.id);
            if (success) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'Message not found' });
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