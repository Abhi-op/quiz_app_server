const { error } = require('console');
const HttpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const userDal = require("../dal/user.dal")

exports.createUserCredentials = async(req,res) =>{
           try {
                if(!req.body){
                        throw new Error("Request body cannot be empty");
                }
                const data= req.body;
               data.userId=uuidv4();
               const userData = new userDal(data);
               const result = await userDal.createUser(userData);
               if(result.affectedRows){
                res.send({status:true, message:"User has been created successfully"});
            }
           } catch (error) {
                console.error("Error While creating User")
           }
}