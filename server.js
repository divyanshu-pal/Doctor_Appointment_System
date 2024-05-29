const express = require("express");
const morgan = require("morgan"); // Corrected spelling from moragan to morgan
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');

// Load environment variables from a .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Morgan for logging (development mode)

// CORS Configuration
const corsOptions = {
  origin: `https://appointment-8wngyb8h9-divyanshu-pals-projects.vercel.app`,
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

// Define port
const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
