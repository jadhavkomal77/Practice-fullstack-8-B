const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) =>{
try {
    const {password, email} = req.body
    const data = await User.findOne({email})
    if (data) {
        return res.status(409).json({message:"email alerady exites" , success:false})
    }
    const hashPassword = await bcrypt.hash(password,10)
    console.log(hashPassword);
    console.log(password);

    await User.create({...req.body,password:hashPassword})
    res.status(201).json({message:"user register success"})
    
} catch (error) {
    console.log(error);
    res.status(500).json({  message:error.message,success:false })
}
}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check email
    const data = await User.findOne({ email });
    if (!data) {
      return res.status(401).json({
        message: "email not found",
        success: false,
      });
    }

    // 2. Compare password
    const isValid = await bcrypt.compare(password, data.password);
    if (!isValid) {
      return res.status(401).json({
        message: "invalid password",
        success: false,
      });
    }

    // 3. Check active status
    if (!data.isActive) {
      return res.status(401).json({
        message: "account blocked by admin",
        success: false,
      });
    }

    // 4. Create token ✅
    const token = jwt.sign(
      { _id: data._id, name: data.name },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    // 5. Set cookie
    res.cookie("ADMIN", token, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "user login success",
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};



exports.logout = async (req, res) =>{
try {
    
    res.status(201).json({message:"user logout success"})
} catch (error) {
    console.log(error);
    res.status(500).json({  message:error.message,success:false })
}
}