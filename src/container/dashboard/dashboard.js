import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch,Route} from 'react-router-dom'
import Navlink from '../../component/navlink/navlink.js'
import Boss from '../../component/boss/boss.js'
import Genius from '../../component/genius/genius.js'
import User from '../../component/user/user.js'

function Msg() {
	return <h2>Msg页面</h2>
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
				component:Boss,
				hide:user.type=='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type=='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我的',
				icon:'user',
				title:'个人中心',
				component:User
			},

		]

		return (
			<div>
				<NavBar className="fixed-header" mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>
				<div className='content'>
					<Switch>
						{navList.map(v=>(
							<Route key={v.path} path={v.path} component={v.component}></Route>
						))}
					</Switch>
				</div>
				<Navlink data={navList} ></Navlink>
			</div>
		)
	}
}

export default Dashboard