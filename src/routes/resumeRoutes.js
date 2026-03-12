const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");
const {
  uploadResume,
  jobMatch,
  getHistory,
  getSingleAnalysis,
  deleteAnalysis,
} = require("../controllers/resumeController");

const {
  uploadResume,
  jobMatch,
  getHistory,
} = require("../controllers/resumeController");

// Upload Resume + AI Analysis
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

// Resume vs Job Description Match
router.post("/job-match", authMiddleware, upload.single("resume"), jobMatch);

// User Analysis History
router.get("/history", authMiddleware, getHistory);

router.get("/:id", authMiddleware, getSingleAnalysis);

router.delete("/:id", authMiddleware, deleteAnalysis);

module.exports = router;
