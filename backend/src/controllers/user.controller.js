// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.model.js";
// // import { Student } from "../models/student.model.js"; // IMPORT STUDENT MODEL
// // import { Industry } from "../models/industry.model.js"; // IMPORT INDUSTRY MODEL
// import { ApiResponse } from "../utils/ApiResponse.js";
// import jwt from "jsonwebtoken";

// const generateAccessAndRefreshTokens = async (userId) => {
//     try {
//         const user = await User.findById(userId);

//         if (!user) {
//             throw new ApiError(404, "User not found while generating tokens");
//         }

//         const accessToken = user.generateAccessToken();
//         const refreshToken = user.generateRefreshToken();

//         user.refreshToken = refreshToken;
//         await user.save({ validateBeforeSave: false });

//         return { accessToken, refreshToken };
//     } catch (error) {
//         console.error("Token generation error:", error);
//         throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
//     }
// };

// // --- MODIFIED REGISTRATION LOGIC ---
// const registerUser = asyncHandler(async (req, res) => {
//     // 1. Destructure all fields, including the new 'userType'
//     const { username, email, password, userType, ...profileData } = req.body;

//     if ([username, email, password, userType].some((field) => !field || field.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     const existedUser = await User.findOne({ $or: [{ username }, { email }] });

//     if (existedUser) {
//         throw new ApiError(409, "User with this username or email already exists");
//     }

//     // 2. Create the specific profile document (Student or Industry) FIRST
//     let profile;
//     if (userType === 'student') {
//         profile = await Student.create(profileData);
//     } else if (userType === 'industry') {
//         profile = await Industry.create(profileData);
//     } else {
//         throw new ApiError(400, "Invalid user type provided");
//     }

//     if (!profile) {
//         throw new ApiError(500, "Something went wrong while creating the user profile");
//     }

//     // 3. Create the User, linking it to the new profile
//     const user = await User.create({
//         username,
//         email,
//         password,
//         userType,
//         profileId: profile._id // The crucial link
//     });

//     const createdUser = await User.findById(user._id).select("-password -refreshToken");

//     if (!createdUser) {
//         throw new ApiError(500, "Something went wrong while registering the user");
//     }

//     return res.status(201).json(
//         new ApiResponse(201, createdUser, "User registered successfully")
//     );
// });

// // --- MODIFIED LOGIN LOGIC ---
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         throw new ApiError(400, "Email and password are required");
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new ApiError(404, "User not found");
//     }

//     const isPasswordValid = await user.isPasswordCorrect(password);
//     if (!isPasswordValid) {
//         throw new ApiError(401, "Invalid password");
//     }

//     const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

//     // This is the key change: .populate('profileId')
//     // It fetches the detailed Student or Industry profile along with the user info.
//     const loggedInUser = await User.findById(user._id)
//         .populate('profileId')
//         .select("-password -refreshToken");

//     return res.status(200).json(
//         new ApiResponse(
//             200,
//             { user: loggedInUser, accessToken, refreshToken },
//             "User logged In Successfully"
//         )
//     );
// });

// // --- MODIFIED GETPROFILE LOGIC ---
// const getProfile = asyncHandler(async (req, res) => {
//     // req.user is attached by your auth middleware. We just need to populate it.
//     const userProfile = await User.findById(req.user._id)
//         .populate('profileId')
//         .select("-password -refreshToken");
    
//     return res.status(200).json(
//       new ApiResponse(
//         200,
//         userProfile,
//         "User profile fetched successfully"
//       )
//     );
// });


// // All other functions below are perfect and don't need changes.

// const logoutUser = asyncHandler(async (req, res) => {
//     await User.findByIdAndUpdate(
//         req.user._id,
//         { $set: { refreshToken: undefined } },
//         { new: true }
//     );
//     return res.status(200).json(new ApiResponse(200, {}, "User logged Out"));
// });

// // const deleteAccount = asyncHandler(async (req, res) => {
// //     // For a full solution, you would also delete the associated Student/Industry profile here.
// //     // But for now, just deleting the user is fine.
// //     const userId = req.user._id;
// //     await User.findByIdAndDelete(userId);
// //     return res.status(200).json(new ApiResponse(200, {}, "Account deleted successfully"));
// // });

// const refreshAccessToken = asyncHandler(async (req, res) => {
//     const incomingRefreshToken = req.body.refreshToken;

//     if (!incomingRefreshToken) {
//         throw new ApiError(401, "Unauthorised request");
//     }

//     try {
//         const decodedToken = jwt.verify(
//             incomingRefreshToken,
//             process.env.REFRESH_TOKEN_SECRET
//         );

//         const user = await User.findById(decodedToken?._id);
//         if (!user) {
//             throw new ApiError(401, "Invalid Refresh Token");
//         }

//         if (incomingRefreshToken !== user?.refreshToken) {
//             throw new ApiError(401, "Refresh token is expired or used");
//         }

//         const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

//         return res.status(200).json(
//             new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed successfully")
//         );
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid Refresh Token");
//     }
// });

// export { registerUser, loginUser, logoutUser, getProfile, refreshAccessToken };



import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js" 
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

    // if(!(username || email)){ //if u wanna login using either username or email but we wil ttaken both here
    if(!email || !password){
        throw new ApiError(400,"username and email , both are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // NOTE: no bcrypt right now
    // if (user.password !== password) {
    //     throw new ApiError(401, "Invalid credentials");
    // }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }


    //step 5 - tokens
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    //step 6 
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options={
        httpOnly:true,
        secure:true
    }
    
    // return res
    // .status(200)
    // .cookie("accessToken",accessToken,options)
    // .cookie("refreshToken",refreshToken,options)
    // .json(
    //     new ApiResponse(
    //         200,
    //         {
    //             user:loggedInUser,accessToken,refreshToken
    //         },
    //         "User logged In Successfully"
    //     )
    // )
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
    //remove cookies
    //reset refresh tokens
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

    // return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options)
    // .json(
    //     new ApiResponse(
    //         200,{},"User logged Out"
    //     )
    // )
    return res.status(200).json(
        new ApiResponse(200, {}, "User logged Out")
    )

})

//getProfile
const getProfile = asyncHandler(async (req, res) => {
  // req.user is already attached by middleware
  return res.status(200).json(
    new ApiResponse(
      200,
      req.user,
      "User profile fetched successfully"
    )
  );
});




const deleteAccount = asyncHandler(async (req, res) => {
  console.log("Delete account request received");
  
  const userId = req.user._id;
  
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

    // ✅ fixed destructuring here
    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    // return res
    //   .status(200)
    //   .cookie("accessToken", accessToken, options)
    //   .cookie("refreshToken", refreshToken, options)
    //   .json(
    //     new ApiResponse(200, { accessToken, refreshToken })
    //   );
    return res.status(200).json(
        new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed successfully")
    );

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

export { registerUser, loginUser, logoutUser ,getProfile, refreshAccessToken, deleteAccount };