import express from "express";
import { registerUser, loginUser, logoutUser, getUser, updateUser } from "../controllers/auth/userController.js";
import { guard } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", guard, getUser);
router.patch("/user", guard, updateUser);

export default router;