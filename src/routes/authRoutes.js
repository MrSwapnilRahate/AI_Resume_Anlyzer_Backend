const express = require("express");

const router = express.Router();

const { signup, login } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Profile (Protected Route)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected profile data",
    user: req.user,
  });
});

module.exports = router;
