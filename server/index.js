const express = require("express")
require("dotenv").config({path:"./.env"})
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const rateLimit = require("express-rate-limit")

mongoose.connect(process.env.MONGO_URL)

const app = express() 

// const limiter = rateLimit({
//     window:1000*60,
//     max:5
// })
// app.use(limiter)

app.use(cors({
    origin: process.env.NODE_ENV === "production"
    ? "https://practice-fullstack-8-b-client.vercel.app"
    :"http://localhost:3000", 
    credentials:true
})) // middalware   

app.use(express.json()) 
app.use(cookieParser())

app.use("/api/todo",require("./routes/todo.route.js"))
app.use("/api/auth",require("./routes/user.route.js"))

mongoose.connection.once("open",() => {
    console.log("mongo db connected")
    app.listen(process.env.PORT,console.log("server running 🏃‍♀️ ...")
    )
    
})

module.exports = app