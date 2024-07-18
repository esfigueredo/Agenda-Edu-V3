import { IUserRepository, IUser } from '../interfaces/IUserRepository';

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    async createUser(user: IUser): Promise<IUser> {
        return this.userRepository.create(user);
    };

    async getUserById(id: string): Promise<IUser | null> {
        return this.userRepository.findById(id);
    };

    async getAllUsers(): Promise<IUser[]> {
        return this.userRepository.findAll();
    };

    async updateUser(id: string, user: Partial<IUser>): Promise<IUser | null> {
        return this.userRepository.update(id, user);
    };

    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.delete(id);
    };
};
