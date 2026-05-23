const express = require("express");
require("dotenv").config();

const newsRoutes = require("./routes/newsRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/news", newsRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "News Headlines API is running!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});