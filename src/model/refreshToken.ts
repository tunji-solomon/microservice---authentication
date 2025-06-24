import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    token : {
        type: String,
        required: true,
        unique: true
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "micro-service-user",
        required: true,
    },

    createdAt: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
})

const RefreshToken = mongoose.model("micro-service-refreshToken", refreshTokenSchema);

export default RefreshToken;