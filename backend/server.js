const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for simplicity

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/worldwise", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    const user = new User({ email, password }); // Store plain text password
    await user.save();
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(400).send(error.message);
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      // Check plain text password
      return res.status(400).send("Invalid credentials");
    }
    res.status(200).send("Login successful");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(400).send(error.message);
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
