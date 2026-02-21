import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Habit from './models/Habit.js';
import User from './models/user.js'
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const app = express();

// ====== CORS ======
// Allow your React app to connect
app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.178.31:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true // cookies
}));

app.use(express.json());
app.use(cookieParser());

// ====== MongoDB ======
mongoose.connect('mongodb://127.0.0.1:27017/habit-tracker')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token
  if (!token) {
    return res.status(401).json({ error: 'Not logged in' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// ====== Routes ======
app.get('/me', (req, res) => {

  const token = req.cookies.auth_token
  if (!token) {
    return res.json({ user: null })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ user: decoded })
  } catch {
    res.json({ user: null })
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  })
  res.json({ message: 'Logged out' })
})


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
    res.status(400).json({ error: "Usename already exists" })
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) {
    return res.status(401).json({ error: 'Wrong username or password' })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(401).json({ error: 'Wrong username or password' })
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.json({ message: 'Logged in' })
})

app.get('/habits', authMiddleware, async (req, res) => {
  try {
    const userIdStr = req.user.userId;

    if (!userIdStr || !mongoose.Types.ObjectId.isValid(userIdStr)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const habits = await Habit.find({
      userId: new mongoose.Types.ObjectId(req.user.userId)
    });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/habits', authMiddleware, async (req, res) => {
  try {
    const { habit, frequency } = req.body;

    if (!habit || !frequency) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const newHabit = await Habit.create({ habit, frequency, userId: new mongoose.Types.ObjectId(req.user.userId) });
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/habits/:id', authMiddleware, async (req, res) => {
  try {
    const { habit, frequency } = req.body;

    if (!habit || !frequency) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const updatedHabit = await Habit.findOneAndUpdate({ _id: req.params.id, userId: new mongoose.Types.ObjectId(req.user.userId) }, { habit, frequency }, { new: true });
    res.json(updatedHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/habits/:id', authMiddleware, async (req, res) => {
  try {
    await Habit.findOneAndDelete({ _id: req.params.id, userId: new mongoose.Types.ObjectId(req.user.userId) });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/habits/:id/complete', authMiddleware, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: new mongoose.Types.ObjectId(req.user.userId)
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.completionDates.push(new Date());
    await habit.save();

    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.patch('/habits/:id/undo', authMiddleware, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: new mongoose.Types.ObjectId(req.user.userId)
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const today = new Date();

    // Remove today's completion
    habit.completionDates.pop();

    await habit.save();

    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, '0.0.0.0', () =>
  console.log('Server running on port 3001')
);