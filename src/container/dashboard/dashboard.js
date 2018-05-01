import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import Navlink from '../../component/navlink/navlink.js'


function Boss() {
	return <h2>Boss页面</h2>
}
function Genius() {
	return <h2>Genius页面</h2>
}
function Msg() {
	return <h2>Msg页面</h2>
}
function User() {
	return <h2>Me页面</h2>
}
@connect(
	state=>state
)

class Dashboard extends React.Component{
	
	render() {
		const user = this.props.user
		const {pathname} = this.props.location
		const navList =[
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				conponent:Boss,
				hide:user.type=='genius'
			},
			{
				path:'/genius',
				text:'bossss',
				icon:'job',
				title:'BOSS列表',
				conponent:Genius,
				hide:user.type=='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				conponent:Msg
			},
			{
				path:'/me',
				text:'我的',
				icon:'user',
				title:'个人中心',
				conponent:User
			},

		]

		return (
			<div>
				<NavBar mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>
				<div>content</div>
				<Navlink data={navList} ></Navlink>
			</div>
		)
	}
}

export default Dashboard