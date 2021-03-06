import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter,Route,Redirect,Switch } from 'react-router-dom'
import reducers from './reducer';
import './config'
import Login from './container/login/login.js'
import Register from './container/register/register.js'
import BossInfo from './container/bossinfo/bossinfo.js'
import GeniusInfo from './container/geniusinfo/geniusinfo.js'
import Chat from './component/chat/chat.js'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
import AuthRoute from './component/authroute/authroute.js'
import Dashboard from './container/dashboard/dashboard.js'
const store = createStore(reducers,compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))
//boss genius 我的 msg
ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<AuthRoute></AuthRoute>
					<Switch>
						<Route path='/bossinfo' component={BossInfo}></Route>
						<Route path='/geniusinfo' component={GeniusInfo}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/chat/:user' component={Chat}></Route>
						<Route component={Dashboard}></Route>
					</Switch>
					
				</div>
			</BrowserRouter>
		</Provider>
	), document.getElementById('root'));
