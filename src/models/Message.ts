
import { Role, Subjects } from '@prisma/client';
import { IMessage } from './../interfaces/IMessageRepository'

export class MessageModel implements IMessage {
    id: string;
    messageDate: Date;
    referenceDate: Date;
    title: string;
    role: Role;
    subjects: Subjects[];
    className: string;
    body: string;

    constructor({ id, messageDate, referenceDate, title, role, subjects, className, body }: IMessage) {
        this.id = id;
        this.messageDate = messageDate;
        this.referenceDate = referenceDate;
        this.title = title;
        this.role = role;
        this.subjects = subjects;
        this.className = className;
        this.body = body;
    };
};