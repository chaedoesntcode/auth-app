import express from "express";
import { registerUser, loginUser, logoutUser, getUser, updateUser, userLoginStatus, verifyEmail, verifyUser } from "../controllers/auth/userController.js";
import { guard, adminMiddleware, creatorMiddleware } from "../middleware/authMiddleware.js";
import { deleteUser } from "../controllers/auth/adminController.js";
import { getAllUsers } from "../controllers/auth/adminController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", guard, getUser);
router.patch("/user", guard, updateUser);

router.delete("/admin/users/:id", guard, adminMiddleware, deleteUser);
router.get("/admin/users", guard, creatorMiddleware, getAllUsers);

router.get("/login-status", userLoginStatus);

router.post("/verify-email", guard, verifyEmail);
router.post("/verify-user/:verificationToken", verifyUser);

export default router;