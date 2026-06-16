const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(cors());

// Disable caching for API responses
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get("/health", (req, res) => {
  res.json({ service: "event-service", status: "ok" });
});

app.use("/events", eventRoutes);
app.use(errorHandler);

module.exports = app;
