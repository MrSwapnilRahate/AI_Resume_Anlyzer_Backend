const Joi = require("joi");

const jobMatchSchema = Joi.object({
  jobDescription: Joi.string().min(20).max(5000).required().messages({
    "string.base": "Job description must be a string",

    "string.empty": "Job description cannot be empty",

    "string.min": "Job description must be at least 20 characters",

    "string.max": "Job description cannot exceed 5000 characters",

    "any.required": "Job description is required",
  }),
});

module.exports = jobMatchSchema;
