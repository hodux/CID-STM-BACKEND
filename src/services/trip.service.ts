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
     static async calculateTripTimeOfBus(){
            try{
    
               const tripDurationOfAllBus= await Trip.aggregate([
                {
    
                    $group: {
                        _id: "$trip_id",
                        stop_sequence:{$push:"$$ROOT"},
                        firstStopTime:{
                            $min:{
                                $convert:{input:"$departure_time",to:"int",onError:null,onNull:null}
    
    
                            }},
                        lastStopTime:{
                            $max:{
                                 $convert:{input:"$arrival_time",to:"int",onError:null,onNull:null}
                                }
                            },
                            routeId:{$first:"$route_id"}
                        
                    }
                },
                {
                    $project:{
                        tripId:"$_id",
                        routeId:1,
                        stop_sequence:1,
                        firstStopTime:1,
                        lastStopTime:1,
    
                        duration:{
                        $subtract:["$lastStopTime", "$firstStopTime"]
                        },
                        stopsNumber:{$size:"$stop_sequence"}
                    }
                },
                {
                    $sort:{
                        routeId:1,
                        duration:-1
                    }
                },
                {
                    $group:{
                        _id:"$routeId",
                        longestTrip:{$first:"$$ROOT"}
                    }
                },
                {
                    $replaceRoot:{newRoot:"$longestTrip"}
                }
               ]);
               
    
               const cleanDataForChart=tripDurationOfAllBus.map(bus=>({
                routeId:bus.routeId,
                duration:bus.duration/60,
                stops:bus.stopsNumber,
                firstStopTime:bus.firstStopTime,
                lastStopTime:bus.lastStopTime
               }))
    
               return cleanDataForChart;
    
           
    
    
            }catch(error){
                console.log("error ",error)
            }
        }
}

