import {Vehicle} from "../models/vehicle.model";
import {logger} from "../utils/logger";

import * as dfd from "danfojs-node";
import { toJSON } from "danfojs-node"

export class VehicleService {

    public static async getAllVehicles() {
        try {
            const vehicles = await Vehicle.find();
            logger.info("Vehicle Service: getAllVehicle - Success");
            return vehicles
        } catch (error) {
            logger.error("Vehicle Service: getAllVehicle - ", error);
        }
    }

    public static async getVehicleByRouteId(routeId: string) {
        try {
            const vehicle = await Vehicle.findOne({vehicle_trip_route_id:routeId})
            logger.info("Vehicle Service: getVehicleById - Success")
            return vehicle
        } catch (error) {
            logger.error("Vehicle Service: getVehicleById -", error);
        }
    }


    public static async getVehicleCountPerSeat() {
        
        try { 
            const vehicles = await Vehicle.find().lean();
            // Danfo, get the count of vehicle per seat occupancy
            const df = new dfd.DataFrame(vehicles);
            const grouped = df.groupby(["vehicle_occupancy_status"]).count();
            const final_df = grouped.loc({ columns: ['vehicle_occupancy_status', 'id_count'] }).resetIndex();
            final_df.rename({ 'id_count': 'count' }, { inplace: true });
            logger.info("Vehicle Service: getVehicleCountPerSeat - Success")
            console.log(toJSON(final_df));

            return toJSON(final_df);
        } catch (error) {
            logger.error("Vehicle Service: getVehicleCountPerSeat - ", error);
        }
            
    }
        



}