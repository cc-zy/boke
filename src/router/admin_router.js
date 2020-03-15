const express=require('express')
const router=express.Router()
const promise=require('../mysql/promise.js')

const os=require('os')

//插入用户信息注册信息到注册表  接收两个传参 第一个账号 第二个密码
router.post('/admin/register/insert',function(req,res){
    var account=req.body.account; 
    var password=req.body.password;
    var Params=[null,account,password];
    var Sql="insert into admin_register values(?,?,?,now())";
    promise.promiseParams(Sql,Params).then(function(result){
            if(result.affectedRows){
                 res.json({status:0})  //注册成功 返回0
            }else{
                res.json({status:1})
            }
        },function(err){
            if(err)  res.send({status:1})  //注册失败  可能存在用户已经注册
        }
    )
})
//从注册表删除一条用户信息 接收一个传参 注册用户id
router.get('/admin/register/delete',function(req,res){
    var admin_user_id=req.query.id;
    var Sql="delete from admin_register where admin_user_id=?";
    var Params=[admin_user_id];
    promise.promiseParams(Sql,Params).then(function(result){
        if(result.affectedRows){
            res.json({status:0})
        }else{
            res.json({status:1})
        }
    },function(err){
        if(err)res.json({status:1}) //数据删除失败 可能不存在该id
    })
})

//从注册表更新一条数据  修改密码  接收两个个传参 用户的新的密码和原来的 账号
router.post('/admin/register/update',function(req,res){
    console.log(req.body.password)
    var password=req.body.password;
    var account=req.body.account;
    var Params=[password,account];
    var Sql="update admin_register set admin_user_password=? where admin_user_account=?";
    promise.promiseParams(Sql,Params).then(function(result){
        if(result.affectedRows){
            res.json({status:0})
        }else{
            res.json({status:1}) //可能是账号有错
        }
        console.log(result)
    },function(err){
        if(err)res.json({status:1})  //更新失败 
    })

})

//从wenzhang表里插入一条数据 发表文章保存文章   
//参数有四个 标题 内容 html内容 分类
router.post('/admin/wenzhang/insert',function(req,res){
    var wenzhang_title=req.body.wenzhang_title;
    var wenzhang_content=req.body.wenzhang_content;
    var wenzhang_content_html=req.body.wenzhang_html;
    var wenzhang_sort=req.body.wenzhang_sort;
    var Params=[wenzhang_title,wenzhang_content,wenzhang_content_html,wenzhang_sort];
    var Sql="insert into wenzhang values(null,?,?,?,now(),now(),0,0,?)";
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
//从wenzhang表里删除一条数据 删除一编文章
//参数有一个 id
router.get('/admin/wenzhang/delete',function(req,res){
    var wenzhang_id=req.query.id;
    var Sql="delete from wenzhang where wenzhang_id=?";
    var Params=[wenzhang_id];
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
//从wenzhang表里更新一条数据 修改文章
//参数有四个 标题 内容 html内容 分类 id 更新的时间

router.post('/admin/wenzhang/update',function(req,res){
    var wenzhang_title=req.body.wenzhang_title;
    var wenzhang_content=req.body.wenzhang_content;
    var wenzhang_content_html=req.body.wenzhang_content_html;
    var wenzhang_sort=req.body.wenzhang_sort;
    var wenzhang_id=req.body.id;
    var Params=[wenzhang_title,wenzhang_content,wenzhang_content_html,wenzhang_sort,wenzhang_id];
    var Sql="update wenzhang set wenzhang_title=?,wenzhang_content=?,wenzhang_content_html=?,wenzhang_sort=?,wenzhang_change_time=now() where wenzhang_id=?";
    promise.promiseParams(Sql,Params).then(function(result){
        if(result.affectedRows){
            res.json({status:0})
        }else{
            res.json({status:1})
        }
    },function(err){
        if(err) res.json({status:1}) //更新失败
        console.log(err)
    })

})

//从wenzhang表更新一个字段数据  访问的文章流量 
//参数 文章id 
//第一去fangwen表里看看游客ip是否已经来看过文章，看过则不更新文章浏览量
//第二游客ip没看过则插入这个游客信息到fangwen表，和更新文章浏览量
router.get('/youke/wenzhang/ip',function(req,res){
    var arr_ip=req.ip.split(":"); 
    var wenzhang_id=req.query.id;
    var youke_ip=arr_ip[arr_ip.length-1]; //获取ip
    var Sql='select * from  fangwen   where youke_ip=?';
    var Params=[youke_ip];
    promise.promiseParams(Sql,Params).then(function(result){
        console.log(result.length)
        if(result.length>0){ //当该游客已经访问过这个文章 则文章ip不加1
            res.json({status:0})  //访问成功!
            console.log(result)
        }else if(result.length==0){
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
                    },function(err){
                        if(err)res.json({status:1})
                    })
                }
            },function(err){
                res.json({status:1}) 
            })   
        }else{
            res.json({status:1})    
        }
    },function(err){
        if(err)res.json({status:1})
        throw(err)
    })
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

//从images表里 插入一条数据
//参数 img_url图片地址 img_position图片位置
router.post('/admin/images/insert',function(req,res){
    var img_url=req.query.img_url;
    var img_position=req.query.img_position;
    var Sql="insert into images values(null,?,now(),?)";
    var Params=[img_url,img_position];
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

//从images表里 删除一条数据
//参数 img_id 
router.get("/admin/images/delete",function(req,res){
    var img_id=req.query.img_id;
    var Sql="delete from images where img_id=?";
    var Params=[img_id];
    promise.promiseParams(Sql,Params).then(function(result){
        if(result.affectedRows){
            res.json({status:0})
        }else{
            res.json({status:1})
        }
    },function(err){
        res.json({status:1})
    })
})
//从wenzhang_caogao表里插入一条数据 保存草稿
//参数 title content content_html 
router.post('/admin/wenzhang_caogao/insert',function(req,res){
    var wenzhang_caogao_title=req.body.title;
    var wenzhang_caogao_content=req.body.content;
    var wenzhang_caogao_content_html=req.body.content_html;
    var Sql="insert into wenzhang_caogao values(null,?,?,?,now(),now())";
    var Params=[wenzhang_caogao_title,wenzhang_caogao_content,wenzhang_caogao_content_html];
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
//从wenzhang_caogao表里 更新一条数据 更新草稿
//参数 id title content content_html
router.post('/admin/wenzhang_caogao/update',function(req,res){
    var wenzhang_caogao_id=req.body.id;
    var wenzhang_caogao_title=req.body.title;
    var wenzhang_caogao_content=req.body.content;
    var wenzhang_caogao_content_html=req.body.content_html;
    var Sql="update wenzhang_caogao set wenzhang_caogao_title=?,wenzhang_caogao_content=?,wenzhang_caogao_content_html=?,"+
    "wenzhang_caogao_change_time=now() where wenzhang_caogao_id=?";
    var Params=[wenzhang_caogao_title,wenzhang_caogao_content,wenzhang_caogao_content_html,wenzhang_caogao_id];
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










module.exports=router