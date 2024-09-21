const mongoose = require("mongoose");
const taskModel = require("../models/TaskModel");

//To create a task - POST
const createTask = async (req,res)=>{
    const {input_text,translated_text} = req.body;

    try{
        const Task = await taskModel.create({input_text,translated_text});
        res.status(200).json(task)
    }catch(e){
        res.status(400).json({error:e.message});
    }
};
// to get all the tasks
const getTasks = async (req,res)=>{
    try{
        const tasks =await taskModel.find({});
        res.status(200).json(tasks);

    }catch(e){
        res.status(400).json({error:e.message});
    }
};

// to get a single task
const getSingleTask = async (req,res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Task not Found'})
    }
    try{
        const singleTask = await taskModel.findById(id)
        res.status(200).json(singleTask)
    }catch(e){
        res.status(400).json({error:e.message});
    }
}

// to update the task
const updateTask = async (req,res) => {
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Task not Found'})
    }
    try{
         const task = await taskModel.findByIdAndUpdate({
            _id:id
         },
         {
            ...req.body
         })
         res.status(200).json(task);
    }catch(e){
        res.status(400).json({error:e.message});
    }
};

//Delete task - Delete
const deleteTask = async(req,res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Task not Found'})
    }
    try{
        const task = await taskModel.findByIdAndDelete(id);
        res.status(200).json(task);
    }catch(e){
        res.status(400).json({error:e.message});
    }
};

module.exports = {createTask,getTasks,getSingleTask,updateTask,deleteTask};