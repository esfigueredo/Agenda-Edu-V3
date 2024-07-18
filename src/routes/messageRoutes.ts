import { NextFunction, Request, Response, Router } from 'express';
import { MessageController } from '../controllers/MessageController';
import { MessageService } from '../services/MessageService';
import { MessageRepository } from '../repositories/MessageRepository';
import { errorHandler } from '../middleware/errorHandler';

const router = Router();
const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService);

router.post('/messages', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await messageController.createMessage(req, res);
    } catch (error) {
        next(error);
    };
});

router.get('/messages/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await messageController.getMessageById(req, res);
    } catch (error) {
        next(error);
    };
});

router.get('/messages', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await messageController.getAllMessages(req, res);
    } catch (error) {
        next(error);
    };
});

router.put('/messages/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await messageController.updateMessage(req, res);
    } catch (error) {
        next(error);
    };
});

router.delete('/messages/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await messageController.deleteMessage(req, res);
    } catch (error) {
        next(error);
    };
});

router.use(errorHandler);

export default router;
