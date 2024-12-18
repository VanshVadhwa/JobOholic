import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Middleware to ensure user is authenticated
import { getAdminJobs, getAllJobs, getJobById, postJob, editJob } from "../controllers/job.controller.js"; // Importing controller functions

const router = express.Router();

// Routes for job management
router.route("/post").post(isAuthenticated, postJob);  // Create a new job
router.route("/get").get(isAuthenticated, getAllJobs);  // Get all jobs
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);  // Get admin jobs
router.route("/get/:id").get(isAuthenticated, getJobById);  // Get a job by ID
router.route("/edit/:id").put(isAuthenticated, editJob);  // Edit job by ID (PUT request)

export default router;
