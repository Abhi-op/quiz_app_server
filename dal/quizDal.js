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

exports.publishQuizDal = async(quizId)=>{
        const connection = await mysql.connection();
        try{
                const response = await connection.query(quizQuery.publishQuizQuery,[1,quesId]);
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