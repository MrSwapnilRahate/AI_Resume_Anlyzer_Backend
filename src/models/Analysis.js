const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    resumeName: String,
    resumeText: String, 
    jobDescription: String,
    aiResult: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Analysis", analysisSchema);
