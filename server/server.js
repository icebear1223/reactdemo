const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model.js')
const Chat = model.getModel('chat')

//work with express
const app = express();

const server = require('http').Server(app)

const io = require('socket.io')(server)
io.on('connection',function(socket) {
	//console.log('user chat')
	socket.on('sendmsg',function(data) {
		console.log(data)
		// io.emit('recvmsg',data)
		const {_from,_to,msg} = data
		const chatid = [_from,_to].sort().join('_')
		Chat.create({chatid,from:_from,to:_to,content:msg},function(err,doc) {
			io.emit('recvmsg',Object.assign({},doc._doc))
		})
	})
})

const userRouter = require('./user')


app.use(cookieParser());
app.use(bodyParser.json())

app.use('/user',userRouter)

server.listen(9093,function() {
	console.log('9093端口服务已启动')
})