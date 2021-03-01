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
    console.log("req.boyd",req.param)
    const userExists = await Post.findOne({email: req.body.email})
            if(userExists)
                  return res.status(403).json({ error:"Employee Email is taken!"})
    const post = new Post(req.body);
    post.save ((err,result)=>{
                  res.status(200).json({ message:result });
            })
}
exports.allEmployee = async(req,res) => 
{  
    let temp={};
    let temp2={};
    let counter=0;
    let k = 0;
    let pagelimit = req.query.limit;
    let pageNum = req.query.page;
    console.log("query",req.query.limit)
    console.log("query2",req.query.page)

     Post.find((err,users)=>
    {
        if(err){
                return res.status(400).json({
                error:err
                })
    }
    console.log("inside",req.params.limit,req.params.page) 
    for(let i = 0 ; i <= pageNum ; i++)                          //page param
    {
         
        for( let j = 0 ; j < pagelimit; j++ )                   //limit param
        {
            temp[k] = users[k]
             k++;
             if( i == pageNum)
             {
                 console.log("true comp",counter,"temp[k]",temp[k],"k",k)
                temp2[counter]= users[k]

                counter++;
             }
        }
                                                //k->no.of employee visible so far
    }
    console.log("temp are",temp)
    console.log("temp2 are",temp2)
          res.json({temp2});
     });

 };
exports.allEmployees = (req,res) => 
{  
     Post.find((err,users)=>
                {
                    if(err){
                            return res.status(400).json({
                            error:err
                            })
                }      
                console.log("users are",users)
                      res.json({users});
                 });
   
};

exports.getSingleEmployee = (req,res) => 
{
    return res.json(req.profile)
};

exports.sortbyValue = (req,res) => 
{   
    let sortSalary = req.query.salary;
    let sortAge = req.query.age;
    let sortName = req.query.name;
    if( sortAge == 0)
         sortAge= 1;
    if( sortSalary == 0)
        sortSalary= 1;
    if( sortName == 0)
        sortName= 1;    
    console.log("sortSalary",sortSalary,"sortAge",sortAge,"sortName",sortName)  //-1=desc,1=ascending(default)
    let db = mongoose.connection;
    let mysort = { age: sortAge ,    salary: sortSalary,   name: sortName };
    let employeeObject = db.model('employee', employeeSchema);
    employeeObject.find({}, function (err, result) {
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
    let employeeObject = db.model('employee', employeeSchema);
    employeeObject.find({}, function (err, result) {
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
    let employeeObject = db.model('employee', employeeSchema);
    employeeObject.find({}, function (err, result) 
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

