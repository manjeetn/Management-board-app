const User = require ("../models/User");
const bcrypt = require ('bcryptjs');


const signUp = async (req, res) => {
  const{fullName, email, password} = req.body;
  try{
  const checkdb = await User.findOne({email});
  if(checkdb)
    return res.status(400).json({message: "User  already registered "});
    
  const PasswordHashed = await bcrypt.hash(password, 12 );
  const userCreate = await User.create({
    fullName, 
    email,
    password:PasswordHashed
  });
  
  res.status(201).json({message:'User registered successfully'});
  }
  catch (error){
    res.status(500).json({messgae:"Server Error"});
  }

};

module.exports = signUp;