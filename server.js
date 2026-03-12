require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })

  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
