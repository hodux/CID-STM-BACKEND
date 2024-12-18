import { IVehicle } from '../interfaces/vehicle.interface';
import mongoose from 'mongoose';
const db = mongoose.connection.useDb('gtfs_cleaned');

const vehicleSchema = new mongoose.Schema<IVehicle>({
    id:{type:String,required:true},
    vehicle_position_longitude:{type:Number,required:true},
    vehicle_position_latitude: { type: Number, required: true },
    vehicle_trip_trip_id: { type: String, required: true },
    vehicle_trip_route_id: { type: String, required: true },
    vehicle_trip_start_date: { type: String, required: true },
    vehicle_current_stop_sequence: { type: Number},
    vehicle_current_status: { type: String },
    vehicle_occupancy_status: { type: String }
})
export const Vehicle = db.model('vehicle_positions', vehicleSchema);