/*

import { VehicleService } from "../../services/vehicle.service";
import mongoose from "mongoose";



describe("VehicleService", () => {
    beforeAll(async () => {
        await mongoose.connect("mongodb+srv://user:alpha123@cid-stm-test.skq19.mongodb.net/gtfs_cleaned?retryWrites=true&w=majority&appName=CID-STM-test");
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe("getAllVehicles", () => {
        it("should fetch all vehicles", async () => {
            const result = await VehicleService.getAllVehicles();
            // @ts-ignore
            expect(result.length).toBeGreaterThan(0);
            // @ts-ignore
            expect(result[0]).toHaveProperty("vehicle_occupancy_status");
        });
    });

    describe("getVehicleByRouteId", () => {
        it("should fetch a vehicle by route ID", async () => {
            const routeId = "444";
            const result = await VehicleService.getVehicleByRouteId(routeId);

            // @ts-ignore
            expect(result.vehicle_trip_route_id).toBe(routeId);
        });

    });

    describe("getVehicleCountPerSeat", () => {
        it("should return a grouped count of vehicles by occupancy status", async () => {
            const result = await VehicleService.getVehicleCountPerSeat();

            // @ts-ignore
            expect(result[0]).toHaveProperty("vehicle_occupancy_status");
            // @ts-ignore
            expect(result[0]).toHaveProperty("count");
        });
    });
});
*/