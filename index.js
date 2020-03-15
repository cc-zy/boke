const  express=require('express')
const bodyParser=require('body-parser')
const app=express()

//模板引擎 'html' 是文件的后缀名  默认会在views 查找##.html文件
app.engine('html', require('express-art-template'))

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//前台路由
const router=require('./src/router/router.js')
//路由挂载到express上
app.use(router)

//后台路由
const AdminRouter=require('./src/router/admin_router.js')
app.use(AdminRouter)

//第一个参数是路由  第二个是静态资源的根目录
app.use('/views',express.static('./src/views/'))

app.get('/',function(req,res){

    res.status(404).render('index.html')  //渲染一个html
    
})

//模板引擎的使用
app.get('/template',function(req,res){
    res.render('index.html',{
        name:"陈泽阳",
        content:"这是模板引擎的内容"
    })
})




app.listen('8080',function(){
    console.log("服务器开始成功!")
})