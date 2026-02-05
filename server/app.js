import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Habit from './models/Habit.js';
import User from './models/user.js'
import bcrypt from 'bcrypt';

const app = express();

// ====== CORS ======
// Allow your React app to connect
app.use(cors({
  origin: 'http://localhost:5173', // your Vite frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
  credentials: true // if you want cookies/auth
}));

app.use(express.json());

// ====== MongoDB ======
mongoose.connect('mongodb://127.0.0.1:27017/habit-tracker')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ====== Routes ======
app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      password: hashedPassword,
    })

    res.status(201).json({ message: 'User created' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  res.json({ message: 'Login successful', userId: user._id })
})

app.get('/habits', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/habits', async (req, res) => {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/habits/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/habits/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
