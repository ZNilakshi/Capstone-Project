const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { firstName, lastName, username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
// In your auth route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({ 
            token, 
            user: { 
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username, 
                email: user.email,
                role: user.role,
                
            } 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }// Add this to your auth routes
router.get("/me", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
});

module.exports = router;