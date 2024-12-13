import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { allRole, administratorRole} from '../utils/role.util';
import { verifyToken } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/roles.middleware';

const router = Router();
const userController = new UserController();

// @ts-ignore
router.get('/users',verifyToken, roleMiddleware(allRole), userController.getAllUsers);
router.post('/users', userController.createNewUser);
// @ts-ignore
router.put('/users/:id',verifyToken, roleMiddleware(allRole), userController.updateUser);
// @ts-ignore
router.delete('/users/:id',verifyToken, roleMiddleware(administratorRole), userController.deleteUser);
export default router;