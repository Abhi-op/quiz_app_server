const mysql= require('mysql2');

const dbConfig={
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
}

const pool= mysql.createPool(dbConfig)

const connection=()=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,conn)=>{
            if(err) {
                return reject(err);
            }
            console.log("pool connected: threadId " + conn.threadId);
            const query= (sql,binding)=>{
                return new Promise((resolve,reject)=>{
                    conn.query(sql,binding,(err,result)=>{
                        if(err)  {
                             reject(err);
                        }
                             resolve(result);
                    });
                });
            };
            const release=()=>{
                return new Promise((resolve, reject)=>{
                    if(err) {
                        reject(err);
                    }
                    console.log("pool released: threadId " + conn.threadId);
                    resolve(conn.release());
                });
            };
            resolve({query,release});
        })
    });
}

const conn = () => {
    return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      console.log("MySQL pool connected: threadId " + connection.threadId);
      const query = (sql, binding) => {
        return new Promise((resolve, reject) => {
           connection.query(sql, binding, (err, result) => {
             if (err) reject(err);
             resolve(result);
             });
           });
         };
         const release = () => {
           return new Promise((resolve, reject) => {
             if (err) reject(err);
             console.log("MySQL pool released: threadId " + connection.threadId);
             resolve(connection.release());
           });
         };
         resolve({ query, release });
       });
     });
   };

const query=(sql, binding)=>{
    return new Promise((resolve,reject)=>{
        pool.query(sql, binding,(err,result,fields)=>{
            if(err) reject(err);
            resolve(result);
        })
    })
}



module.exports= {pool, connection, query};