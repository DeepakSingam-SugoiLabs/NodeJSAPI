const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:"title is required",
        minlength:1,
        maxlength:150
    },
    email:{
        type:String,
        required:"email is required",
        minlength:4,
        maxlength:2000
    },
    age:{
        type:Number,
        required:"age is required",
        minlength:1,
        maxlength:2000
    },
    salary:{
        type:Number,
        required:"salary is required",
        minlength:1,
        maxlength:2000
    },
    postedBy:{
        type: ObjectId,
        ref: "User"
    }
    ,
    created:
    {
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Employee", employeeSchema);