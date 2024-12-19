import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { logger } from '../utils/logger';

export class AuthController {

    public async login(req: Request, res: Response): Promise<void> {
        const { identifier, password } = req.body;
        try {
            const token = await AuthService.login(identifier, password);
            if (token) {
                logger.info("User logged in successfully.");
                res.status(200).json({ token });
            } else {
                res.status(401).json("Invalid identifier or password.");
            }
        } catch (error) {
            logger.error("Error occurred during login:", error);
            res.status(500).json("Internal server error.");
        }
    }
}
