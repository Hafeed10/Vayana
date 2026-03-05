
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function getUserFromRequest() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
        return null;
    }

    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token.value, secret);
        return payload.userId;
    } catch (error) {
        return null;
    }
}
