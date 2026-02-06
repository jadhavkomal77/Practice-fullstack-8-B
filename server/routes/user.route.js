const { register, logout, login } = require("../controllers/auth.controller.js")
const rateLimit = require("express-rate-limit")
const router = require("express").Router()

const authlimit = rateLimit({
     window:1000*60,
    max:5
})
router
.post("/register",register)
.post("/login",authlimit,login)
.post("/logut",logout)


module.exports = router
