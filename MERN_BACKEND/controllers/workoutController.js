const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

const postAWorkout = async (req, res) => {
  const { title, reps, load, comments } = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!load) emptyFields.push("load");
  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: `Please fill in the following fields: ${emptyFields.join(", ")}`,
    });
  }

  try {
    // we are getting the user id from the token
    // because when we are logged in we are getting the (token & _id) and setting it to the header

    // verify token is available in every request to this file
    const user_id = req.user._id;
    const workout = await Workout.create({
      title,
      reps,
      load,
      comments,
      user_id,
    });
    res.status(201).send(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  try {
    // * here sorting means sorting by date in descending order to get (newest first) in the (front-end)
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).send(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: "No workout with that id" });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ err: "Workout not found" });
    }
    res.status(200).send(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: "No workout with that id" });
    }
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ err: "Workout not found" });
    }
    res.status(200).send(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: "No workout with that id" });
    }

    // * [this is for if we want to push something in mongodb via mongoose]
    //*   const updateDoc = {
    //*    $push: {
    //*      comments: req.body.comment,
    //*    },
    //*  };

    // * const data = await Workout.findById(id); // * [get the previous data]

    const updateDoc = {
      // ...data._doc, // * [copy all of the previous data]
      ...req.body,
    };
    const workout = await Workout.findByIdAndUpdate(id, updateDoc, {
      new: true,
    });

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postAWorkout,
  getAllWorkouts,
  getAWorkout,
  deleteAWorkout,
  updateAWorkout,
};
