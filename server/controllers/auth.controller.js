const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

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


exports.login = async (req, res) =>{
try {
    // 1 check if email exitst in our database
   const {email,password} = req.body
   const data = await User.findOne({email})
//  2  if not parsent send error
   if (!data) {
    return res.status(401).json({message:"email not found", success:false})
   }
//  3  compare password
const isValid = await bcrypt.compare(password,data.password)
// 4 if password do nt match send error
if (!isValid) {
    return res.status(401).json({message:"invalid password",success:false})
}
//  5 if isActive false send error
if (!data.isActive) {
    return res.status(401).json({message:"account blocked by admin",success:flase})
}
 res.status(200).json({message:"user login success",data})
 const token = jwt.sing({_id:data._id,name:data.name},process.env.JWT_KEY,{expaire:"1d"})

 res.cookie("ADMIN",token,{
    maxAge : 1000 * 60,
    httpOnly:true,
    secure:process.env.NODE_ENV === "production" })


} catch (error) {
    console.log(error);
    res.status(500).json({  message:error.message,success:false })
}
}


exports.logout = async (req, res) =>{
try {
    
    res.status(201).json({message:"user logout success"})
} catch (error) {
    console.log(error);
    res.status(500).json({  message:error.message,success:false })
}
}