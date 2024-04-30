import asynchHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/UserModel.js";

export const guard = asynchHandler(async (req, res) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            res.status(401).json({ message: "Not authorized" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.id).select("-password");

        if(!user) {
            res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({ message: "Not authorized" })
    }
});