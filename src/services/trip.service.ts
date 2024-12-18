import { Document, Types } from "mongoose";
import { ITrip } from "../interfaces/trip.interface";
import {Trip} from "../models/trip.model";
import {logger} from '../utils/logger';

export class TripService {
    public static async getAllTrips() {
        try {
            const trips = await Trip.find();
            logger.info("The trip's list have been recuperated ");
            console.log(trips);
            return trips;
        } catch (error) {
            logger.error("Not able to recuperate the trips. Error:" + error);
        }
    }
    public static async getMaxStopSequences() {
        try {
            let maxStopByRoute: { route_id: string; stop_sequence: number; }[] = [];
            const routes = await Trip.distinct("route_id");
            for (const route of routes) {
                let maxStop = await Trip.find({"route_id":route}).sort({stop_sequence:-1}).limit(1).select('stop_sequence -_id');
                maxStopByRoute.push({route_id:route, stop_sequence:maxStop[0].stop_sequence});
            }
            logger.info("The Max Stop Sequence's list have been recuperated ");
            return maxStopByRoute;
        } catch (error) {
            logger.error("Not able to recuperate the Max Stop Sequence For Each Route. Error:"+ error);
        }
    }
}

