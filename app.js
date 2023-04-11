
require ('dotenv').config();
const express = require('express');
const app= express();
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require("./routes/user_routes");
const quizRoutes = require("./routes/quizRoutes");


//Port
const port= process.env.PORT||4000;

app.listen(port,()=>console.log(`server is running on port ${port}`));
app.get("/", (req, res) => {
   res.json("Healthy");
 });

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({credentials:true}));
app.use(bodyParser.json());


app.use("/user",userRoutes);
app.use("/quizApp",quizRoutes);


//error handling
//catching 404 and forwarding to error handler
app.use((req,res,next)=>{
        next(createError(404));
     })
      
     app.use((err,req,res,next)=>{
        res.locals.message= err.message;
        res.locals.error=req.app.get('env')==='development'?err:{};
      
        //rendering error page
        res.status(err.status || 500);
        res.send("Error");
     })

     module.exports= app;