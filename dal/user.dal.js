const mysql = require("../config/db_config");
const userQueries = require("../queries/user.queries")



exports.createUser = async(userId,name,emailAddress,secPass)=>{
        const connection = await mysql.connection();
        try {
                const myDate = new Date();

                 // convert the date to a SQL-compatible format
                const sqlDate = myDate.toISOString().slice(0, 19).replace('T', ' ');
                const response = await connection.query(userQueries.createUserQuery,[userId,name,emailAddress,secPass,sqlDate])
                
                if(response.affectedRows){
                        return response;
                    }
                
        }catch(error){
                console.log("Error in Dal",error)
        }
        finally{
                await connection.release();
            }
}

exports.getUserDal = async(emailAddress)=>{
           const connection = await mysql.connection();
           try {
                const response = await connection.query(userQueries.getUserQuery,[emailAddress]);
                return response;
                
           } catch (error) { 
                console.log("Error in Dal",error)
               throw new Error("Error while getting user from database");
           }
}


