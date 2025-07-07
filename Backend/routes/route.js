const express = require("express");
const   signup = require("../controllers/Signup.js");
const  login = require ("../controllers/Auth.js");
const taskRoutes = require("./Task.js"); 


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post("/", taskRoutes);
0
module.exports=router;
