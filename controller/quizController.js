const { error } = require('console');
const HttpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const quizDal = require("../dal/quizDal")


exports.createQuiz = async(req,res) =>{
            try {
                const data = {};
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


exports.addQuestion = async(req,res)=>{
           try {
                if(!req.body){
                        throw new Error("Question body is empty");

                }
                const {quesDescreption,quesType,op1,op2,op3,op4,answer} = req.body;
                const quesId = uuidv4();
                const quizId = req.params.quizId;
                const result = quizDal.addQuestionDal(quesId,quesDescreption,quesType,op1,op2,op3,op4,answer,quizId);
                if(result.affectedRows){
                        res.send({status:true,message:"Question has been added sucessfully"})
                }
                
           } catch (error) {
                console.error(error);
                
           }
}