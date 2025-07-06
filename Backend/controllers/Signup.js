const User =require("../models/User.js");
const bcrypt =require("bcryptjs");

signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed. Try again later."

     });
  }
};
 module.exports = signup;