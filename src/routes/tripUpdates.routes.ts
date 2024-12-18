import { Router } from 'express';
import { tripUpdatesController } from '../controllers/tripUpdates.controller';

const router=Router();

//SWAGGER DOCUMENTATION: TRIPS UPDATES

/**
 * @swagger
 * /api/trips/duration:
 *   get:
 *     summary: Retrieve and show all trip's duration, does not require any parameters.
 *     description: Retrieve a list of all trip's duration having access to this api
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