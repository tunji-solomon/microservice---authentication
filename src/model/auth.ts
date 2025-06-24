import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
},
{
    timestamps: true
}
);

const userModel = mongoose.model("micro-service-user", userSchema);

export default userModel;