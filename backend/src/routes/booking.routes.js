import express from 'express';
import {
  sendRideRequest,
  getBookingRequestsForDriver,
  getBookingRequestsForPassenger,
  respondToRideRequest,
  getMyAcceptedBookings
} from '../controllers/booking.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/request', verifyJWT, sendRideRequest);
router.get('/driver/requests', verifyJWT, getBookingRequestsForDriver);
router.get('/passenger/requests', verifyJWT, getBookingRequestsForPassenger);
router.post('/respond/:bookingId', verifyJWT, respondToRideRequest);
router.get('/my-bookings', verifyJWT, getMyAcceptedBookings);

export default router;
