const express = require("express");
const cors = require("cors");

const app = express();

// routes
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

// middleware
const errorMiddleware = require("./middleware/errorMiddleware");
const rateLimiter = require("./middleware/rateLimitMiddleware");

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// body parser
app.use(express.json());

// rate limiter for all API routes
app.use("/api", rateLimiter);

// routes
app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);

// health check
app.get("/", (req, res) => {
  res.json({
    message: "Resume Analyzer API running",
  });
});

// error middleware (always last)
app.use(errorMiddleware);

module.exports = app;
