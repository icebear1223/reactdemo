import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'


@connect(
	state=>state
)

class Msg extends React.Component{
	getLast(arr){
		return arr[arr.length-1]
	}
	render() {
		const Item = List.Item
		const Brief = Item.Brief
		const userid = this.props.user._id
		const userInfo = this.props.chat.users
		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
		console.log(msgGroup)
		console.log(this.props)
		const chatList = Object.values(msgGroup).sort((a,b)=>{
			const a_last = this.getLast(a).create_time
			const b_last = this.getLast(b).create_time
			return b_last - a_last
		})
		return (
			<div>
				<List>
					{chatList.map(v=>{
						const lastItem = this.getLast(v)
						const targitId = v[0].from == userid?v[0].to:v[0].from
						const unreadNum = v.filter(v=>!v.read&&v.to == userid).length
						console.log(lastItem)
						return (
						<Item 
							extra={<Badge text={unreadNum}></Badge>}
							key={lastItem._id}
							thumb={require(`../../img/${userInfo[targitId].avatar}.png`)}
							arrow='horizontal'
							onClick={()=>{
								this.props.history.push(`/chat/${targitId}`)
							}}
							>
							{lastItem.content}
							<Brief>{userInfo[targitId].name}</Brief>
						</Item>
					)})}
				</List>
			</div>
		);
	}
}

export default Msg