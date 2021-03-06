import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {userinfo} from '../../redux/user.redux.js'
import {connect} from 'react-redux'
@withRouter//引入后可以使用编程式导航
@connect(state=>state.user,{userinfo})
class AuthRoute extends React.Component{
	componentDidMount(){
		const publicList = ['/login','/register']
		const pathname = this.props.pathname;
		console.log(this.props)
		if (publicList.indexOf(pathname)>-1) {
			return null
		}
		//获取用户信息
		axios.get('/user/info').
			then(res=>{
				if (res.status == 200) {
					if(res.data.code==0){
						//有登录信息
						console.log(this.props)
						this.props.userinfo(res.data.data)
					}else{
						this.props.history.push('/login')
					}
				}
			})
		//是否登录
		//现在的url地址，login不需要跳转
		//用户的type 身份是boss还是牛人
		//用户是否完善信息（选择头像以及个人简介等）
	}
	render(){
		return null
	}
}

export default AuthRoute