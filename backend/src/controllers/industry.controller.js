import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Industry } from "../models/industry.model.js";
import { User } from "../models/user.model.js";
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

// --- NEW FUNCTION ---
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

export { completeIndustryProfile,getAllInternships };