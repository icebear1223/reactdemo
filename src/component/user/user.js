import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux.js'
import {Redirect} from 'react-router-dom'
@connect(
	state=>state.user,
	{logoutSubmit}
)


class User extends React.Component{
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
	}
	logout(){
		// browserCookie.erase('userid')
		// console.log('logout')
		const alert = Modal.alert

		alert('注销','确认退出登录吗？',[
				{text:'确认',onPress:()=>{
					browserCookie.erase('userid')
					this.props.logoutSubmit()
				}},
				{text:'取消',onPress:()=>console.log('取消')}
			])
	}
	render(){
		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief
		return props.user?(
			<div>
				<Result
					img={<img src={require(`../../img/${this.props.avatar}.png`)} alt=""/>}
					title={this.props.user}
					message={props.type=='boss'?props.company:null}
				/>

				<List renderHeader={()=>'简介'}>
					<Item
						multipleLine={()=>true}
					>
						{props.title}{props.title}{props.title}{props.title}{props.title}{props.title}
						{props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
						{props.money?<Brief>薪资：{props.money}</Brief>:null}
					</Item>
				</List>
				<WhiteSpace />
				<List>
					<Item onClick={this.logout}>
						退出登录
					</Item>
				</List>
			</div>
		):<Redirect to={this.props.redirectTo} />
	}
}

export default User