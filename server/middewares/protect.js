//  const jwt = require("jsonwebtoken")
//  const protect = (req,res,next)=>{
//     // 1 check for cookie
// const ADMIN = req.cookies.ADMIN
//     // 2 if not available send error
//     if(!ADMIN){
//         return res.status(401).json({message:"no cookie found", success:true})
//     }
// //  3 check for token
// // 4 if not available send error
//                                     //  👇  from auth controller login fuction paylode of jwt.sign ,decode ha (2)seconed arrgument made bhett . 
// jwt.verify(ADMIN,process.env.JWT_KEY,(_,decode)=>{
//    if (!decode) {
//     return res.status(401).json({message:"invalid token", success:false})
//    }
//    next()
// })
// }


// module.exports = protect







const jwt = require("jsonwebtoken")

const protect = (req, res, next) => {
  try {
    const ADMIN = req.cookies.ADMIN

    if (!ADMIN) {
      return res.status(401).json({
        message: "no cookie found",
        success: false
      })
    }

    const decoded = jwt.verify(ADMIN, process.env.JWT_KEY)
            //  👇  from auth controller login fuction paylode of jwt.sign ,decode ha (2)seconed arrgument made bhett . 
    req.user = decoded

    next() // ✅ always call next
  } catch (error) {
    return res.status(401).json({
      message: "invalid or expired token",
      success: false
    })
  }
}

module.exports = protect
