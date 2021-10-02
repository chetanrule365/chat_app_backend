import express from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    const data = req.body;

    const userWithGivenContactNo = await User.findOne({ contact_no: data.contact_no });
    const userWithGivenUsername = await User.findOne({ username: data.username });

    if (userWithGivenContactNo)
        res.json({
            success: false,
            message: "User already exists with the given contact number.",
        });
    else if (userWithGivenUsername)
        res.json({
            success: false,
            message: "User already exists with the given Username. Please choose unique username.",
        });
    else
        try {
            User.create(data, (error, result) => {
                if (error) res.status(400).json({ success: false, message: error.message });
                else res.status(200).json({ success: true, result: result });
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to reach server." });
        }
});

router.post("/login", async (req, res) => {
    const data = req.body;

    const userWithGivenData = await User.findOne(data);

    if (!userWithGivenData) {
        return res.json({ success: false, message: "Invalid credentials" });
    }

    if (userWithGivenData) {
        const token = jwt.sign(data, `${process.env.JWT_TOKEN_SECRET}`);
        return res
            .status(200)
            .header("AUTH_TOKEN", token)
            .json({ success: true, message: "successfully logged in", token });
    }
});

export default router;
