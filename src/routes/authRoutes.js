const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected profile data",
        user: req.user
    })
})

module.exports = router;
