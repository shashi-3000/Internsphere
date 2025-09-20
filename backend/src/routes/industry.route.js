// import { Router } from "express";
// import { completeIndustryProfile, getAllInternships } from "../controllers/industry.controller.js";
// import { verifyJWT } from "../middlewares/user.middleware.js";

// const router = Router();

// // Protected route for completing the industry profile
// router.route("/complete-profile").post(verifyJWT, completeIndustryProfile);

// router.route("/").get(getAllInternships);

// export default router;

import { Router } from "express";
import { completeIndustryProfile, getAllInternships, getIndustryDashboard } from "../controllers/industry.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

// Protect all routes in this file
router.use(verifyJWT);

router.route("/complete-profile").post(completeIndustryProfile);
router.route("/").get(getAllInternships);

// --- NEW DASHBOARD ROUTE ---
router.route("/dashboard").get(getIndustryDashboard);

export default router;