const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const Post = require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.getPosts = (req,res)=> {
    res.send("hello0000")
}


exports.createPost = async(req,res)=> {
    const userExists = await Post.findOne({email: req.body.email})
    if(userExists)
    return res.status(403).json({
        error:"Email is taken!"
    })
   const post = new Post(req.body);
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
   post.password = hashedPassword
        post.save ((err,result)=>{
            res.status(200).json({ message:result+'succeesfully signed up' });
            })
}
exports.verifyPost = async(req,res)=> {
    const email   = req.body.email;
    const  password  = req.body.password;
    try {
             let user = await Post.findOne({
             email
                });
             if (!user)
            return res.status(400).json({
            message: "User Not Exist"
            });

            const isMatch = await bcrypt.compare(password, user.password);
            console.log("ismatch",isMatch,user)
            if (!isMatch)
            return res.status(400).json({
            message: "Incorrect Password !"
            });
            if(user.role == 'admin')
            {
            var token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
                expiresIn: 86400 // expires in 24 hours
              });
            user.save ((err,result)=>{
            res.status(200).json({ token,user:{email},message:"Signed in ,use the token"});
            })}
            else{
                var token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET2}`, {
                    expiresIn: 86400 // expires in 24 hours
                  });
                user.save ((err,result)=>{
                res.status(200).json({ token,user:{email},message:"Signed in ,use the token"});
                })
            }
     
    } catch (e) {
            console.error(e);
            res.status(500).json({
            message: "Server Error"
            });
    
 
}
 
 }

 exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
});
