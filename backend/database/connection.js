const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/inotebook").then(()=>{
    console.log("Connected to Database")
})