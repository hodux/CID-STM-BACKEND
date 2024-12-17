import mongoose from 'mongoose';
import {ITrip} from "../interfaces/trip.interface";
const db = mongoose.connection.useDb('gtfs_cleaned');
const schema = new mongoose.Schema<ITrip>({
    trip_id: {type: String, required: true},
    route_id: {type: String, required: true},
    stop_sequence:{type: Number, required: true},
    arrival_time:{ type: String, required: true},
    departure_time:{ type: String, required: true},
    stop_id:{ type: String, required: true},
    departure_occupancy_status:{ type: String, required: true}
},{collection: 'trip_updates'});
export const Trip = db.model('trip', schema);