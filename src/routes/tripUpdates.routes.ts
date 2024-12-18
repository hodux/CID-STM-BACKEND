import { Router } from 'express';
import { tripUpdatesController } from '../controllers/tripUpdates.controller';

const router=Router();

//SWAGGER DOCUMENTATION: TRIPS UPDATES

/**
 * @swagger
 * /api/trips/duration:
 *   get:
 *     summary: Retrieve and show all trip's duration, does not require any parameters.
 *     description: Retrieve a list of all trip's duration, containing duration, stops, firstStopTime and lastStopTime 
 *     tags: [Trips | Updates]
*      
 *     responses:
 *       200:
 *         description: A list of all trips durations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   route_id:
 *                     type: string
 *                     example: "523"
 *                   duration:
 *                     type: float
 *                     example: 523.23
 *                   stops:
 *                     type: integer
 *                     example: 1123
 *                   firstStopTime:
 *                     type: integer
 *                     example: 1293719837
 *                   lastStopTime:
 *                     type: integer
 *                     example: 123132165733
 *                   
 *       404:
 *           description: Trips inacessibles / Not found
 * 
 *       403:
 *           description: Requires an authentified user to perform action
 *       400: 
 *           description: An error happened (Bad request)
 *                   
 *                    
 */
router.get("/trips/duration" , tripUpdatesController.getTripFullTime);

export default router;