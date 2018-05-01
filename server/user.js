const express = require('express')
const Router = express.Router()
const model = require('./model.js')
const User = model.getModel('user')

Router.get('/list',function(req,res) {
	//User.remove({},function(e,d) {})//删除数据库数据
	User.find({},function(err,doc) {
		return res.json(doc)
	})
})

Router.get('/info',function(req,res) {
	const {userid} = req.cookies
	if (!userid) {
		return res.json({code:1})
	}
	User.findOne({
		_id:userid
	},function(err,doc) {
		if (err) {
			return res.json({code:1,msg:'后端出错'})
		}
		if(doc){
			return res.json({code:0,data:doc})
		}
	})
})

//登录接口
Router.post('/login',function(req,res) {
	const {user,pwd} = req.body
	User.findOne({user,pwd},function(err,doc) {
		if(!doc){
			return res.json({code:1,msg:'用户名或密码错误'})
		}
		res.cookie('userid',doc._id)
		return res.json({code:0,data:doc})
	})
})

//注册接口
Router.post('/register',function(req,res) {
	const {user,pwd,type} = req.body
	User.findOne({user},function(err,doc) {
		if(doc){
			return res.json({code:1,msg:'用户名重复'})
		}

		const userModel = new User({user,type,pwd})
		userModel.save(function(e,d) {
			if (e) {
				return res.json({code:1,msg:'后端出错'})
			}
			const {user,type,_id} = d;
			res.cookie('userid',_id)
			return res.json({code:0,data:{user,type,_id}})
		})
	})
})

//boss信息修改接口
Router.post('/update',function(req,res) {
	const userid = req.cookies.userid
	if(!userid){
		return res.json({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid,body,function(err,doc) {
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})
})
module.exports = Router