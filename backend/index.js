import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // Required for __dirname in ES modules
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;

dotenv.config(); // Load environment variables

const app = express();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the "public/uploads" directory
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

const corsOptions = {
  origin: "http://localhost:5173", // Ensure this matches your React app's URL
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

// Port
const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(__dirname,"../frontend/dist")));
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// Start server
app.listen(PORT, async () => {
  try {
    await connectDB(); // Ensure DB connection
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit process if DB connection fails
  }
});
