const mongoose = require("mongoose");
const taskschema = new mongoose.Schema({
    Name:String,
    Status:String,
},{
    collection:"task-info"
})

mongoose.model("task-info",taskschema);