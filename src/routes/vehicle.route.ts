import {Router} from "express";
import {VehicleController} from "../controllers/vehicle.controller";

const router = Router();
const vehicleController = new VehicleController();

router.get("/vehicles", vehicleController.getAllVehicles);
router.get("/vehicles/:routeId", vehicleController.getVehicleByRouteId);
router.get("/seats", vehicleController.getVehicleCountPerSeat);

export default router;