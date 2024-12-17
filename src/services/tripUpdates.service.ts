import { TripUpdates } from "../models/tripUpdates.model";

export class calculateTripTime {
    static async calculateTripTimeOfBus(){
        try{

           const tripDurationOfAllBus= await TripUpdates.aggregate([
            {

                $group: {
                    _id: "$trip_id",
                    stop_sequence:{$push:"$$ROOT"},
                    firstStopTime:{$min:"$departure_time"},
                    lastStopTime:{$max:"$arrival_time"}
                }
            },
            {
                $project:{
                    tripId:"$_id",
                    stop_sequence:1,
                    duration:{
                        $subtract: [
                            {
                              $cond: {
                                if: { $and: [{ $ne: ["$lastStopTime", null] }, { $ne: ["$lastStopTime", NaN] }] },
                                then: { $toInt: "$lastStopTime" },
                                else: 0
                              }
                            },
                            {
                              $cond: {
                                if: { $and: [{ $ne: ["$firstStopTime", null] }, { $ne: ["$firstStopTime", NaN] }] },
                                then: { $toInt: "$firstStopTime" },
                                else: 0
                              }
                            }
                          ]

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