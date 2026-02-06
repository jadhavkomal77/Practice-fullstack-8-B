const { createTodo, readTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller.js")
const logger = require("../middewares/logger.js")
const protect = require("../middewares/protect.js")

const router = require("express").Router()

router
.get("/",logger,protect , readTodo)
.post("/create", logger,createTodo)
.put("/modify/:todoId",updateTodo)
.delete("/remove/:todoId",deleteTodo)

module.exports = router
