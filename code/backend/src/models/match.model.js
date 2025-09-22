import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', 
        required: true,
    },
    internship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry',
        required: true,
    },
    matchScore: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending', // The student needs to act on the match
    },
    
    runDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const Match = mongoose.model("Match", matchSchema);
