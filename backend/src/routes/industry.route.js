import { Router } from "express";
import { completeIndustryProfile, getAllInternships } from "../controllers/industry.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

// Protected route for completing the industry profile
router.route("/complete-profile").post(verifyJWT, completeIndustryProfile);

router.route("/").get(getAllInternships);

export default router;