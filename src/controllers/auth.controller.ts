import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { logger } from '../utils/logger';

export class AuthController {

    public async login(req: Request, res: Response): Promise<void> {
        let email = req.body.email;
        let password = req.body.password;
        console.log("email", email, password);
        const token = await AuthService.login(email, password);
        console.log(token);
        if(token != ""){
            logger.info("L'utilisateur a connecté avec succes");
            res.status(200).json({token})
        }else{
            res.status(401).json("Invalid email or password");
        }
    }
}