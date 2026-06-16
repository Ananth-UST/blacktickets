const express = require("express");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");
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
  res.json({ service: "booking-service", status: "ok" });
});

app.use("/bookings", bookingRoutes);
app.use(errorHandler);

module.exports = app;
