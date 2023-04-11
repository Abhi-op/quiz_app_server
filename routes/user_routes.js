const express= require('express');
const userRouter= express.Router();


const UserController = require("../controller/user_controller");

userRouter.post("/createUser",UserController.createUserCredentials);
userRouter.post("/login",UserController.userLogin);

module.exports=userRouter