const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Disable caching for API responses
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get("/health", (req, res) => {
  res.json({ service: "chatbot-service", status: "ok" });
});

app.use("/chatbot", chatRoutes);
app.use(errorHandler);

module.exports = app;
