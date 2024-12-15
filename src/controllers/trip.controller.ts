import { Request, Response } from 'express';
import { TripService } from '../services/trip.service';

export class TripController {
    public async getAllTrips(req: Request, res: Response): Promise<void> {
        const trips = await TripService.getAllTrips();
        if(!trips){
            res.status(404).json({"message":"No trip found."});
        }
        res.status(200).json(trips);
    };
    public async getMaxSequences(req: Request, res: Response): Promise<void> {
        const maxSequences = await TripService.getMaxStopSequences();
        if(!maxSequences){
            res.status(404).json({"message":"No sequences found."});
        }
        res.status(200).json(maxSequences);
    };

}