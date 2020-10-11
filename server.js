const express=require('express');
const mongoose=require('mongoose');

const bodyParser=require('body-parser');
var con = require('./userModel');
const userRoute=require('./userRoute');
const MONGODB_URL ="mongodb://localhost/invoice";

mongoose.connect(MONGODB_URL,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true
}).catch(error=>console.log(error.reason));
const app=express();
app.use(bodyParser.json());
app.use("/user",userRoute);

app.listen(4300,()=>{console.log("server running at 4300 port")});