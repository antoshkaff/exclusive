import { UserDao } from '@/modules/user/user.dao';
import { checkPassword, hashPassword } from '@/shared/utils/hash';
import { signJwt } from '@/shared/utils/jwt';
import { LoginDto, RegisterDto } from './auth.dto';
import { z } from 'zod';
import { IPublicUser } from '@/shared/types/user.interface';

type ServiceOk<T> = { ok: true; status: number; data: T; token?: string };
type ServiceErr = { ok: false; status: number; error: string };
export type ServiceResult<T> = ServiceOk<T> | ServiceErr;

export class AuthService {
    static async loginUser(
        input: unknown,
    ): Promise<ServiceResult<IPublicUser>> {
        try {
            const { email, password } = LoginDto.parse(input);

            const user = await UserDao.findUserByEmail(email);

            if (!user) {
                return {
                    ok: false,
                    status: 401,
                    error: 'Wrong email or password',
                };
            }

            const ok = await checkPassword(password, user.password);
            if (!ok) {
                return {
                    ok: false,
                    status: 401,
                    error: 'Wrong email or password',
                };
            }

            const token = await signJwt({ id: user.id, email: user.email });

            return {
                ok: true,
                status: 200,
                data: { id: user.id, email: user.email },
                token,
            };
        } catch (e) {
            if (e instanceof z.ZodError) {
                return {
                    ok: false,
                    status: 422,
                    error: e.issues[0]?.message ?? 'Validation failed',
                };
            }

            return { ok: false, status: 500, error: 'Internal server error' };
        }
    }

    static async registerUser(
        input: unknown,
    ): Promise<ServiceResult<IPublicUser>> {
        try {
            const { email, password } = RegisterDto.parse(input);

            const exists = await UserDao.findUserByEmail(email);
            if (exists) {
                return { ok: false, status: 409, error: 'User already exists' };
            }

            const passwordHash = await hashPassword(password);
            const user = await UserDao.createUser({
                email,
                password: passwordHash,
            });

            return {
                ok: true,
                status: 201,
                data: { id: user.id, email: user.email },
            };
        } catch (e) {
            if (e instanceof z.ZodError) {
                return {
                    ok: false,
                    status: 422,
                    error: e.issues[0]?.message ?? 'Validation failed',
                };
            }
            return { ok: false, status: 500, error: 'Internal server error' };
        }
    }
}
