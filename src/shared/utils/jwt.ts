import { JWTPayload, SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const expiresIn = '7d';

export async function signJwt(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secret);
}
