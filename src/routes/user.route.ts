import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { allRole, administratorRole} from '../utils/role.util';
import { verifyToken } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/roles.middleware';

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve and show all users, does not require any parameters.
 *     description: Retrieve a list of all users having access to this api
 *     tags: [Users]
 *     security:
*         - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 29317787435
 *                   trip_id:
 *                     type: string
 *                     example: 29317787
 *                   route_id:
 *                     type: string
 *                     example: 523
 *                   stop_sequence:
 *                     type: integer
 *                     example: 523
 *                   arrival_time:
 *                     type: string
 *                     example: 1293719837
 *                   departure_time:
 *                     type: string
 *                     example: 1293719837
 *                   stop_id:
 *                     type: string
 *                     example: 1231321
 *                   departure_occupancy_status:
 *                     type: string
 *                     example: EMPTY
 *                    
 */
// @ts-ignore
router.get('/users',verifyToken, roleMiddleware(allRole), userController.getAllUsers);
router.post('/users', userController.createNewUser);
// @ts-ignore
router.put('/users/:id',verifyToken, roleMiddleware(allRole), userController.updateUser);
// @ts-ignore
router.delete('/users/:id',verifyToken, roleMiddleware(administratorRole), userController.deleteUser);
export default router;