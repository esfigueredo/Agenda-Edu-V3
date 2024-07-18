import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = new UserRepository

export default async function validateUniqueData(req: Request, res: Response, next: NextFunction) {
    
    const { email, cpf } = req.body;

    const userEmail = await userRepository.findByEmail(email);
    const userCpf = await userRepository.findByCPF(cpf);

    if (userEmail) {
        return res.status(400).json({ message: "Email já registrado" });
    };

    if (userCpf) {
        return res.status(400).json({ message: "CPF já registrado" });
    };

    next();
};