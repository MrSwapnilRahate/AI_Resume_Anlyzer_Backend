const express = require("express");
const app = express();
// routes import
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const errorMidddleware = require("./middleware/errorMiddleware");
const rateLimit = require("./middleware/rateLimitMiddleware");

app.use(express.json());

// rateLimiter for API calls
app.use("/api/", rateLimit);

// route use
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Resume Analyzer API is runing");
});

app.use("/api/resume", resumeRoutes);

// error  middleware always last
app.use(errorMidddleware);

module.exports = app;