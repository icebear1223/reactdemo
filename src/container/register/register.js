import React from 'react'
import Logo from '../../component/logo/logo.js'
import { List,InputItem,WingBlank,WhiteSpace,Button,Radio } from 'antd-mobile'


class Register extends React.Component{
	constructor(props){
		super(props)
		this.login = this.login.bind(this)
		this.state={
			type:'boss'
		}
	}
	login (){
		this.props.history.push('./login')
	}

	render() {
		const RadioItem = Radio.RadioItem
		return (
			<div>
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem>用户</InputItem>
						<InputItem>密码</InputItem>
						<InputItem>确认密码</InputItem>
						<WhiteSpace/>
						<RadioItem>
							BOSS
						</RadioItem>
						<RadioItem>
							牛人
						</RadioItem>
					</List>
					<WhiteSpace/>
					<Button type="primary">注册</Button>
				</WingBlank>
			</div>
		);
	}
}

export default Register;