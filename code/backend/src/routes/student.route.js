

import { Router } from "express";
import { completeStudentProfile, getAllStudents, getStudentDashboard } from "../controllers/student.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/complete-profile").post(completeStudentProfile);
router.route("/").get(getAllStudents);


router.route("/dashboard").get(getStudentDashboard);

export default router;