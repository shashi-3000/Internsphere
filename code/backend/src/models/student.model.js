import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true 
    },
    
    
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

    
    academicDetails: {
        institution: { type: String, required: true },
        course: { type: String, required: true },
        yearOfStudy: { type: String, required: true },
        cgpa: { type: String }
    },

    
    skills: {
        technicalSkills: [String],
        softSkills: [String],
        preferredSectors: [String]
    },
    
    
    location: {
        currentCity: { type: String, required: true },
        currentState: { type: String, required: true },
        preferredCities: [String],
        willingToRelocate: { type: Boolean }
    },

    
    affirmativeAction: {
        socialCategory: { type: String },
        isFromRuralArea: { type: Boolean },
        isFromAspirationDistrict: { type: Boolean }
    },

    
    experience: {
        pastInternshipExperience: { type: String },
        projects: { type: String },
        achievements: { type: String }
    },

   
    preferences: {
        internshipDuration: { type: String },
        stipendExpectation: { type: String }
    }

}, { timestamps: true });

export const Student = mongoose.model("Student", studentSchema);

