const mysql=require('mysql')
//创建连接
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port:'3306',
    password: '',
    database: 'boke' 
})
//连接数据库
connection.connect()



module.exports=connection


