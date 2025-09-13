import mongoose from "mongoose";

const industrySchema = new mongoose.Schema({
    // Link back to the main user login
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Each user can only have one industry profile
    },

    // --- Company Details ---
    companyDetails: {
        companyName: { type: String, required: true },
        companyEmail: { type: String, required: true },
        companyPhone: { type: String, required: true },
        website: { type: String },
        companySize: { type: String, required: true },
        industry: { type: String, required: true },
        companyAddress: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true }
    },

    // --- Contact Person ---
    contactPerson: {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    
    // NOTE: In a real-world app, you might make a separate "Internship" model.
    // For a hackathon, combining them here is faster and simpler.
    // --- Internship Details ---
    internshipDetails: {
        title: { type: String, required: true },
        department: { type: String, required: true },
        internshipType: { type: String, required: true },
        duration: { type: String, required: true },
        startDate: { type: Date },
        numberOfPositions: { type: Number, required: true },
        workMode: { type: String, required: true },
        workingHours: { type: String }
    },

    // --- Requirements ---
    requirements: {
        requiredSkills: [String],
        preferredCourse: [String],
        minimumCGPA: { type: String },
        yearOfStudy: [String]
    },

    // --- Compensation & Benefits ---
    compensation: {
        stipend: { type: String, required: true },
        providesAccommodation: { type: Boolean, default: false },
        providesMeals: { type: Boolean, default: false },
        providesTransport: { type: Boolean, default: false },
        otherBenefits: { type: String }
    },

    // --- Work Details ---
    workDetails: {
        jobDescription: { type: String, required: true },
        learningOutcomes: { type: String }
    },

    // --- Preferences ---
    preferences: {
        preferredStates: [String],
        diversityPreferences: { type: String },
        ruralCandidatesWelcome: { type: Boolean }
    },
    
    // --- Company Verification ---
    verification: {
        registrationNumber: { type: String },
        gstNumber: { type: String },
        panNumber: { type: String }
    }

}, { timestamps: true });

export const Industry = mongoose.model("Industry", industrySchema);

