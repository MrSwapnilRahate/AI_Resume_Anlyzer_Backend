const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function analyzeResume(text) {

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are an expert resume reviewer."
            },
            {
                role: "user",
                content: `Analyze this resume. Give skills, score out of 10, and improve suggestions:\n\n${text}`
            }
        ]
    });

    return response.choices[0].message.content;
}
async function extractSkills(text) {

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are an AI that extract skills from resumes."
            },
            {
                role: "user",
                content: `Extract only technical skills from this resume. Return skills as a simple list: \n${text}`
            }
        ]
    });

    return response.choices[0].message.content;
}

async function scoreResume(text) {

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are an ATS resume evaluator."
            },
            {
                role: "user",
                content: `Evaluate this resume. 
                Give: 1. Score out of 10
                      2. Strengths
                      3. Improvements

                    Resume: ${text}`
            }
        ]
    });

    return response.choices[0].message.content;
}

async function matchJob(resumeText, jobDescription) {

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You compare resumes with job descriptions."
            },
            {
                role: "user",
                content: `Comapare this resume with the job discription.

                    Resume: ${resumeText}
                    
                    Job Description: ${jobDescription}
                    
                    Give: 1. Mach score in %
                          2. Missing skills
                          3. Suggestions to improve
                          `
            }
        ]
    });
    return response.choices[0].message.content;
}

module.exports = { analyzeResume, extractSkills, scoreResume, matchJob };