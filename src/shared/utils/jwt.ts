import { JWTPayload, jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const expiresIn = '7d';

export async function signJwt(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secret);
}

export async function verifyToken(token?: string) {
    if (!token) return null;
    try {
        return await jwtVerify(token, secret);
    } catch {
        return null;
    }
}
