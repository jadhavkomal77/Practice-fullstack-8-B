const Todo = require("../models/Todo.js")

exports.createTodo = async (req,res) => {
    try {
        await Todo.create(req.body)
        res.status(201).json({message:"create todo success",success:true })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,success:false})
    }
}

exports.readTodo = async (req,res) => {
    try {
    const result = await Todo.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,success:false})
    }
}

exports.updateTodo = async (req,res) => {
    try {
        const {todoId} = req.params
        await Todo.findByIdAndUpdate(todoId,req.body)
        res.status(200).json({message:"update todo success",success:true })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,success:false})
    }
}
exports.deleteTodo = async (req,res) => {
    try {
        const {todoId} = req.params
     const result = await Todo.findByIdAndDelete(todoId)
        res.status(200).json({message:"delete todo success",success:true, result })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,success:false})
    }
}