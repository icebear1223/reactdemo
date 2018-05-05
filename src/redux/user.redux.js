
import axios from 'axios'
import {getRedirectPath} from '../util.js'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS ='AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
//设置默认state
const initState={
	redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
	pwd:'',
	type:'',
	avatar:''
}
//reducer，注册成功则isAuth改为true，并将填写的数据写入注册state中，注册失败则isAuth改为false，并将返回的报错信息写入state中
export function user(state=initState,action) {
	switch(action.type){
		case AUTH_SUCCESS:
			return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
		case ERROR_MSG:
			return {...state, isAuth:false, msg:action.msg}
		case LOAD_DATA:
			return {...state,...action.payload,redirectTo:getRedirectPath(action.payload)}
		case LOGOUT:
			return {...initState,redirectTo:'/login'}
		default:
			return state
	}
}
//cookie登录调用方法dispatch
export function userinfo(data) {
	return {type:LOAD_DATA,payload:data}
}

//登录调用方法dispatch
export function login({user,pwd}) {
	if (!user || !pwd) {
		return errorMsg('用户必须输入')
	}
	return dispatch=>{
		axios.post('/user/login',{user,pwd})
		.then(res=>{
			if (res.status == 200 && res.data.code===0) {
				dispatch(authSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
//注册调用方法dispatch
export function register({user,pwd,repeatpwd,type}) {
	//判断是否为空和密码是否一致
	if(!user||!pwd||!type||!repeatpwd){
		return errorMsg('用户名密码必须输入')
	}
	if (pwd!==repeatpwd) {
		return errorMsg('密码和确认密码不同')
	}
	//一致则将dispatch方法以参数的形式传入调用
	return dispatch=>{
		axios.post('/user/register',{user,pwd,type})
		.then(res=>{
			if (res.status == 200 && res.data.code===0) {
				dispatch(authSuccess({user,pwd,type}))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
//更新boss信息调用update方法
export function update(data) {
	return dispatch=>{
		axios.post('/user/update',data)
			.then(res=>{
				if (res.status == 200 && res.data.code===0) {
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

//
export function logoutSubmit() {
	return {type:LOGOUT}
}
function errorMsg(msg) {
	return {msg,type:ERROR_MSG}
}

function authSuccess(data) {
	return {type:AUTH_SUCCESS,payload:data}
}

function loadData(data) {
	return {type:LOAD_DATA,payload:data}
}