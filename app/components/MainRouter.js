import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Main from './Main';

// *this works
// const MainRouter = () => 
//   <div>
// 	<Main />
//   </div>;

// export default MainRouter;
//*


export default class MainRouter extends Component {
	render(){
		return (
			<Router>
			  	<Switch>
			  		<Route exact={true} path="/" component={Main} />
			  	</Switch>
		    </Router>
		);
	}
}
