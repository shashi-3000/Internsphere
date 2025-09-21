import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Industry } from "../models/industry.model.js";
import { User } from "../models/user.model.js";
import { Match } from "../models/match.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const completeIndustryProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // 1. Check for existing profile
    const existingProfile = await Industry.findOne({ user: userId });
    if (existingProfile) {
        throw new ApiError(400, "Industry profile already exists for this user.");
    }

    // 2. Create the new industry profile
    const industryProfileData = req.body;
    const industryProfile = await Industry.create({
        user: userId,
        ...industryProfileData
    });

    if (!industryProfile) {
        throw new ApiError(500, "Failed to create industry profile. Please try again.");
    }

    // 3. Update the main User document
    await User.findByIdAndUpdate(userId, {
        $set: {
            profileId: industryProfile._id,
            userType: 'industry'
        }
    });

    // 4. Return the successful response
    return res.status(201).json(
        new ApiResponse(201, industryProfile, "Industry profile completed successfully.")
    );
});


// Fetches all industry profiles, which contain internship data.
const getAllInternships = asyncHandler(async (req, res) => {
    const industries = await Industry.find({}); // Find all documents

    if (!industries || industries.length === 0) {
        throw new ApiError(404, "No industry profiles or internships found.");
    }

    // We can just return the full industry profiles for now
    return res.status(200).json(
        new ApiResponse(200, industries, "Successfully retrieved all industry profiles.")
    );
});


// --- UPDATED DASHBOARD FUNCTION WITH DEBUGGING ---
const getIndustryDashboard = asyncHandler(async (req, res) => {
    console.log("\n--- 🕵️‍♂️ INDUSTRY DASHBOARD DEBUG ---");
    
    // 1. Get the logged-in industry's profile ID
    const industryId = req.user.profileId;
    console.log("1. Logged-in Industry Profile ID:", industryId);

    // 2. Find all matches for THIS industry's internship in the Match collection
    const matches = await Match.find({ internship: industryId })
        .populate({
            path: 'student', // Tell Mongoose to get the full student profile
            select: 'fullName skills academicDetails' // Only get the data we need
        });
    
    console.log("2. Found matches from DB:", matches);
    
    if (!matches || matches.length === 0) {
        console.log("3. No matches found for this industry.");
        return res.status(200).json(
            new ApiResponse(200, { topCandidates: [] }, "No AI-matched candidates found yet.")
        );
    }
    
    // 3. Format the data for the dashboard
    const topCandidates = matches.map(match => {
        // This check is crucial. If 'student' is null, it means the .populate() failed.
        if (!match.student) {
            console.error("❌ POPULATE FAILED! The link to the student profile is broken for match:", match._id);
            return null;
        }
        return {
            studentId: match.student._id,
            name: match.student.fullName,
            skills: match.student.skills.technicalSkills.join(', '),
            cgpa: match.student.academicDetails.cgpa,
            matchScore: match.matchScore
        };
    }).filter(candidate => candidate !== null); // Filter out any failed populates

    console.log("4. Formatted candidate data to send to frontend:", topCandidates);
    console.log("--- END INDUSTRY DASHBOARD DEBUG ---\n");

    return res.status(200).json(
        new ApiResponse(200, { topCandidates }, "Successfully fetched industry dashboard data.")
    );
});

export { completeIndustryProfile, getAllInternships, getIndustryDashboard };

