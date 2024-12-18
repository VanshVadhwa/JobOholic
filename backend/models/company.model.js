import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: null,
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    logo: {
        type: String, // URL to company logo
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

// Compound index to ensure uniqueness for name + userId
companySchema.index({ name: 1, userId: 1 }, { unique: true });

export const Company = mongoose.model("Company", companySchema);
