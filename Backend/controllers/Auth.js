const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
 const jwt =require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

   
    const Match = await bcrypt.compare(password, checkUser.password);
    if (!Match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

   
    const token = jwt.sign({ userId: checkUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed. Try again later." });
  }
};

module.exports=login ;