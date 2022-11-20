const express = require("express");
const {
  postAWorkout,
  getAllWorkouts,
  getAWorkout,
  deleteAWorkout,
  updateAWorkout,
} = require("../controllers/workoutController");

const requireAuth = require("../middleware/requireAuth");

// const Workout = require("../models/workoutModel");
const workoutRouter = express.Router();

// requireAuth is a middleware function that checks if the user is logged in for all routes below
workoutRouter.use(requireAuth);

// GET all workouts
workoutRouter.get("/", getAllWorkouts);

// GET one workout
workoutRouter.get("/:id", getAWorkout);
// POST one workout
workoutRouter.post("/", postAWorkout);

// PUT one workout
workoutRouter.put("/:id", updateAWorkout);

// DELETE one workout
workoutRouter.delete("/:id", deleteAWorkout);

module.exports = workoutRouter;
