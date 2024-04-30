import express from "express";
import { registerUser, loginUser, logoutUser, getUser, updateUser } from "../controllers/auth/userController.js";
import { guard, adminMiddleware } from "../middleware/authMiddleware.js";
import { deleteUser } from "../controllers/auth/adminController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", guard, getUser);
router.patch("/user", guard, updateUser);

router.delete("/admin/users/:id", guard, adminMiddleware, deleteUser);

export default router;