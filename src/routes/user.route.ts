import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { allRole, administratorRole, employeeRole } from '../utils/role.util';
import { verifyToken } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/roles.middleware';
import { User } from '../models/user.model';

const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);

router.post('/users', userController.createNewUser);

router.put('/users/:id', userController.updateUser);

router.delete('/users/:id', userController.deleteUser);
export default router;