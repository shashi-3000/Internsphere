

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { User } from "../models/user.model.js";
import { Match } from "../models/match.model.js"; 
import { Industry } from "../models/industry.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const completeStudentProfile = asyncHandler(async (req, res) => {
    // For debugging
    console.log("Received body for student profile:", JSON.stringify(req.body, null, 2));

    const userId = req.user._id;

    // Check if the user already has a profile
    const existingProfile = await Student.findOne({ user: userId });
    if (existingProfile) {
        throw new ApiError(400, "Student profile already exists for this user.");
    }
    
    
    const { 
        fullName, phone, gender, academicDetails, skills, 
        location, affirmativeAction, experience, preferences 
    } = req.body;

    // Basic validation to ensure main fields are present
    if (!fullName || !phone || !academicDetails || !location) {
        throw new ApiError(400, "Missing required profile fields like fullName, phone, academicDetails, or location.");
    }

    const studentProfile = await Student.create({
        user: userId,
        fullName,
        phone,
        gender,
        academicDetails,
        skills,
        location,
        affirmativeAction,
        experience,
        preferences
    });

    if (!studentProfile) {
        throw new Api-Error(500, "Failed to create student profile. Please try again.");
    }

    await User.findByIdAndUpdate(userId, {
        $set: {
            profileId: studentProfile._id,
            userType: 'student'
        }
    });

    return res.status(201).json(
        new ApiResponse(201, studentProfile, "Student profile completed successfully.")
    );
});


// Fetches all student profiles from the database.
const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({}); // Find all documents with no filter

    if (!students) {
        throw new ApiError(404, "No students found.");
    }

    return res.status(200).json(
        new ApiResponse(200, students, "Successfully retrieved all student profiles.")
    );
});



// The getStudentDashboard function 
const getStudentDashboard = asyncHandler(async (req, res) => {
    const studentId = req.user.profileId; 

    const matches = await Match.find({ student: studentId })
        .populate({
            path: 'internship', 
            select: 'companyDetails internshipDetails'
        });

    if (!matches) {
        return res.status(200).json(new ApiResponse(200, { topMatches: [] }, "No matches found."));
    }

    const topMatches = matches.map(match => ({
        internshipId: match.internship?._id,
        company: match.internship?.companyDetails?.companyName,
        title: match.internship?.internshipDetails?.title,
        location: match.internship?.companyDetails?.city,
        matchScore: match.matchScore
    }));

    return res.status(200).json(new ApiResponse(200, { topMatches }, "Fetched dashboard data."));
});

export { completeStudentProfile, getAllStudents, getStudentDashboard };
