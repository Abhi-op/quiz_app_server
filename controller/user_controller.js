const { error } = require('console');
const HttpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const UserDal = require("../dal/user.dal")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET;
exports.createUserCredentials = async(req,res) =>{
     
        const {name,emailAddress,password} = req.body;
         const userId = uuidv4();
         let success = false;
           try {
               if(!emailAddress){
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
                    .json({ success, error: "PAssword missing" }); 
               }

               let user = await  UserDal.getUserDal(emailAddress);
               console.log("user",user);
               if (user[0].emailAddress) {
                    return res
                      .status(400)
                      .json({ success, error: "sorry a user with this email already exists" });
                  }
                  // using bcrypt
                  const salt = await bcrypt.genSalt(10);
                  const secPass = await bcrypt.hash(password, salt)
                  // Create a new user
                   user = await UserDal.createUser(userId,name,emailAddress,secPass);
            
                  const data = {
                    user: {
                      id:  user[0].userId
                    }
                  }
                  const authToken = jwt.sign(data, JWT_SECRET);
            
                  //res.json(use)
                  success = true;
                  // console.log(jwtData);
                  res.json({success, authToken});
               

           } catch (error) {
                console.error("Error While creating User")
                res.send({msg:error.message});
           }
}


exports.userLogin = async(req,res)=>{
       const {emailAddress,password} = req.body;
       let success;
       try {
          if(!emailAddress){
               return res
               .status(400)
               .json({ success, error: "Email missing" }); 
          }else if(!password){
               return res
               .status(400)
               .json({ success, error: "Password missing" }); 
          }

          let user = await  UserDal.getUserDal(emailAddress);
          // if user doesnt exist
          if(!user){
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
          const data = {
            user: {
              id: user[0].userId
            }
          }
          const authToken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({success, authToken});

          
          
       } catch (error) {
          res.send({status:false,msg:error.message});
          
       }
}