import asyncHandler from 'express-async-handler';
import User from '../../models/auth/UserModel.js';
import generateToken from '../../utils/generateToken.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from '../../models/auth/Token.js';
import crypto from 'node:crypto';
import hashToken from '../../utils/hashToken.js';
import sendEmail from '../../utils/sendEmail.js';

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
});

export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out" });
});

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" })
    }
});

export const updateUser = asyncHandler(async (req, res) => {
    // Get Details
    const user = await User.findById(req.user._id);
    if(user) {
        const { name, bio, photo } = req.body;

        user.name = req.body.name || user.name;
        user.bio = req.body.bio || user.bio;
        user.photo = req.body.photo || user.photo;

        const updated = await user.save();
        res.status(200).json({
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            role: updated.role,
            photo: updated.photo,
            bio: updated.bio,
            isVerified: updated.isVerified,
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }

});

export const userLoginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if(!token) {
        res.status(401).json({ message: "Not authorized, please login." });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if(decode) {
        res.status(200).json(true);
    } else {
        res.status(401).json(false);
    }
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const user = await User.find(req.user._id);

    if(!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if(user.isVerified) {
        return res.status(400).json({ message: "User is verified" });
    }

    let token = await Token.findOne({ userId: user._id });

    if(token) {
        await token.deleteOne();
    }

    const verificationToken = crypto.randomBytes(64).toString("hex") + user._id;

    const hashedToken = await hashToken(verificationToken);

    await new Token({
        userId: user._id,
        verificationToken: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    }).save();

    const verificationLink = `${process.env.CLIENT_URL}/verify-email${verificationToken}`;

    const subject = "Email Verification - AuthApp";
    const send_to = user.email;
    const reply_to = "noreply@gmail.com";
    const template = "emailVerification";
    const send_from = process.env.USER_EMAIL;
    const name = user.name;
    const link = verificationLink;

    try {
        await sendEmail(subject, send_to, send_from, reply_to, template, name, link);
        return res.status(200).json({ message: "Email sent" });
    } catch (error) {
        console.log("Error sending emil: ", error);
        return res.status(500).json({ message: "Email could not be sent" });
    }
});

export const verifyUser = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params;

    if(!verificationToken) {
        return res.status(400).json({ message: "Invalid token" });
    }

    const hashedToken = hashToken(verificationToken);

    const userToken = await Token.findOne({ verificationToken: hashToken, expiresAt: {$gt: Date.now()},  });

    if(!userToken) {
        return res.status(400).json({ message: "Invalid or expired token." });
    }

    const user = await User.findById(userToken.userId);

    if(user.isVerified) {
        return res.status(400).json({ message: "User is already verified." });
    }

    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "User verified succesfully." });
});