const mongoose = require('mongoose')
//连接mongo 并使用chat这个集合
const DB_URL = 'mongodb://localhost:27017/chat'
mongoose.connect(DB_URL,function() {
	console.log('数据库连接成功')
})

const models ={
	user:{
		'user':{type:String,require:true},
		'pwd':{type:String,require:true},
		'type':{type:String,require:true},
		//头像
		'avatar':{'type':String},
		//个人简介
		'desc':{'type':String},
		//职位名
		'title':{'type':String},
		//BOSS的字段，公司名和薪资
		'company':{'type':String},
		'money':{'type':String}

	},
	chat:{

	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name) {
		return mongoose.model(name)
	}
}