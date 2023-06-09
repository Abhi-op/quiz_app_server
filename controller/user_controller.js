const { error } = require('console');
const HttpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const UserDal = require("../dal/user.dal")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET;
exports.createUserCredentials = async(req,res) =>{
     
        const {name,email,password} = req.body;
         const userId = uuidv4();
         let success = false;
           try {
               if(!email){
                    return res
                    .status(400)
                    .json({ success, error: "Email missing" }); 
               }else if(!name){
                    return res
                    .status(400)
                    .json({ success, error: "User name missing" }); 
               }else if(!password){
                    return res
                    .status(400)
                    .json({ success, error: "Password missing" }); 
               }

               let user = await  UserDal.getUserDal(email);
               console.log("user",user);
               if (user[0]?.emailAddress) {
                    return res
                      .status(400)
                      .json({ success, error: "sorry a user with this email already exists" });
                  }
                  // using bcrypt
                  const salt = await bcrypt.genSalt(10);
                  const secPass = await bcrypt.hash(password, salt)
                  // Create a new user
                   user = await UserDal.createUser(userId,name,email,secPass);
                       if(user.affectedRows){
                  const data1 = {
                    user: {
                      id:  userId
                    }
                  }
                  const authToken = jwt.sign(data1, JWT_SECRET);
                   const resData = {
                        authToken:authToken,
                        userId:userId
                   }
                
                  //res.json(use)
                  success = true;
                  // console.log(jwtData);
                  res.json({success, resData});
                }

           } catch (error) {
                console.error("Error While creating User")
                res.send({msg:error.message});
           }
}


exports.userLogin = async(req,res)=>{
       const {email,password} = req.body;
       let success;
       try {
          if(!email){
               return res
               .status(400)
               .json({ success, error: "Email missing" }); 
          }else if(!password){
               return res
               .status(400)
               .json({ success, error: "Password missing" }); 
          }

          let user = await  UserDal.getUserDal(email);
          // if user doesnt exist
          if(!user[0].emailAddress){
          //  success: false;
            return res.status(400).json({error: "Please try to login with correct credentials"});
          }
    
          // to match the hashes internally and returns true/false
          const passwordCompare = await bcrypt.compare(password, user[0].passcode);
          if(!passwordCompare){
            success: false;
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
          }
    
          // 
          const data1 = {
            user: {
              id: user[0].userId
            }
          }
          const authToken = jwt.sign(data1, JWT_SECRET);
          const resData = {
            authToken:authToken,
            userId:user[0].userId
       }
    
          success = true;
          res.json({success, resData});

          
          
       } catch (error) {
          res.send({status:false,msg:error.message});
          
       }
}