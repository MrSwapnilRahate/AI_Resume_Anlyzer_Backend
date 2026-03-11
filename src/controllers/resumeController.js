const fs = require("fs");
const pdf = require("pdf-parse");
const { analyzeResume, extractSkills, scoreResume, matchJob } = require("../services/aiService");
const Analysis = require("../models/Analysis");
const jobMatchSchema = require("../validation/resumeValidation");
const logger = require("../utils/logger");

exports.uploadResume = async (req, res) => {
    try {
        const dataBuffer = fs.readFileSync(req.file.path);
    
        const data = await pdf(dataBuffer);

        const text = data.text;

        const analysis = await analyzeResume(text);

        const skills = await extractSkills(text);

        const score = await scoreResume(text);

        res.json({
            message: "resume analyzed",
            analysis: analysis,
            Skills: skills,
            Score: score
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.jobMatch = async(req, res) => {
    try {
        const jobDescription = req.body.jobDescription;

        const filePath = req.file.path;

        const dataBuffer = fs.readFileSync(filePath);

        const data = await pdf(dataBuffer);

        const resumeText = data.text;

        logger.info("Job match API called");

        const aiResult = await matchJob(resumeText, jobDescription);

        logger.info("AI analysis completed");

        const { error } = jobMatchSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        // console.log("Resume Text" , resumeText);
        // console.log("JD: ", jobDescription);

        // ai analysis aur MongoDB data save krenege
        const newAnalysis = new Analysis({
            userId: req.user.id,
            resumeName: req.file.originalname,
            resumeText: resumeText,
            jobDescription: jobDescription,
            aiResult: aiResult
        });
        await newAnalysis.save();

        res.json({
            message: "Job match analysis complete",
            result: aiResult
        });
        // console.log("AI Result: ", result)
 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getHistory = async(req, res) => {
    try {
        const history = await Analysis.find({ userId: req.user.id }).sort({ createdAt: -1 });

        res.json(history);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}