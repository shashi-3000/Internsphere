import { Router } from "express";
import { runMatchingAlgorithm } from "../controllers/match.controller.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

// This line creates the final URL. We use verifyJWT to make sure only
// a logged-in user (like an admin) can trigger this powerful process.
router.route("/run").post(verifyJWT, runMatchingAlgorithm);

export default router;





