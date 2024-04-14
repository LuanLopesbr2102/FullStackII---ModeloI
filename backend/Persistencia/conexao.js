import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root', //process.env.USUARIO_BD
            password: '',  //process.env.SENHA_BD
            database: 'inscricao',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
          });

          global.poolConexoes = pool;
          return await pool.getConnection();
    }
}





/*const mysql = require('mysql2/promise')

class Database{

    constructor(){
        this.pool=mysql.createPool({
            host:'localhost',
            user:'root',
            password:'',
            database:'inscricao'

        })
    }

async ExecutaComando(sql,params=[]){
    const connection = await this.pool.getConnection();
    try{
        const [rows]=await connection.query(sql,params)
        return rows
    } finally{
        connection.release();
    }

}

async ExecutaComandoNonQuery(sql,params=[]){
    const connection = await this.pool.getConnection();
    try{
        const [results]=await connection.query(sql,params)
        return results.affectedRows;
    } finally{
        connection.release();
    }

}


}


module.exports=Database*/