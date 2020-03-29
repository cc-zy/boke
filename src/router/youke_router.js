const express=require('express')
const router=express.Router()
const promise=require('../mysql/promise.js')

const formatDate=require('../common/formatDate.js')


//从wenzhang表更新一个字段数据  访问的文章流量 
//参数 文章id 
//第一游客cookie中的文章id是否存在，存在则不更新文章浏览量
//第二如果不存在设置cookie并存储wenzhang_id  和插入游客ip并更新文章浏览量 
//cookie 今天到期
router.get('/youke/wenzhang/ip',function(req,res){
    if(req.query.id==null){
        res.json({status:3})
        return ;
    }
    var arr_ip=req.ip.split(":"); 
    var wenzhang_id=req.query.id;
    var youke_ip=arr_ip[arr_ip.length-1]; //获取ip
    if(req.signedCookies.tokenid==wenzhang_id){ //文章对应的cookie存在则不插入游客ip
        res.json({status:1})
    }  else{
        var time=formatDate.Timecha();
        res.cookie("tokenid",wenzhang_id,{maxAge:time,signed:true,httpOnly:false});
        var Sql="insert into fangwen(youke_ip,wenzhang_id) values(?,?)";
        var Params=[youke_ip,wenzhang_id]
        promise.promiseParams(Sql,Params).then(function(result){ //插入一条数据 在游客表
            if(result.affectedRows){ //如果插入成功！就更新一下文章的浏览量
                var Sql="update wenzhang set wenzhang_youke_ip_num=wenzhang_youke_ip_num+1 where wenzhang_id=?";
                var Params=[wenzhang_id];
                promise.promiseParams(Sql,Params).then(function(result){
                    if(result.affectedRows){ //如果返回affectedRows,说明更新成功!
                        res.json({status:0})
                    }else{
                        res.json({status:1})
                    }
                })
            }
        }).catch(function(err){
           if(err) res.json({status:1})
        })   
    } 
    
})



//从wenzhang表里更新一条数据 
//获取的参数两个是isclick wenzhang_id 
//如果isclick=0 则根据youke_ip从访问表的youke_click字段增加1和根据文章id从wenzhang表的里增加1  ::youke_ip已经在访问的时候插入到fangwen表里
//如果isclick=1则减1
router.get('/youke/wenzhang/click',function(req,res){
    var arr_ip=req.ip.split(":");
    var youke_ip=arr_ip[arr_ip.length-1]; //获取ip
    var isclick=req.query.isclick;
    var wenzhang_id=req.query.wenzhang_id; 
    if(isclick==0){
        let Sql="update wenzhang set wenzhang_youke_click_num=wenzhang_youke_click_num+1 where wenzhang_id=?";
        let Params=[wenzhang_id]; 
        promise.promiseParams(Sql,Params).then(function(result){ //更新wenzhang表的click
            if(result.affectedRows){
                let Sql="update fangwen set youke_click=youke_click+1 where youke_ip=?";
                let Params=[youke_ip]; 
                return promise.promiseParams(Sql,Params)//更新fangwen表的click
            }else{
                res.json({status:1})
            }
        }).then(function(result){
            if(result.affectedRows){
                res.json({status:0})
            }
        }).catch(function(err){
            if(err)res.json({status:1})
        })
    }else{
        let Sql="update wenzhang set wenzhang_youke_click_num=wenzhang_youke_click_num-1 where wenzhang_id=?";
        let Params=[wenzhang_id]; 
        promise.promiseParams(Sql,Params).then(function(result){ //更新wenzhang表的click
            if(result.affectedRows){
                let Sql="update fangwen set youke_click=youke_click-1 where youke_ip=?";
                let Params=[youke_ip]; 
                return promise.promiseParams(Sql,Params)//更新fangwen表的click
            }else{
                res.json({status:1})
            }
        }).then(function(result){
            if(result.affectedRows){
                res.json({status:0})
            }
        }).catch(function(err){
            if(err)res.json({status:1})
        })
    }
})
//从wenzhang表里更新 wenzhang_sort字段
//参数 sort分类 id 
//根据id从wenzhang表里更新wenzhang_sort字段
router.get('/youke/wenzhang/sort',function(req,res){
    var wenzhang_sort=req.query.sort;
    var wenzhang_id=req.query.id;
    var Sql="update wenzhang set wenzhang_sort=? where wenzhang_id=?";
    var Params=[wenzhang_sort,wenzhang_id];
    promise.promiseParams(Sql,Params).then(function(result){
        if(result.affectedRows){
            res.json({status:0})
        }else{
            res.json({status:1})
        }
    },function(err){
        if(err)res.json({status:1})
    })
})

//从wenzhang表里 查询数据
//参数 sort 类别  pageIndex页数
//默认按流量排序  sort=javascript
//sort=html sort=css vue node sort=qita 
router.get('/youke/wenzhang/select/sorts',function(req,res){
    if(req.query.sort==null||req.query.pageIndex==null){
        res.json({status:1})
        return;
    }
    var sort=req.query.sort;
    var pageIndex=(req.query.pageIndex-1)*10;
    var Sql=" select wenzhang_id,wenzhang_title,wenzhang_content,wenzhang_content_html,wenzhang_create_time,wenzhang_youke_ip_num "
    +" from wenzhang  where wenzhang_sort = ? order by  wenzhang_youke_ip_num desc limit ?,10";
    var Params=[sort,pageIndex];
    promise.promiseParams(Sql,Params).then(function(result){
            res.json({status:0,result})
    },function(err){
        if(err)res.json({status:1})
    })
})
//从wenzhang表里  根据wenzhang_id查询数据
//动态params id
router.get("/youke/wenzhang/select/:id",function(req,res){
    var wenzhang_id=req.params.id;
    var Sql="select wenzhang_id,wenzhang_title,wenzhang_content,wenzhang_content_html,wenzhang_create_time from wenzhang where wenzhang_id=?";
    var Params=[wenzhang_id];
    promise.promiseParams(Sql,Params).then(function(result){

            res.json({status:0,result})

    },function(err){
        res.json({status:1})
    })
})  

