import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    refreshToken : {
        type: String,
        required: true,
        unique: true
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "micro-service-user",
        required: true,
    },

    expiresAt: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
})

const RefreshToken = mongoose.model("micro-service-refreshToken", refreshTokenSchema);

export default RefreshToken;