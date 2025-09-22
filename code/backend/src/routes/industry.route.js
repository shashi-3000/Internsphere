

import { Router } from "express";
import { completeIndustryProfile, getAllInternships, getIndustryDashboard } from "../controllers/industry.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();


router.use(verifyJWT);

router.route("/complete-profile").post(completeIndustryProfile);
router.route("/").get(getAllInternships);


router.route("/dashboard").get(getIndustryDashboard);

export default router;