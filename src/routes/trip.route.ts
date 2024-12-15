import { Router } from 'express';
import { allRole, administratorRole} from '../utils/role.util';
import { verifyToken } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/roles.middleware';
import {TripController} from "../controllers/trip.controller";

const router = Router();
const tripController = new TripController();
router.get('/trips', tripController.getAllTrips);
router.get('/trips/maxSequences', tripController.getMaxSequences);
export default router;