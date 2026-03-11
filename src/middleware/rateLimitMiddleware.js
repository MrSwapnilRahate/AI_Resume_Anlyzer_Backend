const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 50,  // 50 request allowed
    message: {
        success: false,
        message: "Too many requests, please try again later"
    }
});

module.exports = apiLimiter;