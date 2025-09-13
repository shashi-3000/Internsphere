import { Router } from "express";
import { completeStudentProfile, getAllStudents } from "../controllers/student.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

// This route is protected. A user must be logged in to access it.
router.route("/complete-profile").post(verifyJWT, completeStudentProfile);

// You can add other student-specific routes here later, e.g.,
// router.route("/my-applications").get(verifyJWT, getMyApplications);
// router.route("/profile").get(verifyJWT, getStudentProfile);

// --- NEW ROUTE ---
// Route to get a list of all students
router.route("/").get(getAllStudents);

export default router;