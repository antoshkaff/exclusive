import { prisma } from '@/shared/prisma';
import { IPrivateUser } from '@/shared/types/user.interface';

export class UserDao {
    static async findUserByEmail(email: string): Promise<IPrivateUser | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    static async createUser(data: {
        email: string;
        password: string;
    }): Promise<IPrivateUser> {
        return prisma.user.create({ data });
    }
}
