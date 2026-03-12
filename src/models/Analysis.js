const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  resumeName: {
    type: String,
  },

  resumeText: {
    type: String,
  },

  jobDescription: {
    type: String,
  },

  matchScore: {
    type: Number,
    default: 0,
  },

  missingSkills: {
    type: [String],
    default: [],
  },

  aiResult: {
    type: Object,
    default: {},
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Analysis", analysisSchema);
