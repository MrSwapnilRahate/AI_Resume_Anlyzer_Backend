const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

const { uploadResume, jobMatch, getHistory } = require("../controllers/resumeController");

router.post(
    "/upload", authMiddleware, upload.single("resume"), uploadResume 
);

router.post(
    "/job-match", authMiddleware, upload.single("resume"), jobMatch
);

router.get(
    "/history", authMiddleware, getHistory  
);

module.exports = router;
