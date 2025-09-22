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

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        console.log("🔑 Token extracted:", token ? "Present" : "Missing");
        
        if (!token) {
            console.log(" No token found in request");
            throw new ApiError(401, "Unauthorized request - No access token provided");
        }

        console.log(" Verifying token with secret...");
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(" Token decoded successfully:", decodedToken);

        console.log(" Finding user with ID:", decodedToken?._id);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        
        if (!user) {
            console.log(" User not found for token");
            throw new ApiError(401, "Invalid Access Token - User not found");
        }

        console.log("✅ User found:", user.username);
        
        req.user = user;
        console.log("🎯 User attached to request, proceeding to next middleware");
        
        next();
        
    } catch (error) {
        console.error("❌ JWT Middleware Error:", error);
        
        
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

