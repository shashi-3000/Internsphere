// // import mongoose , {Schema} from "mongoose";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       lowercase: true,
//       trim: true,
//       minlength: 2,
//       maxlength: 50,
//     },
//     role: {
//         type: String,
//         enum: ["user", "admin"],
//         default: "user"
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     userType: {
//         type: String,
//         // required: true,
//         enum: ['student', 'industry'],
//     },
//     // This links the generic User login to a specific profile
//     profileId: {
//         type: mongoose.Schema.Types.ObjectId,
//         // required: true,
//         refPath: 'userType' // Magic! This tells Mongoose to look at userType to know which model to connect to (either 'student' or 'industry')
//     },
//     refreshToken: {
//       type: String, 
//     },
//   },
//   { timestamps: true }
// );


// //BCRYPT PART
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); // skip if unchanged
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // 🔑 Compare entered password with hashed one
// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };


// //TOKENS PART - ACCESS AND REFRESH
// userSchema.methods.generateAccessToken=function(){
//     return jwt.sign(
//         {   
//             _id:this._id,
//             email:this.email,
//             username:this.username,
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn:process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }
// userSchema.methods.generateRefreshToken=function(){
//     return jwt.sign(
//         {   
//             _id:this._id,
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn:process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }


// export const User = mongoose.model("User", userSchema);

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
        type: String,
        enum: ['student', 'industry'],
        // REMOVED: required: true 
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType',
        // REMOVED: required: true
    },
    refreshToken: {
      type: String, 
    },
  },
  { timestamps: true }
);

// --- All the methods (pre-save, isPasswordCorrect, tokens) below remain exactly the same ---
// BCRYPT PART
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with hashed one
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// TOKENS PART
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        { _id:this._id, email:this.email, username:this.username, },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:process.env.ACCESS_TOKEN_EXPIRY }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        { _id:this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn:process.env.REFRESH_TOKEN_EXPIRY }
    )
}

export const User = mongoose.model("User", userSchema);