//从images表里 查询数据 根据img_position图片位置
//参数 img_position
//img_position=left,right,bottom,top四种
router.get('/youke/images/select',function(req,res){
    var img_position=req.query.img_position;
    var Sql="select img_id,img_url from  images where img_position=?";
    var Params=[img_position];
    promise.promiseParams(Sql,Params).then(function(result){
        res.json({status:0,result})
    },function(err){
        if(err)res.json({status:1})
    })
})
//youke表是统计除了文章外的页面游客 插入一条数据
//第一先判断游客cookie是否已经在youke表存在,如果存在则不插入信息
//第二如果不存在则插入信息
router.get("/youke/insert",function(req,res){
    var arr_ip=req.ip.split(":");
    var youke_ip=arr_ip[arr_ip.length-1]; //获取ip
    if(req.signedCookies.token){  //游客存在cookie则不插入游客信息
        res.json({status:0})
    }else{ //游客信息不存在  插入游客信息
        var time=formatDate.Timecha();
        var settime=new Date().getTime();//时间戳
        res.cookie('token',settime,{maxAge:time,signed:true,httpOnly:false});
        var Sql="insert into youke values(null,?,now())";
        var Params=[youke_ip];
        promise.promiseParams(Sql,Params).then(function(result){
            if (result.affectedRows) {
                res.json({status:0})
            }
        },function(err){
            if(err)res.json({status:1})
        })
    }
})

//在comments表里 插入一条评论 
//参数 id   name content parent_id文章的id 评论者的名字 评论内容 父级评论 0为父级
router.post('/youke/comments/insert',function(req,res){
    var wenzhang_id=req.body.id;
    var comment_name=req.body.name;
    var comment_content=req.body.content;
    var parent_id=req.body.parent_id;
    var Sql="insert into comments values(null,?,?,?,now(),?)";
    var Params=[wenzhang_id,comment_content,comment_name,parent_id];
    promise.promiseParams(Sql,Params).then(function(result){
        if(result.affectedRows){
            res.json({status:0})
        }else{
            res.json({status:1})
        }
    },function(err){
        if(err)res.json({status:1})
    })
})
//在user_name中 插入一条数据
//第一先判断comment_name是否存在
//不存在，则插入一条评论信息  //把comment_name保存在浏览器本地
//存在则返回 hasName=true 名字存在
//参数  name 评论名
router.get('/youke/user_name/insert',function(req,res){
    if(req.query.name==null){
        res.json({status:1})
        return;
    }
    var comment_name=req.query.name;
    var Sql="select * from user_name where comment_name=?";
    var Params=[comment_name];
    promise.promiseParams(Sql,Params).then(function(result){
        if(result.length>0){
            res.json({hasName:true})
        }else if(result.length==0){
            var Sql="insert into user_name values(null,?)";
            var Params=[comment_name];
            promise.promiseParams(Sql,Params).then(function(result){
                if(result.affectedRows){
                    res.json({status:0})
                }
            })
        }
    }).catch(function(err){
        if(err)res.json({status:1})
    })
})

//从 comments 表里查询评论信息 
// 参数 id 文章id
router.get('/youke/comments/select',function(req,res){
    var wenzhang_id=req.query.id;
    var params=[wenzhang_id];
    var Sql="select comment_id,comment_content,comment_name,parent_id from comments where wenzhang_id=?";
    promise.promiseParams(Sql,params).then(function(result){
        if(result.length>0){
            let  map = {}, root = [], i;
            for(i = 0; i < result.length; i++) {
                map[result[i].comment_id] = i
                result[i].children = []
            }
            for(i = 0; i < result.length; i++) {
                const  node = result[i];
                if(result[i].parent_id != 0) {
                    result[map[node.parent_id]].children.push(node)
                }else {
                    root.push(node)
                }
            }
            res.json({status:0,root})
        }else{
            res.json({status:1})
        }
    },function(err){
        if(err)res.json({status:1})
    })
    
})

//从wenzhang表里进行 模糊查询 搜索框
//参数 title pageIndex  文章标题关键字 页数
router.post('/youke/sousuo',function(req,res){
    if(req.body.title==null||req.body.pageIndex==null){
        res.json({status:1})
        return ;
    }
    var wenzhang_title=req.body.title;
    var pageIndex=(req.body.pageIndex-1)*10;
    var Params=[pageIndex];
    var Sql=`select wenzhang_id,wenzhang_title,wenzhang_content,wenzhang_create_time from wenzhang where wenzhang_title like '%${wenzhang_title}%'  limit ?,10`;
    promise.promiseParams(Sql,Params).then(function(result){
        if(result.length>0){
            res.json({status:0,result})
        }else{
            res.json({status:1})
        }
    },function(err){
        if(err)res.json({status:1})
    })
})

module.exports=router
