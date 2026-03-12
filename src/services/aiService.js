const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 1️⃣ Resume Analysis
async function analyzeResume(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      {
        role: "system",
        content: "You are an expert resume reviewer.",
      },

      {
        role: "user",
        content: `
Analyze this resume and return JSON.

Return format:

{
 "summary":"short resume summary",
 "score":number,
 "skills":[]
}

Resume:
${text}
`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
}

// 2️⃣ Extract Skills
async function extractSkills(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      {
        role: "system",
        content: "You extract technical skills from resumes.",
      },

      {
        role: "user",
        content: `
Extract only technical skills.

Return JSON format:

{
 "skills":[]
}

Resume:
${text}
`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
}

// 3️⃣ Resume Score
async function scoreResume(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      {
        role: "system",
        content: "You are an ATS resume evaluator.",
      },

      {
        role: "user",
        content: `
Evaluate this resume.

Return JSON format:

{
 "score":number,
 "strengths":[],
 "improvements":[]
}

Resume:
${text}
`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
}

// 4️⃣ Job Match
async function matchJob(resumeText, jobDescription) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      {
        role: "system",
        content: "You compare resumes with job descriptions.",
      },

      {
        role: "user",
        content: `
Compare this resume with the job description.

Return JSON format:

{
 "matchScore":number,
 "missingSkills":[],
 "suggestions":[]
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = {
  analyzeResume,
  extractSkills,
  scoreResume,
  matchJob,
};
