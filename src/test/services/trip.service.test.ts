import {describe, expect, test} from '@jest/globals';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';
import mongoose from "mongoose";




describe('TripService',()=>{
    beforeAll(async () => {
        await mongoose.connect("mongodb+srv://user:alpha123@cid-stm-test.skq19.mongodb.net/gtfs_cleaned?retryWrites=true&w=majority&appName=CID-STM-test");
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe("getAllVehicles", () => {
        it("should fetch all vehicles", async () => {
            const result = await TripService.getAllTrips();
            // @ts-ignore
            expect(result.length).toBeGreaterThan(0);
            // @ts-ignore
            expect(result[0]).toHaveProperty("route_id");
        },100000);
    });

    
    describe("getMaxSequences", () => {
        it("should max sequence for each route", async () => {
            const result = await TripService.getMaxStopSequences();
            // @ts-ignore
            expect(result.length).toBeGreaterThan(0);

            const firstRoute="10";
            // @ts-ignore
            expect(result[0].route_id).toBe(firstRoute);
        },100000);
    });

    describe("calculateTripTime",()=>{
        beforeEach(()=>{
            jest.clearAllMocks();
        })
        it("should calculate trip time", async()=>{
            const mock=[
                {
                    "routeId": "491",
                    "duration": 37.06666666666667,
                    "stops": 9,
                    "firstStopTime": 1734129327,
                    "lastStopTime": 1734131551
                },
                {
                    "routeId": "52",
                    "duration": 12,
                    "stops": 9,
                    "firstStopTime": 1734130380,
                    "lastStopTime": 1734131100
                },
                {
                    "routeId": "204",
                    "duration": 45,
                    "stops": 39,
                    "firstStopTime": 1734129300,
                    "lastStopTime": 1734132000
                },
                {
                    "routeId": "195",
                    "duration": 50,
                    "stops": 53,
                    "firstStopTime": 1734129600,
                    "lastStopTime": 1734132600
                },
            ];

            Trip.aggregate= jest.fn().mockResolvedValue(mock);

            const result=await TripService.calculateTripTimeOfBus();

            expect(result?.length).toBe(4);
            // @ts-ignore
            expect(result[0]).toHaveProperty("routeId","491");
            

        })
    })



    


})