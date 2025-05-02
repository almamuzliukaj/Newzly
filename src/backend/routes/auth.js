const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const confirmLink = `http://localhost:3000/confirm/${user._id}`;
    await sendEmail(
      email,
      "Confirm your email",
      `<p>Click <a href='${confirmLink}'>here</a> to confirm.</p>`
    );

    res.status(201).json({ message: "User registered. Check email to confirm." });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Confirm Email
router.get("/confirm/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { confirmed: true });
    res.send("Email confirmed. You may login now.");
  } catch {
    res.status(400).send("Invalid confirmation link.");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password, remember } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.confirmed)
      return res.status(400).json({ message: "Invalid or unconfirmed user" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: remember ? "7d" : "1h"
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const link = `http://localhost:3000/reset-password/${token}`;
  await sendEmail(
    email,
    "Password Reset",
    `<p>Click <a href='${link}'>here</a> to reset password.</p>`
  );
  res.json({ message: "Reset link sent." });
});

module.exports = router;

