// validation schema 
const Joi = require("joi");

const jobMatchSchema = Joi.object({
    jobDescription: Joi.string().min(20).required()
})

module.exports = jobMatchSchema;