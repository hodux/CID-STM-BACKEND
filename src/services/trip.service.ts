import {Trip} from "../models/trip.model";
import { logger } from '../utils/logger';

export class TripService {
    public static async getAllTrips(){
        try {
            const trips = await Trip.find();
            // logger.info("The user's list have been recuperated ");
            console.log(trips);
            return trips;
        } catch (error) {
            logger.error("Not able to recuperate the users Error:"+ error);
        }
    }
}

