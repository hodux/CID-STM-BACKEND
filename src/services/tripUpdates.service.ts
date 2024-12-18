import { TripUpdates } from "../models/tripUpdates.model";

export class calculateTripTime {
    static async calculateTripTimeOfBus(){
        try{

           const tripDurationOfAllBus= await TripUpdates.aggregate([
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
            routeId:`Bus ${bus.routeId}`,
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

