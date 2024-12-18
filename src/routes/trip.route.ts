import { Router } from 'express';
import { allRole, administratorRole} from '../utils/role.util';
import { verifyToken } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/roles.middleware';
import {TripController} from "../controllers/trip.controller";

const router = Router();
const tripController = new TripController();

//SWAGGER DOCUMENTATION: TRIPS

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Retrieve and show all trips, does not require any parameters. || WILL TAKE A LOT OF TIME
 *     description: Retrieve a list of all trips related to STM transport
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: A list of all trips.
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
 *                     example: "29317787"
 *                   route_id:
 *                     type: string
 *                     example: "523"
 *                   stop_sequence:
 *                     type: integer
 *                     example: 523
 *                   arrival_time:
 *                     type: string
 *                     example: "1293719837"
 *                   departure_time:
 *                     type: string
 *                     example: "1293719837"
 *                   stop_id:
 *                     type: string
 *                     example: "1231321"
 *                   departure_occupancy_status:
 *                     type: string
 *                     example: "EMPTY"
 *                    
 */
router.get('/trips', tripController.getAllTrips);


/**
 * @swagger
 * /api/trips/maxSequences:
 *   get:
 *     summary: Retrieve and show the maxSequences of all trips, if applicable
 *     description: Retrieve a list of all the maxSequences of trips related to STM transport
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: A list of all trip's max sequence.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   route_id:
 *                     type: string
 *                     example: 523
 *                   stop_sequence:
 *                     type: integer
 *                     example: 22
 *                   
 *                    
 */
// @ts-ignore
router.get('/trips/maxSequences', verifyToken, roleMiddleware(allRole), tripController.getMaxSequences);

export default router;