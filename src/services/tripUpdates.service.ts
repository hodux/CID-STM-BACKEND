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
                        }
                    
                }
            },
            {
                $project:{
                    tripId:"$_id",
                    routeId:"$route_id",
                    stop_sequence:1,
                    firstStopTime:1,
                    lastStopTime:1,

                    duration:{
                    $subtract:["$lastStopTime", "$firstStopTime"]
                    },
                    stopsNumber:{$size:"$stop_sequence"}
                }
            }
           ]);

           return tripDurationOfAllBus;



        }catch(error){
            console.log("error ",error)
        }
    }
}
