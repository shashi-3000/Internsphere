import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getProfile, 
    refreshAccessToken 
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

// --- Public Routes --- (No login required)
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken); // MOVED HERE. It is now public.

// --- Secured Routes --- (Login required)
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT, getProfile);

export default router;
