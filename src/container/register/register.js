import React from 'react'
import Logo from '../../component/logo/logo.js'
import { List,InputItem,WingBlank,WhiteSpace,Button,Radio } from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux.js'

@connect(
	state=>state.user,
	{register}
)

class Register extends React.Component{
	constructor(props){
		super(props)
		this.state={
			user:'',
			pwd:'',
			repeatpwd:'',
			type:'boss',
			avatar:'boss'
		}
		this.handleRegister = this.handleRegister.bind(this)
	}

	handleChange(key,val){
		if(key =='type'){
			if(val == 'boss'){
				this.setState({avatar:'boss'})
			}else if(val == 'genius'){
				this.setState({avatar:'genius'})
			}
		}
		this.setState({
			[key]:val//这个写法不是很懂
		})
	}
	handleRegister(){
		this.props.register(this.state)
	}
	render() {
		const RadioItem = Radio.RadioItem
		return (
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<WingBlank>
					{this.props.msg?<span className="error-msg">{this.props.msg}</span>:null}
					<List>
						<InputItem
							onChange={v=>this.handleChange('user',v)}
						>用户</InputItem>
						<InputItem
							type="password"
							onChange={v=>this.handleChange('pwd',v)}
						>密码</InputItem>
						<InputItem
							type="password"
							onChange={v=>this.handleChange('repeatpwd',v)}
						>确认密码</InputItem>
						<WhiteSpace/>
						<RadioItem 
							onChange={()=>this.handleChange('type','boss')}
							checked={this.state.type=='boss'}>
							BOSS
						</RadioItem>
						<RadioItem 
							onChange={()=>this.handleChange('type','genius')}
							checked={this.state.type=='genius'}>
							牛人
						</RadioItem>
					</List>
					<WhiteSpace/>
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
				</WingBlank>
			</div>
		);
	}
}

export default Register;