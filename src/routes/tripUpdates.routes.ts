import { Router } from 'express';
import { tripUpdatesController } from '../controllers/tripUpdates.controller';

const router=Router();
router.get("/trips/duration" , tripUpdatesController.getTripFullTime);

export default router;