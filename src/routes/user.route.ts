import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { allRole, administratorRole} from '../utils/role.util';
import { verifyToken } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/roles.middleware';

const router = Router();
const userController = new UserController();


//SWAGGER DOCUMENTATION: USERS

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve and show all users, does not require any parameters.
 *     description: Retrieve a list of all users having access to this api
 *     tags: [Users]
 *     security:
 *         - bearerAuth: []
*      
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
 *                   username:
 *                     type: string
 *                     example: bigGeorge
 *                   password:
 *                     type: string
 *                     example: georgeHuge92
 *                   role:
 *                     type: string
 *                     example: admin
 *       404:
 *           description: Users inacessibles / Not found
 * 
 *       403:
 *           description: Requires an authentified user to perform action
 *       400: 
 *           description: An error happened (Bad request)
 *                   
 *                    
 */
// @ts-ignore
router.get('/users',verifyToken, roleMiddleware(allRole), userController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Add a new user, requires all body components.
 *     description: Add a new user, requires an email,username and password.
 *     consumes:
 *       - application/json
 *     tags: [Users]
 *     security:
 *         - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *            schema:
 *              type: object
 *              $ref: "#/definitions/UserModel"
 *              required:
 *               - email
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: New User Added.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: bigGeorge
 *                   password:
 *                     type: string
 *                     example: georgeHuge92
 *                   email:
 *                     type: string
 *                     example: georgeBig@gmail.com
 *       404:
 *           description: Users inacessibles / Not found
 *       403:
 *           description: Requires an authentified user to perform action
 *       400: 
 *           description: An error happened (Bad request)
 * definitions:
 *   UserModel: #             
 *      type: object
 *      required:
 *         - email
 *         - username
 *         - password
 *      properties:
 *          username:
 *            type: string
 *            example: bigGeorge
 *          password:
 *            type: string
 *            example: georgeHuge92
 *          email:
 *            type: string
 *            example: georgeBig@gmail.com
 */
router.post('/users', userController.createNewUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Mofify an existing user, requires one body component and a valid Id to be modified.
 *     description: Modify an existing user, available fields are email, username, password (not recommended).
 *     consumes:
 *       - application/json
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     security:
 *         - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *            schema:
 *              type: object
 *              $ref: "#/definitions/UserModel"
 *              required:
 *               - email
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User Modified.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: bigGeorge
 *                   password:
 *                     type: string
 *                     example: georgeHuge92
 *                   email:
 *                     type: string
 *                     example: georgeBig@gmail.com
 *       404:
 *           description: Users inacessibles / Not found
 *       403:
 *           description: Requires an authentified user to perform action
 *       400: 
 *           description: An error happened (Bad request)
 * definitions:
 *   UserModel: #             
 *      type: object
 *      required:
 *         - email
 *         - username
 *         - password
 *      properties:
 *          username:
 *            type: string
 *            example: bigGeorge
 *          password:
 *            type: string
 *            example: georgeHuge92
 *          email:
 *            type: string
 *            example: georgeBig@gmail.com
 */

// @ts-ignore
router.put('/users/:id',verifyToken, roleMiddleware(allRole), userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete an existing user, requires a valid Id.
 *     description: Delete an existing user, will not work if no valid Id is specified.
 *     consumes:
 *       - application/json
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *              type: string
 *         required: true
 *     security:
 *         - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted.
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               
 *       404:
 *           description: Users inacessibles / Not found
 *       403:
 *           description: Requires an admin to perform action
 *       400: 
 *           description: An error happened (Bad request)
 * 
 */
// @ts-ignore
router.delete('/users/:id',verifyToken, roleMiddleware(administratorRole), userController.deleteUser);
export default router;