import { TripUpdates } from "../models/tripUpdates.model";

export class calculateTripTime {
    static async calculateTripTimeOfBus(){
        try{

            const tripIds=await TripUpdates.find().distinct('trip_id');
            const tripDurationsOfAllBuses=[];
            let tripId;

            for(tripId in tripIds) {
                const tripStops=await TripUpdates.find({trip_id:tripId}).sort('stop_sequence')

                
            const firstStop=tripStops[0];
            const lastStop=tripStops[tripStops.length-1];

            const startTime=parseInt(firstStop.departure_time,10)
            const endTime=parseInt(lastStop.arrival_time,10)

            const tripDuration=endTime-startTime;

            tripDurationsOfAllBuses.push({
                tripId: tripId,
                duration:tripDuration,
                stopsNumber:tripStops.length
            })
            }

            return tripDurationsOfAllBuses;




        }catch(error){
            console.log("error ",error)
        }
    }
}