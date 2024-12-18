import {Router} from "express";
import {VehicleController} from "../controllers/vehicle.controller";

const router = Router();
const vehicleController = new VehicleController();

//SWAGGER DOCUMENTATION: VEHICULES

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Retrieve and show all vehicles, does not require any parameters.
 *     description: Retrieve a list of all vehicles possessed by the STM 
 *     tags: [Vehicles]
*      
 *     responses:
 *       200:
 *         description: A list of all vehicles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "293177874352341"
 *                   id:
 *                     type: string
 *                     example: "463512"
 *                   vehicle_position_longitude:
 *                     type: float
 *                     example: 92.132
 *                   vehicle_position_latitude:
 *                     type: float
 *                     example: -12.54
 *                   vehicle_trip_trip_id:
 *                     type: string
 *                     example: 923123132
 *                   vehicle_trip_route_id:
 *                     type: string
 *                     example: 12313241234
 *                   vehicle_trip_start_date:
 *                     type: string
 *                     example: 83783472213
 *                   vehicle_current_stop_sequence:
 *                     type: integer
 *                     example: 42
 *                   vehicle_current_status:
 *                     type: string
 *                     example: "In_TRANSIT_TO"
 *                   vehicle_occupancy_status:
 *                     type: string
 *                     example: "STANDING_ROOM_ONLY"
 *       404:
 *           description: Vehicles inacessibles / Not found
 * 
 *       403:
 *           description: Requires an authentified user to perform action
 *       400: 
 *           description: An error happened (Bad request)
 *                   
 *                    
 */
router.get("/vehicles", vehicleController.getAllVehicles);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Retrieve and show a vehicle, does require a routeID.
 *     description: Retrieve a a vehicle, result will be determined by the routeID associated to the vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: A vehicle by routeID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "293177874352341"
 *                   id:
 *                     type: string
 *                     example: "463512"
 *                   vehicle_position_longitude:
 *                     type: float
 *                     example: 92.132
 *                   vehicle_position_latitude:
 *                     type: float
 *                     example: -12.54
 *                   vehicle_trip_trip_id:
 *                     type: string
 *                     example: 923123132
 *                   vehicle_trip_route_id:
 *                     type: string
 *                     example: 12313241234
 *                   vehicle_trip_start_date:
 *                     type: string
 *                     example: 83783472213
 *                   vehicle_current_stop_sequence:
 *                     type: integer
 *                     example: 42
 *                   vehicle_current_status:
 *                     type: string
 *                     example: "In_TRANSIT_TO"
 *                   vehicle_occupancy_status:
 *                     type: string
 *                     example: "STANDING_ROOM_ONLY"
 *       404:
 *           description: Vehicles inacessibles / Not found
 * 
 *       403:
 *           description: Requires an authentified user to perform action
 *       400: 
 *           description: An error happened (Bad request)
 *                   
 *                    
 */
router.get("/vehicles/:routeId", vehicleController.getVehicleByRouteId);

/**
 * @swagger
 * /api/seats:
 *   get:
 *     summary: Retrieve and show all seats in vehicles, does not require any parameters | NOT CURRENTLY IMPLEMENTED
 *     description: Retrieve a list of all seats in vehicles possessed by the STM 
 *     tags: [Vehicles]
*      
 *     responses:
 *       200:
 *         description: A list of all seats in vehicles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "293177874352341"
 *                   id:
 *                     type: string
 *                     example: "463512"
 *                   vehicle_position_longitude:
 *                     type: float
 *                     example: 92.132
 *                   vehicle_position_latitude:
 *                     type: float
 *                     example: -12.54
 *                   vehicle_trip_trip_id:
 *                     type: string
 *                     example: 923123132
 *                   vehicle_trip_route_id:
 *                     type: string
 *                     example: 12313241234
 *                   vehicle_trip_start_date:
 *                     type: string
 *                     example: 83783472213
 *                   vehicle_current_stop_sequence:
 *                     type: integer
 *                     example: 42
 *                   vehicle_current_status:
 *                     type: string
 *                     example: "In_TRANSIT_TO"
 *                   vehicle_occupancy_status:
 *                     type: string
 *                     example: "STANDING_ROOM_ONLY"
 *       404:
 *           description: Vehicles inacessibles / Not found
 * 
 *       403:
 *           description: Requires an authentified user to perform action
 *       400: 
 *           description: An error happened (Bad request)
 *                   
 *                    
 */
router.get("/seats", vehicleController.getVehicleCountPerSeat);

export default router;