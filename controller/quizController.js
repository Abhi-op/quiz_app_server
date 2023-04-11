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
                        res.send({status:true, message:"Quiz has been created successfully",data:data.quizId});
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

exports.getUserQuiz = async(req,res)=>{
            const userId = req.params.userId;
            try {
               const response = await quizDal.getUserQuizDal(userId);
                  if(response.affectedRows){
                    res.status(200).send({status:true,data:response});
                  }
            } catch (error) {
                  res.send({status:false,message:"Error While getting quizes for User"});
            }
}

exports.getQuizQuestions = async(req,res)=>{
           const quizId =req.params.quizId;
           try {
               const response = await quizDal.getQuizQuestionDal(quizId);
               if(response.affectedRows){
                    res.status(200).send({status:true,data:response})
               }
           } catch (error) {
               res.send({status:false,message:"Error while getting questions for quiz"});
           }
}

exports.updateQuestion = async(req,res)=>{
        const quesId = req.params.quesId;
        const { quesDescreption,quesType,op1,op2,op3,op4,answer} = req.body;
  //Create a new quiz object
  const newQuestion = {};
  if (quesDescreption) {
    newQuestion.question = question;
  }
  if (op1) {
    newQuestion.option1 = op1;
  }
  if (op2) {
    newQuestion.option2 = op2;
  }
  if (op3) {
    newQuestion.option3 = op3;
  }
  if (op4) {
    newQuestion.option4 = op4;
  }
  if (answer) {
    newQuestion.answer = answer;
  }
  if (title) {
    newQuestion.title = title;
  }
  if (quesType) {
    newQuestion.quesType = quesType;
  }
      try {
          const response = await quizDal.updateQuestionDal(newQuestion);
          if(response.affectedRows){
               res.status(200).send({status:true,data:response})
          }
          
      } catch (error) {
           res.send({status:false,message:"Error while updating the question"})
      }
  
}

exports.deleteQuestion = async(req,res)=>{
              const quesId = req.params.quesId
              try {

                const response = quizDal.deleteQuestionDal(quesId);
                if(response.affectedRows){
                  res.status(200).send({status:true,message:"Question Deleted sucessfully"})
                }

                
              } catch (error) {
                res.send({status:false,message:"Error while deleting the Question"})
                
              }
}

exports.getPublishedQuizQuestions = async(req,res)=>{
              const code = req.params.message
              try {
                const response = quizDal.getPublishedQuizQuestionsDal(code);
                if(response.affectedRows){
                  res.send({status:true,data:response})
                }
                
              } catch (error) {
                 res.send({status:false,message:error.message})
              }
}