const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('./task-details');
const cors = require("cors")
app.use(cors())
app.use(express.json());

const Task = mongoose.model("task-info")
const mongoUrl = "mongodb+srv://Avinash:avinash@cluster0.h5pqcqq.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl,{
}).then(()=>{
    console.log("connected");
}).catch((e)=>{
    console.log('error');
    console.log(e);
})

app.post('/create',async (req,res)=>{
  const {Name,Status} = req.body;
  console.log(Name);
  console.log(Status);
 // if(status == "done") status = true;
  //else status = false;
  try{
    //console.log('jjii')
    const oldtask = await Task.findOne({Name});
    //console.log('xdcfvgbhnj')
    if(oldtask){
        return res.json({error:"task exists"})
    }
    
    await Task.create({
        Name,
        Status,
    })
    console.log('okk')
    res.send({status:"ok"});
  }
  catch{
    res.send({status:"error"});
  }
})

app.get('/tasks',async (req,res)=>{
  console.log("fet")
  const docs = await Task.find({});
  return res.send({data:docs,status:"ok"});
})

app.patch('/tasks/update',async(req,res)=>{
  const {_id} = req.body;
  console.log('updating')
 try{
  const task = await Task.findByIdAndUpdate(_id, { Status: "done" }, { new: true });
  return res.json({ status: "ok", updatedTask: task }); 
  //await task.save();
  //return res.send({status:"ok",});
 }
 catch(e){
  res.send({status:"error"});
 }
})

app.delete('/tasks/delete',async(req,res)=>{
  const {_id}= req.body;
  try {
    await Task.findByIdAndDelete(_id);
    return res.json({ status: 'ok', message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Failed to delete task' });
  }
})
const port1 = process.env.PORT1;
app.listen(5000,()=>{
    console.log("server started");
})