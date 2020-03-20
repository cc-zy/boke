const express=require('express')
const router=express.Router()
const promise=require('../mysql/promise.js')



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
//参数有五个 标题 内容 html内容 分类 id 更新的时间

router.post('/admin/wenzhang/update',function(req,res){
    var wenzhang_title=req.body.wenzhang_title;
    var wenzhang_content=req.body.wenzhang_content;
    var wenzhang_html=req.body.wenzhang_html;
    var wenzhang_sort=req.body.wenzhang_sort;
    var wenzhang_id=req.body.id;
    var Params=[wenzhang_title,wenzhang_content,wenzhang_html,wenzhang_sort,wenzhang_id];
    var Sql="update wenzhang set wenzhang_title=?,wenzhang_content=?,wenzhang_content_html=?,wenzhang_sort=?,wenzhang_change_time=now() where wenzhang_id=?";
    promise.promiseParams(Sql,Params).then(function(result){
        if(result.affectedRows){
            res.json({status:0})
        }else{
            res.json({status:1})
        }
    },function(err){
        if(err) res.json({status:1}) //更新失败
    })

})
//从wenzhang表里 统计总clicks
//没有参数
router.get('/admin/clicks',function(req,res){
    var Sql="select wenzhang_youke_click_num as click_num from wenzhang";
    var clicks=0;
    promise.promiseSql(Sql).then(function(result){
        if(result.length>0){
            result.forEach(function(item){
                clicks+=item.click_num
            })
            res.json({status:0,clicks:clicks})
        }else{
            res.json({status:0,clicks:clicks})
        }
    },function(err){
        if(err)res.json({status:1})
    })
})
//从wenzhang表里 统计文章总数
//参数 无
router.get('/admin/wenzhang/num',function(req,res){
    var Sql="select count(wenzhang_id) as num from wenzhang";
    promise.promiseSql(Sql).then(function(result){
        var count=result[0].num;
        res.json({status:0,count:count})
    },function(err){
        if(err)res.json({status:1})
    })
})


//从wenzhang表里    查询数据
//参数 pageIndex=1  sort 排序类别   isdesc=0 底到高排序 isdesc=1高到底
//sort=ip 按流量排序 sort=create_time按时间排序
//sort=click 按点赞排序 
router.get('/admin/wenzhang/select/sort',function(req,res){
    var pageIndex=(req.query.pageIndex-1)*10;
    var sort=req.query.sort;
    var isdesc=req.query.isdesc;
    var paixu;//升序还是降序
    switch(sort){  
        case  "ip":
            sort='wenzhang_youke_ip_num';
            break;
        case "create_time":
            sort='wenzhang_create_time';
            break;
        case "click":
            sort='wenzhang_youke_click_num';
            break;
        default :
            res.json({status:1}) //传参传错
            return;
    }
    if(isdesc==0){
        paixu='desc'; 
    }else if(isdesc==1){
        paixu='asc';
    }else{
        res.json({status:1})//传参传错
        return;  //当传参值报错则停止下面的程序执行
    }
    var Params=[pageIndex];
    var Sql="select wenzhang_id,wenzhang_title,wenzhang_content,wenzhang_create_time,wenzhang_youke_ip_num"+
    ",wenzhang_youke_click_num from wenzhang   order by "+ sort+" "+paixu+" limit ?,10";
    promise.promiseParams(Sql,Params).then(function(result){
            res.json({status:0,result}) 
    },function(err){
        if(err)res.json({status:1})
    })

})


