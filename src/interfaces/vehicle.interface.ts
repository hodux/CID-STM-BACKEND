export interface IVehicle {
    id:string;
    vehicle_position_longitude:number;
    vehicle_position_latitude:number;
    vehicle_trip_trip_id:string;
    vehicle_trip_route_id:string;
    vehicle_trip_start_date:string;
    vehicle_current_stop_sequence:number;
    vehicle_current_status:string;
    vehicle_occupancy_status:string;
}