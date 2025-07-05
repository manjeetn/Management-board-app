const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

const logIn =async (req, res) => {
 const{email, password} = req.body;

try{ 

 const user = await User.findOne({email});
 if(!user)
    return res.status(400).json({message: "User not Found"});

 const matchPassword = await bcrypt.compare(password, user.password);

 if(!matchPassword)
    return res.status(401).json({message:"Password Incorrect"});

 const token =  jwt.sign({userId:user._id}, process.env.JWT_SECRET);

 res.json({ token, user:{id: user._id, name: user.fullName}});
}
catch (err){
    res.status(500).json({messgae: 'server error'});
}

};
 module.exports = logIn;