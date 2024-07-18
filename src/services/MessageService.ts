import { IMessage, IMessageRepository } from "../interfaces/IMessageRepository";

export class MessageService {
    constructor(private messageRepository: IMessageRepository) { }

    async createMessage(messageData: IMessage): Promise<IMessage>{
        return this.messageRepository.create(messageData);
    };

    async getMessageById(id: string): Promise<IMessage | null> {
        return this.messageRepository.findById(id);
    };

    async getAllMessages(): Promise<IMessage[]> {
        return this.messageRepository.findAll();
    };

    async updateMessage(id: string, messageData: IMessage): Promise<IMessage | null> {
        return this.messageRepository.update(id, messageData);
    };

    async deleteMessage(id: string): Promise<boolean> {
        return this.messageRepository.delete(id);
    };
};