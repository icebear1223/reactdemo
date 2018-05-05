//合并所有reducer 并返回，其他组件调用时使用state.xxx进行填入connect的第一个参数
import { combineReducers } from 'redux'
import {user} from './redux/user.redux.js'
import {chatuser} from './redux/chatuser.redux.js'
import {chat} from './redux/chat.redux.js'

export default combineReducers({user,chatuser,chat})