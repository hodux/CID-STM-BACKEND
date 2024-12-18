import { ITripUpdates } from '../interfaces/tripUpdates.interface';
import mongoose from 'mongoose';

const tripUpdatesSchema=new mongoose.Schema<ITripUpdates>({
    trip_id:{type:String,required:true},
    route_id:{type:String,required:true},
    stop_sequence: { type: Number, required: true },
    arrival_time: { type: String },
    departure_time: { type: String },
    stop_id: { type: String, required: true },
    departure_occupancy_status: { type: String }
})
export const TripUpdates = mongoose.model('trip_updates', tripUpdatesSchema);