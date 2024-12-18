import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import {verifyToken} from "../middlewares/auth.middleware";

const router = Router();
const authController = new AuthController();

//SWAGGER DOCUMENTATION: AUTHENTIFICATION

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login function for user
 *     description: Add a new user, requires an email,username and password.
 *     consumes:
 *       - application/json
 *     tags: [Login]
 *     security:
 *         - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *            schema:
 *              type: object
 *              $ref: "#/definitions/LoginUserModel"
 *              required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful Login.
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
 *           description: User inacessible / Not found
 *       401:
 *           description: Entered data is invalid
 * definitions:
 *   LoginUserModel: #             
 *      type: object
 *      required:
 *         - email
 *         - password
 *      properties:
 *          password:
 *            type: string
 *            example: georgeHuge92
 *          email:
 *            type: string
 *            example: georgeBig@gmail.com
 */
router.post('/login', authController.login);
export default router;