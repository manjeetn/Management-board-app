const express = require("express");
const   signup = require("../controllers/Signup.js");
const  login = require ("../controllers/Auth.js");
const taskRoutes = require("./Task.js"); 
const User = require('../models/User');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post("/", taskRoutes);
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, "fullName email"); // only send required fields
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
0
module.exports=router;
