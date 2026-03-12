const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 50, // max 50 requests per IP

  standardHeaders: true, // return rate limit info in headers

  legacyHeaders: false, // disable old headers

  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes",
  },
});

module.exports = apiLimiter;
