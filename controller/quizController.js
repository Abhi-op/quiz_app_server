const { error } = require('console');
const HttpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const quizDal = require("../dal/quizDal")


exports.createQuiz = async(req,res) =>{
            try {
                data.userId = req.params.userId;
                data.quizId = uuidv4();
                const result = quizDal.createQuizDal(data.userId,data.quizId);
                if(result.affectedRows){
                        res.send({status:true, message:"Quiz has been created successfully"});
                }
            } catch (error) {
               console.error(error); 
            }
}

exports.publishQuiz = async(req,res) =>{
          try {  
              const  quizId = req.params.quizId;
               const result = quizDal.publishQuizDal(quizId);
               if(result.affectedRows){
                res.send({status:true, message:"Quiz has been Published successfully"});
               }

          } catch (error) {
                console.error(error);
                
          }
}

exports.deleteQuiz = async(req,res) =>{
           try {
                const quizId = req.params.quizId;
                const result  = quizDal.deleteQuiz(quizId);
                if(result.affectedRows){
                        res.send({status:true, message:"Quiz has been Deleted successfully"});   
                }
                
           } catch (error) {
                console.error(error); 
           }
}