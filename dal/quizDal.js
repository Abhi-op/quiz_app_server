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
                
           } catch (error) {
                await connection.release();
                
           }
}