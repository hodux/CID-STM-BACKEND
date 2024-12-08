import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import {verifyToken} from "../middlewares/auth.middleware";

const router = Router();
const authController = new AuthController();


router.post('/login', authController.login);
export default router;