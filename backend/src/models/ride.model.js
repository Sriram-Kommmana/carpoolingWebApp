import mongoose,{Schema} from "mongoose";

const rideSchema = new Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        totalSeats: {
            type: Number,
            required: true,
        },
        availableSeats: {
            type: Number,
            required: true,
        },
        rideDate: {
            type: Date,
            required: true,
        },
        rideTime: {
            type: String,
            required: true,
        },
        destination: {
            address: {
              type: String,
              required: true,
            },
            lat: {
              type: Number,
              required: true,
            },
            lng: {
              type: Number,
              required: true,
            },
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Ride", rideSchema)