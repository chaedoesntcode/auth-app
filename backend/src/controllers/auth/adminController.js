import asynchHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";

export const deleteUser = asynchHandler(async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Servor error" });
    }
});

export const getAllUsers = asynchHandler(async (req, res) => {
    const users = await User.find({});

    if(!users) {
        res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
});