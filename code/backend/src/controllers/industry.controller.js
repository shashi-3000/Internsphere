import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Industry } from "../models/industry.model.js";
import { User } from "../models/user.model.js";
import { Match } from "../models/match.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const completeIndustryProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;


    const existingProfile = await Industry.findOne({ user: userId });
    if (existingProfile) {
        throw new ApiError(400, "Industry profile already exists for this user.");
    }

    const industryProfileData = req.body;
    const industryProfile = await Industry.create({
        user: userId,
        ...industryProfileData
    });

    if (!industryProfile) {
        throw new ApiError(500, "Failed to create industry profile. Please try again.");
    }


    await User.findByIdAndUpdate(userId, {
        $set: {
            profileId: industryProfile._id,
            userType: 'industry'
        }
    });

  
    return res.status(201).json(
        new ApiResponse(201, industryProfile, "Industry profile completed successfully.")
    );
});


const getAllInternships = asyncHandler(async (req, res) => {
    const industries = await Industry.find({}); 

    if (!industries || industries.length === 0) {
        throw new ApiError(404, "No industry profiles or internships found.");
    }

    return res.status(200).json(
        new ApiResponse(200, industries, "Successfully retrieved all industry profiles.")
    );
});


const getIndustryDashboard = asyncHandler(async (req, res) => {
    console.log("\n--- 🕵️‍♂️ INDUSTRY DASHBOARD DEBUG ---");
    
    
    const industryId = req.user.profileId;
    console.log("1. Logged-in Industry Profile ID:", industryId);

   
    const matches = await Match.find({ internship: industryId })
        .populate({
            path: 'student', 
            select: 'fullName skills academicDetails'
        });
    
    console.log("2. Found matches from DB:", matches);
    
    if (!matches || matches.length === 0) {
        console.log("3. No matches found for this industry.");
        return res.status(200).json(
            new ApiResponse(200, { topCandidates: [] }, "No AI-matched candidates found yet.")
        );
    }
    
    const topCandidates = matches.map(match => {
        
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
    }).filter(candidate => candidate !== null); 

    console.log("4. Formatted candidate data to send to frontend:", topCandidates);
    console.log("--- END INDUSTRY DASHBOARD DEBUG ---\n");

    return res.status(200).json(
        new ApiResponse(200, { topCandidates }, "Successfully fetched industry dashboard data.")
    );
});

export { completeIndustryProfile, getAllInternships, getIndustryDashboard };

