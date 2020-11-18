import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";
import Login from './scenes/auth/Login';
import Error404 from './scenes/error/Error404';
import WelcomePage from './scenes/moduls/WelcomePage';
import Enkripsi from './scenes/moduls/enkripsi/Enkripsi';
import SignUp from './scenes/auth/SignUp';
import RequestUser from './scenes/moduls/masteruser/RequestUser';
import File from './scenes/moduls/file/File';
import Dekripsi from './scenes/moduls/dekripsi/Dekripsi';


export default class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			loggedIn: localStorage.getItem('user_data') !== null,
			userData: localStorage.getItem('user_data') !== null ? JSON.parse(localStorage.getItem('user_data')) : {}
		}

		this.route = [
			{
				path: '/',
				component: Login,
				auth: false
			},
			{
				path: '/',
				component: WelcomePage,
				auth: true
			},
			{
				path: '/sign-up',
				component: SignUp,
				auth: false
			},
			{
				path: '/enkripsi',
				component: Enkripsi,
				auth: true
			},
			{
				path: '/dekripsi',
				component: Dekripsi,
				auth: true
			},
			{
				path: '/files',
				component: File,
				auth: true
			}
		]
		if (this.state.userData.user_type === 0){
			this.route.push({
				path: '/master/users',
				component: RequestUser,
				auth: true
			})
		}

	}

	componentDidMount(){

	}

	render(){
		return (
			<Router>
				<Switch>					
					{
						this.route.filter(r => r.auth === this.state.loggedIn).map((r, idx) => (
							<Route key={idx} exact path={r.path} component={r.component}/>
						))
					}
					<Route path="*" component={Error404}/>
				</Switch>
			</Router>
		)
	}
}
