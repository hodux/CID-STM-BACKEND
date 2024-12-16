import request from "supertest";
import app from "../../index";
import { expect } from "@jest/globals";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe("Vehicle Controller", () => {
    it("should return a list of vehicles", async () => {
        const res = await request(app)
            .get('/api/vehicles')
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should return a list of vehicles associated to the route", async () => {
        const routeId = "444"
        const res = await request(app)
            .get(`/api/vehicles/${routeId}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.vehicle_trip_route_id).toEqual(routeId)
    });

    it("should return a list of seat occupancy count", async () => {
        const res = await request(app)
            .get('/api/seats')
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });


});
