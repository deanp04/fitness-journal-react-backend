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
      
  
  app.get('/posts', async (req, res) => {
      const posts = await Post.find();
      res.send(posts);
  });
  
  app.get('/posts/:id', async (req, res) => {
      const post = await Post.findById(req.params.id);
      res.send(post);
  });
  
  app.post('/posts', async (req, res) => {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.send(savedPost);
  });
  
  app.delete('/posts/:id', async (req, res) => {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).send('Post deleted');
  });
  
  app.listen(5000, () => console.log('Server started on port 5000'));