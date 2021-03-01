const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const Post = require('../models/employee')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema();
let db = mongoose.connection;


exports.userById =(req,res,next,id)=>
{
    Post.find({name:id}).exec((err,user)=>
    {  
        if(err || !user)
        {
            return res.status(400).json({
                error:"not found"
            })
        }
        req.profile = user
        next()
    }
    )
};

exports.createEmployee = async(req,res)=> 
{
    const userExists = await Post.findOne({email: req.body.email})
            if(userExists)
                  return res.status(403).json({ error:"Employee Email is taken!"})
    const post = new Post(req.body);
    post.save ((err,result)=>{
                  res.status(200).json({ message:result });
            })
}

exports.allEmployees = (req,res) => 
{
    Post.find((err,users)=>
    {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({users});
    });
};

exports.getSingleEmployee = (req,res) => 
{
    return res.json(req.profile)
};

exports.sortbyAge = (req,res) => 
{   
    let db = mongoose.connection;
    let mysort = { age: 1 };
    let customerObject = db.model('employee', employeeSchema);
    customerObject.find({}, function (err, result) {
            if (err) {
                        return res.status(400).json({
                             error:err
                     }) }
             else {
                        return res.json(result)
                    }
    }).sort(mysort);
};

exports.sortbySalary = (req,res) => 
{   
    let db = mongoose.connection;
    let mysort = { salary: 1 };
    let customerObject = db.model('employee', employeeSchema);
    customerObject.find({}, function (err, result) {
        if (err) {
            return res.status(400).json({
                             error:err
                 }) }
        else {
            return res.json(result)
             }
    }).sort(mysort);
};

exports.sortbyName = (req,res) => 
{   
    let mysort = { name: 1 };
    let customerObject = db.model('employee', employeeSchema);
    customerObject.find({}, function (err, result) 
      {
        if (err) {
                  return res.status(400).json({error:err}) 
                }
        else {
                  return res.json(result)
             }
        }).sort(mysort);
};

exports.deleteUser = (req,res,next) => 
{   
    let user = req.profile
    user.remove((err,user)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        res.json({message:" employee deleted "});
    });
};

