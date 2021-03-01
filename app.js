const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyparser = require('body-parser')
const expressValidator  = require('express-validator');

dotenv.config()

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true }).then(()=>console.log("Db connected"));

mongoose.connection.on("error",err=>{
    console.log(`db connection error ${err.message}`);
});

const userRoutes = require('./routes/users');
const empRoutes = require('./routes/employee');
//middleware
app.use(morgan("dev"));
//parsing body
app.use(bodyparser.json());
//validate body data
app.use(expressValidator());
//Route for user
app.use('/',userRoutes);
//Route for Employee
app.use('/',empRoutes);
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});



