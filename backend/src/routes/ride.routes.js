import express from 'express';
import {
  createRide,
  getAllRides,
  getAvailableRides,
  getRide,
  deleteRide,
  getMyRides
} from '../controllers/ride.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public
router.get('/', getAllRides);
router.get('/search', getAvailableRides); 
router.get('/:id', getRide);

router.post('/', verifyJWT, createRide);
router.get('/me/rides', verifyJWT, getMyRides);
router.delete('/:id', verifyJWT, deleteRide); 

export default router;
