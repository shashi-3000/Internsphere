
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.model.js";
import { Industry } from "../models/industry.model.js";
import { Match } from "../models/match.model.js";
import axios from "axios";

const runMatchingAlgorithm = asyncHandler(async (req, res) => {
    console.log("🚀 Matchmaking process initiated...");

    const allStudents = await Student.find({});
    const allIndustries = await Industry.find({});

    if (!allStudents.length || !allIndustries.length) {
        throw new ApiError(404, "Not enough student or industry data to run the match.");
    }
    console.log(`Found ${allStudents.length} students and ${allIndustries.length} internships to match.`);

    const payload = {
        students: allStudents,
        internships: allIndustries
    };

    try {
        const response = await axios.post('http://localhost:8000/match', payload);
        const matchResults = response.data;
        console.log("✅ Successfully received match results from Python service.");

        await Match.deleteMany({});
        console.log("🧹 Cleared old match results from the database.");

        
        const matchesToSave = [];
        
        for (const studentId in matchResults.matches) {
            const internshipId = matchResults.matches[studentId];
            matchesToSave.push({
                student: studentId,
                internship: internshipId,
                matchScore: 0.99, 
                status: 'pending'
            });
        }
        
        if (matchesToSave.length > 0) {
            await Match.insertMany(matchesToSave);
            console.log(`💾 Saved ${matchesToSave.length} new matches to the database.`);
        }
        
        return res.status(200).json(
            new ApiResponse(200, { savedMatches: matchesToSave.length }, "Matchmaking process completed and results saved.")
        );

    } catch (error) {
        console.error("❌ Error during matchmaking process:", error.message);
        throw new ApiError(500, "An error occurred during the matchmaking process.");
    }
});

export { runMatchingAlgorithm };