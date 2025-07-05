const express = require('express');

const signUp = require('../controllers/Signup');
const logIn = require('../controllers/Login');

const router = express.Router();
router.post("/signUp", signUp );
 router.post("/login", logIn);

 module.exports = router;