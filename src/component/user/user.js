import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace} from 'antd-mobile'

@connect(
	state=>state.user,
	{}
)


class User extends React.Component{

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
					<Item>
						退出登录
					</Item>
				</List>
			</div>
		):null
	}
}

export default User