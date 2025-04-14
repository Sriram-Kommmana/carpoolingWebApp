import mongoose,{model, Schema} from "mongoose";

const participantSchema = new Schema(
    {
        rideId:{
            type: Schema.Types.ObjectId,
            ref: "Ride",
            required: true,
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seatsTaken:{
            type: Number,
            required: true,
        },
        joinedAt:{
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)
model.exports = mongoose.model("Participant", participantSchema)