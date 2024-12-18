// import NodeRSA from 'node-rsa';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../utils/jwt.util';
import { UserService } from './user.service';

export class AuthService {
    public static async login(emailOrUsername: string, password: string): Promise<string> {
        const user = await UserService.findByEmailOrUsername(emailOrUsername);
        if (!user) {
            return "User or email not found";
        }

        if (await bcrypt.compare(password, user.data.password)) {
            const token = jwt.sign({ id: user.data.id, role: user.data.role }, JWT_SECRET, { expiresIn: '1h' });
            return token;
        } else {
            return "Invalid password";
        }
    }
    public static verifyToken(token: string): any {
        return jwt.verify(token, JWT_SECRET);
    }
}
