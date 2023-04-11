const { connect } = require("../app");
const mysql = require("../config/db_config");
const quizQuery = require("../queries/quizQueries")



exports.createQuizDal = async(quizId,userId)=>{
        const connection = await mysql.connection();
         try{
               const response = await connection.query(quizQuery.createQuizQuery,[quizId,0,userId]);
               if(response.affectedRows){
                     return response;
               }

         }finally{
               await connection.release();
         }
}

exports.publishQuizDal = async(code,quizId)=>{
        const connection = await mysql.connection();
        try{
                const response = await connection.query(quizQuery.publishQuizQuery,[1,code,quizId]);
                if(response.affectedRows){
                        return response;
                }

        }
        finally{
                await connection.release();
                
        }
}

exports.deleteQuiz = async(quizId)=>{
         const connection = await mysql.connection();
         try{
                const response = await connection.query(quizQuery.deleteQuizQuery,[quizId]);
                if(response.affectedRows){
                        return response;
                }

         }finally{
                await connection.release();
         }
}



exports.addQuestionDal = async(data)=>{
           const connection = await mysql.connection();
           try {
                const response = await connection.query(quizQuery.createQuestion,[...data]);
                if(response.affectedRows){
                        return response;
                }
                
           }catch(error){
                console.log(error);
          }finally{
                await connection.release();
          }
}

exports.getUserQuizDal = async(userId)=>{
          const connection = await mysql.connection();
          try{
                const rsponse = await connection.query(quizQuery.getUserQuizQuery,[userId]);
                if(response.affectedRows){
                        return response;
                }
          }catch(error){
                console.log(error);
          }finally{
                await connection.release();
          }
}

exports.getQuizQuestionDal = async(quizId)=>{
           const connection = await mysql.connection();
           try {
                const response = await connection.query(quizQuery.getQuizQuestionsQuery,[quizId])
                if(response.affectedRows){
                        return response;
                }
                
           } catch (error) {
                console.log(error);
                
           }finally{
                await connection.release();
           }
}

exports.updateQuestionDal = async(data)=>{
          const connection = await mysql.connection();
          try {
                const response = await connection.query(quizQuery.updateQuestionQuery,[data.quesDescreption,data.quesType,data.option1,data.option2,data.option3,data.option4,data.answer,data.quesId])
                if(response.affectedRows){
                        return response;
                }
                
          } catch (error) {
                console.log(error);
                
           }finally{
                await connection.release();
           }

        }

exports.deleteQuestionDal = async(quesId)=>{
         const connection = await mysql.connection();
         try {
                const response = await connection.query(quizQuery.deleteQuestionQuery,[quesId]);
                if(response.affectedRows){
                        return response;
                }
                
         } catch (error) {
                console.log(error)
         }finally{
                await connection.release();
         }
}

exports.getPublishedQuizQuestionsDal = async(code)=>{
           const connection = await mysql.connection();
           try {
                const response = await connection.query(quizQuery.getPublishedQuizQuestions,[code])
                if(response.affectedRows){
                        return response
                }
                
           } catch (error) {
                console.log(error);
                
           }finally{
                await connection.release();
           }
}