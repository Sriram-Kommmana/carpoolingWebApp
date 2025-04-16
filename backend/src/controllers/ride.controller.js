import { asyncHandler} from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ride } from "../models/ride.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const createRide = asyncHandler(async (req, res) => {
    const { source, destination, rideDate,time, seats} = req.body;
    const userId = req.user._id; 

    if ([source, destination,rideDate, time, seats].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const ride = await Ride.create({
        source,
        destination,
        rideDate,
        rideTime: time,
        totalSeats: seats,
        createdBy: userId,
    });

    res.status(201).json(new ApiResponse(201, ride, "Ride created successfully"));
})

const getAllRides = asyncHandler(async (req, res) => {
    const rides = await Ride.find();
    return res.status(200).json(new ApiResponse(200, rides, "All rides fetched successfully"));
  });

const getAvailableRides = asyncHandler(async (req, res) => {
    const { source, destination, rideDate } = req.query;

    if ([source, destination, rideDate].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const rides = await Ride.find({
        source,
        destination,
        rideDate: new Date(rideDate),
        availableSeats: { $gt: 0 },
    }).populate("createdBy", "-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, rides, "Available rides fetched successfully"));
})

const getRide = asyncHandler(async (req, res) => {
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      throw new ApiError(404, "Ride not found");
    }
    return res.status(200).json(new ApiResponse(200, ride, "Ride fetched successfully"));
});

const deleteRide = asyncHandler(async (req, res) => {
    const ride = await Ride.findByIdAndDelete(req.params.id);
    if (!ride) {
      throw new ApiError(404, "Ride not found");
    }
    return res.status(200).json(new ApiResponse(200, null, "Ride deleted successfully"));
});

const getMyRides = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const rides = await Ride.find({ createdBy: userId }).populate("createdBy", "-password -refreshToken");

    if (!rides) {
        throw new ApiError(404, "No rides found for this user");
    }

    return res.status(200).json(new ApiResponse(200, rides, "My rides fetched successfully"));
})



export {
    createRide,
    getAllRides,
    getAvailableRides,
    getRide,
    deleteRide,
    getMyRides
}