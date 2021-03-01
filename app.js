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

const postRoutes = require('./routes/users');
const empRoutes = require('./routes/employee');

app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(expressValidator());
app.use('/',postRoutes);
app.use('/',empRoutes);
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});