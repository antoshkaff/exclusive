import bcrypt from 'bcryptjs';

export const hashPassword = async (pwd: string) => {
    return await bcrypt.hash(pwd, 10);
};

export const checkPassword = async (pwd: string, hash: string) => {
    return await bcrypt.compare(pwd, hash);
};
