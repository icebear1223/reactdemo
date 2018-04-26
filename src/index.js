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
import 'antd-mobile/dist/antd-mobile.css'

const store = createStore(reducers,compose(applyMiddleware(thunk)))

ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
				</div>
			</BrowserRouter>
		</Provider>
	), document.getElementById('root'));
