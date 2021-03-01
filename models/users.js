const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:"title is required",
        minlength:3,
        maxlength:150
    },
    email:{
        type:String,
        required:"email is required",
        minlength:4,
        maxlength:2000
    },
    password:{
        type:String,
        required:"password is required",
        minlength:4,
        maxlength:2000
    },
    role: {
        type: String,
        default: 'employee',
        enum: ["employee", "admin"]
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

module.exports = mongoose.model("Post", postSchema);