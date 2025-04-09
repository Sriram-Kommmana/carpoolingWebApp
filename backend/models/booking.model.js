import mongoose,{Schema} from "mongoose";

const bookingSchema = new Schema(
    {
        rideId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "RideOffer",
            required: true,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seatsRequested:{
            type: Number,
            required: true,
        },
        status:{
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Booking", bookingSchema)