//从images表里 插入一条数据
//参数 img_url图片地址 img_position图片位置
router.post('/admin/images/insert',function(req,res){
    var img_url=req.body.img_url;
    var img_position=req.body.img_position;
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

//从wenzhang_caogao表里查询数据 
//参数 pageIndex 页数 pageIndex=1查询前10十条信息
router.get('/admin/wenzhang_caogao/select',function(req,res){
    var pageIndex=req.query.pageIndex;
    var offset=(pageIndex-1)*10;
    var dataNum=10;
    var Sql="select wenzhang_caogao_id,wenzhang_caogao_title,wenzhang_caogao_content,wenzhang_caogao_content_html,wenzhang_caogao_change_time"+
    "  from wenzhang_caogao limit ?,?";
    var Params=[offset,dataNum];
    promise.promiseParams(Sql,Params).then(function(result){
  
           res.json({status:0,result})
        
    },function(err){
        if(err)res.json({status:1})
    })
})

//从youke表和fangwen表里 统计总流量 ip
//没有参数
router.get("/admin/ips",function(req,res){
    var count=0;
    var Sql="select count(youke_ip) as ips from youke";
    promise.promiseSql(Sql).then(function(result){
        if(result.length>0){
            count+=result[0].ips
        }else{
            count=0
        }
        var Sql="select count(youke_ip) as ips from fangwen";
        return promise.promiseSql(Sql)
    }).then(function(result){
        if(result.length>0){
            count+=result[0].ips
            res.json({status:0,count:count})
        }else{
            res.json({status:0,count:count})
        }
    }).catch(function(err){
        if(err)res.json({status:1})
    })
})
//从admin_login表 插入一条数据和在注admin_register表里查询用户是否存在
//参数 account账号 password密码
router.post('/admin/login',function(req,res){
    var admin_user_account=req.body.account;
    var admin_user_password=req.body.password;
    var Sql="select * from admin_register where admin_user_account=? && admin_user_password=?";
    var Params=[admin_user_account,admin_user_password];
    if(req.signedCookies.istoken){
        res.json({status:0,token:true})
    }else{
        promise.promiseParams(Sql,Params).then(function(result){
            if(result.length>0){
                var settime=new Date().getTime();//时间戳
                res.cookie('istoken',settime,{maxAge:1000*60*60*24*7,signed:true,httpOnly:false});//有效期七天
                //插入登录信息
                var Sql="insert into admin_login values(null,?,?,now())";
                var Params=[admin_user_account,admin_user_password];
                promise.promiseParams(Sql,Params).then(function(result){
                    if(result.affectedRows){
                        res.json({status:0,token:true})
                    }else{
                        res.json({status:1})
                    }
                },function(err){
                    if(err)res.json({status:1})
                })
            }else{
                res.json({status:1,token:false})//token=false 密码或账号输入错误!
            }
        },function(err){
            if(err)res.json({status:1,token:false})//token=false 密码或账号输入错误!
        })
    }
})

//从user_name表查询 评论注册人数
//参数 无
router.get('/admin/user_name/num',function(req,res){
    var Sql="select count(comment_name) as names from user_name";
    var count=0;
    promise.promiseSql(Sql).then(function(result){
        if(result.length>0){
            count+=result[0].names
            res.json({status:0,count:count})
        }else{
            res.json({status:0,count:count})
        }
    },function(err){
        if(err)res.json({status:1})
    })
})

//从 comments表里删除一条信息
//如果是一级评论则把二级的也删了
//如果是二级直接删二级
//参数 comment_id 
router.get('/admin/comments/delete',function(req,res){
    var comment_id=req.query.comment_id;
    var Sql="delete from comments where comment_id=?";
    var Params=[comment_id];
    promise.promiseParams(Sql,Params).then(function(result){
        if(result.affectedRows){
            var Sql="delete from comments where parent_id=?";
            promise.promiseParams(Sql,Params).then(function(result2){
                if(result2.affectedRows){
                    res.json({status:0})
                }else{
                    res.json({status:0})
                }
            })
        }else{
          res.json({status:1})
        }
    }).catch(function(err){
        if(err)res.json({status:1})
        throw(err)
    })
})
//从comments评论表里查询数据 
//按照文章id排序
//参数无
router.get('/admin/comments/asc',function(req,res){
    var Sql="select * from comments order by wenzhang_id desc";
    promise.promiseSql(Sql).then(function(result){
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
//从comments统计评论总数
//参数无
router.get('/admin/comment/num',function(req,res){
    var Sql="select count(comment_id) as num from comments";
    promise.promiseParams(Sql).then(function(result){
        var count=result[0].num;
        res.json({status:0,count:count})
    },function(err){
        res.json({status:1})
    })
})





module.exports=router
