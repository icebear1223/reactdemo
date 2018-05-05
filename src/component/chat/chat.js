import React from 'react'
import {List, InputItem,NavBar,Icon} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux.js'
import {getChatId} from '../../util.js'
const socket = io('ws://localhost:9093')

@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg}
)

class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			text:'',
			msg:[]
		}
	}
	componentDidMount(){
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
		this.props.readMsg
	}
	handleSubmit(){
		// socket.emit('sendmsg',{text:this.state.text})
		// this.setState({text:''})
		const _from = this.props.user._id
		const _to = this.props.match.params.user
		const msg = this.state.text
		this.setState({text:''})
		this.props.sendMsg({_from,_to,msg})
	}
	render(){
		const user = this.props.match.params.user;
		const Item = List.Item
		const users = this.props.chat.users
		if(!users[user]){
			return null
		}
		const chatid = getChatId(user,this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
		return (
			<div id="chat-page">
				<NavBar 
					mode="dark"
					icon={<Icon type='left'/>}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
				>
					{users[user].name}
				</NavBar>
				<div>
					{chatmsgs.map(v=>{
						const avatar = require(`../../img/${users[v.from].avatar}.png`)
						return v.from==user?(
							<List key={v._id}>
								<Item
									thumb={avatar}
								>{v.content}</Item>
							</List>
						):(
							<List key={v._id}>
								<Item
									extra={<img src={avatar} />}
									className="chat-me"
								>{v.content}</Item>
							</List>
						)
					})}
				</div>

				<div className="stick-footer">
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
						></InputItem>
					</List>
				</div>
			</div>
		)
	}
}

export default Chat