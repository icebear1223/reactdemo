import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')


//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'

const initState = {
	chatmsg:[],
	users:{},
	unread:0
}


export function chat(state=initState,action) {
	switch(action.type){
		case MSG_LIST:
			return {...state,users:action.payload.users,chatmsg:action.payload.data,unread:action.payload.data.filter(v=>!v.read&&v.to == action.payload.userid).length}
		case MSG_RECV:
			const n = action.payload.to == action.userid?1:0 
			return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread + n}
		// case MSG_READ:

		default:
			return state
	}
}

export function getMsgList() {
	return (dispatch,getState)=>{
		axios.get('/user/getmsglist')
			.then(res=>{
				if (res.status==200 && res.data.code == 0) {
					const userid = getState().user._id
					dispatch(msgList(res.data.msgs,res.data.users,userid))
				}
			})
	}
}

function msgList(data,users,userid) {
	return {type:MSG_LIST,payload:{data,users,userid}}
}

export function sendMsg({_from,_to,msg}) {
	return dispatch=>{
		socket.emit('sendmsg',{_from,_to,msg})
	}
}

export function recvMsg() {
	return (dispatch,getState)=>{
		socket.on('recvmsg',data=>{
			console.log(data)
			const userid = getState().user._id
			dispatch(msgRecv(data,userid))
		})
	}
}
function msgRecv(data,userid) {
	return {type:MSG_RECV,payload:data,userid}
}