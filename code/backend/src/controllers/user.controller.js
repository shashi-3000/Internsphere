import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js" 
import { Student } from "../models/student.model.js" 
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found while generating tokens");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Token generation error:", error);
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
    }
};


//registering user
const registerUser = asyncHandler(async(req,res)=>{
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with this username or email already exists")
    }

    const user = await User.create({ username, email, password });


    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering the user") 
    }

    return res.status(201).json(
        new ApiResponse(201,createdUser,"User registered successfully")
    )

})

//login
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        throw new ApiError(400,"username and email , both are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options={
        httpOnly:true,
        secure:true
    }
    
    return res.status(200).json(
        new ApiResponse(
            200,
            { user: loggedInUser, accessToken, refreshToken },
            "User logged In Successfully"
        )
    )

})

//logout
const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined,
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "User logged Out")
    )

})

//getProfile 
const getProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    
    const user = await User.findById(userId).select("-password -refreshToken");
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    
    if (!user.userType || !user.profileId) {
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    user: user,
                    profile: null,
                    hasProfile: false
                },
                "User profile fetched successfully (no detailed profile found)"
            )
        );
    }
    
    let detailedProfile = null;
    
    if (user.userType === 'student') {
        detailedProfile = await Student.findOne({ user: userId });
    }

    
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: user,
                profile: detailedProfile,
                hasProfile: !!detailedProfile
            },
            "User profile fetched successfully"
        )
    );
});

const deleteAccount = asyncHandler(async (req, res) => {
    console.log("Delete account request received");
    
    const userId = req.user._id;
    
    const user = await User.findById(userId);
    if (user && user.userType === 'student') {
        await Student.findOneAndDelete({ user: userId });
    }
    
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
        throw new ApiError(500, "Failed to delete account");
    }
    
    console.log("Account deleted successfully");
    
    return res.status(200).json(
        new ApiResponse(200, {}, "Account deleted successfully")
    );
});

//endpoint for refresh token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorised request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        return res.status(200).json(
            new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed successfully")
        );

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token");
    }
});

export { registerUser, loginUser, logoutUser ,getProfile, refreshAccessToken, deleteAccount };