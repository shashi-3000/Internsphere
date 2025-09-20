// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { Student } from "../models/student.model.js";
// import { Industry } from "../models/industry.model.js";
// import axios from "axios";

// // This will be the main function to trigger the AI matchmaking
// const runMatchingAlgorithm = asyncHandler(async (req, res) => {
//     console.log("🚀 Matchmaking process initiated by an admin...");

//     // 1. Fetch all necessary data from our own MongoDB database
//     const allStudents = await Student.find({});
//     const allIndustries = await Industry.find({}); // These contain the internship details

//     if (!allStudents.length || !allIndustries.length) {
//         throw new ApiError(404, "Not enough student or industry data to run the match.");
//     }

//     console.log(`Found ${allStudents.length} students and ${allIndustries.length} internships to match.`);

//     // 2. Prepare the data payload for the Python service
//     const payload = {
//         students: allStudents,
//         internships: allIndustries
//     };

//     try {
//         // 3. Send all the data to the Python ML service's /match endpoint
//         console.log("📡 Sending data payload to Python ML service at http://localhost:8000/match");
        
//         const response = await axios.post('http://localhost:8000/match', payload, {
//             headers: { 'Content-Type': 'application/json' }
//         });

//         const matchResults = response.data;
//         console.log("✅ Successfully received match results from Python service.");
//         console.log("Top matches:", matchResults.matches);

//         // 4. For now, we'll just return the results directly.
//         // In a full app, you would save these results to a new "Matches" collection in MongoDB.
        
//         return res.status(200).json(
//             new ApiResponse(200, matchResults, "Matchmaking process completed successfully.")
//         );

//     } catch (error) {
//         // This error is crucial for debugging the connection between the two servers.
//         console.error("❌ Error communicating with the Python ML service:", error.message);
//         throw new ApiError(500, "Failed to connect to the matchmaking service. Please ensure the Python server is running on port 8000.");
//     }
// });

// export { runMatchingAlgorithm };



import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.model.js";
import { Industry } from "../models/industry.model.js";
import { Match } from "../models/match.model.js"; // 1. Import the new Match model
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

        // --- THE KEY UPGRADE ---
        // 2. Clear out any old matches before saving the new ones.
        await Match.deleteMany({});
        console.log("🧹 Cleared old match results from the database.");

        // 3. Save the new match results to our MongoDB database.
        const matchesToSave = [];
        // The python service returns a dictionary like { student_id: internship_id }
        for (const studentId in matchResults.matches) {
            const internshipId = matchResults.matches[studentId];
            matchesToSave.push({
                student: studentId,
                internship: internshipId,
                matchScore: 0.99, // We can enhance the python script to return scores later
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