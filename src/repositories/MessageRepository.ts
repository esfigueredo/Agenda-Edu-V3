
import { PrismaClient } from '@prisma/client';
import { IMessage, IMessageRepository } from './../interfaces/IMessageRepository';
export class MessageRepository implements IMessageRepository {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    };

    async create(messageData: IMessage): Promise<IMessage> {
        try {
            const createdMessage = await this.prisma.messages.create({
                data: {
                    messageDate: messageData.messageDate,
                    referenceDate: messageData.referenceDate,
                    title: messageData.title,
                    role: messageData.role,
                    subjects: messageData.subjects,
                    className: messageData.className,
                    body: messageData.body,
                    type: messageData.type
                },
            });
            return createdMessage;
        } catch (error) {
            console.error('Error creating message:', error);
            throw error;
        };
    };

    async findById(id: string): Promise<IMessage | null> {
        return await this.prisma.messages.findUnique({
            where: { id },
        });
    };

    async findAll(): Promise<IMessage[]> {
        return await this.prisma.messages.findMany();
    };

    async update(id: string, messageData: IMessage): Promise<IMessage | null> {
        return await this.prisma.messages.update({
            where: { id },
            data: { ...messageData },
        });
    };

    async delete(id: string): Promise<boolean> {
        try {
            await this.prisma.messages.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            console.error(`Error deleting message with id ${id}:`, error);
            return false;
        };
    };
};