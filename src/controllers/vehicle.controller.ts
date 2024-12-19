import { VehicleService } from "../services/vehicle.service";
import { Request, Response } from 'express';

export class VehicleController {
    public async getAllVehicles(req : Request, res : Response) {
        const vehicles = await VehicleService.getAllVehicles();
        if (!vehicles) {
            res.status(404).json({"message" : "No vehicles found"});
        }
        res.status(200).json(vehicles);
    }

    public async getVehicleByRouteId(req : Request, res : Response) {
        const routeId = req.params.routeId;
        const vehicle = await VehicleService.getVehicleByRouteId(routeId);
        if (!vehicle) {
            res.status(404).json({"message" : "No vehicles found"});
        }
        res.status(200).json(vehicle);
    }

    public async getVehicleCountPerSeat(req : Request, res : Response) {
        
        const vehicles = await VehicleService.getVehicleCountPerSeat();
         if (vehicles != null) {
             res.status(404).json({"message" : "No vehicles found"});
         }
        res.status(200).json(vehicles);
        
    }
        

}