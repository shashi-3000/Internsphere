import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    // Link back to the main user login
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true 
    },
    
    // --- Basic Information ---
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },

    // --- Academic Details ---
    academicDetails: {
        institution: { type: String, required: true },
        course: { type: String, required: true },
        yearOfStudy: { type: String, required: true },
        cgpa: { type: String }
    },

    // --- Skills & Interests ---
    skills: {
        technicalSkills: [String],
        softSkills: [String],
        preferredSectors: [String]
    },
    
    // --- Location Preferences ---
    location: {
        currentCity: { type: String, required: true },
        currentState: { type: String, required: true },
        preferredCities: [String],
        willingToRelocate: { type: Boolean }
    },

    // --- Affirmative Action (for PM Scheme) ---
    affirmativeAction: {
        socialCategory: { type: String },
        isFromRuralArea: { type: Boolean },
        isFromAspirationDistrict: { type: Boolean }
    },

    // --- Experience ---
    experience: {
        pastInternshipExperience: { type: String },
        projects: { type: String },
        achievements: { type: String }
    },

    // --- Preferences ---
    preferences: {
        internshipDuration: { type: String },
        stipendExpectation: { type: String }
    }

}, { timestamps: true });

export const Student = mongoose.model("Student", studentSchema);

