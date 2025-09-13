// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { Student } from "../models/student.model.js";
// import { User } from "../models/user.model.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// const completeStudentProfile = asyncHandler(async (req, res) => {
//     // The user is already authenticated and attached to req by the verifyJWT middleware
//     const userId = req.user._id;

//     // 1. Check if the user already has a profile
//     const existingProfile = await Student.findOne({ user: userId });
//     if (existingProfile) {
//         throw new ApiError(400, "Student profile already exists for this user.");
//     }
    
//     // 2. Create the new student profile with the data from the form
//     const studentProfileData = req.body;
//     const studentProfile = await Student.create({
//         user: userId,
//         ...studentProfileData
//     });

//     if (!studentProfile) {
//         throw new ApiError(500, "Failed to create student profile. Please try again.");
//     }

//     // 3. Update the main User document to link to this new profile
//     await User.findByIdAndUpdate(userId, {
//         $set: {
//             profileId: studentProfile._id,
//             userType: 'student' // Explicitly set the user type
//         }
//     });

//     // 4. Return the successful response
//     return res.status(201).json(
//         new ApiResponse(201, studentProfile, "Student profile completed successfully.")
//     );
// });

// export { completeStudentProfile };

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const completeStudentProfile = asyncHandler(async (req, res) => {
    // For debugging, let's see exactly what data is arriving
    console.log("Received body for student profile:", JSON.stringify(req.body, null, 2));

    const userId = req.user._id;

    // Check if the user already has a profile
    const existingProfile = await Student.findOne({ user: userId });
    if (existingProfile) {
        throw new ApiError(400, "Student profile already exists for this user.");
    }
    
    // --- THE FIX ---
    // Instead of spreading the body, we build the object explicitly
    // This ensures the structure perfectly matches our Mongoose model.
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

    // Update the main User document to link to this new profile
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

// --- NEW FUNCTION ---
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

export { completeStudentProfile, getAllStudents };
