import mongoose from "mongoose";

const industrySchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true 
    },

   
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

    
    contactPerson: {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    
    
    internshipDetails: {
        title: { type: String, required: true },
        department: { type: String, required: true },
        internshipType: { type: String, required: true },
        duration: { type: String, required: true },
        startDate: { type: Date },
        numberOfPositions: { type: Number, required: true },
        numberOfPositions: { type: Number, required: true, min: 1 },
        workMode: { type: String, required: true },
        workingHours: { type: String }
    },

    
    requirements: {
        requiredSkills: [String],
        preferredCourse: [String],
        minimumCGPA: { type: String },
        yearOfStudy: [String]
    },

  
    compensation: {
        stipend: { type: String, required: true },
        providesAccommodation: { type: Boolean, default: false },
        providesMeals: { type: Boolean, default: false },
        providesTransport: { type: Boolean, default: false },
        otherBenefits: { type: String }
    },

    
    workDetails: {
        jobDescription: { type: String, required: true },
        learningOutcomes: { type: String }
    },

    preferences: {
        preferredStates: [String],
        diversityPreferences: { type: String },
        ruralCandidatesWelcome: { type: Boolean }
    },
    
    verification: {
        registrationNumber: { type: String },
        gstNumber: { type: String },
        panNumber: { type: String }
    }

}, { timestamps: true });

export const Industry = mongoose.model("Industry", industrySchema);

