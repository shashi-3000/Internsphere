

import { Router } from "express";
import { completeStudentProfile, getAllStudents, getStudentDashboard } from "../controllers/student.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

// Protect all routes in this file
router.use(verifyJWT);

router.route("/complete-profile").post(completeStudentProfile);
router.route("/").get(getAllStudents);

// --- NEW DASHBOARD ROUTE ---
router.route("/dashboard").get(getStudentDashboard);

export default router;