const fs = require("fs");
const pdf = require("pdf-parse");
const axios = require("axios");

const {
  analyzeResume,
  extractSkills,
  scoreResume,
  matchJob,
} = require("../services/aiService");

const Analysis = require("../models/Analysis");

const jobMatchSchema = require("../validation/resumeValidation");

const logger = require("../utils/logger");

exports.uploadResume = async (req, res) => {
  try {
    const fileUrl = req.file.path;

    const response = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });

    const data = await pdf(response.data);

    const text = data.text;

    const analysis = await analyzeResume(text);

    const skills = await extractSkills(text);

    const score = await scoreResume(text);

    const newAnalysis = new Analysis({
      userId: req.user.id,

      resumeName: req.file.originalname,

      resumeText: text,

      matchScore: score.score || 0,

      missingSkills: skills.skills || [],

      aiResult: analysis,

      createdAt: new Date(),
    });

    await newAnalysis.save();

    res.json({
      message: "Resume analyzed successfully",
      analysis,
      skills,
      score,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getSingleAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found",
      });
    }

    res.json(analysis);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found",
      });
    }

    // ensure user owns this analysis
    if (analysis.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this analysis",
      });
    }

    await Analysis.findByIdAndDelete(req.params.id);

    res.json({
      message: "Analysis deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.jobMatch = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    const { error } = jobMatchSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const jobDescription = req.body.jobDescription;

    const dataBuffer = fs.readFileSync(req.file.path);

    const data = await pdf(dataBuffer);

    const resumeText = data.text;

    logger.info("Job match API called");

    const aiResult = await matchJob(resumeText, jobDescription);

    logger.info("AI analysis completed");

    const newAnalysis = new Analysis({
      userId: req.user.id,
      resumeName: req.file.originalname,
      resumeText: resumeText,
      jobDescription: jobDescription,
      matchScore: aiResult.matchScore || 0,
      missingSkills: aiResult.missingSkills || [],
      aiResult: aiResult,
    });

    await newAnalysis.save();

    res.json({
      message: "Job match analysis complete",
      result: aiResult,
    });
  } catch (error) {
    console.log("JOB MATCH ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(history);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
};
