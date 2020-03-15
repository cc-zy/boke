const con=require('./connection.js')

//封装一个操作数据库函数 参数是sql
exports.promiseSql=function(sql){
    return new Promise(function(resolve,reject){
        con.query(sql,function(err,result){
            if(err)reject(err)
            resolve(result)
        })
    })

}
//封装一个带有params的函数 动态数据操作
//第一个参数是sql字符串 第二个是params数组
exports.promiseParams=function(sql,params){
    return new Promise(function(resolve,reject){
        con.query(sql,params,function(err,result){
            if(err)reject(err)
            resolve(result)
        })
    })
}
