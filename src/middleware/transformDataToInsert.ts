import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/IUserRepository";
import { parse } from 'date-fns';

export default function transformData(req: Request, res: Response, next: NextFunction) {
    const user: IUser = req.body;

    user.cpf = user.cpf.replace(/[^\d]/g, '');

    user.password = String(user.password);

    if (typeof user.brithDay === 'string') {
        user.brithDay = parse(user.brithDay, 'dd/MM/yyyy', new Date());
    };

    next();
};
