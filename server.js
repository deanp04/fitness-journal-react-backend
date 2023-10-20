const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));

const workoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  exercises: [{
    name: {
      type: String,
      required: true,
    },
    sets: [{
      weight: {
        type: Number,
        required: true,
      },
      reps: {
        type: Number,
        required: true,
      },
    }],
  }],
  feelings: String, // You can add more details about how the user felt
});

const Workout = mongoose.model('Workout', workoutSchema);

// Updated API endpoints for workouts

// Get all workouts
app.get('/workouts', async (req, res) => {
  const workouts = await Workout.find();
  res.send(workouts);
});

// Get a specific workout by ID
app.get('/workouts/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.send(workout);
});

// Create a new workout
app.post('/workouts', async (req, res) => {
  const newWorkout = new Workout(req.body);
  const savedWorkout = await newWorkout.save();
  res.send(savedWorkout);
});

// Delete a workout by ID
app.delete('/workouts/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.status(200).send('Workout deleted');
});

app.listen(5000, () => console.log('Server started on port 5000'));
