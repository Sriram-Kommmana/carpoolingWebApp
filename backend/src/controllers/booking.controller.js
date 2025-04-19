import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {Ride} from "../models/ride.model.js"
import {Participant} from "../models/participants.model.js"
import {Booking} from "../models/booking.model.js"

const sendRideRequest = asyncHandler(async (req, res) => {
    const {rideId, seatsRequested} = req.body;
    const userId = req.user._id; 

    if (!rideId || !seatsRequested) {
        throw new ApiError(400, "Ride ID and seats requested are required");
    }

    const ride = await Ride.findById(rideId);
    if (!ride) {
        throw new ApiError(404, "Ride not found");
    }

    const existingBooking = await Booking.findOne({ rideId, userId });
    if (existingBooking) {
        throw new ApiError(400, "You have already booked this ride");
    }

    const booking = await Booking.create({
        rideId,
        userId,
        seatsRequested,
        status: "pending",
    });

    res.status(201).json(new ApiResponse(201, booking, "Ride request sent successfully"));
});
const getRideRequests = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const rideRequests = await Booking.find({ userId }).populate("rideId", "-createdBy").populate("userId", "-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, rideRequests, "Ride requests fetched successfully"));
})
const acceptRideRequest = async (req, res) => {
    const { requestId } = req.params;
  
    try {
      const request = await Booking.findById(requestId).populate('rideId');
      if (!request) return res.status(404).json({ message: 'Request not found' });
  
      const ride = request.rideId;
      const requestedSeats = request.seatsRequested;
  
      if (ride.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
  
      if (request.status !== 'pending') {
        return res.status(400).json({ message: 'Request already processed' });
      }
  
      if (ride.seatsAvailable < requestedSeats) {
        return res.status(400).json({ message: 'Not enough seats available' });
      }
  
      request.status = 'accepted';
      await request.save();
  
      ride.seatsAvailable -= requestedSeats;
      await ride.save();
  
      await Participant.create({
        rideId: ride._id,
        userId: request.riderId
      });
  
      res.json({ message: 'Request accepted', seatsAllocated: requestedSeats });
    } catch (err) {
      res.status(500).json({ message: 'Error accepting request', error: err });
    }
  };
const getMyRequests = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const myRequests = await Booking.find({ userId }).populate("rideId").populate("userId", "-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, myRequests, "My requests fetched successfully"));
})
const rejectRideRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;

  try {
    const request = await Booking.findById(requestId).populate('rideId');
    if (!request) return res.status(404).json({ message: 'Request not found' });

    const ride = request.rideId;
    if (ride.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }

    request.status = 'rejected';
    await request.save();

    res.json({ message: 'Request rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting request', error: err });
  }
})

export {
    sendRideRequest,
    getRideRequests,
    acceptRideRequest,
    getMyRequests,
    rejectRideRequest
}