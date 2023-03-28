const mysql = require("../config/db_config");
const userQueries = require("../queries/user.queries")

const User = function(userData){
        this.userId = userData.userId,
        this.emailAddress = userData.emailAddress,
        this.password = userData.password,
        this.createdAt = userData.createdAt
}

User.createUser = async(userParam)=>{
        const connection = await mysql.connection();
        console.log("User Details",userParam);
        try {
                const response = await connection.query(userQueries.createUserQuery,[userParam.userId,userParam.emailAddress,userParam.password,userParam.createdAt])
                
                if(response.affectedRows){
                        return response;
                    }
                
        }finally{
                await connection.release();
            }
}


module.exports = User;