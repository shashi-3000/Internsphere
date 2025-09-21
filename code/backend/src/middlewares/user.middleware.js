import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        console.log("🔐 JWT Middleware: Starting authentication check");
        console.log("📋 Headers received:", {
            authorization: req.headers.authorization,
            cookies: req.cookies
        });

        // Get token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        console.log("🔑 Token extracted:", token ? "Present" : "Missing");
        
        if (!token) {
            console.log("❌ No token found in request");
            throw new ApiError(401, "Unauthorized request - No access token provided");
        }

        // Verify the token
        console.log("🔍 Verifying token with secret...");
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("✅ Token decoded successfully:", decodedToken);

        // Find user by ID from token
        console.log("👤 Finding user with ID:", decodedToken?._id);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        
        if (!user) {
            console.log("❌ User not found for token");
            throw new ApiError(401, "Invalid Access Token - User not found");
        }

        console.log("✅ User found:", user.username);
        
        // Attach user to request object
        req.user = user;
        console.log("🎯 User attached to request, proceeding to next middleware");
        
        next();
        
    } catch (error) {
        console.error("❌ JWT Middleware Error:", error);
        
        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            throw new ApiError(401, "Invalid Access Token");
        } else if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Access Token Expired");
        } else if (error instanceof ApiError) {
            throw error;
        } else {
            throw new ApiError(401, "Invalid Access Token");
        }
    }
});

//this is the version ...upar i ahve consoles to find error

// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";

// export const verifyJWT = asyncHandler(async(req, _, next) => {
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
//         if (!token) {
//             throw new ApiError(401, "Unauthorized request");
//         }
    
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
//         if (!user) {
//             throw new ApiError(401, "Invalid Access Token");
//         }
    
//         req.user = user;
//         next();
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token");
//     }
// });