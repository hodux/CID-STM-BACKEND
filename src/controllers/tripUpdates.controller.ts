import { Request, Response } from 'express';
import { calculateTripTime } from '../services/tripUpdates.service';

export class tripUpdatesController {
    static async getTripFullTime(req:Request,res:Response):Promise<void>{
        try{
        const trips=await calculateTripTime.calculateTripTimeOfBus();
        res.status(200).json(trips);
    }
    catch(error){
        console.log("Error ",error);
        res.status(500).json({"message":"Internal server error"})
    }
};

}