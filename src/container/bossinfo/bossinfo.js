import React from 'react'
import {NavBar,Icon,InputItem,TextareaItem,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux.js'
@connect(state=>state.user,{update})
class BossInfo extends React.Component{
	constructor(props){
		super(props)
		this.state={
			title:'',
			conpany:'',
			money:'',
			desc:'',
			avatar:'boss'
		}
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}
	render() {
		const path = this.props.location.pathname
		const rediract = this.props.redirectTo
		const Header = this.props.avatar ? (
				<div>
					<img src={require(`../../img/${this.props.avatar}.jpg`)} style={{width:100}}/>
				</div>
			) : <span>没有头像</span>
		return (
			<div>
				{rediract && rediract!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
				<NavBar mode="dark">
					Boss完善信息
				</NavBar>
				{Header}
				<InputItem onChange={(v)=>{this.onChange('title',v)}}>
					招聘职位
				</InputItem>
				<InputItem onChange={(v)=>{this.onChange('company',v)}}>
					公司名称
				</InputItem>
				<InputItem onChange={(v)=>{this.onChange('money',v)}}>
					职位薪资
				</InputItem>
				<TextareaItem 
					onChange={(v)=>{this.onChange('desc',v)}} 
					title="职位要求"
					rows={3}
					autoHeight
				></TextareaItem>
				<Button 
					type="primary"
					onClick={()=>{
						this.props.update(this.state)
					}}
				>保存</Button>
			</div>
		);
	}
}

export default BossInfo