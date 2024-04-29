import asyncHandler from 'express-async-handler';
import User from '../../models/auth/UserModel.js';
import generateToken from '../../utils/generateToken.js';
import bcrypt from 'bcrypt';

export const registerUser = asyncHandler(async (req, res) => {
    // Get Data
    const { name, email, password } = req.body;

    // Required Fields 
    if(!name || !email || !password) {
        res.status(400).json({ message: "Please complete all fields" });
    }

    // Password Strength 
    if (!/(?=.*\d)(?=.*[a-zA-Z]).{6,}/.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one letter, one number, and be at least 6 characters long" });
    }

    // Confirm Password
    // if (password !== confirmPassword) {
    //     return res.status(400).json({ message: "Passwords do not match" });
    // }

    // Unique Email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email address is already in use" });
    }

    // Create User
    const user = await User.create({
        name,
        email,
        password,
    });

    // Generate Token 
    const token = generateToken(user._id);

    // Send Response
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: true,
        secure: true,
    })

    if(user) {
        const { _id, name, email, role, photo, bio, isVerified } = user;

        res.status(201).json({
            _id,
            name,
            email,
            role,
            photo,
            bio,
            isVerified,
            token,
        })
    } else {
        res.status(400).json({ message: "Invalid data" });
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    // Get Data
    const { email, password } = req.body;

    // Required Fields 
    if(!email || !password) {
        res.status(400).json({ message: "Please complete all fields" });
    }

    // Existing User and Password Check
    const existingUser = await User.findOne({ email });
    const isEqual = await bcrypt.compare(password, existingUser.password);

    if(!existingUser || !isEqual) {
        return res.status(401).json({ message: "Incorrect email or password." })
    }

    // Generate Token 
    const token = generateToken(existingUser._id);

    if(existingUser && isEqual) {
        const { _id, name, email, role, photo, bio, isVerified } = existingUser;

        // Send Response
        res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: true,
        secure: true,
        })

        res.status(200).json({
            _id,
            name,
            email,
            role,
            photo,
            bio,
            isVerified,
            token,
        });
    } else {
        res.status(400).json({ message: "Invalid data" });
    }
})