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
        source: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Ride", rideSchema)