import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // ✅ Fixed: Capital 'S' to match your Student model export
        required: true,
    },
    internship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry', // ✅ Fixed: Capital 'I' to match your Industry model export
        required: true,
    },
    matchScore: { // It's good practice to save the score that led to the match
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending', // The student needs to act on the match
    },
    // This helps us know which batch of matchmaking this result belongs to
    runDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const Match = mongoose.model("Match", matchSchema);
