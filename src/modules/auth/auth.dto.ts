import { z } from 'zod';

export const RegisterDto = z.object({
    email: z
        .string()
        .trim()
        .nonempty({ message: 'Email is required' })
        .pipe(z.email({ message: 'Email is invalid' })),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(72, { message: 'Password must be at most 72 characters' }),
});
export type RegisterInput = z.infer<typeof RegisterDto>;

export const LoginDto = z.object({
    email: z
        .string()
        .trim()
        .nonempty({ message: 'Email is required' })
        .pipe(z.email({ message: 'Email is invalid' })),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
});
export type LoginInput = z.infer<typeof LoginDto>;
