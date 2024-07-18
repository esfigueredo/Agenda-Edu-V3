import { Role, Subjects, typeMessages } from "@prisma/client";

export interface IMessageRepository {
    create(messageData: IMessage): Promise<IMessage>;
    findById(id: string): Promise<IMessage | null>;
    findAll(): Promise<IMessage[]>;
    update(id:string, messageData: IMessage): Promise<IMessage | null>;
    delete(id: string): Promise<boolean>;
}

export interface IMessage {
    id: string;
    messageDate: Date;
    referenceDate: Date;
    title: string;
    role: Role;
    subjects: Subjects[];
    className: string;
    body: string;
    type: typeMessages;
}
